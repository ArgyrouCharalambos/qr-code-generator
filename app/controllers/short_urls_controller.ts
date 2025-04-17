import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import { URL } from 'url'
import Url from '#models/url'

export default class ShortUrlsController {
  // Affiche la page d'accueil
  public async index({ view }:HttpContext) {
    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur,
    })
  }
  // Affiche la page home avec le formulaire
  public async home({ view }:HttpContext) {
    return view.render('pages/home')
  }

  // Création d'une URL courte
  public async create({ request, view }:HttpContext) {
    const lien: string = request.input('lien')
    const testLien = new URL(`${lien}`)
    const code: number = Number(Math.random().toString().substring(3, 9))
    const host: string = request.completeUrl(true)
    const newUrl = new URL(`/${code}`, `${host}`)
    const mini: string = String(newUrl)
    const shortLink = await Url.create({
      code,
      lien,
      mini,
    })
    const Qrlien: string = await QRCode.toDataURL(String(newUrl))
    return view.render('pages/result', {
      Qrlien: [Qrlien],
      newUrl: [newUrl],
      lien: [lien],
    })
  }

  // Redirection vers l'URL originale
  public async redirect({ params, response }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)
    return response.redirect(Utilisateurs.lien)
  }
  // Supprimer un lien
  public async delete({ params, view }:HttpContext) {
    const id: number = params.id
    const Utilisateurs = await Url.findOrFail(id)
    await Utilisateurs.delete()

    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur,
    })
  }

  // Affiche la page de modification
  public async edit({ params, view, request }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)
    const lienOriginal: string = Utilisateurs.lien
    const host: string = request.completeUrl(true).substring(0, 22)

    return view.render('pages/edit', {
      editUsers: [lienOriginal],
      liens: [host],
      code: [code],
    })
  }
  public async editEnregistrement({ params, view, request }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)

    const AncUrl: string = request.input('lienOriginal')
    const codeRecup: number = request.input('code')

    const host: string = request.completeUrl(true).substring(0, 22)

    Utilisateurs.code = codeRecup
    Utilisateurs.lien = AncUrl
    Utilisateurs.mini = `${host}${codeRecup}`
    await Utilisateurs.save()

    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur
    })
  }

  public async detail({ params, view }:HttpContext) {
    const id: number = params.id
    const Utilisateurs = await Url.findOrFail(id)

    const newUrl: string = Utilisateurs.lien
    const lien: string = Utilisateurs.mini

    const Qrlien: string = await QRCode.toDataURL(lien)

    return view.render('pages/result', {
      Qrlien: [Qrlien],
      newUrl: [newUrl],
      lien: [lien]
    })
  }
}
