import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SensorReading, AlertLog } from '@/types';
import { generateMockSensorData, mockAlerts } from '@/lib/mockData';

export function useSensorData() {
    const [reading, setReading] = useState<SensorReading | null>(null);
    const [history, setHistory] = useState<SensorReading[]>([]);
    const [alerts, setAlerts] = useState<AlertLog[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    // Helper to map DB format to Frontend format
    const mapReading = (raw: any): SensorReading => {
        let risk: 'SAFE' | 'WARNING' | 'DANGER' = 'SAFE';
        const s = raw.status?.toUpperCase();
        if (s === 'DANGER' || s === 'CRITICAL' || s === 'ALERT') risk = 'DANGER';
        else if (s === 'WARNING') risk = 'WARNING';

        return {
            id: raw.id,
            created_at: raw.created_at,
            distance: raw.avg_distance_cm ?? raw.distance ?? 0,
            humidity: raw.humidity_percent ?? raw.humidity ?? 0,
            temperature: raw.temperature_c ?? raw.temperature ?? 0,
            risk_level: risk
        };
    };

    // Initial fetch
    useEffect(() => {
        async function fetchData() {
            try {
                // Try to fetch from Supabase
                const { data: sensorData, error } = await supabase
                    .from('landslide_readings')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (error) throw error;

                if (sensorData && sensorData.length > 0) {
                    const mapped = sensorData.map(mapReading);
                    setReading(mapped[0]);
                    setHistory(mapped.reverse());
                    setIsConnected(true);
                } else {
                    // Fallback to mock data if table is empty
                    const mock = generateMockSensorData();
                    setReading(mock);
                    setHistory([mock]);
                }
                const { data: alertData } = await supabase
                    .from('alerts')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (alertData) setAlerts(alertData);
                else setAlerts(mockAlerts);
            } catch (err) {
                console.warn('Supabase connection failed, using mock data:', err);
                const mock = generateMockSensorData();
                setReading(mock);
                setHistory([mock]);
                setAlerts(mockAlerts);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel('sensor-updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'landslide_readings',
                },
                (payload: any) => {
                    const newReading = mapReading(payload.new);

                    if (payload.eventType === 'INSERT') {
                        setReading(newReading);
                        setHistory((prev) => [...prev.slice(-49), newReading]);
                    } else if (payload.eventType === 'UPDATE') {
                        setReading((prev) => (prev && prev.id === newReading.id ? newReading : prev));
                        setHistory((prev) => prev.map((item) => (item.id === newReading.id ? newReading : item)));
                    }
                    setIsConnected(true);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'alerts',
                },
                (payload: any) => {
                    const newAlert = payload.new as AlertLog;
                    setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
                }
            )
            .subscribe((status: string) => {
                if (status === 'SUBSCRIBED') {
                    setIsConnected(true);
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { reading, history, alerts, isConnected, isLoading };
}
