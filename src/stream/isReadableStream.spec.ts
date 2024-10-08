import { describe, expect, it } from 'vitest';
import { isReadableStream } from './isReadableStream';
import { Duplex, Readable, Writable } from 'node:stream';

describe('isReadableStream', () => {
  it('returns true for instance of Readable', () => expect(isReadableStream(new Readable())).toBe(true));
  it('returns true for instance of Duplex', () => expect(isReadableStream(new Duplex())).toBe(true));
  it('returns true for an object with pipe method', () => expect(isReadableStream({ pipe: () => null })).toBe(true));
  it('returns false for everything else', () => {
    expect(
      [isReadableStream(null), isReadableStream({}), isReadableStream(undefined), isReadableStream(''), isReadableStream(new Date())].every(
        (result) => result === false,
      ),
    ).toBe(true);
  });
});
