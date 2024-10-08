import { describe, expect, test } from 'vitest';
import { isNonEmptyString } from './isNonEmptyString';

describe('isNonEmptyString', () => {
  test('returns true when string has at least 1 length', () => expect(isNonEmptyString('a')).toBe(true));
  test('returns false when string is empty', () => expect(isNonEmptyString('')).toBe(false));
  test('returns false when given not a string', () => expect(isNonEmptyString(null)).toBe(false));
});
