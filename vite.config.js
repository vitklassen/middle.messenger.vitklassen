import { defineConfig } from "vite";
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                page_not_found_error: resolve(__dirname, 'src/pages/page-not-found-error.html'),
                page_server_error: resolve(__dirname, 'src/pages/page-server-error.html'),
                page_signin: resolve(__dirname, 'src/pages/page-signin.html'),
                page_sigup: resolve(__dirname, 'src/pages/page-signup.html'),
                page_profile: resolve(__dirname, 'src/pages/page-profile.html'),
                page_profile_change_data: resolve(__dirname, 'src/pages/page-profile-change-data.html'),
                page_profile_change_password: resolve(__dirname, 'src/pages/page-profile-change-password.html'),
                page_chats: resolve(__dirname, 'src/pages/page-chats.html'),
            }
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    server: {
        port: 3000
    },
    plugins: [handlebars({
        partialDirectory: [
            './src/components/Form',]
    })]
});
