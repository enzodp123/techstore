import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Order {
    id: string
    created_at: string
    total_amount: number
    status: string
    user_email: string
}

interface RecentOrdersTableProps {
    orders: Order[]
}

const statusStyles = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    shipped: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    delivered: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    cancelled: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
} as Record<string, string>

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(value)
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
    return (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Últimas Órdenes</h3>
                    <p className="text-sm text-zinc-400">Transacciones recientes en la plataforma.</p>
                </div>
                <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                    Ver todas
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-zinc-900/50 text-zinc-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">ID de Orden</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                    No hay órdenes recientes.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-zinc-300">
                                        #{order.id.slice(0, 8)}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {order.user_email}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">
                                        {format(new Date(order.created_at), "d 'de' MMM, yyyy", { locale: es })}
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        {formatCurrency(order.total_amount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[order.status] || 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
