import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  counter : number = 0
  messages : string [] = []


  ngOnInit(){

  }

  increement(){
    this.counter++
  }

  decreement(){
    if(this.counter>=1)
    this.counter--
  }
}
