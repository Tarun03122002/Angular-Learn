import { Component, inject } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  coursesService = inject(CourseService);
  AllCourses: Course[] = this.coursesService.courses;

  // query param is used to pass additional information to the component through a route
  // localhost:4200/home?course=Science&class=1
  activeRoute: ActivatedRoute = inject(ActivatedRoute)
  searchString: any = '';
  ngOnInit() {

    // this.searchString =this.activeRoute.snapshot.queryParams['search'];
    // this.searchString =this.activeRoute.snapshot.queryParamMap.get('search');

    // console.log(this.searchString);
    // if(!this.searchString){
    //   this.AllCourses = this.coursesService.courses
    // }else{
    //   this.AllCourses = this.coursesService.courses.filter(course => course.title.toLowerCase().includes(this.searchString.toLowerCase()))
    // }

    // fOR SHOW JS ,query param is changing but snapshot is not picking latest value ,need to use observable
    this.activeRoute.queryParamMap.subscribe(latestQueryParam => {
      this.searchString = latestQueryParam.get('search')
      console.log(this.searchString);
      if (!this.searchString) {
        this.AllCourses = this.coursesService.courses
      } else {
        this.AllCourses = this.coursesService.courses.filter(course => course.title.toLowerCase().includes(this.searchString.toLowerCase()))
      }
    })
  }

}
