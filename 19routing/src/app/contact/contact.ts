import { Component } from '@angular/core';
import { Reset } from '../Services/auth-guard.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements Reset{

  fName : string = ''
  lName : string = ''
  message : string = ''
  country : string = 'australia'
  isSubmitClicked : boolean = false
  onSubmit(){
    this.isSubmitClicked = true
  }

  reset(){
    if((this.fName || this.lName || this.message) && !this.isSubmitClicked){
      if(confirm("You have unsaved changes.Do you want to leave without saving changes?")){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
  }
}
