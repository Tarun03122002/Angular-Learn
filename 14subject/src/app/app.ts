import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTask } from './create-task/create-task';
import { ShowTasks } from './show-tasks/show-tasks';
import { Observable, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateTask, ShowTasks],


  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('14subject');

  // Diff Between Subjects and Observables

  newObs = new Observable((obs) => {
    obs.next(Math.random());
    obs.next(90)
  })
  newSubject = new Subject() //subject does not take callback or any parmeter in constructor


  ngOnInit() {

    // For Observable
    // SUBSRIBER 1
    this.newObs.subscribe(val => {
      console.log("Subscriber 1 For Obs: ", val);

    })

    // SUBSRIBER 2
    this.newObs.subscribe(val => {
      console.log("Subscriber 2 For Obs: ", val);

    })


    /**  For Subject*/
    //   this.newSubject.next(Math.random())  //Subject will not store previously emitted values before subscription ,so this line will not have any impact
    //   // SUBSRIBER 1
    //   this.newSubject.subscribe(val => {
    //     console.log("Subscriber 1 For Subject: ", val);

    //   })

    //   // SUBSRIBER 2
    //   this.newSubject.subscribe(val => {
    //     console.log("Subscriber 2 For Subject: ", val);

    //   })
    //   this.newSubject.next(Math.random())// After new subscription ,it will store emitted values (here same value)

    //   this.newSubject.subscribe(val => {
    //     console.log("Subscriber 3 For Subject: ", val);

    //   })
    //   this.newSubject.next(20)
    //   // Response of Subject above
    //   //  Subscriber 1 For Subject:  0.006713918206925573
    //   //  Subscriber 2 For Subject:  0.006713918206925573
    //   //  Subscriber 1 For Subject:  20
    //   //  Subscriber 2 For Subject:  20
    //   //  Subscriber 3 For Subject:  20
    //   this.newSubject.subscribe(val => {
    //     console.log("Subscriber 4 For Subject: ", val);

    //   })
    //   this.newSubject.next(10)
    //   // Subscriber 1 For Subject: 0.540285605041424
    //   // Subscriber 2 For Subject: 0.540285605041424
    //   // Subscriber 1 For Subject: 20
    //   // Subscriber 2 For Subject: 20
    //   // Subscriber 3 For Subject: 20
    //   // Subscriber 1 For Subject: 10
    //   // Subscriber 2 For Subject: 10
    //   // Subscriber 3 For Subject: 10
    //   // Subscriber 4 For Subject: 10



    // Data consumers

    const data = ajax('https://jsonplaceholder.typicode.com/todos/1') //observable return

    // here using observable,it is calling api two times 
    // // Subscriber 1
    // data.subscribe(val => console.log("Subscriber 1 ", val))

    // // Subscriber 2
    // data.subscribe(val => console.log("Subscriber 2 ", val))


    // now using subject 

    const subject = new Subject()
    data.subscribe(subject) // data consumer
    
     // here using subject,it is calling api one time and storing in subject (data consumer)
      // Subscriber 1
    subject.subscribe(val => console.log("Subscriber 1 ", val))

    // Subscriber 2
    subject.subscribe(val => console.log("Subscriber 2 ", val))
  }

}
