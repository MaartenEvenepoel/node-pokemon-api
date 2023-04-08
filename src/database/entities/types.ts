import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon";

@Entity({ name: "types" })
export class Type {
@PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string;

    @Column()
    slot!: number;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.types)
    pokemon!: Pokemon;
}