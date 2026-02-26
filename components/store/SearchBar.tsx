'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounce(query, 500)
    const [results, setResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const supabase = createClient()

    // Cerrar al hacer clic afuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Buscar en Supabase
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery.trim()) {
                setResults([])
                setIsSearching(false)
                return
            }

            setIsSearching(true)
            const { data, error } = await supabase
                .from('products')
                .select('id, name, slug, price, product_images(url)')
                .eq('is_active', true)
                .ilike('name', `%${debouncedQuery}%`)
                .limit(5)

            if (!error && data) {
                setResults(data)
            }
            setIsSearching(false)
        }

        fetchResults()
    }, [debouncedQuery, supabase])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            setIsOpen(false)
            router.push(`/productos?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div className="relative" ref={searchRef}>
            {/* Botón Icono */}
            {!isOpen && (
                <button
                    aria-label="Buscar"
                    onClick={() => setIsOpen(true)}
                    className="text-zinc-300 hover:text-white transition-colors relative group flex items-center p-2"
                >
                    <Search size={22} />
                    <span className="absolute bottom-1 left-2 right-2 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
            )}

            {/* Input Expandido */}
            {isOpen && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-full px-4 py-2 w-72 animate-in fade-in zoom-in-95 duration-200 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <Search size={18} className="text-zinc-400 mr-2 min-w-max" />
                    <form onSubmit={handleSubmit} className="flex-1">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Buscar productos..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-full"
                        />
                    </form>
                    {isSearching && <Loader2 size={16} className="text-blue-500 animate-spin ml-2 min-w-max" />}
                </div>
            )}

            {/* Resultados Autocompletado */}
            {isOpen && query.trim() !== '' && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-top-2">
                    {results.length > 0 ? (
                        <div className="flex flex-col">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/productos/${product.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-black rounded-lg relative overflow-hidden shrink-0">
                                        <OptimizedImage
                                            src={product.product_images?.[0]?.url || null}
                                            alt={product.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-zinc-500 font-bold">
                                            ${product.price.toLocaleString('es-AR')}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                            <Link
                                href={`/productos?q=${encodeURIComponent(query)}`}
                                onClick={() => setIsOpen(false)}
                                className="p-3 text-center text-xs font-bold text-blue-500 hover:bg-blue-500 hover:text-white transition-colors uppercase tracking-widest"
                            >
                                Ver todos los resultados
                            </Link>
                        </div>
                    ) : (
                        !isSearching && (
                            <div className="p-6 text-center text-zinc-500 text-sm">
                                No se encontraron productos para "{query}"
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}
