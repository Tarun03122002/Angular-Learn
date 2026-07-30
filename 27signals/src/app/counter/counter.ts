import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  // signal is a function we can pass default value in signal ,to specify type of value it is stored use <>
  counter = signal<number>(0) //creating a signal
  messages = signal<string[]>([])

  doubleCounter = computed(() => this.counter() * 2) //computed doubleCounter signal will be computed whenver counter signal value will be updated,
  // whenever counter signal value is changed ,it will rerender only the doubleCounter() value in ui (Angular will not rerender entire component .That's the benifit of signals)

  // useing a signal ->counter()

  // effect whenvere signal value update ,and we want to perform some logic ,use effect signal in constructor

  constructor(){
    effect(() => {
      // console.log("Counter value change",this.counter());
      console.log("Counter value changed but we are not using signal inside effect ,so it will not log,It will call effect if signal inside effect is used and its value will be changed");
      
      
    })
  }
  ngOnInit(){

  }

  // updating value of signal
  // set method -> to set value but it does not have access of previous value
  // update ->  to update value of immutable(string,number,boolean) but it has access of previous value using callback -> It does not overrirde instead create a new value and updates the reference
  // mutate -> to mutate value of mutable(array,object) but it has access of previous value using callback -> It overrides the existing value to update
  increement(){
    // this.counter.set(this.counter() + 1)
    this.counter.update((previousValue) => previousValue+1)
    console.log(this.counter());
    this.messages.update((prevValue) => [...prevValue,'Current counter Value :'+this.counter()])
    
  }

  decreement(){
    if(this.counter() >=1)
    this.counter.update((previousValue) => previousValue-1)

    this.messages.update((prevValue) => prevValue.filter((ele,index)=> index != this.messages()?.length-1))
  }
}
