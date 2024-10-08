import { isNonEmptyArray } from '../array/isNonEmptyArray';
import { randomInteger } from './randomInteger';

export function pickRandomFromArray<T>(arr: T[]): T {
  if (!isNonEmptyArray(arr)) throw new TypeError('Expected non empty array');
  return arr[randomInteger(0, arr.length)];
}
