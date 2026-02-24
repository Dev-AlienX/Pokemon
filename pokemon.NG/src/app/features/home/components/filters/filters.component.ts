import { Router } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, inject, signal, Output, EventEmitter } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokeService } from '../../../../core/services/poke.service';

export type FilterMode = 'pokemon' | 'type' | 'generation' | 'region';

@Component({
  selector: 'app-filters',
  imports: [TitleCasePipe, FormsModule, UpperCasePipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  private pokeService = inject(PokeService);
  private router = inject(Router);
  searchMode = signal<FilterMode>('pokemon');
  query = signal('');

  @Output() filterChange = new EventEmitter<{ filterType: FilterMode; filterValue: string }>();

  types = toSignal(this.pokeService.getMetadataList('type'), { initialValue: [] });
  generations = toSignal(this.pokeService.getMetadataList('generation'), {
    initialValue: [],
  });
  regions = toSignal(this.pokeService.getMetadataList('region'), { initialValue: [] });

  placeholderText = computed(() => {
    const mode = this.searchMode();
    if (mode === 'pokemon') return 'Search by Name or ID (e.g., 25)...';
    return `Search or select a ${mode}...`;
  });

  selectCapsule(value: string) {
    this.query.set(value);
    // this.onSearch();
  }

  onSearch() {
    const query = this.query().toLowerCase().trim();
    if (!query) return;

    const mode = this.searchMode();
    if (mode === 'pokemon') {
      this.router.navigate(['/details', query]);
    } else {
      this.filterChange.emit({ filterType: mode, filterValue: query });
    }
  }
}
