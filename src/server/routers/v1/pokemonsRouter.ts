/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { Pokemon } from '../../../database/entities/pokemon.entity'
import { appDataSource } from '../../../database/AppDataSource'

export const pokemonsRouter: Router = Router()
const pokemonRepository = appDataSource.getRepository(Pokemon)

pokemonsRouter.get('/', async (request: Request, response: Response) => {
  // Parse sort query parameter
  let sort: string = request.query.sort as string

  // If sort parameter is unknown or not set, default sorting behaviour is id-asc
  const allowedSortParameters: string[] = ['name-asc', 'name-desc', 'id-asc', 'id-desc']
  if (!allowedSortParameters.includes(sort)) {
    sort = 'id-asc'
  }
  const sortField: string = sort.split('-').at(0) as string
  const sortOrder: string = sort.split('-').at(1)?.toUpperCase() as string

  // Query list of pokemons with required fields and in required order.
  const pokemons: Pokemon[] = await pokemonRepository
    .createQueryBuilder('Pokemon')
    .leftJoinAndSelect('Pokemon.types', 'types')
    .leftJoinAndSelect('Pokemon.sprites', 'sprites')
    .select([
      'Pokemon.id',
      'Pokemon.name',
      'types.type',
      'types.slot',
      'sprites.front_default'
    ])
    .orderBy(`Pokemon.${sortField}`, sortOrder === 'ASC' ? 'ASC' : 'DESC')
    .getMany()

  // Return pokemons
  return response.status(200).send(pokemons)
})

pokemonsRouter.get('/:id', async (request: Request<{ id: number }>, response: Response) => {
  const pokemonId: number = request.params.id
  const pokemon: Pokemon | null = await pokemonRepository
    .createQueryBuilder('Pokemon')
    .where({ id: pokemonId })
    .leftJoinAndSelect('Pokemon.sprites', 'sprites')
    .leftJoinAndSelect('Pokemon.types', 'types')
    .leftJoinAndSelect('Pokemon.moves', 'moves')
    .leftJoinAndSelect('Pokemon.stats', 'stats')
    .leftJoinAndSelect('Pokemon.abilities', 'abilities')
    .leftJoinAndSelect('moves.version_group_details', 'version_group_details')
    .select([
      'Pokemon.id',
      'Pokemon.name',
      'sprites.front_default',
      'sprites.front_female',
      'sprites.front_shiny',
      'sprites.front_shiny_female',
      'sprites.back_default',
      'sprites.back_female',
      'sprites.back_shiny',
      'sprites.back_shiny_female',
      'types.type',
      'types.slot',
      'Pokemon.height',
      'Pokemon.weight',
      'moves.move',
      'version_group_details.move',
      'version_group_details.move_learned_method',
      'version_group_details.level_learned_at',
      'version_group_details.version_group',
      'Pokemon.order',
      'Pokemon.species',
      'stats.stat',
      'stats.base_stat',
      'stats.effort',
      'abilities.ability',
      'abilities.is_hidden',
      'abilities.slot',
      'Pokemon.form'
    ])
    .getOne()

  if (pokemon === null) {
    return response.status(404).send({ error: '404', error_message: 'Pokemon not found' })
  }
  return response.status(200).send(pokemon)
})
