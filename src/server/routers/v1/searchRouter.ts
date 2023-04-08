import { Router, Request, Response } from 'express';

export const searchRouter: Router = Router()

searchRouter.post('/', (request: Request, response: Response) => { 
    response.status(200).send();
});
