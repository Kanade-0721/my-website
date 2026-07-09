import { spawnSync } from 'node:child_process';

run('git', ['add', '.']);

const hasStagedChanges = git(['diff', '--cached', '--quiet']).status !== 0;
if (hasStagedChanges) {
  run('git', ['commit', '-m', 'new oj']);
} else {
  console.log('No changes to commit.');
}

run('git', ['push']);

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    console.error(`Failed to run: ${command} ${args.join(' ')}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

function git(args) {
  const result = spawnSync('git', args, {
    stdio: 'ignore',
    shell: false,
  });

  if (result.error) {
    console.error(`Failed to run: git ${args.join(' ')}`);
    console.error(result.error.message);
    process.exit(1);
  }

  return result;
}
