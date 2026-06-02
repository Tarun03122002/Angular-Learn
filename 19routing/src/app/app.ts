import { Component, inject, signal } from '@angular/core';
import { Router,Event, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('19routing');

  showLoader : boolean = false

  router : Router = inject(Router)

  ngOnInit(){
    this.router.events.subscribe((event : Event) => {
      if(event instanceof NavigationStart) this.showLoader = true
      else if(event instanceof NavigationEnd || event instanceof NavigationCancel) this.showLoader = false

    })
  }
}
