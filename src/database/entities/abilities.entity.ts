import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pokemon } from "./pokemon.entity";
import { Ability as AbilityJson } from "../../types/pokemon";

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

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.abilities, {onDelete: "CASCADE"})
    pokemon!: Pokemon;

    async initFromJson(abilityJson: AbilityJson) {
        this.ability = abilityJson.ability.name || "";
        this.is_hidden = Boolean(abilityJson.is_hidden);
        this.slot = Number(abilityJson.slot);
    }
}