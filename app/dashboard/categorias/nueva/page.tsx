'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NuevaCategoriaPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generateSlug = (name: string) =>
    name.toLowerCase().trim()
      .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setForm({ ...form, name, slug: generateSlug(name) })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      alert('Completá el nombre y el slug')
      return
    }
    setLoading(true)

    const { error } = await supabase.from('categories').insert({
      name: form.name,
      slug: form.slug,
      description: form.description,
    })

    if (error) {
      alert('Error al guardar: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/categorias')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/categorias" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Nueva categoría</h1>
      </div>

      <div className="max-w-xl">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Nombre *</label>
            <input name="name" value={form.name} onChange={handleNameChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Procesadores" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
              placeholder="procesadores" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Descripción de la categoría..." />
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-colors">
            {loading ? 'Guardando...' : 'Guardar categoría'}
          </button>
        </div>
      </div>
    </div>
  )
}