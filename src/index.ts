import { preloadDatabase } from './database/preloadDatabase'
import { appDataSource } from './database/AppDataSource'
import { args } from './utils/commandLineArgs'
import { app } from './server'
import { config } from './config';

(async () => {
  process.stdout.write('Initializing database...\n')
  await appDataSource.initialize()
  process.stdout.write('Database initialization done.\n')

  if (args.preloadDatabase) {
    process.stdout.write('Preloading database with pokemons..')
    await preloadDatabase()
  }

  app.listen(config.API_PORT, () => {
    process.stdout.write(`API server listening on port ${config.API_PORT}\n`)
  })
})().catch((err) => {
  console.log(err)
  process.exit(1)
})
