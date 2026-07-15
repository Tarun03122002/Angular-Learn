import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoginInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("Login Interceptor", req);

        return next.handle(req).pipe(tap((res) => {
            if (res.type == HttpEventType.Response)
                console.log("Login Interceptor res", res);

        }))
    }
}