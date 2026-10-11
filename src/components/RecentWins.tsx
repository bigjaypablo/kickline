import { useEffect, useState } from 'react'
import { getRecent, type Prediction } from '../data'
import { tipLabel } from '../lib/tip'
import SectionTitle from './SectionTitle'

export default function RecentWins() {
  const [rows, setRows] = useState<Prediction[]>([])
  useEffect(() => { getRecent(5).then(setRows) }, [])
  if (!rows.length) return null
  const won = rows.filter((r) => r.result === 'won').length

  return (
    <section id="results" className="mx-auto max-w-5xl px-4 mt-12">
      <SectionTitle>Verified results</SectionTitle>
      <p className="text-center text-sm text-mute -mt-2 mb-4">
        Last 5 days: <span className="font-mono text-volt">{won}/{rows.length}</span> tips landed ({Math.round((won / rows.length) * 100)}%).
        Every tip is logged, losses included.
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {rows.map((r) => {
          const w = r.result === 'won'
          return (
            <div key={r.id} className={`shrink-0 w-56 border border-line border-l-2 bg-panel p-3 ${w ? 'border-l-volt' : 'border-l-red-500'}`}>
              <div className="flex justify-between text-[11px] uppercase tracking-wider">
                <span className={w ? 'text-volt font-semibold' : 'text-red-500 font-semibold'}>{w ? 'Won' : 'Lost'}</span>
                <span className="text-mute">
                  {new Date(r.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="mt-2 text-sm leading-snug">{r.home} v {r.away}</div>
              <div className="mt-1 text-xs text-mute">
                {tipLabel(r.tip)} <span className="font-mono text-bone">@ {r.odds.toFixed(2)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
