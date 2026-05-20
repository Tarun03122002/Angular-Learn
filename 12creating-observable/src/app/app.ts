import { Component, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.scss'],
})
export class App {
  constructor(private cdr: ChangeDetectorRef) { }
  // protected readonly title = signal('12creating-observable');

  dataList: any[] = []
  toggle: boolean = false
  title1: string = "Hello"

  // 1) Creating an observable (emitting event)
  // testObs = new Observable((observer)=> {
  //   observer.next([1,2,3,4,5])
  // })

  //creating stream of data
  testObs = new Observable((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.error(new Error('Something went wrong')) }, 3000); // after error ,it will not emit 
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
    // To provide complete signal ,when all data in stream is emitted
    setTimeout(() => { observer.complete() }, 6000)

  })


  ngAfterViewInit() {
    setTimeout(() => {
      this.title1 = "45668"
    }, 2000)
  }

  // 2) Subscribing an observable
  // Event Listen using subscribe
  onClick() {
    this.toggle = !this.toggle
    //deprecated way
    // this.testObs.subscribe((data : any) => {
    //   console.log(data, this.dataList);
    //   this.dataList = [...this.dataList, data];
    //   this.cdr.detectChanges(); //if not using zone.js in main.ts
    // },(error) => {
    //   this.cdr.detectChanges()
    //   console.log(error);

    //   alert(error.message)
    // },
    // () => {
    //   console.log('All the data has been streamed');

    //   alert('All the data has been streamed')
    // })


    // event handler ,first callback is next() method
    // (data : any) => {
    //   this.dataList = data
    // }

    // pass object in which callback is passed
    this.testObs.subscribe({
      next: (data: any) => {
        console.log(data, this.dataList);
        this.dataList = [...this.dataList, data];
        // this.cdr.detectChanges(); //if not using zone.js in main.ts
      }, 
      error(error){
        console.log(error);

        alert(error.message)
      },
      complete() {
        console.log('All the data has been streamed');

        alert('All the data has been streamed')
      }
    })


  }

}
