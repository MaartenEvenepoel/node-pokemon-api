import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from 'typeorm'
import { VersionGroupDetail } from './version_group_detail.entity'
import { type PokemonMoveVersion as versionGroupDetailType, type PokemonMove as MoveJson } from 'pokenode-ts'
import { Pokemon } from './pokemon.entity'

@Entity({ name: 'moves' })
export class Move extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    move!: string

  @OneToMany(() => VersionGroupDetail, (versionGroupDetail) => versionGroupDetail.move, { cascade: true, onDelete: 'CASCADE', eager: true })
    version_group_details!: VersionGroupDetail[]

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.moves, { onDelete: 'CASCADE' })
    pokemon!: Pokemon

  async initFromJson (moveJson: MoveJson): Promise<void> {
    this.move = moveJson.move.name
    this.version_group_details = await Promise.all(moveJson.version_group_details.map(async (versionGroupDetailType: versionGroupDetailType): Promise<VersionGroupDetail> => {
      const versionGroupDetail = new VersionGroupDetail()
      await versionGroupDetail.initFromJson(versionGroupDetailType)
      versionGroupDetail.move = this
      return versionGroupDetail
    }))
  }
}
