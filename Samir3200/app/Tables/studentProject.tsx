// creation de table Students avec neon
"use server"

import { neon } from '@neondatabase/serverless';
import { studentProject } from '../lib/schemas';

export default async function StudentTable() {
  async function create(formData: FormData) {

    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS SudentProject (StudentProject TEXT)`;
    const studentProject = formData.get("Promos");
    await sql`INSERT INTO (studentProject) VALUES (${studentProject})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="Table studentProject" name="studentProject" />
      <button type="submit">Submit</button>
    </form>
  );
}
// fin creation de table Students avec neon
