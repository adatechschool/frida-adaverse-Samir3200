"use client";
import Link from "next/link";
import { useState, useEffect } from "react";



interface StudentProject {
  id: number;
  title: string;
  image: string;
  PersonnalLink: string;
  DemoLink: string;
  DateCreat: string;
  PublicDate: string;
  ada_id: number;
  Promo_id: number;
  namePromo?: string;
  cityPromo?: string;
}

export default function Home() {
// ...existing code...

  const [studentProjects, setStudentProjects] = useState<StudentProject[]>([]);

  useEffect(() => {
    fetch("/api/studentProject")
      .then((res) => res.json())
      .then((data) => setStudentProjects(data));
  }, []);

  return (
    <>
      <h1 className="home-title" style={{ textAlign: 'center', marginTop: '2rem' }}>Liste des projets ADA</h1>
      <div className="home-container">
        <ul className="project-list">
          {studentProjects.map((Project) => (
          <li key={Project.id}>
            {Project.title === "Tataouine" ? (
              <a href={Project.PersonnalLink} target="_blank" rel="noopener noreferrer" className="project-link">{Project.title}</a>
            ) : (
              <Link href={`/studentProject/${Project.id}`} className="project-link">{Project.title}</Link>
            )}
            <p className="project-date">Publié le : {Project.PublicDate}</p>
            <p className="project-date">Créé le : {Project.DateCreat}</p>
            <p className="project-links">
              <a href={Project.DemoLink} target="_blank" rel="noopener noreferrer" className="project-link-item">Lien démo : {Project.DemoLink}</a>
            </p>
            <p className="namePromo-ada-id">Promo : {Project.namePromo}</p>
            <p className="project-promo-id">Ville : {Project.cityPromo}</p>
            <hr className="project-hr" />
          </li>
        ))}
        </ul>
      </div>
    </>
  );
}


