import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Task } from '../Models/TaskModel';
import { TaskService } from '../Services/task.service';
import { formatData } from '../helpers/taskFormatData';

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchAllTasks();
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  receivingTaskFormData(data: Task) {
    // this.runAfterMutation(() =>
      this.taskService.createTask(data,(res : any) => {
        console.log(res);
         this.fetchAllTasks()
         this.CloseCreateTaskForm()
        
      })
    //   this.CloseCreateTaskForm();
    // });
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
        error: (err: unknown) => {
          console.error('Task operation failed', err);
        }
      });
      return;
    }

    this.fetchAllTasks();
    onSuccess?.();
  }

  fetchAllTasks() {
    this.taskService.fetchAllTasks().subscribe({
      next: (data) => {
        this.allTasks = formatData(data);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Fetch tasks failed', err);
      }
    });
  }
}