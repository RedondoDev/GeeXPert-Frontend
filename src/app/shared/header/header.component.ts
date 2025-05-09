import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {SigninService} from '../../services/auth/signin.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  searchQuery: string = '';

  constructor(private signinService: SigninService, private router: Router) {
  };

  ngOnInit(): void {
    this.signinService.currentUserSignedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  triggerSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {queryParams: {name: this.searchQuery}});
      this.searchQuery = '';
    }
  }

  signOut(): void {
    this.signinService.logout();
    this.router.navigate(['/home']);
  }

}


