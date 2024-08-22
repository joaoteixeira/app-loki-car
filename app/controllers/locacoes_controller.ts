import Cliente from '#models/cliente'
import Locacao from '#models/locacao'
import Veiculo from '#models/veiculo'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocacoesController {
  async index({ view }: HttpContext) {
    const locacoes = await Locacao.query().preload('cliente')

    return view.render('pages/locacoes/index', { locacoes })
  }

  async create({ view }: HttpContext) {
    const clientes = await Cliente.query().orderBy('nome', 'asc')

    return view.render('pages/locacoes/form-step1', { clientes })
  }

  async createStep2({ view, params, response }: HttpContext) {
    if (!params?.id) {
      return response.redirect().toRoute('locacoes.create')
    }

    const locacao = await Locacao.find(params.id)
    await locacao?.load('cliente')
    await locacao?.load('veiculos')

    const veiculos = await Veiculo.query().where('situacao', 'liberado')

    return view.render('pages/locacoes/form-step2', { locacao, veiculos })
  }

  async store({ request, response, session }: HttpContext) {
    const dados = request.all()

    if (dados._step && dados._step === '1') {
      const cliente = await Cliente.find(dados.cliente)

      if (!cliente) {
        session.flash('notificacao', {
          type: 'danger',
          message: `O cliente informado não foi encontrado na base de dados!`,
        })

        return response.redirect().toRoute('locacoes.create')
      }

      const locacao = await Locacao.create({
        dataInicial: dados.dataInicial,
        dataFinal: dados.dataFinal,
        quantidadeDias: 10,
      })

      await locacao.related('cliente').associate(cliente)

      if (locacao.$isPersisted) {
        return response.redirect().toRoute('locacoes.step2', { id: locacao.id })
      }
    }
  }

  async storeStep2({ request, response, session, params }: HttpContext) {
    if (!params?.id) {
      return response.redirect().toRoute('locacoes.create')
    }

    const dados = request.all()

    if (dados._step && dados._step === '2') {
      const locacao = await Locacao.query().where('id', params.id).preload('veiculos').first()
      const veiculo = await Veiculo.find(dados.veiculo)

      if (!locacao || !veiculo) {
        return response.redirect().toRoute('locacoes.create')
      }

      const exists = locacao.veiculos.some((item) => item.id === veiculo.id)

      if (exists) {
        session.flash('notificacao', {
          type: 'danger',
          message: `O veículo ${veiculo.modelo} (${veiculo.marca}) já foi adicionado a Locação!`,
        })

        return response.redirect().toRoute('locacoes.step2', { id: locacao.id })
      }

      let valorTotal = 0
      valorTotal = locacao.veiculos.reduce(
        (acc, item) => acc + Number.parseFloat(item.$extras.pivot_valor),
        0
      )

      await locacao?.related('veiculos').attach({ [veiculo.id]: { valor: veiculo.valor } })

      valorTotal += Number.parseFloat(`${veiculo.valor}`)

      await locacao.merge({ valorTotal }).save()

      return response.redirect().toRoute('locacoes.step2', { id: locacao.id })
    }
  }

  async show({ params }: HttpContext) {}

  async edit({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
