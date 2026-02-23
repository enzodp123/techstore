'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Search, Cpu, User, LogOut } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User as SupabaseUser } from '@supabase/supabase-js'

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
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-400">
          <Cpu size={24} /> TechStore
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/productos" className="hover:text-blue-400 transition-colors">Productos</Link>
          <Link href="/categorias/procesadores" className="hover:text-blue-400 transition-colors">Procesadores</Link>
          <Link href="/categorias/placas-de-video" className="hover:text-blue-400 transition-colors">Placas de Video</Link>
          <Link href="/categorias/memoria-ram" className="hover:text-blue-400 transition-colors">Memoria RAM</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/productos" className="hover:text-blue-400 transition-colors">
            <Search size={20} />
          </Link>
          <Link href="/carrito" className="relative hover:text-blue-400 transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors">
                <User size={16} /> {user.email?.split('@')[0]}
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
              Ingresar
            </Link>
          )}

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
          <Link href="/categorias/procesadores" onClick={() => setMenuOpen(false)}>Procesadores</Link>
          <Link href="/categorias/placas-de-video" onClick={() => setMenuOpen(false)}>Placas de Video</Link>
          <Link href="/categorias/memoria-ram" onClick={() => setMenuOpen(false)}>Memoria RAM</Link>
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-400">Cerrar sesión</button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>Ingresar</Link>
          )}
        </div>
      )}
    </header>
  )
}