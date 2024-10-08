type AnyFunction = (...args: unknown[]) => unknown;

export interface BenchmarkOptions<T extends AnyFunction> {
  description: string;
  descriptionPadding?: number;
  fn: T;
  getArgs?: () => Parameters<T>;
  secondsPerTest?: number;
  logResults?: boolean;
}

function getOpsPerSec<T extends AnyFunction>(fn: T, getArgs: () => Parameters<T>, iterations: number): number {
  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    fn.apply(null, getArgs());
  }
  const endTime = Date.now();
  const elapsedTimeMilliseconds = endTime - startTime;
  return iterations / (elapsedTimeMilliseconds / 1000);
}

export function logBenchmarkResult(padding: number, description: string, opsPerSecond: number) {
  console.info(`${description.padEnd(padding, ' ')}${opsPerSecond.toFixed(2)} ops/sec`);
}

function getAproximateIterationsPerSec<T extends AnyFunction>(fn: T, getArgs: () => Parameters<T>): number {
  const endTime = Date.now() + 1000;
  let iterationsPerSec = 0;
  while (Date.now() < endTime) {
    fn.apply(null, getArgs());
    iterationsPerSec++;
  }
  return iterationsPerSec;
}

export function benchmark<T extends AnyFunction>(options: BenchmarkOptions<T>): number {
  const fn = options.fn;
  const getArgs = options.getArgs ?? (Math.random as unknown as () => Parameters<T>);
  const secondsPerTest = options.secondsPerTest ? options.secondsPerTest - 1 : 4;
  const logResults = options.logResults ?? true;
  const description = options.description;
  const descriptionPadding = options.descriptionPadding ?? 0;

  const iterations = getAproximateIterationsPerSec(fn, getArgs) * secondsPerTest;
  const opsPerSec = getOpsPerSec(fn, getArgs, iterations);
  if (logResults) logBenchmarkResult(descriptionPadding, description, opsPerSec);
  return opsPerSec;
}
