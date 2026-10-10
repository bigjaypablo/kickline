import { getBanner, track, type Placement } from '../banners'

const BOX = 'aspect-[16/5] sm:aspect-[728/90] max-w-[728px] w-full mx-auto'

export default function AdSlot({ placement }: { placement: Exclude<Placement, 'sticky'> }) {
  const b = getBanner(placement)
  return (
    <div className="my-6">
      <div className="text-[10px] uppercase tracking-widest text-mute mb-1 text-center">Advertisement</div>
      {b ? (
        <a
          href={b.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => track(b.id)}
          className={`block overflow-hidden border border-line ${BOX}`}
        >
          {b.image ? (
            <img src={b.image} alt={b.label} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-panel display text-xl font-bold text-volt">{b.label}</div>
          )}
        </a>
      ) : (
        <a
          href="#advertise"
          className={`grid place-items-center border border-dashed border-line text-mute text-sm hover:border-volt hover:text-volt transition-colors ${BOX}`}
        >
          Your banner here · 728×90 · Advertise with us
        </a>
      )}
    </div>
  )
}
