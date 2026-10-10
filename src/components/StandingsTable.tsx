import Crest from './Crest'
import type { StandRow } from '../stats'

export default function StandingsTable({ rows }: { rows: StandRow[] }) {
  return (
    <div className="border border-line bg-panel overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-[11px] uppercase tracking-wider text-mute">
          <tr className="border-b border-line">
            <th className="text-left font-medium py-2 pl-3 w-9">#</th>
            <th className="text-left font-medium">Team</th>
            {['P', 'W', 'D', 'L', 'GD'].map((h) => <th key={h} className="font-medium w-8">{h}</th>)}
            <th className="font-medium pr-3 text-right w-10">Pts</th>
          </tr>
        </thead>
        <tbody className="font-mono tabular-nums text-center">
          {rows.map((r, i) => (
            <tr key={r[0]} className="border-b border-line last:border-0">
              <td className={`py-2.5 pl-3 text-left border-l-2 ${i < 4 ? 'border-volt' : 'border-transparent'}`}>{i + 1}</td>
              <td className="text-left font-sans">
                <div className="flex items-center gap-2">
                  <Crest name={r[0]} size="sm" />
                  <span className="truncate max-w-[7rem] sm:max-w-none">{r[0]}</span>
                </div>
              </td>
              <td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td>
              <td>{r[5] > 0 ? `+${r[5]}` : r[5]}</td>
              <td className="pr-3 text-right font-bold text-volt">{r[6]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
