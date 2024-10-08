export function isInteger(n: unknown): n is number {
  return typeof n === 'number' && !Number.isNaN(n) && (n | 0) === n;
}
