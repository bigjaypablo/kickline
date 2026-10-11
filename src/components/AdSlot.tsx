import { Link } from 'react-router-dom'
import { getBanner, track, type Placement } from '../banners'

export default function AdSlot({ placement }: { placement: Exclude<Placement, 'sticky'> }) {
  const b = getBanner(placement)
  const rect = placement === 'sidebar'
  const box = rect
    ? 'aspect-[6/5] w-full max-w-[300px] mx-auto'
    : 'aspect-[16/5] sm:aspect-[728/90] max-w-[728px] w-full mx-auto'
  const size = rect ? '300×250' : '728×90'
  return (
    <div className="my-6">
      <div className="text-[10px] uppercase tracking-widest text-mute mb-1 text-center">Advertisement</div>
      {b ? (
        <a
          href={b.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => track(b.id)}
          className={`block overflow-hidden border border-line ${box}`}
        >
          {b.image ? (
            <img src={b.image} alt={b.label} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-panel display text-xl font-bold text-volt">{b.label}</div>
          )}
        </a>
      ) : (
        <Link
          to="/advertise"
          className={`grid place-items-center text-center px-2 border border-dashed border-line text-mute text-sm hover:border-volt hover:text-volt transition-colors ${box}`}
        >
          Your banner here · {size} · Advertise with us
        </Link>
      )}
    </div>
  )
}
