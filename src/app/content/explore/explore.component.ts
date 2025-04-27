import {Component, OnInit} from '@angular/core';
import {InfoComponent} from "../info/info.component";
import {RatedComponent} from "../rated/rated.component";
import {TrendingComponent} from "../trending/trending.component";
import {WelcomeComponent} from "../welcome/welcome.component";
import {CardComponent} from '../card/card.component';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
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
    this.isLoading = true; // Start loading
    this.gameService.getExploreGames(this.currentPage, this.pageSize).subscribe(data => {
      this.games = [...this.games, ...data];
      this.currentPage++;
      this.isLoading = false; // Stop loading
    }, error => {
      this.isLoading = false; // Handle error
      console.error('Error loading games:', error);
    });
  }

}
