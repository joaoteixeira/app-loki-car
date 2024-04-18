import vine from '@vinejs/vine'

/**
 * Validação Veículos - create
 */
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