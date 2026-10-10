export default function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px flex-1 bg-line" />
      <h2 className="display text-2xl font-bold text-volt tracking-wide">{children}</h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  )
}
