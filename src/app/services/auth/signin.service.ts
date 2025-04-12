import {Injectable} from '@angular/core';
import {SigninRequest} from './signinRequest';
import {catchError, Observable, throwError, BehaviorSubject, tap} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  currentUserSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id: 0, email: ''});

  constructor(private httpClient: HttpClient) {
  }

  signin(credentials: SigninRequest): Observable<User> {
    return this.httpClient.get<User>('app/assets/data.json').pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserSignedIn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened. Please try again later.'));
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get isUserSignedIn(): Observable<boolean> {
    return this.currentUserSignedIn.asObservable();
  }

}
