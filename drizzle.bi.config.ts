import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/bi',
  schema: './src/db/bi/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.BI_DATABASE_URL!,
  },
  strict: true,
  tablesFilter: ["UserLoginInfo", "UserSignUpInfo"],
});
