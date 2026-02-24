import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { PokeService } from '../../core/services/poke.service';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [ TitleCasePipe, ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  private pokeService = inject(PokeService);
  private route = inject(ActivatedRoute);

  // TODO: Implement actual filtering based on query params
  queryParams = this.route.queryParams.subscribe((params) => console.log({ params }));

  // For now, we'll just load the first 151 pokemon
  // We can enhance this with pagination and filtering later
  pokemonListResource = rxResource({
    stream: () => this.pokeService.getPokemonList(151).pipe(map((res) => res.results)),
  });
}
