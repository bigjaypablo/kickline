import SportTabs from '../components/SportTabs'
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPredictions, day, sportOf, type Prediction, type Sport } from '../data'
import { MARKET_PAGES, SPORTS, SPORT_IDS } from '../config'
import { list } from '../lib/motion'
import { tipLabel } from '../lib/tip'
import { usePageTitle } from '../lib/usePageTitle'
import PageHeader from '../components/PageHeader'
import DayTabs from '../components/DayTabs'
import LeagueGroup from '../components/LeagueGroup'
import Skeleton from '../components/Skeleton'
import AdSlot from '../components/AdSlot'
import NotFound from './NotFound'

interface Props {
  title: string
  blurb: string
  sport: Sport
  match?: (r: Prediction) => boolean
  combo?: number
  single?: boolean
  slug?: string
  markets?: boolean
}

function buildCombo(rows: Prediction[], target: number) {
  const pick: Prediction[] = []
  let odds = 1
  for (const r of [...rows].sort((a, b) => b.prob - a.prob)) {
    if (odds >= target) break
    pick.push(r)
    odds *= r.odds
  }
  return { pick, odds }
}

function PredictionsPage({ title, blurb, sport, match = () => true, combo, single, slug, markets }: Props) {
  usePageTitle(`${title} | Kickline`)
  const [date, setDate] = useState(day(0))
  const [rows, setRows] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([getPredictions(date), new Promise((r) => setTimeout(r, 250))]).then(([d]) => {
      setRows(d.filter((r) => sportOf(r) === sport && match(r)))
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sport, slug])

  const best = [...rows].sort((a, b) => b.prob - a.prob)[0]
  const shown = single ? (best ? [best] : []) : rows
  const c = combo ? buildCombo(rows, combo) : null

  const grouped: Record<string, Prediction[]> = {}
  shown.forEach((r) => { (grouped[r.league] ||= []).push(r) })
  const leagues = Object.keys(grouped)

  return (
    <>
      <SportTabs />
      <PageHeader title={title} sub={blurb} />
      <div className="mx-auto max-w-5xl px-4 pt-4">
        <AdSlot placement="top" />
      </div>
      <main className="mx-auto max-w-5xl px-4">
        {markets && (
          <div className="flex gap-2 overflow-x-auto pb-3">
            {MARKET_PAGES.map((m) => (
              <Link
                key={m.slug}
                to={`/football/${m.slug}`}
                className={`shrink-0 text-sm px-3 py-1 border transition-colors ${m.slug === slug ? 'bg-volt text-onvolt border-volt font-medium' : 'border-line text-mute hover:text-bone'}`}
              >
                {m.menu}
              </Link>
            ))}
          </div>
        )}
        <DayTabs date={date} onChange={setDate} />

        {loading ? (
          <Skeleton />
        ) : c ? (
          c.pick.length > 0 ? (
            <div className="border border-line bg-panel">
              <div className="flex items-center justify-between px-4 py-3 border-b border-line">
                <div className="display text-xl font-bold text-volt">{combo} odds pick</div>
                <div className="font-mono text-xl">{c.odds.toFixed(2)}</div>
              </div>
              <ul className="divide-y divide-line">
                {c.pick.map((r) => (
                  <li key={r.id} className="flex justify-between gap-3 px-4 py-2.5 text-sm">
                    <span className="truncate">{r.home} v {r.away}</span>
                    <span className="font-mono shrink-0">
                      <span className="text-mute">{tipLabel(r.tip)}</span> <span className="text-volt">{r.odds.toFixed(2)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-mute text-sm py-12 text-center">No pick for this day yet.</p>
          )
        ) : (
          <motion.div key={date} variants={list} initial="hidden" animate="show" className="space-y-5">
            {leagues.length === 0 && <p className="text-mute text-sm py-12 text-center">No tips for this day yet.</p>}
            {leagues.map((lg, i) => (
              <Fragment key={lg}>
                <LeagueGroup league={lg} rows={grouped[lg]} />
                {i % 3 === 1 && <AdSlot placement="infeed" />}
              </Fragment>
            ))}
          </motion.div>
        )}
      </main>
      <div className="mx-auto max-w-5xl px-4 mt-6">
        <AdSlot placement="footer" />
      </div>
    </>
  )
}

export function MarketRoute() {
  const { market } = useParams()
  const m = MARKET_PAGES.find((x) => x.slug === market)
  if (!m) return <NotFound />
  return (
    <PredictionsPage
      key={m.slug} slug={m.slug} title={m.title} blurb={m.blurb} sport="football"
      match={m.match} combo={m.combo} single={m.single} markets
    />
  )
}

export function SportRoute() {
  const { sport } = useParams()
  const id = SPORT_IDS.find((x) => x === sport)
  if (!id) return <NotFound />
  return (
    <PredictionsPage
      key={id} title={`${SPORTS[id].name} predictions`} blurb={SPORTS[id].blurb}
      sport={id} markets={id === 'football'}
    />
  )
}
