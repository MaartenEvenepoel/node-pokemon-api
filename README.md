# Node Pokemon API

## Setting up the Database

In order to spin up the api, we will first setup the database described in the docker-compose file by running the following command in the root of the project:

```
$ docker-compose up
```

This will spin up a Postgres server and create a database called "Pokemons" inside of it. In order to easily manage the database during development, it also spins up an instance of pgadmin4 that can connect to the Postgres server. The credentials for the database as well as the pgadmin instance are the following:

```
postgres user: ashketchum
postgres pass: pikachu

pgadmin user: ashketchum@pokemon.com
pgadmin pass: pikachu
```


