/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function OrdenDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: orden } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name, price))')
    .eq('id', id)
    .single()

  if (!orden) notFound()

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/ordenes" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Orden #{orden.id.slice(0, 8)}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Datos del cliente</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Nombre:</span> {orden.shipping_data?.nombre}</p>
            <p><span className="font-medium">Email:</span> {orden.shipping_data?.email}</p>
            <p><span className="font-medium">Teléfono:</span> {orden.shipping_data?.telefono || '—'}</p>
            <p><span className="font-medium">Dirección:</span> {orden.shipping_data?.direccion}</p>
            <p><span className="font-medium">Ciudad:</span> {orden.shipping_data?.ciudad}</p>
            <p><span className="font-medium">Provincia:</span> {orden.shipping_data?.provincia || '—'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Productos</h2>
          <div className="space-y-3">
            {orden.order_items?.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.products?.name} x{item.quantity}</span>
                <span className="font-medium">${item.subtotal?.toLocaleString('es-AR')}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${orden.total?.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}