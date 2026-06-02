import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../Models/course';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {

  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  course: any

  route: Router = inject(Router)

  constructor() {
    this.course = this.route.getCurrentNavigation().extras.state
    console.log(this.course,"receiving dynamic data inside constructor");
    

  }
  ngOnInit() {
    //  receiving static data to a route
    // this.activeRoute.data.subscribe((data: Course) => {
    //   console.log("receiving static data", data);
    //   this.course = data
    // })

    //  receiving dynamic data to a route
    // this.course = this.route.getCurrentNavigation().extras.state //not working in ngOnInit but works inside constructor
    // this.course = history.state
    // console.log("receiving dynamic data", this.course);
    console.log(this.route.lastSuccessfulNavigation()?.extras.state);
    

  }

}
