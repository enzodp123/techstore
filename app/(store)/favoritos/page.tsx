import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProductCard from '@/components/store/ProductCard'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata = {
    title: 'Mis Favoritos - TechStore',
    description: 'Tu lista de productos deseados',
}

export default async function FavoritosPage() {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="pt-32 pb-20 px-4 min-h-screen text-center flex flex-col items-center justify-center">
                <Heart size={64} className="text-zinc-800 mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4">Iniciá sesión</h1>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                    Necesitas iniciar sesión para poder guardar productos en tu lista de favoritos.
                </p>
                <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
                    Ir a Login
                </Link>
            </div>
        )
    }

    // Obtenemos los id de los productos en la wishlist
    const { data: wishlists } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id)

    const productIds = wishlists?.map((w) => w.product_id) || []

    // Traemos los datos completos de los productos
    let products: any[] = []
    if (productIds.length > 0) {
        const { data } = await supabase
            .from('products')
            .select(`
        id, name, slug, price, compare_price, stock, brand, is_featured,
        product_images ( url )
      `)
            .in('id', productIds)
        products = data || []
    }

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <Heart className="text-red-500" size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Mis Favoritos</h1>
                        <p className="text-zinc-400 text-sm mt-1">
                            {products.length} {products.length === 1 ? 'producto guardado' : 'productos guardados'}
                        </p>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((producto) => (
                            <ProductCard key={producto.id} product={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-2">Aún no tienes favoritos</h3>
                        <p className="text-zinc-400 mb-6">Explora el catálogo y guarda el hardware que más te guste.</p>
                        <Link href="/productos" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all inline-block">
                            Ver Catálogo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
