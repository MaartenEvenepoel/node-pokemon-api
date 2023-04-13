import { Router, Request, Response, json } from 'express';
import { Team } from '../../../database/entities/team.entity';
import { appDataSource } from '../../../database/AppDataSource';
import { Pokemon } from '../../../database/entities/pokemon.entity';

export const teamsRouter: Router = Router()
teamsRouter.use(json())
const teamRepository = appDataSource.getRepository(Team);
const pokemonRepository = appDataSource.getRepository(Pokemon)

/**
 * Get a list of all teams
 */
teamsRouter.get('/', async (request: Request, response: Response) => {
    const teams: Team[] = await teamRepository.find();
    response.status(200).send(teams)
})

/**
 * Create a new team with a given name
 */
teamsRouter.post('/', async (request: Request, response: Response) => {
    // Create the new team entity
    let team: Team = new Team();

    // Check if "name" exists in request body and if it is a string
    if (typeof(request.body.name) != "string") {
        return response.status(400).send({error: "400", error_message: "Malformed JSON"})
    }

    // Create and init the name
    team.name = request.body.name as string;
    team.pokemons = [];
    await teamRepository.save(team);

    // Return the team object
    response.status(201).send(team);
});

/**
 * Get a team by id
 */
teamsRouter.get('/:id', async (request: Request<{id: number}>, response: Response) => {
    const teamId: number = request.params.id;
    const team: Team | null = await teamRepository.findOneBy({
        id: teamId
    })
    if (team == null) {
        return response.status(404).send({error: "404", error_message: "Team not found"});
    }
    return response.status(200).send(team);
})

/**
 * Post an existing team.
 */
teamsRouter.post('/:id', async (request: Request<{id: number}>, response: Response) => {
    const teamId: number = request.params.id;
    const team: Team | null = await teamRepository.findOneBy({
        id: teamId
    })
    if (team == null) {
        return response.status(404).send({error: "404", error_message: "Team not found"});
    }
    if ((request.body.pokemons as number[]).length > 6) {
        return response.status(400).send({error: "400", error_message: "Maximum pokemon limit in team exceeded. Limit is 6."});
    }

    // Check if pokemons exist
    for (let pokemonId of (request.body.pokemons as number[])) {
        const pokemon: Pokemon | null = await pokemonRepository.findOneBy({id: Number(pokemonId)})
        if (pokemon == null) {
            return response.status(400).send({error: '400', error_message: `pokemon with id ${pokemonId} does not exist.`});
        }
    }

    team.pokemons = (request.body.pokemons as number[]);
    await teamRepository.update({id: teamId}, team);
    return response.status(200).send(team);
}) 
