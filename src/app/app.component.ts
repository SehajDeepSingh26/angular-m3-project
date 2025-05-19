import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-m3-project';
  constructor(private auth: AuthService){}

  logout(){
    this.auth.logOut()
  }
}
