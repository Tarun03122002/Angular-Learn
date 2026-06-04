import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminComponent } from './admin/admin.component';
import { PercentPipe } from './Pipes/percentage.pipe';

@NgModule({
  declarations: [
    App,
    AdminComponent,
    PercentPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
