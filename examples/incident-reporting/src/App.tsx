import { useState } from 'react'
import { incident, registerIncident, type DemoVariant } from './incident'

type Phase = 'idle' | 'loading' | 'confirmed'

const incidentPath = '/incidents'
const submitLabel: Record<Phase, string> = {
  idle: 'Register incident',
  loading: 'Registering...',
  confirmed: 'Registered',
}

export function App({ variant = 'broken' }: { variant?: DemoVariant }) {
  const [selected, setSelected] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [confirmation, setConfirmation] = useState<string | null>(null)

  function submitIncident() {
    if (!selected || phase !== 'idle') return

    setPhase('loading')
    // Throw outside the click handler so the browser reports the error on window.
    window.setTimeout(() => {
      setConfirmation(registerIncident(variant))
      setPhase('confirmed')
    }, 120)
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href={incidentPath}>
            <span className="brand-mark" aria-hidden="true" />
            Service desk
          </a>
          <span className="environment">Test environment</span>
        </div>
      </header>

      <main className="page">
        <div className="page-heading">
          <h1>IT incident reporting</h1>
          <p>Select the test incident to register it with the service desk.</p>
        </div>

        {window.location.pathname === incidentPath ? (
          <div className="incident-grid">
            <section className="incident-card" aria-labelledby="details-title">
              <h2 id="details-title">Incident details</h2>
              <p className="incident-summary">{incident.summary}</p>
              <dl className="incident-details">
                <div>
                  <dt>Severity</dt>
                  <dd>{incident.severity}</dd>
                </div>
                <div>
                  <dt>Affected team</dt>
                  <dd>{incident.affectedTeam}</dd>
                </div>
              </dl>
            </section>

            <section className="incident-card" aria-labelledby="selection-title">
              <h2 id="selection-title">Select an incident</h2>
              <fieldset
                className="incident-selection"
                aria-labelledby="selection-title"
                disabled={phase !== 'idle'}
              >
                <button
                  className="incident-option"
                  type="button"
                  data-action-alias="select-incident"
                  aria-pressed={selected}
                  onClick={() => setSelected(true)}
                >
                  {incident.service}
                  <span className="selection-indicator" aria-hidden="true" />
                </button>
              </fieldset>

              <button
                className="submit-button"
                type="button"
                data-action-alias="submit-incident"
                disabled={!selected || phase !== 'idle'}
                onClick={submitIncident}
              >
                {submitLabel[phase]}
              </button>

              {phase === 'confirmed' ? <p className="confirmation" role="status">{confirmation}</p> : null}
            </section>
          </div>
        ) : (
          <a className="entry-link" href={incidentPath}>Report an incident</a>
        )}
      </main>
    </>
  )
}
