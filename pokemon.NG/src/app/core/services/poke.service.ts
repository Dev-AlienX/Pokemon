import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../../shared/models/pokemon.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  // For the Pokedex list
  getPokemonList(limit: number = 20, offset: number = 0) {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
    );
  }

  // For specific details (Home suggestions & Details page)
  getPokemonByNameOrId(nameOrId: string | number) {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }
}
