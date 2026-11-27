import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

beforeEach(() => {
  window.history.replaceState({}, '', '/incidents')
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('incident reporting', () => {
  it('links to incident reporting from the home page', () => {
    window.history.replaceState({}, '', '/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Report an incident' }).getAttribute('href')).toBe('/incidents')
    expect(screen.queryByRole('button', { name: 'Register incident' })).toBeNull()
  })

  it('requires selecting a service before registering an incident', () => {
    render(<App />)
    const submit = screen.getByRole<HTMLButtonElement>('button', { name: 'Register incident' })
    const service = screen.getByRole('button', { name: 'Corporate email access' })
    expect(submit.disabled).toBe(true)
    expect(submit.getAttribute('data-action-alias')).toBe('submit-incident')

    fireEvent.click(service)
    expect(submit.disabled).toBe(false)
    expect(service.getAttribute('aria-pressed')).toBe('true')
  })

  it('leaves the button loading when the intentional error occurs', () => {
    vi.useFakeTimers()
    render(<App variant="broken" />)
    fireEvent.click(screen.getByRole('button', { name: 'Corporate email access' }))
    fireEvent.click(screen.getByRole('button', { name: 'Register incident' }))

    expect(() => vi.runOnlyPendingTimers()).toThrow(TypeError)
    const submit = screen.getByRole<HTMLButtonElement>('button', { name: 'Registering...' })
    expect(submit.disabled).toBe(true)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('shows the ticket confirmation in the fixed variant', async () => {
    render(<App variant="fixed" />)
    fireEvent.click(screen.getByRole('button', { name: 'Corporate email access' }))
    fireEvent.click(screen.getByRole('button', { name: 'Register incident' }))

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toBe('Incident registered. Ticket INC-1042')
    })
    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Registered' }).disabled).toBe(true)
  })
})
