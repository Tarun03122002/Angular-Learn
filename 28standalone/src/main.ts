import { bootstrapApplication,  } from '@angular/platform-browser';
import { App } from './app/app';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
 //In appmodule ->IN BOOTSTRAP array WE CANNOT ADD standalone components

bootstrapApplication(App,{
    providers: [provideBrowserGlobalErrorListeners()],

})
  .catch(err => console.error(err));
// IN STANDALONE COMPONENTS,TWO WAY OF PROVIDING SERVICES SO THAT A SINGLE INSTANCE IS THERE
// ONE IS PROVIDEDin : root
// others is in bootstrap application -> 2nd argument {providers:[]}

// if we are not providing services separetly ,then there will  be one instance