import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'veiculos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('categoria_id').unsigned().references('categorias.id')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('categoria_id')
    })
  }
}
