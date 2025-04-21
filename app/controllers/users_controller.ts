import type { HttpContext } from '@adonisjs/core/http'
import USER,{UserRole} from '#models/user'

export default class UsersController {

    public async create({request,response}:HttpContext){
        const fullName = request.input('name')
        const email = request.input('email')
        const password = request.input('password')
        await USER.create({
            fullName,
            password,
            email,
            role:UserRole.USER
        })
        response.redirect('/login')
    }
}