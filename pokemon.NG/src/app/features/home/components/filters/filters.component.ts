import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Component, computed, output, signal } from '@angular/core';

type FilterMode = 'pokemon' | 'type' | 'generation' | 'region';

@Component({
  selector: 'app-filters',
  imports: [TitleCasePipe, FormsModule, UpperCasePipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  searchExecuted = output<{ mode: FilterMode; value: string }>();
  searchMode = signal<FilterMode>('pokemon');
  query = signal('');

  types = ['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'ghost'];
  generations = ['gen-i', 'gen-ii', 'gen-iii', 'gen-iv', 'gen-v', 'gen-vi', 'gen-vii', 'gen-viii', 'gen-ix'];
  regions = ['kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea'];

  placeholderText = computed(() => {
    const mode = this.searchMode();
    if (mode === 'pokemon') return 'Search by Name or ID (e.g., 25)...';
    return `Search or select a ${mode}...`;
  });

  selectCapsule(value: string) {
    this.query.set(value);
    this.onSearch();
  }

  onSearch() {
    if (!this.query().trim()) return;
    this.searchExecuted.emit({
      mode: this.searchMode(),
      value: this.query().toLowerCase().trim()
    });
  }
}
