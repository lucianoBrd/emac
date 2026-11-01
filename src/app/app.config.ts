import {
  LocationStrategy,
  TrailingSlashPathLocationStrategy,
} from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";

import { provideToastr } from "ngx-toastr";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    provideClientHydration(withEventReplay()),
    {
      provide: LocationStrategy,
      useClass: TrailingSlashPathLocationStrategy,
    },
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
  ],
};
