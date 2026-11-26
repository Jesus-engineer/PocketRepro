import { describe, expect, it } from 'vitest'
import { appointment, confirmBooking } from './booking'

describe('confirmBooking', () => {
  it('lanza el TypeError deliberado en la variante rota', () => {
    expect(() => confirmBooking('broken', appointment.time)).toThrow(TypeError)
  })

  it('confirma el mismo turno en la variante corregida', () => {
    expect(confirmBooking('fixed', appointment.time)).toBe('Reserva confirmada para las 15:20')
  })
})
