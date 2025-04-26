import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {RouterLink} from '@angular/router';
import {Game} from '../../models/game';
import {GameService} from '../../services/game/game.service';

@Component({
  selector: 'app-rated',
  imports: [
    NgFor,
    CardComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './rated.component.html',
  styleUrl: './rated.component.css'
})
export class RatedComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getTopGames().subscribe(data => {
      this.games = data;
    });
  }

}
