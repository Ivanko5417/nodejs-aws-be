import { QueryConfig } from 'pg';

export type QueryBuilder = (prevValues: any[]) => QueryConfig;
