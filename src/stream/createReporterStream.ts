import { Duplex } from 'node:stream';

export function createReporterStream(onDataChunk: (size: number) => unknown): Duplex {
  return new Duplex({
    write(chunk, encoding, done) {
      onDataChunk(Buffer.byteLength(chunk));
      this.push(chunk, encoding);
      done();
    },
  });
}
