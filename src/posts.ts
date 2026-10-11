export type Cat = 'Football' | 'Basketball' | 'Hockey' | 'Handball' | 'Guides'

export interface Post {
  slug: string
  title: string
  excerpt: string
  cat: Cat
  art: 'football' | 'basketball' | 'hockey' | 'handball' | 'guide'
  date: string
  mins: number
  image?: string
  body: string[]
}

export const POSTS: Post[] = [
  {
    slug: 'how-to-read-team-form', title: 'How to read team form before you bet',
    excerpt: 'Five matches tell you a lot, but only if you know what to look for. Here is how we read form.',
    cat: 'Guides', art: 'football', date: '2026-10-09', mins: 4, image: '/blog/how-to-read-team-form.webp',
    body: [
      '## Look past the last result',
      'A team on a three-game winning streak is not always in form. Check who they beat, whether they played at home, and how the goals came.',
      '## Compare home and away',
      'Many sides play two different seasons, one at home and one on the road. Always read the venue split before you trust an overall run.',
    ],
  },
  {
    slug: 'over-2-5-goals-when-it-works', title: 'Over 2.5 goals: when it actually works',
    excerpt: 'Goals markets look simple, but the best spots follow a pattern. These are the signals we check first.',
    cat: 'Football', art: 'football', date: '2026-10-07', mins: 5, image: '/blog/over-2-5-goals-when-it-works.webp',
    body: [
      '## Attack against a leaky defence',
      'The cleanest over 2.5 spots pair a side that creates chances with one that concedes them. Check goals scored and conceded in the last six games, not the whole season.',
      '## Know when to stay away',
      'Cup ties, tight derbies and matches with a lot at stake tend to be cagey. A high line is not worth taking just because the odds look good.',
    ],
  },
  {
    slug: 'bankroll-basics-for-tips', title: 'Bankroll basics for following football tips',
    excerpt: 'Good tips do not help if one bad weekend wipes you out. A few simple rules keep you in the game.',
    cat: 'Guides', art: 'guide', date: '2026-10-05', mins: 3, image: '/blog/bankroll-basics-for-tips.webp',
    body: [
      '## Decide the budget first',
      'Pick an amount you can afford to lose entirely and treat it as entertainment money. Never top it up after a loss.',
      '## Keep stakes small and steady',
      'Staking a small, fixed share on each tip protects you from the swings that every tipster has. Chasing losses is how small problems become big ones.',
    ],
  },
  {
    slug: 'basketball-totals-explained', title: 'Basketball totals: how to judge an over/under line',
    excerpt: 'Totals are a big part of basketball betting. Here is what moves the line and what to check before you pick a side.',
    cat: 'Basketball', art: 'basketball', date: '2026-10-03', mins: 4, image: '/blog/basketball-totals-explained.webp',
    body: [
      '## Pace decides most totals',
      'Two fast teams produce more possessions and more points. Compare each side possessions per game before you look at anything else.',
      '## Check injuries and rest',
      'A missing starter or the second night of a back-to-back can pull a total down. Lines move quickly on this news, so check late.',
    ],
  },
  {
    slug: 'hockey-moneyline-puck-line-totals', title: 'Hockey betting basics: moneyline, puck line and totals',
    excerpt: 'Hockey is low scoring and full of upsets. Knowing the three main markets helps you pick the right one.',
    cat: 'Hockey', art: 'hockey', date: '2026-10-01', mins: 5, image: '/blog/hockey-moneyline-puck-line-totals.webp',
    body: [
      '## Three markets, three risks',
      'The moneyline is a straight winner. The puck line is a handicap, usually 1.5 goals. Totals ask whether the combined goals go over or under a set number.',
      '## Goaltending matters',
      'One hot or cold goalie can change a game. Check who is starting before you decide on a side or a total.',
    ],
  },
  {
    slug: 'handball-goal-totals', title: 'Handball predictions: why goal totals run so high',
    excerpt: 'Handball scores are far higher than football, so the numbers look strange at first. Here is how to read them.',
    cat: 'Handball', art: 'handball', date: '2026-09-28', mins: 4, image: '/blog/handball-goal-totals.webp',
    body: [
      '## High scoring is normal',
      'Matches in the top leagues often finish with well over fifty combined goals, so a total line sits far above what football fans expect.',
      '## Tempo and goalkeepers',
      'Fast teams and weak goalkeeping push totals up. Slow, structured sides and strong keepers pull them down. Check both before you choose.',
    ],
  },
]

// Ordered lists. The admin panel will control these later.
export const TRENDING: string[] = [
  'over-2-5-goals-when-it-works',
  'how-to-read-team-form',
  'basketball-totals-explained',
  'bankroll-basics-for-tips',
  'hockey-moneyline-puck-line-totals',
]
export const FEATURED: string[] = [
  'how-to-read-team-form',
  'handball-goal-totals',
  'basketball-totals-explained',
  'hockey-moneyline-puck-line-totals',
]
export const pickPosts = (slugs: string[]) =>
  slugs.map((s) => POSTS.find((p) => p.slug === s)).filter((p): p is Post => Boolean(p))
