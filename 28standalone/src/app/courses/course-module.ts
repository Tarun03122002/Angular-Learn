import { NgModule } from "@angular/core";
import { Courses } from "./courses";
import { FeaturedCourses } from "./featured-courses/featured-courses";
import { CourseRoutingModule } from "./course-routing.module";

@NgModule({
    declarations:[Courses,FeaturedCourses],
    imports:[
        CourseRoutingModule
    ],

})
export class Course{

}