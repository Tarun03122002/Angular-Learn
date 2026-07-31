import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Detail } from './home/detail/detail';

@NgModule({
  declarations: [App, Home],
  imports: [BrowserModule, AppRoutingModule,Detail],
  // To know angular about detail standalone component, i need to add in imports array,so standalone and ngModule will work together for now
  // after adding import of detail standalone component,now angular will know detail is a standalone component,so it will render but inside detail highlight dir. is used which is a PART OF SHARED module
  // On way to convert highlight directive into standalone but if directive is used in some standard component(not standalone),so in that case instead of converting into standalone,now we will import sharedmopdule into detail component
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
