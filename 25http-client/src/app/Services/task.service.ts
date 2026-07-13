import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Models/TaskModel";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient) { }

  createTask(task: Task, callback: any) {
    console.log("Form data to be added in DB", task);
    this.http.post<{ key: string }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json',
      task
    ).subscribe((data) => {
      callback(data)
    });
  }

  updateTask(task: Task,callback : any) {
    this.http.put<{ key: string }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/'+task.id+'.json',
      task
    ).subscribe((data) => {
      callback(data)
    })
  }

  deleteTask(id: string | undefined) {
    return this.http.delete(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + '.json'
    );
  }

  clearAllTasks() {
    return this.http.delete(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json'
    );
  }

  fetchAllTasks() {
    return this.http.get<{ [key: string]: Task }>(
      'https://httpclient-4723f-default-rtdb11.firebaseio.com/tasks.json'
    );
  }
}