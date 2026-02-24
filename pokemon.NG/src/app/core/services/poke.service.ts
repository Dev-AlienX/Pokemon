import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
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

  getMetadataList(type: 'type' | 'generation' | 'region') {
    return this.http
      .get<{ results: { name: string }[] }>(`${this.baseUrl}/${type}`)
      .pipe(map((res) => res.results.map((item) => item.name)));
  }

  getPokemonByFilter(
    filterType: 'type' | 'generation' | 'region',
    filterValue: string,
  ): Observable<PokemonListResponse> {
    if (filterType === 'region') {
      return this.http.get(`${this.baseUrl}/region/${filterValue}`).pipe(
        switchMap((regionResponse: any) => {
          const generationName = regionResponse.main_generation.name;
          return this.getPokemonByFilter('generation', generationName);
        }),
      );
    }

    return this.http.get(`${this.baseUrl}/${filterType}/${filterValue}`).pipe(
      map((response: any) => {
        let results: { name: string; url: string }[];

        switch (filterType) {
          case 'type':
            results = response.pokemon.map(
              (p: { pokemon: { name: string; url: string } }) => p.pokemon,
            );
            break;
          case 'generation':
            results = response.pokemon_species;
            break;
        }

        return {
          count: results.length,
          results: results,
        };
      }),
    );
  }

  // For specific details (Home suggestions & Details page)
  getPokemonByNameOrId(nameOrId: string | number) {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }
}
