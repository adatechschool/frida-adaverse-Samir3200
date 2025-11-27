// creation de table ada avec neon
"use server";

import { neon } from '@neondatabase/serverless';

export default async function AdaTable() {
  async function create(formData: FormData) {

    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS Ada (Ada TEXT)`;
    const ada = formData.get("Ada");
    await sql`INSERT INTO Ada VALUES (${ada})`;
  }
}
// fin creation de table ada avec neon
