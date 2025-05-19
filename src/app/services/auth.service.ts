import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private dbUrl = environment.firebaseConfig.dbUrl;
    private API_KEY = environment.firebaseConfig.apiKey;

    constructor(private http: HttpClient, private router: Router) { }

    register(email:string, password: string, name: string, role: string){
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, {
            email, password, returnSecureToken: true
        })
        .pipe(
            switchMap(res => {
                return this.setRegisterUser(res, name, role)
            })
        )
    }
    login(email:string, password: string){
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,{
            email, password, returnSecureToken: true
        })
        .pipe(
            map((res:any) => this.setLoginData(res.localId))
        )
    }

    getUid(){
        return localStorage.getItem('uid')
    }

    logOut(){
        localStorage.clear();
        this.router.navigate(['login'])
    }

    setRegisterUser(res:any, name: string, role: string){
        return this.http.put(`${this.dbUrl}/users/${res.localId}.json`, {
            id: res.localId,
            name: name,
            email: res.email,
            role: role
        })
    }

    setLoginData(uid: string){
        localStorage.setItem('uid', uid)
        const res = this.http.get(`${this.dbUrl}/users/${uid}.json`).subscribe((res:any) => {
            if(res.role === "admin")
                localStorage.setItem("role", JSON.stringify("admin"))
        })
    }

    isAdmin(){
        return !!localStorage.getItem("role")
    }

    isAuth(){
        return !!localStorage.getItem("uid")
    }
}
