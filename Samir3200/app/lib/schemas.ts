import { pgTable, serial, text, date, integer, varchar } from 'drizzle-orm/pg-core';

// Table des projets Ada
export const adaProjects = pgTable('adaProjects', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
});

// Table des promotions
export const promos = pgTable('promos', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    dateStart: date('date_start').notNull(),
});

// Table des projets étudiants
export const studentProjects = pgTable('studentProjects', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 150 }).notNull(),
    slug: varchar('slug', { length: 100 }),
    githubUrl: text('github_url').notNull(),
    demoUrl: text('demo_url'),
    createdAt: date('created_at').notNull(),
    publishedAt: date('published_at'), // null tant que non publié
    promoId: integer('promo_id').references(() => promos.id),
    adaProjectId: integer('ada_project_id').references(() => adaProjects.id),
});
