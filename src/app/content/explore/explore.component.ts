import {Component, OnInit} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {NgForOf, NgIf} from '@angular/common';
import {Game} from '../../models/game';
import {GameService} from '../../services/game/game.service';

@Component({
  selector: 'app-explore',
  imports: [
    CardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {

  games: Game[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.loadMoreGames();
  }

  loadMoreGames() {
    this.isLoading = true;
    this.gameService.getExploreGames(this.currentPage, this.pageSize).subscribe(data => {
      this.games = [...this.games, ...data];
      this.currentPage++;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error loading games:', error);
    });
  }

}
