export const LEAGUES = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'] as const
export type League = (typeof LEAGUES)[number]

// team, played, won, drawn, lost, goal difference, points
export type StandRow = [string, number, number, number, number, number, number]
// player, team, matches, goals
export type ScorerRow = [string, string, number, number]

// MOCK SAMPLE DATA. Do not ship. These come from the football API later.
export const STANDINGS: Record<League, StandRow[]> = {
  'Premier League': [
    ['Man City', 6, 5, 1, 0, 12, 16], ['Arsenal', 6, 4, 1, 1, 7, 13], ['Liverpool', 6, 4, 0, 2, 5, 12],
    ['Brighton', 6, 3, 2, 1, 4, 11], ['Chelsea', 6, 3, 1, 2, 2, 10], ['Brentford', 6, 3, 0, 3, 0, 9],
  ],
  'La Liga': [
    ['Real Madrid', 6, 5, 1, 0, 11, 16], ['Barcelona', 6, 5, 0, 1, 9, 15], ['Atlético Madrid', 6, 4, 1, 1, 6, 13],
    ['Girona', 6, 3, 2, 1, 4, 11], ['Athletic Club', 6, 3, 1, 2, 2, 10], ['Sevilla', 6, 2, 2, 2, 0, 8],
  ],
  'Serie A': [
    ['Inter', 6, 5, 0, 1, 10, 15], ['Juventus', 6, 4, 2, 0, 6, 14], ['Milan', 6, 4, 1, 1, 5, 13],
    ['Napoli', 6, 3, 2, 1, 4, 11], ['Roma', 6, 3, 1, 2, 1, 10], ['Lazio', 6, 2, 2, 2, 0, 8],
  ],
  Bundesliga: [
    ['Bayern München', 6, 6, 0, 0, 15, 18], ['Leverkusen', 6, 4, 1, 1, 8, 13], ['Dortmund', 6, 4, 0, 2, 5, 12],
    ['Leipzig', 6, 3, 2, 1, 4, 11], ['Stuttgart', 6, 3, 1, 2, 2, 10], ['Augsburg', 6, 1, 2, 3, -3, 5],
  ],
  'Ligue 1': [
    ['PSG', 6, 5, 1, 0, 13, 16], ['Monaco', 6, 4, 1, 1, 6, 13], ['Marseille', 6, 4, 0, 2, 4, 12],
    ['Lille', 6, 3, 2, 1, 3, 11], ['Lyon', 6, 3, 1, 2, 1, 10], ['Nantes', 6, 1, 2, 3, -4, 5],
  ],
}

export const SCORERS: Record<League, ScorerRow[]> = {
  'Premier League': [['E. Haaland', 'Man City', 6, 7], ['M. Salah', 'Liverpool', 6, 5], ['B. Saka', 'Arsenal', 6, 4], ['C. Palmer', 'Chelsea', 6, 4]],
  'La Liga': [['K. Mbappé', 'Real Madrid', 6, 6], ['R. Lewandowski', 'Barcelona', 6, 5], ['Vinícius Jr', 'Real Madrid', 6, 4], ['A. Griezmann', 'Atlético Madrid', 6, 3]],
  'Serie A': [['L. Martínez', 'Inter', 6, 6], ['D. Vlahović', 'Juventus', 6, 4], ['R. Leão', 'Milan', 6, 4], ['M. Thuram', 'Inter', 6, 3]],
  Bundesliga: [['H. Kane', 'Bayern München', 6, 8], ['S. Guirassy', 'Dortmund', 6, 5], ['P. Schick', 'Leverkusen', 6, 4], ['D. Undav', 'Stuttgart', 6, 3]],
  'Ligue 1': [['O. Dembélé', 'PSG', 6, 6], ['A. Lacazette', 'Lyon', 6, 4], ['J. David', 'Lille', 6, 4], ['W. Ben Yedder', 'Monaco', 6, 3]],
}
