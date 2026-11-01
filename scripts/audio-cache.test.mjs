import assert from "node:assert/strict";
import { test } from "node:test";
import { AudioCache } from "../src/app/shared/service/audio-cache.ts";

const baseUrl = "https://st-cyr-emac.org";
const track = (name) => `/assets/music/${name}.mp3`;
class MemoryCache {
  values = new Map();
  async keys() {
    return [...this.values.keys()].map((url) => new Request(url));
  }
  async match(request) {
    return this.values
      .get(typeof request === "string" ? request : request.url)
      ?.clone();
  }
  async put(request, response) {
    this.values.set(
      typeof request === "string" ? request : request.url,
      response.clone(),
    );
  }
  async delete(request) {
    return this.values.delete(
      typeof request === "string" ? request : request.url,
    );
  }
}
function setup(overrides = {}) {
  const memory = new MemoryCache();
  let time = 1000;
  let downloads = 0;
  const audio = new AudioCache({
    baseUrl,
    storage: { open: async () => memory },
    fetcher: async () => {
      downloads++;
      return new Response("song", {
        headers: { "Content-Type": "audio/mpeg", "Content-Length": "4" },
      });
    },
    now: () => time,
    ...overrides,
  });
  return {
    audio,
    memory,
    tick: (delta = 1) => (time += delta),
    downloads: () => downloads,
  };
}

test("only requested local audio is stored; concurrent requests share a download", async () => {
  const { audio, memory, downloads } = setup();
  assert.equal(memory.values.size, 0);
  await Promise.all([audio.store(track("one")), audio.store(track("one"))]);
  assert.equal(downloads(), 1);
  assert.equal(await (await audio.get(track("one"))).text(), "song");
  await audio.store(track("one"));
  assert.equal(downloads(), 1);
  await audio.store("https://example.org/assets/music/external.mp3");
  await audio.store("/assets/video/movie.mp4");
  assert.equal(downloads(), 1);
});

test("byte budget evicts the least recently used track", async () => {
  const { audio, memory, tick } = setup({ limits: { maxBytes: 8 } });
  await audio.store(track("one"));
  tick();
  await audio.store(track("two"));
  tick();
  await audio.get(track("one"));
  tick();
  await audio.store(track("three"));
  assert.equal(memory.values.size, 2);
  assert.equal(await audio.get(track("two")), undefined);
  assert(await audio.get(track("one")));
  assert(await audio.get(track("three")));
});

test("entry limit and concurrent downloads cannot overflow the cache", async () => {
  const { audio, memory } = setup({ limits: { maxEntries: 2, maxBytes: 100 } });
  await Promise.all(
    ["one", "two", "three", "four"].map((name) => audio.store(track(name))),
  );
  assert.equal(memory.values.size, 2);
});

test("expired audio is removed and can be downloaded again", async () => {
  const { audio, memory, tick, downloads } = setup({
    limits: { maxAgeMs: 100 },
  });
  await audio.store(track("one"));
  tick(101);
  assert.equal(await audio.get(track("one")), undefined);
  assert.equal(memory.values.size, 0);
  await audio.store(track("one"));
  assert.equal(downloads(), 2);
});

test("partial, failed, HTML and truncated responses are never stored", async () => {
  for (const response of [
    new Response("part", {
      status: 206,
      headers: { "Content-Type": "audio/mpeg" },
    }),
    new Response("oops", { status: 404 }),
    new Response("<html>Error</html>", {
      headers: { "Content-Type": "text/html" },
    }),
    new Response("part", {
      headers: { "Content-Type": "audio/mpeg", "Content-Length": "8" },
    }),
  ]) {
    const { audio, memory } = setup({ fetcher: async () => response });
    await audio.store(track("one"));
    assert.equal(memory.values.size, 0);
  }
});

test("oversized streaming downloads are stopped even without a Content-Length", async () => {
  let cancelled = false;
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(8));
    },
    cancel() {
      cancelled = true;
    },
  });
  const { audio, memory } = setup({
    limits: { maxTrackBytes: 4 },
    fetcher: async () =>
      new Response(body, { headers: { "Content-Type": "audio/mpeg" } }),
  });
  await audio.store(track("one"));
  assert(cancelled);
  assert.equal(memory.values.size, 0);
});

test("network and quota failures do not escape into the music player", async () => {
  const { audio } = setup({
    fetcher: async () => {
      throw new Error("offline");
    },
  });
  await assert.doesNotReject(audio.store(track("one")));
  const denied = new AudioCache({
    baseUrl,
    storage: {
      open: async () => {
        throw new Error("quota");
      },
    },
  });
  await assert.doesNotReject(denied.store(track("one")));
  assert.equal(await denied.get(track("one")), undefined);
});

test("a reduced byte budget also trims an existing cache on the next read", async () => {
  const { audio, memory, tick } = setup();
  await audio.store(track("one"));
  tick();
  await audio.store(track("two"));
  const smaller = new AudioCache({
    baseUrl,
    storage: { open: async () => memory },
    now: () => 1002,
    limits: { maxBytes: 4 },
  });
  assert(await smaller.get(track("two")));
  assert.equal(memory.values.size, 1);
  assert.equal(await smaller.get(track("one")), undefined);
});
