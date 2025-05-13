import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
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
    return this.http.get<Game[]>(`${this.baseUrl}${userId}`);
  }

}
