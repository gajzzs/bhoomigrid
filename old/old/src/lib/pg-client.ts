// Server-side PostgreSQL + PostGIS Connection Pool
import { Pool } from 'pg';

let pgPool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    });
  } catch (err) {
    console.warn('PostgreSQL connection pool initialization failed:', err);
  }
}

export { pgPool };
