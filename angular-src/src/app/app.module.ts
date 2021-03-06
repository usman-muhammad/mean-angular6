import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';



 // Custom Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

 // Route AuthGuard
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path : 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: PagenotfoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
