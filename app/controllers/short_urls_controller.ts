// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from "qrcode"
import { URL } from "url"
import Url from '#models/url'

export default class ShortUrlsController {
  // Affiche la page d'accueil avec le formulaire
  public async index({ view }) {

    const Utilisateur = await Url.all();

    return view.render('pages/home',{
      Utilisateur
    })
  }

  // Création d'une URL courte
  public async create({ request, response ,view}) {
    // À implémenter
    const AncUrl:string = request.input('lien')
    const testLien = new URL(`${AncUrl}`)
    const code:number = Number(Math.random().toString().substring(2,8));
    const user = await Url.create({
      code: code,
      lien: AncUrl,
    })

    const host:string = request.completeUrl(true)
    const newUrl = new URL(`/${code}`, `${host}`)
    const Qrlien:string = await QRCode.toDataURL(`${newUrl}`)
    
    return view.render("pages/result" , {
      tableau: [Qrlien],
      tableau2: [newUrl],
      tableau3: [AncUrl]
    })
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }){
    const code:number = params.code
    const Utilisateur = await Url.findByOrFail('code', code )
    return response.redirect(Utilisateur.lien)
  }
  
  public async delete({params,request ,response}){
    const id = params.id
    const SeulUtilisateur = await Url.findOrFail(id)
    await SeulUtilisateur.delete()

    const host:string = request.completeUrl().substring(0,23)
    console.log(host)
    return response.redirect(host)
  }

  public async edit({params,view ,response}){
    const code = params.code
    const editUser = await Url.findByOrFail("code",code)
    const lien = editUser.lien

    return view.render('pages/home',{
      lien :[lien]
    })


  }
  
}