import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
    name: string = "";
    email: string = '';
    password: string = '';
    role: string = "user"
    // uid: string: '';
    dbUrl = environment.firebaseConfig.dbUrl;

    constructor(private auth: AuthService, private http: HttpClient, private router: Router){}

    onRegister(){
        this.auth.register(this.email, this.password, this.name, this.role).subscribe({
            next: () => {
                // console.log("User registered");
                
                this.router.navigate(['/login']);
            }
        })
    }
}
