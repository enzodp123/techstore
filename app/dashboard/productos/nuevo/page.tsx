'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { compressAndConvertToWebP } from '@/lib/image-optimization'

interface Category {
  id: string
  name: string
}

export default function NuevoProductoPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compare_price: '',
    stock: '',
    brand: '',
    sku: '',
    category_id: '',
    is_active: true,
    is_featured: false,
  })

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => {
      if (data) setCategorias(data)
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category_id) {
      alert('Completá los campos obligatorios: nombre, precio y categoría')
      return
    }
    setLoading(true)

    let imageUrl = null

    if (imageFile) {
      // Optimizar imagen antes de subir
      const optimizedFile = await compressAndConvertToWebP(imageFile);
      const fileName = `${Date.now()}-${optimizedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, optimizedFile);

      if (uploadError) {
        alert('Error al subir imagen: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    const { data: newProduct, error } = await supabase.from('products').insert({
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      compare_price: form.compare_price ? Number(form.compare_price) : null,
      stock: Number(form.stock) || 0,
      brand: form.brand,
      sku: form.sku || null,
      category_id: form.category_id,
      is_active: form.is_active,
      is_featured: form.is_featured,
    }).select().single()

    if (error) {
      alert('Error al guardar: ' + error.message)
      setLoading(false)
      return
    }

    if (imageUrl && newProduct) {
      await supabase.from('product_images').insert({
        product_id: newProduct.id,
        url: imageUrl,
        is_primary: true,
        position: 0,
      })
    }

    router.push('/dashboard/productos')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/productos" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Nuevo producto</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Información general</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Nombre *</label>
                <input name="name" value={form.name} onChange={handleNameChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="AMD Ryzen 5 7600X" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Slug (URL)</label>
                <input name="slug" value={form.slug} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-50"
                  placeholder="amd-ryzen-5-7600x" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Descripción del producto..." />
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Imagen del producto</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              {imagePreview ? (
                <div className="space-y-3">
                  <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-lg mx-auto" />
                  <button onClick={() => { setImageFile(null); setImagePreview(null) }}
                    className="text-sm text-red-500 hover:text-red-700">
                    Quitar imagen
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 text-sm mb-3">Arrastrá o seleccioná una imagen</p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                    Seleccionar imagen
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Precio y stock */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Precio y stock</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Precio *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="280000" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Precio anterior (tachado)</label>
                <input name="compare_price" type="number" value={form.compare_price} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="320000" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="10" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="CPU-R5-7600X" />
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Organización</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Marca</label>
                <input name="brand" value={form.brand} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="AMD" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Categoría *</label>
                <select name="category_id" value={form.category_id} onChange={handleChange} title="Seleccionar categoría"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  <option value="">Seleccionar...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" name="is_active" id="is_active"
                  checked={form.is_active} onChange={handleChange} className="w-4 h-4" />
                <label htmlFor="is_active" className="text-sm text-gray-600">Producto activo</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" name="is_featured" id="is_featured"
                  checked={form.is_featured} onChange={handleChange} className="w-4 h-4" />
                <label htmlFor="is_featured" className="text-sm text-gray-600">Producto destacado</label>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? 'Guardando...' : 'Guardar producto'}
          </button>
        </div>
      </div>
    </div>
  )
}