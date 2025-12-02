CREATE TABLE "adaProjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"date_start" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "studentProjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"image" text,
	"slug" varchar(100),
	"github_url" text NOT NULL,
	"demo_url" text,
	"created_at" date NOT NULL,
	"published_at" date,
	"promo_id" integer,
	"ada_project_id" integer,
	CONSTRAINT "studentProjects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "studentProjects" ADD CONSTRAINT "studentProjects_promo_id_promos_id_fk" FOREIGN KEY ("promo_id") REFERENCES "public"."promos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "studentProjects" ADD CONSTRAINT "studentProjects_ada_project_id_adaProjects_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."adaProjects"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "studentProjects" DROP CONSTRAINT IF EXISTS "studentProjects_slug_unique";