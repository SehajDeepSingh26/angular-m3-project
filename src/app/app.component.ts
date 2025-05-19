import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'angular-m3-project';
  
  constructor(private auth: AuthService){  }

  ngOnInit(): void {
      
  }

  logout(){
    this.auth.logOut()
  }
  isAuth(){
    return this.auth.isAuth();
  }
  isAdmin(){
    return this.auth.isAdmin();
  }
}
