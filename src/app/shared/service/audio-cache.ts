const CACHE_NAME = "emac-audio-v1";
const CACHED_AT = "X-EMAC-Cached-At";
const LAST_USED = "X-EMAC-Last-Used";

export const AUDIO_CACHE_LIMITS = {
  maxBytes: 80 * 1024 * 1024,
  maxTrackBytes: 20 * 1024 * 1024,
  maxEntries: 20,
  maxAgeMs: 30 * 24 * 60 * 60 * 1000,
};

interface AudioCacheOptions {
  storage?: CacheStorage;
  fetcher?: typeof fetch;
  baseUrl?: string;
  now?: () => number;
  limits?: Partial<typeof AUDIO_CACHE_LIMITS>;
}

/** Complete local audio files only; the browser handles seeking on Blob URLs. */
export class AudioCache {
  private options: AudioCacheOptions;
  private limits: typeof AUDIO_CACHE_LIMITS;
  private pending = new Map<string, Promise<void>>();
  private mutation: Promise<unknown> = Promise.resolve();

  constructor(options: AudioCacheOptions = {}) {
    this.options = options;
    this.limits = { ...AUDIO_CACHE_LIMITS, ...options.limits };
  }

  private url(source: string): string | undefined {
    try {
      const origin = this.options.baseUrl ?? globalThis.location?.origin;
      if (!origin) return undefined;
      const url = new URL(source, origin);
      if (
        url.origin !== new URL(origin).origin ||
        !/^\/assets\/music\/.*\.(mp3|m4a|aac|ogg|opus|wav|flac)$/i.test(
          url.pathname,
        )
      )
        return undefined;
      url.hash = "";
      return url.href;
    } catch {
      return undefined;
    }
  }

  private now(): number {
    return this.options.now?.() ?? Date.now();
  }

  private open(): Promise<Cache> | undefined {
    return (this.options.storage ?? globalThis.caches)?.open(CACHE_NAME);
  }

  private exclusive<T>(work: () => Promise<T>): Promise<T> {
    const result = this.mutation.then(async (): Promise<T> => {
      const locks = globalThis.navigator?.locks;
      return locks ? await locks.request(CACHE_NAME, work) : await work();
    });
    this.mutation = result.catch(() => undefined);
    return result;
  }

  private async entries(cache: Cache) {
    const entries: { request: Request; size: number; lastUsed: number }[] = [];
    for (const request of await cache.keys()) {
      const response = await cache.match(request);
      const size = Number(response?.headers.get("Content-Length"));
      const cachedAt = Number(response?.headers.get(CACHED_AT));
      const lastUsed = Number(response?.headers.get(LAST_USED));
      if (
        !response ||
        response.status !== 200 ||
        !Number.isFinite(size) ||
        size <= 0 ||
        !cachedAt ||
        !lastUsed ||
        size > Math.min(this.limits.maxTrackBytes, this.limits.maxBytes) ||
        this.now() - cachedAt >= this.limits.maxAgeMs
      ) {
        await cache.delete(request);
      } else {
        entries.push({ request, size, lastUsed });
      }
    }
    entries.sort((a, b) => a.lastUsed - b.lastUsed);
    let total = entries.reduce((sum, entry) => sum + entry.size, 0);
    while (
      entries.length &&
      (total > this.limits.maxBytes || entries.length > this.limits.maxEntries)
    ) {
      const oldest = entries.shift()!;
      await cache.delete(oldest.request);
      total -= oldest.size;
    }
    return entries;
  }

  public async get(source: string): Promise<Blob | undefined> {
    const url = this.url(source);
    if (!url) return undefined;
    try {
      return await this.exclusive(async () => {
        const cache = await this.open();
        if (!cache) return undefined;
        await this.entries(cache);
        const response = await cache.match(url);
        if (!response) return undefined;
        const blob = await response.blob();
        const headers = new Headers(response.headers);
        headers.set(LAST_USED, String(this.now()));
        // A failed metadata refresh must not prevent playback of a cached file.
        await cache
          .put(url, new Response(blob, { headers }))
          .catch(() => undefined);
        return blob;
      });
    } catch {
      return undefined;
    }
  }

  public store(source: string): Promise<void> {
    const url = this.url(source);
    if (!url) return Promise.resolve();
    const pending = this.pending.get(url);
    if (pending) return pending;
    // Cache failures never interrupt normal network playback.
    const task = this.download(url)
      .catch(() => undefined)
      .finally(() => this.pending.delete(url));
    this.pending.set(url, task);
    return task;
  }

  private async download(url: string): Promise<void> {
    const cached = await this.exclusive(async () => {
      const cache = await this.open();
      if (!cache) return undefined;
      await this.entries(cache);
      return Boolean(await cache.match(url));
    });
    if (cached === undefined || cached) return;
    const response = await (this.options.fetcher ?? globalThis.fetch)(url, {
      credentials: "same-origin",
      cache: "no-cache",
    });
    const type =
      response.headers.get("Content-Type")?.split(";")[0] ?? "audio/mpeg";
    // Never store a truncated HTTP 206 response or an HTML error document.
    if (
      response.status !== 200 ||
      (!type.startsWith("audio/") && type !== "application/octet-stream") ||
      !response.body
    ) {
      await response.body?.cancel();
      return;
    }
    const max = Math.min(this.limits.maxTrackBytes, this.limits.maxBytes);
    if (Number(response.headers.get("Content-Length")) > max) {
      await response.body.cancel();
      return;
    }
    const reader = response.body.getReader();
    const chunks: BlobPart[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel();
        return;
      }
      chunks.push(value.slice().buffer);
    }
    const expectedSize = response.headers.get("Content-Length");
    if (!size || (expectedSize && size !== Number(expectedSize))) return;
    const blob = new Blob(chunks, { type });
    await this.exclusive(async () => {
      const cache = await this.open();
      if (!cache) return;
      // Another tab may already have stored this track while it downloaded.
      const entries = await this.entries(cache);
      if (await cache.match(url)) return;
      let total = entries.reduce((sum, entry) => sum + entry.size, 0);
      while (
        entries.length &&
        (total + size > this.limits.maxBytes ||
          entries.length >= this.limits.maxEntries)
      ) {
        const oldest = entries.shift()!;
        await cache.delete(oldest.request);
        total -= oldest.size;
      }
      if (total + size > this.limits.maxBytes || this.limits.maxEntries < 1)
        return;
      await cache.put(
        url,
        new Response(blob, {
          headers: {
            "Content-Type": type,
            "Content-Length": String(size),
            [CACHED_AT]: String(this.now()),
            [LAST_USED]: String(this.now()),
          },
        }),
      );
    });
  }
}
