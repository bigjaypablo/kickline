export default function Crest({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const ini = name
    .replace(/[^A-Za-zÀ-ÿ ]/g, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
  const cls =
    size === 'sm'
      ? 'w-7 h-7 text-xs'
      : 'w-14 h-14 text-xl ring-1 ring-volt/40 ring-offset-2 ring-offset-panel'
  return (
    <div className={`${cls} shrink-0 rounded-full border border-line bg-ink grid place-items-center display font-bold text-volt`}>
      {ini}
    </div>
  )
}
