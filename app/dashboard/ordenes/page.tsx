import { createClient } from '@/lib/supabase/server'
import { Package } from 'lucide-react'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export default async function OrdenesPage() {
  const supabase = await createClient()

  const { data: ordenes } = await supabase
    .from('orders')
    .select('*, order_items(*, products(name))')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Órdenes</h1>

      {!ordenes || ordenes.length === 0 ? (
        <div className="bg-white rounded-xl p-20 text-center shadow-sm">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay órdenes todavía</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">ID</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Cliente</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Productos</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Total</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Estado</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Fecha</th>
                <th className="text-left px-6 py-4 text-gray-600 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenes.map((orden) => (
                <tr key={orden.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                    #{orden.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{orden.shipping_data?.nombre}</p>
                    <p className="text-gray-400 text-xs">{orden.shipping_data?.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {orden.order_items?.length} producto(s)
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    ${orden.total?.toLocaleString('es-AR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[orden.status] || 'bg-gray-100 text-gray-500'}`}>
                      {statusLabels[orden.status] || orden.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(orden.created_at).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      title="Cambiar estado de la orden"
                      defaultValue={orden.status}
                      onChange={async (e) => {
                        await fetch(`/api/ordenes/${orden.id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: e.target.value }),
                        })
                      }}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}