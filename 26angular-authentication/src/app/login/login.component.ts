import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/Auth.Service';
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
    if (this.isLogin) {
      return
    } else {
      this.isLoading = true
      this.authService.signup(this.loginSignUpForm.value.userName, this.loginSignUpForm.value.password).subscribe({
        next: (data) => {
          console.log("Sign up ", data);
          this.isLoading = false

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
}
