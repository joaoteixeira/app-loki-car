import Categoria from '#models/categoria'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Veiculo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare marca: string

  @column()
  declare modelo: string

  @column()
  declare anoFabricacao: number

  @column()
  declare anoModelo: number

  @column()
  declare renavam: number

  @column()
  declare placa: string

  @column()
  declare cor: string

  @column()
  declare valor: number

  @column()
  declare situacao: string

  @column()
  declare ativo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare categoriaId: number

  @belongsTo(() => Categoria, { foreignKey: 'categoriaId' })
  declare categoria: BelongsTo<typeof Categoria>
}
