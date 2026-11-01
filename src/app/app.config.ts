import {
  LocationStrategy,
  TrailingSlashPathLocationStrategy,
} from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { provideToastr } from "ngx-toastr";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LocationStrategy,
      useClass: TrailingSlashPathLocationStrategy,
    },
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
  ],
};
