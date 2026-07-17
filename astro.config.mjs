// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';
import remarkCjkFriendly from 'remark-cjk-friendly/parseOnly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough/parseOnly';
import remarkFlexibleMarkers from 'remark-flexible-markers';
import remarkMath from 'remark-math-extended';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [
        remarkMath,
        remarkBreaks,
        remarkCjkFriendly,
        remarkCjkFriendlyGfmStrikethrough,
        remarkFlexibleMarkers,
      ],
      rehypePlugins: [
        [rehypeKatex, { strict: false }],
      ],
    }),
  },
});
