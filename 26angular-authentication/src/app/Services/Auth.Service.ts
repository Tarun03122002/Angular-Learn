import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { email } from "@angular/forms/signals";

@Injectable({
    providedIn : 'root'
})
export class AuthService{


    http : HttpClient = inject(HttpClient)

    signup(userId,password){
        const data = {email : userId,password : password}
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw",data)
    }

    private handleError(err : HttpErrorResponse){
        console.log(err);
        
    }
}