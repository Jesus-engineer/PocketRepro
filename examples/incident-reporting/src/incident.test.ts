import { describe, expect, it } from 'vitest'
import { registerIncident } from './incident'

describe('registerIncident', () => {
  it('throws the intentional TypeError in the broken variant', () => {
    expect(() => registerIncident('broken')).toThrow(TypeError)
  })

  it('confirms the ticket in the fixed variant', () => {
    expect(registerIncident('fixed')).toBe('Incident registered. Ticket INC-1042')
  })
})
