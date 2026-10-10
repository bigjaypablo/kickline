import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import SectionTitle from './SectionTitle'

const FAQS = [
  { q: 'What is Kickline?', a: 'Kickline is a free football tips site. We publish daily predictions with odds and a win probability, and we log every result, win or lose.' },
  { q: 'Are the tips really free?', a: 'Yes, everything on the site is free to read. If you sign up with a bookmaker through one of our links we may earn a commission, at no extra cost to you.' },
  { q: 'How do you choose the tips?', a: 'We look at recent form, head-to-head records, home and away results, goal numbers and league position before a tip goes live.' },
  { q: 'Do you guarantee wins?', a: 'No, and nobody honestly can. Football is unpredictable and tips are guides, not promises. Never bet money you cannot afford to lose.' },
  { q: 'What do the odds and probability mean?', a: 'Odds show what a winning bet pays. Probability is our own estimate of how likely the tip is to land. Odds can differ between bookmakers, so check before you bet.' },
  { q: 'Can I use the tips for accumulators?', a: 'You can, but every extra leg lowers your chance of winning. Single bets on high-probability tips carry less risk.' },
  { q: 'Is betting legal where I live?', a: 'Rules differ by country. It is your responsibility to check your local laws and to be of legal age before you bet.' },
  { q: 'How can I advertise on Kickline?', a: 'Email our advertising address in the footer and we will send banner sizes, placements and rates.' },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <section className="mx-auto max-w-3xl px-4 mt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SectionTitle>FAQ</SectionTitle>
      <div className="border border-line bg-panel divide-y divide-line">
        {FAQS.map((f, i) => {
          const on = open === i
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(on ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left hover:bg-ink/60 transition-colors"
              >
                <span className="font-medium">{f.q}</span>
                <motion.svg animate={{ rotate: on ? 45 : 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-volt">
                  <path d="M12 5v14M5 12h14" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-mute leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
