import { Component, signal, inject, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokeService } from '../../core/services/poke.service';
import { FiltersComponent, FilterMode } from './components/filters/filters.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { Pokemon } from '../../shared/models/pokemon.interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FiltersComponent, SuggestionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'home-component',
  },
})
export class HomeComponent implements OnInit {
  private pokeService = inject(PokeService);

  pokemon = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.fetchRandomPokemon();
  }

  async onFilterChanged({ filterType, filterValue, }: { filterType: FilterMode;  filterValue: string; }) {
    if (filterType === 'pokemon') {
      // The 'pokemon' mode is handled by router navigation in FiltersComponent
      return;
    }

    const pokemonList = await firstValueFrom(
      this.pokeService.getPokemonByFilter(filterType, filterValue),
    );

    const randomPokemonNames = this.getRandomPokemon(pokemonList.results, 6).map((p) => p.name);

    const tasks = randomPokemonNames.map((name) =>
      firstValueFrom(this.pokeService.getPokemonByNameOrId(name)),
    );

    const pokemonDetails = await Promise.all(tasks);
    this.pokemon.set(pokemonDetails);
  }

  private async fetchRandomPokemon() {
    const ids = this.generateUniqueIds(6);
    const tasks = ids.map((id: number) =>
      firstValueFrom(this.pokeService.getPokemonByNameOrId(id)),
    );
    const pokemonDetails = await Promise.all(tasks);
    this.pokemon.set(pokemonDetails);
  }

  private getRandomPokemon<T>(list: T[], count: number): T[] {
    return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  private generateUniqueIds(count: number): number[] {
    const ids = new Set<number>();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * 1025) + 1);
    }
    return Array.from(ids);
  }
}
