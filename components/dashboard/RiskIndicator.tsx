import { GlassCard } from '@/components/ui/GlassCard';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskIndicatorProps {
    level: 'SAFE' | 'WARNING' | 'DANGER';
}

export function RiskIndicator({ level }: RiskIndicatorProps) {
    const config = {
        SAFE: {
            color: 'bg-emerald-500',
            text: 'text-emerald-400',
            shadow: 'shadow-emerald-500/20',
            icon: CheckCircle,
            label: 'System Safe',
            message: 'No landslide risk detected.',
            pulse: false,
        },
        WARNING: {
            color: 'bg-yellow-500',
            text: 'text-yellow-400',
            shadow: 'shadow-yellow-500/20',
            icon: AlertTriangle,
            label: 'Caution Required',
            message: 'Conditions approaching thresholds.',
            pulse: true,
        },
        DANGER: {
            color: 'bg-red-500',
            text: 'text-red-500',
            shadow: 'shadow-red-500/30',
            icon: AlertCircle,
            label: 'CRITICAL RISK',
            message: 'Immediate evacuation logic triggered.',
            pulse: true,
        },
    };

    const current = config[level];
    const Icon = current.icon;

    return (
        <GlassCard className="text-center relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-1 ${current.color}`} />

            <div className="flex flex-col items-center justify-center py-4">
                <div className="relative">
                    {current.pulse && (
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full ${current.color} opacity-20`}
                        />
                    )}
                    <div className={`relative z-10 rounded-full p-4 ${current.color} bg-opacity-20`}>
                        <Icon className={`h-12 w-12 ${current.text}`} />
                    </div>
                </div>

                <h2 className={`mt-4 text-2xl font-bold ${current.text} tracking-wider`}>
                    {current.label}
                </h2>
                <p className="mt-2 text-sm text-gray-400">{current.message}</p>
            </div>
        </GlassCard>
    );
}
