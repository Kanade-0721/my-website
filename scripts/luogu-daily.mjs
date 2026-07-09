import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const BLOG_DIR = resolve('src/content/blog');
const TABLE_START = '<!-- LUOGU_DAILY_TABLE_START -->';
const TABLE_END = '<!-- LUOGU_DAILY_TABLE_END -->';
const ENTRIES_START = '<!-- LUOGU_DAILY_ENTRIES_START -->';
const ENTRIES_END = '<!-- LUOGU_DAILY_ENTRIES_END -->';
const ITEM_PREFIX = '<!-- LUOGU_DAILY_ITEM ';
const ITEM_SUFFIX = ' -->';

const args = parseArgs(process.argv.slice(2));
const isInteractive = Object.keys(args).length === 0 || args.interactive === 'true';
const today = args.date ?? formatDate(new Date());
const nowMinute = formatDateTime(new Date());
const filePath = resolve(BLOG_DIR, `${today}-luogu-daily.md`);

const rl = createInterface({ input, output });

try {
  const item = await collectItem(args, rl);
  if (!item.problemId || !item.title) {
    console.log('已取消：题号和题目标题不能为空。');
    process.exitCode = 1;
  } else {
    upsertDailyPost(item);
    console.log(`已更新：${filePath}`);
  }
} finally {
  rl.close();
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) continue;

    const [rawKey, rawValue] = arg.slice(2).split('=', 2);
    const key = toCamelCase(rawKey);
    const value = rawValue ?? argv[index + 1];

    if (rawValue === undefined) index += 1;
    parsed[key] = value ?? '';
  }

  return parsed;
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

async function collectItem(values, reader) {
  const problemId = normalizeProblemId(
    values.problem ?? values.problemId ?? (isInteractive ? await ask(reader, '题号，例如 P1001：') : ''),
  );
  const existingItem = findExistingItem(problemId);
  const url = values.url ?? `https://www.luogu.com.cn/problem/${problemId}`;
  const problem = await fetchProblem(problemId, url);
  const manualTitle = values.title?.trim();
  const title =
    manualTitle ||
    problem.title ||
    existingItem?.title ||
    (isInteractive ? await ask(reader, '未能自动读取题目，请手动输入题目标题：') : '');
  const statement =
    values.statement ||
    readTextFile(values.statementFile) ||
    problem.statement ||
    existingItem?.statement ||
    '';
  const status = values.status ?? (isInteractive ? await ask(reader, '状态，默认 AC：', 'AC') : 'AC');
  const language = values.language ?? (isInteractive ? await ask(reader, '语言，默认 Python：', 'Python') : 'Python');
  const tags = splitTags(values.tags ?? (isInteractive ? await ask(reader, '标签，用逗号分隔，可留空：') : ''));
  const finalTags = tags.length > 0 ? tags : problem.tags.length > 0 ? problem.tags : existingItem?.tags ?? [];
  const idea = values.idea ?? (isInteractive ? await ask(reader, '解题思路，可留空：', existingItem?.idea ?? '') : existingItem?.idea ?? '');
  const review = values.review ?? (isInteractive ? await ask(reader, '复盘/易错点，可留空：') : existingItem?.review ?? '');
  const codeFile = values.codeFile ?? (isInteractive ? await ask(reader, '代码文件路径，可留空：') : '');
  const code = values.code ?? readTextFile(codeFile) ?? existingItem?.code ?? '';

  return {
    problemId,
    title: title.trim(),
    status: status.trim() || 'AC',
    language: language.trim() || 'Python',
    tags: finalTags,
    url: url.trim() || `https://www.luogu.com.cn/problem/${problemId}`,
    statement: statement.trim(),
    idea: idea.trim(),
    review: review.trim(),
    code: code.trim(),
  };
}

function findExistingItem(problemId) {
  if (!problemId || !existsSync(filePath)) return null;
  const items = readItems(readFileSync(filePath, 'utf8'));
  return items.find((item) => item.problemId === problemId) ?? null;
}

async function fetchProblem(problemId, url) {
  if (!problemId || !url) return { title: '', statement: '', tags: [] };

  try {
    const contentOnlyProblem = await fetchContentOnlyProblem(url);
    if (contentOnlyProblem) {
      const title = cleanupProblemTitle(contentOnlyProblem.title ?? '', problemId);
      const statement = buildProblemStatement(contentOnlyProblem);
      const tags = extractTagsFromProblemObject(contentOnlyProblem);
      if (title && statement && tags.length > 0) return { title, statement, tags };
    }

    const response = await fetch(url, { headers: getRequestHeaders(url) });
    if (!response.ok) return { title: '', statement: '', tags: [] };

    const html = await response.text();
    const injectedData = parseLuoguInjection(html);
    const problem = findProblemObject(injectedData);
    const rawTitle = problem?.title ?? matchHtmlTitle(html) ?? matchHeadingTitle(html) ?? '';
    const title = cleanupProblemTitle(rawTitle, problemId);
    const statement =
      (problem ? buildProblemStatement(problem) : '') ||
      extractStatementByXPath(html) ||
      extractStatementFromHtml(html);
    const objectTags = extractTagsFromProblemObject(problem);
    const tags = objectTags.length > 0 ? objectTags : extractTagsByXPath(html);

    return { title, statement, tags };
  } catch {
    return { title: '', statement: '', tags: [] };
  }
}

function extractTagsFromProblemObject(problem) {
  if (!problem || typeof problem !== 'object') return [];
  const candidates = [
    problem.tags,
    problem.labels,
    problem.keywords,
    problem.difficultyTags,
    problem.problemTags,
  ];

  for (const candidate of candidates) {
    const tags = normalizeTags(candidate);
    if (tags.length > 0) return tags;
  }

  return [];
}

function normalizeTags(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') return item.name ?? item.title ?? item.label ?? item.content ?? '';
        return '';
      })
      .map(cleanTagText)
      .filter(Boolean);
  }

  if (typeof value === 'string') return splitTags(value);
  return [];
}

async function fetchContentOnlyProblem(url) {
  try {
    const contentOnlyUrl = withContentOnlyQuery(url);
    const response = await fetch(contentOnlyUrl, { headers: getRequestHeaders(url, true) });
    if (!response.ok) return null;

    const text = await response.text();
    const data = parseJson(text) ?? parseLuoguInjection(text);
    return data?.currentData?.problem ?? data?.problem ?? data?.data?.problem ?? findProblemObject(data);
  } catch {
    return null;
  }
}

function withContentOnlyQuery(url) {
  const target = new URL(url);
  target.searchParams.set('_contentOnly', '1');
  return target.toString();
}

function getRequestHeaders(referer, contentOnly = false) {
  return {
    'user-agent': 'Kanade personal website Luogu daily note generator',
    accept: 'application/json,text/html;q=0.9,*/*;q=0.8',
    referer,
    ...(contentOnly ? { 'x-luogu-type': 'content-only' } : {}),
  };
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function parseLuoguInjection(html) {
  const match =
    html.match(/window\._feInjection\s*=\s*JSON\.parse\(decodeURIComponent\("([\s\S]*?)"\)\)/) ??
    html.match(/decodeURIComponent\("([\s\S]*?)"\)/);

  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function findProblemObject(value) {
  if (!value || typeof value !== 'object') return null;

  if (
    typeof value.title === 'string' &&
    (typeof value.description === 'string' ||
      typeof value.background === 'string' ||
      typeof value.inputFormat === 'string' ||
      typeof value.outputFormat === 'string' ||
      typeof value.content === 'string' ||
      typeof value.statement === 'string' ||
      Array.isArray(value.samples))
  ) {
    return value;
  }

  for (const child of Object.values(value)) {
    const found = findProblemObject(child);
    if (found) return found;
  }

  return null;
}

function buildProblemStatement(problem) {
  const sections = [];
  pushSection(sections, '题面', problem.statement, 4);
  pushSection(sections, '题面', problem.content, 4);
  pushSection(sections, '题目背景', problem.background, 4);
  pushSection(sections, '题目描述', problem.description, 4);
  pushSection(sections, '输入格式', problem.inputFormat, 4);
  pushSection(sections, '输出格式', problem.outputFormat, 4);

  if (Array.isArray(problem.samples) && problem.samples.length > 0) {
    const samples = problem.samples
      .map((sample, index) => {
        const inputText = Array.isArray(sample) ? sample[0] : sample.input;
        const outputText = Array.isArray(sample) ? sample[1] : sample.output;
        return `#### 样例 ${index + 1}\n\n输入：\n\n\`\`\`text\n${inputText ?? ''}\n\`\`\`\n\n输出：\n\n\`\`\`text\n${outputText ?? ''}\n\`\`\``;
      })
      .join('\n\n');
    sections.push(`#### 样例\n\n${samples}`);
  }

  pushSection(sections, '说明/提示', problem.hint, 4);
  return sections.join('\n\n').trim();
}

function extractStatementByXPath(html) {
  const nodeHtml = extractInnerHtmlByPath(html, [
    ['html', 1],
    ['body', 1],
    ['div', 1],
    ['div', 4],
    ['main', 1],
    ['div', 1],
    ['div', 1],
    ['div', 1],
    ['div', 2],
  ]);

  return nodeHtml ? htmlToMarkdown(nodeHtml) : '';
}

function extractTagsByXPath(html) {
  const nodeHtml = extractInnerHtmlByPath(html, [
    ['html', 1],
    ['body', 1],
    ['div', 1],
    ['div', 4],
    ['main', 1],
    ['div', 1],
    ['div', 1],
    ['div', 1],
    ['div', 1],
    ['div', 2],
    ['h3', 1],
  ]);

  return extractTagsFromHtml(nodeHtml);
}

function extractTagsFromHtml(html) {
  const text = decodeHtml(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(span|a|div|button)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
  const cleaned = text
    .replace(/^(标签|题目标签|算法标签|Tags?)[:：]?\s*/i, '')
    .replace(/暂无标签/g, '')
    .trim();

  return splitTags(cleaned)
    .flatMap((tag) => tag.split(/\s{2,}|\s+\/\s+|、/))
    .map(cleanTagText)
    .filter(Boolean);
}

function cleanTagText(value) {
  return String(value ?? '')
    .replace(/^#+/, '')
    .replace(/[，,、;；|]+$/g, '')
    .trim();
}

function extractInnerHtmlByPath(html, path) {
  const tree = parseHtmlTree(html);
  let current = tree;

  for (const [tag, index] of path) {
    const matches = current.children.filter((child) => child.tag === tag);
    current = matches[index - 1];
    if (!current) return '';
  }

  return html.slice(current.startEnd, current.endStart);
}

function parseHtmlTree(html) {
  const root = { tag: '#document', children: [], startEnd: 0, endStart: html.length };
  const stack = [root];
  const tokenPattern = /<!--[\s\S]*?-->|<!doctype[\s\S]*?>|<\/?([a-zA-Z][\w:-]*)(?:\s[^<>]*)?>/gi;
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  let match;

  while ((match = tokenPattern.exec(html))) {
    const token = match[0];
    const tag = match[1]?.toLowerCase();
    if (!tag || token.startsWith('<!--') || /^<!doctype/i.test(token)) continue;

    if (token.startsWith('</')) {
      for (let index = stack.length - 1; index > 0; index -= 1) {
        if (stack[index].tag === tag) {
          const node = stack[index];
          node.endStart = match.index;
          node.endEnd = tokenPattern.lastIndex;
          stack.length = index;
          break;
        }
      }
      continue;
    }

    const node = {
      tag,
      children: [],
      start: match.index,
      startEnd: tokenPattern.lastIndex,
      endStart: tokenPattern.lastIndex,
      endEnd: tokenPattern.lastIndex,
    };
    stack[stack.length - 1].children.push(node);

    const selfClosing = token.endsWith('/>') || voidTags.has(tag);
    if (!selfClosing) stack.push(node);
  }

  for (const node of stack) {
    node.endStart = node.endStart ?? html.length;
    node.endEnd = node.endEnd ?? html.length;
  }

  return root;
}

function extractStatementFromHtml(html) {
  const sections = [];
  const headings = [
    '题目背景',
    '题目描述',
    '输入格式',
    '输出格式',
    '样例',
    '样例输入',
    '样例输出',
    '说明',
    '提示',
    '说明/提示',
  ];

  for (const heading of headings) {
    const content = extractSectionAfterHeading(html, heading);
    pushSection(sections, heading, content, 4);
  }

  return dedupeSections(sections).join('\n\n').trim();
}

function extractSectionAfterHeading(html, heading) {
  const escapedHeading = escapeRegExp(heading);
  const pattern = new RegExp(`<h2[^>]*>\\s*${escapedHeading}\\s*<\\/h2>([\\s\\S]*?)(?=<h2[^>]*>|<\\/main>|$)`, 'i');
  const match = html.match(pattern);
  if (!match) return '';

  return htmlToMarkdown(match[1]);
}

function htmlToMarkdown(html) {
  const markdown = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, text) => `\n\n### ${decodeHtml(stripTags(text)).trim()}\n\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, text) => `\n\n#### ${decodeHtml(stripTags(text)).trim()}\n\n`)
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, text) => `\n\n##### ${decodeHtml(stripTags(text)).trim()}\n\n`)
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => `\n\n\`\`\`text\n${decodeHtml(code).trim()}\n\`\`\`\n\n`)
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => `\n\n\`\`\`text\n${decodeHtml(code).trim()}\n\`\`\`\n\n`)
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?ul[^>]*>/gi, '\n')
    .replace(/<\/?ol[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '');

  return normalizeMarkdownSpacing(decodeHtml(markdown));
}

function stripTags(value) {
  return String(value ?? '').replace(/<[^>]+>/g, '');
}

function normalizeMarkdownSpacing(value) {
  return value
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/([^\n])(\n?#{3,6}\s+)/g, '$1\n\n$2')
    .replace(/([^\n])(\n?-\s+)/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeStatementMarkdown(value) {
  return normalizeMarkdownSpacing(value).replace(
    /^### (题面|题目背景|题目描述|输入格式|输出格式|样例|样例输入|样例输出|说明|提示|说明\/提示)$/gm,
    '#### $1',
  );
}

function dedupeSections(sections) {
  const seen = new Set();
  return sections.filter((section) => {
    const key = section.replace(/^###\s+/, '').trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pushSection(sections, title, content, level = 3) {
  const text = String(content ?? '').trim();
  if (text) sections.push(`${'#'.repeat(level)} ${title}\n\n${text}`);
}

function matchHtmlTitle(html) {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/is);
  return match ? decodeHtml(match[1]) : null;
}

function matchHeadingTitle(html) {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  return match ? decodeHtml(match[1].replace(/<[^>]*>/g, '')) : null;
}

function cleanupProblemTitle(value, problemId) {
  return value
    .replace(/\s+-\s+洛谷.*$/i, '')
    .replace(new RegExp(`^${escapeRegExp(problemId)}\\s*`, 'i'), '')
    .trim();
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function ask(reader, question, fallback = '') {
  const suffix = fallback ? ` (${fallback})` : '';
  const answer = await reader.question(`${question}${suffix} `);
  return answer.trim() || fallback;
}

function normalizeProblemId(value) {
  return String(value ?? '').trim().toUpperCase();
}

function splitTags(value) {
  return String(value ?? '')
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function readTextFile(filePath) {
  const target = stripWrappingQuotes(String(filePath ?? '').trim());
  if (!target) return null;

  try {
    return readFileSync(resolve(target), 'utf8');
  } catch {
    console.log(`未能读取文件：${target}，本次会先留空。`);
    return null;
  }
}

function stripWrappingQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
}

function upsertDailyPost(item) {
  const existing = existsSync(filePath) ? readFileSync(filePath, 'utf8') : createDailyPost();
  const items = [...readItems(existing), item];
  const dedupedItems = dedupeItems(items);
  const body = replaceSection(existing, TABLE_START, TABLE_END, buildTableSection(dedupedItems));
  const nextBody = replaceSection(body, ENTRIES_START, ENTRIES_END, buildEntriesSection(dedupedItems));
  const countedBody = nextBody.replace(/今天记录了 \d+ 道题。/, `今天记录了 ${dedupedItems.length} 道题。`);

  writeFileSync(filePath, countedBody, 'utf8');
}

function createDailyPost() {
  return `---
title: "${today} 洛谷刷题记录"
description: "记录 ${today} 在洛谷完成的刷题内容、解题思路与复盘。"
date: ${nowMinute}
published: true
tags:
  - 洛谷刷题
  - 洛谷
  - 算法
media:
  images: []
  videos: []
  audios: []
---

## 今日概览

今天记录了 0 道题。

${TABLE_START}
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
${TABLE_END}

## 刷题记录

${ENTRIES_START}
${ENTRIES_END}
`;
}

function readItems(content) {
  const pattern = new RegExp(`${escapeRegExp(ITEM_PREFIX)}(.*?)${escapeRegExp(ITEM_SUFFIX)}`, 'g');
  const items = [];
  let match;

  while ((match = pattern.exec(content))) {
    try {
      const item = JSON.parse(match[1]);
      if (item.statementBase64) {
        item.statement = Buffer.from(item.statementBase64, 'base64').toString('utf8');
        delete item.statementBase64;
      }
      if (!item.statement) {
        item.statement = extractExistingStatement(content, item.problemId);
      }
      items.push(item);
    } catch {
      // Ignore old or manually edited metadata comments.
    }
  }

  return items;
}

function extractExistingStatement(content, problemId) {
  const start = content.indexOf(`### ${problemId} `);
  if (start === -1) return '';

  const next = content.indexOf('\n<!-- LUOGU_DAILY_ITEM ', start + 1);
  const section = content.slice(start, next === -1 ? content.indexOf(ENTRIES_END, start) : next);
  const statementStart = section.indexOf('### 题目原文');
  if (statementStart === -1) return '';

  const bodyStart = section.indexOf('\n', statementStart);
  const ideaStart = section.indexOf('\n### 思路', bodyStart);
  if (bodyStart === -1 || ideaStart === -1) return '';

  const statement = section.slice(bodyStart, ideaStart).trim();
  return statement === '这次暂时没有读取到题目原文。' ? '' : statement;
}

function dedupeItems(items) {
  const byProblem = new Map();
  for (const item of items) {
    byProblem.set(item.problemId, item);
  }
  return Array.from(byProblem.values());
}

function replaceSection(content, start, end, replacement) {
  const startIndex = content.indexOf(start);
  const endIndex = content.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return `${content.trim()}\n\n${replacement}\n`;
  }

  return `${content.slice(0, startIndex)}${replacement}${content.slice(endIndex + end.length)}`;
}

function buildTableSection(items) {
  const rows = items.map((item) => {
    const tags = item.tags?.length ? item.tags.join('、') : '-';
    return `| ${escapeTable(item.problemId)} | [${escapeTable(item.title)}](${item.url}) | ${escapeTable(item.status)} | ${escapeTable(item.language)} | ${escapeTable(tags)} |`;
  });

  return `${TABLE_START}
| 题号 | 题目 | 状态 | 语言 | 标签 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}
${TABLE_END}`;
}

function buildEntriesSection(items) {
  const entries = items.map((item) => {
    const tags = item.tags?.length ? `\n- 标签：${item.tags.join('、')}` : '';
    const statementBlock = item.statement
      ? `\n\n### 题目原文\n\n${normalizeStatementMarkdown(item.statement)}`
      : '\n\n### 题目原文\n\n这次暂时没有读取到题目原文。';
    const codeBlock = item.code
      ? `\n\n### 代码\n\n\`\`\`${languageFence(item.language)}\n${item.code}\n\`\`\``
      : '\n\n### 代码\n\n这次暂时没有记录代码。';
    const review = item.review ? `\n\n### 复盘\n\n${item.review}` : '';

    return `${buildItemComment(item)}
### ${item.problemId} ${item.title}

- 题目：[${item.title}](${item.url})
- 状态：${item.status}
- 语言：${item.language}${tags}${statementBlock}

### 思路

${item.idea || '这次暂时没有记录思路。'}${codeBlock}${review}`;
  });

  return `${ENTRIES_START}
${entries.join('\n\n')}
${ENTRIES_END}`;
}

function buildItemComment(item) {
  const metadata = { ...item };
  if (metadata.statement) {
    metadata.statementBase64 = Buffer.from(metadata.statement, 'utf8').toString('base64');
    delete metadata.statement;
  }

  return `${ITEM_PREFIX}${JSON.stringify(metadata)}${ITEM_SUFFIX}`;
}

function escapeTable(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function languageFence(language) {
  const value = String(language ?? '').toLowerCase();
  if (value.includes('c++') || value.includes('cpp')) return 'cpp';
  if (value.includes('python')) return 'python';
  if (value.includes('java')) return 'java';
  if (value.includes('javascript') || value.includes('js')) return 'js';
  return '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${formatDate(date)} ${hours}:${minutes}`;
}
