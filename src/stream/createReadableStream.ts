import { Readable } from 'node:stream';
import { isReadableStream } from './isReadableStream';

export function createReadableStream(data: string | Buffer | Uint8Array | Readable, chunkSize = 10000): Readable {
  if (isReadableStream(data)) {
    return data;
  }
  let start = 0;
  return new Readable({
    read() {
      if (start >= data.length) {
        this.push(null);
      } else {
        this.push(data.slice(start, start + chunkSize));
        start += chunkSize;
      }
    },
  });
}
