// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const BASE = '/';

/** Remark plugin: 將 Markdown 內嵌圖片與內部連結的 / 開頭路徑補上 base path */
function remarkFixImageBase() {
  return (tree) => {
    const visit = (node) => {
      if ((node.type === 'image' || node.type === 'link') && node.url?.startsWith('/')) {
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
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/dev/') && !page.includes('/page/') })],
  markdown: {
    remarkPlugins: [remarkFixImageBase],
  },
});
