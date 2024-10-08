export type StringCase = 'kebab' | 'pascal' | 'camel' | 'snake' | 'title' | 'lower' | 'upper' | 'unknown';

export function detectStringCase(str: string): StringCase {
  const hasUnderscore = /_/.test(str);
  const hasUppercase = /[A-Z]/.test(str);
  if (hasUnderscore) {
    if (hasUppercase) return 'unknown'; // both underscore and uppercase character found in a string
    return 'snake';
  }
  const hasHyphen = /-/.test(str);
  if (hasHyphen) {
    if (hasUppercase) return 'unknown'; // both hyphen and uppercase character found in a string
    return 'kebab';
  }
  const hasSpace = / /.test(str);
  if (hasSpace) {
    if (!hasUppercase) return 'lower';
    const hasLowerCase = /[a-z]/.test(str);
    if (hasLowerCase) {
      const hasUpperCaseFollowingLower = /[a-z][A-Z]/.test(str);
      if (hasUpperCaseFollowingLower) return 'unknown'; // uppercase character after lowercase
      const isFirstCharUpper = /^[A-Z]/.test(str);
      if (!isFirstCharUpper) return 'unknown'; // title case mixed with lower'
      const hasLowerCharacterFollowingSpace = / [a-z]/.test(str);
      if (hasLowerCharacterFollowingSpace) return 'unknown'; // title case mixed with lower
      return 'title';
    }
    return 'upper';
  }

  const hasLowerCase = /[a-z]/.test(str);
  if (hasUppercase) {
    if (hasLowerCase) {
      const isFirstCharUpper = /^[A-Z]/.test(str);
      return isFirstCharUpper ? 'pascal' : 'camel';
    }
    return 'upper';
  }
  return 'lower';
}

function toLowercase(str: string): string {
  return str.toLowerCase();
}

function toTitleCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function toUpperCase(str: string): string {
  return str.toUpperCase();
}

function getCamelChunks(str: string): string[] {
  const indexes = [0, ...(Array.from(str.matchAll(/[A-Z]/g)).map((match) => match.index) as number[]), str.length];
  const stopAt = indexes.length - 1;
  const output: string[] = [];
  for (let i = 0; i < stopAt; i++) {
    output.push(str.slice(indexes[i], indexes[i + 1]));
  }
  return output;
}

function getPascalChunks(str: string): string[] {
  const indexes = [...(Array.from(str.matchAll(/[A-Z]/g)).map((match) => match.index) as number[]), str.length];
  const stopAt = indexes.length - 1;
  const output: string[] = [];
  for (let i = 0; i < stopAt; i++) {
    output.push(str.slice(indexes[i], indexes[i + 1]));
  }
  return output;
}

function getStringChunks(str: string, inputCase: StringCase): string[] {
  switch (inputCase) {
    case 'camel':
      return getCamelChunks(str).map(toLowercase);
    case 'kebab':
      return str.split('-');
    case 'lower':
      return str.split(' ');
    case 'pascal':
      return getPascalChunks(str).map(toLowercase);
    case 'snake':
      return str.split('_');
    case 'title':
      return str.split(' ').map(toLowercase);
    case 'upper':
      return str.split(' ').map(toLowercase);
    default:
      throw new Error(`Invalid inputCase: ${inputCase}`);
  }
}

function formatCase(chunks: string[], outputCase: StringCase): string {
  switch (outputCase) {
    case 'camel':
      return chunks[0] + chunks.slice(1).map(toTitleCase).join('');
    case 'kebab':
      return chunks.join('-');
    case 'lower':
      return chunks.join(' ');
    case 'pascal':
      return chunks.map(toTitleCase).join('');
    case 'snake':
      return chunks.join('_');
    case 'title':
      return chunks.map(toTitleCase).join(' ');
    case 'upper':
      return chunks.map(toUpperCase).join(' ');
    default:
      throw new Error(`Invalid inputCase: ${outputCase}`);
  }
}

export function convertCase(inputCase: StringCase | 'unknown', outputCase: StringCase, str: string): string {
  if (typeof str !== 'string' || str.length === 0) return '';
  const fromCase = inputCase === 'unknown' ? detectStringCase(str) : inputCase;
  const chunks = getStringChunks(str, fromCase);
  return formatCase(chunks, outputCase);
}
