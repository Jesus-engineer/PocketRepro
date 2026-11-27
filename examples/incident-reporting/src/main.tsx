import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import type { DemoVariant } from './incident'
import './styles.css'

const variant: DemoVariant = import.meta.env.VITE_DEMO_VARIANT === 'fixed' ? 'fixed' : 'broken'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App variant={variant} />
  </StrictMode>,
)
