import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/umami',
  // schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.UMAMI_DATABASE_URL!,
  },
  strict: true,
  tablesFilter: ['event_data','website_event', 'website'],

});
