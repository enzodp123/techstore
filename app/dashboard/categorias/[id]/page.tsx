'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'

export default function EditarCategoriaPage() {
  const router = useRouter()
  const { id } = useParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
  })

  useEffect(() => {
    supabase.from('categories')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) setForm({
          name: data.name,
          slug: data.slug,
          description: data.description || '',
        })
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      alert('Completá el nombre y el slug')
      return
    }
    setLoading(true)

    const { error } = await supabase.from('categories').update({
      name: form.name,
      slug: form.slug,
      description: form.description,
    }).eq('id', id)

    if (error) {
      alert('Error al guardar: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/categorias')
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro que querés eliminar esta categoría?')) return
    await supabase.from('categories').delete().eq('id', id)
    router.push('/dashboard/categorias')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/categorias" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Editar categoría</h1>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm transition-colors">
          <Trash2 size={16} /> Eliminar
        </button>
      </div>

      <div className="max-w-xl">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Nombre *</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-50" />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-colors">
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}