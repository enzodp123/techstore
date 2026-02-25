

import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/store/ProductCard'

export const revalidate = 60 // en segundos

export default async function ProductosPage() {
  const supabase = await createClient()

  const { data: productos, error } = await supabase
    .from('products')
    .select('*, product_images(url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return <p className="text-center py-20 text-red-500">Error al cargar productos.</p>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          PRODUCTOS
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
        <p className="text-zinc-500 font-medium tracking-wide uppercase text-xs">
          {productos.length} items disponibles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <ProductCard key={producto.id} product={producto} />
        ))}
      </div>
    </div>
  )
}