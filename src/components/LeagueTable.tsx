import { useState } from 'react'
import Crest from './Crest'
import { getTable, ZONES, type League, type Res, type View, type Zones } from '../stats'

type Z = 'ucl' | 'uel' | 'rel' | ''
const VIEWS: { id: View; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'home', label: 'Home' },
  { id: 'away', label: 'Away' },
]
const BAR: Record<Z, string> = {
  ucl: 'border-volt',
  uel: 'border-amber-400',
  rel: 'border-red-500',
  '': 'border-transparent',
}
const DOT: Record<Res, string> = { W: 'bg-volt', D: 'bg-mute', L: 'bg-red-500' }

const zone = (i: number, n: number, z: Zones): Z =>
  i < z.ucl ? 'ucl' : i < z.ucl + z.uel ? 'uel' : i >= n - z.rel ? 'rel' : ''

export default function LeagueTable({ league }: { league: League }) {
  const [view, setView] = useState<View>('all')
  const rows = getTable(league, view)
  const z = ZONES[league]

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`px-3 py-1 text-xs border transition-colors ${view === v.id ? 'border-volt text-volt' : 'border-line text-mute'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="border border-line bg-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-mute">
            <tr className="border-b border-line">
              <th className="text-left font-medium py-2 pl-3 w-9">#</th>
              <th className="text-left font-medium">Team</th>
              {['P', 'W', 'D', 'L'].map((h) => <th key={h} className="font-medium w-7">{h}</th>)}
              <th className="font-medium w-8 hidden sm:table-cell">GF</th>
              <th className="font-medium w-8 hidden sm:table-cell">GA</th>
              <th className="font-medium w-9">GD</th>
              <th className="font-medium pr-3 text-right w-10">Pts</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums text-center">
            {rows.map((r, i) => (
              <tr key={r.team} className="border-b border-line last:border-0">
                <td className={`py-2 pl-3 text-left border-l-2 ${BAR[view === 'all' ? zone(i, rows.length, z) : '']}`}>{i + 1}</td>
                <td className="text-left font-sans">
                  <div className="flex items-center gap-2">
                    <Crest name={r.team} size="sm" />
                    <div className="min-w-0">
                      <div className="truncate max-w-[8rem] sm:max-w-none leading-tight">{r.team}</div>
                      <div className="flex gap-0.5 mt-1">
                        {r.form.map((f, j) => <span key={j} className={`w-1.5 h-1.5 rounded-full ${DOT[f]}`} />)}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{r.p}</td><td>{r.w}</td><td>{r.d}</td><td>{r.l}</td>
                <td className="hidden sm:table-cell">{r.gf}</td>
                <td className="hidden sm:table-cell">{r.ga}</td>
                <td>{r.gd > 0 ? `+${r.gd}` : r.gd}</td>
                <td className="pr-3 text-right font-bold text-volt">{r.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {view === 'all' && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-mute">
          <span className="flex items-center gap-1.5"><i className="w-2 h-2 bg-volt" />Champions League</span>
          <span className="flex items-center gap-1.5"><i className="w-2 h-2 bg-amber-400" />Europa League</span>
          <span className="flex items-center gap-1.5"><i className="w-2 h-2 bg-red-500" />Relegation</span>
          <span className="flex items-center gap-1.5">Form dots: last 5, newest on the right</span>
        </div>
      )}
    </div>
  )
}
