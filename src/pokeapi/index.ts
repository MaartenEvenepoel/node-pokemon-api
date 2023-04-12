// Load environment
import * as dotenv from 'dotenv-safe';
dotenv.config();

import { appDataSource } from '../database/AppDataSource';
import { Pokemon as PokemonEntity } from '../database/entities/pokemon.entity';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { args } from './commandLineArgs';
import { DataSource } from 'typeorm';

(async () => {
    if (args.id && args.name) {
        console.log("Please only pass either a pokemon ID or a name, not both!");
        process.exit(0);
    }

    const api = new PokemonClient();
    await appDataSource.initialize();

    if (args.id) {
        const pokemon: Pokemon = await api.getPokemonById(args.id);
        await insertIntoDatabase(pokemon, appDataSource);
        process.stdout.write(`Inserted pokemon ${pokemon.name} with id ${pokemon.id}\n`)
    }

    if (args.name) {
        const pokemon: Pokemon = await api.getPokemonByName(args.name);
        await insertIntoDatabase(pokemon, appDataSource);
        process.stdout.write(`Inserted pokemon ${pokemon.name} with id ${pokemon.id}\n`)
    }
})().catch(err => console.error(err));

async function insertIntoDatabase(pokemon: Pokemon, appDataSource: DataSource) {
    const pokemonEntity: PokemonEntity = new PokemonEntity();
    await pokemonEntity.initFromJson(pokemon);
    await appDataSource.manager.save(pokemonEntity);
}
