import { Component, signal } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';

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
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl('male'),
      // Grouping of form control ,use  formGroupName directive at parent wrapper of all these controls
      address: new FormGroup({
        streetAdd: new FormControl('', Validators.required),
        country: new FormControl('India', Validators.required),
        city: new FormControl(''),
        region: new FormControl(''),
        postal: new FormControl('', Validators.required)
      }),
      // creating formArray control
      skills: new FormArray([
        new FormControl(''),
        new FormControl(''),
        new FormControl('')

      ])

    })
  }

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray
  }
  onSubmit() {
    console.log("form", this.registrationForm);

  }
}
