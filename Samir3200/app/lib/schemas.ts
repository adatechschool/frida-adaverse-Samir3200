import { pgTable, serial, text, date, integer } from "drizzle-orm/pg-core";


export const Ada = pgTable("Ada", {
    id: serial("id").primaryKey(),
    studentProjectName: text("studentProjectName").notNull(),
    dateCreat: text("DateCreat").notNull(),

});


export const Promo = pgTable("Promo", {
    id: serial("id").primaryKey(),
    nomPromo: text("nomPromo").notNull(),
    dateStart: date("dateStart").notNull(),
});


export const studentProject = pgTable(
    "studentProject",
    {
        id: integer("id").primaryKey(),
        title: text("title").notNull(),
        image: text("image").notNull(),
        GithubLink: text("GithubLink").notNull(),
        DemoLink: text("DemoLink").notNull(),
        PublicDate: text("PublicDate").notNull(),
        Ada_id: integer("Ada_id").references(() => Ada.id),
        Promo_id: integer("Promo_id").references(() => Promo.id),
        
    })
