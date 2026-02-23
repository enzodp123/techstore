import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

export default async function DashboardCategoriasPage() {
  const supabase = await createClient()

  const { data: categorias } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
        <Link
          href="/dashboard/categorias/nueva"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Nueva categoría
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Nombre</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Slug</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Descripción</th>
              <th className="text-left px-6 py-4 text-gray-600 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categorias?.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{cat.slug}</td>
                <td className="px-6 py-4 text-gray-500">{cat.description || '—'}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/categorias/${cat.id}`}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors inline-flex"
                  >
                    <Pencil size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}