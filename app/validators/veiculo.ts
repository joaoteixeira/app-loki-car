import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const messagesVeiculoProvider = new SimpleMessagesProvider({
  'required': 'O campo {{ field }} é obrigatório',
  'minLength': 'O campo {{ field }} deve ter pelo menos {{ min }} caracteres',
  'withoutDecimals': 'O campo {{ field }} deve ser inteiro',
  'min': 'O campo {{ field }} deve ser no mínimo {{ min }}',

  'placa.regex': 'A placa deve ser no formato: AAA-9A99 ou AAA-9999',
  'situacao.enum': 'A opção selecionada é inválida, a opção deve ser: liberado ou manutencao',
})

export const createVeiculoValidator = vine.compile(
  vine.object({
    marca: vine.string().trim().minLength(3),
    anoFabricacao: vine.number().withoutDecimals().min(2000),
    situacao: vine.enum(['liberado', 'manutencao']),
    placa: vine.string().regex(/^[A-Z]{3}-[0-9][A-Z0-9][0-9]{2}$/).trim(),

    // AAA-8900
    // AAA-8A00
  })
)