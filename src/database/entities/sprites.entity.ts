import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { type PokemonSprites as SpritesJson } from 'pokenode-ts'

@Entity({ name: 'sprites' })
export class Sprite extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    front_default!: string

  @Column()
    front_female!: string

  @Column()
    front_shiny!: string

  @Column()
    front_shiny_female!: string

  @Column()
    back_default!: string

  @Column()
    back_female!: string

  @Column()
    back_shiny!: string

  @Column()
    back_shiny_female!: string

  async initFromJson (spritesJson: SpritesJson): Promise<void> {
    this.front_default = spritesJson.front_default === null ? '' : spritesJson.front_default
    this.front_female = spritesJson.front_female === null ? '' : spritesJson.front_female
    this.front_shiny = spritesJson.front_shiny === null ? '' : spritesJson.front_shiny
    this.front_shiny_female = spritesJson.front_shiny_female === null ? '' : spritesJson.front_shiny_female
    this.back_default = spritesJson.back_default === null ? '' : spritesJson.back_default
    this.back_female = spritesJson.back_female === null ? '' : spritesJson.back_female
    this.back_shiny = spritesJson.back_shiny === null ? '' : spritesJson.back_shiny
    this.back_shiny_female = spritesJson.back_shiny_female === null ? '' : spritesJson.back_shiny_female
  }
}
