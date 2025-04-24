import vine from '@vinejs/vine'

export const createUrlValidator = vine.compile(
    vine.object({
      lien: vine.string().email(),
    })
  )

  export const updateUrlValidator = vine.compile(
    vine.object({
      lien: vine.string().email(),
      code: vine.number()
    })
  )
