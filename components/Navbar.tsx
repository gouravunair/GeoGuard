import { Activity } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 p-4">
            <GlassCard className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                        <Activity className="h-6 w-6" />
                    </div>
                    <span className="text-lg font-bold tracking-wide text-white">
                        GeoGuard <span className="text-emerald-400">AI</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-emerald-400">System Online</span>
                    </div>
                </div>
            </GlassCard>
        </nav>
    );
}
