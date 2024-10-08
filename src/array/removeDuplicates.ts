export function removeDuplicates<T, I = never>(arr: T[], getIdentity?: (x: T) => I): T[] {
  if (!getIdentity) return Array.from(new Set(arr));
  const map = new Map<I, T>();
  for (const val of arr) {
    map.set(getIdentity(val), val);
  }
  return Array.from(map.values());
}
