import 'zone.js';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

// angular will first loads /bootsrap AppModule as written in main.ts
platformBrowser().bootstrapModule(AppModule, {
  
})
  .catch(err => console.error(err));
