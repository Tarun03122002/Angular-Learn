import { Component, inject } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  coursesService = inject(CourseService);
  AllCourses: Course[] = this.coursesService.courses;
}
