import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const KEY = process.env.PIXABAY_KEY
if (!KEY) {
  console.error('Set PIXABAY_KEY first, for example: PIXABAY_KEY=yourkey node scripts/fetch-covers.mjs')
  process.exit(1)
}

// article slug -> what to search for
const QUERIES = {
  'how-to-read-team-form': 'football pitch',
  'over-2-5-goals-when-it-works': 'football goal net',
  'bankroll-basics-for-tips': 'calculator budget',
  'basketball-totals-explained': 'basketball court',
  'hockey-moneyline-puck-line-totals': 'ice hockey',
  'handball-goal-totals': 'handball',
}

const pick = Number(process.env.PICK || 0) // 0 = first result, 1 = second, and so on
const force = process.env.FORCE === '1' // overwrite photos that already exist
const only = process.env.ONLY // fetch just one slug

mkdirSync('public/blog', { recursive: true })
const store = existsSync('scripts/credits.json') ? JSON.parse(readFileSync('scripts/credits.json', 'utf8')) : {}

for (const [slug, q] of Object.entries(QUERIES)) {
  if (only && only !== slug) continue
  const out = `public/blog/${slug}.webp`
  if (existsSync(out) && !force) {
    console.log('skip (already exists):', slug)
    continue
  }
  const url =
    `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(q)}` +
    `&image_type=photo&orientation=horizontal&safesearch=true&min_width=1200&per_page=10`
  const res = await fetch(url)
  if (!res.ok) {
    console.error(slug, 'search failed', res.status)
    continue
  }
  const { hits } = await res.json()
  const h = hits?.[pick] ?? hits?.[0]
  if (!h) {
    console.error(slug, 'no results for', q)
    continue
  }
  const img = await fetch(h.largeImageURL)
  const tmp = join(tmpdir(), `${slug}.jpg`)
  writeFileSync(tmp, Buffer.from(await img.arrayBuffer()))
  execFileSync('magick', [tmp, '-resize', '1200x', '-quality', '70', out])
  unlinkSync(tmp)
  store[slug] = {
    name: h.user,
    profile: `https://pixabay.com/users/${encodeURIComponent(h.user.toLowerCase())}-${h.user_id}/`,
    page: h.pageURL,
    source: 'Pixabay',
  }
  console.log('saved', slug, 'by', h.user)
}

writeFileSync('scripts/credits.json', JSON.stringify(store, null, 2))
writeFileSync(
  'src/credits.ts',
  `export const CREDITS: Record<string, { name: string; profile: string; page: string; source: string }> = ${JSON.stringify(store, null, 2)}\n`
)
