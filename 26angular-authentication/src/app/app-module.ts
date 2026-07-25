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
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core-module';
import { AuthModule } from './login/auth-module';

@NgModule({
  declarations: [
    App,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,
    // DashboardModule, now we are lazy load dashboard module,so we have to remove import also ,other wise eager loading will be happen
    // AuthModule, similarly remove AuthModule for lazy loading 
    //formsModule and ReactiveFormsModule removed as NOW IT IMPORTED in sharedModule
    CoreModule
  ],
// MOVING PROVIDERS TO CORE MODULE
  bootstrap: [App],
})
export class AppModule { }
// SharedModule will be loaded based on where it is used ,if it is in AppModule(which is eagerly loaded),then sharedmodule will also be eagerly loaded,
// if sharedmodule is used in either AuthModule or DashboardModule(which is lazy loaded),so sharedmodule then will be lazy load 