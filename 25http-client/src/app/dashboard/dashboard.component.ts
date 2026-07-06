import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Models/TaskModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone : false
})
export class DashboardComponent{
  showCreateTaskForm: boolean = false;
  http : HttpClient = inject(HttpClient)

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  receivingTaskFormData(event : Task){
    console.log("Form data in dashboard component",event);
    this.http.post('https;//firestore.googleapis.com/v1/projects/httpclient-4723f/databases/tasks.json',event).subscribe(data => {
      console.log(data);
      
    })
  }
  

}
