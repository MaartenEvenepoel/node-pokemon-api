import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Sprite } from "./sprites";
import { Type } from "./types";
import { Move } from "./moves";
import { Stat } from "./stats";
import { Ability } from "./abilities";

@Entity({ name: "pokemons" })
export class Pokemon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToOne(() => Sprite)
    @JoinColumn()
    sprites!: number;
    
    @OneToMany(() => Type, (type) => type.pokemon)
    types!: Type[];

    @Column()
    height!: number;

    @Column()
    weight!: number;

    @OneToMany(() => Move, (move) => move.pokemon)
    moves!: Move[];

    @Column()
    order!: number;

    @Column()
    species!: string;

    @OneToMany(() => Stat, (stat) => stat.pokemon)
    stats!: Stat[];

    @OneToMany(() => Ability, (ability) => ability.pokemon)
    abilities!: Ability[]

    @Column()
    form!: string
}