import { NgModule } from "@angular/core";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { PopularComponent } from "./home/popular/popular.component";
import { NotFound } from "./not-found/not-found";
import { About } from "./about/about";
import { Contact } from "./contact/contact";
import { Courses } from "./courses/courses";
import { Home } from "./home/home";
import { RouterModule, Routes } from "@angular/router";
import { Login } from "./login/login";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'courses', component: Courses },
    { path: 'contact', component: Contact },
    { path: 'about', component: About },
    {
        path: 'courses', children: [
            { path: 'course/:id', component: CourseDetailComponent },
            { path: "popular-courses", component: PopularComponent }
        ]
    },
    {path:'login',component:Login},
    { path: '**', component: NotFound },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],//forRoot(routes) routes will avaliable throughout all the application
    //  forChild(routes) -> routes will be avaiblble only for featured module
    exports: [RouterModule] //export RouterModule so that it can be accessed in app Module
})
export class RoutingModule {

}