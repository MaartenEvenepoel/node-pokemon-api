import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon";

@Entity({ name: "abilities" })
export class Ability {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ability!: string

    @Column()
    is_hidden!: boolean

    @Column()
    slot!: number

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.types)
    pokemon!: Pokemon;
}