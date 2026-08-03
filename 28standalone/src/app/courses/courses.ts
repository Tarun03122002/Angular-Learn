import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {}
