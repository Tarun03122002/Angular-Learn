// Creating Auth Featured Module

import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared.module";
import { RouterModule, Routes } from "@angular/router";


const routes : Routes = [
    {path:'login',component:LoginComponent}
]
@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AuthModule{

}