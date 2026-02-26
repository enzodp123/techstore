import { create } from 'zustand'

type Product = {
    id: string
    name: string
    slug: string
    price: number
    compare_price: number | null
    stock: number
    brand: string
    product_images?: { url: string }[]
}

type WishlistStore = {
    items: Product[]
    setItems: (items: Product[]) => void
    addItem: (item: Product) => void
    removeItem: (id: string) => void
    clearWishlist: () => void
    isFavorite: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
    items: [],

    setItems: (items) => set({ items }),

    addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (!existing) {
            set({ items: [...get().items, item] })
        }
    },

    removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

    clearWishlist: () => set({ items: [] }),

    isFavorite: (id) => get().items.some(i => i.id === id)
}))
