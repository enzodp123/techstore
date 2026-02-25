'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface Props {
  product: {
    id: string
    name: string
    slug: string
    price: number
    brand: string
    stock: number
  }
  className?: string
  showIcon?: boolean
}

export default function AddToCartButton({ product, className = '', showIcon = true }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      brand: product.brand,
      quantity: 1,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0 || added}
      className={`
        w-full flex items-center justify-center gap-2 
        ${added ? 'bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'} 
        disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none
        text-white font-bold transition-all duration-300 
        shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] 
        active:scale-95
        ${className}
      `}
    >
      {added ? (
        <>
          <Check size={16} strokeWidth={3} />
          AGREGADO
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart size={16} strokeWidth={2.5} />}
          AGREGAR AL CARRITO
        </>
      )}
    </button>
  )
}