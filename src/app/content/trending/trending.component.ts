import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {RouterLink} from '@angular/router';
import {Game} from '../../models/game';
import {GameService} from '../../services/game/game.service';

@Component({
  selector: 'app-trending',
  imports: [
    NgFor,
    CardComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {

  games: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getTrendingGames().subscribe(data => {
      this.games = data;
    });
  }

}
