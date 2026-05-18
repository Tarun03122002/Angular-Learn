import { Component, inject, Inject, signal } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { LOGGER_TOKEN } from './app-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('11Injection-token-DI-Behind-the-scene');

  // constructor(@Inject('LOGGER_TOKEN') private loggerService:LoggerService){

  // }

  // USING PROVIDE VALUE AS Injection Token WHILE iNJECTING LOGGER SERVICE
  // constructor(@Inject(LOGGER_TOKEN) private loggerService: LoggerService) { //creating instance of LoggerService isung Dependenvy Injection

  // }

    //Another way to inject logger service without constructor,use inject method

    // using provide value as injection token
  loggerService = inject(LOGGER_TOKEN)

      // using provide value as type
    //loggerService = inject(LoggerService)
  ngOnInit() {
    this.loggerService.logUserDetails('A','i')
  }
}
