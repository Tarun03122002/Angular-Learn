import { NgModule } from "@angular/core";
import { Courses } from "./courses";
import { FeaturedCourses } from "./featured-courses/featured-courses";
import { CourseRoutingModule } from "./course-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[Courses,FeaturedCourses],
    imports:[
        CourseRoutingModule
    ],
    exports:[
        CourseRoutingModule
    ]

})
export class Course{

}