import { createClient } from '@/lib/supabase/server'
import { Package, ShoppingBag, Tag, DollarSign, Users } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import SalesChart from '@/components/admin/SalesChart'
import RecentOrdersTable from '@/components/admin/RecentOrdersTable'
import { startOfDay, subDays, format } from 'date-fns'

export const revalidate = 0 // Disable cache for dashboard

export default async function DashboardPage() {
  const supabase = await createClient()

  // Promesas en paralelo para mayor velocidad
  const [
    { count: totalProductos },
    { count: totalCategorias },
    { data: ordersData },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }),
  ])

  const orders = ordersData || []

  // Calcular totales
  const totalIngresos = orders
    .filter(o => o.status === 'completed' || o.status === 'shipped')
    .reduce((acc, order) => acc + (order.total_amount || 0), 0)

  // Preparar datos para el gráfico de ventas (últimos 7 días)
  const salesMap = new Map()
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'dd/MM')
    salesMap.set(date, 0)
  }

  orders.forEach(order => {
    // Only map valid orders to chart
    if (order.status !== 'cancelled') {
      const date = format(new Date(order.created_at), 'dd/MM')
      if (salesMap.has(date)) {
        salesMap.set(date, salesMap.get(date) + (order.total_amount || 0))
      }
    }
  })

  const salesData = Array.from(salesMap, ([name, total]) => ({ name, total }))

  // Formatear últimas órdenes para la tabla
  const recentOrders = orders.slice(0, 5).map(o => ({
    id: o.id,
    created_at: o.created_at,
    total_amount: o.total_amount,
    status: o.status,
    user_email: o.user_id ? o.user_id.slice(0, 8) + '...' : 'Anónimo', // Fallback seguro
  }))

  const stats = [
    { label: 'Ingresos Totales', value: `$${(totalIngresos / 1000).toFixed(1)}k`, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Órdenes', value: orders.length, icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Productos', value: totalProductos || 0, icon: Package, color: 'bg-purple-500' },
    { label: 'Categorías', value: totalCategorias || 0, icon: Tag, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Resumen General</h1>
        <p className="text-zinc-400 mt-1">Monitorea el estado y las métricas de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div className="lg:col-span-1 glass rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <Users className="text-blue-500" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Más Estadísticas Pronto</h3>
          <p className="text-zinc-400 text-sm">En próximas actualizaciones añadiremos usuarios activos y productos más vendidos.</p>
        </div>
      </div>

      <div>
        <RecentOrdersTable orders={recentOrders} />
      </div>
    </div>
  )
}
