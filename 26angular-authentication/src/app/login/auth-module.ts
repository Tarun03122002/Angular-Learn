// Creating Auth Featured Module

import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared.module";

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        SharedModule
    ]
})
export class AuthModule{

}