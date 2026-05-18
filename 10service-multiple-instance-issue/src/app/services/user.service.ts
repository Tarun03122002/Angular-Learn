import { Injectable } from "@angular/core";
import { UserDto } from "../user.dto";
import { LoggerService } from "./logger.service";

@Injectable({
    providedIn:'root' //here it is standalone project,so even if i provide in app root ,still i need to provide LoggerService in providerArray where UserService is used
}) // Use @Injectable() annotation to inject one service into another service
export class UserService{

    constructor(private loggerService:LoggerService){ //creating instance of LoggerService isung Dependenvy Injection

    }

    userList : Array<UserDto> = [
        {name:'Sahil',gender:'M',subscCategory:'Y',subsStatus:'A'},
        {name:'Mayank',gender:'M',subscCategory:'Q',subsStatus:'I'},
        {name:'Priyanshu',gender:'F',subscCategory:'Y',subsStatus:'A'}

    ]

    addUser(user:UserDto){
        this.userList.push(user)

        // const loggerService = new LoggerService() //creating instance of Logger service explicitly 

        this.loggerService.logUserDetails(user.name,user.subsStatus)
    }

    getAllUsers(){
        return this.userList;
    }
}