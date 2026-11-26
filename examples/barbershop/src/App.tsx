import { useState } from 'react'
import { appointment, confirmBooking, type DemoVariant } from './booking'

type Phase = 'idle' | 'loading' | 'confirmed'

export function App({ variant = 'broken' }: { variant?: DemoVariant }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [confirmation, setConfirmation] = useState<string | null>(null)

  if (window.location.pathname !== '/citas') {
    return (
      <main className="page route-entry">
        <p className="eyebrow">Barberia Norte / Demo local</p>
        <h1>Una cita a tu ritmo.</h1>
        <a className="entry-link" href="/citas">Abrir citas</a>
      </main>
    )
  }

  function reserve() {
    if (!selectedTime || phase !== 'idle') return

    setPhase('loading')
    // El fallo ocurre fuera del handler para que Chrome lo informe a window.error.
    window.setTimeout(() => {
      const result = confirmBooking(variant, selectedTime)
      setConfirmation(result)
      setPhase('confirmed')
    }, 120)
  }

  return (
    <main className="page">
      <header className="site-header">
        <a className="wordmark" href="/citas" aria-label="Barberia Norte, citas">
          <span className="brand-mark" aria-hidden="true">BN</span>
          <span>Barberia Norte</span>
        </a>
        <span className="header-note">Demo de citas</span>
      </header>

      <div className="content-grid">
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">Un momento para ti</p>
          <h1 id="intro-title">Tu proximo corte empieza aqui.</h1>
          <p className="intro-copy">
            Elige un turno de prueba y confirma tu cita. No hacen falta datos personales.
          </p>
          <div className="info-card">
            <span className="info-icon" aria-hidden="true">*</span>
            <div>
              <strong>Una demo, dos resultados</strong>
              <p>El mismo recorrido permite comprobar un fallo y su correccion.</p>
            </div>
          </div>
        </section>

        <section className="booking-card" aria-labelledby="booking-title">
          <div className="card-topline">
            <span className="step-label">01 / Elige tu turno</span>
            <span className="available">Disponible</span>
          </div>
          <h2 id="booking-title">Reserva tu cita</h2>
          <p className="card-description">Un turno ficticio para probar el flujo de reserva.</p>

          <div className="service-row">
            <span>Servicio</span>
            <strong>{appointment.service}</strong>
          </div>

          <fieldset className="slot-fieldset" disabled={phase !== 'idle'}>
            <legend>Horario disponible</legend>
            <button
              className={`slot-button${selectedTime ? ' selected' : ''}`}
              type="button"
              data-action-alias="select-slot"
              aria-pressed={selectedTime !== null}
              onClick={() => setSelectedTime(appointment.time)}
            >
              <span>{appointment.time}</span>
              <span className="slot-hint">Turno de prueba</span>
            </button>
          </fieldset>

          <button
            className="reserve-button"
            type="button"
            data-action-alias="reserve"
            disabled={!selectedTime || phase !== 'idle'}
            onClick={reserve}
          >
            {phase === 'loading' ? 'Reservando...' : 'Reservar'}
            {phase === 'idle' && <span aria-hidden="true">&gt;</span>}
          </button>

          {phase === 'confirmed' && <p className="confirmation" role="status">{confirmation}</p>}
          <p className="card-footnote">Sin pago ni cuenta. Usa solo datos de prueba.</p>
        </section>
      </div>
      <footer className="site-footer">Barberia Norte - Sitio ficticio para PocketRepro</footer>
    </main>
  )
}
