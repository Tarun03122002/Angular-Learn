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

  @ViewChild('registrationForm') form! : NgForm
  onSubmit(){
    // instead of receiving form object,we use View child
    console.log(this.form);
    
  }
}
