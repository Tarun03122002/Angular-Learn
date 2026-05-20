import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

dataList :any[]= []
 toggle : boolean = false


  // 1) Creating an observable (emitting event)
  // testObs = new Observable((observer)=> {
  //   observer.next([1,2,3,4,5])
  // })

  //creating stream of data
  testObs = new Observable((observer)=> {
    setTimeout(()=> {observer.next(1)},1000);
    setTimeout(()=> {observer.next(2)},2000);
    setTimeout(()=> {observer.next(3)},3000);
    setTimeout(()=> {observer.next(4)},4000);
    setTimeout(()=> {observer.next(5)},5000);
  })



  // 2) Subscribing an observable
  // Event Listen using subscribe
  onClick(){
    this.toggle = !this.toggle
    this.testObs.subscribe((data : any) => {
      console.log(data,this.dataList);
      
      this.dataList = [...this.dataList,data]
       });

    // event handler ,first callback is next() method
    // (data : any) => {
    //   this.dataList = data
    // }
  }
}
