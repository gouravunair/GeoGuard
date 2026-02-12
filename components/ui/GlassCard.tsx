import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-xl',
                className
            )}
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10 p-6">{children}</div>
        </div>
    );
}
