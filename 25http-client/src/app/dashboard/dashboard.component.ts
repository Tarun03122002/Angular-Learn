import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Models/TaskModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone : false
})
export class DashboardComponent{
  showCreateTaskForm: boolean = false;

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  receivingTaskFormData(event : Task){
    console.log("Form data in dashboard component",event);
    
  }
}
