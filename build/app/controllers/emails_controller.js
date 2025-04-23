import mail from '@adonisjs/mail/services/main';
import User from '#models/user';
export default class EmailsController {
    async passwordedit({ params, view }) {
        const email = params.email;
        return view.render('security/passwordedit', { email: [email] });
    }
    async sendPassword({ request, response }) {
        const email = request.input('email');
        User.findByOrFail('email', email);
        const appHost = process.env.APP_URL;
        await mail.send((message) => {
            message
                .to(email)
                .from('argykaselve@gmail.com')
                .subject('Verify your email address')
                .html(`<a href="${appHost}/passwordedit/${email}" target="_blank" >réinsaliser le mot de passe !</a>`);
        });
        return response.redirect("/login");
    }
    async passwordEnregistrement({ params, request, response }) {
        const email = params.email;
        const newPassword = request.input("newPassword");
        const user = await User.findByOrFail('email', email);
        user.password = newPassword;
        await user.save();
        return response.redirect('/login');
    }
}
//# sourceMappingURL=emails_controller.js.map