import { spawnSync } from 'node:child_process';

const remote = process.env.SYNC_REMOTE || 'KanadeWeb';
const branch = process.env.SYNC_BRANCH || 'main';
const message = process.argv.slice(2).join(' ').trim() || `Update site ${formatDateTime(new Date())}`;

run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build']);

const hasChanges = git(['status', '--porcelain']).stdout.trim().length > 0;
if (hasChanges) {
  run('git', ['add', '.']);
  run('git', ['commit', '-m', message]);
} else {
  console.log('没有检测到需要提交的本地改动。');
}

run('git', ['pull', '--rebase', remote, branch]);
run('git', ['push', remote, branch]);

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function git(args) {
  const result = spawnSync('git', args, {
    encoding: 'utf8',
    shell: false,
  });

  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result;
}

function formatDateTime(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
