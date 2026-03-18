import { Link } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="container">
      <div className="glass-card">
        <h1>Seleccione una Versión</h1>
        <p className="subtitle">Diagnóstico y Evaluación de IA</p>
        
        <div className="button-grid" style={{ gap: '2rem' }}>
          <div className="home-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', textAlign: 'center' }}>
            <h2>Versión Original</h2>
            <p>El cuestionario breve de 7 preguntas.</p>
            <Link to="/old" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1rem' }}>
              Comenzar Original
            </Link>
          </div>

          <div className="home-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', textAlign: 'center' }}>
            <h2>Versión Exhaustiva</h2>
            <p>Diagnóstico completo basado en 5 secciones detalladas.</p>
            <Link to="/new" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1rem' }}>
              Comenzar Detallado
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
