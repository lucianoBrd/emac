import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { ConfigDB } from "../data/config";

@Injectable({
  providedIn: "root",
})
export class PermissionsService {
  private router: Router = inject(Router);

  canActivateMaintenance(): boolean {
    if (ConfigDB.inMaintenance) {
      this.router.navigate(["/maintenance"]);
      return false;
    } else {
      return true;
    }
  }
  cannotActivateMaintenance(): boolean {
    if (ConfigDB.inMaintenance) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}

export const AuthGuardMaintenance: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(PermissionsService).canActivateMaintenance();
};
export const AuthGuarNotdMaintenance: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(PermissionsService).cannotActivateMaintenance();
};
