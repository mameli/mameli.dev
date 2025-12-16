/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: '#eee8d5',
              color: '#586e75',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#fdf6e3',
              color: '#586e75',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
          },
        },
        invert: {
          css: {
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: '#21252b',
              color: '#abb2bf',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#282c34',
              color: '#abb2bf',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}