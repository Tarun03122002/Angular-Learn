import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Courses } from "./courses";
import { FeaturedCourses } from "./featured-courses/featured-courses";

const courses : Routes = [
    {
        path:'',component:Courses
    },
    {
        path:'featured-courses',component:FeaturedCourses
    }
]
@NgModule({
    imports:[RouterModule.forChild(courses)],
    exports:[RouterModule]
})
export class CourseRoutingModule{

}