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

  getExploreGames(page: number, size: number): Observable<Game[]> {
    let url = `http://localhost:8080/games/trending?page=${page}&size=${size}`;
    return this.http.get<Game[]>(url).pipe(
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

  public getSearchedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.searchUrl).pipe(
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

}
