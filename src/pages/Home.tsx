import { Fragment, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { getPredictions, day, sportOf, type Prediction, type Sport } from '../data'
import { THEME, SPORTS } from '../config'
import { list } from '../lib/motion'
import { usePageTitle } from '../lib/usePageTitle'
import SportTabs from '../components/SportTabs'
import Hero from '../components/Hero'
import BankerCard from '../components/BankerCard'
import QuickTiles, { type View } from '../components/QuickTiles'
import SectionTitle from '../components/SectionTitle'
import DayTabs from '../components/DayTabs'
import FilterChips from '../components/FilterChips'
import LeagueGroup from '../components/LeagueGroup'
import Skeleton from '../components/Skeleton'
import RecentWins from '../components/RecentWins'
import StatsSection from '../components/StatsSection'
import BlogSection from '../components/BlogSection'
import Faq from '../components/Faq'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import AdSlot from '../components/AdSlot'

const isSoon = (r: Prediction) => {
  if (r.result !== 'pending') return false
  const [h, m] = r.time.split(':').map(Number)
  const now = new Date()
  const diff = h * 60 + m - (now.getHours() * 60 + now.getMinutes())
  return diff >= 0 && diff <= 180
}

export default function Home({ sport = 'football' }: { sport?: Sport }) {
  const theme = THEME[sport]
  usePageTitle(`Kickline | Free ${SPORTS[sport].name.toLowerCase()} predictions and tips`)
  const [date, setDate] = useState(day(0))
  const [filter, setFilter] = useState(0)
  const [view, setView] = useState<View>('all')
  const [rows, setRows] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setFilter(0)
    setView('all')
  }, [sport])

  useEffect(() => {
    setLoading(true)
    // the short wait only exists so the skeleton is visible with mock data
    Promise.all([getPredictions(date), new Promise((r) => setTimeout(r, 300))]).then(([d]) => {
      setRows(d.filter((r) => sportOf(r) === sport))
      setLoading(false)
    })
  }, [date, sport])

  const isToday = date === day(0)
  const test: Record<View, (r: Prediction) => boolean> = {
    all: () => true,
    soon: (r) => isToday && isSoon(r),
    epl: (r) => theme.league(r.league),
  }
  const counts: Record<View, number> = {
    all: rows.length,
    soon: rows.filter(test.soon).length,
    epl: rows.filter(test.epl).length,
  }

  const banker = useMemo(() => [...rows].sort((a, b) => b.prob - a.prob)[0], [rows])
  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.prob, 0) / rows.length) : 0

  const market = theme.markets[filter] ?? theme.markets[0]
  const grouped: Record<string, Prediction[]> = {}
  rows.filter((r) => test[view](r) && market.match(r.tip)).forEach((r) => {
    ;(grouped[r.league] ||= []).push(r)
  })
  const leagues = Object.keys(grouped)

  const pickView = (v: View) => {
    setView(v)
    if (v === 'soon') setDate(day(0))
    document.getElementById('tips')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <SportTabs />
      <Hero sport={sport} count={rows.length} avg={avg} />
      {banker && <BankerCard banker={banker} />}

      <div className="mx-auto max-w-5xl px-4">
        <QuickTiles view={view} counts={counts} leagueTitle={theme.tile} onChange={pickView} />
        <AdSlot placement="top" />
      </div>

      <main id="tips" className="mx-auto max-w-5xl px-4 mt-4">
        <SectionTitle>All predictions</SectionTitle>
        <DayTabs date={date} onChange={setDate} />
        <FilterChips markets={theme.markets} active={filter} onChange={setFilter} />
        {loading ? (
          <Skeleton />
        ) : (
          <motion.div key={`${sport}-${date}-${filter}-${view}`} variants={list} initial="hidden" animate="show" className="space-y-5">
            {leagues.length === 0 && (
              <p className="text-mute text-sm py-12 text-center">
                {view === 'soon' ? 'Nothing starts in the next 3 hours.' : 'No tips for this filter yet.'}
              </p>
            )}
            {leagues.map((lg, i) => (
              <Fragment key={lg}>
                <LeagueGroup league={lg} rows={grouped[lg]} />
                {i % 3 === 1 && <AdSlot placement="infeed" />}
              </Fragment>
            ))}
          </motion.div>
        )}
      </main>

      <Reveal><RecentWins /></Reveal>
      {sport === 'football' && <Reveal><StatsSection /></Reveal>}
      <Reveal><BlogSection sport={sport} /></Reveal>
      <Reveal><Faq /></Reveal>
      <div className="mx-auto max-w-5xl px-4 mt-6">
        <AdSlot placement="footer" />
      </div>
      <Reveal><CtaBand /></Reveal>
    </>
  )
}
