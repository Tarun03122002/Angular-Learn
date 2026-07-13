import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Task } from '../Models/TaskModel';
import { TaskService } from '../Services/task.service';
import { formatData } from '../helpers/taskFormatData';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  showCreateTaskForm = false;
  taskService = inject(TaskService);
  allTasks: Task[] = [];
  updateTask: boolean = false
  editFormData!: Task | null;
  isLoading: boolean = false
  errorMessage: string | null = ''
  destroy! : Subscription
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchAllTasks();
    this.destroy = this.taskService.errorSubject.subscribe({
      next: (error) => {
        console.log(error);

        this.setErrorMessage(error)
      }
    })
  }

  ngOnDestroy(){
    this.destroy.unsubscribe()
  }
  OpenCreateTaskForm() {
    this.updateTask = false
    this.editFormData = null
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  receivingTaskFormData(data: Task) {
    if (!this.updateTask) {
      // this.runAfterMutation(() =>
      this.taskService.createTask(data, (res: any) => {
        console.log(res);
        this.fetchAllTasks()
        this.CloseCreateTaskForm()

      })
      //   this.CloseCreateTaskForm();
      // });
    } else {
      data.id = this.editFormData?.id
      this.taskService.updateTask(data, (res: any) => {
        console.log(res);
        this.fetchAllTasks()
        this.CloseCreateTaskForm()

      })
    }

  }

  onDeleteTask(id: string | undefined) {
    this.runAfterMutation(() => this.taskService.deleteTask(id));
  }

  clearAllTasks() {
    this.runAfterMutation(() => this.taskService.clearAllTasks());
  }

  private runAfterMutation(operation: () => any, onSuccess?: () => void) {
    const result = operation();

    if (result?.subscribe) {
      result.subscribe({
        next: () => {
          this.fetchAllTasks();
          onSuccess?.();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Task operation failed', err);
          this.setErrorMessage(err)

        }
      });
      return;
    }

    this.fetchAllTasks();
    onSuccess?.();
  }

  fetchAllTasks() {
    this.isLoading = true
    this.cdr.detectChanges();
    this.taskService.fetchAllTasks().subscribe({
      next: (data) => {
        this.allTasks = formatData(data);
        console.log(this.allTasks, "ALL TASK");
        this.isLoading = false
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.setErrorMessage(err)
        this.cdr.detectChanges();
        console.error('Fetch tasks failed', err);
      }
    });
  }

  setErrorMessage(error: HttpErrorResponse) {
    this.isLoading = false
    this.errorMessage = error?.error?.error
    this.cdr.detectChanges()

    setTimeout(() => {
      this.errorMessage = ''
      this.cdr.detectChanges()
    }, 3000)
  }
  editTask(task: Task) {
    this.showCreateTaskForm = true
    this.updateTask = true
    this.editFormData = task
  }
}