export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: { slot: number; type: { name: string } }[];
}

export interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}