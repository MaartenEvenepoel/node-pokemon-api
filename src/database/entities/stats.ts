import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon";

@Entity({ name: "stats" })
export class Stat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    stat!: string

    @Column()
    base_stat!: number

    @Column()
    effort!: number

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.types)
    pokemon!: Pokemon;
}