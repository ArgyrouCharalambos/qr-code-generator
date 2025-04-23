import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'



export default class EmailsController {
    public async passwordedit({params,view}:HttpContext){
        const email:string = params.email
return view.render('security/passwordedit',{email:[email]})
    }
    public async sendPassword({request,response}:HttpContext){
        const email = request.input('email')
        const user = User.findByOrFail('email',email)
        const appHost = process.env.APP_URL
        await mail.send((message) => {
        message
          .to(email)
          .from('argykaselve@gmail.com')
          .subject('Verify your email address')
          .html(`<a href="${appHost}/passwordedit/${email}" target="_blank" >réinsaliser le mot de passe !</a>`)
      })
      return response.redirect("/login")
    }
    
    public async passwordEnregistrement({params,request,response}:HttpContext){
        const email:string = params.email
        const newPassword = request.input("newPassword")
        const user = await User.findByOrFail('email',email)

        user.password = newPassword
        await user.save()

        return response.redirect('/login')
        

    }
    
}