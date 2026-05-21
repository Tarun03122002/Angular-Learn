import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('15BehaviorSubject');

  bhSubject = new BehaviorSubject<number>(100)

  // bhSubject = new Subject()


  ngOnInit() {
    // this.bhSubject.next(1) //test with this also

    // in Behaior subject ,if initial value and first emit take place ,it give preference to first emit here it is 1.
    // Actualyy you can say it is last emit to new subsribers 
    this.bhSubject.subscribe(val => {
      console.log("Subsriber 1: ", val);

    })
    this.bhSubject.next(50)

    this.bhSubject.subscribe(val => {
      console.log("Subsriber 2: ", val);

    })

    this.bhSubject.next(20)

    this.bhSubject.subscribe(val => {
      console.log("Subsriber 3: ", val);

    })
  }
}
