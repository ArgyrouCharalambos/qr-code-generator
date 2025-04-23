import env from '#start/env';
import { defineConfig, transports } from '@adonisjs/mail';
const mailConfig = defineConfig({
    default: 'smtp',
    from: {
        address: '',
        name: '',
    },
    mailers: {
        smtp: transports.smtp({
            host: env.get('SMTP_HOST'),
            port: env.get('SMTP_PORT'),
            secure: false,
            auth: {
                type: 'login',
                user: String(env.get('SMTP_USERNAME')),
                pass: String(env.get('SMTP_PASSWORD'))
            },
            tls: {},
            ignoreTLS: false,
            requireTLS: false,
            pool: false,
            maxConnections: 5,
            maxMessages: 100,
        })
    }
});
export default mailConfig;
//# sourceMappingURL=mail.js.map