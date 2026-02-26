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
            <span aria-label="Twitter" className="w-10 h-10 rounded-xl glass flex items-center justify-center opacity-50 cursor-not-allowed" title="Próximamente">
              <Twitter size={18} />
            </span>
            <span aria-label="Github" className="w-10 h-10 rounded-xl glass flex items-center justify-center opacity-50 cursor-not-allowed" title="Próximamente">
              <Github size={18} />
            </span>
            <span aria-label="Instagram" className="w-10 h-10 rounded-xl glass flex items-center justify-center opacity-50 cursor-not-allowed" title="Próximamente">
              <Instagram size={18} />
            </span>
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
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Sobre TechStore</span></li>
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Sostenibilidad</span></li>
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Prensa</span></li>
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Contacto</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Soporte</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Centro de Ayuda</span></li>
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Garantías</span></li>
            <li><span className="text-gray-600 cursor-not-allowed" title="Próximamente">Envíos y Tracking</span></li>
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
        <div className="flex gap-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <span className="cursor-not-allowed" title="Próximamente">Privacidad</span>
          <span className="cursor-not-allowed" title="Próximamente">Términos</span>
          <span className="cursor-not-allowed" title="Próximamente">Cookies</span>
        </div>
      </div>
    </footer>
  )
}