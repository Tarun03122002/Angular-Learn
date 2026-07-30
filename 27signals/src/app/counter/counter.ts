import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  // signal is a function we can pass default value in signal ,to specify type of value it is stored use <>
  counter = signal<number>(0) //creating a signal
  messages : string [] = []

  // useing a signal ->counter()

  ngOnInit(){

  }

  increement(){
    this.counter
  }

  decreement(){
    this.counter
  }
}
