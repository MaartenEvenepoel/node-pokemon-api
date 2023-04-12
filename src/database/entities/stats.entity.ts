import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon.entity";
import { PokemonStat as StatJson } from "pokenode-ts";

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

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.stats, {onDelete: "CASCADE"})
    pokemon!: Pokemon;

    async initFromJson(statJson: StatJson) {
        this.stat = statJson.stat.name || "";
        this.base_stat = Number(statJson.base_stat);
        this.effort = Number(statJson.effort);
    }
}