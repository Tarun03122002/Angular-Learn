import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
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
    // sending headers in http request
    let headers = new HttpHeaders({ 'new-header': 'Science' })
    // other ways to send headers using set method and append method 
    // HttpHeaders IS IMMUTABLE 
    // immutability means that a value cannot be changed after it is created. Instead of modifying the original data structure directly, any updates or changes must return a NEW INSTANCE or reference
    headers = headers.set('Content-Type', 'application/json'),
      headers = headers.set('Allow-Cross-Origin-Headers', "*")

    // diff b/w set and append
    // set method will replace if value is already present for a header
    // append method will add in list(UI -> comma separated) if value is already for a header
    headers = headers.set('new-header', 'QWERTY')
    headers = headers.append('new-header', 'keyboard')

    return this.http.get<{ [key: string]: Task }>(
      'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json',
      { headers: headers }
    ).pipe(catchError((err) => {
      const data = { status: err.status, message: err.message, dateTime: new Date() }
      this.logService.logErrorInDB(data)
      return throwError(() => err);
    }));
  }

  getTaskDetails(id: string | undefined) {
    // sending  Query string in api endpoint
    let queryString = new HttpParams() //immutable
    queryString = queryString.set('pageNo',1);
    queryString = queryString.set('noOfRecords',20)
    return this.http.get<Task>('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + ".json",
      {params : queryString}
    )
  }
}