
// creation de table frida avec neon
import { neon } from '@neondatabase/serverless';

export default async function FridaTable() {
  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL as string);
    await sql`CREATE TABLE IF NOT EXISTS Frida (Frida TEXT)`;
    const frida = formData.get("Frida");
    await sql`INSERT INTO (Frida) VALUES (${frida})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="Table name" name="Table" />
      <button type="submit">Submit</button>
    </form>
  );
}

// fin creation de table frida avec neon