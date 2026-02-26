import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Tag, Users, Settings, LogOut, ChevronLeft } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/5 flex flex-col z-10 sticky top-0 h-screen">
        <div className="p-8 pb-4">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-tight text-white leading-none">Tech<span className="text-blue-500">Store</span></h2>
              <span className="text-xs font-medium text-blue-400 tracking-widest uppercase">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Principal</p>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 transition-all font-medium border border-blue-500/20">
            <LayoutDashboard size={18} /> Resumen
          </Link>
          <Link href="/dashboard/productos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium">
            <Package size={18} /> Productos
          </Link>
          <Link href="/dashboard/categorias" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium">
            <Tag size={18} /> Categorías
          </Link>
          <Link href="/dashboard/ordenes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium">
            <ShoppingBag size={18} /> Órdenes
          </Link>

          <p className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider mt-8 mb-4">Administración</p>
          <Link href="/dashboard/usuarios" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium">
            <Users size={18} /> Usuarios
          </Link>
          <Link href="/dashboard/configuracion" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium">
            <Settings size={18} /> Configuración
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all font-medium mb-2">
            <ChevronLeft size={18} /> Ir a la Tienda
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 h-screen overflow-y-auto z-10 bg-zinc-950/50">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
