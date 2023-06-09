import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm'
import { Pokemon } from './pokemon.entity'
import { type PokemonAbility as AbilityJson } from 'pokenode-ts'

@Entity({ name: 'abilities' })
export class Ability extends BaseEntity {
  @PrimaryGeneratedColumn({})
    id!: number

  @Column()
    ability!: string

  @Column()
    is_hidden!: boolean

  @Column()
    slot!: number

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.abilities, { onDelete: 'CASCADE' })
    pokemon!: Pokemon

  async initFromJson (abilityJson: AbilityJson): Promise<void> {
    this.ability = abilityJson.ability.name
    this.is_hidden = Boolean(abilityJson.is_hidden)
    this.slot = Number(abilityJson.slot)
  }
}
