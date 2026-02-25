export const revalidate = 60 // en segundos

import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/store/ProductCard'
import { notFound } from 'next/navigation'

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: categoria } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!categoria) notFound()

  const { data: productos } = await supabase
    .from('products')
    .select('*, product_images(url)')
    .eq('category_id', categoria.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
          {categoria.name}
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
        <p className="text-zinc-500 font-medium tracking-wide uppercase text-xs">
          {productos?.length || 0} items en esta categoría
        </p>
      </div>

      {productos && productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800/50">
          <p className="text-zinc-500 font-medium italic">No hay productos en esta categoría todavía.</p>
        </div>
      )}
    </div>
  )
}