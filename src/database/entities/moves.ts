import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { VersionGroupDetail } from "./version_group_details";
import { Pokemon } from "./pokemon";

@Entity({ name: "moves" })
export class Move {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    move!: string;

    @OneToMany(() => VersionGroupDetail, (versionGroupDetail) => versionGroupDetail.move)
    version_group_details!: VersionGroupDetail[];

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.types)
    pokemon!: Pokemon;
}