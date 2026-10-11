interface Market {
  name: string
  match: (tip: string) => boolean
}

interface Props {
  markets: Market[]
  active: number
  onChange: (i: number) => void
}

export default function FilterChips({ markets, active, onChange }: Props) {
  return (
    <div className="flex border-b border-line mb-4 overflow-x-auto">
      {markets.map((m, i) => (
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
