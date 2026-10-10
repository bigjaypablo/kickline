import type { ReactNode } from 'react'
import Logo from './Logo'

const COLS = [
  { title: 'Predictions', links: ['Today', 'Tomorrow', 'Weekend', 'Banker tips', 'Results'] },
  { title: 'Company', links: ['About us', 'Contact us', 'Advertise with us', 'Blog', 'Sitemap'] },
  { title: 'Legal', links: ['Disclaimer', 'Privacy policy', 'Terms & conditions', 'Cookie policy', 'Responsible gambling'] },
]
const HELP = [
  ['BeGambleAware', 'https://www.begambleaware.org'],
  ['GamCare', 'https://www.gamcare.org.uk'],
  ['Gambling Therapy', 'https://www.gamblingtherapy.org'],
]

const ic = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
}

function Social({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a href="#" aria-label={label} className="w-9 h-9 grid place-items-center border border-line text-mute hover:text-volt hover:border-volt transition-colors">
      {children}
    </a>
  )
}

const H = ({ children }: { children: string }) => (
  <h4 className="display text-lg font-bold tracking-wide text-bone mb-3">{children}</h4>
)

export default function Footer() {
  return (
    <footer className="border-t border-line mt-0">
      <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <Logo className="text-3xl" />
          <p className="mt-3 text-sm text-mute max-w-xs">
            Free football predictions with odds and win probability. Every tip is logged, win or lose.
          </p>
          <div className="mt-4 flex gap-2">
            <Social label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Social>
            <Social label="Telegram">
              <svg {...ic}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </Social>
            <Social label="Instagram">
              <svg {...ic}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
            </Social>
            <Social label="YouTube">
              <svg {...ic}><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></svg>
            </Social>
          </div>
        </div>

        {COLS.map((c) => (
          <div key={c.title}>
            <H>{c.title}</H>
            <ul className="space-y-2 text-sm text-mute">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-volt transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <H>Contact</H>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="block text-[11px] uppercase tracking-wider text-mute">General</span>
              <a href="mailto:hello@kickline.example" className="hover:text-volt break-all">hello@kickline.example</a>
            </li>
            <li>
              <span className="block text-[11px] uppercase tracking-wider text-mute">Advertising</span>
              <a href="mailto:advertise@kickline.example" className="hover:text-volt break-all">advertise@kickline.example</a>
            </li>
            <li>
              <span className="block text-[11px] uppercase tracking-wider text-mute">Telegram</span>
              <a href="#" className="hover:text-volt">@kickline</a>
            </li>
            <li>
              <span className="block text-[11px] uppercase tracking-wider text-mute">WhatsApp only</span>
              <a href="#" className="hover:text-volt">+000 000 000 0000</a>
            </li>
          </ul>
          <p className="text-xs text-mute mt-3">We reply within 24 hours.</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-5 text-xs text-mute space-y-2">
          <p>
            Gambling can be addictive. If it stops being fun, get free help:{' '}
            {HELP.map(([n, h], i) => (
              <span key={n}>
                <a href={h} target="_blank" rel="noopener noreferrer" className="text-bone underline hover:text-volt">{n}</a>
                {i < HELP.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <p>
            Kickline is an information and tips site. We are not a betting operator and do not take bets. Predictions are
            guides, not guarantees. We may earn a commission from some links.
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-panel">
        <div className="mx-auto max-w-5xl px-4 py-5 flex items-center gap-3">
          <span className="shrink-0 w-11 h-11 rounded-full border-2 border-volt text-volt grid place-items-center display font-extrabold text-lg">18+</span>
          <p className="font-extrabold text-sm sm:text-base leading-snug">
            You must be 18 years old or over to use this site. Please Play responsibly
          </p>
        </div>
      </div>
      <div className="bg-ink border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-3 text-[11px] text-mute">© 2026 Kickline. All rights reserved.</p>
      </div>
    </footer>
  )
}
