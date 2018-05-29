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
    console.log('')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/v1/users/register', user, { headers: headers }).map(res => res.json());
  }
}