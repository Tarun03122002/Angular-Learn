import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Models/TaskModel';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  standalone: false

})
export class TaskDetailsComponent {

  @Input() currentTaskDetails!: Task | null 
  @Output() taskDetailsCloseEventEmitter : EventEmitter<boolean> = new EventEmitter<boolean>()

  onTaskDetailsClose() {
    this.taskDetailsCloseEventEmitter.emit(true)
  }
}
