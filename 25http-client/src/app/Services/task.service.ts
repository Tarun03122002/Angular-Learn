import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Models/TaskModel";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient) { }

  errorSubject = new Subject<HttpErrorResponse>() //handling error message when subscribe in service using subject
  // subject -> emits same data to multiple subscribers
  createTask(task: Task, callback: any) {
    console.log("Form data to be added in DB", task);
    this.http.post<{ key: string }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json',
      task
    ).subscribe({
      next: (data) => {
        callback(data)
      },
      error: (err) => {
        this.errorSubject.next(err)
      }
    });
  }

  updateTask(task: Task, callback: any) {
    this.http.put<{ key: string }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + task.id + '.json',
      task
    ).subscribe({
      next: (data) => {
        callback(data)
      },
      error: (err) => {
        this.errorSubject.next(err)
      }
    })
  }

  deleteTask(id: string | undefined) {
    return this.http.delete(
      'https://1httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + '.json'
    );
  }

  clearAllTasks() {
    return this.http.delete(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json'
    );
  }

  fetchAllTasks() {
    return this.http.get<{ [key: string]: Task }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json'
    );
  }
}