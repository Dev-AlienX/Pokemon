import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'pokedex',
    loadComponent: () =>
      import('./features/pokedex/pokedex.component').then((m) => m.PokedexComponent),
    title: 'Pokedex',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not Found',
  },
];
