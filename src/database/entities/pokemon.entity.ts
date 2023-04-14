import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn, BaseEntity } from 'typeorm'
import { Ability } from './abilities.entity'
import { Sprite } from './sprites.entity'
import { Type } from './type.entity'
import { Move } from './moves.entity'
import { Stat } from './stats.entity'
import { type Pokemon as PokemonJson, type PokemonAbility as AbilityJson, type PokemonType as TypeJson, type PokemonMove as MoveJson, type PokemonStat as StatJson } from 'pokenode-ts'

@Entity({ name: 'pokemons' })
export class Pokemon extends BaseEntity {
  @PrimaryColumn()
    id!: number

  @Column({ unique: true })
    name!: string

  @OneToOne(() => Sprite, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinColumn()
    sprites!: Sprite

  @OneToMany(() => Type, (type) => type.pokemon, { cascade: true, onDelete: 'CASCADE', eager: true })
    types!: Type[]

  @Column()
    height!: number

  @Column()
    weight!: number

  @OneToMany(() => Move, (move) => move.pokemon, { cascade: true, onDelete: 'CASCADE', eager: true })
    moves!: Move[]

  @Column()
    order!: number

  @Column()
    species!: string

  @OneToMany(() => Stat, (stat) => stat.pokemon, { cascade: true, onDelete: 'CASCADE', eager: true })
    stats!: Stat[]

  @OneToMany(() => Ability, (ability) => ability.pokemon, { cascade: true, onDelete: 'CASCADE', eager: true })
    abilities!: Ability[]

  @Column()
    form!: string

  async initFromJson (pokemonJson: PokemonJson): Promise<void> {
    this.id = pokemonJson.id

    this.name = pokemonJson.name

    const sprites = new Sprite()
    await sprites.initFromJson(pokemonJson.sprites)
    this.sprites = sprites

    this.types = await Promise.all(pokemonJson.types.map(async (typeJson: TypeJson): Promise<Type> => {
      const type: Type = new Type()
      await type.initFromJson(typeJson)
      type.pokemon = this
      return type
    }))

    this.height = Number(pokemonJson.height)

    this.weight = Number(pokemonJson.weight)

    this.moves = await Promise.all(pokemonJson.moves.map(async (moveJson: MoveJson): Promise<Move> => {
      const move: Move = new Move()
      await move.initFromJson(moveJson)
      move.pokemon = this
      return move
    }))

    this.order = Number(pokemonJson.order)

    this.species = pokemonJson.species.name

    this.stats = await Promise.all(pokemonJson.stats.map(async (statJson: StatJson): Promise<Stat> => {
      const stat: Stat = new Stat()
      await stat.initFromJson(statJson)
      stat.pokemon = this
      return stat
    }))

    this.abilities = await Promise.all(pokemonJson.abilities.map(async (abilityJson: AbilityJson): Promise<Ability> => {
      const ability: Ability = new Ability()
      await ability.initFromJson(abilityJson)
      ability.pokemon = this
      return ability
    }))

    this.form = pokemonJson.forms[0].name
  }
}
