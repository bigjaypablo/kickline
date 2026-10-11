import { INFO } from '../content'
import { usePageTitle } from '../lib/usePageTitle'
import PageHeader from '../components/PageHeader'
import NotFound from './NotFound'

export default function InfoPage({ page }: { page: string }) {
  const info = INFO[page]
  usePageTitle(`${info?.title ?? 'Page'} | Kickline`)
  if (!info) return <NotFound />
  return (
    <>
      <PageHeader title={info.title} sub={info.sub} />
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-4">
        {info.blocks.map((b, i) =>
          b.startsWith('## ') ? (
            <h2 key={i} className="display text-2xl font-bold text-volt pt-4">{b.slice(3)}</h2>
          ) : (
            <p key={i} className="leading-relaxed text-bone/90">{b}</p>
          )
        )}
      </div>
    </>
  )
}
