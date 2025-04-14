// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from "qrcode"
import { URL } from "url"
import User from '#models/url'
import { open } from "fs"
export default class ShortUrlsController {
  // Affiche la page d'accueil avec le formulaire
  public async index({ view }) {
    return view.render('pages/home')
  }

  // Création d'une URL courte
  public async create({ request, response ,view}) {
    // À implémenter
    const AncUrl:string = request.input('lien')
    const testLien = new URL(`${AncUrl}`)
    const code:number = Number(Math.random().toString().substring(2,8));
    const user = await User.create({
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
    const user = await User.findByOrFail('code', code )
    return response.redirect(user.lien)
  }
}
