// Firstly A module in angular is independent of other modules(that means a module will have its declaration and import and export separtely)
// also you can't declare a component,pipe,directive etc in two modules

import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";
import { FormsModule } from "@angular/forms";

// A feature module is a way of organizing all components,pipe,directives etc related to same feature together
// We are now creating dashboard into featured module

// To declare a module use @NgModule annotation

@NgModule({
    declarations: [
        DashboardComponent,
        CreateTaskComponent,
        TaskDetailsComponent,

    ],
    // All the components declared in Featured Module also need to export bcoz they are using in app-routing-module which itself is used in app module
    // As mentioned above ,Loader Snackbar can't be declared here(Dashboard Module) as it is already declared in AppModule ,so for all components whic are shared between two modules,we will 
    // move into sharedModule ,then import SharedModule in dashboardModule and then import dashboardModule in AppModule (so it will available in both module)
    exports: [
        DashboardComponent,
        CreateTaskComponent,
        TaskDetailsComponent,
        SharedModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule  // I have imported SharedModule which contains shared component declaration,directives,common import etc
        // We will not import SharedModule twice in both Dashboard and app module instead we need to import DashboardModule to appModule ,so we will add export in DashboardModule ,through which sharedModule will also 
        // availble to appModule
        
    ]
})
export class DashboardModule {

}
