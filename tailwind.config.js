/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
        './resources/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans:    ['Sora', 'sans-serif'],
                display: ['"Space Grotesk"', 'sans-serif'],
                mono:    ['"Fira Code"', 'monospace'],
            },
            colors: {
                primary: {
                    50:  '#f0f4ff',
                    100: '#dce8ff',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa', // Sekarang text-primary-400 akan terbaca
                    500: '#3b6eff',
                    600: '#2554e8',
                    700: '#1a3fc4',
                    900: '#0d1f6b',
                },
                accent: {
                    400: '#f97316',
                    500: '#ea580c',
                },
                surface: {
                    50:  '#f8fafc',
                    100: '#f1f5f9',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },
            animation: {
                'fade-up':   'fadeUp 0.5s ease forwards',
                'slide-in':  'slideIn 0.4s ease forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%':   { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%':   { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};
