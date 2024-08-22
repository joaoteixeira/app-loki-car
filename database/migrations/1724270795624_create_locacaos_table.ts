import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.date('data_inicial').notNullable()
      table.date('data_final').notNullable()
      table.integer('quantidade_dias').notNullable()
      table.decimal('valor_total', 10, 2).nullable()

      table.integer('cliente_id').unsigned().references('clientes.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
