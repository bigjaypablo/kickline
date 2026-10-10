import { motion } from 'framer-motion'
import { day } from '../data'
import { EASE } from '../lib/motion'

const DAYS = [-1, 0, 1, 2].map(day)

const parts = (d: string) => {
  const dt = new Date(d + 'T00:00:00')
  return { wk: dt.toLocaleDateString('en', { weekday: 'short' }), dd: dt.getDate() }
}

export default function DayTabs({ date, onChange }: { date: string; onChange: (d: string) => void }) {
  return (
    <div className="flex gap-1 mb-3">
      {DAYS.map((d) => {
        const { wk, dd } = parts(d)
        const on = d === date
        return (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`relative flex-1 py-2 text-center border border-line transition-colors ${on ? 'text-volt' : 'text-mute hover:text-bone'}`}
          >
            {on && (
              <motion.div layoutId="dayline" transition={{ duration: 0.3, ease: EASE }} className="absolute inset-0 border border-volt" />
            )}
            <div className="relative text-[11px] uppercase tracking-wider">{wk}</div>
            <div className="relative font-mono text-base tabular-nums">{dd}</div>
          </button>
        )
      })}
    </div>
  )
}
