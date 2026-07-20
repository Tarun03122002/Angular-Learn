import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { email } from "@angular/forms/signals";
import { catchError, throwError } from "rxjs";
import { log } from "firebase/firestore/pipelines";

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    http: HttpClient = inject(HttpClient)

    signup(userId, password) {
        const data = { email: userId, password: password }
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw", data).pipe(catchError((err) => {
            console.log(err, "erroor");
            const errorMessage = this.handleError(err)
            return throwError(() => errorMessage)
        }))
    }

    private handleError(err: HttpErrorResponse) {

        let defaultMessage = ''

        switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
                return "EMAIL ALREADY EXISTS";
            case 'OPERATION_NOT_ALLOWED':
                return "OPERATION_NOT_ALLOWED";
            default:
                return defaultMessage

        }


    }
}