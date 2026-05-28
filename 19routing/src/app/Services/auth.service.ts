import { inject, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoggedIn: boolean = false

    userService: UserService = inject(UserService)
    router: Router = inject(Router)
    

    login(username: string, password: string) {
        const user = this.userService.users.find(user => user.username === username && user.password === password)

        if (!user) {
            this.userLoggedIn= false
            alert("Inavlid login credentials")
        }
        else {
            this.userLoggedIn = true
            alert("Welcome "+user.name +" You are Logged In")
            this.router.navigate(['courses'])
        }
        return user
    }

    logout(){
        this.userLoggedIn = false
    }

    isAuthentiacted(){
        return this.userLoggedIn
    }
}