import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Task } from '../Models/TaskModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient)

  allTasks: Task[] = []

  constructor(private cdr:ChangeDetectorRef){}

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
    console.log("Form data in dashboard component", data);
    this.http.post<{ key: string }>('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json', data).subscribe(data => {
      console.log(data);

    })
  }

  fetchAllTasks() {
    this.http.get<{ [key: string]: Task }>('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json').subscribe(data => {
      console.log(data);
      this.formatData(data)

    })
  }

  formatData(data : {[key: string]: Task }) {
    const listOfIds = Object.keys(data ?? {})
    const listOfTasks = Object.values(data ?? {})
    listOfTasks.map((task, index) => this.allTasks.push({ ...task, id: listOfIds[index] }))
    console.log(this.allTasks);
   this.cdr.detectChanges()

  }
}
