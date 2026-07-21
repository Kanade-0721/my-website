const cPreprocessorDirective = /^\s*#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|line|pragma)\b/i;

export function isCommentLine(line) {
  const value = String(line ?? '');
  if (cPreprocessorDirective.test(value)) return false;

  return (
    /^\s*#/.test(value) ||
    /^\s*\/\//.test(value) ||
    /^\s*--/.test(value) ||
    /^\s*\/\*.*\*\/\s*$/.test(value)
  );
}

export function stripLeadingCommentLine(code) {
  const value = String(code ?? '').replace(/^\uFEFF/, '');
  const firstLineEnd = value.search(/\r?\n/);
  const firstLine = firstLineEnd === -1 ? value : value.slice(0, firstLineEnd);

  if (!isCommentLine(firstLine)) return value;
  if (firstLineEnd === -1) return '';

  const newlineLength = value[firstLineEnd] === '\r' ? 2 : 1;
  return value.slice(firstLineEnd + newlineLength);
}
