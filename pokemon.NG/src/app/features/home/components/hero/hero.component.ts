import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true,
  host: {
    class: 'hero-component',
  },
})
export class HeroComponent {

}
