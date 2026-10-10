import { Fragment, useEffect, useMemo, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { getPredictions, day, FILTERS, type Prediction } from './data'
import { list } from './lib/motion'
import { useTheme } from './theme'
import Header from './components/Header'
import Hero from './components/Hero'
import BankerCard from './components/BankerCard'
import SectionTitle from './components/SectionTitle'
import DayTabs from './components/DayTabs'
import FilterChips from './components/FilterChips'
import LeagueGroup from './components/LeagueGroup'
import Skeleton from './components/Skeleton'
import Articles from './components/Articles'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import Reveal from './components/Reveal'
import AdSlot from './components/AdSlot'
import StickyBar from './components/StickyBar'
import StatsSection from './components/StatsSection'
import Faq from './components/Faq'

export default function App() {
  const { theme, toggle } = useTheme()
  const [date, setDate] = useState(day(0))
  const [filter, setFilter] = useState(0)
  const [rows, setRows] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // the short wait only exists so the skeleton is visible with mock data
    Promise.all([getPredictions(date), new Promise((r) => setTimeout(r, 300))]).then(([d]) => {
      setRows(d)
      setLoading(false)
    })
  }, [date])

  const banker = useMemo(() => [...rows].sort((a, b) => b.prob - a.prob)[0], [rows])
  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.prob, 0) / rows.length) : 0

  const grouped = useMemo(() => {
    const f = FILTERS[filter]
    const out: Record<string, Prediction[]> = {}
    rows.filter((r) => f.match(r.tip)).forEach((r) => { (out[r.league] ||= []).push(r) })
    return out
  }, [rows, filter])
  const leagues = Object.keys(grouped)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen pb-14 sm:pb-0">
        <Header theme={theme} toggle={toggle} />
        <Hero count={rows.length} avg={avg} />
        {banker && <BankerCard banker={banker} />}

        <div className="mx-auto max-w-5xl px-4">
          <AdSlot placement="top" />
        </div>

        <main id="tips" className="mx-auto max-w-5xl px-4 mt-4">
          <SectionTitle>All predictions</SectionTitle>
          <DayTabs date={date} onChange={setDate} />
          <FilterChips active={filter} onChange={setFilter} />
          {loading ? (
            <Skeleton />
          ) : (
            <motion.div key={date + '-' + filter} variants={list} initial="hidden" animate="show" className="space-y-5">
              {leagues.length === 0 && <p className="text-mute text-sm py-12 text-center">No tips for this filter yet.</p>}
              {leagues.map((lg, i) => (
                <Fragment key={lg}>
                  <LeagueGroup league={lg} rows={grouped[lg]} />
                  {i % 3 === 1 && <AdSlot placement="infeed" />}
                </Fragment>
              ))}
            </motion.div>
          )}
        </main>

        <Reveal><StatsSection /></Reveal>
        <Reveal><Articles /></Reveal>
        <Reveal><Faq /></Reveal>
        <div className="mx-auto max-w-5xl px-4 mt-6">
          <AdSlot placement="footer" />
        </div>
        <Reveal><CtaBand /></Reveal>
        <Footer />
        <StickyBar />
      </div>
    </MotionConfig>
  )
}
