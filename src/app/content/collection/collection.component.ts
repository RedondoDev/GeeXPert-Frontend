// src/app/content/collection/collection.component.ts
import {GameService} from '../../services/game/game.service';
import {Game} from '../../models/game';
import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {RouterLink} from '@angular/router';
import {UserGameService} from '../../services/userGame/user-game.service';
import {UserGame} from '../../models/user-game';

@Component({
  selector: 'app-collection',
  imports: [
    NgIf,
    CardComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {

  pendingGames: Game[] = [];
  playingGames: Game[] = [];
  completedGames: Game[] = [];

  constructor(private userGameService: UserGameService, private gameService: GameService) {
  }

  ngOnInit() {
    this.loadUserGames();
  }

  loadUserGames() {
    this.userGameService.getUserGameCollection().subscribe({
      next: (userGames: UserGame[]) => {
        console.log('API Response:', userGames);
        userGames.forEach(userGame => {
          if (userGame.userGameId !== undefined && userGame.userGameId !== null) {
            this.gameService.getGameById(userGame.userGameId).subscribe({
              next: (game: Game) => {
                console.log('Game Details:', game);
                game.first_release_date *= 1000;
                if (userGame.state === 'PENDING') {
                  this.pendingGames.push(game);
                } else if (userGame.state === 'PLAYING') {
                  this.playingGames.push(game);
                } else if (userGame.state === 'COMPLETED') {
                  this.completedGames.push(game);
                }
              },
              error: (error) => {
                console.error(`Error fetching game details for game ID ${userGame.userGameId}:`, error);
              }
            });
          } else {
            console.error('Invalid game ID:', userGame.userGameId);
          }
        });
      },
      error: (error) => {
        console.error('Error loading user games:', error);
      }
    });
  }

}
