import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Game} from '../../models/game';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private baseUrl = 'http://localhost:8080/recommendations/ai-assistant/';

  constructor(private http: HttpClient) {
  }

  getRecommendations(userId: number): Observable<Game[]> {
    return this.http.get<any[]>(`${this.baseUrl}${userId}`).pipe(
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
