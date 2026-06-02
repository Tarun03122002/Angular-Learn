
// Before Angular 14 or prev version ,this way is used
// 1) Creating a service and implement route guard interface
// 2) Implement interace methods
// 3) Return a boolean value 
// 4) Use Service in guard property of route object

import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, GuardResult, MaybeAsync, RedirectCommand, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Contact } from "../contact/contact";
import { Course } from "../Models/course";
import { CourseService } from "./course.service";

export interface Reset{
    reset : () => boolean | Promise<boolean> | Observable<boolean>
}
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<Reset>,Resolve<Course[]> {

    authService: AuthService = inject(AuthService)
    router: Router = inject(Router)
    course : CourseService = inject(CourseService)
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuthentiacted()) {
            return true
        } else {
            this.router.navigate(['login'])
            return false

        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state)
    }

    // USE INTERFACE INSTEAD OF CONTACT,SO IT WILL WORK FOR ALL COMPONENTS
    canDeactivate(component: Reset, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       
        return component.reset()
    }

    // resolve guard used when we want to prefetch some data before navigating to a route
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Course[] | Observable<Course[]> | Promise<Course[]> {
        return this.course.getAllCourses()
    }

}