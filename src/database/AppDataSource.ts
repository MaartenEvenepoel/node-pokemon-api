// import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pokemon } from "./entities/pokemon.entity";
import { Ability } from "./entities/abilities.entity";
import { Move } from "./entities/moves.entity";
import { Sprite } from "./entities/sprites.entity";
import { Stat } from "./entities/stats.entity";
import { Type } from "./entities/type.entity";
import { VersionGroupDetail } from "./entities/version_group_detail.entity";
import { Team } from "./entities/team.entity";

export const appDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Pokemon, Ability, Move, Sprite, Stat, Type, VersionGroupDetail, Team],
    synchronize: true,
    // logging: true
});
