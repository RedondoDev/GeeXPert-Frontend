import {Component} from '@angular/core';
import {SigninService} from '../../services/auth/signin.service';

@Component({
  selector: 'app-recommendations',
  imports: [],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent {

  userId: number | null = null;

  constructor(private signInService: SigninService) {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.userId = this.signInService.getUserIdFromToken(token);
      console.log('User ID:', this.userId);
    } else {
      console.error('No token found in sessionStorage.');
    }
  }

}
