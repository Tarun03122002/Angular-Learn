import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Models/TaskModel";
import { catchError, Subject, tap, throwError } from "rxjs";
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
    queryString = queryString.set('pageNo', 1);
    queryString = queryString.set('noOfRecords', 20)
    // observe response and Response types

    // by default observe value is body 
    // by default responseType "json" so we get response in json which angular automtically converst into JS object
    return this.http.get<Task | any>('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + ".json",
      {
        params: queryString,
        // observe : 'body'
        // observe : 'response'//return HttpResponse OBJECT
        observe: 'events'

      }
    ).pipe(tap((res) => {
      // response Type enum
      //         declare enum HttpEventType {
      //     /**
      //      * The request was sent out over the wire.
      //      */
      //     Sent = 0,
      //     /**
      //      * An upload progress event was received.
      //      *
      //      * Note: The `FetchBackend` doesn't support progress report on uploads.
      //      */
      //     UploadProgress = 1,
      //     /**
      //      * The response status code and headers were received.
      //      */
      //     ResponseHeader = 2,
      //     /**
      //      * A download progress event was received.
      //      */
      //     DownloadProgress = 3,
      //     /**
      //      * The full response including the body was received.
      //      */
      //     Response = 4,
      //     /**
      //      * A custom event from an interceptor or a backend.
      //      */
      //     User = 5
      // }
      if (HttpEventType.Response == res.type) {
      console.log("RESPONSE HTTP EVENT", res);

      }
      // use case if request is sent -> event type is 0 -> show either toaster or loader 
    }))
  }
}