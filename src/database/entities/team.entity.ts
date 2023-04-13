import { Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { Pokemon } from "./pokemon.entity";

@Entity()
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("simple-array")
    pokemons!: number[]

    @ManyToMany(() => Pokemon)
    @JoinTable()
    pokemonEntities!: Pokemon[];
}