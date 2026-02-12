import { GlassCard } from '@/components/ui/GlassCard';
import { AlertLog } from '@/types';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface AlertsTableProps {
    alerts: AlertLog[];
}

export function AlertsTable({ alerts }: AlertsTableProps) {
    return (
        <GlassCard className="h-full">
            <h3 className="mb-4 text-lg font-semibold text-white">Alert History</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {alerts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No alerts recorded.</p>
                ) : (
                    alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 p-3 text-sm transition-colors hover:bg-white/10"
                        >
                            <div className="mt-0.5 shrink-0">
                                {alert.risk_level === 'DANGER' ? (
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                ) : alert.risk_level === 'WARNING' ? (
                                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-white">{alert.message}</p>
                                <p className="text-xs text-gray-500 text-end mt-2">
                                    {new Date(alert.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
}
