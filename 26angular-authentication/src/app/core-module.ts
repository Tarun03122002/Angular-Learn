
// It will contains all the contains all the services and we will import in AppModule to make it cleaner
// We use CoreModule for basically providing services ,which we can't provide using providedIn :"root" like special services HTTP_INJECTOR for which we have to provide Injection Token
// Fr normal services,better practice to use providedIn property

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from "@angular/core";
import { AuthInterceptorService } from "./Services/auth-interceptor.service";

// We can add services even in AppModule but to ensure line size(file content) of app module does not increase
@NgModule({
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptorsFromDi()),
        provideZoneChangeDetection(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }
    ]
})
export class CoreModule {

}