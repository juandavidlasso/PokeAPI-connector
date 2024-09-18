import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
    Pokemon,
    PokemonResponse,
    PokemonType,
} from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
    private readonly pokemonApiUrl = 'https://pokeapi.co/api/v2';
    constructor(private readonly httpService: HttpService) {}

    getPokemon(): Observable<PokemonResponse> {
        const url = '/pokemon/?limit=100';

        return this.httpService
            .get<PokemonResponse>(this.pokemonApiUrl + url)
            .pipe(
                map((response: AxiosResponse<PokemonResponse>) => ({
                    results: response.data.results.map((pokemon: Pokemon) => ({
                        name: pokemon.name,
                        url: pokemon.url,
                    })),
                })),
                catchError(() => {
                    return throwError(
                        () =>
                            new HttpException(
                                'Error retrieving data from Pokémon API',
                                HttpStatus.BAD_GATEWAY,
                            ),
                    );
                }),
            );
    }

    getPokemonById(id: number): Observable<Pokemon> {
        const url = `/pokemon/${id}`;

        return this.httpService.get<Pokemon>(this.pokemonApiUrl + url).pipe(
            map((response: AxiosResponse<Pokemon>) => ({
                name: response.data.name,
                types: response.data.types,
            })),
            catchError(() => {
                return throwError(
                    () =>
                        new HttpException(
                            'Error retrieving data from Pokémon API',
                            HttpStatus.BAD_GATEWAY,
                        ),
                );
            }),
        );
    }

    getPokemonTypeById(id: number): Observable<Pokemon> {
        const urlPokemon = `/pokemon/${id}`;

        return this.httpService
            .get<Pokemon>(this.pokemonApiUrl + urlPokemon)
            .pipe(
                switchMap((resp) => {
                    const pokemonData: Pokemon = {
                        name: resp.data.name,
                        types: resp.data.types,
                    };
                    const typeRequests = pokemonData.types.map((type) => {
                        return this.httpService.get(type.type.url).pipe(
                            map((typeResponse: AxiosResponse<PokemonType>) => ({
                                slot: type.slot,
                                type: {
                                    name: typeResponse.data.name,
                                    url: type.type.url,
                                    names: typeResponse.data.names
                                        .filter(
                                            (name) =>
                                                name.language.name === 'es' ||
                                                name.language.name === 'ja',
                                        )
                                        .map((name) => ({
                                            name: name.name,
                                            language: {
                                                name: name.language.name,
                                                url: name.language.url,
                                            },
                                        })),
                                },
                            })),
                            catchError(() =>
                                throwError(
                                    () =>
                                        new HttpException(
                                            'Error retrieving data from Pokémon API',
                                            HttpStatus.BAD_GATEWAY,
                                        ),
                                ),
                            ),
                        );
                    });
                    return forkJoin(typeRequests).pipe(
                        map((types) => ({
                            name: pokemonData.name,
                            types,
                        })),
                    );
                }),
                catchError(() => {
                    throw new HttpException(
                        'Error retrieving data from Pokémon API',
                        HttpStatus.BAD_GATEWAY,
                    );
                }),
            );
    }
}
