"use client";
import Link from "next/link";
import { useState, useEffect } from "react";



interface StudentProject {
  id: number;
  title: string;
  image?: string;
  slug: string;
  githubUrl: string;
  demoUrl: string;
  createdAt: string;
  publishedAt?: string;
  promoId: number;
  adaProjectId: number;
  // Optionnel: à enrichir côté API si besoin
  promoName?: string;
  adaProjectName?: string;
}

export default function Home() {
// ...existing code...

  const [studentProjects, setStudentProjects] = useState<StudentProject[]>([]);

  useEffect(() => {
    fetch("/api/studentProject")
      .then((res) => res.json())
      .then((data) => {
        // Ne garder que les projets publiés (publishedAt non null)
        const published = data.filter((p: StudentProject) => p.publishedAt);
        // Trier par date de publication décroissante
        published.sort((a: StudentProject, b: StudentProject) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
        setStudentProjects(published);
      });
  }, []);

  return (
    <>
      <h1 className="home-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Liste des projets ADA publiés</h1>
      <div className="home-container">
        <ul className="project-list">
          {studentProjects.map((project) => (
            <li key={project.id}>
              <Link href={`/studentProject/${project.slug}`} className="project-link">{project.title}</Link>
              <p className="project-date">Publié le : {project.publishedAt}</p>
              <p className="project-date">Créé le : {project.createdAt}</p>
              <p className="project-links">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-item">Lien démo : {project.demoUrl}</a>
                {" | "}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-item">GitHub</a>
              </p>
              <p className="namePromo-ada-id">Promo ID : {project.promoId}</p>
              <p className="project-promo-id">Projet Ada ID : {project.adaProjectId}</p>
              <img src={project.image || "/image/default.png"} alt={project.title} style={{ maxWidth: 200, margin: '1rem 0' }} />
              <hr className="project-hr" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}


