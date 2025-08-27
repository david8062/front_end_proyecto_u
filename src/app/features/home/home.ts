import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { HowItWorks } from './sections/how-it-works/how-it-works';
import { Testimonial } from './sections/testimonial/testimonial';
import { Features } from './sections/features/features';

@Component({
  selector: 'app-home',
  imports: [Hero, HowItWorks, Features, Testimonial],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
