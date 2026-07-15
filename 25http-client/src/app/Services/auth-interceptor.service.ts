

// Interceptors in angular -> It sits b/w application and server
// -> It is used to modify the request before reaching to server and response before reaching to application/client
// Use case _. if we want to set authorization at one place instead in each api call

import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

// step -> 1) Provide Interceptor in providers of app module instead using Injectable bcoz to behave service as Interceptor we need to provide it specially 
//  provide HTTP_INTERCEPTORS token in object in providers and use multi:true to ensure same injection will beb used for multiple interceptors
// 2)  Implement HttpInterceptor interface and implements intercept method (intercept has two args req:HttpRequest<any>,next : HttpHandler)
// 3) INTERCEPT METHODS NEEDS TO RETURN the modified request to ensure it is reaching server (if it not return request will never get completed)
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Auth Interceptor called', req);

        // modifying headers (HttpRequest is also immutable)
        // First create clone of request and then updating headers

        let modifyRequest = req.clone({headers : req.headers.append('auth-header','1')})
        return next.handle(modifyRequest).pipe(tap((event) => {
            if(event.type == HttpEventType.Response)
                console.log("BODY",event);
                
        })) //passing same request just to log

    }

}