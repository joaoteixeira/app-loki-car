import Categoria from '#models/categoria'
import Veiculo from '#models/veiculo'
import { createVeiculoValidator, messagesVeiculoProvider } from '#validators/veiculo'
import type { HttpContext } from '@adonisjs/core/http'

export default class VeiculosController {
  async index({ view }: HttpContext) {
    const veiculos = await Veiculo.query().preload('categoria')

    return view.render('pages/veiculos/index', { veiculos })
  }

  async create({ view }: HttpContext) {
    const categorias = await Categoria.all()

    return view.render('pages/veiculos/create', { categorias })
  }

  async store({ request, response, session }: HttpContext) {
    const dados = request.all()

    const dadosValidos = await createVeiculoValidator.validate(dados, {
      messagesProvider: messagesVeiculoProvider,
    })

    const categoria = await Categoria.find(dadosValidos.categoria)

    if (!categoria) {
      session.flash('notificacao', {
        type: 'danger',
        message: `A categoria informada não encontrado!`,
      })

      return response.redirect().toRoute('veiculos.index')
    }

    const veiculo = await Veiculo.create({
      marca: dadosValidos.marca,
      modelo: dadosValidos.modelo,
      anoFabricacao: dadosValidos.anoFabricacao,
      anoModelo: 2000,
      renavam: 1234567,
      cor: 'cinza',
      placa: 'NZH-9J34',
      situacao: request.input('situacao'),
    })

    await veiculo.related('categoria').associate(categoria)

    if (veiculo.$isPersisted) {
      session.flash('notificacao', {
        type: 'success',
        message: `Veículo ${veiculo.modelo} cadastrado com sucesso!`,
      })
    }

    return response.redirect().toRoute('veiculos.index')
  }

  async show({ params }: HttpContext) {}

  async edit({ params, view }: HttpContext) {
    const veiculo = await Veiculo.find(params.id)

    return view.render('pages/veiculos/create', { veiculo })
  }

  async update({ params, request, response, session }: HttpContext) {
    const veiculo = await Veiculo.find(params.id)

    if (!veiculo) {
      session.flash('notificacao', {
        type: 'danger',
        message: `Veículo informado não encontrado!`,
      })
    }

    const dados = await createVeiculoValidator.validate(request.all(), {
      messagesProvider: messagesVeiculoProvider,
    })

    await veiculo?.merge(dados).save()

    if (veiculo?.$isPersisted) {
      session.flash('notificacao', {
        type: 'warning',
        message: `Veículo ${veiculo.modelo} atualizado com sucesso!`,
      })
    }

    return response.redirect().toRoute('veiculos.index')
  }

  async destroy({ params, session, response }: HttpContext) {
    const veiculo = await Veiculo.find(params.id)

    await veiculo?.delete()

    if (veiculo?.$isDeleted) {
      session.flash('notificacao', {
        type: 'success',
        message: `Veículo excluído com sucesso!`,
      })
    }

    return response.redirect().toRoute('veiculos.index')
  }
}
