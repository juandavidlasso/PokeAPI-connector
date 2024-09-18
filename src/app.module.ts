import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
    imports: [ConfigModule.forRoot(), PokemonModule, HttpModule],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class AppModule {}
