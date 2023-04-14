import { DataSource } from 'typeorm'
import { Pokemon } from './entities/pokemon.entity'
import { Ability } from './entities/abilities.entity'
import { Move } from './entities/moves.entity'
import { Sprite } from './entities/sprites.entity'
import { Stat } from './entities/stats.entity'
import { Type } from './entities/type.entity'
import { VersionGroupDetail } from './entities/version_group_detail.entity'
import { Team } from './entities/team.entity'
import { config } from '../config'
import { TeamAddTestColumn1681478927339 } from './migrations/1681478927339-teamAddTestColumn'

export const appDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [Pokemon, Ability, Move, Sprite, Stat, Type, VersionGroupDetail, Team],
  migrations: [TeamAddTestColumn1681478927339],
  synchronize: true // Use only in development
  // logging: true
})
