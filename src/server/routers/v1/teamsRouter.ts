import { Router, Request, Response } from 'express';

export const teamsRouter: Router = Router()

teamsRouter.post('/', (request: Request, response: Response) => { 
    response.status(200).send();
});
