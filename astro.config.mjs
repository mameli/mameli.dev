// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import vercel from '@astrojs/vercel';

import { SITE_TITLE } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
  site: SITE_TITLE,
  integrations: [mdx(), sitemap()],

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