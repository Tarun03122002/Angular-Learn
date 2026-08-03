import { Route } from "@angular/router";
import { Courses } from "./courses";
import { FeaturedCourses } from "./featured-courses/featured-courses";

export const COURSE_ROUTES: Route[] = [
    {
        path: '', component: Courses
    },
    {
        path: 'featured-courses', component: FeaturedCourses
    }
]
