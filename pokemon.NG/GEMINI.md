
# App Architecture

This file outlines the architecture of the Pokémon NG application.

```
src/app/
├── core/                         # Singletons & Global Logic
│   ├── services/                 # poke-api.service.ts
│   └── app.config.ts             # Global providers
│
├── shared/                       # Reusable across BOTH pages
│   ├── ui/                       
│   │   ├── poke-card/            # The card used in both Home and Pokedex
│   │   └── loader/               # Loading spinner
│   ├── models/                   # pokemon.interface.ts
│   └── pipes/                    # type-color.pipe.ts
│
├── features/                     # Distinct Page Domains
│   ├── home/                     
│   │   ├── components/           # Home-specific components
│   │   │   ├── hero/             # Full-page Hero + Search bar
│   │   │   ├── filters/          # Type & Gen dropdowns
│   │   │   └── suggestions/      # The "Random 6" section logic
│   │   └── home.component.ts     # Main Home Layout
│   │
│   ├── pokedex/                  
│   │   ├── pokedex.component.ts  # The Full List view
│   │   └── pokedex.routes.ts     # Child routing if needed
│   │
│   └── details/                  
│       └── details.component.ts  # Individual Pokemon view
│
├── app.routes.ts                 # Main Route Map (Home vs Pokedex)
└── app.component.ts              # Root Shell (Global Header/Nav)
```
