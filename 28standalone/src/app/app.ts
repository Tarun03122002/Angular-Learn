import { Component, signal } from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports:[Home],
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('28standalone');
}
