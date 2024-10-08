type R<P> = P extends Promise<infer T> ? T : P;

export async function asyncRun<P, T1, T2, T3, T4, T5, T6, T7, T8, T9, O>(
  p: P,
  ...f: [
    (a: R<P>) => T1,
    (a: R<T1>) => T2,
    (a: R<T2>) => T3,
    (a: R<T3>) => T4,
    (a: R<T4>) => T5,
    (a: R<T5>) => T6,
    (a: R<T6>) => T7,
    (a: R<T7>) => T8,
    (a: R<T8>) => T9,
    (a: R<T9>) => O,
  ]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, T4, T5, T6, T7, T8, O>(
  p: P,
  ...f: [
    (a: R<P>) => T1,
    (a: R<T1>) => T2,
    (a: R<T2>) => T3,
    (a: R<T3>) => T4,
    (a: R<T4>) => T5,
    (a: R<T5>) => T6,
    (a: R<T6>) => T7,
    (a: R<T7>) => T8,
    (a: R<T8>) => O,
  ]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, T4, T5, T6, T7, O>(
  p: P,
  ...f: [
    (a: R<P>) => T1,
    (a: R<T1>) => T2,
    (a: R<T2>) => T3,
    (a: R<T3>) => T4,
    (a: R<T4>) => T5,
    (a: R<T5>) => T6,
    (a: R<T6>) => T7,
    (a: R<T7>) => O,
  ]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, T4, T5, T6, O>(
  p: P,
  ...f: [(a: R<P>) => T1, (a: R<T1>) => T2, (a: R<T2>) => T3, (a: R<T3>) => T4, (a: R<T4>) => T5, (a: R<T5>) => T6, (a: R<T6>) => O]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, T4, T5, O>(
  p: P,
  ...f: [(a: R<P>) => T1, (a: R<T1>) => T2, (a: R<T2>) => T3, (a: R<T3>) => T4, (a: R<T4>) => T5, (a: R<T5>) => O]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, T4, O>(
  p: P,
  ...f: [(a: R<P>) => T1, (a: R<T1>) => T2, (a: R<T2>) => T3, (a: R<T3>) => T4, (a: R<T4>) => O]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, T3, O>(
  p: P,
  ...f: [(a: R<P>) => T1, (a: R<T1>) => T2, (a: R<T2>) => T3, (a: R<T3>) => O]
): Promise<R<O>>;
export async function asyncRun<P, T1, T2, O>(p: P, ...f: [(a: R<P>) => T1, (a: R<T1>) => T2, (a: R<T2>) => O]): Promise<R<O>>;
export async function asyncRun<P, T1, O>(p: P, ...f: [(a: R<P>) => T1, (a: R<T1>) => O]): Promise<R<O>>;
export async function asyncRun<P, O>(promise: P, ...f: [(a: R<P>) => O]): Promise<R<O>>;
export async function asyncRun<P>(p: P): Promise<R<P>>;
export async function asyncRun(promise: Promise<unknown>, ...fns: ((a: unknown) => unknown)[]): Promise<unknown> {
  let result = await promise;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}
