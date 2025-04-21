import QRCode from 'qrcode';
import { URL } from 'url';
import Url from '#models/url';
export default class ShortUrlsController {
    async index({ view }) {
        const Utilisateur = await Url.all();
        return view.render('pages/liste', {
            Utilisateur,
        });
    }
    async home({ view }) {
        return view.render('pages/home');
    }
    async create({ request, view }) {
        const lien = request.input('lien');
        new URL(`${lien}`);
        const code = Number(Math.random().toString().substring(3, 9));
        const appHost = process.env.APP_URL;
        const newUrl = new URL(`/${code}`, `${appHost}`);
        const mini = String(newUrl);
        await Url.create({
            code,
            lien,
            mini,
        });
        const Qrlien = await QRCode.toDataURL(String(newUrl));
        return view.render('pages/result', {
            Qrlien: [Qrlien],
            newUrl: [newUrl],
            lien: [lien],
        });
    }
    async redirect({ params, response }) {
        const code = params.code;
        const Utilisateurs = await Url.findByOrFail('code', code);
        return response.redirect(Utilisateurs.lien);
    }
    async delete({ params, view }) {
        const id = params.id;
        const Utilisateurs = await Url.findOrFail(id);
        await Utilisateurs.delete();
        const Utilisateur = await Url.all();
        return view.render('pages/liste', {
            Utilisateur,
        });
    }
    async edit({ params, view }) {
        const code = params.code;
        const Utilisateurs = await Url.findByOrFail('code', code);
        const lienOriginal = Utilisateurs.lien;
        const appHost = process.env.APP_URL;
        return view.render('pages/edit', {
            editUsers: [lienOriginal],
            liens: [appHost],
            code: [code],
        });
    }
    async editEnregistrement({ params, view, request }) {
        const code = params.code;
        const Utilisateurs = await Url.findByOrFail('code', code);
        const AncUrl = request.input('lienOriginal');
        const codeRecup = request.input('code');
        const appHost = process.env.APP_URL;
        Utilisateurs.code = codeRecup;
        Utilisateurs.lien = AncUrl;
        Utilisateurs.mini = `${appHost}/${codeRecup}`;
        await Utilisateurs.save();
        const Utilisateur = await Url.all();
        return view.render('pages/liste', {
            Utilisateur
        });
    }
    async detail({ params, view }) {
        const id = params.id;
        const Utilisateurs = await Url.findOrFail(id);
        const newUrl = Utilisateurs.lien;
        const lien = Utilisateurs.mini;
        const Qrlien = await QRCode.toDataURL(lien);
        return view.render('pages/result', {
            Qrlien: [Qrlien],
            newUrl: [newUrl],
            lien: [lien]
        });
    }
}
//# sourceMappingURL=short_urls_controller.js.map