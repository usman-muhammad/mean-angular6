import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user : any;
  constructor(private http: Http) { }

  // Register AuthService
  RegisterUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/v1/users/register', user, { headers: headers }).map(res => res.json());
  }

  // LoginUser AuthService
  LoginUser(user) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/api/v1/users/login', user, { headers: headers }).map(res => res.json());
  }

  // Store user data in local storage
  StoreUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user =  user;
  }
  //Logout user 
  Logout() {
    this.authToken = null;
    this.user =  null;
    localStorage.clear()
  }
}
