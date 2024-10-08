import { describe, expect, test } from 'vitest';
import { isString } from './isString';

describe('isString', () => {
  test('returns true when given a string', () => expect(isString('a')).toBe(true));
  test('returns true when given an empty string', () => expect(isString('')).toBe(true));
  test('returns false when given not a string', () => expect(isString(null)).toBe(false));
});
