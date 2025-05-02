import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SigninService} from '../../services/auth/signin.service';
import {UserGameService} from '../../services/userGame/user-game.service';

@Component({
  selector: 'app-card',
  imports: [
    DatePipe,
    NgIf,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() game: any;
  currentState: number = 0;
  isLoggedIn: boolean = false;
  userCollection: any[] = [];
  isGameInCollection: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private signInService: SigninService,
              private userGameService: UserGameService) {
  }

  ngOnInit() {
    this.signInService.currentUserSignedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.loadUserCollection();
        }
      }
    });

    if (this.game.status) {
      this.currentState = this.game.status;
    }
  }

  loadUserCollection() {
    this.userGameService.getUserGameCollection().subscribe({
      next: (games) => {
        this.userCollection = games;
        this.isGameInCollection = this.isInCollection(this.game.id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user collection:', error);
      }
    });
  }

  isInCollection(gameId: number): boolean {
    return this.userCollection.some((userGame: any) => userGame.userGameId === gameId);
  }

  addToCollection() {
    const gamePayload = {
      id: this.game.id,
      name: this.game.name,
      releaseDate: this.game.first_release_date || null,
      genres: this.game.genres || [],
      platforms: this.game.platforms || [],
      cover: this.game.cover || null,
      rating: this.game.rating || 0
    };

    this.userGameService.addGameToCollection(gamePayload).subscribe({
      next: () => {
        console.log('Game added to collection:', gamePayload);
        this.userCollection.push(gamePayload);
        this.isGameInCollection = true;
        this.cdr.detectChanges();
        this.loadUserCollection();
      },
      error: (error) => {
        console.error('Error adding game to collection:', error);
      }
    });
  }

  changeState(newState: number) {
    const userGame = this.userCollection.find(userGame => userGame.userGameId === this.game.id);

    if (!userGame) {
      console.error('Game not found in user collection:', this.game.id);
      return;
    }

    this.userGameService.updateGameStatus(userGame.userGameId, newState).subscribe({
      next: () => {
        console.log(`Game state updated to ${newState} for game ID:`, userGame.userGameId);
        this.currentState = newState;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error updating game state:', error);
      }
    });
  }

  removeFromCollection() {
    const userGame = this.userCollection.find(userGame => userGame.userGameId === this.game.id);

    if (!userGame) {
      console.error('Game not found in user collection:', this.game.id);
      console.log('Current user collection:', this.userCollection);
      return;
    }

    console.log('Removing game with database ID:', userGame.userGameId);

    this.userGameService.removeGameFromCollection(userGame.userGameId).subscribe({
      next: (response) => {
        console.log('Game removed from collection:', response);
        this.userCollection = this.userCollection.filter(g => g.userGameId !== userGame.userGameId);
        this.isGameInCollection = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error removing game from collection:', error);
      }
    });
  }

  formatRating(rating: number): string {
    if (rating === 0) {
      return '0.0';
    } else if (rating === 10) {
      return '10';
    } else {
      return rating.toFixed(1);
    }
  }

}
