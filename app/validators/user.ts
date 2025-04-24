import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().maxLength(25),
        email: vine.string().activeUrl(),
        password: vine.string().minLength(8)
    })
)

export const connexionUserValidator = vine.compile(
    vine.object({
        email: vine.string().activeUrl(),
        password: vine.string().minLength(8)
    })
)

export const forgotPasswordValidator = vine.compile(
    vine.object({
        email: vine.string().activeUrl(),
    })
)
export const changePasswordValidator = vine.compile(
    vine.object({
        password: vine.string().minLength(8)
    })
)