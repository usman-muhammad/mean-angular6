import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './../../services/validate.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService ) { console.log(validateService)}

  ngOnInit() {
  }
  //Register submit
  onRgisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // validate user object
    if( !this.validateService.ValidateRegister(user)) {
      this.flashMessage.show('Please fill all fields', { cssClass:'alert alert-danger alert-dismissible fade show', timeout: 3000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.ValidateEmail(user.email)) {
        this.flashMessage.show('Email should be a valid email',{ cssClass:'alert alert-danger alert-dismissible fade show', timeout: 3000 })
      return false;
    }
  }

}
