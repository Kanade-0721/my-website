import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['src/content'];
const extensions = new Set(['.md', '.mdx']);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
      continue;
    }

    if ([...extensions].some((extension) => entry.name.endsWith(extension))) {
      files.push(path);
    }
  }

  return files;
}

function normalizeContent(content) {
  return content
    .replaceAll('public\\uploads\\', '/uploads/')
    .replaceAll('public/uploads/', '/uploads/')
    .replace(/(?<![\w/.-])uploads\//g, '/uploads/');
}

for (const root of roots) {
  const files = await collectFiles(root);

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const normalized = normalizeContent(content);
    if (content !== normalized) {
      await writeFile(file, normalized, 'utf8');
    }
  }
}
