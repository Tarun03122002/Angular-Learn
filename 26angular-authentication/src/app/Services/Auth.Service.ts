import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    http: HttpClient = inject(HttpClient)

    loggedInUserData = new BehaviorSubject<User>(undefined)

    router : Router = inject(Router)

    private expiresTimerId : any

    signup(userId, password) {
        const data = { email: userId, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw", data).pipe(catchError((err) => {
            console.log(err, "erroor");
            const errorMessage = this.handleError(err)
            return throwError(() => errorMessage)
        }), tap((data) => this.createUser(data)))
    }

    login(userId, password) {
        const data = { email: userId, password: password, returnSecureToken: true }
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw", data).pipe(catchError((err) => {
            const errorMessage = this.handleError(err)
            return throwError(() => errorMessage)
        }), tap((data) => this.createUser(data)))
    }

    logout() {
        this.loggedInUserData.next(null)
        localStorage.removeItem('user')
        if(this.expiresTimerId){
            clearTimeout(this.expiresTimerId)
        }
    }

    autoLogin() {
        const loggedInUser = JSON.parse(localStorage.getItem('user'))
        console.log(loggedInUser);

        if (!loggedInUser)
            return;
        console.log("no return");

        const user = new User(loggedInUser.userId, loggedInUser.email, loggedInUser.expireInDate, loggedInUser._token)
        if (user.token){
            this.loggedInUserData.next(user)
            const expiresIn = loggedInUser.expireInDate.getTime() - new Date().getTime() //Future Time(secs) -Current Time(sec)
            this.autoLogout(expiresIn)
        }
            
    }

    autoLogout(expiresInMilliSeconds) { // call when new user is emitted

        this.expiresTimerId = setTimeout(() => {
            this.logout();
            this.router.navigate(['/login'])

        },expiresInMilliSeconds)//autologout tested with 2000 ms (2sec)
        // if we manually logout then we have to clerar timer otherwise two times logout will happen
    }

    private handleError(err: HttpErrorResponse) {

        let defaultMessage = 'Please try again later'
        if (!err?.error || !err?.error?.error?.message)
            return defaultMessage
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

    private createUser(data: AuthResponse) {
        const tokenExpiresDataTS = new Date().getTime() + +data.expiresIn * 1000;
        const tokenExpiresDate = new Date(tokenExpiresDataTS)
        const newUser = new User(data.localId, data.email, tokenExpiresDate, data.idToken)
        localStorage.setItem('user', JSON.stringify(newUser))

        this.loggedInUserData.next(newUser);
        this.autoLogout( +data.expiresIn * 1000)
    }
}