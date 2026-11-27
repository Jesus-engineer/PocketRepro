export type DemoVariant = 'broken' | 'fixed'

export const incident = {
  service: 'Corporate email access',
  summary: 'Outlook repeatedly prompts for sign-in, blocking access to email.',
  severity: 'Medium',
  affectedTeam: 'Finance',
} as const

export function registerIncident(variant: DemoVariant): string {
  if (variant === 'broken') {
    throw new TypeError('Could not register the incident')
  }

  return 'Incident registered. Ticket INC-1042'
}
