import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

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
    <Link href={`/productos/${product.slug}`} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all bg-white">
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
        {product.product_images?.[0]?.url ? (
          <Image 
            src={product.product_images[0].url} 
            alt={product.name} 
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover" 
          />
        ) : (
          <span className="text-gray-400 text-sm">Sin imagen</span>
        )}
        {descuento && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{descuento}%
          </span>
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toLocaleString('es-AR')}
          </span>
          {product.compare_price && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compare_price.toLocaleString('es-AR')}
            </span>
          )}
        </div>
        <p className={`text-xs mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
        </p>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
          <ShoppingCart size={16} />
          Agregar al carrito
        </button>
      </div>
    </Link>
  )
}