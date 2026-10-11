import type { Prediction, Sport } from './data'

export const SPORT_IDS: Sport[] = ['football', 'basketball', 'hockey', 'handball']

export const SPORTS: Record<Sport, { name: string; blurb: string }> = {
  football: { name: 'Football', blurb: 'Daily football predictions with odds and win probability, across the top leagues and the lower divisions.' },
  basketball: { name: 'Basketball', blurb: 'Basketball predictions with winners and totals from the NBA and the top European leagues.' },
  hockey: { name: 'Hockey', blurb: 'Hockey predictions for the NHL and the leading European leagues, with winners and goal totals.' },
  handball: { name: 'Handball', blurb: 'Handball predictions from the top European leagues, including winners and total goals.' },
}

export interface MarketPage {
  slug: string
  menu: string
  title: string
  blurb: string
  match: (r: Prediction) => boolean
  combo?: number
  single?: boolean
}

const t = (...tips: string[]) => (r: Prediction) => tips.includes(r.tip)
const all = () => true

export const MARKET_PAGES: MarketPage[] = [
  { slug: 'free-tips', menu: 'Free Tips', title: 'Free football tips', blurb: 'Every free tip for the day in one place, each with odds and a win probability.', match: all },
  { slug: 'all-predictions', menu: 'All Predictions', title: 'All football predictions', blurb: 'The full list of football predictions for the day across every league and market.', match: all },
  { slug: 'banker-tips', menu: 'Banker Tips', title: 'Football banker tips', blurb: 'Our highest-confidence picks of the day, the ones we rate at 80% or better.', match: (r) => r.prob >= 80 },
  { slug: 'free-2-odds', menu: 'Free 2 Odds', title: 'Free 2 odds football tips', blurb: 'A daily pick built from our strongest tips, with combined odds of about 2.', match: all, combo: 2 },
  { slug: 'double-chance', menu: 'Double Chance', title: 'Double chance predictions', blurb: 'Safer picks that cover two of the three results: home or draw, away or draw, home or away.', match: t('1X', 'X2', '12') },
  { slug: 'over-1-5-goals', menu: 'Over 1.5 Goals', title: 'Over 1.5 goals predictions', blurb: 'Matches where we expect at least two goals.', match: t('Over 1.5') },
  { slug: 'over-2-5-goals', menu: 'Over 2.5 Goals', title: 'Over 2.5 goals predictions', blurb: 'Matches where we expect three goals or more.', match: t('Over 2.5') },
  { slug: 'super-single', menu: 'Super Single', title: 'Super single football tip', blurb: 'One pick a day, the single tip we trust most.', match: all, single: true },
  { slug: 'btts', menu: 'BTTS / GG', title: 'Both teams to score predictions', blurb: 'Matches where we expect both sides to find the net.', match: t('BTTS') },
  { slug: 'over-under-3-5', menu: 'O/U 3.5 Goals', title: 'Over and under 3.5 goals predictions', blurb: 'Our picks on whether a match goes over or stays under 3.5 goals.', match: t('Over 3.5', 'Under 3.5') },
  { slug: 'draws', menu: 'Draws', title: 'Football draw predictions', blurb: 'Matches we think will end level.', match: t('X') },
  { slug: 'home-win', menu: 'Home Win', title: 'Home win predictions', blurb: 'Matches where we back the home side.', match: t('1') },
  { slug: 'away-win', menu: 'Away Win', title: 'Away win predictions', blurb: 'Matches where we back the visitors.', match: t('2') },
]

export interface MenuItem {
  label: string
  to?: string
  children?: { label: string; to: string }[]
}

export const MENU: MenuItem[] = [
  { label: 'Football Markets', children: MARKET_PAGES.map((m) => ({ label: m.menu, to: `/football/${m.slug}` })) },
  {
    label: 'Other Sports',
    children: [
      { label: 'Basketball', to: '/basketball' },
      { label: 'Hockey', to: '/hockey' },
      { label: 'Handball', to: '/handball' },
    ],
  },
]

export interface SportTheme {
  line1: string
  line2: string
  blurb: string
  image: string
  tile: string
  league: (league: string) => boolean
  markets: { name: string; match: (tip: string) => boolean }[]
}

const totals = (t: string) => t.startsWith('Over') || t.startsWith('Under')
const generic: SportTheme['markets'] = [
  { name: 'All', match: () => true },
  { name: 'Winner', match: (t) => t === '1' || t === '2' },
  { name: 'Totals', match: totals },
]

export const THEME: Record<Sport, SportTheme> = {
  football: {
    line1: "Today's", line2: 'football tips',
    blurb: 'Researched picks with odds and win probability. Every tip is logged, win or lose.',
    image: '/hero.webp', tile: 'Premier League', league: (l) => l.startsWith('England'),
    markets: [
      { name: 'All', match: () => true },
      { name: '1X2', match: (t) => t === '1' || t === 'X' || t === '2' },
      { name: 'O/U', match: totals },
      { name: 'DC', match: (t) => t === '1X' || t === 'X2' || t === '12' },
      { name: 'BTTS', match: (t) => t === 'BTTS' },
    ],
  },
  basketball: {
    line1: "Today's", line2: 'basketball picks',
    blurb: 'Winners and totals from the NBA and the top European leagues, with odds and win probability.',
    image: '/hero-basketball.webp', tile: 'NBA', league: (l) => l.includes('NBA'), markets: generic,
  },
  hockey: {
    line1: "Today's", line2: 'hockey picks',
    blurb: 'Winners and goal totals from the NHL and the leading European leagues.',
    image: '/hero-hockey.webp', tile: 'NHL', league: (l) => l.includes('NHL'), markets: generic,
  },
  handball: {
    line1: "Today's", line2: 'handball picks',
    blurb: 'Winners and goal totals from the top European handball leagues.',
    image: '/hero-handball.webp', tile: 'Bundesliga', league: (l) => l.startsWith('Germany'), markets: generic,
  },
}
