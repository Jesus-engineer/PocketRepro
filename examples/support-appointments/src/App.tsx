import { useState } from 'react'
import { appointment, confirmBooking, type DemoVariant } from './booking'

type Phase = 'idle' | 'loading' | 'confirmed'

const reservationLabel: Record<Phase, string> = {
  idle: 'Reservar',
  loading: 'Reservando...',
  confirmed: 'Reservado',
}

export function App({ variant = 'broken' }: { variant?: DemoVariant }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [confirmation, setConfirmation] = useState<string | null>(null)

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
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="/citas">
            <span className="brand-mark" aria-hidden="true" />
            Mesa de ayuda
          </a>
          <span className="environment">Entorno de prueba</span>
        </div>
      </header>

      <main className="page">
        <div className="page-heading">
          <h1>Agenda una cita de soporte</h1>
          <p>Elige un horario para una sesión con el equipo de soporte técnico.</p>
        </div>

        {window.location.pathname === '/citas' ? (
          <div className="appointment-grid">
            <section className="service-card" aria-labelledby="service-title">
              <h2 id="service-title">{appointment.service}</h2>
              <dl className="service-details">
                <div>
                  <dt>Duración</dt>
                  <dd>{appointment.duration}</dd>
                </div>
                <div>
                  <dt>Modalidad</dt>
                  <dd>{appointment.modality}</dd>
                </div>
              </dl>
            </section>

            <section className="booking-card" aria-labelledby="schedule-title">
              <h2 id="schedule-title">Horario disponible</h2>
              <fieldset
                className="slot-fieldset"
                aria-labelledby="schedule-title"
                disabled={phase !== 'idle'}
              >
                <button
                  className="slot-button"
                  type="button"
                  data-action-alias="select-slot"
                  aria-pressed={selectedTime !== null}
                  onClick={() => setSelectedTime(appointment.time)}
                >
                  <time dateTime={appointment.time}>{appointment.time}</time>
                  <span className="selection-indicator" aria-hidden="true" />
                </button>
              </fieldset>

              <button
                className="reserve-button"
                type="button"
                data-action-alias="reserve"
                disabled={!selectedTime || phase !== 'idle'}
                onClick={reserve}
              >
                {reservationLabel[phase]}
              </button>

              {phase === 'confirmed' ? <p className="confirmation" role="status">{confirmation}</p> : null}
            </section>
          </div>
        ) : (
          <a className="entry-link" href="/citas">Ver horarios</a>
        )}
      </main>
    </>
  )
}
