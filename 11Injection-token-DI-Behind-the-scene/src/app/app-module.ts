import { InjectionToken, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoggerService } from '../services/logger.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Admin } from './admin/admin';
import { UserList } from './admin/user-list/user-list';

export const LOGGER_TOKEN = new InjectionToken<LoggerService>('LOGGER_TOKEN')
@NgModule({
  declarations: [
    App,
    Admin,
    UserList

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  // using type/class
  // providers: [
  //   provideBrowserGlobalErrorListeners(),
  //   {provide:LoggerService,useClass:LoggerService},
  //   UserService
  // ],


  //   using string
  // providers: [
  //   provideBrowserGlobalErrorListeners(),
  //   { provide: "LOGGER_TOKEN", useClass: LoggerService },
  //   UserService
  // ],

    //   using iNJECTION tOKEN
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide:LOGGER_TOKEN, useClass: LoggerService },
    UserService
  ],
  bootstrap: [App]
})
export class AppModule {

  string = `Actually providers Array,each element is converted into object like LoggerService in 
     {provide:LoggerService,useClass:LoggerService},
     provide stores the unique identifier for each class for locatin the class in providers Array.
     Provide  value can be a type/class(LoggerService),string,Injection token to uniquely identify  a class
     useClass which is used to instantiate for token
     `
}
