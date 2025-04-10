// import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class QrCodesController {
  public async generate({ params,request ,view }) {
    // À implémenter
    const lien = request.input('lien')
    const Qrlien = await QRCode.toDataURL(lien)
    return view.render("pages/result" , {tableau: [Qrlien]})
  }
}
