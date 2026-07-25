import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/Auth.Service';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CounterService } from '../Services/CounterService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,

  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService,private router : Router) {

  }

  userSubject : Subscription
  isLoggedIn: boolean = false
   counterService : CounterService = inject(CounterService)

  ngOnInit() {
    this.counterService.increaseCounter('Header Component(Main Module)')
    this.userSubject= this.authService.loggedInUserData.subscribe((resp : User) => {
      console.log("r4sp",resp,resp?.token);
      this.isLoggedIn = resp?.token ? true : false
    })
  }

  ngOnDestroy(){
    this.userSubject?.unsubscribe()
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])

  }
}
