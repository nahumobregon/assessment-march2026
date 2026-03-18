import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

const SECTIONS = [
  {
    title: 'SECCIÓN 1 — Perfil',
    questions: [
      {
        id: 'org_type',
        text: 'Tipo de organización',
        type: 'single',
        options: ['Estudiante', 'Profesor / Academia', 'Pyme', 'Empresa mediana', 'Corporativo']
      },
      {
        id: 'area',
        text: 'Área en la que trabajas',
        type: 'single',
        options: ['Dirección general', 'Finanzas', 'Operaciones / Producción', 'Ventas / Comercial', 'Tecnología / Data', 'Otro']
      },
      {
        id: 'company_size',
        text: 'Tamaño de empresa',
        type: 'single',
        options: ['No aplica - Soy Estudiante', '1–10 empleados', '11–50', '51–200', '200–1000', '+1000']
      }
    ]
  },
  {
    title: 'SECCIÓN 2 — Diagnóstico Operativo',
    questions: [
      {
        id: 'info_management',
        text: '¿Cómo gestionan la información actualmente?',
        type: 'single',
        options: ['Principalmente en Excel', 'Múltiples sistemas no conectados', 'ERP + Excel', 'Sistemas integrados', 'No estoy seguro']
      },
      {
        id: 'report_time',
        text: '¿Cuánto tiempo tardan en generar reportes clave?',
        type: 'single',
        options: ['Horas', '1–2 días', '3–5 días', 'Más de una semana', 'No hay reportes claros']
      },
      {
        id: 'dependency',
        text: '¿Cuántos procesos dependen de una sola persona?',
        type: 'single',
        options: ['Más de 10', 'Entre 5 y 10', 'Entre 2 y 5', '1', 'Ninguno']
      }
    ]
  },
  {
    title: 'SECCIÓN 3 — Cuellos de botella',
    questions: [
      {
        id: 'problems',
        text: '¿Qué problemas enfrentas hoy?',
        type: 'multi',
        options: [
          'Reportes tardados', 
          'Mucho trabajo manual', 
          'Errores en información', 
          'Datos no conectados', 
          'Dependencia de personas clave', 
          'No sabemos cómo usar IA', 
          'No tenemos visibilidad en tiempo real', 
          'Seguridad de datos'
        ]
      },
      {
        id: 'solutions_attempted',
        text: '¿Qué han intentado para solucionarlo?',
        type: 'single',
        options: ['Contratar más personal', 'Usar más Excel', 'Implementar software', 'Comprar licencias de IA', 'Nada aún', 'Otro']
      }
    ]
  },
  {
    title: 'SECCIÓN 4 — Uso de IA',
    questions: [
      {
        id: 'ai_tools',
        text: '¿Qué herramientas de IA utilizas actualmente?',
        type: 'multi',
        options: ['ChatGPT', 'Microsoft Copilot', 'Google Gemini', 'Claude', 'Notion AI', 'GitHub Copilot', 'Midjourney / DALL·E', 'Ninguna', 'Otra']
      },
      {
        id: 'ai_usage_purpose',
        text: '¿Para qué utilizas IA actualmente?',
        type: 'multi',
        options: [
          'Redacción de correos', 'Creación de presentaciones', 'Resúmenes de documentos', 'Traducciones', 
          'Búsqueda de información', 'Organización de ideas', 'Análisis de datos', 'Programación / código', 
          'Automatización de tareas', 'Atención a clientes', 'Generación de contenido', 'Generación de reportes', 
          'Creación de dashboards', 'Limpieza de datos', 'Investigación de mercado', 'Documentación de procesos'
        ]
      },
      {
        id: 'ai_company_usage',
        text: '¿Cómo usan IA en tu empresa?',
        type: 'single',
        options: ['Uso personal', 'Uso en equipo (sin procesos)', 'Uso formal definido', 'Integrada en sistemas', 'No se utiliza']
      },
      {
        id: 'ai_frequency',
        text: '¿Qué tan frecuente usas IA en tu trabajo?',
        type: 'single',
        options: ['Diario', 'Varias veces por semana', 'Ocasionalmente', 'Casi nunca', 'Nunca']
      }
    ]
  },
  {
    title: 'SECCIÓN 5 — Interés',
    questions: [
      {
        id: 'improvements_desired',
        text: '¿Qué te gustaría mejorar?',
        type: 'single',
        options: ['Reducir trabajo manual', 'Automatizar procesos', 'Tener reportes en tiempo real', 'Tomar decisiones con datos', 'Todo lo anterior']
      }
    ]
  }
];

function NewAssessment() {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState(null);

  const currentSection = SECTIONS[currentSectionIdx];
  const currentQuestion = currentSection.questions[currentQuestionIdx];

  const totalQuestions = SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);
  const completedQuestions = SECTIONS.slice(0, currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIdx;
  
  const progress = (completedQuestions / (totalQuestions + 1)) * 100;

  const handleNext = () => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentSectionIdx < SECTIONS.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    } else {
      setCurrentSectionIdx(SECTIONS.length); // Move to contact form
    }
  };

  const handleSingleSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
    handleNext();
  };

  const handleMultiSelect = (option) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      assessmentType: 'new_detailed',
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
        setDiagnostic(data.diagnostic || 'Gracias por completar el diagnóstico detallado.');
        setIsSubmitted(true);
      } else {
        alert('Error al enviar. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setDiagnostic('Gracias por completar el diagnóstico. En breve recibirás un análisis profesional.');
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="glass-card">
          <h1>¡Diagnóstico Completo!</h1>
          <p className="subtitle">Análisis detallado de FiftyAI.mx</p>
          <div className="results-container">
            <div className="results-header">Resumen:</div>
            <p>{diagnostic}</p>
          </div>
          <button className="submit-btn" onClick={() => window.location.reload()}>Volver a empezar</button>
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
        {currentSectionIdx < SECTIONS.length ? (
          <>
            <h1>{currentSection.title}</h1>
            <p className="subtitle">Pregunta {completedQuestions + 1} de {totalQuestions}</p>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{currentQuestion.text}</h2>
            
            {currentQuestion.type === 'single' ? (
              <div className="button-grid">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="option-button"
                    onClick={() => handleSingleSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="multi-select-container">
                <div className="button-grid">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = (answers[currentQuestion.id] || []).includes(option);
                    return (
                      <button
                        key={idx}
                        className={`option-button ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleMultiSelect(option)}
                        style={isSelected ? { border: '2px solid var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.2)' } : {}}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                <button 
                  className="submit-btn" 
                  style={{ marginTop: '2rem' }}
                  onClick={handleNext}
                  disabled={!(answers[currentQuestion.id] || []).length}
                >
                  Continuar
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1>Paso Final</h1>
            <p className="subtitle">Para enviarte tu diagnóstico personalizado</p>
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
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Obtener Diagnóstico'}
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

export default NewAssessment
