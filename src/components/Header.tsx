import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'

const NAV = ['Predictions', 'Banker', 'Results', 'Blog']

interface Props {
  theme: 'dark' | 'light'
  toggle: () => void
}

export default function Header({ theme, toggle }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur">
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
      <nav className="mx-auto max-w-5xl flex gap-6 overflow-x-auto px-4 pb-2 text-sm text-mute">
        {NAV.map((n) => (
          <a key={n} href="#" className="shrink-0 hover:text-volt transition-colors">{n}</a>
        ))}
      </nav>
    </header>
  )
}
