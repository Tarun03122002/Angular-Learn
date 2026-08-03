import { Component, signal } from '@angular/core';
import { Home } from './home/home';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports:[Home,RouterModule],
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('28standalone');
}
