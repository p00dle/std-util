import { describe, expect, test } from 'vitest';
import { asyncRun } from './asyncRun';

describe('asyncRun', () => {
  test('resolves a promise and returns its value', async () => {
    const asyncFn = async () => 123;
    const result = await asyncRun(asyncFn());
    expect(result).toBe(123);
  });
  test('resolved a promise and passes its value to the next non-async function', async () => {
    const asyncFn = async () => 123;
    const result = await asyncRun(asyncFn(), (n) => n + 123);
    expect(result).toBe(246);
  });
  test('resolved a promise and passes its value to the next async function', async () => {
    const asyncFn = async () => 123;
    const result = await asyncRun(asyncFn(), async (n) => n + 123);
    expect(result).toBe(246);
  });
  test('resolved a promise and passes its value to the next any function', async () => {
    const asyncFn = async () => 0;
    const asyncIncrement = async (n: number) => n + 1;
    const increment = (n: number) => n + 1;
    const result = await asyncRun(asyncFn(), asyncIncrement, increment, asyncIncrement, increment, asyncIncrement, increment);
    expect(result).toBe(6);
  });
});
