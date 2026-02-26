import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ShoppingCart, Star, Package } from 'lucide-react'
import AddToCartButton from '@/components/store/AddToCartButton'
import OptimizedImage from '@/components/store/OptimizedImage'

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: producto } = await supabase
    .from('products')
    .select('*, categories(name, slug), product_images(url)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!producto) notFound()

  const descuento = producto.compare_price
    ? Math.round(((producto.compare_price - producto.price) / producto.compare_price) * 100)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-6">
        Inicio / {producto.categories?.name} / {producto.name}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagen */}
        <div className="bg-zinc-900 rounded-3xl h-[500px] relative overflow-hidden group shadow-2xl border border-white/5">
          <OptimizedImage
            src={producto.product_images?.[0]?.url || null}
            alt={producto.name}
            fill
            className="group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-1">{producto.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{producto.name}</h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-sm text-gray-400 ml-1">Sin reseñas aún</span>
          </div>

          {/* Precio */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              ${producto.price.toLocaleString('es-AR')}
            </span>
            {producto.compare_price && (
              <span className="text-lg text-gray-400 line-through">
                ${producto.compare_price.toLocaleString('es-AR')}
              </span>
            )}
            {descuento && (
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-full">
                -{descuento}%
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <Package size={16} className={producto.stock > 0 ? 'text-green-500' : 'text-red-500'} />
            <span className={`text-sm font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Sin stock'}
            </span>
          </div>

          {/* Descripción */}
          <p className="text-gray-600 mb-8 leading-relaxed">{producto.description}</p>

          <AddToCartButton product={producto} />
        </div>
      </div>
    </div>
  )
}