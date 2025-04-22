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
  public async create({ request, view , auth}:HttpContext) {
    const lien: string = request.input('lien')
    new URL(`${lien}`)
    const code: number = Number(Math.random().toString().substring(3, 9))
    const appHost = process.env.APP_URL
    const newUrl = new URL(`/${code}`, `${appHost}`)
    const mini: string = String(newUrl)
    const USERId = auth.user
    await Url.create({
      code,
      lien,
      mini,
      userid:USERId?.id
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
  public async delete({ params, view ,bouncer,response}:HttpContext) {
    const id: number = params.id
    const Utilisateurs = await Url.findOrFail(id)
    if(await bouncer.denies('controlUser',Utilisateurs)){
      return response.redirect().back()
    }
    await Utilisateurs.delete()

    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur,
    })
  }

  // Affiche la page de modification
  public async edit({ params, view ,bouncer,response}:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)
    if(await bouncer.denies('controlUser',Utilisateurs)){
      return response.redirect().back()
    }
    const lienOriginal: string = Utilisateurs.lien
    const appHost = process.env.APP_URL

    return view.render('pages/edit', {
      editUsers: [lienOriginal],
      liens: [appHost],
      code: [code],
    })
  }
  public async editEnregistrement({ params, view, request }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)

    const AncUrl: string = request.input('lienOriginal')
    const codeRecup: number = request.input('code')

    const appHost = process.env.APP_URL

    Utilisateurs.code = codeRecup
    Utilisateurs.lien = AncUrl
    Utilisateurs.mini = `${appHost}/${codeRecup}`
    await Utilisateurs.save()

    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur
    })
  }

  public async detail({ params, view ,bouncer,response}:HttpContext) {
    const id: number = params.id
    const Utilisateurs = await Url.findOrFail(id)
    if(await bouncer.denies('controlUser',Utilisateurs)){
      return response.redirect().back()
    }

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
