import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Cliente from './cliente.js'
import Veiculo from './veiculo.js'

export default class Locacao extends BaseModel {
  static table = 'locacoes'

  @column({ isPrimary: true })
  declare id: number

  @column.date()
  declare dataInicial: Date

  @column.date()
  declare dataFinal: Date

  @column()
  declare quantidadeDias: number

  @column()
  declare valorTotal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare clienteId: number

  @belongsTo(() => Cliente, { foreignKey: 'clienteId' })
  declare cliente: BelongsTo<typeof Cliente>

  @manyToMany(() => Veiculo, {
    pivotTable: 'locacoes_veiculos',
    pivotColumns: ['valor'],
    localKey: 'id',
    pivotForeignKey: 'locacao_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'veiculo_id',
  })
  declare veiculos: ManyToMany<typeof Veiculo>
}
