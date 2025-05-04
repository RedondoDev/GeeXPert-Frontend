import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGameService {

  private baseUrl = 'http://localhost:8080/collection';

  constructor(private http: HttpClient) {
  }

  addGameToCollection(game: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, game);
  }

  getUserGameCollection(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/games`);
  }

  updateGameStatus(gameId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${gameId}/state`, status, {responseType: 'text'});
  }

  removeGameFromCollection(gameId: number): Observable<string> {
    return this.http.delete(`http://localhost:8080/collection/${gameId}`, {responseType: 'text'});
  }

}
