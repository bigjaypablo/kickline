import { useState } from 'react'
import { PLAYED, SCORERS, type League } from '../stats'

type Key = 'goals' | 'assists'

export default function ScorersTable({ league }: { league: League }) {
  const [by, setBy] = useState<Key>('goals')
  const g = by === 'goals'
  const rows = [...SCORERS[league]].sort((a, b) => (g ? b[2] - a[2] || b[3] - a[3] : b[3] - a[3] || b[2] - a[2]))

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {(['goals', 'assists'] as Key[]).map((k) => (
          <button
            key={k}
            onClick={() => setBy(k)}
            className={`px-3 py-1 text-xs border capitalize transition-colors ${by === k ? 'border-volt text-volt' : 'border-line text-mute'}`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="border border-line bg-panel overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-mute">
            <tr className="border-b border-line">
              <th className="text-left font-medium py-2 pl-3 w-9">#</th>
              <th className="text-left font-medium">Player</th>
              <th className="font-medium w-9">M</th>
              <th className={`font-medium w-9 ${g ? 'text-volt' : ''}`}>G</th>
              <th className={`font-medium pr-3 text-right w-10 ${!g ? 'text-volt' : ''}`}>A</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums text-center">
            {rows.map((r, i) => (
              <tr key={r[0]} className="border-b border-line last:border-0">
                <td className="py-2.5 pl-3 text-left text-mute">{i + 1}</td>
                <td className="text-left font-sans">
                  <div className="leading-tight">{r[0]}</div>
                  <div className="text-[11px] text-mute">{r[1]}</div>
                </td>
                <td>{PLAYED}</td>
                <td className={g ? 'font-bold text-volt' : ''}>{r[2]}</td>
                <td className={`pr-3 text-right ${!g ? 'font-bold text-volt' : ''}`}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
