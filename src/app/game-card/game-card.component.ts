import { Component } from '@angular/core';
        import { Game } from '../services/game/game';
        import { GameService } from '../services/game/game.service';

        @Component({
          selector: 'app-game-card',
          imports: [],
          templateUrl: './game-card.component.html',
          styleUrl: './game-card.component.css'
        })
        export class GameCardComponent {

          game?: Game;
          errorMessage: string = '';

          constructor(private gameService: GameService) {
            this.gameService.getTrendingGames().subscribe({
              next: (gameData) => {
                if (Array.isArray(gameData) && gameData.length > 0) {
                  this.game = gameData[0];
                } else {
                  this.errorMessage = 'No games available.';
                }
              },
              error: (error) => {
                this.errorMessage = error.message;
              },
              complete: () => {
                console.log('Game data fetched successfully');
              }
            });
          }

        }
