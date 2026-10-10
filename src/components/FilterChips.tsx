import { FILTERS } from '../data'

export default function FilterChips({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3">
      {FILTERS.map((f, i) => (
        <button
          key={f.name}
          onClick={() => onChange(i)}
          className={`shrink-0 text-sm px-3 py-1 border transition-colors ${i === active ? 'bg-volt text-onvolt border-volt font-medium' : 'border-line text-mute'}`}
        >
          {f.name}
        </button>
      ))}
    </div>
  )
}
