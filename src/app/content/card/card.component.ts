import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgIf, SlicePipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
              private userGameService: UserGameService, protected router: Router,) {
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
        console.log('User collection:', this.userCollection);
        const userGame = this.userCollection.find(userGame => userGame.userGameId === this.game.id);
        if (userGame) {
          this.currentState = this.mapStateToNumber(userGame.state);
          this.isGameInCollection = true;
        } else {
          this.isGameInCollection = false;
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching user collection:', error);
      }
    });
  }

  private mapStateToNumber(state: string): number {
    const stateMapping: { [key: string]: number } = {
      'PENDING': 0,
      'PLAYING': 1,
      'COMPLETED': 2
    };
    return stateMapping[state] ?? 0;
  }

  addToCollection() {
    const gamePayload = {
      id: this.game.id,
      name: this.game.name,
      first_release_date: this.game.first_release_date || null,
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
    const stateMapping = {
      0: 'PENDING',
      1: 'PLAYING',
      2: 'COMPLETED'
    };

    const userGame = this.userCollection.find(userGame => userGame.userGameId === this.game.id);

    if (!userGame) {
      console.error('Game not found in user collection:', this.game.id);
      return;
    }

    const stateString = stateMapping[newState as keyof typeof stateMapping];
    if (!stateString) {
      console.error('Invalid state:', newState);
      return;
    }

    this.userGameService.updateGameStatus(userGame.userGameId, stateString).subscribe({
      next: () => {
        console.log(`Game state updated to ${stateString} for game ID:`, userGame.userGameId);
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

  formatRating(rating: number | undefined): string {
    return rating !== undefined && rating !== null ? rating.toFixed(1) : 'N/A';
  }

}
