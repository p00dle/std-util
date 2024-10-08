export function randomFloat(from: number, to: number): number {
  const delta = to - from;
  return Math.random() * delta + from;
}
