import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user : any;
  constructor(private http: Http) { }

  // Register AuthService
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/v1/users/register', user, { headers: headers }).map(res => res.json());
  }

  // LoginUser AuthService
  loginUser(user) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/api/v1/users/login', user, { headers: headers }).map(res => res.json());
  }
  // getProfile
  getProfile() {
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/api/v1/users/profile', { headers: headers }).map(res => res.json());
  }
  // Store user data in local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user =  user;
  }

  // Check user is logged in
  loggedIn() {
    return tokenNotExpired();
  }
  //Load toke
  loadToken() {
    const token =  localStorage.getItem('token');
    this.authToken = token;
  }
  //Logout user
  logout() {
    this.authToken = null;
    this.user =  null;
    localStorage.clear()
  }
}
