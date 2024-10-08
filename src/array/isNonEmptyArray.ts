export function isNonEmptyArray(arr: unknown): arr is unknown[] {
  return Array.isArray(arr) && arr.length > 0;
}
