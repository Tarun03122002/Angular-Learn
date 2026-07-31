import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class ActionService{

    toggle! : boolean


    onActionClick(){
        this.toggle = !this.toggle

        if(this.toggle) return 'Start Working';
        else return 'Stop'
    }
}