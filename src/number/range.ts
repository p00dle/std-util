export function range(from: number, to: number, includeTo = false): number[] {
  return new Array(to - from + (includeTo ? 1 : 0)).fill(0).map((_, i) => from + i);
}
