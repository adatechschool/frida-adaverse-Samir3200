import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/lib/schemas.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_yQ29nCdhEKes@ep-solitary-pond-agp789v7-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});
