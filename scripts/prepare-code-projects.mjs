import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { unzipSync } from 'fflate';

const rootDir = process.cwd();
const archiveDir = path.resolve(rootDir, process.env.CODE_PROJECT_ARCHIVE_DIR || 'src/code-project-archives');
const outputDir = path.resolve(rootDir, process.env.CODE_PROJECT_OUTPUT_DIR || 'public/code-projects');

const MAX_ARCHIVE_SIZE = 20 * 1024 * 1024;
const MAX_ENTRY_SIZE = 2 * 1024 * 1024;
const MAX_TOTAL_SIZE = 30 * 1024 * 1024;
const MAX_ARCHIVE_ENTRIES = 2_000;
const MAX_PUBLISHED_FILES = 500;

const ignoredDirectories = new Set([
  '.astro',
  '.git',
  '.hg',
  '.idea',
  '.next',
  '.nuxt',
  '.svn',
  '.vscode',
  '.wrangler',
  '__pycache__',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'target',
  'venv',
]);

const binaryExtensions = new Set([
  '.7z', '.a', '.avi', '.bin', '.bmp', '.class', '.db', '.dll', '.dmg', '.doc', '.docx',
  '.eot', '.exe', '.gif', '.gz', '.ico', '.jar', '.jpeg', '.jpg', '.lockb', '.mov', '.mp3',
  '.mp4', '.o', '.obj', '.otf', '.pdf', '.png', '.pyc', '.rar', '.so', '.sqlite', '.tar',
  '.tif', '.tiff', '.ttf', '.wav', '.webm', '.webp', '.woff', '.woff2', '.xls', '.xlsx', '.zip',
]);

const languageByExtension = new Map([
  ['.astro', 'html'], ['.bash', 'shell'], ['.c', 'c'], ['.cc', 'cpp'], ['.cpp', 'cpp'],
  ['.cs', 'csharp'], ['.css', 'css'], ['.csv', 'plaintext'], ['.cxx', 'cpp'], ['.dockerfile', 'dockerfile'],
  ['.go', 'go'], ['.h', 'c'], ['.hpp', 'cpp'], ['.htm', 'html'], ['.html', 'html'], ['.ini', 'ini'],
  ['.java', 'java'], ['.js', 'javascript'], ['.json', 'json'], ['.jsx', 'javascript'], ['.kt', 'kotlin'],
  ['.less', 'less'], ['.lua', 'lua'], ['.md', 'markdown'], ['.mjs', 'javascript'], ['.php', 'php'],
  ['.ps1', 'powershell'], ['.py', 'python'], ['.r', 'r'], ['.rb', 'ruby'], ['.rs', 'rust'],
  ['.scss', 'scss'], ['.sh', 'shell'], ['.sql', 'sql'], ['.svelte', 'html'], ['.swift', 'swift'],
  ['.toml', 'ini'], ['.ts', 'typescript'], ['.tsx', 'typescript'], ['.txt', 'plaintext'],
  ['.vue', 'html'], ['.xml', 'xml'], ['.yaml', 'yaml'], ['.yml', 'yaml'], ['.zig', 'zig'],
]);

function normalizeProjectId(archivePath) {
  const fileName = path.basename(archivePath, path.extname(archivePath));
  return fileName
    .normalize('NFKC')
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-')
    .replace(/[. ]+$/g, '')
    .trim() || 'code-project';
}

function normalizeArchivePath(value) {
  const normalized = value.replaceAll('\\', '/');
  if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) {
    throw new Error(`ZIP 中包含绝对路径：${value}`);
  }

  const segments = normalized.split('/').filter(Boolean);
  if (segments.some((segment) => segment === '..')) {
    throw new Error(`ZIP 中包含路径穿越：${value}`);
  }

  return segments.join('/');
}

function isSensitivePath(filePath) {
  const baseName = path.posix.basename(filePath).toLowerCase();
  return (
    baseName === '.env' ||
    baseName.startsWith('.env.') ||
    baseName === 'credentials.json' ||
    baseName === 'id_rsa' ||
    baseName === 'id_ed25519' ||
    baseName.startsWith('secret.') ||
    /\.(key|p12|pfx|pem)$/i.test(baseName)
  );
}

function shouldIgnorePath(filePath) {
  return filePath
    .split('/')
    .slice(0, -1)
    .some((segment) => ignoredDirectories.has(segment.toLowerCase()));
}

function stripSharedRoot(filePaths) {
  const splitPaths = filePaths.map((filePath) => filePath.split('/'));
  if (splitPaths.length === 0 || splitPaths.some((segments) => segments.length < 2)) return filePaths;

  const firstSegment = splitPaths[0][0];
  if (!splitPaths.every((segments) => segments[0] === firstSegment)) return filePaths;
  return splitPaths.map((segments) => segments.slice(1).join('/'));
}

function isTextFile(filePath, data) {
  if (binaryExtensions.has(path.posix.extname(filePath).toLowerCase())) return false;
  const sample = data.subarray(0, Math.min(data.length, 8_192));
  if (sample.includes(0)) return false;

  try {
    new TextDecoder('utf-8', { fatal: true }).decode(sample);
    return true;
  } catch {
    return false;
  }
}

function getLanguage(filePath) {
  const baseName = path.posix.basename(filePath).toLowerCase();
  if (baseName === 'dockerfile' || baseName.startsWith('dockerfile.')) return 'dockerfile';
  if (baseName === 'makefile') return 'plaintext';
  return languageByExtension.get(path.posix.extname(baseName)) ?? 'plaintext';
}

async function findZipArchives(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const archives = [];

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        archives.push(...await findZipArchives(entryPath));
      } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.zip') {
        archives.push(entryPath);
      }
    }

    return archives;
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

async function prepareArchive(archivePath) {
  const archiveStats = await stat(archivePath);
  if (archiveStats.size > MAX_ARCHIVE_SIZE) {
    throw new Error(`${path.basename(archivePath)} 超过 20 MB 限制`);
  }

  const archiveData = new Uint8Array(await readFile(archivePath));
  let archiveEntryCount = 0;
  let publishedFileCount = 0;
  let totalSize = 0;

  const extracted = unzipSync(archiveData, {
    filter(info) {
      archiveEntryCount += 1;
      if (archiveEntryCount > MAX_ARCHIVE_ENTRIES) {
        throw new Error(`${path.basename(archivePath)} 的 ZIP 条目过多`);
      }

      const normalizedPath = normalizeArchivePath(info.name);
      if (!normalizedPath || info.name.replaceAll('\\', '/').endsWith('/')) return false;
      if (shouldIgnorePath(normalizedPath)) return false;
      if (isSensitivePath(normalizedPath)) {
        throw new Error(`${path.basename(archivePath)} 包含敏感文件：${normalizedPath}`);
      }
      if (info.originalSize > MAX_ENTRY_SIZE) {
        throw new Error(`${normalizedPath} 超过单文件 2 MB 限制`);
      }

      publishedFileCount += 1;
      totalSize += info.originalSize;
      if (publishedFileCount > MAX_PUBLISHED_FILES) {
        throw new Error(`${path.basename(archivePath)} 可发布文件超过 500 个`);
      }
      if (totalSize > MAX_TOTAL_SIZE) {
        throw new Error(`${path.basename(archivePath)} 解压后超过 30 MB 限制`);
      }
      return true;
    },
  });

  const rawPaths = Object.keys(extracted).map(normalizeArchivePath);
  const displayPaths = stripSharedRoot(rawPaths);
  const projectId = normalizeProjectId(archivePath);
  const projectOutputDir = path.join(outputDir, projectId);
  const filesOutputDir = path.join(projectOutputDir, 'files');
  await mkdir(filesOutputDir, { recursive: true });

  const files = [];
  const decoder = new TextDecoder('utf-8');

  for (let index = 0; index < rawPaths.length; index += 1) {
    const rawPath = rawPaths[index];
    const displayPath = displayPaths[index];
    const data = extracted[Object.keys(extracted)[index]];
    const previewable = isTextFile(displayPath, data);
    const source = previewable ? `files/${String(index).padStart(4, '0')}.txt` : null;

    if (previewable && source) {
      await writeFile(path.join(projectOutputDir, source), decoder.decode(data), 'utf8');
    }

    files.push({
      path: displayPath,
      name: path.posix.basename(displayPath),
      size: data.length,
      language: previewable ? getLanguage(displayPath) : 'plaintext',
      previewable,
      source,
    });
  }

  files.sort((a, b) => a.path.localeCompare(b.path, 'zh-CN'));
  const manifest = {
    version: 1,
    id: projectId,
    archive: path.relative(rootDir, archivePath).replaceAll('\\', '/'),
    files,
  };

  await writeFile(
    path.join(projectOutputDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  return manifest;
}

async function main() {
  if (!outputDir.startsWith(`${rootDir}${path.sep}`) || path.basename(outputDir) !== 'code-projects') {
    throw new Error('拒绝清理预期目录之外的路径');
  }

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const archives = await findZipArchives(archiveDir);
  const manifests = [];
  for (const archivePath of archives) {
    manifests.push(await prepareArchive(archivePath));
  }

  await writeFile(
    path.join(outputDir, 'index.json'),
    `${JSON.stringify({ version: 1, projects: manifests.map(({ id, archive }) => ({ id, archive })) }, null, 2)}\n`,
    'utf8',
  );

  console.log(`Prepared ${manifests.length} code project(s).`);
}

main().catch((error) => {
  console.error(`Code project preparation failed: ${error.message}`);
  process.exitCode = 1;
});
