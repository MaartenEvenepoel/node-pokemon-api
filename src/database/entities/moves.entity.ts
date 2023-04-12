import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { VersionGroupDetail } from "./version_group_detail.entity";
import { PokemonMoveVersion as versionGroupDetailType } from "pokenode-ts";
import { PokemonMove as MoveJson } from "pokenode-ts";
import { Pokemon } from "./pokemon.entity";

@Entity({ name: "moves" })
export class Move {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    move!: string;

    @OneToMany(() => VersionGroupDetail, (versionGroupDetail) => versionGroupDetail.move, {cascade: true, onDelete: "CASCADE"})
    version_group_details!: VersionGroupDetail[];

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.moves, {onDelete: "CASCADE"})
    pokemon!: Pokemon;

    async initFromJson(moveJson: MoveJson) {
        this.move = moveJson.move.name || "";
        this.version_group_details = await Promise.all(moveJson.version_group_details.map(async (versionGroupDetailType: versionGroupDetailType): Promise<VersionGroupDetail> => {
            let versionGroupDetail = new VersionGroupDetail();
            await versionGroupDetail.initFromJson(versionGroupDetailType);
            versionGroupDetail.move = this;
            return versionGroupDetail;
        }));
    }
}