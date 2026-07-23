import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { canActivate } from "../Guard/auth.guard";
import { Overview } from "./overview/overview";
import { Stats } from "./stats/stats";

const routes: Routes = [
    {
        path: 'dashboard', canActivate: [canActivate], children: [
            { path: 'overview', component: Overview },
            { path: "stats", component: Stats }
        ]
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes), //adding router module forChild.An angular app will have only RouterModule.forRoot() one time and forChild can be used multiple times.At the end ,all are combined

    ],
    exports:[
        RouterModule 
    ]
})
export class DashboardRoutingModule {

}