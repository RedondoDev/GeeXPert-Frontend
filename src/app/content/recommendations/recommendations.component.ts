import {Component, OnInit} from '@angular/core';
import { Game } from '../../models/game';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import {NgForOf, NgIf} from '@angular/common';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-recommendations',
  imports: [
    NgForOf,
    CardComponent,
    NgIf
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent {

  recommendedGames: Game[] = [];
  isLoading: boolean = false;

  constructor(private recommendationsService: RecommendationsService) {}

  protected getRecommendedGames() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.isLoading = true;
      this.recommendationsService.getRecommendations(userId).subscribe({
        next: (games) => {
          this.recommendedGames = games.slice(0, 3);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching recommendations:', error);
          this.isLoading = false;
        }
      });
    }
  }

  private getUserIdFromToken(): number | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;
    }
    return null;
  }

}
