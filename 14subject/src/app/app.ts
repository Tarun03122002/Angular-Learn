import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTask } from './create-task/create-task';
import { ShowTasks } from './show-tasks/show-tasks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CreateTask,ShowTasks],
  

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('14subject');
}
