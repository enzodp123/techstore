'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useWishlistStore } from '@/store/wishlistStore'

export default function WishlistProvider() {
    const { setItems } = useWishlistStore()
    const supabase = createClient()

    useEffect(() => {
        const fetchWishlist = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) return

            // Obtenemos los id de los productos en la wishlist
            const { data: wishlists, error: wishError } = await supabase
                .from('wishlists')
                .select('product_id')
                .eq('user_id', user.id)

            if (wishError || !wishlists || wishlists.length === 0) return

            const productIds = wishlists.map(w => w.product_id)

            // Traemos los datos completos de los productos
            const { data: products, error: prodError } = await supabase
                .from('products')
                .select(`
          id, name, slug, price, compare_price, stock, brand,
          product_images ( url )
        `)
                .in('id', productIds)

            if (!prodError && products) {
                setItems(products)
            }
        }

        fetchWishlist()
    }, [])

    // Este componente no renderiza nada, solo maneja el estado global y mount
    return null
}
