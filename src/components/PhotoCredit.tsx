import { CREDITS } from '../credits'

export default function PhotoCredit({ slug }: { slug: string }) {
  const c = CREDITS[slug]
  if (!c) return null
  return (
    <p className="mt-2 text-xs text-mute">
      Photo by{' '}
      <a href={c.profile} target="_blank" rel="noopener noreferrer" className="underline hover:text-volt">{c.name}</a>
      {' '}on{' '}
      <a href={c.page} target="_blank" rel="noopener noreferrer" className="underline hover:text-volt">{c.source}</a>
    </p>
  )
}
