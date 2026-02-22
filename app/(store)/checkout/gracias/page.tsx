import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function GraciasPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <CheckCircle size={72} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-3">¡Pedido confirmado!</h1>
      <p className="text-gray-500 mb-8">
        Gracias por tu compra. Te enviaremos un email con los detalles de tu pedido.
      </p>
      <Link href="/productos" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
        Seguir comprando
      </Link>
    </div>
  )
}