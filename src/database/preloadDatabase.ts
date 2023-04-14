// Code that can be used to load the database with pokemons starting from the given pokemons.json file.
import all from '../../pokemons.json'
import { Pokemon as PokemonEntity } from './entities/pokemon.entity'
import { type Pokemon as PokemonJson } from 'pokenode-ts'
import { appDataSource } from './AppDataSource'

export async function preloadDatabase (): Promise<void> {
  /**
     * Preloads the database with Pokemons loaded from the pokemons.json file in the root of the project.
     */
  const pokemons: PokemonJson[] = (all as PokemonJson[])
  for (const pokemonJson of pokemons) {
    const pokemonEntity: PokemonEntity = new PokemonEntity()
    await pokemonEntity.initFromJson(pokemonJson)
    try {
      await appDataSource.manager.save(pokemonEntity)
      console.log(`pokemon ${pokemonEntity.name} has been saved with id: ${pokemonEntity.id}`)
    } catch (err) {
      console.log(`failed to insert pokemon ${pokemonEntity.name}`)
    }
  }
}
