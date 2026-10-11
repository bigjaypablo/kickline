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
  sport?: Sport
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

export const MARKETS: { name: string; match: (tip: string) => boolean }[] = [
  { name: 'All', match: () => true },
  { name: '1X2', match: (t) => t === '1' || t === 'X' || t === '2' },
  { name: 'O/U', match: (t) => t.startsWith('Over') || t.startsWith('Under') },
  { name: 'DC', match: (t) => t === '1X' || t === 'X2' || t === '12' },
  { name: 'BTTS', match: (t) => t === 'BTTS' },
]

MOCK.push(
  p('12', -2, '14:00', 'England: Premier League', 'Newcastle', 'Everton', '1', 1.4, 71, 'won'),
  p('13', -2, '16:30', 'Germany: Bundesliga', 'Dortmund', 'Mainz', 'Over 1.5', 1.2, 84, 'won'),
  p('14', -2, '19:00', 'Spain: La Liga', 'Valencia', 'Osasuna', 'X2', 1.55, 66, 'lost'),
  p('15', -3, '15:00', 'Italy: Serie A', 'Napoli', 'Genoa', '1', 1.3, 77, 'won'),
  p('16', -3, '17:30', 'France: Ligue 1', 'Lille', 'Brest', 'Under 3.5', 1.25, 80, 'won'),
)

export async function getRecent(days = 5): Promise<Prediction[]> {
  return MOCK.filter((x) => x.date < day(0) && x.date >= day(-days) && x.result !== 'pending').sort((a, b) =>
    a.date < b.date ? 1 : -1
  )
}

export type Sport = 'football' | 'basketball' | 'hockey' | 'handball'
export const sportOf = (r: Prediction): Sport => r.sport ?? 'football'

const s = (sport: Sport, ...args: Parameters<typeof p>): Prediction => ({ ...p(...args), sport })

// MOCK rows so every market and sport page has something to show
MOCK.push(
  p('17', 0, '12:30', 'Spain: La Liga', 'Getafe', 'Valencia', 'X', 3.1, 34, 'pending'),
  p('18', 0, '15:30', 'England: Premier League', 'Brentford', 'Fulham', 'BTTS', 1.72, 58, 'pending'),
  p('19', 0, '17:00', 'Netherlands: Eredivisie', 'Ajax', 'Utrecht', 'Over 2.5', 1.65, 61, 'pending'),
  p('20', 0, '19:45', 'Italy: Serie A', 'Atalanta', 'Bologna', '1X', 1.28, 78, 'pending'),
  p('21', 0, '20:00', 'Spain: La Liga', 'Girona', 'Alavés', 'Over 3.5', 2.35, 40, 'pending'),
  p('22', 0, '18:30', 'Germany: Bundesliga', 'Köln', 'Hamburg', '12', 1.3, 77, 'pending'),
  s('basketball', 'b1', 0, '19:00', 'USA: NBA', 'Boston Celtics', 'Chicago Bulls', '1', 1.35, 76, 'pending'),
  s('basketball', 'b2', 0, '21:30', 'USA: NBA', 'LA Lakers', 'Utah Jazz', 'Over 224.5', 1.85, 57, 'pending'),
  s('basketball', 'b3', 0, '20:00', 'Spain: ACB', 'Real Madrid', 'Valencia Basket', '1', 1.28, 79, 'pending'),
  s('hockey', 'h1', 0, '19:30', 'USA: NHL', 'Boston Bruins', 'Detroit Red Wings', '1', 1.6, 64, 'pending'),
  s('hockey', 'h2', 0, '18:00', 'Sweden: SHL', 'Frölunda', 'Linköping', 'Over 5.5', 1.8, 60, 'pending'),
  s('handball', 'g1', 0, '18:30', 'Germany: Bundesliga', 'THW Kiel', 'Melsungen', '1', 1.3, 78, 'pending'),
  s('handball', 'g2', 0, '20:00', 'France: Starligue', 'PSG Handball', 'Nantes', 'Over 58.5', 1.75, 62, 'pending'),
  s('handball', 'g3', 1, '19:00', 'Denmark: Håndboldligaen', 'Aalborg', 'Skjern', '1', 1.4, 72, 'pending'),
)
