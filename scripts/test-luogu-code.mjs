import assert from 'node:assert/strict';
import { isCommentLine, stripLeadingCommentLine } from './lib/luogu-code.mjs';

assert.equal(stripLeadingCommentLine('#P1001\nprint("answer")\n'), 'print("answer")\n');
assert.equal(stripLeadingCommentLine('  # P1001\r\nprint("answer")\r\n'), 'print("answer")\r\n');
assert.equal(stripLeadingCommentLine('// P1001\nint main() {}\n'), 'int main() {}\n');
assert.equal(stripLeadingCommentLine('-- P1001\nprint("answer")\n'), 'print("answer")\n');
assert.equal(stripLeadingCommentLine('/* P1001 */\nint main() {}\n'), 'int main() {}\n');
assert.equal(stripLeadingCommentLine('print("first line")\nprint("second line")\n'), 'print("first line")\nprint("second line")\n');
assert.equal(stripLeadingCommentLine('#include <iostream>\nint main() {}\n'), '#include <iostream>\nint main() {}\n');
assert.equal(stripLeadingCommentLine('#define MOD 1000000007\nint main() {}\n'), '#define MOD 1000000007\nint main() {}\n');
assert.equal(stripLeadingCommentLine('\uFEFF#P1001\nprint("answer")\n'), 'print("answer")\n');
assert.equal(stripLeadingCommentLine('#P1001'), '');
assert.equal(isCommentLine('body { color: red; }'), false);

console.log('Luogu code header tests passed.');
