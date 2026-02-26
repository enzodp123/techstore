import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Package, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import OptimizedImage from '@/components/store/OptimizedImage'

export const revalidate = 0 // Forzamos dinamismo para ver el estado real de compras

export default async function MisComprasPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Traemos las órdenes del usuario con sus ítems
    const { data: ordenes, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (
        *,
        products (name, slug, product_images(url))
      )
    `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error al cargar órdenes:', error)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
                    MIS COMPRAS
                </h1>
                <div className="h-1 w-20 bg-blue-600 rounded-full mb-4" />
                <p className="text-zinc-500 font-medium tracking-wide text-sm">
                    Historial de tus últimos pedidos y su estado actual.
                </p>
            </div>

            {!ordenes || ordenes.length === 0 ? (
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-4xl border border-white/5 p-12 text-center shadow-2xl">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package size={40} className="text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Aún no tienes compras</h2>
                    <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
                        Explora nuestro catálogo y descubre los mejores componentes para tu próximo ensamble.
                    </p>
                    <Link
                        href="/productos"
                        className="inline-flex bg-white text-black font-black px-8 py-4 rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest text-sm"
                    >
                        Ir a la Tienda
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {ordenes.map((orden) => (
                        <div key={orden.id} className="bg-zinc-900/40 backdrop-blur-md rounded-4xl border border-white/5 overflow-hidden shadow-xl transition-all hover:border-white/10">
                            {/* Header de la Orden */}
                            <div className="bg-white/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Orden #{orden.id.slice(0, 8)}</span>
                                    <span className="text-sm font-medium text-zinc-300">
                                        {new Date(orden.created_at).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total</span>
                                        <span className="text-lg font-black text-white">${orden.total_amount.toLocaleString('es-AR')}</span>
                                    </div>

                                    <div className="h-10 w-px bg-white/10 hidden sm:block" />

                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Estado</span>
                                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${orden.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                            orden.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                orden.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                            {orden.status === 'completed' && <CheckCircle2 size={12} />}
                                            {orden.status === 'pending' && <Clock size={12} />}
                                            {orden.status === 'completed' ? 'COMPLETADO' :
                                                orden.status === 'pending' ? 'PENDIENTE' :
                                                    orden.status === 'processing' ? 'EN PROCESO' :
                                                        orden.status === 'cancelled' ? 'CANCELADO' : orden.status}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Items de la Orden */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {orden.order_items.map((item: any) => (
                                        <div key={item.id} className="flex items-center justify-between group p-2 rounded-xl hover:bg-white/5 transition-colors">
                                            <Link
                                                href={`/productos/${item.products?.slug}`}
                                                className="flex items-center gap-4 flex-1"
                                            >
                                                <div className="w-16 h-16 bg-black rounded-lg relative overflow-hidden shrink-0 border border-white/5">
                                                    <OptimizedImage
                                                        src={item.products?.product_images?.[0]?.url || null}
                                                        alt={item.products?.name || 'Producto'}
                                                        fill
                                                        className="object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                                        {item.products?.name}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                                                        <span>Cant: {item.quantity}</span>
                                                        <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                                        <span>${item.price_at_time.toLocaleString('es-AR')} c/u</span>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="font-bold text-white shrink-0">
                                                ${(item.quantity * item.price_at_time).toLocaleString('es-AR')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
