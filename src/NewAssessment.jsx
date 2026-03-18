import { useState } from 'react'
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
  const [step, setStep] = useState('contact'); // 'contact' | 'questions'
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', whatsapp: '' });
  const [contactError, setContactError] = useState('');

  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentSection = SECTIONS[currentSectionIdx];
  const currentQuestion = currentSection?.questions[currentQuestionIdx];

  const totalQuestions = SECTIONS.reduce((acc, section) => acc + section.questions.length, 0);
  const completedQuestions = SECTIONS.slice(0, currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIdx;

  const progress = (completedQuestions / totalQuestions) * 100;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactInfo.name.trim()) {
      setContactError('El nombre es obligatorio.');
      return;
    }
    if (!contactInfo.email.trim() && !contactInfo.whatsapp.trim()) {
      setContactError('Por favor proporciona un correo o número de WhatsApp.');
      return;
    }
    setContactError('');
    setStep('questions');
  };

  const submitAssessment = async (finalAnswers) => {
    setLoading(true);

    const payload = {
      assessmentType: 'new_detailed',
      name: contactInfo.name,
      email: contactInfo.email,
      whatsapp: contactInfo.whatsapp,
      ...finalAnswers,
      submittedAt: new Date().toISOString()
    };

    console.log('🚀 [N8N DEBUG] Iniciando envío al webhook...');
    console.log('📦 [N8N DEBUG] Datos a enviar (Payload):', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://n8n.fiftyai.mx/webhook/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log(`📡 [N8N DEBUG] Respuesta recibida HTTP Status: ${response.status}`);

      if (response.ok) {
        console.log('✅ [N8N DEBUG] Comunicación EXITOSA. N8N recibió los datos.');
        try {
          const data = await response.json();
          console.log('📄 [N8N DEBUG] Respuesta JSON de N8N:', data);
        } catch (e) {
          console.log('📄 [N8N DEBUG] N8N respondió exitosamente, pero no devolvió un cuerpo JSON de respuesta.');
        }
      } else {
        console.error('❌ [N8N ERROR] Comunicación FALLIDA con N8N. Mensaje del servidor:', response.statusText);
      }
    } catch (error) {
      console.error('🛑 [N8N ERROR CRÍTICO] Hubo un problema conectando al servidor web de N8N (¿Problema de red o CORS?):', error);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleNext = (newAnswers) => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentSectionIdx < SECTIONS.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const handleSingleSelect = (option) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);
    handleNext(newAnswers);
  };

  const handleMultiSelect = (option) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    const newFieldAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    setAnswers({ ...answers, [currentQuestion.id]: newFieldAnswers });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Enviando respuestas...</h2>
          <div className="progress-bar" style={{ marginTop: '2rem' }}>
            <div className="progress-fill" style={{ width: '100%', animation: 'pulse 1.5s infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>¡Gracias por llenar el cuestionario!</h1>
          <p className="subtitle" style={{ fontSize: '1.2rem' }}>Tus respuestas han sido registradas exitosamente.</p>
          <button className="submit-btn" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
            Iniciar otro diagnóstico
          </button>
        </div>
      </div>
    );
  }

  if (step === 'contact') {
    return (
      <div className="container">
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
          <h1 style={{ marginBottom: '1rem' }}>Información de Contacto</h1>
          <p className="subtitle">Para generar y enviarte tu diagnóstico personalizado, por favor comparte tus datos.</p>
          
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Nombre *</label>
              <input 
                type="text" 
                value={contactInfo.name} 
                onChange={e => setContactInfo({...contactInfo, name: e.target.value})} 
                placeholder="Tu nombre completo"
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Correo Electrónico</label>
              <input 
                type="email" 
                value={contactInfo.email} 
                onChange={e => setContactInfo({...contactInfo, email: e.target.value})} 
                placeholder="ejemplo@correo.com"
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>WhatsApp</label>
              <input 
                type="tel" 
                value={contactInfo.whatsapp} 
                onChange={e => setContactInfo({...contactInfo, whatsapp: e.target.value})} 
                placeholder="+52 55..."
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>

            {contactError && <p style={{ color: '#ff4d4d', fontSize: '0.9rem' }}>{contactError}</p>}
            
            <button type="submit" className="submit-btn" style={{ marginTop: '1rem' }}>
              Comenzar Diagnóstico
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Powered by <strong>fiftyai.mx</strong>
        </p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="glass-card">
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
              onClick={() => handleNext(answers)}
              disabled={!(answers[currentQuestion.id] || []).length}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Powered by <strong>fiftyai.mx</strong>
      </p>
    </div>
  )
}

export default NewAssessment
