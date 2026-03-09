import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, map, forkJoin } from 'rxjs';
import { PokeService } from '../../core/services/poke.service';
import { TitleCasePipe, CommonModule, Location, DecimalPipe } from '@angular/common';
import { TypeColorPipe } from '../../shared/pipes/type-color.pipe';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { Pokemon, ChainLink } from '../../shared/models/pokemon.interfaces';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, TypeColorPipe, LoaderComponent, DecimalPipe],
  providers: [TypeColorPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);
  private pokeService = inject(PokeService);
  privatelocation = inject(Location);
  private router = inject(Router);
  private typeColorPipe = inject(TypeColorPipe);
  private http = inject(HttpClient);

  pokemonResource = rxResource({
    stream: () => this.route.params.pipe(
      switchMap((params) =>
        this.pokeService.getPokemonByNameOrId(params['id']).pipe(
          switchMap((pokemon) => {
            const typeRequests = pokemon.types.map((t: any) => this.http.get(t.type.url));
            return forkJoin({
              pokemon: of(pokemon),
              evolution: this.pokeService.getEvolutionChainBySpeciesUrl(pokemon.species.url),
              typeDetails: forkJoin(typeRequests)
            }).pipe(
              map((data: any) => ({
                pokemon: data.pokemon,
                evolutionChain: this.parseEvolutionChain(data.evolution.chain),
                damageRelations: this.calculateDamageRelations(data.typeDetails)
              }))
            );
          }),
          catchError((err) => {
            console.error(err);
            return of(null);
          })
        )
      )
    )
  });

  private parseEvolutionChain(chain: ChainLink): { name: string; imageUrl: string }[] {
    const evolutionChain: { name: string; imageUrl: string }[] = [];
    let currentLink: ChainLink | undefined = chain;

    while (currentLink) {
      const speciesName = currentLink.species.name;
      const speciesUrlParts = currentLink.species.url.split('/');
      const speciesId = speciesUrlParts[speciesUrlParts.length - 2];
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;

      evolutionChain.push({ name: speciesName, imageUrl });
      currentLink = currentLink.evolves_to[0];
    }

    return evolutionChain;
  }

  goBack(): void {
    this.privatelocation.back();
  }

  formatStatName(name: string): string {
    const statMap: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'ATK',
      'defense': 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      'speed': 'SPD'
    };
    return statMap[name] || name;
  }

  getAbilities(abilities: any[]): string {
    return abilities.map(a => a.ability.name.replace('-', ' ')).join(', ');
  }

  getMoves(moves: any[]): string[] {
    if (!moves) {
      return [];
    }
    return moves.slice(0, 10).map(m => m.move.name.replace('-', ' '));
  }

  onEvolutionClick(name: string): void {
    this.router.navigate(['/details', name]);
  }

  getPokemonBackground(types: any[]): string {
    const color1 = this.typeColorPipe.transform(types[0].type.name);

    if (types.length > 1) {
      const color2 = this.typeColorPipe.transform(types[1].type.name);
      return `linear-gradient(135deg, ${color1}, ${color2})`;
    }

    return color1;
  }

  calculateDamageRelations(typeDetails: any[]) {
    const weaknesses = new Map<string, number>();
    const strengths = new Set<string>();

    typeDetails.forEach(type => {
      // Strengths (Offensive)
      type.damage_relations.double_damage_to.forEach((t: any) => strengths.add(t.name));

      // Weaknesses (Defensive)
      type.damage_relations.double_damage_from.forEach((t: any) => {
        weaknesses.set(t.name, (weaknesses.get(t.name) || 1) * 2);
      });
      type.damage_relations.half_damage_from.forEach((t: any) => {
        weaknesses.set(t.name, (weaknesses.get(t.name) || 1) * 0.5);
      });
      type.damage_relations.no_damage_from.forEach((t: any) => {
        weaknesses.set(t.name, 0);
      });
    });

    const weakAgainst: string[] = [];
    weaknesses.forEach((val, key) => {
      if (val > 1) weakAgainst.push(key);
    });

    return {
      weakAgainst,
      superEffectiveAgainst: Array.from(strengths)
    };
  }
}
