'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

interface SalesChartProps {
    data: {
        name: string
        total: number
    }[]
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(value)
}

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="glass rounded-2xl p-6 border border-white/5 h-[400px]">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight">Ingresos Mensuales</h3>
                <p className="text-sm text-zinc-400">Resumen de ventas de los últimos días.</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#09090b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#60a5fa' }}
                            formatter={(value: any) => [formatCurrency(value as number), 'Ingresos']}
                        />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTotal)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
