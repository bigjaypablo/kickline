import { MARKETS } from '../data'

export default function FilterChips({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex border-b border-line mb-4 overflow-x-auto">
      {MARKETS.map((m, i) => (
        <button
          key={m.name}
          onClick={() => onChange(i)}
          className={`shrink-0 px-4 py-2 text-sm -mb-px border-b-2 transition-colors ${i === active ? 'border-volt text-volt font-semibold' : 'border-transparent text-mute hover:text-bone'}`}
        >
          {m.name}
        </button>
      ))}
    </div>
  )
}
