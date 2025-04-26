import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

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

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    if (this.game.status) {
      this.currentState = this.game.status;
    }
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
