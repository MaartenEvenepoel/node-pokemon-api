import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { PokemonType as TypeJson } from "pokenode-ts";
import { Pokemon } from "./pokemon.entity";

@Entity({ name: "types" })
export class Type extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string;

    @Column()
    slot!: number;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.types, {onDelete: "CASCADE"})
    pokemon!: Pokemon;

    async initFromJson(typeJson: TypeJson) {
        this.type = typeJson.type.name || "";
        this.slot = Number(typeJson.slot);
    }
}