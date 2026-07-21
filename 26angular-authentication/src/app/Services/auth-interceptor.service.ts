import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpParams } from '@angular/common/http';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from './Auth.Service';
import { User } from '../Model/User';

export class AuthInterceptorService implements HttpInterceptor{

    authService : AuthService = inject(AuthService)

    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Auth Interceptor called!');

        return this.authService.loggedInUserData.pipe(take(1),exhaustMap((user : User) => {
            if(!user) return next.handle(req)
            const modifiedRequest = req.clone({params : new HttpParams().set('auth',user.token)})
            return next.handle(modifiedRequest)
        }))
    }
}