import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Task } from '../../Model/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../../Services/task.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
    showCreateTaskForm: boolean = false;
  showTaskDetails: boolean = false;
  http: HttpClient = inject(HttpClient)
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);
  currentTaskId: string | undefined = '';
  isLoading: boolean = false;

  currentTask: Task | null = null;

  errorMessage: string | null = null;

  editMode: boolean = false;
  selectedTask!: Task | undefined

  errorSub!: Subscription

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  ngOnInit() {
    this.fetchAllTasks();
    this.errorSub = this.taskService.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      }
    })
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = { title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: '' }
  }

  showCurrentTaskDetails(id: string | undefined) {
    this.taskService.getTaskDetails(id).subscribe({
      next: (data : Task) => {
        this.showTaskDetails = true;
        this.currentTask = data
      }
    });
  }

  CloseTaskDetails() {
    this.showTaskDetails = false;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  CreateOrUpdateTask(data: Task) {
    if (!this.editMode)
      this.taskService.CreateTask(data);
    else
      this.taskService.UpdateTask(this.currentTaskId, data);
  }

  /*{
    key1: {},
    key2: {}
  }*/

  FetchAllTaskClicked() {
    this.fetchAllTasks()
  }

  private fetchAllTasks() {
    this.isLoading = true;
    this.taskService.GetAlltasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      }, error: (error) => {
        this.isLoading = false;
        this.setErrorMessage(error);
      }
    })
  }

  private setErrorMessage(err: HttpErrorResponse) {
    console.log(err);

    if (err?.error?.error === 'Permission denied') {
      this.errorMessage = 'You do not have permisssion to perform this action';
    }
    else {
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);
  }

  DeleteAllTask() {
    this.taskService.DeleteAllTasks();
  }

  OnEditTaskClicked(id: string | undefined) {
    this.currentTaskId = id;

    //OPEN EDIT TASK FORM
    this.showCreateTaskForm = true;
    this.editMode = true;

    this.selectedTask = this.allTasks.find((task) => { return task.id === id })
  }
}
