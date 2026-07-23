import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth.Service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  login!: Subscription
  signUp!: Subscription

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
      this.login = this.authService.login(userName, password).subscribe({
        next: (resp) => {
          console.log("Login", resp);
          this.isLoading = false
          this.router.navigateByUrl('/dashboard/overview')
        },
        error: (message) => {
          this.setErrorMessage(message)

        }
      })
    } else {
      this.signUp = this.authService.signup(userName, password).subscribe({
        next: (data) => {
          console.log("Sign up ", data);
          this.isLoading = false
          this.router.navigateByUrl('/dashboard/overview')
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


  ngOnDestroy() {
    this.login?.unsubscribe()
    this.signUp?.unsubscribe()
  }
}
