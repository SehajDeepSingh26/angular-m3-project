import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HtmlParser } from '@angular/compiler';

const dbUrl = environment.firebaseConfig.dbUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUserProfile(){
    const uid = this.auth.getUid();
    const res = this.http.get(`${dbUrl}/users/${uid}.json`);
    // console.log("user profile response", res)
    return res;
  }

  updateUserprofile(data: any){
    const uid = this.auth.getUid();
    return this.http.put(`${dbUrl}/users/${uid}.json`, data)
  }
}
