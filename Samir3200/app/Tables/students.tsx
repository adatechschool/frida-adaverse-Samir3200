// creation de table Students avec neon
import { neon } from '@neondatabase/serverless';

export default async function StudentTable() {
  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL as string);
    await sql`CREATE TABLE IF NOT EXISTS Sudents (Students TEXT)`;
    const students = formData.get("Promos");
    await sql`INSERT INTO (students) VALUES (${students})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="Table students" name="studentss" />
      <button type="submit">Submit</button>
    </form>
  );
}

// fin creation de table Students avec neon