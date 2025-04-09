import {Injectable} from '@angular/core';
import {SigninRequest} from './signinRequest';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private httpClient: HttpClient) {
  }

  signin(credentials: SigninRequest): Observable<any> {
    return this.httpClient.get('././assets/data.json'); // This is a mock API call (doesnt work)
  }

}
