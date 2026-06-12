import { Component, signal, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('23template-driven-form-revise');

  genderList: Array<{ label: string, value: string, id: string }> = [{ label: 'Male', value: "M", id: "1" },{ label: 'Female', value: "F", id: "2" },{ label: 'Prefer Not to say', value: "N", id: "3" },]
  defaultGender = this.genderList[0].value
  selectedCountry = 'India'
  @ViewChild('registrationForm') form!: NgForm
  fName : string = ''
  @ViewChild('addr') addressFormGroup! : NgModelGroup
  onSubmit() {
    // instead of receiving form object,we use View child
    console.log(this.form);

    // Accessing form control value using value property
    console.log(this.form.value.fName);
    console.log(this.form.value.lName, this.form.value.dob)
    // Accessing form control value using controls property
    // console.log(this.form.controls['streetAdd1'].value, this.form.controls['country'].value);
    console.log(this.form.value.address.streetAdd1,this.form.getFormGroup(this.addressFormGroup).controls['country'].value);
    



  }
}
