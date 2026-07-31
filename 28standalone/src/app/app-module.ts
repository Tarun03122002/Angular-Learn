import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [],
  imports: [],
  // To know angular about detail standalone component, i need to add in imports array,so standalone and ngModule will work together for now
  // after adding import of detail standalone component,now angular will know detail is a standalone component,so it will render but inside detail highlight dir. is used which is a PART OF SHARED module
  // On way to convert highlight directive into standalone but if directive is used in some standard component(not standalone),so in that case instead of converting into standalone,now we will import sharedmopdule into detail component
  bootstrap: [],
})
export class AppModule {}
// BrowserModule -> BOOTSTRAP APPLICATION WILL HANDLE ITS WORK
// tHIS FILE IS OF NO USE NOW,WE WILL EXPLORE ABOUT ROUTING SO SKIP ROUTING FOR NOW IN STANDALONE
