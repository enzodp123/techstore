'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

type Props = {
  product: {
    id: string
    name: string
    slug: string
    price: number
    brand: string
    stock: number
  }
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      brand: product.brand,
      quantity: 1,
    })
    alert('Producto agregado al carrito ✓')
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors"
    >
      <ShoppingCart size={20} />
      Agregar al carrito
    </button>
  )
}