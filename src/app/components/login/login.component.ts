import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    error: string = "";
    
    constructor(private auth: AuthService, private router: Router) {}

    login(){
        this.auth.login(this.email, this.password).subscribe({
            next: () => {
                console.log("User logged In !!")
                this.router.navigate(['/home'])
            },
            error: () => {
                this.error = "Login failed, Invalid credentials"
            }
        })
    }

}
