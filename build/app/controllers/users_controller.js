import USER, { UserRole } from '#models/user';
export default class UsersController {
    async create({ request, response }) {
        const fullName = request.input('name');
        const email = request.input('email');
        const password = request.input('password');
        await USER.create({
            fullName,
            password,
            email,
            role: UserRole.USER
        });
        response.redirect('/login');
    }
    async login({ request, auth, response }) {
        const email = request.input('email');
        const password = request.input('password');
        const user = await USER.verifyCredentials(email, password);
        await auth.use('web').login(user);
        response.redirect('/');
    }
    async deconnect({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect('/login');
    }
}
//# sourceMappingURL=users_controller.js.map