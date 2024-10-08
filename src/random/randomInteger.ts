export function randomInteger(from: number, to: number, includeTo = false): number {
  const delta = to - from - (includeTo ? 0 : 1);
  return Math.round(Math.random() * delta + from);
}
