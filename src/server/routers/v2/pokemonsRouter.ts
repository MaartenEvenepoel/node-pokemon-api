import { Router, Request, Response } from 'express';

export const pokemonsRouter: Router = Router()

pokemonsRouter.post('/', (request: Request, response: Response) => { 
    response.status(200).send();
});
