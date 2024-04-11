import type { HttpContext } from '@adonisjs/core/http'
import Veiculo from '#models/veiculo'

export default class VeiculosController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {

    const veiculos = await Veiculo.all()

    return view.render('pages/veiculos/index', { veiculos })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/veiculos/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {

    const veiculo = await Veiculo.create({
      marca: request.input('marca'),
      modelo: request.input('modelo'),
      anoFabricacao: request.input('anoFabricacao'),
      anoModelo: 2000,
      renavam: 1234567,
      cor: 'cinza',
      placa: 'NZH-9J34',
      situacao: request.input('situacao'),
    })
    
    if(veiculo.$isPersisted) {
      session.flash('notificacao', {
        type: 'success',
        message: `Veículo ${veiculo.modelo} cadastrado com sucesso!`,
      })
    }

    return response.redirect().toRoute('veiculos.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}