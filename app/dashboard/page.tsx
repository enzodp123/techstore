import { createClient } from '@/lib/supabase/server'
import { Package, ShoppingBag, Tag, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { count: totalProductos } = await supabase
    .from('products').select('*', { count: 'exact', head: true })

  const { count: totalCategorias } = await supabase
    .from('categories').select('*', { count: 'exact', head: true })

  const stats = [
    { label: 'Productos', value: totalProductos || 0, icon: Package, color: 'bg-blue-500' },
    { label: 'Categorías', value: totalCategorias || 0, icon: Tag, color: 'bg-purple-500' },
    { label: 'Órdenes', value: 0, icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Ingresos', value: '$0', icon: DollarSign, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Panel de control</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icono = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">{stat.label}</span>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icono size={18} className="text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}