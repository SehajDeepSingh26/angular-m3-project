import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: User = {
        name: '',
        email: '',
        phone: '',
        address: '',
        pin: ''
    }
    constructor(private router: Router, private profile: ProfileService) { }

    ngOnInit(): void {
        this.profile.getUserProfile().subscribe((res: any) => {
            // console.log(res)
            if (res) {
                this.user = res
            }
        })
    }

    updateProfile() {
        this.profile.updateUserprofile(this.user).subscribe({
            next: () => {
                this.router.navigate(['/home'])
            }
        })
    }
}
