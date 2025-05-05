import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {SigninService} from '../services/auth/signin.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private signinService: SigninService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.signinService.userToken) {
            console.log('Token ' + this.signinService.userToken);
            return true;
        } else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }


}
