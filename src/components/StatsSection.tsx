import { useState } from 'react'
import { motion } from 'framer-motion'
import { LEAGUES, STANDINGS, SCORERS, type League } from '../stats'
import SectionTitle from './SectionTitle'
import StandingsTable from './StandingsTable'
import ScorersTable from './ScorersTable'

export default function StatsSection() {
  const [league, setLeague] = useState<League>('Premier League')
  return (
    <section className="mx-auto max-w-5xl px-4 mt-12">
      <SectionTitle>League tables</SectionTitle>
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
      <motion.div
        key={league}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-[3fr_2fr] gap-4"
      >
        <div>
          <h3 className="text-[11px] uppercase tracking-widest text-mute mb-2 border-l-2 border-volt pl-2">Standings</h3>
          <StandingsTable rows={STANDINGS[league]} />
        </div>
        <div>
          <h3 className="text-[11px] uppercase tracking-widest text-mute mb-2 border-l-2 border-volt pl-2">Top scorers</h3>
          <ScorersTable rows={SCORERS[league]} />
        </div>
      </motion.div>
    </section>
  )
}
