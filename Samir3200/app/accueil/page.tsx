
"use client";
import { useEffect, useState } from "react";

export default function Accueil() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    githubUrl: '',
    demoUrl: '',
    promoId: '',
    adaProjectId: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [studentProjects, setStudentProjects] = useState<any[]>([]);
  const [adaProjects, setAdaProjects] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);

  // Helper to fetch all projects
  const fetchStudentProjects = () => {
    fetch("/api/studentProject")
      .then((res) => res.json())
      .then((data) => setStudentProjects(data));
  };
  useEffect(() => {
    fetchStudentProjects();
    fetch("/api/ada")
      .then((res) => res.json())
      .then((data) => setAdaProjects(data));
    fetch("/api/promos")
      .then((res) => res.json())
      .then((data) => setPromos(data));
  }, []);

  // Regroupement par catégorie (titre du projet Ada)
  const grouped = adaProjects.reduce((acc: Record<string, any[]>, ada: any) => {
    acc[ada.title] = studentProjects.filter((p) => p.adaProjectId === ada.id);
    return acc;
  }, {} as Record<string, any[]>);

  // Fonction pour retrouver le nom de la promo à partir de l'id
  const getPromoName = (promoId: number) => {
    const promo = promos.find((pr: any) => pr.id === promoId);
    return promo ? promo.name : 'Promo inconnue';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f9ff 60%, #e0f2fe 100%)', padding: '48px 0', position: 'relative' }}>
      <button
        style={{
          position: 'fixed',
          top: 100,
          right: 48,
          zIndex: 3000,
          background: '#0e7490',
          color: 'white',
          border: 'none',
          borderRadius: 10,
          padding: '14px 32px',
          fontWeight: 800,
          fontSize: 20,
          boxShadow: '0 2px 12px #16c3f522',
          cursor: 'pointer',
          letterSpacing: 1,
          transition: 'background 0.2s',
        }}
        onClick={() => setShowForm(true)}
      >
        Proposer un projet
      </button>
            {/* Pop-up formulaire d'ajout de projet */}
            {showForm && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(240,249,255,0.92)',
                zIndex: 4000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(2px)'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: 18,
                  padding: 48,
                  minWidth: 420,
                  maxWidth: 520,
                  boxShadow: '0 12px 40px #16c3f577',
                  position: 'relative',
                  color: '#0e1a2b',
                  fontFamily: 'Segoe UI, Arial, sans-serif',
                  fontSize: 17,
                  lineHeight: 1.5,
                  letterSpacing: 0.1,
                }}>
                  <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: 12, right: 16, fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#0e7490', fontWeight: 700 }}>×</button>
                  <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 18, color: '#0e7490', letterSpacing: 0.5 }}>Proposer un projet</h2>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setFormLoading(true);
                    setFormError('');
                    setFormSuccess('');
                    try {
                      const res = await fetch('/api/studentProject', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: formData.title,
                          githubUrl: formData.githubUrl,
                          demoUrl: formData.demoUrl,
                          promoId: formData.promoId,
                          adaProjectId: formData.adaProjectId,
                        }),
                      });
                      if (!res.ok) throw new Error('Erreur lors de l\'ajout');
                      setFormSuccess('Projet ajouté avec succès !');
                      setFormData({ title: '', githubUrl: '', demoUrl: '', promoId: '', adaProjectId: '' });
                      // Refresh projects after successful submission
                      fetchStudentProjects();
                    } catch (err: any) {
                      setFormError(err.message || 'Erreur inconnue');
                    } finally {
                      setFormLoading(false);
                    }
                  }}>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontWeight: 700 }}>Titre du projet</label><br />
                      <input type="text" required value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bae6fd', fontSize: 16, marginTop: 4 }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontWeight: 700 }}>Lien GitHub</label><br />
                      <input type="url" required value={formData.githubUrl} onChange={e => setFormData(f => ({ ...f, githubUrl: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bae6fd', fontSize: 16, marginTop: 4 }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontWeight: 700 }}>Lien Démo (optionnel)</label><br />
                      <input type="url" value={formData.demoUrl} onChange={e => setFormData(f => ({ ...f, demoUrl: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bae6fd', fontSize: 16, marginTop: 4 }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontWeight: 700 }}>Promo</label><br />
                      <select required value={formData.promoId} onChange={e => setFormData(f => ({ ...f, promoId: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bae6fd', fontSize: 16, marginTop: 4 }}>
                        <option value="">Sélectionner une promo</option>
                        {promos.map((promo: any) => (
                          <option key={promo.id} value={promo.id}>{promo.name}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ fontWeight: 700 }}>Projet Ada</label><br />
                      <select required value={formData.adaProjectId} onChange={e => setFormData(f => ({ ...f, adaProjectId: e.target.value }))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bae6fd', fontSize: 16, marginTop: 4 }}>
                        <option value="">Sélectionner un projet Ada</option>
                        {adaProjects.map((ada: any) => (
                          <option key={ada.id} value={ada.id}>{ada.title}</option>
                        ))}
                      </select>
                    </div>
                    {formError && <div style={{ color: '#dc2626', marginBottom: 12 }}>{formError}</div>}
                    {formSuccess && <div style={{ color: '#059669', marginBottom: 12 }}>{formSuccess}</div>}
                    <button type="submit" disabled={formLoading} style={{
                      background: '#0e7490',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      padding: '12px 32px',
                      fontWeight: 800,
                      fontSize: 18,
                      cursor: formLoading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 2px 8px #16c3f522',
                      marginTop: 8,
                      opacity: formLoading ? 0.7 : 1
                    }}>{formLoading ? 'Ajout...' : 'Ajouter le projet'}</button>
                  </form>
                </div>
              </div>
            )}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{
          color: '#0e7490',
          fontWeight: 900,
          fontSize: 38,
          marginBottom: 40,
          textAlign: 'center',
          letterSpacing: 2,
          textShadow: '0 2px 12px #16c3f522',
          fontFamily: 'Segoe UI, Arial, sans-serif',
        }}>
          <span style={{ color: '#16c3f5' }}>Projets ADA</span> <span style={{ fontWeight: 400, fontSize: 28, color: '#334155' }}></span>
        </h1>
        {adaProjects.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: 20, marginTop: 60 }}>Chargement des catégories...</div>
        ) : (
          Object.entries(grouped).map(([cat, projects]) => (
            <section key={cat} style={{
              marginBottom: 56,
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 4px 32px #16c3f522',
              padding: '32px 28px 24px 28px',
              border: '1.5px solid #bae6fd',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <h2 style={{
                color: '#0e7490',
                fontWeight: 800,
                fontSize: 26,
                marginBottom: 28,
                letterSpacing: 1,
                borderLeft: '6px solid #16c3f5',
                paddingLeft: 16,
                background: 'linear-gradient(90deg, #e0f2fe 60%, #f0f9ff 100%)',
                borderRadius: 8,
                boxShadow: '0 2px 8px #16c3f511',
              }}>{cat}</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(410px, 1fr))',
                gap: 36,
                justifyContent: 'center',
                alignItems: 'stretch',
                marginBottom: 8,
              }}>
                {projects.length === 0 ? (
                  <div style={{ gridColumn: '1/-1', color: '#64748b', fontSize: 18, textAlign: 'center' }}>Aucun projet dans cette catégorie.</div>
                ) : (
                  projects.map((p) => (
                    <div key={p.id} style={{
                      background: 'linear-gradient(120deg, #f8fafc 60%, #e0f2fe 100%)',
                      borderRadius: 18,
                      boxShadow: '0 4px 24px #16c3f533',
                      padding: 32,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      minHeight: 200,
                      minWidth: 0,
                      transition: 'box-shadow 0.2s',
                      border: '1px solid #bae6fd',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px #16c3f577')}
                      onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 24px #16c3f533')}
                    >
                      <div style={{ fontWeight: 800, fontSize: 20, color: '#0e7490', marginBottom: 8, letterSpacing: 0.5, position: 'relative', width: '100%' }}>
                        {p.title}
                        <span style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: '#16c3f5',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 13,
                          borderRadius: '0 8px 0 8px',
                          padding: '3px 14px',
                          boxShadow: '0 2px 8px #16c3f522',
                          letterSpacing: 0.5,
                          zIndex: 2
                        }}>{getPromoName(p.promoId)}</span>
                      </div>
                      {/* ...autres infos projet... */}
                      <div style={{ position: 'absolute', bottom: 18, right: 24 }}>
                        <button
                          style={{
                            background: '#0e7490',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            padding: '7px 18px',
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px #16c3f522',
                            transition: 'background 0.2s',
                          }}
                          onClick={() => setSelectedProject(p)}
                        >
                          Voir plus
                        </button>
                      </div>
                            {/* Modal détails projet */}
                            {selectedProject && (
                              <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                background: 'rgba(240,249,255,0.85)',
                                zIndex: 2000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(2px)'
                              }}>
                                <div style={{
                                  background: 'white',
                                  borderRadius: 18,
                                  padding: 72,
                                  minWidth: 900,
                                  maxWidth: 1500,
                                  minHeight: 600,
                                  height: '70vh',
                                  boxShadow: '0 12px 40px #16c3f577',
                                  position: 'relative',
                                  color: '#0e1a2b',
                                  fontFamily: 'Segoe UI, Arial, sans-serif',
                                  fontSize: 17,
                                  lineHeight: 1.5,
                                  letterSpacing: 0.1,
                                }}>
                                  <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: 12, right: 16, fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#0e7490', fontWeight: 700 }}>×</button>
                                  <div style={{ position: 'absolute', top: 24, left: 32, fontSize: 18, color: '#0e7490', fontWeight: 700, background: '#e0f2fe', borderRadius: 8, padding: '6px 18px', boxShadow: '0 2px 8px #16c3f522', zIndex: 2 }}>
                                    <b>Projet Ada :</b> {adaProjects.find((a) => a.id === selectedProject.adaProjectId)?.title || 'Inconnu'}
                                  </div>
                                  {/* Espace réservé pour une image du projet */}
                                  <div style={{
                                    width: '100%',
                                    minHeight: 320,
                                    maxHeight: 400,
                                    background: '#e0f2fe',
                                    borderRadius: 12,
                                    marginBottom: 28,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    marginTop: 25,
                                  }}>
                                    <img
                                      src="/images/no_image_available.png"
                                      alt="Aperçu du projet"
                                      style={{ display: 'block', width: 'auto', height: '100%', maxHeight: 380, objectFit: 'contain', background: '#e0f2fe', opacity: 0.95 }}
                                      onError={e => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  </div>
                                  <h2 style={{ fontWeight: 800, fontSize: 24, marginBottom: 18, color: '#0e7490', letterSpacing: 0.5 }}>{selectedProject.title}</h2>
                                  <div style={{ marginBottom: 10 }}>
                                    <b>Promo :</b> {getPromoName(selectedProject.promoId)}
                                  </div>
                                  <div style={{ flex: 1 }} />
                                  <div style={{
                                    display: 'flex',
                                    gap: 24,
                                    marginTop: 32,
                                    justifyContent: 'center',
                                    width: '100%',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 32,
                                  }}>
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        background: '#0e7490',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '16px 64px',
                                        fontWeight: 700,
                                        fontSize: 18,
                                        textDecoration: 'none',
                                        boxShadow: '0 2px 8px #16c3f522',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer',
                                        minWidth: 260,
                                      }}
                                    >
                                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.62 4.87 20.26 8.84 21.5C9.34 21.59 9.52 21.3 9.52 21.05C9.52 20.82 9.51 20.18 9.51 19.5C7 20.09 6.48 18.36 6.48 18.36C6.04 17.23 5.37 16.95 5.37 16.95C4.38 16.28 5.45 16.3 5.45 16.3C6.56 16.39 7.13 17.54 7.13 17.54C8.11 19.29 9.78 18.8 10.41 18.54C10.5 17.8 10.78 17.3 11.09 17.04C8.97 16.78 6.73 15.98 6.73 12.68C6.73 11.7 7.09 10.92 7.68 10.32C7.59 10.06 7.28 9.13 7.77 7.88C7.77 7.88 8.5 7.6 9.51 8.34C10.19 8.15 10.92 8.05 11.65 8.05C12.38 8.05 13.11 8.15 13.79 8.34C14.8 7.6 15.53 7.88 15.53 7.88C16.02 9.13 15.71 10.06 15.62 10.32C16.21 10.92 16.57 11.7 16.57 12.68C16.57 15.99 14.32 16.77 12.19 17.03C12.6 17.36 13 18.01 13 19.01C13 20.36 12.99 21.47 12.99 21.99C12.99 22.24 13.17 22.54 13.68 22.45C17.65 21.21 20.52 17.57 20.52 13.21C20.52 6.58 16.02 2 12 2Z" fill="#fff"/></svg>
                                      <span>Voir le code </span>
                                    </a>
                                    {selectedProject.demoUrl ? (
                                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer"
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 12,
                                          background: '#059669',
                                          color: 'white',
                                          border: 'none',
                                          borderRadius: 8,
                                          padding: '16px 64px',
                                          fontWeight: 700,
                                          fontSize: 18,
                                          textDecoration: 'none',
                                          boxShadow: '0 2px 8px #16c3f522',
                                          transition: 'background 0.2s',
                                          cursor: 'pointer',
                                          minWidth: 260,
                                        }}
                                      >
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.62 4.87 20.26 8.84 21.5C9.34 21.59 9.52 21.3 9.52 21.05C9.52 20.82 9.51 20.18 9.51 19.5C7 20.09 6.48 18.36 6.48 18.36C6.04 17.23 5.37 16.95 5.37 16.95C4.38 16.28 5.45 16.3 5.45 16.3C6.56 16.39 7.13 17.54 7.13 17.54C8.11 19.29 9.78 18.8 10.41 18.54C10.5 17.8 10.78 17.3 11.09 17.04C8.97 16.78 6.73 15.98 6.73 12.68C6.73 11.7 7.09 10.92 7.68 10.32C7.59 10.06 7.28 9.13 7.77 7.88C7.77 7.88 8.5 7.6 9.51 8.34C10.19 8.15 10.92 8.05 11.65 8.05C12.38 8.05 13.11 8.15 13.79 8.34C14.8 7.6 15.53 7.88 15.53 7.88C16.02 9.13 15.71 10.06 15.62 10.32C16.21 10.92 16.57 11.7 16.57 12.68C16.57 15.99 14.32 16.77 12.19 17.03C12.6 17.36 13 18.01 13 19.01C13 20.36 12.99 21.47 12.99 21.99C12.99 22.24 13.17 22.54 13.68 22.45C17.65 21.21 20.52 17.57 20.52 13.21C20.52 6.58 16.02 2 12 2Z" fill="#fff"/></svg>
                                        <span>Voir la Demo</span>
                                      </a>
                                    ) : (
                                      <span style={{ color: '#64748b', fontWeight: 400, alignSelf: 'center', fontSize: 18 }}>Aucune démo</span>
                                    )}
                                  </div>
                                  <div style={{ marginBottom: 10 }}>
                                    <b>Ajouté le :</b> {new Date(selectedProject.createdAt).toLocaleDateString()}
                                  </div>                                
                                  {/* Ajoute ici d'autres détails si besoin */}
                                </div>
                              </div>
                            )}
                      <div style={{ fontSize: 14, marginBottom: 6, color: '#334155', fontWeight: 500 }}>
                        <span style={{ fontWeight: 600 }}>GitHub:&nbsp;</span>
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#16c3f5', wordBreak: 'break-all', fontWeight: 600 }}>
                          {p.githubUrl}
                        </a>
                      </div>
                      <div style={{ fontSize: 14, marginBottom: 6, color: '#059669', fontWeight: 500 }}>
                        <span style={{ fontWeight: 600 }}>Demo:&nbsp;</span>
                        {p.demoUrl ? (
                          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>
                            {p.demoUrl}
                          </a>
                        ) : (
                          <span style={{ color: '#64748b', fontWeight: 400 }}>Aucune</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: '#334155', background: '#e0f2fe', borderRadius: 5, padding: '2px 8px', marginTop: 10, fontFamily: 'inherit' }}>
                        <span>Ajouté le : <b>{new Date(p.createdAt).toLocaleDateString()}</b></span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
