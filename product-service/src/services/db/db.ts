import { Client, ClientConfig, QueryConfig, QueryResult } from 'pg';
import { config } from '../../config';
import { CONNECTION_TIMEOUT_MS } from '../../constants';

const options: ClientConfig = {
  ...config.db,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
};

export async function performQuery<T>(query: QueryConfig | string): Promise<T[]> {
  const client = new Client(options)
  await client.connect();
  const result: QueryResult<T> = await client.query<T>(query);
  return result.rows;
}
