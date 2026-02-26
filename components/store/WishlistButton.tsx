'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function WishlistButton({ product, className = '' }: { product: any, className?: string }) {
    const { addItem, removeItem, isFavorite } = useWishlistStore()
    const [loading, setLoading] = useState(false)
    const isFav = isFavorite(product.id)
    const supabase = createClient()
    const router = useRouter()

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const { data: { user } } = await supabase.auth.getUser()

        // Si no está logueado, redirigimos al login
        if (!user) {
            router.push('/login')
            return
        }

        setLoading(true)

        if (isFav) {
            // Eliminar de Supabase y del estado global
            const { error } = await supabase
                .from('wishlists')
                .delete()
                .match({ user_id: user.id, product_id: product.id })

            if (!error) {
                removeItem(product.id)
            }
        } else {
            // Agregar a Supabase y al estado global
            const { error } = await supabase
                .from('wishlists')
                .insert([{ user_id: user.id, product_id: product.id }])

            if (!error) {
                addItem(product)
            }
        }

        setLoading(false)
    }

    return (
        <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`text-gray-400 hover:text-red-500 transition-colors z-20 ${className}`}
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            <Heart
                size={20}
                className={`transition-all ${isFav ? 'fill-red-500 text-red-500 scale-110' : 'hover:scale-110'}`}
            />
        </button>
    )
}
