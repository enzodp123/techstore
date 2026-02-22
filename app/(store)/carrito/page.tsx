'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-6">Agregá productos para empezar</p>
        <Link href="/productos" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Lista de items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4">
              
              {/* Imagen placeholder */}
              <div className="bg-gray-100 rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-xs text-gray-400">{item.brand}</p>
                <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  ${item.price.toLocaleString('es-AR')}
                </p>
              </div>

              {/* Cantidad */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal */}
              <p className="font-bold text-gray-800 w-24 text-right">
                ${(item.price * item.quantity).toLocaleString('es-AR')}
              </p>

              {/* Eliminar */}
              <button
                type="button"
                aria-label="Eliminar producto"
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 transition-colors ml-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} productos)</span>
              <span>${total().toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span className="text-green-600">A calcular</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total().toLocaleString('es-AR')}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            Finalizar compra
          </Link>
          <Link
            href="/productos"
            className="block w-full text-center text-gray-500 hover:text-gray-700 py-3 text-sm transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}