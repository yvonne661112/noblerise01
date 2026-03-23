// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://noblerise.com.tw',
	base: '/noblerise01/',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
});
