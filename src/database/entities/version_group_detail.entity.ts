import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm'
import { type PokemonMoveVersion as VersionGroupDetailJson } from 'pokenode-ts'
import { Move } from './moves.entity'

@Entity({ name: 'version_group_details' })
export class VersionGroupDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    move_learned_method!: string

  @Column()
    version_group!: string

  @Column()
    level_learned_at!: number

  @ManyToOne(() => Move, (move) => move.version_group_details, { onDelete: 'CASCADE' })
    move!: Move

  async initFromJson (versionGroupDetailJson: VersionGroupDetailJson): Promise<void> {
    this.move_learned_method = versionGroupDetailJson.move_learn_method.name
    this.version_group = versionGroupDetailJson.version_group.name
    this.level_learned_at = Number(versionGroupDetailJson.level_learned_at)
  }
}
