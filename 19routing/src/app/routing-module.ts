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
import { Checkout } from "./checkout/checkout";
import { AuthGuardService } from "./Services/auth-guard.service";
import { canActivate, canActivateChild, canDeactivate, resolve } from "./auth.guard";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: Home },
    { path: 'home', component: Home },
    // { path: 'courses', component: Courses, resolve : { courses : AuthGuardService} },//courses is the property name which will store the resolve method returned valued,we will access property from activated route,snapshot.data['propertyName']
    { path: 'courses', component: Courses, resolve: { courses: resolve } },//courses is the property name which will store the resolve method returned valued,we will access property from activated route,snapshot.data['propertyName']

    // { path: 'contact', component: Contact ,canDeactivate : [AuthGuardService] },
    { path: 'contact', component: Contact, canDeactivate: [canDeactivate] },

    { path: 'about', component: About },
    // canActivate if applied to parent route,it will work on parent as well as all its child For e.g on courses if applied it will work for courses and all its children route like course/popular-courses,checkout
    // canActivateChild will work only for children not for parent
    // Note : if we apply canActivate only for children routes,then behaviour will also be same,but we have write canActivate multiple times which is not good in larger application
    {
        path: 'courses', canActivateChild: [canActivateChild], children: [
            { path: 'course/:id', component: CourseDetailComponent },
            { path: "popular-courses", component: PopularComponent },
            // {path:'checkout',component:Checkout,canActivate:[AuthGuardService]} //using angular 14
            // { path: 'checkout', component: Checkout, data: { title: "Science", price: "12" } } //latest version in angular 15 //passing static data to a route
            { path: 'checkout', component: Checkout, } 
        ]
    },
    { path: 'login', component: Login },
    { path: '**', component: NotFound },
];
@NgModule({
    // enableTracing used to console route events
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],//forRoot(routes) routes will avaliable throughout all the application
    //  forChild(routes) -> routes will be avaiblble only for featured module
    exports: [RouterModule] //export RouterModule so that it can be accessed in app Module
})
export class RoutingModule {

}