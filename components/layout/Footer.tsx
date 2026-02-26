import Link from 'next/link'
import { Cpu, Github, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Cpu size={20} className="text-white" />
            </div>
            Tech<span className="text-blue-500">Store</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Líderes en hardware de alto rendimiento. Construyendo el futuro de la computación con componentes de grado industrial.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Twitter size={18} />
            </Link>
            <Link href="#" aria-label="Github" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Github size={18} />
            </Link>
            <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Instagram size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navegación</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="/productos" className="hover:text-blue-400 transition-colors">Catálogo Completo</Link></li>
            <li><Link href="/categorias/procesadores" className="hover:text-blue-400 transition-colors">Procesadores</Link></li>
            <li><Link href="/categorias/placas-de-video" className="hover:text-blue-400 transition-colors">Placas de Video</Link></li>
            <li><Link href="/categorias/memoria-ram" className="hover:text-blue-400 transition-colors">Memoria RAM</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Empresa</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Sobre TechStore</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Sostenibilidad</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Prensa</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Soporte</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Centro de Ayuda</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Garantías</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition-colors">Envíos y Tracking</Link></li>
            <li className="flex items-center gap-2 text-blue-400 font-medium">
              <Mail size={16} /> support@techstore.io
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-400 text-xs">
          © 2024 TechStore. Todos los derechos reservados. Diseñado para el alto rendimiento.
        </p>
        <div className="flex gap-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="#" className="hover:text-white transition-colors">Términos</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}