import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon.entity";
import { Type as TypeJson } from "../../types/pokemon";

@Entity({ name: "types" })
export class Type {
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