// creation de table Promo avec neon
"use server";
import { neon } from '@neondatabase/serverless';

export default async function PromoTable() {
  async function create(formData: FormData) {

    const sql = neon(process.env.DATA_URL!);
    await sql`CREATE TABLE IF NOT EXISTS Promo (
      id serial PRIMARY KEY,
      nomPromo text NOT NULL,
      dateStart date NOT NULL
    )`;
    const nomPromo = formData.get("nomPromo") as string;
    const dateStart = formData.get("dateStart") as string;
    await sql`INSERT INTO Promo (nomPromo, dateStart) VALUES (${nomPromo}, ${dateStart})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="Nom de la promo" name="namePromo" required />
      <input type="date" placeholder="Date de début" name="dateStart" required />
      <button type="submit">Ajouter la promo</button>
    </form>
  );
}

// fin creation de table Promo avec neon