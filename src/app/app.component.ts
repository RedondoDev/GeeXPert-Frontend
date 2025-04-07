import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/header/header.component';
import {WelcomeComponent} from './content/welcome/welcome.component';
import {FooterComponent} from './shared/footer/footer.component';
import {SigninComponent} from './auth/signin/signin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WelcomeComponent, FooterComponent, SigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GeeXPert';
}
