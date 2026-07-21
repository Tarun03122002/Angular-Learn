import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Task } from "../Model/Task";
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { LoggingService } from "./Logging.Service";
import { AuthService } from "./Auth.Service";
import { log } from "firebase/firestore/pipelines";
import { User } from "../Model/User";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    http: HttpClient = inject(HttpClient);
    loggingService: LoggingService = inject(LoggingService);
    errorSubject = new Subject<HttpErrorResponse>();

    authService: AuthService = inject(AuthService)

    CreateTask(task: Task) {
        const headers = new HttpHeaders({ 'my-header': 'hello-world' })
        this.http.post<{ name: string }>(
            'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json',
            task, { headers: headers }
        )
            .pipe(catchError((err) => {
                //Write the logic to log errors
                const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
                this.loggingService.logError(errorObj);
                return throwError(() => err);
            }))
            .subscribe({
                error: (err) => {
                    this.errorSubject.next(err);
                }
            });
    }

    DeleteTask(id: string | undefined) {
        this.http.delete('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + '.json')
            .pipe(catchError((err) => {
                //Write the logic to log errors
                const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
                this.loggingService.logError(errorObj);
                return throwError(() => err);
            }))
            .subscribe({
                error: (err) => {
                    this.errorSubject.next(err);
                }
            });
    }

    DeleteAllTasks() {
        this.http.delete('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json', { observe: 'events', responseType: 'json' })
            .pipe(tap((event) => {
                console.log(event);
                if (event.type === HttpEventType.Sent) {

                }
            }), catchError((err) => {
                //Write the logic to log errors
                const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
                this.loggingService.logError(errorObj);
                return throwError(() => err);
            }))
            .subscribe({
                error: (err) => {
                    this.errorSubject.next(err);
                }
            })
    }

    GetAlltasks() {
        // let headers = new HttpHeaders();
        // headers = headers.append('content-type', 'application/json');
        // headers = headers.append('content-type', 'text/html')

        // let queryParams = new HttpParams();
        // queryParams = queryParams.set('page', 2);
        // queryParams = queryParams.set('item', 10)

        // loggedInUserData is a subject ,it will be listened as soon as it emit value(it will not store latest emitted value so behaviour subject will be used whhich will store the last emitted value)
        // now on clicking fetch tasks"da" is logged as behaiour subject is storing last emitted value
        return this.authService.loggedInUserData.pipe(take(1), exhaustMap((user : User) => {
            return this.http.get<{ [key: string]: Task }>(
                'https://httpclient-4723f-default-rtdb.firebaseio.com/tasks.json',
                {params : new HttpParams().set('auth',user?.token ?? null)}
            ).pipe(map((response) => {
                //TRANSFORM DATA
                let tasks = [];
                console.log(response);
                for (let key in response) {
                    if (response.hasOwnProperty(key)) {
                        tasks.push({ ...response[key], id: key });
                    }
                }

                return tasks;
            }), catchError((err) => {
                //Write the logic to log errors
                const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
                this.loggingService.logError(errorObj);
                return throwError(() => err);
            }))
        }))
        // .subscribe((data) => {
        //     console.log(data, "da");

        // })
        // take(1) after taking first emitted value it will automiatically unsubscribe
        // ,we have user data now we  call tasks api by passing auth token in request param,so that firebase can valid authenticate user but here we have to return observable 
        //  so we just can't put evrything in subscribe otherwise we will not be able to return observable so use exhaustMap operator which will return obs and replace all chain by returining obs
    }

    UpdateTask(id: string | undefined, data: Task) {
        this.http.put('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + '.json', data)
            .pipe(catchError((err) => {
                //Write the logic to log errors
                const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
                this.loggingService.logError(errorObj);
                return throwError(() => err);
            }))
            .subscribe({
                error: (err) => {
                    this.errorSubject.next(err);
                }
            });
    }

    getTaskDetails(id: string | undefined) {
        return this.http.get('https://httpclient-4723f-default-rtdb.firebaseio.com/tasks/' + id + '.json')
            .pipe(map((response) => {
                console.log(response)
                let task = {};
                task = { ...response, id: id }
                return task;
            }))
    }
}