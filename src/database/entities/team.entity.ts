import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    name!: string

  @Column('simple-array')
    pokemons!: number[]

  // Left in comment for demo purposes for migrations
  // @Column()
  // test!: string;
}
