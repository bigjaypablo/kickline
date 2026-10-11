import { useState } from 'react'
import { getBanner, track } from '../banners'

export default function StickyBar() {
  const [open, setOpen] = useState(true)
  const b = getBanner('sticky')
  if (!b || !open) return null
  return (
    <div className="sm:hidden fixed bottom-14 inset-x-0 z-30 bg-ink border-t border-line py-1">
      <div className="relative mx-auto max-w-[320px] aspect-[32/5]">
        <a
          href={b.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => track(b.id)}
          className="block w-full h-full"
        >
          {b.image ? (
            <img src={b.image} alt={b.label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-panel display font-bold text-volt">{b.label}</div>
          )}
        </a>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close ad"
          className="absolute -top-4 right-0 w-6 h-6 grid place-items-center bg-ink border border-line text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
