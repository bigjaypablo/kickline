import type { ScorerRow } from '../stats'

export default function ScorersTable({ rows }: { rows: ScorerRow[] }) {
  return (
    <div className="border border-line bg-panel overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-[11px] uppercase tracking-wider text-mute">
          <tr className="border-b border-line">
            <th className="text-left font-medium py-2 pl-3 w-9">#</th>
            <th className="text-left font-medium">Player</th>
            <th className="font-medium w-10">M</th>
            <th className="font-medium pr-3 text-right w-10">G</th>
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
              <td>{r[2]}</td>
              <td className="pr-3 text-right font-bold text-volt">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
