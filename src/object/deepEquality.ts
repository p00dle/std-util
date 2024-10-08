export function deepEquality<T = unknown>(obj1: T, obj2: T): boolean {
  const type1 = typeof obj1;
  const type2 = typeof obj2;
  if (type1 !== type2) return false;
  if (type1 === 'object') {
    if (obj1 === null) return obj2 === null;
    if (Array.isArray(obj1)) {
      return obj1.every((val, i) => deepEquality(val, (obj2 as unknown[])[i]));
    }
    for (const prop in obj1) {
      if (!deepEquality<unknown>(obj1[prop], obj2[prop as unknown as keyof T])) return false;
    }
    return true;
  }
  return obj1 === obj2;
}
