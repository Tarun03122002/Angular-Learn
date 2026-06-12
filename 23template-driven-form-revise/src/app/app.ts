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

  genderList: Array<{ label: string, value: string, id: string }> = [{ label: 'Male', value: "M", id: "1" }, { label: 'Female', value: "F", id: "2" }, { label: 'Prefer Not to say', value: "N", id: "3" },]
  defaultGender = this.genderList[0].value
  selectedCountry = 'India'
  @ViewChild('registrationForm') form!: NgForm
  fName: string = ''
  @ViewChild('addr') addressFormGroup!: NgModelGroup
  onSubmit() {
    // instead of receiving form object,we use View child
    console.log(this.form);

    // Accessing form control value using value property
    console.log(this.form.value.fName);
    console.log(this.form.value.lName, this.form.value.dob)
    // Accessing form control value using controls property
    // console.log(this.form.controls['streetAdd1'].value, this.form.controls['country'].value);
    console.log(this.form.value.address.streetAdd1, this.form.getFormGroup(this.addressFormGroup).controls['country'].value);




  }
  // using setValue -> need to pass entire value object with same structure even if i want to update one form control this.form.setValue()

  // using patchValue -> only need to form control which i need to update.it will access on this.form.form.patchValue()
  generateUserName() {
    let user = ""
    const { fName, lName, dob } = this.form.value;

    if (fName?.length > 3) user += fName.slice(0, 3)
    else user += fName

    if (lName?.length > 3) user += lName.slice(0, 3)
    else user += lName

    const dobYearExtract = new Date(dob).getFullYear()
    user+=dobYearExtract

    user= user.toLowerCase()
    console.log("Generated Username",user);
    // this.form.value.userName = user // it will not work as it readonly only
    // this.form.setValue({
    //   fName:'',
    //   lName:'',
    //   gender:"",
    //   dob:"",
    //   email:"",
    //   phoneNo:"",
    //   address:{
    //     streetAdd1:"",
    //     streetAdd2:"",
    //     city:"",
    //     region:"",
    //     postalCode:"",
    //     country:""
    //   },
    //   userName:user
    // })
    this.form.form.patchValue({
      userName:user,
      address : {
        country:"India"
      },
      gender:'M'
    })
  }
}
