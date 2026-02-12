import { ReactNode } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
    title: string;
    value: string | number;
    unit: string;
    icon: LucideIcon;
    color?: string;
    trend?: 'up' | 'down' | 'stable';
}

export function SensorCard({ title, value, unit, icon: Icon, color = 'text-emerald-400', trend }: SensorCardProps) {
    return (
        <GlassCard className="relative group hover:border-white/20 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">{value}</span>
                        <span className="text-lg text-gray-500">{unit}</span>
                    </div>
                </div>
                <div className={`rounded-xl bg-white/5 p-3 ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            {/* Decorative gradient blob */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-current opacity-20 blur-2xl group-hover:opacity-30 transition-opacity ${color}`} />
        </GlassCard>
    );
}
