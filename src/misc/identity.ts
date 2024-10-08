export function identity<T, R = T>(val: T): R {
  return val as unknown as R;
}
