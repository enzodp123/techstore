import Link from 'next/link'
import { Cpu } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Cpu size={20} />
            TechStore
          </div>
          <p className="text-sm">Los mejores componentes para armar tu PC ideal.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Categorías</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categorias/procesadores" className="hover:text-white transition-colors">Procesadores</Link></li>
            <li><Link href="/categorias/placas-de-video" className="hover:text-white transition-colors">Placas de Video</Link></li>
            <li><Link href="/categorias/memoria-ram" className="hover:text-white transition-colors">Memoria RAM</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Info</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contacto</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Envíos</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © 2025 TechStore. Todos los derechos reservados.
      </div>
    </footer>
  )
}