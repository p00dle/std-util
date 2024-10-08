import { describe, expect, test } from 'vitest';
import { isNumber } from './isNumber';

describe('isNumber', () => {
  test('returns true for integers and floats, 0, both positive and negative', () => {
    expect(isNumber(5)).toBe(true);
    expect(isNumber(5.21)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(-5)).toBe(true);
    expect(isNumber(-5.21)).toBe(true);
  });
  test('returns false for NaN', () => {
    expect(isNumber(Number.NaN)).toBe(false);
  });
  test('returns false for anything that is not a number', () => {
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber('string')).toBe(false);
    expect(isNumber(true)).toBe(false);
  });
});
