-- Seed promos
INSERT INTO promos (name, start_date) VALUES
  ('Frida', '2024-09-01'),
  ('Ada Lovelace', '2023-09-01');

-- Seed projets Ada
INSERT INTO adaProjects (name) VALUES
  ('Ada Quiz'),
  ('Adaopte'),
  ('Ada Check Events');

-- Exemple de seed pour un projet étudiant publié
INSERT INTO studentProjects (
  title, image, slug, github_url, demo_url, created_at, published_at, promo_id, ada_project_id
) VALUES (
  'Super Quiz',
  'https://example.com/image.png',
  'super-quiz',
  'https://github.com/user/super-quiz',
  'https://superquiz.vercel.app',
  '2025-11-01',
  '2025-11-10',
  1, -- promo_id (Frida)
  1  -- ada_project_id (Ada Quiz)
);

-- Exemple de seed pour un projet étudiant non publié
INSERT INTO studentProjects (
  title, image, slug, github_url, demo_url, created_at, published_at, promo_id, ada_project_id
) VALUES (
  'Projet Non Publié',
  'https://example.com/default.png',
  'projet-non-publie',
  'https://github.com/user/projet-non-publie',
  'https://demo.vercel.app',
  '2025-11-05',
  NULL,
  2, -- promo_id (Ada Lovelace)
  2  -- ada_project_id (Adaopte)
);
