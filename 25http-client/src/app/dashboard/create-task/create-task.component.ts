import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../Models/TaskModel';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  standalone: false

})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() taskFormData: EventEmitter<Task> = new EventEmitter<Task>()

  @Input('isUpdateTask') updateTask: boolean = false
  @Input() formData: any
  @ViewChild('taskForm') taskForm!: NgForm

  taskFormHeaderLabel: string = ''

  ngOnInit() {
    this.taskFormHeaderLabel = this.updateTask ? "Update Task" : "Create a new Task"
    console.log("Form Data", this.formData);
  }

  ngAfterViewInit() {
    this.patchFormData()
  }
  OnCloseForm() {
    this.CloseForm.emit(false);
    this.formData =null
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
    this.taskFormData.emit(form.value)
    this.OnCloseForm()
  }

  patchFormData() {

    setTimeout(() => {
      this.taskForm.form.patchValue({...this.formData})
    })
  }
}
