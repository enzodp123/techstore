/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const { items, payer } = await req.json()

    const preference = new Preference(mp)

    const response = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: 'ARS',
        })),
        payer: {
          name: payer.nombre,
          email: payer.email,
        },
        back_urls: {
          success: 'http://localhost:3000/checkout/gracias',
          failure: 'http://localhost:3000/checkout/error',
          pending: 'http://localhost:3000/checkout/pendiente',
        },
      },
    })

    return NextResponse.json({ init_point: response.init_point })
  } catch (error: any) {
    console.error('MP Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
//3218633989
//TESTUSER6376142293538721830
//DPLI7hNEG9
//633989

//5031 7557 3453 0604
//11/30