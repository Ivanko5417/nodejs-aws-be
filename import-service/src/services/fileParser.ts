import csvParser from 'csv-parser';
import ReadableStream = NodeJS.ReadableStream;

export function parseFile(stream: ReadableStream) {
  return new Promise((resolve, reject) => stream
    .pipe(csvParser())
    .on('data', console.log)
    .on('error', reject)
    .on('end', resolve)
  );
}
