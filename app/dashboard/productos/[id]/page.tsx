/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { compressAndConvertToWebP } from '@/lib/image-optimization'

interface Categoria {
  id: string
  name: string
  [key: string]: unknown
}

export default function EditarProductoPage() {
  const router = useRouter()
  const { id } = useParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

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

    supabase.from('products')
      .select('*, product_images(url)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            name: data.name,
            slug: data.slug,
            description: data.description || '',
            price: data.price.toString(),
            compare_price: data.compare_price?.toString() || '',
            stock: data.stock.toString(),
            brand: data.brand || '',
            sku: data.sku || '',
            category_id: data.category_id || '',
            is_active: data.is_active,
            is_featured: data.is_featured,
          })
          if (data.product_images?.[0]?.url) {
            setCurrentImage(data.product_images[0].url)
          }
        }
      })
  }, [id, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
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
      alert('Completá los campos obligatorios')
      return
    }
    setLoading(true)

    let imageUrl = currentImage

    if (imageFile) {
      // Optimizar imagen antes de subir
      const optimizedFile = await compressAndConvertToWebP(imageFile);
      const fileName = `${Date.now()}-${optimizedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, optimizedFile)

      if (uploadError) {
        alert('Error al subir imagen: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl

      await supabase.from('product_images').delete().eq('product_id', id)
      await supabase.from('product_images').insert({
        product_id: id,
        url: imageUrl,
        is_primary: true,
        position: 0,
      })
    }

    const { error } = await supabase.from('products').update({
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
      updated_at: new Date().toISOString(),
    }).eq('id', id)

    if (error) {
      alert('Error al guardar: ' + error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/productos')
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro que querés eliminar este producto?')) return
    await supabase.from('products').delete().eq('id', id)
    router.push('/dashboard/productos')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/productos" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Editar producto</h1>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm transition-colors">
          <Trash2 size={16} /> Eliminar producto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Información general</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Nombre *</label>
                <input name="name" value={form.name} onChange={handleChange} title="Nombre del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Slug (URL)</label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="Ingresá el slug" title="Slug del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange} title="Descripción del producto"
                  rows={4}
                  placeholder="Ingresá la descripción del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Imagen del producto</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              {imagePreview || currentImage ? (
                <div className="space-y-3">
                  <img src={imagePreview || currentImage!} alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg mx-auto" />
                  <label className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer">
                    Cambiar imagen
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 text-sm mb-3">Seleccioná una imagen</p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                    Seleccionar imagen
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Precio y stock</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Precio *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Ingresá el precio" title="Precio del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Precio anterior (tachado)</label>
                <input name="compare_price" type="number" value={form.compare_price} onChange={handleChange} placeholder="Ingresá el precio anterior" title="Precio anterior del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Ingresá el stock" title="Stock disponible"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange} placeholder="Ingresá el SKU" title="SKU del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Organización</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Marca</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Ingresá la marca" title="Marca del producto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
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

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition-colors">
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}