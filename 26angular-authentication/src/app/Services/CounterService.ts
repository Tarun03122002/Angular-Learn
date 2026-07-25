import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})//single instance of counter service will be used in main module or feature moduled if providedin : 'root'
export class CounterService{
    counter : number = 0

    increaseCounter(componentName:string){
        console.log(componentName," : ",this.counter++);
        
    }

}