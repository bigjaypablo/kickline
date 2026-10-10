import type { Prediction } from './data'

export type Form = 'W' | 'D' | 'L'

const hash = (s: string) => {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

// MOCK ONLY. Real form and reasoning will come from the database.
export function mockForm(key: string): Form[] {
  let h = hash(key)
  return Array.from({ length: 5 }, () => {
    h = (h * 1103515245 + 12345) >>> 0
    const n = h % 10
    return n < 5 ? 'W' : n < 8 ? 'D' : 'L'
  })
}

export const mockReason = (p: Prediction) =>
  `Placeholder analysis for ${p.home} vs ${p.away}. The owner's real reasoning will show here once the admin panel is built.`
