import { Component, inject } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../Model/Task';
@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
    inprogress: number = 0;
  open: number = 0;
  started: number = 0;
  closed: number = 0;
  total: number = 0;
  tasks: Task[] = [];

  taskService: TaskService = inject(TaskService);

  ngOnInit(){
    this.taskService.GetAlltasks().subscribe((taskList: Task[]) => {
      this.tasks = taskList;
      this.total = taskList.length;
      this.open = taskList.filter((x : Task) => x.status === 'open').length;
      this.started = taskList.filter((x : Task) => x.status === 'started').length;
      this.inprogress = taskList.filter((x : Task) => x.status === 'in-progress').length;
      this.closed = taskList.filter((x : Task) => x.status === 'closed').length;
    });
  }
}
