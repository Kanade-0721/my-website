import assert from 'node:assert/strict';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { strToU8, zipSync } from 'fflate';

const rootDir = process.cwd();
const testRoot = path.join(rootDir, `.tmp-code-project-test-${process.pid}`);
const archiveDir = path.join(testRoot, 'archives');
const outputDir = path.join(testRoot, 'code-projects');

function runPrepare() {
  return spawnSync(process.execPath, ['scripts/prepare-code-projects.mjs'], {
    cwd: rootDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      CODE_PROJECT_ARCHIVE_DIR: path.relative(rootDir, archiveDir),
      CODE_PROJECT_OUTPUT_DIR: path.relative(rootDir, outputDir),
    },
  });
}

try {
  await mkdir(archiveDir, { recursive: true });
  const archive = zipSync({
    'demo/': new Uint8Array(),
    'demo/main.py': strToU8('print("hello")\n'),
    'demo/src/utils.js': strToU8('export const answer = 42;\n'),
    'demo/assets/logo.png': new Uint8Array([0, 1, 2, 3]),
    'demo/node_modules/ignored.js': strToU8('throw new Error("ignored");\n'),
  });
  await writeFile(path.join(archiveDir, 'demo.zip'), archive);

  const success = runPrepare();
  assert.equal(success.status, 0, success.stderr || success.stdout);

  const manifest = JSON.parse(await readFile(path.join(outputDir, 'demo', 'manifest.json'), 'utf8'));
  assert.deepEqual(manifest.files.map((file) => file.path), [
    'assets/logo.png',
    'main.py',
    'src/utils.js',
  ]);
  assert.equal(manifest.files.find((file) => file.path === 'main.py').language, 'python');
  assert.equal(manifest.files.find((file) => file.path === 'assets/logo.png').previewable, false);

  const unsafeArchive = zipSync({
    'unsafe/main.py': strToU8('print("unsafe")\n'),
    'unsafe/.env': strToU8('TOKEN=do-not-publish\n'),
  });
  await writeFile(path.join(archiveDir, 'unsafe.zip'), unsafeArchive);

  const failure = runPrepare();
  assert.notEqual(failure.status, 0, '包含 .env 的代码包应当被拒绝');
  assert.match(`${failure.stderr}${failure.stdout}`, /敏感文件/);

  console.log('Code project preparation tests passed.');
} finally {
  if (testRoot.startsWith(`${rootDir}${path.sep}`)) {
    await rm(testRoot, { recursive: true, force: true });
  }
}
