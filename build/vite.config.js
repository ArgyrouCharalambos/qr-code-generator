import { defineConfig } from 'vite';
import adonisjs from '@adonisjs/vite/client';
export default defineConfig({
    plugins: [
        adonisjs({
            entrypoints: ['resources/css/app.css', 'resources/js/app.js'],
            reload: ['resources/views/**/*.edge'],
        }),
    ],
    server: {
        host: true,
        allowedHosts: ["qr-code-generator-27.onrender.com"],
    },
});
//# sourceMappingURL=vite.config.js.map