// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class ShortUrlsController {
  // Affiche la page d'accueil avec le formulaire
  public async index({ view }) {
    return view.render('pages/home')
  }

  // Création d'une URL courte
  public async create({ request, response ,view}) {
    // À implémenter
    const lien = request.input('lien')
    const Qrlien = await QRCode.toDataURL(lien)
    return view.render("pages/result" , {tableau: [Qrlien]})
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }){
    // À implémenter
  }
}
