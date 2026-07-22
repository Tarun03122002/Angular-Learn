import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../Services/Auth.Service";
import { inject } from "@angular/core";
import { map, Observable, take } from "rxjs";

// export const authGuardActivate = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
// ) : boolean | Observable<boolean | UrlTree> => {
export const canActivate = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
) => {//return type of function : boolean | UrlTree |Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    const authService: AuthService = inject(AuthService)
    const router = inject(Router)
    return authService.loggedInUserData.pipe(map((user) => {
        if(!user)
            return router.createUrlTree(['/login'])
        if (user.token) {
            return true
        } else {
           return router.createUrlTree(['/login'])
        }
    }))
}
