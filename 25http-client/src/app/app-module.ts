import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth-interceptor.service';
import { LoginInterceptor } from './Services/login-interceptor.service';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide : HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide : HTTP_INTERCEPTORS,useClass : LoginInterceptor,multi : true}
  ],
  bootstrap: [App]
})
export class AppModule { }
// if multiple interceptors are there,it will resolve in the order in which it is added in providers array
// Client/Application -> AuthInterceptor -> LoginInterceptor -> Server