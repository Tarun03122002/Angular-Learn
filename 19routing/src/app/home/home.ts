import { Component, inject, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  //subsbribe to fragmement
  ngOnInit() {
    this.activeRoute.fragment.subscribe(data => {
      if (data)
        this.scrollInToSection(data)

    })
  }

  scrollInToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }
}
