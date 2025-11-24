// creation de table Promo avec neon
import { neon } from '@neondatabase/serverless';

export default async function PromoTable() {
  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL as string);
    await sql`CREATE TABLE IF NOT EXISTS Promo (Promo TEXT)`;
    const promos = formData.get("Promos");
    await sql`INSERT INTO (Promos) VALUES (${promos})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="Table Promos" name="promos" />
      <button type="submit">Submit</button>
    </form>
  );
}

// fin creation de table Promo avec neon