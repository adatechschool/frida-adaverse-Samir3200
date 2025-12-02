-- Seed pour la table des promotions
INSERT INTO promos (name, start_date) VALUES
  ('Frida', '2024-09-01'),
  ('Ada', '2023-09-01');

-- Seed pour la table des projets Ada
INSERT INTO "adaProjects" (name) VALUES
  ('Adaopte'),
  ('Ada Quiz'),
  ('Ada Check Events');

-- Seed pour la table des projets étudiants
INSERT INTO "studentProjects" (
  title, image, slug, github_url, demo_url, created_at, published_at, promo_id, ada_project_id
) VALUES
  ('Projet Adaopte', NULL, 'projet-adaopte', 'https://github.com/demo/adaopte', 'https://adaopte.vercel.app', '2025-11-01', '2025-11-10', 1, 1),
  ('Projet Quiz', NULL, 'projet-quiz', 'https://github.com/demo/quiz', NULL, '2025-10-15', NULL, 2, 2),
  ('Projet Check Events', NULL, 'projet-check-events', 'https://github.com/demo/checkevents', 'https://checkevents.vercel.app', '2025-09-20', '2025-09-25', 1, 3);
