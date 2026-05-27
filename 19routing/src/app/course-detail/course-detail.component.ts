import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../Services/course.service';
import { Course } from '../Models/course';


@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {

  // To access route parameter(id),use activated route -> snapshot property

  // snapshot -> params which will be object
  // paramMap -> map ,use get(routeParameter in string) return string

  // Snapshot will contains the current value of route.If the value of route parameter will change after the first change,it will not capture the current change,so
  // in those cases use observable

  selectedCourse: Course
  courseId: number

  courseService: CourseService = inject(CourseService)

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeRoute);

    // this.courseId = this.activeRoute.snapshot.params['id'] //params is deprecated use paramMap
    this.courseId = +this.activeRoute.snapshot.paramMap.get('id') 
    this.selectedCourse = this.courseService.courses.find(course => course.id === this.courseId)
    console.log(this.courseId, this.selectedCourse);

  }
}
