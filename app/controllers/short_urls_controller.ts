// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import { URL } from 'url'
import Url from '#models/url'

export default class ShortUrlsController {
  // Affiche la page d'accueil
  public async index({ view }) {
    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur,
    })
  }
  // Affiche la page avec le formulaire
  public async index2({ view }) {
    const Utilisateur = await Url.all()

    return view.render('pages/home', {
      Utilisateur,
    })
  }

  // Création d'une URL courte
  public async create({ request, response, view }) {
    // À implémenter
    const lien: string = request.input('lien')
    const testLien = new URL(`${lien}`)
    const code: number = Number(Math.random().toString().substring(2, 8))
    const host: string = request.completeUrl(true)
    const newUrl = new URL(`/${code}`, `${host}`)
    const mini: string = `${newUrl}`
    const URLS = await Url.create({
      code,
      lien,
      mini,
    })
    const Qrlien: string = await QRCode.toDataURL(`${newUrl}`)
    return view.render('pages/result', {
      tableau: [Qrlien],
      tableau2: [newUrl],
      tableau3: [lien],
    })
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }) {
    const code: number = params.code
    const Utilisateur = await Url.findByOrFail('code', code)
    return response.redirect(Utilisateur.lien)
  }
  // Supprimer un lien
  public async delete({ params, request, response }) {
    const id: number = params.id
    const SeulUtilisateur = await Url.findOrFail(id)
    await SeulUtilisateur.delete()

    const host: string = request.completeUrl().substring(0, 22)
    return response.redirect(host)
  }

  // Affiche la page de modification
  public async edit({ params, view, request, response }) {
    const code: number = params.code
    const editUser = await Url.findByOrFail('code', code)
    const lien = editUser.mini
    const lienOriginal = editUser.lien
    const host: string = request.completeUrl().substring(0, 22)

    return view.render('pages/edit', {
      editUsers: [lienOriginal],
      liens: [lien],
      code: [code],
    })
  }
  public async editEnregistrement({ params, view, request }) {
    let code = params.code

    let Utilisateur = await Url.findByOrFail('code', code)

    const AncUrl: string = request.input('lienOriginal')
    const Nouveau: string = request.input('lienCourt')

    Utilisateur.lien = AncUrl
    Utilisateur.mini = Nouveau
    await Utilisateur.save()

    const ALLUtilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur: ALLUtilisateur,
    })
  }
}
