import { Component, signal, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('23template-driven-form-revise');

  @ViewChild('registrationForm') form!: NgForm
  onSubmit() {
    // instead of receiving form object,we use View child
    console.log(this.form);

    // Accessing form control value using value property
    console.log(this.form.value.fName);
    console.log(this.form.value.lName, this.form.value.dob)
    // Accessing form control value using controls property
    console.log(this.form.controls['streetAdd1'].value,this.form.controls['country'].value);
    


  }
}
