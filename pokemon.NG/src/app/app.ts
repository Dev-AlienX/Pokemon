import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FooterComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokemon.NG');
}
