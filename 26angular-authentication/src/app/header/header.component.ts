import { Component } from '@angular/core';
import { AuthService } from '../Services/Auth.Service';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,

  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {

  }

  userSubject : Subscription
  isLoggedIn: boolean = false
  ngOnInit() {
    this.authService.loggedInUserData.subscribe((resp : User) => {
      console.log("r4sp",resp);
      this.isLoggedIn = resp?.token ? true : false
    })
  }

  ngOnDestroy(){
    this.userSubject?.unsubscribe()
  }
}
