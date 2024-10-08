export function isNonEmptyString(s: unknown): s is string {
  return typeof s === 'string' && s.length > 0;
}
