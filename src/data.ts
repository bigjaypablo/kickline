export type Result = 'won' | 'lost' | 'pending'

export interface Prediction {
  id: string
  date: string
  time: string
  league: string
  home: string
  away: string
  tip: string
  odds: number
  prob: number
  result: Result
}

export const day = (offset: number) =>
  new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10)

export const FILTERS: { name: string; match: (tip: string) => boolean }[] = [
  { name: 'All', match: () => true },
  { name: 'Home', match: (t) => t === '1' },
  { name: 'Away', match: (t) => t === '2' },
  { name: 'Draw', match: (t) => t === 'X' },
  { name: 'Double chance', match: (t) => t === '1X' || t === 'X2' },
  { name: 'Goals', match: (t) => t.startsWith('Over') || t.startsWith('Under') },
  { name: 'BTTS', match: (t) => t === 'BTTS' },
]

const p = (
  id: string, d: number, time: string, league: string,
  home: string, away: string, tip: string, odds: number, prob: number, result: Result
): Prediction => ({ id, date: day(d), time, league, home, away, tip, odds, prob, result })

// MOCK DATA. Replace this with a Supabase query later.
const MOCK: Prediction[] = [
  p('1', -1, '15:00', 'England: Premier League', 'Arsenal', 'Brentford', '1', 1.35, 74, 'won'),
  p('2', -1, '17:30', 'Spain: La Liga', 'Getafe', 'Sevilla', 'Under 3.5', 1.28, 78, 'won'),
  p('3', -1, '20:00', 'Italy: Serie A', 'Lazio', 'Torino', 'Over 1.5', 1.30, 77, 'lost'),
  p('4', 0, '13:30', 'Germany: Bundesliga', 'FC Augsburg', 'Bayern München', '2', 1.21, 83, 'pending'),
  p('5', 0, '14:00', 'N. Ireland: Premiership', 'Crusaders', 'Larne', 'X2', 1.26, 79, 'pending'),
  p('6', 0, '15:00', 'Austria: Bundesliga', 'Grazer AK', 'Red Bull Salzburg', '2', 1.46, 68, 'pending'),
  p('7', 0, '16:30', 'France: Ligue 1', 'Lille', 'Nantes', 'Over 1.5', 1.24, 80, 'pending'),
  p('8', 0, '18:00', 'Sweden: Allsvenskan', 'IF Elfsborg', 'Halmstad', '1', 1.33, 75, 'pending'),
  p('9', 1, '15:30', 'Sweden: Allsvenskan', 'BK Hacken', 'Orgryte IS', '1', 1.30, 76, 'pending'),
  p('10', 1, '17:00', 'Cyprus: First Division', 'AEK Larnaca', 'Omonia Aradippou', '1', 1.27, 77, 'pending'),
  p('11', 2, '19:00', 'Portugal: Liga', 'Benfica', 'Casa Pia', 'Over 1.5', 1.22, 82, 'pending'),
]

export async function getPredictions(date: string): Promise<Prediction[]> {
  return MOCK.filter((x) => x.date === date)
}
