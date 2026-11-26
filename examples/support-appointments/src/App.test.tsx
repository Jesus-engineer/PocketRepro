import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

beforeEach(() => {
  window.history.replaceState({}, '', '/citas')
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('citas', () => {
  it('exige seleccionar un turno antes de reservar', () => {
    render(<App />)
    const reserve = screen.getByRole('button', { name: 'Reservar' })
    expect((reserve as HTMLButtonElement).disabled).toBe(true)

    fireEvent.click(screen.getByRole('button', { name: /15:20/ }))
    expect((reserve as HTMLButtonElement).disabled).toBe(false)
    expect(screen.getByRole('button', { name: /15:20/ }).getAttribute('aria-pressed')).toBe('true')
  })

  it('deja el boton cargando cuando ocurre el fallo intencional', () => {
    vi.spyOn(window, 'setTimeout').mockImplementation(() => 0)
    render(<App variant="broken" />)
    fireEvent.click(screen.getByRole('button', { name: /15:20/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Reservar' }))

    const reserve = screen.getByRole('button', { name: 'Reservando...' }) as HTMLButtonElement
    expect(reserve.disabled).toBe(true)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('muestra la confirmacion con el turno en la variante corregida', async () => {
    render(<App variant="fixed" />)
    fireEvent.click(screen.getByRole('button', { name: /15:20/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Reservar' }))

    await waitFor(() => {
      expect(screen.getByRole('status').textContent).toBe('Reserva confirmada para las 15:20')
    })
  })
})
