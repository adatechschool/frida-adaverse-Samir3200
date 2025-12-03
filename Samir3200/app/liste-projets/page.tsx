
"use client";
import data from "../data/datafrida.json";

interface Repo {
  title: string;
  githubUrl: string;
  demoUrl: string | null;
  createdAt: string;
}

interface UserGroup {
  name: string;
  repos: Repo[];
}

export default function ListeProjets() {
  const users: UserGroup[] = Array.isArray(data) ? (data as UserGroup[]) : [];
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f9ff 60%, #e0f2fe 100%)', padding: '48px 0' }}>
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
          <span style={{ color: '#16c3f5' }}>Liste des projets</span> <span style={{ fontWeight: 400, fontSize: 28, color: '#334155' }}>(GitHub)</span>
        </h1>
        {users.map((user) => (
          <section key={user.name} style={{
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
            }}>{user.name}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 32,
              justifyContent: 'center',
              alignItems: 'stretch',
              marginBottom: 8,
            }}>
              {user.repos.map((repo, idx) => (
                <div
                  key={repo.githubUrl + idx}
                  style={{
                    background: 'linear-gradient(120deg, #f8fafc 60%, #e0f2fe 100%)',
                    borderRadius: 18,
                    boxShadow: '0 4px 24px #16c3f533',
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    minHeight: 180,
                    transition: 'box-shadow 0.2s',
                    border: '1px solid #bae6fd',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px #16c3f577')}
                  onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 24px #16c3f533')}
                >
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#0e7490', marginBottom: 8, letterSpacing: 0.5 }}>{repo.title}</div>
                  <div style={{ fontSize: 14, marginBottom: 6, color: '#334155', fontWeight: 500 }}>
                    <span style={{ fontWeight: 600 }}>GitHub:&nbsp;</span>
                    <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#16c3f5', wordBreak: 'break-all', fontWeight: 600 }}>
                      {repo.githubUrl}
                    </a>
                  </div>
                  <div style={{ fontSize: 14, marginBottom: 6, color: '#059669', fontWeight: 500 }}>
                    <span style={{ fontWeight: 600 }}>Demo:&nbsp;</span>
                    {repo.demoUrl ? (
                      <a href={repo.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>
                        {repo.demoUrl}
                      </a>
                    ) : (
                      <span style={{ color: '#64748b', fontWeight: 400 }}>Aucune</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#334155', background: '#e0f2fe', borderRadius: 5, padding: '2px 8px', marginTop: 10, fontFamily: 'inherit' }}>
                    <span>Créé le : <b>{new Date(repo.createdAt).toLocaleDateString()}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
