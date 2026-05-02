import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@':           path.resolve(__dirname, './resources/js'),
            '@components': path.resolve(__dirname, './resources/js/components'),
            '@pages':      path.resolve(__dirname, './resources/js/pages'),
            '@hooks':      path.resolve(__dirname, './resources/js/hooks'),
            '@utils':      path.resolve(__dirname, './resources/js/utils'),
            '@data':       path.resolve(__dirname, './resources/js/data'),  // ← baru
        },
    },
});
