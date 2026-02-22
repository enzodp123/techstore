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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoria.name}</h1>
      <p className="text-gray-500 mb-8">{productos?.length || 0} productos encontrados</p>
      {productos && productos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-20">No hay productos en esta categoría todavía.</p>
      )}
    </div>
  )
}