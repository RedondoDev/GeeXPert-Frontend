import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SigninService} from '../../services/auth/signin.service';

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
export class CardComponent implements OnInit, OnDestroy {

  @Input() game: any;
  currentState: number = 0;
  isLoggedIn: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private signInService: SigninService) {}

  ngOnInit() {
    this.signInService.currentUserSignedIn.subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    });
    if (this.game.status) {
      this.currentState = this.game.status;
    }
  }

  ngOnDestroy() {
    this.signInService.currentUserSignedIn.unsubscribe();
  }

  changeState(newState: number) {
    this.currentState = newState;
    // TODO save the new state to the backend
  }

  isInCollection(gameId: number) {
    return gameId % 2 === 0;
  }

  addToCollection() {
    this.game.id += 1;
    console.log(this.game.gameId);
    this.cdr.detectChanges();
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
