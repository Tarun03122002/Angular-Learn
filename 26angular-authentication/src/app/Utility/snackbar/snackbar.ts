import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: false,
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
})
export class Snackbar {
  @Input() errorMessage
}
