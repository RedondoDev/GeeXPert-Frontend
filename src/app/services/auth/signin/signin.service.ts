import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {SigninRequest} from '../../../models/signinRequest';
import {catchError, Observable, throwError, BehaviorSubject, tap, map} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  currentUserSignedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem("token");
      this.currentUserSignedIn = new BehaviorSubject<boolean>(token != null);
      this.currentUserData = new BehaviorSubject<String>(token || "");
    }
  }

  signin(credentials: SigninRequest): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/auth/signin', credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserSignedIn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem("token");
    }
    this.currentUserSignedIn.next(false);
    this.currentUserData.next("");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Incorrect credentials. Verify your username and password.'));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get isUserSignedIn(): Observable<boolean> {
    return this.currentUserSignedIn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.getValue();
  }

  getUserIdFromToken(token: string): number | null {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.userId || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
