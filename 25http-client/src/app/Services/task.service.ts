import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Models/TaskModel";
import { catchError, Subject, throwError } from "rxjs";
import { LoggerService } from "./logs.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient, private readonly logService: LoggerService) { }

  errorSubject = new Subject<HttpErrorResponse>() //handling error message when subscribe in service using subject
  // subject -> emits same data to multiple subscribers


  createTask(task: Task, callback: any) {
    console.log("Form data to be added in DB", task);
    this.http.post<{ key: string }>(
      'https://httpclient-4723f1-default-rtdb.firebaseio.com/tasks.json',
      task
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    })).subscribe({
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
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    })).subscribe({
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
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    }));
  }

  clearAllTasks() {
    return this.http.delete(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json'
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    }));
  }

  fetchAllTasks() {
    return this.http.get<{ [key: string]: Task }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json'
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    }));
  }

  getTaskDetails(id: string | undefined){
    return this.http.get<Task>('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/'+id+".json")
  }
}