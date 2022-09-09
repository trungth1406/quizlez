/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat'],
            },
            colors: {
                'custom-primary': '#212D40',
                'custom-secondary': '#364156',
                'custom-sub': '#D66853',
                'custom-second-sub': '#7D4E57',
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                fadeIn: 'fadeIn 500ms ease-in',
                flipVertical: 'flipVertical 1s ease-in',
            },
            boxShadow: {
                customMenu: '0px 0px 12px 4px rgba(66, 84, 255, 0.40)',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': {
                        transform: 'rotate(-34deg)',
                    },
                    '50%': {
                        transform: 'rotate(23deg)',
                    },
                },
                fadeIn: {
                    '0%': {
                        opacity: 0,
                    },
                    '50%': {
                        opacity: 0.5,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
                flipVertical: {
                    '0%': {
                        transform: 'rotate(0deg)',
                    },
                    '100%': {
                        transform: 'rotateY(180deg)',
                    },
                },
            },
        },
    },
    plugins: [],
};
