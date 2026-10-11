import { execFileSync } from 'node:child_process'
import { existsSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const KEY = process.env.PIXABAY_KEY
if (!KEY) {
  console.error('Set PIXABAY_KEY first')
  process.exit(1)
}

const QUERIES = {
  basketball: 'basketball arena',
  hockey: 'ice hockey arena',
  handball: 'handball court',
}
const pick = Number(process.env.PICK || 0)
const force = process.env.FORCE === '1'
const only = process.env.ONLY

for (const [sport, q] of Object.entries(QUERIES)) {
  if (only && only !== sport) continue
  const out = `public/hero-${sport}.webp`
  if (existsSync(out) && !force) {
    console.log('skip (already exists):', sport)
    continue
  }
  const res = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&safesearch=true&min_width=1200&per_page=10`
  )
  if (!res.ok) {
    console.error(sport, 'search failed', res.status)
    continue
  }
  const { hits } = await res.json()
  const h = hits?.[pick] ?? hits?.[0]
  if (!h) {
    console.error(sport, 'no results for', q)
    continue
  }
  const img = await fetch(h.largeImageURL)
  const tmp = join(tmpdir(), `hero-${sport}.jpg`)
  writeFileSync(tmp, Buffer.from(await img.arrayBuffer()))
  execFileSync('magick', [tmp, '-resize', '1280x', '-quality', '68', out])
  unlinkSync(tmp)
  console.log('saved', sport, 'by', h.user)
}
