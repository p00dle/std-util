export function split<T>(arr: T[], predicate: (val: T) => boolean): [T[], T[]] {
  const matched: T[] = [];
  const unmatched: T[] = [];
  for (const val of arr) {
    if (predicate(val)) matched.push(val);
    else unmatched.push(val);
  }
  return [matched, unmatched];
}
