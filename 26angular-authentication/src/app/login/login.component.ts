import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth.Service';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { AuthResponse } from '../Model/AuthResponse';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginSignUpForm: FormGroup

  isLogin: boolean = true

  authService: AuthService = inject(AuthService)

  isLoading: boolean = false

  errorMessage: string | null = null

  router: Router = inject(Router)

  ngOnInit() {

    this.createForm()
  }

  private createForm() {
    this.loginSignUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  public onSubmit() {
    console.log(this.loginSignUpForm.value, "form");
    const { userName, password } = this.loginSignUpForm.value
    this.loginSignUpForm.reset()
    this.isLoading = true
    if (this.isLogin) {
      this.authService.login(userName, password).subscribe({
        next: (resp) => {
          console.log("Login", resp);
          this.addUserToMaintainState(resp)
        },
        error: (message) => {
          this.setErrorMessage(message)

        }
      })
    } else {
      this.authService.signup(userName, password).subscribe({
        next: (data) => {
          console.log("Sign up ", data);
          this.addUserToMaintainState(data)

        },
        error: (errorMessage) => {
          this.setErrorMessage(errorMessage)
        }
      })
    }

  }

  public toggleForm() {
    this.isLogin = !this.isLogin
  }

  private setErrorMessage(errorMessage: string) {
    this.isLoading = false
    this.errorMessage = errorMessage
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

  private addUserToMaintainState(data: AuthResponse) {
    this.isLoading = false
    const tokenExpiresDataTS = new Date(new Date().getTime() + +data.expiresIn);
    const newUser = new User(data.localId, data.email, tokenExpiresDataTS, data.idToken)
    this.authService.loggedInUserData.next(newUser);
    this.router.navigate(['/dashboard'])
  }
}
