'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl">
          <ShoppingBag size={40} className="text-zinc-600" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Tu carrito está vacío</h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">Agregá productos para empezar</p>
        <Link href="/productos" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
          Tu carrito
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Lista de items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-900 border border-white/10 rounded-2xl p-4">

              {/* Imagen placeholder */}
              <div className="bg-zinc-950 rounded-xl w-24 h-24 flex items-center justify-center shrink-0 border border-white/5">
                <ShoppingBag size={24} className="text-zinc-700" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">{item.brand}</p>
                <h3 className="font-bold text-white text-base truncate">{item.name}</h3>
                <p className="text-blue-500 font-bold mt-2 text-lg">
                  ${item.price.toLocaleString('es-AR')}
                </p>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                {/* Cantidad */}
                <div className="flex items-center gap-3 bg-zinc-950 border border-white/5 rounded-xl p-1">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="hidden sm:block text-right min-w-[100px]">
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Subtotal</p>
                  <p className="font-bold text-white text-lg">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                </div>

                {/* Eliminar */}
                <button
                  type="button"
                  aria-label="Eliminar producto"
                  onClick={() => removeItem(item.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Resumen de compra</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
              <span className="text-white font-medium">${total().toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Envío</span>
              <span className="text-green-500 font-medium">A calcular</span>
            </div>
            <div className="h-px bg-white/10 my-4" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-white text-lg uppercase">Total</span>
              <span className="font-black text-blue-500 text-2xl">${total().toLocaleString('es-AR')}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            Finalizar compra
          </Link>
          <Link
            href="/productos"
            className="block w-full text-center text-zinc-500 hover:text-white py-4 mt-2 text-sm font-medium transition-colors uppercase tracking-wider"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}