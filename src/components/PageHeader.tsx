export default function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-panel">
      <div className="absolute inset-0 dots" />
      <div className="absolute bottom-0 left-0 h-[3px] w-28 bg-volt" />
      <div className="relative mx-auto max-w-5xl px-4 py-10">
        <h1 className="display font-extrabold leading-[0.95] text-5xl sm:text-7xl">{title}</h1>
        {sub && <p className="mt-3 max-w-xl text-mute">{sub}</p>}
      </div>
    </section>
  )
}
