// https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs

export const pressAnyKeyToContinue = async () => {
  process.stdin.setRawMode(true);
  return new Promise<void>((resolve) =>
    process.stdin.once('data', (data) => {
      const byteArray = Array.from(data);
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log('^C');
        process.exit(1);
      }
      process.stdin.setRawMode(false);
      resolve();
    }),
  );
};
