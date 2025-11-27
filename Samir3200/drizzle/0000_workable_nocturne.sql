CREATE TABLE "Ada" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentProjectName" text NOT NULL,
	"DateCreat" text NOT NULL
);

CREATE TABLE "Promo" (
	"id" serial PRIMARY KEY NOT NULL,
	"nomPromo" text NOT NULL,
	"dateStart" date NOT NULL
);

CREATE TABLE "studentProject" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"GithubLink" text NOT NULL,
	"DemoLink" text NOT NULL,
	"PublicDate" text NOT NULL,
	"Ada_id" integer,
	"Promo_id" integer
);

ALTER TABLE "studentProject" ADD CONSTRAINT "studentProject_Ada_id_Ada_id_fk" FOREIGN KEY ("Ada_id") REFERENCES "public"."Ada"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "studentProject" ADD CONSTRAINT "studentProject_Promo_id_Promo_id_fk" FOREIGN KEY ("Promo_id") REFERENCES "public"."Promo"("id") ON DELETE no action ON UPDATE no action;