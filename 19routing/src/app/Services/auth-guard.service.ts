
// Before Angular 14 or prev version ,this way is used
// 1) Creating a service and implement route guard interface
// 2) Implement interace methods
// 3) Return a boolean value 
// 4) Use Service in guard property of route object

import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate ,CanActivateChild{

    authService: AuthService = inject(AuthService)
    router : Router = inject(Router)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuthentiacted()) {
            return true
        } else {
            this.router.navigate(['login'])
            return false

        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute,state)
    }
}