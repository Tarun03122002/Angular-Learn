import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Detail } from './home/detail/detail';
import { HighlightDirective } from './shared/app-highlight.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [App, Home, Detail],
  imports: [BrowserModule, AppRoutingModule,SharedModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
