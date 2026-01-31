import { Component, signal, resource, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokeService } from '../../core/services/poke.service';
import { FiltersComponent } from './components/filters/filters.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';

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
export class HomeComponent {
  private pokeService = inject(PokeService);

  // Source Signal: Changing this triggers the resource reload
  randomIds = signal<number[]>(this.generateUniqueIds(6));

  // Resource API: Handles batch fetching and loading states
  pokemonResource = resource({
    loader: async () => {
      const ids = this.randomIds();
      const tasks = ids.map((id: number) =>
        firstValueFrom(this.pokeService.getPokemonByNameOrId(id)),
      );
      return await Promise.all(tasks);
    },
  });

  // Helper to generate 6 unique IDs
  private generateUniqueIds(count: number): number[] {
    const ids = new Set<number>();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * 1025) + 1);
    }
    return Array.from(ids);
  }

  refreshSuggestions() {
    this.randomIds.set(this.generateUniqueIds(6));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.refreshSuggestions();
  }
}
