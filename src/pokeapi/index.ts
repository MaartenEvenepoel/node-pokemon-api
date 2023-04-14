/**
 * Small CLI script that can be used to import specific pokemons from pokeapi into the database.
 * Pokemons can be selected by their name or their pokeapi ID
 */
import { appDataSource } from '../database/AppDataSource'
import { Pokemon as PokemonEntity } from '../database/entities/pokemon.entity'
import { type Pokemon, PokemonClient } from 'pokenode-ts'
import { args } from './commandLineArgs'
import { type DataSource } from 'typeorm';

(async () => {
  if (args.id && args.name) {
    console.log('Please only pass either a pokemon ID or a name, not both!')
    process.exit(0)
  }

  // Init connections
  const api = new PokemonClient()
  await appDataSource.initialize()

  // Import by id
  if (args.id) {
    const pokemon: Pokemon = await api.getPokemonById(args.id)
    await insertIntoDatabase(pokemon, appDataSource)
    process.stdout.write(`Inserted pokemon ${pokemon.name} with id ${pokemon.id}\n`)
  }

  // Import by name
  if (args.name) {
    const pokemon: Pokemon = await api.getPokemonByName(args.name)
    await insertIntoDatabase(pokemon, appDataSource)
    process.stdout.write(`Inserted pokemon ${pokemon.name} with id ${pokemon.id}\n`)
  }
})().catch(err => { console.error(err) })

async function insertIntoDatabase (pokemon: Pokemon, appDataSource: DataSource) {
  const pokemonEntity: PokemonEntity = new PokemonEntity()
  await pokemonEntity.initFromJson(pokemon)
  await appDataSource.manager.save(pokemonEntity)
}
