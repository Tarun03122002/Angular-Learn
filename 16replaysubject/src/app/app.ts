import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('16replaysubject');

  // rs = new Subject()
  // rs = new BehaviorSubject<number>(0)
  // rs = new ReplaySubject<number>()
  rs = new ReplaySubject<number>(2) //store last 2  values in buffer
  as = new AsyncSubject();
  ngOnInit() {
    this.rs.next(10)
    this.rs.next(20)
    this.rs.next(30)

    // Subscriber 1
    this.rs.subscribe((val) => {
      console.log("Subscriber 1 : ", val);
    })
    this.rs.next(40)

    // Subscriber 2
    this.rs.subscribe((val) => {
      console.log("Subscriber 2 : ", val);
    })

    this.rs.next(50)
    // Subscriber 3
    this.rs.subscribe((val) => {
      console.log("Subscriber 3 : ", val);
    })

    this.rs.next(60)
    // Subscriber 4
    this.rs.subscribe((val) => {
      console.log("Subscriber 4 : ", val);
    })



    //  Async subject
    this.as.next(10)
    this.as.next(20)
    this.as.next(30)
    
    // this.as.complete()
    // this.as.next(40)

    this.as.subscribe(val => {
      console.log("Subscribe 1 for async subject", val);

    })

    this.as.subscribe(val => {
      console.log("Subscribe 2 for async subject", val);

    })

    this.as.complete()
    this.as.next(40) //discard emitted value after complete
    this.as.complete() //already complete happens in 67 line so disacrd it by angular

  }



}
