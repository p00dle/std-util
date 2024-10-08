export function chunks<T>(chunkSize: number, arr: T[]): T[][] {
  return new Array(Math.ceil(arr.length / chunkSize))
    .fill(0)
    .map((_, i) => [i * chunkSize, (i + 1) * chunkSize])
    .map(([start, end]) => arr.slice(start, end));
}
