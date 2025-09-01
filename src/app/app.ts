import { Component } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ NavBar, RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'front_end';
}
