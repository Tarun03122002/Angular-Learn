import { Component, EventEmitter, Output, Input, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../Model/Task';
import { CounterService } from '../../Services/CounterService';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  standalone: false,

  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Input() isEditMode: boolean = false;

  @Input() selectedTask!: Task

  @ViewChild('taskForm') taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  counterService : CounterService = inject(CounterService)

  ngOnInit(){
    this.counterService.increaseCounter('Create Task (Feature Module)')
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);

  }

  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm) {
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }
}
