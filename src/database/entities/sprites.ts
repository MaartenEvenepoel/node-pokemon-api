import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "sprites" })
export class Sprite {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    front_default!: string;

    @Column()
    front_female!: string;

    @Column()
    front_shiny!: string;

    @Column()
    front_shiny_female!: string;

    @Column()
    back_default!: string;

    @Column()
    back_female!: string;

    @Column()
    back_shiny!: string;

    @Column()
    back_shiny_female!: string;
}