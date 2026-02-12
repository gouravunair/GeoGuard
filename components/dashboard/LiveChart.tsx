'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { SensorReading } from '@/types';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface LiveChartProps {
    data: SensorReading[];
}

export function LiveChart({ data }: LiveChartProps) {
    // Format data for chart
    const chartData = data.slice().map((reading) => ({
        time: new Date(reading.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        distance: reading.distance,
        humidity: reading.humidity,
    }));

    return (
        <GlassCard className="h-[400px] w-full p-4">
            <h3 className="mb-4 text-lg font-semibold text-white">Live Sensor Readings</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#9ca3af"
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                backdropFilter: 'blur(4px)',
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="distance"
                            stroke="#10b981"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorDistance)"
                            name="Distance (cm)"
                        />
                        <Area
                            type="monotone"
                            dataKey="humidity"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorHumidity)"
                            name="Humidity (%)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
