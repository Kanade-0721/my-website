// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const getClassNames = (node) => {
  const className = node.properties?.className;
  if (Array.isArray(className)) return className.map(String);
  return typeof className === 'string' ? className.split(/\s+/) : [];
};

const mathJaxDisplayPlugin = {
  name: 'mathjax-display-math',
  element: {
    filter: ['pre'],
    visit(node, context) {
      const code = node.children?.find(
        (child) => child.type === 'element' && child.tagName === 'code',
      );
      if (!code || !getClassNames(code).includes('math-display')) return;

      return {
        type: 'text',
        value: `\\[\n${context.textContent(code)}\n\\]`,
      };
    },
  },
};

const mathJaxInlinePlugin = {
  name: 'mathjax-inline-math',
  element: {
    filter: ['code'],
    visit(node, context) {
      if (!getClassNames(node).includes('math-inline')) return;

      return {
        type: 'text',
        value: `\\(${context.textContent(node)}\\)`,
      };
    },
  },
};

const typoraHighlightPlugin = {
  name: 'typora-highlight',
  text(node, context) {
    const parent = context.parent(node);
    if (
      parent?.type === 'element'
      && ['code', 'pre', 'script', 'style'].includes(parent.tagName)
    ) {
      return;
    }

    const pattern = /(?<![=])==([^=\n]+)==(?![=])/g;
    const matches = [...node.value.matchAll(pattern)];
    if (matches.length === 0) return;

    const replacements = [];
    let cursor = 0;

    for (const match of matches) {
      const index = match.index ?? 0;
      if (index > cursor) {
        replacements.push({ type: 'text', value: node.value.slice(cursor, index) });
      }
      replacements.push({
        type: 'element',
        tagName: 'mark',
        properties: {},
        children: [{ type: 'text', value: match[1] }],
      });
      cursor = index + match[0].length;
    }

    if (cursor < node.value.length) {
      replacements.push({ type: 'text', value: node.value.slice(cursor) });
    }

    context.insertBefore(node, replacements);
    context.removeNode(node);
  },
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      // Satteri exposes display math as an unlabelled code node before the
      // compatibility plugin restores MathJax delimiters.
      excludeLangs: ['math', 'plaintext'],
    },
    processor: satteri({
      hastPlugins: [mathJaxDisplayPlugin, mathJaxInlinePlugin, typoraHighlightPlugin],
      features: {
        gfm: {
          footnotes: {
            label: '脚注',
            backContent: '↩',
            backLabel: '返回引用 {reference}',
          },
        },
        math: true,
        headingAttributes: true,
        superscript: true,
        subscript: true,
        smartPunctuation: true,
      },
    }),
  },
});
