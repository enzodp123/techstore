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
    const inputRef = useRef<HTMLInputElement>(null)
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
        <div
            className={`relative flex items-center transition-all duration-300 ease-in-out ${isOpen ? 'w-[200px] sm:w-[260px] md:w-[280px]' : 'w-[40px]'} h-[40px]`}
            ref={searchRef}
        >
            {/* Botón Icono */}
            {!isOpen && (
                <button
                    aria-label="Buscar"
                    onClick={() => setIsOpen(true)}
                    className="text-zinc-300 hover:text-white transition-colors relative group flex items-center justify-center w-full h-full"
                >
                    <Search size={22} />
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
            )}

            {/* Input Expandido */}
            {isOpen && (
                <div className="flex items-center bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-full px-4 w-full h-full shadow-lg z-50">
                    <Search size={18} className="text-zinc-400 mr-2 shrink-0" />
                    <form onSubmit={handleSubmit} className="flex-1 min-w-0">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Buscar componentes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-500 w-full focus:ring-0 h-full"
                        />
                    </form>
                    {isSearching ? (
                        <Loader2 size={16} className="text-blue-500 animate-spin ml-2 shrink-0" />
                    ) : (
                        query.trim() !== '' && (
                            <button onClick={() => setQuery('')} className="ml-2 text-zinc-500 hover:text-white shrink-0">
                                <span className="sr-only">Limpiar búsqueda</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        )
                    )}
                </div>
            )}

            {/* Resultados Autocompletado */}
            {isOpen && query.trim() !== '' && (
                <div className="absolute top-full right-0 mt-3 w-screen max-w-[calc(100vw-2rem)] sm:max-w-md sm:w-[400px] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                    {results.length > 0 ? (
                        <div className="flex flex-col">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/productos/${product.slug}`}
                                    onClick={() => {
                                        setIsOpen(false)
                                        setQuery('')
                                    }}
                                    className="flex items-center gap-4 p-4 hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors group cursor-pointer"
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
