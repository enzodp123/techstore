import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Tag } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="font-bold text-lg text-blue-400">TechStore Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <LayoutDashboard size={18} /> Resumen
          </Link>
          <Link href="/dashboard/productos" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <Package size={18} /> Productos
          </Link>
          <Link href="/dashboard/ordenes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <ShoppingBag size={18} /> Órdenes
          </Link>
          <Link href="/dashboard/categorias" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm">
            <Tag size={18} /> Categorías
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}