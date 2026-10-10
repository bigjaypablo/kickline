export default function Skeleton() {
  return (
    <div className="space-y-5">
      {[0, 1].map((s) => (
        <div key={s}>
          <div className="h-3 w-40 bg-line mb-2 animate-pulse" />
          <div className="border border-line divide-y divide-line bg-panel">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-4 animate-pulse">
                <div className="w-11 h-3 bg-line" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 bg-line" />
                  <div className="h-3 w-1/2 bg-line" />
                </div>
                <div className="w-14 h-8 bg-line" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
