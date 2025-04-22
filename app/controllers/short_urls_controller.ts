import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'
import { URL } from 'url'
import Url from '#models/url'

export default class ShortUrlsController {
  //vers page d'accueil
  public async index({ view }:HttpContext) {
    const Utilisateur = await Url.all()

    return view.render('pages/liste', {
      Utilisateur,
    })
  }
  //vers page home avec le formulaire
  public async home({ view }:HttpContext) {
    return view.render('pages/home')
  }

  // création d'une url courte
  public async create({ request, view , auth}:HttpContext) {
    const lien: string = request.input('lien')
    new URL(`${lien}`)
    const code: number = Number(Math.random().toString().substring(3, 9))
    const appHost = process.env.APP_URL
    const newUrl = new URL(`/${code}`, `${appHost}`)
    const mini: string = String(newUrl)
    const USER = auth.user
    await Url.create({
      code,
      lien,
      mini,
      userid:USER?.id
    })
    const Qrlien: string = await QRCode.toDataURL(String(newUrl))
    return view.render('pages/result', {
      Qrlien: [Qrlien],
      newUrl: [newUrl],
      lien: [lien],
    })
  }

  // redirection vers le lien original
  public async redirect({ params, response }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)
    return response.redirect(Utilisateurs.lien)
  }
  // supprimer un lien
  public async delete({ params ,bouncer,response}:HttpContext) {
    const id: number = params.id
    const Utilisateurs = await Url.findOrFail(id)
    if(await bouncer.denies('controlUser',Utilisateurs)){
      return response.redirect().back()
    }
    await Utilisateurs.delete()

    return response.redirect('/')
  }

  // vers page de modification
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
  //enregistrement du formulaire de la modification
  public async editEnregistrement({ params, request,response }:HttpContext) {
    const code: number = params.code
    const Utilisateurs = await Url.findByOrFail('code', code)

    const AncUrl: string = request.input('lienOriginal')
    const codeRecup: number = request.input('code')

    const appHost = process.env.APP_URL

    Utilisateurs.code = codeRecup
    Utilisateurs.lien = AncUrl
    Utilisateurs.mini = `${appHost}/${codeRecup}`
    await Utilisateurs.save()

    return response.redirect('/')
  }
  //Pour voir en détail le lien
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
