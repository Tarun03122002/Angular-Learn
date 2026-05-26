import { Component, inject } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-popular',
  standalone: false,
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  router:Router = inject(Router) // navigate b/w routes programtically
  activeRoute : ActivatedRoute = inject(ActivatedRoute)
  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  navigateToCourses(){

    // navigate and navigatebyUrl method used to navigate b/w routes programtically
    // by default absolute route but here there is no "/" concept,so route will be appended to root url
    
    // navigate method takes array as an argument and in that we specify route segments
    // route segements -> localhost:4200/home/courses/course2
    // here home,courses,course2 are route sgements
  
    // this.router.navigate(['home','courses'])
    this.router.navigate(['courses'])
    // this.router.navigateByUrl('courses')

    //if we want relative use navigate method like this
    // provide relativeTo what,here it is the currently active route
    // this.router.navigate(['courses'],{
    //   relativeTo:this.activeRoute
    // })
  }
}
