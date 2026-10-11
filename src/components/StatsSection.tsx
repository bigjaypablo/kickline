import { useState } from 'react'
import { motion } from 'framer-motion'
import { LEAGUES, type League } from '../stats'
import SectionTitle from './SectionTitle'
import LeagueTable from './LeagueTable'
import ScorersTable from './ScorersTable'
import TeamStatsTable from './TeamStatsTable'

type Tab = 'table' | 'scorers' | 'betting' | 'discipline'
const TABS: { id: Tab; label: string }[] = [
  { id: 'table', label: 'Table' },
  { id: 'scorers', label: 'Top scorers' },
  { id: 'betting', label: 'Betting stats' },
  { id: 'discipline', label: 'Discipline' },
]

export default function StatsSection() {
  const [league, setLeague] = useState<League>('Premier League')
  const [tab, setTab] = useState<Tab>('table')

  return (
    <section id="stats" className="mx-auto max-w-5xl px-4 mt-12">
      <SectionTitle>Stats centre</SectionTitle>

      <div className="flex gap-2 overflow-x-auto pb-3">
        {LEAGUES.map((l) => (
          <button
            key={l}
            onClick={() => setLeague(l)}
            className={`shrink-0 text-sm px-3 py-1 border transition-colors ${l === league ? 'bg-volt text-onvolt border-volt font-medium' : 'border-line text-mute'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex border-b border-line mb-4 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 py-2 text-sm -mb-px border-b-2 transition-colors ${tab === t.id ? 'border-volt text-volt' : 'border-transparent text-mute hover:text-bone'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={league + tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tab === 'table' && <LeagueTable league={league} />}
        {tab === 'scorers' && <ScorersTable league={league} />}
        {tab === 'betting' && <TeamStatsTable league={league} mode="betting" />}
        {tab === 'discipline' && <TeamStatsTable league={league} mode="discipline" />}
      </motion.div>
    </section>
  )
}
