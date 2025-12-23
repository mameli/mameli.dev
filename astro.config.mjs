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
        manifest: {
            name: 'Mameli Blog',
            short_name: 'Mameli',
            description: 'A blog about software development, programming, and technology.',
            theme_color: '#ffffff',
            icons: [
                {
                    src: '/pwa-icon-192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/pwa-icon-512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
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