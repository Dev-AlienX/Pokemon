import { Component, signal, input } from '@angular/core';
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
  pokemon = input<Pokemon[]>([]);
  error = input<unknown>(null);
}
