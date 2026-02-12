'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { TerrainBackground } from '@/components/3d/TerrainBackground';
import { SensorCard } from '@/components/dashboard/SensorCard';
import { RiskIndicator } from '@/components/dashboard/RiskIndicator';
import { LiveChart } from '@/components/dashboard/LiveChart';
import { AlertsTable } from '@/components/dashboard/AlertsTable';
import { Modal } from '@/components/ui/Modal';
import { useSensorData } from '@/hooks/useSensorData';
import { Droplets, Ruler, Thermometer } from 'lucide-react';

export default function Dashboard() {
    const { reading, history, alerts, isLoading } = useSensorData();
    const [showModal, setShowModal] = useState(false);
    // Audio alert system
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !audioRef.current) {
            audioRef.current = new Audio('/sounds/alert.mp3');
        }
    }, []);

    useEffect(() => {
        if (reading?.risk_level === 'DANGER') {
            setShowModal(true);
            if (audioRef.current) {
                audioRef.current.loop = true;
                audioRef.current.play().catch(e => console.log("Audio play failed interaction", e));
            }
        } else {
            setShowModal(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [reading?.risk_level]);

    const handleCloseModal = () => {
        setShowModal(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                    <p className="text-emerald-400 font-mono">Loading System...</p>
                </div>
            </div>
        );
    }

    // Safe fallback if reading is null (shouldn't happen with mock data fallback)
    const currentRisk = reading?.risk_level || 'SAFE';

    return (
        <div className="min-h-screen relative text-white">
            {/* Dynamic Background */}
            <TerrainBackground riskLevel={currentRisk} />

            <Navbar />

            <main className="container mx-auto px-4 pt-24 pb-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Key Metrics - Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <RiskIndicator level={currentRisk} />

                        {/* Last Updated Timestamp */}
                        <GlassCard className="p-3 text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Last Updated</p>
                            <p className="text-sm font-mono text-emerald-400 mt-1">
                                {reading?.created_at
                                    ? new Date(reading.created_at).toLocaleTimeString()
                                    : '--:--:--'}
                            </p>
                        </GlassCard>

                        <SensorCard
                            title="Ground Distance"
                            value={reading?.distance || 0}
                            unit="cm"
                            icon={Ruler}
                            color="text-cyan-400"
                        />
                        <SensorCard
                            title="Humidity"
                            value={reading?.humidity || 0}
                            unit="%"
                            icon={Droplets}
                            color="text-blue-400"
                        />
                        <SensorCard
                            title="Temperature"
                            value={reading?.temperature || 0}
                            unit="°C"
                            icon={Thermometer}
                            color="text-orange-400"
                        />
                    </div>

                    {/* Main Chart Area - Center/Right */}
                    <div className="lg:col-span-3 space-y-6">
                        <LiveChart data={history} />
                        <div className="h-[300px]">
                            <AlertsTable alerts={alerts} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Popups */}
            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title="CRITICAL ALERT"
                message="Landslide risk detected! Sensor thresholds have been breached. Isolate the area immediately."
                type="error"
            />
        </div>
    );
}
