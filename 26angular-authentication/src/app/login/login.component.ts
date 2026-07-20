import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginSignUpForm : FormGroup

  isLogin : boolean = true

  ngOnInit(){
    this.createForm()
  }

  private createForm(){
    this.loginSignUpForm = new FormGroup({
      userName : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }

  public onSubmit(){
    console.log(this.loginSignUpForm.value,"form");
    
  }

  public toggleForm(){
    this.isLogin = !this.isLogin
  }
}
