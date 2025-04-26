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
    return this.http.get<Game[]>(this.trendingUrl);
  }

  public getTopGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.topUrl);
  }

  public getSearchedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.searchUrl);
  }

}
