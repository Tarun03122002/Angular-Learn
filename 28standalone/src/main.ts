import { bootstrapApplication, } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { AppRoutingModule } from './app/app-routing-module';
//In appmodule ->IN BOOTSTRAP array WE CANNOT ADD standalone components

bootstrapApplication(App, {
  providers: [provideBrowserGlobalErrorListeners(),
    // providing routing module in standalone root app
    // registering routing module in standalone angular app
    importProvidersFrom(AppRoutingModule)
  ],

})
  .catch(err => console.error(err));
// IN STANDALONE COMPONENTS,TWO WAY OF PROVIDING SERVICES SO THAT A SINGLE INSTANCE IS THERE
// ONE IS PROVIDEDin : root
// others is in bootstrap application -> 2nd argument {providers:[]}

// if we are not providing services separetly ,then there will  be one instance