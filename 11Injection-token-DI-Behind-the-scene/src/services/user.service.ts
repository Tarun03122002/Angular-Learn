
import { Inject, Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { UserDto } from "../user.dto";
import { LOGGER_TOKEN } from "../app/app-module";

@Injectable() 
export class UserService{

    // USING PROVIDE VALUE AS STRING WHILE iNJECTING LOGGER SERVICE
    // constructor(@Inject('LOGGER_TOKEN')private loggerService:LoggerService){ //creating instance of LoggerService isung Dependenvy Injection

    // }

     // USING PROVIDE VALUE AS Injection Token WHILE iNJECTING LOGGER SERVICE
    constructor(@Inject(LOGGER_TOKEN)private loggerService:LoggerService){ //creating instance of LoggerService isung Dependenvy Injection

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