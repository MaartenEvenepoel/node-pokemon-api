import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Move } from "./moves";

@Entity({ name: "version_group_details" })
export class VersionGroupDetail {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    move_learned_method!: string;

    @Column()
    version_group!: string;

    @Column()
    level_learned_at!: number;

    @ManyToOne(() => Move, (move) => move.version_group_details)
    move!: Move;
}