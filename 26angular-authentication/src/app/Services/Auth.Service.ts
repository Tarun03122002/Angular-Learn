import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../Model/User";

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    http: HttpClient = inject(HttpClient)

    loggedInUserData = new BehaviorSubject<User>(null)

    signup(userId, password) {
        const data = { email: userId, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw", data).pipe(catchError((err) => {
            console.log(err, "erroor");
            const errorMessage = this.handleError(err)
            return throwError(() => errorMessage)
        }), tap(this.createUser))
    }

    login(userId, password) {
        const data = { email: userId, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw", data).pipe(catchError((err) => {
            const errorMessage = this.handleError(err)
            return throwError(() => errorMessage)
        }), tap((data) => this.createUser(data)))
    }

    private handleError(err: HttpErrorResponse) {

        let defaultMessage = 'Please try again later'
        debugger
        switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
                return "EMAIL ALREADY EXISTS";
            case 'OPERATION_NOT_ALLOWED':
                return "OPERATION_NOT_ALLOWED";
            case 'INVALID_LOGIN_CREDENTIALS':
                return 'INVALID_LOGIN_CREDENTIALS';
            default:
                return defaultMessage

        }


    }

    private createUser(data : AuthResponse) {
        const tokenExpiresDataTS = new Date(new Date().getTime() + +data.expiresIn);
        const newUser = new User(data.localId, data.email, tokenExpiresDataTS, data.idToken)
        this.loggedInUserData.next(newUser);
    }
}