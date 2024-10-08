export function isPositiveInteger(n: unknown): n is number {
  return typeof n === 'number' && !Number.isNaN(n) && (n | 0) === n && n > 0;
}
