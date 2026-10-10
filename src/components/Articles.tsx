import SectionTitle from './SectionTitle'

const ARTICLES = [
  'How to read team form before you bet',
  'Over 2.5 goals: when it actually works',
  'Bankroll basics for football tips',
]

export default function Articles() {
  return (
    <section className="mx-auto max-w-5xl px-4 mt-10">
      <SectionTitle>Latest articles</SectionTitle>
      <div className="grid md:grid-cols-3 gap-3">
        {ARTICLES.map((a) => (
          <a key={a} href="#" className="border border-line bg-panel p-4 hover:border-volt transition-colors">
            <div className="display text-xl font-bold leading-tight">{a}</div>
            <div className="mt-3 text-sm text-volt">Read more →</div>
          </a>
        ))}
      </div>
    </section>
  )
}
