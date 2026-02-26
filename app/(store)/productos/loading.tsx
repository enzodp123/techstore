export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <div className="mb-12">
        <div className="h-10 md:h-12 w-3/4 max-w-md bg-zinc-800 rounded mb-2 animate-pulse" />
        <div className="h-1 w-20 bg-blue-600/50 rounded-full mb-4 animate-pulse" />
        <div className="h-4 w-32 bg-zinc-900 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/50">
            <div className="bg-zinc-900 h-48 animate-pulse w-full" />
            <div className="p-5 space-y-4">
              <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/3" />
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/5" />
              </div>
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-1/2 pt-2" />
              <div className="h-10 bg-zinc-800 rounded-xl animate-pulse w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const revalidate = 60 // en segundos
