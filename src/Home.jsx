import { Link } from 'react-router-dom'
import './App.css'

const Branding = () => (
  <div className="branding-container">
    <div className="branding-title">Fiftyai</div>
    <div className="branding-subtitle">Te ayudamos en adopcion de IA</div>
  </div>
);

function Home() {
  return (
    <div className="container">
      <Branding />
      <div className="glass-card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Seleccione su Diagnóstico</h2>
        
        <div className="button-grid" style={{ gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="home-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Versión Detallada (V1)</h3>
            <p style={{ color: 'var(--text-muted)', minHeight: '3rem' }}>Diagnóstico exhaustivo basado en 5 secciones detalladas de madurez.</p>
            <Link to="/detailed" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1.5rem' }}>
              Comenzar V1
            </Link>
          </div>

          <div className="home-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Versión Moderna (V2)</h3>
            <p style={{ color: 'var(--text-muted)', minHeight: '3rem' }}>Evaluación rápida con puntaje automático de madurez operativa e IA.</p>
            <Link to="/modern" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1.5rem', background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }}>
              Comenzar V2
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
