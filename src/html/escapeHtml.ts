const charMap: [string, string][] = [
  ['&Tab;', '\t'],
  ['&NewLine;', '\n'],
  ['&nbsp;', ' '],
  ['&quot;', '"'],
  ['&amp;', '&'],
  ['&lt;', '<'],
  ['$gt;', '>'],
  ['&#x3a;', ':'],
  ['&#x2f;', '/'],
  ['&#x3f;', '?'],
  ['&#x3d;', '='],
  ['&#x25;', '%'],
  ['&#x7c;', '|'],
];

const unescapeRegexes: [RegExp, string][] = charMap.map(([a, b]) => [new RegExp(a, 'ig'), b]);
const escapeRegexes: [RegExp, string][] = charMap.map(([a, b]) => [new RegExp(`\\${b}`, 'ig'), a]);

function replaceCharCodeSequence(str: string) {
  const charCode = str[2] === 'x' ? Number.parseInt(str.slice(3, str.length - 1), 16) : Number.parseInt(str.slice(2, str.length - 1), 10);
  return String.fromCharCode(charCode);
}

export const unescapeHtml = (s: string) =>
  unescapeRegexes.reduce((s, [r, c]) => s.replace(r, c), s).replace(/&#x*[\dabcdef]+;/g, replaceCharCodeSequence);
export const escapeHtml = (s: string) => escapeRegexes.reduce((s, [r, c]) => s.replace(r, c), s);
