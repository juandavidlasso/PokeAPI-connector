export class PokemonResponse {
    results: Pokemon[];
}

export class Pokemon {
    name: string;
    url?: string;
    types?: PokemonTypes[];
}

class PokemonTypes {
    slot: number;
    type: PokemonType;
}

export class PokemonType {
    name: string;
    url: string;
    names: PokemonName[];
}

class PokemonName {
    language: {
        name: string;
        url: string;
    };
    name: string;
}
