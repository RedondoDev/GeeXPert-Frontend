import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getTrendingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(environment.hostUrl + 'games/trending').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
