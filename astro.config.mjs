// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pwa from '@vite-pwa/astro';

import vercel from '@astrojs/vercel';

import { SITE } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
    site: SITE,
    integrations: [mdx(), sitemap(), pwa({
        includeAssets: ['favicon.ico', 'pwa-icon-192.png'],
        base: '/',
        scope: '/',
        pwaAssets: {
            config: true,
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        },
        manifest: {
            "name": "Mameli Blog",
            "description": "A blog about software development, programming, and technology.",
            "short_name": "Mameli.dev",
            "icons": [
                {
                    "src": "/favicon-72x72.png",
                    "type": "image/png",
                    "sizes": "72x72",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-96x96.png",
                    "type": "image/png",
                    "sizes": "96x96",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-128x128.png",
                    "type": "image/png",
                    "sizes": "128x128",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-144x144.png",
                    "type": "image/png",
                    "sizes": "144x144",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-152x152.png",
                    "type": "image/png",
                    "sizes": "152x152",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-192x192.png",
                    "type": "image/png",
                    "sizes": "192x192",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-384x384.png",
                    "type": "image/png",
                    "sizes": "384x384",
                    "purpose": "any maskable"
                },
                {
                    "src": "/favicon-512x512.png",
                    "type": "image/png",
                    "sizes": "512x512",
                    "purpose": "any maskable"
                }
            ],
            "scope": "/",
            "start_url": "/?source=pwa",
            "display": "standalone",
            "theme_color": "#ffffff",
            "background_color": "#ffffff"
        }
    })],

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