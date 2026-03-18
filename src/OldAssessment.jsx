import { useState } from 'react'
import './App.css'

const QUESTIONS = [
  {
    id: 'industry',
    text: '¿En qué sector opera su empresa?',
    options: ['Retail / eCommerce', 'Manufactura / Industrial', 'Salud / Farmacéutica', 'Servicios Financieros', 'Tecnología', 'Otro']
  },
  {
    id: 'interest',
    text: '¿Qué tan interesados están en implementar automatizaciones de IA?',
    options: ['Muy Interesados (Prioridad #1)', 'Explorando Posibilidades', 'Interés a Largo Plazo', 'Aún no lo hemos discutido']
  },
  {
    id: 'timeframe',
    text: '¿En cuánto tiempo planean iniciar la implementación?',
    options: ['Inmediato (< 3 meses)', 'A corto plazo (3-6 meses)', 'A mediano plazo (6-12 meses)', 'Sin fecha definida']
  },
  {
    id: 'current_status',
    text: '¿Cuál es el nivel actual de automatización en sus procesos?',
    options: ['Totalmente Manual', 'Básico (Hojas de cálculo)', 'Intermedio (Software especializado)', 'Avanzado (Ya usamos algo de IA)']
  },
  {
    id: 'decision_maker',
    text: '¿Cuál es su rol en la toma de decisiones tecnológicas?',
    options: ['Yo tomo la decisión final', 'Soy influenciador clave', 'Es decisión de otro departamento', 'Soy consultor externo']
  },
  {
    id: 'budget',
    text: '¿Cuentan con un presupuesto asignado para proyectos de IA este año?',
    options: ['Sí, ya está aprobado', 'En proceso de aprobación', 'Buscando opciones para definirlo', 'Sin presupuesto asignado']
  },
  {
    id: 'challenge',
    text: '¿Cuál es el mayor desafío que visualizan para implementar IA?',
    options: ['Costos de Implementación', 'Falta de Talento / Conocimiento', 'Integración con sistemas actuales', 'Resistencia al Cambio']
  }
];

function OldAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState(null);

  const totalSteps = QUESTIONS.length + 1; // +1 for contact form

  const handleOptionSelect = (option) => {
    const qId = QUESTIONS[currentStep].id;
    setAnswers({ ...answers, [qId]: option });
    setCurrentStep(prev => prev + 1);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      assessmentType: 'original',
      ...answers,
      ...contactInfo,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('https://n8n.fiftyai.mx/webhook-test/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setDiagnostic(data.diagnostic || 'Gracias por completar el diagnóstico. Hemos enviado un análisis detallado en PDF a tu correo y teléfono.');
        setIsSubmitted(true);
      } else {
        alert('Error al enviar. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setDiagnostic('Gracias por completar el diagnóstico. En breve recibirás un análisis profesional de FiftyAI.mx en tu correo y mensaje.');
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentStep) / totalSteps) * 100;

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="glass-card">
          <h1>¡Análisis en Proceso!</h1>
          <p className="subtitle">Diagnóstico generado por FiftyAI.mx</p>
          <div className="results-container">
            <div className="results-header">Diagnóstico Preliminar:</div>
            <p>{diagnostic}</p>
            <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Un documento PDF completo ha sido enviado a <strong>{contactInfo.email}</strong> y vía mensaje al <strong>{contactInfo.phone}</strong>.
            </p>
          </div>
          <button className="submit-btn" onClick={() => window.location.reload()}>Realizar otro test</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="glass-card">
        {currentStep < QUESTIONS.length ? (
          <>
            <h1>AI Readiness Assessment</h1>
            <p className="subtitle">Pregunta {currentStep + 1} de {QUESTIONS.length}</p>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{QUESTIONS[currentStep].text}</h2>
            <div className="button-grid">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  className="option-button"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1>Paso Final</h1>
            <p className="subtitle">Para enviarte tu diagnóstico personalizado de FiftyAI.mx</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ejemplo@empresa.com"
                  required
                  value={contactInfo.email}
                  onChange={handleContactChange}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Teléfono (WhatsApp)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+52 55 1234 5678"
                  required
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem' }}>
                * Te sugerimos capturar ambos para asegurar la recepción de tu PDF diagnóstico.
              </p>
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? 'Generando Diagnóstico...' : 'Obtener Diagnóstico Gratuito'}
              </button>
            </form>
          </>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>← Volver al inicio</Link>
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Powered by <strong>fiftyai.mx</strong>
      </p>
    </div>
  )
}

export default OldAssessment
