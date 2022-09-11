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
                openFolder: 'openFolder 250ms forwards',
                closeFolder: 'closeFolder 250ms forwards',
                moveUp: 'moveUp 250ms forwards',
                moveDown: 'moveDown 250ms forwards',
                showUp: 'showUp 250ms forwards',
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
                openFolder: {
                    '0%': {},

                    '50%': {
                        transform:
                            'skew(-10deg, 0deg) translateX(26) translateY(12) scaleY(0.9)',
                    },

                    '100%': {
                        transform:
                            'skew(-20deg, 0deg) translateX(36px) translateY(56px) scaleY(0.4)',
                    },
                },
                closeFolder: {
                    '0%': {
                        transform:
                            'skew(-20deg, 0deg) translateX(36px) translateY(56px) scaleY(0.4)',
                    },

                    '50%': {
                        transform:
                            'skew(-10deg, 0deg) translateX(26) translateY(12) scaleY(0.9)',
                    },
                    '100%': {
                        transform:
                            'skew(0deg, 0deg) translateX(0) translateY(0) scaleY(1)',
                    },
                },
                moveUp: {
                    '0%': {
                        transform: 'translateY(0)',
                    },

                    '50%': {
                        transform: 'translateY(-5%)',
                    },

                    '100%': {
                        transform: 'translateY(-10%)',
                    },
                },
                showUp :{
                    '0%': {
                        transform: 'translateY(-20%)',
                    },
                    '25%': {
                        transform: 'translateY(-10%)',
                    },

                    '50%': {
                        transform: 'translateY(-5%)',
                    },

                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
                moveDown: {
                    '0%': {
                        transform: 'translateY(-10%)',
                    },

                    '50%': {
                        transform: 'translateY(-5%)',
                    },

                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
};
