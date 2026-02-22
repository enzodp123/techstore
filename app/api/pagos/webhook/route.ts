import { NextRequest, NextResponse } from 'next/server'
import { mp } from '@/lib/mercadopago'
import { Preference } from 'mercadopago'

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

export async function POST(req: NextRequest) {
  try {
    const { items, payer } = await req.json()

    const preference = new Preference(mp)

    const response = await preference.create({
      body: {
        items: items.map((item: CartItem) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        payer: {
          name: payer.nombre,
          email: payer.email,
          phone: { number: payer.telefono },
          address: { street_name: payer.direccion },
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/checkout/gracias`,
          failure: `${process.env.NEXT_PUBLIC_URL}/checkout/error`,
          pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pendiente`,
        },
        auto_return: 'approved',
      },
    })

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al crear preferencia' }, { status: 500 })
  }
}