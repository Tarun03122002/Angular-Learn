import { Component } from '@angular/core';
import { Detail } from './detail/detail';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[Detail,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
