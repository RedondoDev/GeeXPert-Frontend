import { Routes } from '@angular/router';
import {SigninComponent} from './content/auth/signin/signin.component';
import {SignupComponent} from './content/auth/signup/signup.component';
import {HomeComponent} from './content/home/home.component';
import {ErrorComponent} from './content/error/error.component';
import {ExploreComponent} from './content/explore/explore.component';
import {SearchComponent} from './content/search/search.component';
import {CollectionComponent} from './content/collection/collection.component';
import {AuthGuard} from './extra/redirector/redirector.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard] },
  { path: '**', component: ErrorComponent }
];
