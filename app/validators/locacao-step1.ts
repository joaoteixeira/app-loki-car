import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const locacaoStep1Validator = vine.compile(
  vine.object({
    _step: vine.string(),
    cliente: vine.number().positive().withoutDecimals(),
  })
)
