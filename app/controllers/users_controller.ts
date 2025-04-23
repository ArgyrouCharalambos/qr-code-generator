import type { HttpContext } from '@adonisjs/core/http'
import USER,{UserRole} from '#models/user'

export default class UsersController {

    //création d'un utilisateur
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
    //connexion d'un utilisateur
    public async login({request,auth,response}:HttpContext){
        const email = request.input('email')
        const password = request.input('password')

        const user = await USER.verifyCredentials(email, password)

        await auth.use('web').login(user)

        response.redirect('/')
    }

    public async Deconnect({ auth, response}:HttpContext){
            await auth.use('web').logout()
            return response.redirect('/login')
    }
}