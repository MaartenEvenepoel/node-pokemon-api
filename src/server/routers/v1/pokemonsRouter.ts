import { Router, Request, Response } from 'express';
import { Pokemon } from '../../../database/entities/pokemon.entity';
import { appDataSource } from '../../../database/AppDataSource';

export const pokemonsRouter: Router = Router();
const pokemonRepository = appDataSource.getRepository(Pokemon);

pokemonsRouter.get('/', async (request: Request, response: Response) => {
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
        .getMany()
    return response.status(200).send(pokemons);
});
