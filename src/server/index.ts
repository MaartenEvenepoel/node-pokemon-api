import express from 'express'
import { healthRouter } from './routers/healthRouter'
import { pokemonsRouter as pokemonsRouterV1 } from './routers/v1/pokemonsRouter'
import { pokemonsRouter as pokemonsRouterV2 } from './routers/v2/pokemonsRouter'
import { teamsRouter } from './routers/v1/teamsRouter'
import { searchRouter } from './routers/v1/searchRouter'

export const app = express()
  .use('/health', healthRouter)
  .use('/api/v1/pokemons', pokemonsRouterV1)
  .use('/api/v2/pokemons', pokemonsRouterV2)
  .use('/api/v1/teams', teamsRouter)
  .use('/api/v1/search', searchRouter)
