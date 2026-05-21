import { Component } from '@angular/core';
import { TaskServiceTs } from '../services/task.service.ts';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-show-tasks',
  imports: [],
  templateUrl: './show-tasks.html',
  styleUrl: './show-tasks.scss',
})
export class ShowTasks {

  taskList : string [] = ['TASK 1','TASK 2','TASK 3']

  constructor(private taskService : TaskServiceTs){

  }

  ngOnInit(){

    this.taskService.createTask.subscribe((task : string) => 
    
      this.taskList.push(task))
  }
}
