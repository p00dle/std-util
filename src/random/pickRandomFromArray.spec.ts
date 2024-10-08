import { describe, expect, test } from 'vitest';
import { pickRandomFromArray } from './pickRandomFromArray';

describe('pickRandomFromArray', () => {
  test('always returns a random element from the array', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const results = new Array(100).fill(null).map(() => pickRandomFromArray(arr));
    expect(results.every((result) => arr.includes(result))).toBe(true);
  });
  test('throws when given not an array or empty array', () => {
    // @ts-expect-error
    expect(() => pickRandomFromArray(null)).toThrow();
    expect(() => pickRandomFromArray([])).toThrow();
  });
});
