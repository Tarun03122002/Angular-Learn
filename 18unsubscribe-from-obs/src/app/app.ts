import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('18unsubscribe-from-obs');
  data1: any[] = []
  data2: any[] = []
  data3: any[] = []

  obs = interval(1000) //emits value after 1 sec increasing order starting from 1 indefintely
  subsc1!: Subscription
  subsc2!: Subscription
  subsc3!: Subscription

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  subscribe1() {
    this.subsc1 = this.obs.subscribe(val => { //storing subscription in variable to unsubscribe
      this.data1.push(val)
      this.cdr.detectChanges()
    })
  }

  unsubscribe1() {
    this.subsc1.unsubscribe()
  }

  subscribe2() {
    this.subsc2 = this.obs.subscribe(val => { //storing subscription in variable to unsubscribe
      this.data2.push(val)
      this.cdr.detectChanges()
    })
  }

  unsubscribe2() {
    this.subsc2.unsubscribe()
  }
  subscribe3() {
    this.subsc3 = this.obs.subscribe(val => { //storing subscription in variable to unsubscribe
      this.data3.push(val)
      this.cdr.detectChanges()
    })
  }

  unsubscribe3() {
    this.subsc3.unsubscribe()
  }

}
