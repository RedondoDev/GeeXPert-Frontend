import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {SigninService} from '../../../services/auth/signin/signin.service';
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

  isLoggedIn: boolean | null = null;
  searchQuery: string = '';

  constructor(private signinService: SigninService, private router: Router) {
  };

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.signinService.waitForAuthState();
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


