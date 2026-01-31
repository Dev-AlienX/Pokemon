import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router = inject(Router);

  get isHome() {
    return this.router.url === '/home' || this.router.url === '/';
  }

  get isPokedex() {
    return this.router.url === '/pokedex';
  }

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
