import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared.module';
import { CoreModule } from './core-module';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule,
    DashboardModule,
    ReactiveFormsModule,
    //formsModule and ReactiveFormsModule removed as NOW IT IMPORTED in sharedModule
    CoreModule
  ],
// MOVING PROVIDERS TO CORE MODULE
  bootstrap: [App],
})
export class AppModule { }
