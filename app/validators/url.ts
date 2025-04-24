import vine from '@vinejs/vine'

export const createUrlValidator = vine.compile(
    vine.object({
      lien: vine.string().activeUrl(),
    })
  )

  export const updateUrlValidator = vine.compile(
    vine.object({
      lien: vine.string().activeUrl(),
      code: vine.number()
    })
  )
