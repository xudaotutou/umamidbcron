// import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
export const db = drizzle({
  connection: process.env.UMAMI_DATABASE_URL!,
});
