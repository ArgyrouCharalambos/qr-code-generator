// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from "qrcode"
import { URL } from "url"
export default class ShortUrlsController {
  // Affiche la page d'accueil avec le formulaire
  public async index({ view }) {
    return view.render('pages/home')
  }

  // Création d'une URL courte
  public async create({ request, response ,view}) {
    // À implémenter
    const lien = request.input('lien')
    const code = Math.random().toString().substring(2,8)
    const host = request.completeUrl(true)
    const url = new URL(`/${code}`, `${host}`)
    const Qrlien = await QRCode.toDataURL(`${url}`)
    return view.render("pages/result" , {
      tableau: [Qrlien],
      tableau2: [url]
    })
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }){
    // À implémenter
  }
}
