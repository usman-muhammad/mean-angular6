import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username: String;
   password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  //Login submit
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    // validate user object
    if( !this.validateService.validateLogin(user)) {
      this.flashMessage.show('Please fill all fields', { cssClass:'alert alert-danger', timeout: 3000 });
      return false;
    }

    // Register user
    this.authService.loginUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show(data.message,{ cssClass:'alert alert-success', timeout: 3000 });
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.message,{ cssClass:'alert alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    })
  }
}
