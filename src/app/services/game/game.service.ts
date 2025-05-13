import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Game} from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private trendingUrl = 'http://localhost:8080/games/trending';
  private topUrl = 'http://localhost:8080/games/top';
  private exploreUrl = 'http://localhost:8080/games/explore?page=';
  private searchUrl = 'http://localhost:8080/games/search?name=';

  constructor(private http: HttpClient) {
  }

  public getTrendingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.trendingUrl).pipe(
      map((games) => games.map((game) => new Game(
        game.id,
        game.name,
        game.cover,
        game.genres,
        game.platforms,
        game.rating,
        game.first_release_date
      )))
    );
  }

  public getTopGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.topUrl).pipe(
      map((games) => games.map((game) => new Game(
        game.id,
        game.name,
        game.cover,
        game.genres,
        game.platforms,
        game.rating,
        game.first_release_date
      )))
    );
  }

  public getExploreGames(page: number, size: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.exploreUrl + page + '&size=' + size).pipe(
      map((games) => games.map((game) => new Game(
        game.id,
        game.name,
        game.cover,
        game.genres,
        game.platforms,
        game.rating,
        game.first_release_date
      )))
    );
  }

  public getSearchedGames(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.searchUrl + name).pipe(
      map((games) => games
        .filter((game) => game.name && game.cover && game.genres?.length > 0 && game.platforms?.length > 0)
        .map((game) => new Game(
          game.id,
          game.name,
          game.cover,
          game.genres,
          game.platforms,
          game.rating,
          game.first_release_date
        ))
      )
    );
  }

  public getGameById(gameId: number): Observable<Game> {
    return this.http.get<Game>(`http://localhost:8080/games/${gameId}`);
  }

}
