import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Star, Package, ShieldCheck, Zap } from 'lucide-react'
import AddToCartButton from '@/components/store/AddToCartButton'
import OptimizedImage from '@/components/store/OptimizedImage'
import Link from 'next/link'

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: producto } = await supabase
    .from('products')
    .select('*, categories(name, slug), product_images(url)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!producto) notFound()

  const descuento = producto.compare_price && producto.compare_price > producto.price
    ? Math.round(((producto.compare_price - producto.price) / producto.compare_price) * 100)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">

      {/* Breadcrumb */}
      <p className="text-xs text-zinc-500 mb-10 font-medium tracking-wider uppercase">
        <Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link> /
        <Link href={`/categorias/${producto.categories?.slug}`} className="hover:text-blue-400 transition-colors mx-1">{producto.categories?.name}</Link> /
        <span className="text-zinc-300 ml-1">{producto.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

        {/* Imagen */}
        <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] aspect-square relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl w-full h-full" />
          <OptimizedImage
            src={producto.product_images?.[0]?.url || null}
            alt={producto.name}
            fill
            className="group-hover:scale-105 transition-transform duration-700 relative z-10 mix-blend-screen p-8 md:p-16 object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1">
          <p className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-3">{producto.brand}</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{producto.name}</h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-3 mb-8 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-full">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sin reseñas</span>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-8" />

          {/* Precio */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              ${producto.price.toLocaleString('es-AR')}
            </span>
            {producto.compare_price && (
              <span className="text-xl md:text-2xl text-zinc-500 font-bold line-through decoration-zinc-700">
                ${producto.compare_price.toLocaleString('es-AR')}
              </span>
            )}
            {descuento && (
              <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ml-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                -{descuento}% OFF
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-3 mb-10">
            <div className={`p-2.5 rounded-xl ${producto.stock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              <Package size={20} strokeWidth={2.5} />
            </div>
            <span className={`text-xs font-black uppercase tracking-widest ${producto.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {producto.stock > 0 ? `${producto.stock} unidades en stock` : 'Sin stock disponible'}
            </span>
          </div>

          {/* Descripción */}
          <div className="mb-10">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Descripción del Componente</h3>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg opacity-90">
              {producto.description || "Este componente no posee una descripción detallada en este momento, pero su rendimiento está garantizado por los altos estándares de la industria."}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <AddToCartButton product={producto} className="py-4 text-sm tracking-widest rounded-2xl" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest justify-center md:justify-start">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-blue-500/50" /> Compra Protegida</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full hidden sm:block" />
            <span className="flex items-center gap-2"><Zap size={16} className="text-blue-500/50" /> Envío Inmediato</span>
          </div>
        </div>
      </div>
    </div>
  )
}
