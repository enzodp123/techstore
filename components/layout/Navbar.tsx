'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Cpu, User, LogOut, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User as SupabaseUser } from '@supabase/supabase-js'
import SearchBar from '@/components/store/SearchBar'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const items = useCartStore((s) => s.items)
  const totalItems = items.reduce((a, i) => a + i.quantity, 0)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white group">
          <div className="p-1.5 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu size={20} className="text-white" />
          </div>
          Tech<span className="text-blue-500">Store</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/productos" className="text-gray-300 hover:text-white transition-colors">Productos</Link>
          <Link href="/categorias/procesadores" className="text-gray-300 hover:text-white transition-colors">Procesadores</Link>
          <Link href="/categorias/placas-de-video" className="text-gray-300 hover:text-white transition-colors">Placas</Link>
          <Link href="/categorias/memoria-ram" className="text-gray-300 hover:text-white transition-colors">RAM</Link>
        </nav>

        <div className="flex items-center gap-5 relative z-50">
          <SearchBar />

          <Link href="/carrito" className="relative text-gray-300 hover:text-white transition-colors group">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-black">
              {totalItems}
            </span>
          </Link>

          <div className="h-6 w-px bg-white/10 hidden md:block" />

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {/* Dashboard para Admin (basado en que el email provenga de alguna lista, aquí lo mostramos siempre pero el middleware lo protege) */}
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors p-1" title="Panel de Administración">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center hover:bg-blue-600/20">
                  <User size={14} className="text-blue-400" />
                </div>
              </Link>

              {/* Mis Compras para Clientes */}
              <Link href="/mis-compras" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10">
                <Package size={14} className="text-blue-400" />
                <span className="hidden lg:inline">Mis Compras</span>
              </Link>

              <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors p-1 ml-2" title="Cerrar sesión">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Ingresar
            </Link>
          )}

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-4 right-4 md:hidden glass rounded-2xl p-6 flex flex-col gap-6 text-base animate-in fade-in slide-in-from-top-4 duration-300">
          <Link href="/productos" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Productos</Link>
          <div className="h-px bg-white/10" />
          <Link href="/categorias/procesadores" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Procesadores</Link>
          <Link href="/categorias/placas-de-video" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Placas de Video</Link>
          <Link href="/categorias/memoria-ram" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Memoria RAM</Link>
          <div className="h-px bg-white/10" />
          {user ? (
            <>
              <Link href="/mis-compras" className="text-gray-300 hover:text-white flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <Package size={18} /> Mis Compras
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                <User size={18} /> Administración
              </Link>
              <button onClick={handleLogout} className="text-left text-red-500 font-medium">Cerrar sesión</button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white text-center py-3 rounded-xl font-semibold" onClick={() => setMenuOpen(false)}>
              Ingresar
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
