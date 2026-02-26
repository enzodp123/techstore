import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import AddToCartButton from './AddToCartButton'

type Product = {
  id: string
  name: string
  slug: string
  price: number
  compare_price: number | null
  stock: number
  brand: string
  is_featured: boolean
  product_images?: { url: string }[]
}

export default function ProductCard({ product }: { product: Product }) {
  const descuento = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all duration-300"
    >
      <div className="relative aspect-square bg-zinc-800/30 overflow-hidden">
        <OptimizedImage
          src={product.product_images?.[0]?.url || null}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {descuento !== null && descuento > 0 && (
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
              -{descuento}%
            </span>
          )}
          {!!product.is_featured && (
            <span className="bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
              DESTACADO
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5">{product.brand}</p>
        <h3 className="font-medium text-white text-sm mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 min-h-10 leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-white tracking-tight">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.compare_price && (
              <span className="text-xs text-zinc-500 line-through decoration-zinc-600">
                ${product.compare_price.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mb-4">
            <div className={`flex items-center gap-1.5 text-[10px] font-medium ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <div className={`w-1 h-1 rounded-full ${product.stock > 0 ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'bg-red-400'}`} />
              {product.stock > 0 ? `${product.stock} DISPONIBLES` : 'SIN STOCK'}
            </div>
          </div>

          <AddToCartButton
            product={product}
            className="py-2.5 rounded-xl text-[10px]"
            showIcon={true}
          />
        </div>
      </div>
    </Link>
  )
}