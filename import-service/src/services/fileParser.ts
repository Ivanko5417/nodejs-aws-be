import csvParser from 'csv-parser';
import ReadableStream = NodeJS.ReadableStream;

export async function parseFile(stream: ReadableStream, onDataCb: (data: any) => void) {
  for await (const dataRow of stream.pipe(csvParser())) {
    await onDataCb(dataRow);
  }
}
