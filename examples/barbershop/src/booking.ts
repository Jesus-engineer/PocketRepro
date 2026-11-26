export type DemoVariant = 'broken' | 'fixed'

export const appointment = {
  service: 'Corte clasico',
  time: '15:20',
} as const

export function confirmBooking(variant: DemoVariant, time: string): string {
  if (variant === 'broken') {
    throw new TypeError('No se pudo confirmar el turno')
  }

  return `Reserva confirmada para las ${time}`
}
