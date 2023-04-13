import { Router, Request, Response } from 'express';
import { appDataSource } from '../../../database/AppDataSource';
import { Pokemon } from '../../../database/entities/pokemon.entity';
import { FindManyOptions, Like, SelectQueryBuilder } from 'typeorm';

export const searchRouter: Router = Router()
const pokemonRepository = appDataSource.getRepository(Pokemon);

searchRouter.get('/', async (request: Request, response: Response) => {
    const query: string = request.query.query as string;
    const limit: number = Number.isNaN(parseInt(request.query.limit as string)) ? -1 : parseInt(request.query.limit as string);

    // Return error of no query provided
    if (query == undefined) {
        return response.status(400).send({error: "400 Bad Request", error_message: "No query parameter provided."});
    }

    // Construct Query Builder
    let selectQueryBuilder: SelectQueryBuilder<Pokemon> = pokemonRepository
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
        .where(`Pokemon.name ILIKE :query`, {query: `%${query}%`})

    // Add limit if needed
    if (limit != -1) {
        selectQueryBuilder = selectQueryBuilder.take(limit)
    }

    // Get list of matching pokemons
    const pokemons: Pokemon[] = await selectQueryBuilder.getMany() 
    response.status(200).send(pokemons);
});
