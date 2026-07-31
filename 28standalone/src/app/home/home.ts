import { Component } from '@angular/core';
import { Detail } from './detail/detail';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[Detail],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
