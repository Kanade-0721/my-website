// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            label: '脚注',
            backContent: '↩',
            backLabel: '返回引用 {reference}',
          },
        },
        headingAttributes: true,
        superscript: true,
        subscript: true,
        smartPunctuation: true,
      },
    }),
  },
});
