import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('17promise-vs-observable');

  ngOnInit() {
    const promise = new Promise((resolve, reject) => {
      console.log("Promise is created"); // even then is not called,still it emittind data and logging this value

      resolve(200) //emit only single value 200 will not emit 300,400 
      resolve(300)
      resolve(400)

    })

    const obs = new Observable(obs => {
      console.log("Observable is created");

      obs.next(10)
      obs.next(20)
      obs.next(30)
    })

    promise.then((data) => {
      console.log("Promise 1 ", data);

    })

    obs.subscribe(data => {
      console.log("Observable", data);

    })

    promise.then((data) => {
      console.log("Promise 2", data);

    })
  }
}
