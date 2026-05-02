// ============================================================
//  vite.config.static.js
//  Digunakan khusus untuk build statis (GitHub Pages / Vercel)
//  Jalankan: npm run build:static
// ============================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    // Ganti '/portfolio-rizqi/' dengan nama repo GitHub Anda
    // Contoh: repo bernama "portfolio-rizqi" → base: '/portfolio-rizqi/'
    // Jika pakai custom domain atau Vercel       → base: '/'
    base: '/portfolio-rizqi/',

    plugins: [
        react(),
    ],

    resolve: {
        alias: {
            '@':           path.resolve(__dirname, './resources/js'),
            '@components': path.resolve(__dirname, './resources/js/components'),
            '@pages':      path.resolve(__dirname, './resources/js/pages'),
            '@hooks':      path.resolve(__dirname, './resources/js/hooks'),
            '@utils':      path.resolve(__dirname, './resources/js/utils'),
            '@data':       path.resolve(__dirname, './resources/js/data'),
        },
    },

    build: {
        outDir:     'dist',
        emptyOutDir: true,
    },
});
