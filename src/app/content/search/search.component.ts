import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {Game} from '../../models/game';
import {GameService} from '../../services/game/game.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    CardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  games: Game[] = [];
  name: string = '';
  isLoading: boolean = false;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'] || '';
      this.searchGames();
    });
  }

  searchGames() {
    if (!this.name.trim()) {
      this.games = [];
      return;
    }
    this.isLoading = true;
    this.gameService.getSearchedGames(this.name).subscribe(data => {
      this.games = data;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.error('Error loading games:', error);
    });
  }

}
