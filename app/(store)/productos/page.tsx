import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/store/ProductCard'
import { SearchX } from 'lucide-react'

export const revalidate = 60 // en segundos

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()
  const { q } = await searchParams
  const searchQuery = typeof q === 'string' ? q : null

  let query = supabase
    .from('products')
    .select('*, product_images(url)')
    .eq('is_active', true)

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`)
  }

  const { data: productos, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return <p className="text-center py-20 text-red-500">Error al cargar productos.</p>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
          {searchQuery ? `Resultados: ${searchQuery}` : 'PRODUCTOS'}
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
        <p className="text-zinc-500 font-medium tracking-wide uppercase text-xs">
          {productos.length} items encontrados
        </p>
      </div>

      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 mb-6 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl">
            <SearchX size={40} className="text-zinc-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No hay coincidencias</h2>
          <p className="text-zinc-400 max-w-md">No logramos encontrar ningún componente relacionado con tu búsqueda. Intenta con otros términos.</p>
        </div>
      )}
    </div>
  )
}
