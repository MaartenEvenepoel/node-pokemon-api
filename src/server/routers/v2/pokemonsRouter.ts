import { Router, type Request, type Response } from 'express'
import { Pokemon } from '../../../database/entities/pokemon.entity'
import { appDataSource } from '../../../database/AppDataSource'

export const pokemonsRouter: Router = Router()
const pokemonRepository = appDataSource.getRepository(Pokemon)

pokemonsRouter.get('/', async (request: Request, response: Response) => {
  // Parse query parameters
  let sort: string = request.query.sort as string
  const limit: number = Number.isNaN(parseInt(request.query.limit as string)) ? 10 : parseInt(request.query.limit as string)
  const offset: number = Number.isNaN(parseInt(request.query.offset as string)) ? 0 : parseInt(request.query.offset as string)

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
    .skip(offset * limit)
    .take(limit)
    .getMany()

  // Return pokemons
  return response.status(200).send(pokemons)
})
