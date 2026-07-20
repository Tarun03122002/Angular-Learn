import { Component } from '@angular/core';
import { AuthService } from '../Services/Auth.Service';
import { User } from '../Model/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,

  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {

  }

  isLoggedIn: boolean = false
  ngOnOnit() {
    this.authService.loggedInUserData.subscribe((resp : User) => {
      debugger
      console.log("r4sp",resp);
      
      this.isLoggedIn = resp.token ? true : false
    })
  }
}
