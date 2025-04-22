import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SigninService} from '../../services/auth/signin.service';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;

  constructor(private signinService: SigninService) { };

  ngOnInit(): void {
    this.signinService.currentUserSignedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  signOut(): void {
    this.signinService.currentUserSignedIn.next(false);
    this.signinService.currentUserData.next({id: 0, email: ''});
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {
    this.signinService.currentUserSignedIn.unsubscribe();
  }

}


