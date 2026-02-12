'use client';

import { TerrainBackground } from '@/components/3d/TerrainBackground';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <TerrainBackground riskLevel="SAFE" />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Operational
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl">
            Next-Gen Landslide <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Early Warning System
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Protecting communities with real-time IoT monitoring, AI-driven risk analysis, and instant alerts.
            Powered by advanced sensors and 3D geospatial visualization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full group">
                Live Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="secondary" className="h-14 px-8 text-lg rounded-full bg-white/5 hover:bg-white/10">
              Learn Technology
            </Button>
          </div>
        </motion.div>

        {/* Floating cards / Stats (Visual only for hero) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 inset-x-0 flex justify-center gap-8 text-white/50 text-sm hidden md:flex"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>24/7 Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <span>Real-time Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-purple-400" />
            <span>Predictive Analytics</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
