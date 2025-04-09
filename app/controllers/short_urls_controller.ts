// import type { HttpContext } from '@adonisjs/core/http'

export default class ShortUrlsController {
  // Affiche la page d'accueil avec le formulaire
  public async index({ view }) {
    return view.render('pages/home')
  }

  // Création d'une URL courte
  public async create({ request, response }) {
    // À implémenter
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }){
    // À implémenter
  }
}
