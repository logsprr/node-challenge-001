import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../../.env' });

export default {
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: ((process.env.DB_PORT as unknown) as number) || 5432,
  },
  pool: {
    min: 2,
    max: 10,
  },
};
