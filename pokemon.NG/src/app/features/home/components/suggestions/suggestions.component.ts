import { Component, signal ,input} from '@angular/core';
import { PokeCardComponent } from '../../../../shared/ui/poke-card/poke-card.component';
import { Pokemon } from '../../../../shared/models/pokemon.interfaces';

@Component({
  selector: 'app-suggestions',
  imports: [PokeCardComponent],
  standalone: true,
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
  host: {
    class: 'suggestions-component',
  },
})
export class SuggestionsComponent {
  pokemon = input.required<Pokemon[]>()
  suggestions = signal([
    { id: 25, name: 'pikachu' },
    { id: 1, name: 'bulbasaur' },
    { id: 4, name: 'charmander' },
    { id: 7, name: 'squirtle' },
    { id: 133, name: 'eevee' },
    { id: 150, name: 'mewtwo' },
  ]);

  error = input<unknown>(null);

  onPokemonClick(name: string) {
    console.log('Navigating to:', name);
  }
}
