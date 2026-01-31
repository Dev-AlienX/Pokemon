import { TitleCasePipe } from '@angular/common';
import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.css',
})
export class PokeCardComponent {
  name = input.required<string>();
  id = input.required<number>();

  spriteUrl = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id()}.png`,
  );

  select = output<string>();
}
