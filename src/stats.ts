export const LEAGUES = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'] as const
export type League = (typeof LEAGUES)[number]
export type Res = 'W' | 'D' | 'L'
export type View = 'all' | 'home' | 'away'

export interface Rec { p: number; w: number; d: number; l: number; gf: number; ga: number }
export interface TeamStats {
  team: string
  all: Rec
  home: Rec
  away: Rec
  form: Res[]
  btts: number
  o25: number
  cs: number
  yc: number
  rc: number
}
export interface Row extends Rec { team: string; gd: number; pts: number; form: Res[] }
export interface Zones { ucl: number; uel: number; rel: number }
export type Scorer = [name: string, team: string, goals: number, assists: number]

export const PLAYED = 8

// MOCK SAMPLE DATA, generated. Do not ship. Real data comes from the football API later.
const CFG: Record<League, { zones: Zones; teams: string[] }> = {
  'Premier League': {
    zones: { ucl: 4, uel: 1, rel: 3 },
    teams: ['Man City', 'Arsenal', 'Liverpool', 'Chelsea', 'Tottenham', 'Man United', 'Newcastle', 'Aston Villa', 'Brighton', 'West Ham', 'Brentford', 'Fulham', 'Crystal Palace', 'Everton', 'Wolves', 'Bournemouth', 'Nottm Forest', 'Leeds', 'Burnley', 'Sunderland'],
  },
  'La Liga': {
    zones: { ucl: 4, uel: 1, rel: 3 },
    teams: ['Real Madrid', 'Barcelona', 'Atlético Madrid', 'Athletic Club', 'Real Sociedad', 'Villarreal', 'Real Betis', 'Sevilla', 'Valencia', 'Girona', 'Getafe', 'Osasuna', 'Celta Vigo', 'Mallorca', 'Rayo Vallecano', 'Alavés', 'Espanyol', 'Elche', 'Levante', 'Oviedo'],
  },
  'Serie A': {
    zones: { ucl: 4, uel: 1, rel: 3 },
    teams: ['Inter', 'Napoli', 'Juventus', 'Milan', 'Atalanta', 'Roma', 'Lazio', 'Fiorentina', 'Bologna', 'Torino', 'Udinese', 'Genoa', 'Cagliari', 'Lecce', 'Parma', 'Verona', 'Como', 'Sassuolo', 'Pisa', 'Cremonese'],
  },
  Bundesliga: {
    zones: { ucl: 4, uel: 1, rel: 2 },
    teams: ['Bayern München', 'Leverkusen', 'Dortmund', 'Leipzig', 'Stuttgart', 'Eintracht Frankfurt', 'Freiburg', 'Hoffenheim', 'Wolfsburg', 'Mainz', 'Gladbach', 'Augsburg', 'Werder Bremen', 'Union Berlin', 'Heidenheim', 'St. Pauli', 'Köln', 'Hamburg'],
  },
  'Ligue 1': {
    zones: { ucl: 3, uel: 1, rel: 2 },
    teams: ['PSG', 'Marseille', 'Monaco', 'Lille', 'Lyon', 'Nice', 'Lens', 'Rennes', 'Strasbourg', 'Brest', 'Nantes', 'Toulouse', 'Auxerre', 'Angers', 'Le Havre', 'Lorient', 'Paris FC', 'Metz'],
  },
}

export const ZONES = Object.fromEntries(LEAGUES.map((l) => [l, CFG[l].zones])) as Record<League, Zones>

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const hash = (s: string) => {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

function build(team: string, i: number, n: number, r: () => number): TeamStats {
  const s = 1 - i / n
  const rec = (): Rec => ({ p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 })
  const all = rec(), home = rec(), away = rec()
  const res: Res[] = []
  let btts = 0, o25 = 0, cs = 0
  for (let g = 0; g < PLAYED; g++) {
    const isHome = g % 2 === 0
    const gf = Math.max(0, Math.round(0.6 + s * 1.6 + (isHome ? 0.3 : 0) + (r() - 0.5) * 3))
    const ga = Math.max(0, Math.round(2 - s * 1.2 - (isHome ? 0.2 : 0) + (r() - 0.5) * 3))
    const o: Res = gf > ga ? 'W' : gf === ga ? 'D' : 'L'
    res.push(o)
    for (const t of [all, isHome ? home : away]) {
      t.p++
      t.gf += gf
      t.ga += ga
      t[o === 'W' ? 'w' : o === 'D' ? 'd' : 'l']++
    }
    if (gf > 0 && ga > 0) btts++
    if (gf + ga >= 3) o25++
    if (ga === 0) cs++
  }
  return {
    team, all, home, away, form: res.slice(-5), btts, o25, cs,
    yc: Math.round(PLAYED * (1.3 + r() * 1.7)),
    rc: Math.floor(r() * 2.2),
  }
}

const DATA = Object.fromEntries(
  LEAGUES.map((l) => {
    const r = rng(hash(l))
    const { teams } = CFG[l]
    return [l, teams.map((t, i) => build(t, i, teams.length, r))]
  })
) as Record<League, TeamStats[]>

export const getTeams = (l: League) => DATA[l]

export function getTable(league: League, view: View): Row[] {
  return DATA[league]
    .map((t) => {
      const x = t[view]
      return { team: t.team, ...x, gd: x.gf - x.ga, pts: x.w * 3 + x.d, form: t.form }
    })
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
}

export const SCORERS: Record<League, Scorer[]> = {
  'Premier League': [
    ['E. Haaland', 'Man City', 9, 2], ['M. Salah', 'Liverpool', 7, 5], ['B. Saka', 'Arsenal', 6, 4],
    ['C. Palmer', 'Chelsea', 6, 3], ['O. Watkins', 'Aston Villa', 5, 2], ['B. Mbeumo', 'Man United', 5, 3],
    ['K. Havertz', 'Arsenal', 4, 2], ['A. Isak', 'Newcastle', 4, 1], ['B. Fernandes', 'Man United', 3, 6], ['M. Ødegaard', 'Arsenal', 2, 5],
  ],
  'La Liga': [
    ['K. Mbappé', 'Real Madrid', 8, 2], ['R. Lewandowski', 'Barcelona', 7, 1], ['Vinícius Jr', 'Real Madrid', 6, 4],
    ['L. Yamal', 'Barcelona', 5, 6], ['A. Griezmann', 'Atlético Madrid', 5, 3], ['A. Sørloth', 'Villarreal', 5, 1],
    ['Raphinha', 'Barcelona', 4, 5], ['I. Williams', 'Athletic Club', 4, 2], ['Isco', 'Real Betis', 3, 4], ['T. Kubo', 'Real Sociedad', 3, 3],
  ],
  'Serie A': [
    ['L. Martínez', 'Inter', 7, 2], ['M. Retegui', 'Atalanta', 6, 0], ['M. Thuram', 'Inter', 5, 3],
    ['D. Vlahović', 'Juventus', 5, 1], ['R. Leão', 'Milan', 4, 4], ['R. Højlund', 'Napoli', 4, 2],
    ['A. Lookman', 'Atalanta', 4, 3], ['P. Dybala', 'Roma', 3, 5], ['C. Pulisic', 'Milan', 3, 3], ['H. Çalhanoğlu', 'Inter', 2, 5],
  ],
  Bundesliga: [
    ['H. Kane', 'Bayern München', 9, 3], ['S. Guirassy', 'Dortmund', 6, 1], ['P. Schick', 'Leverkusen', 5, 2],
    ['D. Undav', 'Stuttgart', 5, 3], ['O. Marmoush', 'Eintracht Frankfurt', 5, 2], ['J. Musiala', 'Bayern München', 4, 4],
    ['L. Openda', 'Leipzig', 4, 1], ['F. Wirtz', 'Leverkusen', 3, 5], ['M. Olise', 'Bayern München', 3, 6], ['J. Brandt', 'Dortmund', 2, 5],
  ],
  'Ligue 1': [
    ['O. Dembélé', 'PSG', 6, 3], ['A. Lacazette', 'Lyon', 5, 2], ['J. David', 'Lille', 5, 1],
    ['M. Greenwood', 'Marseille', 5, 3], ['B. Barcola', 'PSG', 4, 4], ['W. Ben Yedder', 'Monaco', 4, 2],
    ['A. Gouiri', 'Rennes', 3, 3], ['F. Ruiz', 'PSG', 2, 4], ['M. Ounahi', 'Marseille', 2, 5], ['P. Højbjerg', 'Marseille', 1, 4],
  ],
}
