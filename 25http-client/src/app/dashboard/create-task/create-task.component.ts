import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../Models/TaskModel';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  standalone : false

})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() taskFormData : EventEmitter<Task> = new EventEmitter<Task>()

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  onFormSubmit(form:NgForm){
    console.log(form.value);
    this.taskFormData.emit(form.value)
    this.OnCloseForm()
  }

}
