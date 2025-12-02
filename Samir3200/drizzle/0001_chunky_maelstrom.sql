ALTER TABLE "studentProjects" DROP CONSTRAINT "studentProjects_slug_unique";
ALTER TABLE "studentProjects" ALTER COLUMN "demo_url" DROP NOT NULL;