import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'veiculos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('valor', 8, 2).notNullable().defaultTo(215)
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('valor')
    })
  }
}
