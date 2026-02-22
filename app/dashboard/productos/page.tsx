import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default async function DashboardProductosPage() {
  const supabase = await createClient()

  const { data: productos } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
        <Link
          href="/dashboard/productos/nuevo"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Producto</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Categoría</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Precio</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Stock</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Estado</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productos?.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{producto.name}</p>
                  <p className="text-gray-400 text-xs">{producto.brand}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {producto.categories?.name || '—'}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  ${producto.price.toLocaleString('es-AR')}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {producto.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    producto.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {producto.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/productos/${producto.id}`}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    >
                      <Pencil size={15} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}