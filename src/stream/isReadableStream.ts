import { Readable } from 'node:stream';

export function isReadableStream(val: unknown): val is Readable {
  if (val instanceof Readable) return true;
  return typeof val === 'object' && val !== null && 'pipe' in val && typeof val.pipe === 'function';
}
