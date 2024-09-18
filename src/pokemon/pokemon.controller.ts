import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonResponse } from './entities/pokemon.entity';

@ApiTags('pokemon')
@Controller()
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get('/pokemon')
    @ApiResponse({
        status: 200,
        description:
            'List all first 100 Pokemons and return its “name” and “URL”.',
    })
    @ApiResponse({
        status: 502,
        description:
            'List all first 100 Pokemons and return its “name” and “URL”.',
    })
    getPokemon(): Observable<PokemonResponse> {
        return this.pokemonService.getPokemon();
    }

    @Get('/pokemon/:id')
    @ApiParam({ name: 'id', required: true, description: 'ID of the Pokemon' })
    @ApiResponse({
        status: 200,
        description:
            'Get a specific Pokemon and return its “name” and “types”.',
    })
    @ApiResponse({
        status: 502,
        description:
            'List all first 100 Pokemons and return its “name” and “URL”.',
    })
    getPokemonById(@Param('id') id: number): Observable<Pokemon> {
        return this.pokemonService.getPokemonById(+id);
    }

    @Get('/pokemonAndTypes/:id')
    @ApiParam({ name: 'id', required: true, description: 'ID of the Pokemon' })
    @ApiResponse({
        status: 200,
        description:
            'Get a specific Pokemon and return its “name”, “types”, and the translations of Spanish and Japanese for each of its types.',
    })
    @ApiResponse({
        status: 502,
        description:
            'List all first 100 Pokemons and return its “name” and “URL”.',
    })
    getPokemonType(@Param('id') id: number): Observable<Pokemon> {
        return this.pokemonService.getPokemonTypeById(+id);
    }
}
