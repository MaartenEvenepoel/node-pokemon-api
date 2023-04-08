import { Router, Request, Response } from 'express';

export const healthRouter = Router()

healthRouter.get('/', (request: Request, response: Response) => { 
    response.status(200).send();
});
