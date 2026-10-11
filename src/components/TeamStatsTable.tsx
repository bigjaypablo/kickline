import { useState } from 'react'
import Crest from './Crest'
import { getTeams, type League, type TeamStats } from '../stats'

interface Col {
  label: string
  get: (t: TeamStats) => number
  fmt: (n: number) => string
}

const pct = (n: number) => `${n}%`
const num = (n: number) => String(n)

const MODES: Record<'betting' | 'discipline', { cols: Col[]; note: string }> = {
  betting: {
    cols: [
      { label: 'BTTS %', get: (t) => Math.round((t.btts / t.all.p) * 100), fmt: pct },
      { label: 'Over 2.5 %', get: (t) => Math.round((t.o25 / t.all.p) * 100), fmt: pct },
      { label: 'Clean sheets', get: (t) => t.cs, fmt: num },
      { label: 'Avg goals', get: (t) => (t.all.gf + t.all.ga) / t.all.p, fmt: (n) => n.toFixed(2) },
    ],
    note: 'BTTS % is the share of matches where both teams scored. Over 2.5 % is the share with 3 or more goals. Avg goals counts both teams.',
  },
  discipline: {
    cols: [
      { label: 'Yellow', get: (t) => t.yc, fmt: num },
      { label: 'Red', get: (t) => t.rc, fmt: num },
      { label: 'Per game', get: (t) => (t.yc + t.rc) / t.all.p, fmt: (n) => n.toFixed(1) },
    ],
    note: 'Cards per game is yellows plus reds divided by matches played. Useful when you look at card markets.',
  },
}

export default function TeamStatsTable({ league, mode }: { league: League; mode: 'betting' | 'discipline' }) {
  const { cols, note } = MODES[mode]
  const [sort, setSort] = useState(0)
  const idx = Math.min(sort, cols.length - 1)
  const rows = [...getTeams(league)].sort((a, b) => cols[idx].get(b) - cols[idx].get(a))

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3 items-center">
        <span className="text-[11px] uppercase tracking-wider text-mute shrink-0">Sort by</span>
        {cols.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setSort(i)}
            className={`shrink-0 px-3 py-1 text-xs border transition-colors ${i === idx ? 'border-volt text-volt' : 'border-line text-mute'}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="border border-line bg-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-mute">
            <tr className="border-b border-line">
              <th className="text-left font-medium py-2 pl-3 w-9">#</th>
              <th className="text-left font-medium">Team</th>
              {cols.map((c, i) => (
                <th key={c.label} className={`font-medium px-2 whitespace-nowrap ${i === idx ? 'text-volt' : ''}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums text-center">
            {rows.map((t, i) => (
              <tr key={t.team} className="border-b border-line last:border-0">
                <td className="py-2.5 pl-3 text-left text-mute">{i + 1}</td>
                <td className="text-left font-sans">
                  <div className="flex items-center gap-2">
                    <Crest name={t.team} size="sm" />
                    <span className="truncate max-w-[8rem] sm:max-w-none">{t.team}</span>
                  </div>
                </td>
                {cols.map((c, j) => (
                  <td key={c.label} className={`px-2 ${j === idx ? 'font-bold text-volt' : ''}`}>{c.fmt(c.get(t))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-mute mt-3">{note}</p>
    </div>
  )
}
