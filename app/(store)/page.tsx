import Link from 'next/link'
import { ArrowRight, Cpu, Monitor, MemoryStick, HardDrive, Zap, ShieldCheck, Globe } from 'lucide-react'
import OptimizedImage from '@/components/store/OptimizedImage'

export const revalidate = 3600

const categorias = [
  { nombre: 'Procesadores', slug: 'procesadores', icono: Cpu, color: 'from-blue-600 to-indigo-600', desc: 'El corazón de tu próxima gran idea.' },
  { nombre: 'Placas de Video', slug: 'placas-de-video', icono: Monitor, color: 'from-purple-600 to-pink-600', desc: 'Rendimiento visual sin precedentes.' },
  { nombre: 'Memoria RAM', slug: 'memoria-ram', icono: MemoryStick, color: 'from-emerald-500 to-teal-600', desc: 'Multitarea fluida y velocidad extrema.' },
  { nombre: 'Almacenamiento', slug: 'almacenamiento', icono: HardDrive, color: 'from-orange-500 to-red-600', desc: 'Espacio masivo para todo tu mundo.' },
]

export default function HomePage() {
  return (
    <div className="bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-left-4 duration-500">
              <Zap size={14} /> Nueva Generación 2026
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none animate-in fade-in slide-in-from-left-6 duration-700">
              POTENCIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500">
                SIN LÍMITES
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-8 duration-900">
              Diseñamos experiencias de hardware inmersivas con los componentes más avanzados del mercado global.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Link
                href="/productos"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center gap-2"
              >
                Explorar Catálogo <ArrowRight size={20} />
              </Link>
              <Link
                href="/categorias/procesadores"
                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all"
              >
                Armar PC
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 text-gray-400 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">50k+</span>
                <span className="text-xs uppercase tracking-tighter text-gray-300">Ventas</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">24/7</span>
                <span className="text-xs uppercase tracking-tighter text-gray-300">Soporte</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">100%</span>
                <span className="text-xs uppercase tracking-tighter text-gray-300">Garantía</span>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000 hidden md:block w-full aspect-[4/5] max-w-md mx-auto">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-colors" />
            <OptimizedImage
              src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=2070"
              alt="High-end PC"
              fill
              className="rounded-2xl shadow-2xl border border-white/10 transform transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2 object-cover"
            />
            {/* Float Elements */}
            <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl animate-bounce duration-[3000ms]">
              <Cpu size={32} className="text-blue-400" />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest">En Stock para Envío</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Glassmorphism */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              EQUIPAMIENTO <span className="text-blue-500">ELITE</span>
            </h2>
            <p className="text-gray-400 max-w-md">Seleccionamos cada componente bajo estándares de rendimiento industrial.</p>
          </div>
          <Link href="/productos" className="text-blue-400 font-bold flex items-center gap-2 group">
            Ver todas las categorías <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorias.map((cat) => {
            const Icono = cat.icono
            return (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group relative h-[360px] glass rounded-[2.5rem] p-8 overflow-hidden transition-all hover:border-blue-500/50 hover:-translate-y-2"
              >
                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity`} />

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                  <Icono size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{cat.nombre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{cat.desc}</p>

                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-500">Ver Modelos</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Promotional Call-out */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-blue-600" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-transparent to-blue-900" />

          <div className="relative p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">Oferta exclusiva</span>
              <h3 className="text-4xl md:text-6xl font-black leading-none">ÚNETE AL <br /> TECH CLUB.</h3>
              <p className="text-blue-100 text-lg max-w-md">Recibe <strong>10% OFF</strong> en tu primera compra y acceso anticipado a stock limitado.</p>
            </div>

            <div className="flex flex-col gap-4 min-w-[300px]">
              <div className="flex p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 focus-within:border-white transition-colors">
                <input
                  type="email"
                  placeholder="Tu email..."
                  className="bg-transparent border-none outline-none px-4 py-3 flex-1 text-white placeholder:text-blue-200"
                />
                <button className="bg-white text-blue-600 font-black px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm uppercase">
                  Enviar
                </button>
              </div>
              <p className="text-[10px] text-blue-300 uppercase tracking-widest font-medium opacity-70">Privacidad garantizada. Sin spam.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold">Envíos Globales</h4>
              <p className="text-gray-500 text-sm">Llegamos a cada rincón con logística de alta precisión.</p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold">Seguridad Cripto</h4>
              <p className="text-gray-500 text-sm">Tus transacciones protegidas por encriptación de grado militar.</p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold">Soporte Ultra</h4>
              <p className="text-gray-500 text-sm">Expertos técnicos listos para optimizar tu setup.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'TechStore — Redefiniendo el Hardware',
  description: 'Los mejores componentes al mejor precio con envíos globales.',
}

