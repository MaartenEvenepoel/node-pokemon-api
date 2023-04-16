# Node Pokemon API

## Setting up the environment

This project comes with a devcontainer configuration for vscode. The Devcontainer supports docker-on-docker for the database setup and administration and alson comes with all the required node.js and related utilities and tools.

## Setting up the Database

In order to spin up the api, we will first setup the database described in the docker-compose file by running the following command in the root of the project:

```bash
$ docker-compose up
```

This will spin up a Postgres server and create a database called "Pokemons" inside of it. In order to easily manage the database during development, it also spins up an instance of pgadmin4 that can connect to the Postgres server. The credentials for the database as well as the pgadmin instance are the following:

```
postgres user: ashketchum
postgres pass: pikachu

pgadmin user: ashketchum@pokemon.com
pgadmin pass: pikachu
```

Once the database is set up, it can be preloaded with the first 151 pokemons in the `pokemons.json` file. The command to do this is as follows:

```bash
$ npm run start -- --preloadDatabase
```

To start the database without preloading it with data, just run: 

```bash
$ npm run start.
```

You use also use:

```bash
$ npm run dev
```

to let the server automatically restart if it detects changes in the code. This speeds up development a bit.

## Importing pokemons from pokeapi.

It is also possible to import pokemons by id or by name from pokeapi. The commands to achieve this are the following. (the server does not need to be running to perform this operation.)

```bash
# Import pokemon with id 405 into the database
$ npm run pokeapi -- --id 405

# Import pokemon with name Lugia into the database
$ npm run pokeapi -- --name lugia
```

## Generating and applying migrations

To generate migrations for changes made to existing entities, use the following command:

```bash
$ npm run typeorm -- migration:generate src/database/migrations/yourMigrationName -d src/database/AppDataSource.ts
```

To apply the migration, import and add the migration(s) into the `AppDataSource`:

```typescript
import { TeamAddTestColumn1681478927339 } from "./migrations/1681478927339-teamAddTestColumn";

export const appDataSource: DataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [Pokemon, Ability, Move, Sprite, Stat, Type, VersionGroupDetail, Team],
    migrations: [TeamAddTestColumn1681478927339],
    synchronize: true, // Use only in development
    // logging: true
});
```

```bash
$ npm run typeorm -- migration:run -d ./src/database/AppDataSource.ts
```

