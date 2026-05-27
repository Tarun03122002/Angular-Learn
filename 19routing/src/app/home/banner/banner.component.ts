import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  constructor(private router:Router){}
  
  searchCourses(searchString:string){
    this.router.navigate(['courses'],{
      queryParams:{search:searchString}
    })
  }
}
