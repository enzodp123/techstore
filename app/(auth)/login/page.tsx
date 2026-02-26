'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Cpu } from 'lucide-react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass rounded-2xl p-8 w-full max-w-md relative z-10 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight text-white mb-4 group">
            <div className="p-1.5 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
              <Cpu size={24} className="text-white" />
            </div>
            Tech<span className="text-blue-500">Store</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Iniciá sesión</h1>
          <p className="text-gray-400 text-sm mt-2">Ingresá a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-red-500" />
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              placeholder="juan@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-gray-600"
              placeholder="••••••••" />
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all mt-2 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  )
}