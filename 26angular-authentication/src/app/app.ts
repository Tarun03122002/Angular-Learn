import { Component, signal } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('26angular-authentication');
  ngOnInit(){
        // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyA5b5n8jfM9DHE3rOh0bb0FwODZQ8TBvNw",
      authDomain: "httpclient-4723f.firebaseapp.com",
      databaseURL: "https://httpclient-4723f-default-rtdb.firebaseio.com",
      projectId: "httpclient-4723f",
      storageBucket: "httpclient-4723f.firebasestorage.app",
      messagingSenderId: "652368614878",
      appId: "1:652368614878:web:defbb725dd0a7a2a12794f"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }
}
