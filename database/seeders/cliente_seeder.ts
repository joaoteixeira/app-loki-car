import Cliente from '#models/cliente'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Cliente.createMany([
      {
        nome: 'João Teixeira',
      },
      {
        nome: 'Pedro Oliveira',
      },
      {
        nome: 'Sophia Silva',
      },
    ])
  }
}
