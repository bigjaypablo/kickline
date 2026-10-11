import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { useActive } from '../lib/useActive'

const NAV = [
  { id: 'banker', label: 'Banker' },
  { id: 'tips', label: 'Predictions' },
  { id: 'results', label: 'Results' },
  { id: 'stats', label: 'Stats' },
  { id: 'articles', label: 'Blog' },
]
const IDS = NAV.map((n) => n.id)

interface Props {
  theme: 'dark' | 'light'
  toggle: () => void
}

export default function Header({ theme, toggle }: Props) {
  const active = useActive(IDS)
  return (
    <header className="sticky top-0 z-20 bg-ink/95 backdrop-blur">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 h-14">
        <Logo />
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center border border-line hover:border-volt transition-colors overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#" className="bg-volt text-onvolt display font-bold tracking-wide text-sm px-4 h-9 grid place-items-center">
            JOIN TELEGRAM
          </a>
        </div>
      </div>

      <nav className="bg-panel border-y border-line">
        <div className="mx-auto max-w-5xl flex overflow-x-auto">
          {NAV.map((n) => {
            const on = active === n.id
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative flex-1 sm:flex-none shrink-0 px-2 sm:px-6 h-11 grid place-items-center display text-[15px] sm:text-base font-bold tracking-wide transition-colors ${on ? 'text-onvolt' : 'text-bone hover:text-volt'}`}
              >
                {on && (
                  <motion.span
                    layoutId="navpill"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-volt"
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
