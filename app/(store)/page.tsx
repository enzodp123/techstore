import Link from 'next/link'
import { ArrowRight, Cpu, Monitor, MemoryStick, HardDrive } from 'lucide-react'

const categorias = [
  { nombre: 'Procesadores', slug: 'procesadores', icono: Cpu, color: 'bg-blue-500' },
  { nombre: 'Placas de Video', slug: 'placas-de-video', icono: Monitor, color: 'bg-purple-500' },
  { nombre: 'Memoria RAM', slug: 'memoria-ram', icono: MemoryStick, color: 'bg-green-500' },
  { nombre: 'Almacenamiento', slug: 'almacenamiento', icono: HardDrive, color: 'bg-orange-500' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Armá la PC <span className="text-blue-400">de tus sueños</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Los mejores componentes de hardware al mejor precio. Envíos a todo el país.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Ver productos <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Explorá por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((cat) => {
            const Icono = cat.icono
            return (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className={`${cat.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform`}>
                  <Icono size={24} />
                </div>
                <span className="font-medium text-gray-700">{cat.nombre}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Banner promocional */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-blue-600 rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">¿Primera compra?</h3>
          <p className="mb-6 text-blue-100">Usá el código <span className="font-bold bg-white text-blue-600 px-2 py-1 rounded">TECH10</span> y obtené 10% de descuento</p>
          <Link href="/productos" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Comprar ahora
          </Link>
        </div>
      </section>
    </div>
  )
}