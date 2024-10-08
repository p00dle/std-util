export function deepCopy<T>(obj: T): T;
export function deepCopy(obj: unknown): unknown {
  if (typeof obj === 'object') {
    if (obj === null) return obj;
    if (Array.isArray(obj)) return obj.map((x) => deepCopy(x));
    const output: Record<string, unknown> = {};
    for (const prop in obj) output[prop] = deepCopy((obj as Record<string, unknown>)[prop]);
    return output;
  }
  return obj;
}
