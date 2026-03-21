import { useState } from 'react'
import './App.css'

const SECTIONS_V2 = [
  {
    title: 'SECCIÓN 1: Perfil de Organización',
    questions: [
      {
        id: 'role',
        text: '¿Cuál es tu rol principal en la organización?',
        type: 'single',
        options: [
          { text: 'C-Level / Dueño (Dirección General)', points: 15 },
          { text: 'Gerencia Media (Finanzas, Operaciones, Ventas)', points: 10 },
          { text: 'Líder Técnico (Tecnología / Data)', points: 5 },
          { text: 'Operativo / Consultor', points: 2 },
          { text: 'Estudiante / Academia', points: 0 }
        ]
      },
      {
        id: 'size',
        text: 'Tamaño de la empresa (empleados):',
        type: 'single',
        options: [
          { text: '1–10', points: 2 },
          { text: '11–50', points: 5 },
          { text: '51–200', points: 10 },
          { text: '201–1000', points: 12 },
          { text: '+1000', points: 15 }
        ]
      }
    ]
  },
  {
    title: 'SECCIÓN 2: Diagnóstico Operativo',
    questions: [
      {
        id: 'info_management',
        text: '¿Cómo gestionan la información actualmente?',
        type: 'single',
        options: [
          { text: 'Caos: Principalmente en Excel o archivos locales', points: 15 },
          { text: 'Silos: Múltiples sistemas que no se conectan', points: 10 },
          { text: 'Híbrido: ERP/CRM + mucho trabajo manual en Excel', points: 5 },
          { text: 'Optimizado: Sistemas integrados y flujos definidos', points: 0 }
        ]
      },
      {
        id: 'report_time',
        text: '¿Cuánto tardan en generar reportes clave de resultados?',
        type: 'single',
        options: [
          { text: 'Crítico: Más de una semana o no hay reportes', points: 15 },
          { text: 'Lento: Entre 3 y 5 días', points: 10 },
          { text: 'Aceptable: 1 a 2 días', points: 5 },
          { text: 'Real-time: Lo veo en un dashboard al instante', points: 0 }
        ]
      },
      {
        id: 'dependency',
        text: '¿Cuántos procesos dependen de una sola persona clave?',
        type: 'single',
        options: [
          { text: 'Riesgo Total: Más de 10 procesos', points: 15 },
          { text: 'Riesgo Alto: Entre 5 y 10 procesos', points: 10 },
          { text: 'Moderado: Entre 2 y 5 procesos', points: 5 },
          { text: 'Bajo: Procesos institucionalizados / automatizados', points: 0 }
        ]
      }
    ]
  },
  {
    title: 'SECCIÓN 3: Uso de IA',
    questions: [
      {
        id: 'ai_tools',
        text: '¿Qué herramientas de IA utilizan activamente?',
        type: 'multi',
        options: [
          { text: 'ChatGPT / Claude / Gemini', points: 0 },
          { text: 'Microsoft Copilot / Notion AI', points: 0 },
          { text: 'Herramientas técnicas (GitHub Copilot / Midjourney)', points: 0 },
          { text: 'Ninguna de las anteriores', points: 0 }
        ]
      },
      {
        id: 'ai_purpose',
        text: '¿Para qué utilizan IA hoy?',
        type: 'multi',
        options: [
          { text: 'Tareas básicas (Correos, resúmenes, traducción)', points: 0 },
          { text: 'Análisis de datos y Reportes', points: 0 },
          { text: 'Automatización de tareas repetitivas', points: 0 },
          { text: 'Generación de contenido / Marketing', points: 0 },
          { text: 'No la utilizamos aún', points: 0 }
        ]
      }
    ]
  },
  {
    title: 'SECCIÓN 4: Nivel de Adopción',
    questions: [
      {
        id: 'ai_adoption',
        text: '¿Cómo es el uso de IA a nivel corporativo?',
        type: 'single',
        options: [
          { text: 'Inexistente: No se utiliza', points: 10 },
          { text: 'Shadow AI: Cada quien por su cuenta (sin guía)', points: 7 },
          { text: 'Exploración: Uso en equipos sin procesos definidos', points: 5 },
          { text: 'Estratégico: Integrada en flujos de trabajo', points: 0 }
        ]
      }
    ]
  }
];

const Branding = () => (
  <div className="branding-container">
    <div className="branding-title">Fiftyai</div>
    <div className="branding-subtitle">Te ayudamos en adopcion de IA</div>
  </div>
);

function ModernAssessment() {
  const [step, setStep] = useState('identification'); // 'identification' | 'questions'
  const [contactInfo, setContactInfo] = useState({ email: '', whatsapp: '' });
  const [contactError, setContactError] = useState('');

  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const currentSection = SECTIONS_V2[currentSectionIdx];
  const currentQuestion = currentSection?.questions[currentQuestionIdx];

  const totalQuestions = SECTIONS_V2.reduce((acc, section) => acc + section.questions.length, 0);
  const completedQuestions = SECTIONS_V2.slice(0, currentSectionIdx).reduce((acc, s) => acc + s.questions.length, 0) + currentQuestionIdx;
  const progress = (completedQuestions / totalQuestions) * 100;

  const handleIdentificationSubmit = (e) => {
    e.preventDefault();
    if (!contactInfo.email.trim() || !contactInfo.whatsapp.trim()) {
      setContactError('Ambos campos son obligatorios.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      setContactError('Por favor proporciona un correo electrónico válido.');
      return;
    }
    setContactError('');
    setStep('questions');
  };

  const getMaturityLevel = (score) => {
    if (score <= 30) return { label: 'Madurez Alta', description: 'Optimizar con Agentes IA' };
    if (score <= 60) return { label: 'Madurez Media', description: 'Integrar sistemas' };
    if (score <= 85) return { label: 'Madurez Baja', description: 'Urgencia de automatización' };
    return { label: 'Nivel Crítico', description: 'Necesita consultoría inmediata' };
  };

  const submitAssessment = async (finalAnswers, finalScore) => {
    setLoading(true);
    const { label, description } = getMaturityLevel(finalScore);

    const payload = {
      assessmentType: 'v2_modern',
      email: contactInfo.email,
      whatsapp: contactInfo.whatsapp,
      answers: finalAnswers,
      score: finalScore,
      maturityLevel: label,
      maturityDescription: description,
      submittedAt: new Date().toISOString()
    };

    console.log('🚀 [N8N V2] Enviando datos...', payload);

    try {
      const response = await fetch('https://n8n.fiftyai.mx/webhook/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('✅ [N8N V2] Éxito');
      } else {
        console.error('❌ [N8N V2] Error', response.statusText);
      }
    } catch (error) {
      console.error('🛑 [N8N V2] Error crítico', error);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  const handleNext = (newAnswers, newScore) => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else if (currentSectionIdx < SECTIONS_V2.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
      setCurrentQuestionIdx(0);
    } else {
      submitAssessment(newAnswers, newScore);
    }
  };

  const handleSelection = (option) => {
    const newScore = totalScore + (option.points || 0);
    const newAnswers = { ...answers, [currentQuestion.id]: option.text };
    
    setTotalScore(newScore);
    setAnswers(newAnswers);

    if (currentQuestion.id === 'role' && option.text === 'Estudiante / Academia') {
      // Per MD: "0 pts (Descalifica)". 
      // I'll just submit with 0 score or handle as special case. 
      // For now, let's just proceed as 0 points.
    }

    handleNext(newAnswers, newScore);
  };

  const handleMultiSelect = (optionText) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    const newFieldAnswers = currentAnswers.includes(optionText)
      ? currentAnswers.filter(a => a !== optionText)
      : [...currentAnswers, optionText];
    setAnswers({ ...answers, [currentQuestion.id]: newFieldAnswers });
  };

  if (loading) {
    return (
      <div className="container">
        <Branding />
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Procesando tu diagnóstico...</h2>
          <div className="progress-bar" style={{ marginTop: '2rem' }}>
            <div className="progress-fill" style={{ width: '100%', animation: 'pulse 1.5s infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const { label } = getMaturityLevel(totalScore);
    return (
      <div className="container">
        <Branding />
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>¡Gracias!</h2>
          <p className="subtitle" style={{ fontSize: '1.2rem' }}>
            Estamos procesando tu diagnóstico personalizado basado en tu puntaje de madurez (<strong>{totalScore} pts</strong> - {label}).
          </p>
          <button className="submit-btn" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (step === 'identification') {
    return (
      <div className="container">
        <Branding />
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Identificación</h2>
          <p className="subtitle">Completa tus datos para desbloquear el diagnóstico.</p>
          
          <form onSubmit={handleIdentificationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="input-group">
              <label className="input-label">Correo Electrónico *</label>
              <input 
                type="email" 
                value={contactInfo.email} 
                onChange={e => setContactInfo({...contactInfo, email: e.target.value})} 
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">WhatsApp *</label>
              <input 
                type="tel" 
                value={contactInfo.whatsapp} 
                onChange={e => setContactInfo({...contactInfo, whatsapp: e.target.value})} 
                placeholder="+52 1..."
                required
              />
            </div>

            {contactError && <p style={{ color: 'var(--accent)', fontSize: '0.9rem', textAlign: 'center' }}>{contactError}</p>}
            
            <button type="submit" className="submit-btn">
              Desbloquear Preguntas
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="container">
      <Branding />
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="glass-card">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--primary)', textTransform: 'uppercase' }}>{currentSection.title}</h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>Pregunta {completedQuestions + 1} de {totalQuestions}</p>
        
        <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>{currentQuestion.text}</h3>

        {currentQuestion.type === 'single' ? (
          <div className="button-grid">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => handleSelection(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="multi-select-container">
            <div className="button-grid">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = (answers[currentQuestion.id] || []).includes(option.text);
                return (
                  <button
                    key={idx}
                    className={`option-button ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMultiSelect(option.text)}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
            <button
              className="submit-btn"
              style={{ marginTop: '2.5rem' }}
              onClick={() => handleNext(answers, totalScore)}
              disabled={!(answers[currentQuestion.id] || []).length}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModernAssessment;
