import { Routes } from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './content/home/home.component';
import {ErrorComponent} from './error/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: ErrorComponent }
];
