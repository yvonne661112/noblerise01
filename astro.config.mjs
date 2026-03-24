// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const BASE = '/noblerise01/';

/** Remark plugin: 將 Markdown 內嵌圖片的 /images/ 路徑補上 base path */
function remarkFixImageBase() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'image' && node.url?.startsWith('/')) {
        node.url = BASE + node.url.slice(1);
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://noblerise.com.tw',
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkFixImageBase],
  },
});
