
"use client";
// Construit l'URL raw de thumbnail.png à partir du githubUrl
function getThumbnailUrl(githubUrl: string) {
  if (!githubUrl) return '';
  const match = githubUrl.match(/github.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return '';
  const user = match[1];
  const repo = match[2];
  return `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;
}
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function StudentProjectDetail() {
  const params = useParams();
  // Expect params: {category}, {githubUsername}
  const { category, githubUsername } = params as { category?: string; githubUsername?: string };
  const [project, setProject] = useState<any>(null);
  const [adaProjects, setAdaProjects] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    if (!category || !githubUsername) return;
    fetch('/api/ada').then(res => res.json()).then(setAdaProjects);
    fetch('/api/promos').then(res => res.json()).then(setPromos);
    fetch(`/api/studentProject`)
      .then(res => res.json())
      .then(data => {
        // Find the project by category (ada title) and github username
        const found = data.find((p: any) => {
          // Find ada project title
          const adaTitle = adaProjects.find((a: any) => a.id === p.adaProjectId)?.title;
          // Extract username from githubUrl
          let username = '';
          try {
            const match = p.githubUrl.match(/github.com\/(.*?)\//);
            username = match ? match[1] : '';
          } catch {}
          return adaTitle === category && username === githubUsername;
        });
        setProject(found);
      });
  }, [category, githubUsername, adaProjects.length]);

  const getPromoName = (promoId: number) => {
    const promo = promos.find((pr: any) => pr.id === promoId);
    return promo ? promo.name : 'Promo inconnue';
  };

  if (!project) return <div style={{ color: '#2563eb', fontSize: 28, textAlign: 'center', marginTop: 80 }}>Chargement du projet...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)', padding: 0, fontFamily: 'Inter, Segoe UI, Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-4vh' }}>
      <div style={{ maxWidth: 900, width: '95vw', minHeight: '70vh', maxHeight: '95vh', background: 'rgba(255,255,255,0.98)', borderRadius: 32, boxShadow: '0 12px 48px #2563eb33', padding: 32, color: '#1e293b', position: 'relative', overflow: 'auto', border: '2px solid #2563eb', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Badge promo */}
        <div style={{ position: 'absolute', top: 28, right: 24, background: 'linear-gradient(90deg, #ef4444 0%, #2563eb 100%)', color: 'white', fontWeight: 700, fontSize: 18, borderRadius: 12, padding: '8px 26px', boxShadow: '0 2px 8px #ef444444', letterSpacing: 0.5, zIndex: 2, border: '2px solid #2563eb' }}>
          {getPromoName(project.promoId)}
        </div>
        {/* GitHub Username au-dessus de l'image */}
        <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 28, color: '#0e7490', fontWeight: 800, letterSpacing: 1 }}>
           {githubUsername || (project.githubUrl ? (project.githubUrl.match(/github.com\/(.*?)\//)?.[1] || 'inconnu') : 'inconnu')}
        </div>
        {/* Image ou visuel */}
        <div style={{ width: '100%', minHeight: 440, maxHeight: 540, background: '#e0f2fe', borderRadius: 16, marginBottom: 16, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={getThumbnailUrl(project.githubUrl) || '/image/no_image_available.png'}
            alt="Aperçu du projet"
            style={{ display: 'block', width: 'auto', height: '100%', maxHeight: 520, objectFit: 'contain', background: '#e0f2fe', opacity: 0.95 }}
            onError={e => { e.currentTarget.src = '/image/no_image_available.png'; }}
          />
        </div>
        <h1 style={{ fontWeight: 900, fontSize: 40, marginTop: 0, marginBottom: 4, color: '#2563eb', letterSpacing: 1, textAlign: 'center', lineHeight: 1.1 }}>{project.title}</h1>
        <div style={{ textAlign: 'center', marginBottom: 18, fontSize: 24, color: '#0e7490', fontWeight: 700, letterSpacing: 0.5 }}>{category || adaProjects.find((a) => a.id === project.adaProjectId)?.title || 'Inconnu'}</div>
        {/* ...autres infos projet... */}
        <div style={{ display: 'flex', gap: 22, justifyContent: 'center', marginBottom: 18 }}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'linear-gradient(90deg, #2563eb 0%, #ef4444 100%)',
              color: 'white', border: 'none', borderRadius: 12, padding: '14px 38px', fontWeight: 700, fontSize: 19,
              textDecoration: 'none', boxShadow: '0 2px 8px #2563eb22', transition: 'background 0.2s', cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #ef4444 0%, #2563eb 100%)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #ef4444 100%)'; }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}>
              <circle cx="16" cy="16" r="16" fill="#fff"/>
              <polygon points="12,10 24,16 12,22" fill="#2563eb"/>
            </svg>
            <span style={{ textAlign: 'center', width: '100%' }}>Voir le code</span>
          </a>
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'linear-gradient(90deg, #059669 0%, #16c3f5 100%)',
                  color: 'white', border: 'none', borderRadius: 12, padding: '14px 38px', fontWeight: 700, fontSize: 19,
                  textDecoration: 'none', boxShadow: '0 2px 8px #05966922', transition: 'background 0.2s', cursor: 'pointer',
                }}
              onMouseOver={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #16c3f5 0%, #059669 100%)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #059669 0%, #16c3f5 100%)'; }}
            >
              <svg width="120" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.62 4.87 20.26 8.84 21.5C9.34 21.59 9.52 21.3 9.52 21.05C9.52 20.82 9.51 20.18 9.51 19.5C7 20.09 6.48 18.36 6.48 18.36C6.04 17.23 5.37 16.95 5.37 16.95C4.38 16.28 5.45 16.3 5.45 16.3C6.56 16.39 7.13 17.54 7.13 17.54C8.11 19.29 9.78 18.8 10.41 18.54C10.5 17.8 10.78 17.3 11.09 17.04C8.97 16.78 6.73 15.98 6.73 12.68C6.73 11.7 7.09 10.92 7.68 10.32C7.59 10.06 7.28 9.13 7.77 7.88C7.77 7.88 8.5 7.6 9.51 8.34C10.19 8.15 10.92 8.05 11.65 8.05C12.38 8.05 13.11 8.15 13.79 8.34C14.8 7.6 15.53 7.88 15.53 7.88C16.02 9.13 15.71 10.06 15.62 10.32C16.21 10.92 16.57 11.7 16.57 12.68C16.57 15.99 14.32 16.77 12.19 17.03C12.6 17.36 13 18.01 13 19.01C13 20.36 12.99 21.47 12.99 21.99C12.99 22.24 13.17 22.54 13.68 22.45C17.65 21.21 20.52 17.57 20.52 13.21C20.52 6.58 16.02 2 12 2Z" fill="#fff"/></svg>
              <span style={{ textAlign: 'center', width: '100%' }}>Voir la Démo</span>
            </a>
          ) : (
            <span style={{ color: '#64748b', fontWeight: 400, alignSelf: 'center', fontSize: 15, background: '#e0e7ef', borderRadius: 8, padding: '8px 18px' }}>Aucune démo</span>
          )}
        </div>
        <div style={{ fontSize: 15, color: '#334155', background: '#e0f2fe', borderRadius: 8, padding: '6px 14px', marginTop: 10, fontFamily: 'inherit', textAlign: 'center' }}>
          Ajouté le : <b>{new Date(project.createdAt).toLocaleDateString()}</b>
        </div>
      </div>
    </div>
  );
}
