import { LucideIcon } from 'lucide-react'

interface StatCardProps {
    label: string
    value: string | number
    icon: LucideIcon
    color: string
    trend?: {
        value: number
        label: string
        isPositive: boolean
    }
}

export default function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
    return (
        <div className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
            {/* Background glow based on color prop */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none ${color}`} />

            <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-zinc-400 text-sm font-medium">{label}</span>
                <div className={`p-2.5 rounded-xl bg-zinc-900 border border-white/5 group-hover:scale-110 transition-transform`}>
                    <Icon size={18} className="text-white" />
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-3xl font-black text-white tracking-tight">{value}</p>

                {trend && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                        </span>
                        <span className="text-xs text-zinc-500">{trend.label}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
