import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Sprites as SpritesJson } from "../../types/pokemon";

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

    async initFromJson(spritesJson: SpritesJson) {
        this.front_default = spritesJson.front_default || "";
        this.front_female = spritesJson.front_female || "";
        this.front_shiny = spritesJson.front_shiny || "";
        this.front_shiny_female = spritesJson.front_shiny_female || "";
        this.back_default = spritesJson.back_default || "";
        this.back_female = spritesJson.back_female || "";
        this.back_shiny = spritesJson.back_shiny || "";
        this.back_shiny_female = spritesJson.back_shiny_female || "";
    }
}