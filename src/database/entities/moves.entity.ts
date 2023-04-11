import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { VersionGroupDetail as versionGroupDetailType } from "../../types/pokemon";
import { VersionGroupDetail } from "./version_group_detail.entity";
import { Mfe as MoveJson } from "../../types/pokemon";
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

    async initFromJson(moveType: MoveJson) {
        this.move = moveType.move.name || "";
        this.version_group_details = await Promise.all(moveType.version_group_details.map(async (versionGroupDetailType: versionGroupDetailType): Promise<VersionGroupDetail> => {
            let versionGroupDetail = new VersionGroupDetail();
            await versionGroupDetail.initFromJson(versionGroupDetailType);
            versionGroupDetail.move = this;
            return versionGroupDetail;
        }));
    }
}