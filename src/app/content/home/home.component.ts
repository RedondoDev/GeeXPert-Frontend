import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from '../welcome/welcome.component';
import {TrendingComponent} from '../trending/trending.component';
import {RatedComponent} from '../rated/rated.component';
import {InfoComponent} from '../info/info.component';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    WelcomeComponent,
    TrendingComponent,
    RatedComponent,
    InfoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
