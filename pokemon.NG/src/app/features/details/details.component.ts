import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, map, switchMap } from 'rxjs';
import { PokeService } from '../../core/services/poke.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);
  private pokeService = inject(PokeService);

  pokemonResource = rxResource({
    stream: () =>
      this.route.params.pipe(
        switchMap((params) =>
          this.pokeService.getPokemonByNameOrId(params['id']).pipe(
            catchError((err) => {
              console.error(err);
              // In a real app, you'd want to navigate to a proper "Not Found" page
              // or display a user-friendly error message.
              return of(null);
            }),
          ),
        ),
      ),
  });
ResourceStatus: any;
}
