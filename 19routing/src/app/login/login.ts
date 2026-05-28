import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  @ViewChild('username') username : ElementRef
  @ViewChild('password') password : ElementRef


  constructor(private authService:AuthService,private activeRoute:ActivatedRoute){}
  

  ngOnInit(){
    this.activeRoute.queryParamMap.subscribe(data => {
      const logout = data.get('logout')
      if(logout){
        this.authService.logout()
        alert("You are logged out ,userLoggedIn="+this.authService.isAuthentiacted())
      }
    })
  }
  OnLoginClicked(){
    const user =  this.authService.login(this.username.nativeElement?.value,this.password.nativeElement?.value)

  }
}
