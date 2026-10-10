import type { Prediction } from '../data'
import PredictionRow from './PredictionRow'

export default function LeagueGroup({ league, rows }: { league: string; rows: Prediction[] }) {
  return (
    <section>
      <h3 className="text-[11px] uppercase tracking-widest text-mute mb-2 border-l-2 border-volt pl-2">{league}</h3>
      <div className="border border-line divide-y divide-line bg-panel">
        {rows.map((r) => <PredictionRow key={r.id} r={r} />)}
      </div>
    </section>
  )
}
