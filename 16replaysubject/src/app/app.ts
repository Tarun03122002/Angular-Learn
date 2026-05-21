import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

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
  }

}
