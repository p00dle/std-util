import { describe, expect, test } from 'vitest';
import { chunks } from './chunks';

describe('chunks', () => {
  test('returns empty array when given an empty array', () => {
    expect(chunks(8, [])).toEqual([]);
  });

  test('returns an array of length 1 when chunkSize is larger than array length', () => {
    expect(chunks(5, [1, 2])).toEqual([[1, 2]]);
  });

  test('returns a smaller last chunk if array length is not divisible by chunkSize', () => {
    expect(chunks(2, [1, 2, 3])).toEqual([[1, 2], [3]]);
  });

  test('returns chunks of same length when array length is divible by chunkSize', () => {
    expect(chunks(2, [1, 2, 3, 4])).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
