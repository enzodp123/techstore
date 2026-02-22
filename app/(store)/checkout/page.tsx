'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
  })

  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No tenés productos en el carrito</h2>
        <Link href="/productos" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          Ver productos
        </Link>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async () => {
  if (!form.nombre || !form.email || !form.direccion || !form.ciudad) {
    alert('Por favor completá todos los campos obligatorios')
    return
  }
  setLoading(true)

  try {
    const res = await fetch('/api/pagos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        payer: form,
      }),
    })

    const data = await res.json()

    if (data.init_point) {
      window.location.href = data.init_point // redirige a MercadoPago
    } else {
      alert('Error al procesar el pago')
      setLoading(false)
    }
  } catch (error) {
    console.error(error)
    alert('Error al conectar con MercadoPago')
    setLoading(false)
  }
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Formulario */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Datos de contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Nombre completo *</label>
                <input name="nombre" value={form.nombre} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Juan García" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="juan@email.com" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Teléfono</label>
                <input name="telefono" value={form.telefono} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="11 1234-5678" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Dirección de envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 mb-1 block">Dirección *</label>
                <input name="direccion" value={form.direccion} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Av. Corrientes 1234, Piso 2" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Ciudad *</label>
                <input name="ciudad" value={form.ciudad} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Buenos Aires" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Provincia</label>
                <input name="provincia" value={form.provincia} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Buenos Aires" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Código Postal</label>
                <input name="codigoPostal" value={form.codigoPostal} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="1414" />
              </div>
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate mr-2">{item.name} x{item.quantity}</span>
                <span className="shrink-0">${(item.price * item.quantity).toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total().toLocaleString('es-AR')}</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Próximamente integración con MercadoPago
          </p>
        </div>
      </div>
    </div>
  )
}