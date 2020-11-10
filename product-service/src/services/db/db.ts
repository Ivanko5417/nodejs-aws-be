import { Client, ClientConfig, QueryConfig, QueryResult } from 'pg';
import { config } from '../../config';
import { CONNECTION_TIMEOUT_MS } from '../../constants';
import { QueryBuilder } from '../../types';

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
  await client.end();
  return result.rows;
}

export async function performQueryWithTransaction(queriesBuilders: (QueryBuilder | QueryConfig)[]): Promise<any[]> {
  const client = new Client(options)
  await client.connect();
  try {
    await client.query('BEGIN');
    const results = [];
    for (const queryBuilder of queriesBuilders) {
      let query: QueryConfig = null;
      if (typeof queryBuilder === 'function') {
        query = await queryBuilder(results);
      } else {
        query = queryBuilder
      }
      const { rows: result } = await client.query(query);
      results.push(result);
    }
    await client.query('COMMIT');
    await client.end();
    return results;
  } catch (err) {
    await client.query('ROLLBACK');
    await client.end();
    throw err;
  }

}
