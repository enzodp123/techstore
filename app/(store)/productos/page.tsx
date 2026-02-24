export const revalidate = 60 // en segundos

import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/store/ProductCard'

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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Productos</h1>
      <p className="text-gray-500 mb-8">{productos.length} productos encontrados</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <ProductCard key={producto.id} product={producto} />
        ))}
      </div>
    </div>
  )
}