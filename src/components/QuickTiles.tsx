export type View = 'all' | 'soon' | 'epl'

const TILES: { id: View; title: string }[] = [
  { id: 'all', title: 'All tips' },
  { id: 'soon', title: 'Kicking off in 3 hours' },
  { id: 'epl', title: 'Premier League' },
]

interface Props {
  view: View
  counts: Record<View, number>
  onChange: (v: View) => void
}

export default function QuickTiles({ view, counts, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto mt-6">
      {TILES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="shrink-0 w-[46%] sm:w-auto sm:flex-1 text-left bg-panel border border-line hover:border-volt transition-colors"
        >
          <div className={`h-[3px] ${view === t.id ? 'bg-volt' : 'bg-line'}`} />
          <div className="p-3">
            <div className="display font-bold text-lg leading-tight">{t.title}</div>
            <div className="font-mono text-xs text-mute mt-1">{counts[t.id]} tips</div>
          </div>
        </button>
      ))}
    </div>
  )
}
