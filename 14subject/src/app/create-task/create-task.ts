import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskServiceTs } from '../services/task.service.ts';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss',
})
export class CreateTask {

  task : string = ''
  
  taskService : TaskServiceTs = inject(TaskServiceTs)

  onButtonClick(){
    console.log(this.task);
    this.taskService.onAddingTask(this.task)
  }

    ngOnInit(){

    this.taskService.createTask.subscribe((task : string) => 
    console.log(task,"inside ngOnInit")
    )
    
    console.log("After subsribe");
    
  }
}
