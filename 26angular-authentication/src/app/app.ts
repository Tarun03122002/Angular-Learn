import { Component, inject, signal } from '@angular/core';
import { AuthService } from './Services/Auth.Service';
import { log } from 'firebase/firestore/pipelines';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('26angular-authentication');

  authService : AuthService = inject(AuthService)

  ngOnInit(){    
    this.authService.autoLogin()

  }
}
