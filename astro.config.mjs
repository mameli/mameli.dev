// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import vercel from '@astrojs/vercel';
import AstroPWA from '@vite-pwa/astro'

import { SITE } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
    site: SITE,
    build: {
        inlineStylesheets: 'always',
    },
    integrations: [mdx(), sitemap(), AstroPWA({
        mode: 'development',
        base: '/',
        scope: '/',
        includeAssets: ['favicon.ico', 'favicon-180x180.png'],
        manifest: {
            name: 'Mameli Blog',
            short_name: 'Mameli Blog',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'favicon-180x180.png',
                    sizes: '180x180',
                    type: 'image/png',
                },
                {
                    src: 'favicon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'favicon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'favicon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        },
        devOptions: {
            enabled: true,
            navigateFallbackAllowlist: [/^\/$/],
        },
    }),
    ],

    markdown: {
        shikiConfig: {
            themes: {
                dark: 'one-dark-pro',
                light: 'solarized-light',
            },
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
    output: 'static',
    adapter: vercel(),
});
