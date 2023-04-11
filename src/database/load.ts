// Load environment
import * as dotenv from 'dotenv-safe';
dotenv.config();

// Code that can be used to load the database with pokemons starting from the given pokemons.json file.
import all from '../../pokemons.json'
import { Pokemon as PokemonEntity } from './entities/pokemon.entity';
import { Pokemon as PokemonJson } from '../types/pokemon'
import { appDataSource } from './AppDataSource';

const pokemons: PokemonJson[] = (all as PokemonJson[]);

(async () => {
    await appDataSource.initialize();

    for (let pokemonJson of pokemons) {
        let pokemonEntity: PokemonEntity = new PokemonEntity();
        await pokemonEntity.initFromJson(pokemonJson);
        try {
            await appDataSource.manager.save(pokemonEntity);        
            console.log(`pokemon ${pokemonEntity.name} has been saved with id: ${pokemonEntity.id}`);
        } catch (err) {
            console.log(`failed to insert pokemon ${pokemonEntity.name}`);
        }
    }
})().catch((err) => {
    console.log(err);
    process.exit(1);
});