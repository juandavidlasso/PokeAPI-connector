import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
    imports: [PokemonModule, HttpModule],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class AppModule {}
