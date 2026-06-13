import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('24reactive-form');

  // To create a reactive form,I need to create an instance of FormGroup 
  // Pass object in FormGroup Constructor and create form control  
  // After that map FormGroup instance with formGroup directive in view template
  // Also map each input with formControlName directive
  registrationForm!: FormGroup

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.registrationForm = new FormGroup({
      fName: new FormControl('',Validators.required),
      lName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      userName: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl('male'),
      streetAdd: new FormControl(''),
      country: new FormControl('India'),
      city: new FormControl(''),
      region: new FormControl(''),
      postal: new FormControl('')

    })
  }

  onSubmit(){
    console.log("form",this.registrationForm);
    
  }
}
