import { bootstrapApplication,  } from '@angular/platform-browser';
import { App } from './app/app';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
 //In appmodule ->IN BOOTSTRAP array WE CANNOT ADD standalone components

bootstrapApplication(App,{
    providers: [provideBrowserGlobalErrorListeners()],

})
  .catch(err => console.error(err));
