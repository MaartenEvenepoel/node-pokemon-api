// import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pokemon } from "./entities/pokemon";
import { Ability } from "./entities/abilities";
import { Move } from "./entities/moves";
import { Sprite } from "./entities/sprites";
import { Stat } from "./entities/stats";
import { Type } from "./entities/types";
import { VersionGroupDetail } from "./entities/version_group_details";

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Pokemon, Ability, Move, Sprite, Stat, Type, VersionGroupDetail],
    synchronize: true,
    // logging: true
})
