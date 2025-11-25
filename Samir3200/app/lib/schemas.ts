import { pgTable, serial, text, date } from "drizzle-orm/pg-core";



export const Frida = pgTable("Frida", {
    id: serial("id").primaryKey(),
    nomProjet: text("nomProjet").notNull(),
});


export const Promo = pgTable("Promo", {
    id: serial("id").primaryKey(),
    nomPromo: text("nomPromo").notNull(),
    dateStart: date("dateStart").notNull()
});


export const studentProject = pgTable("studentProject", {
    id: serial("id").primaryKey(),
    title: text("text").notNull(),
    image: text("image").notNull(),
    PersonnalLink: text("PersonnalLink").notNull(),
    DemoLink: text("Demolink").notNull(),
    DateCreat: text("DateCreat").notNull(),
    PublicDate: text("PublicDate").notNull(),
    Frida_id: serial("Frida_id").notNull(),
    Promo_id: serial("Promo_id").notNull()
});
