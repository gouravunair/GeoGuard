'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Mail, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
    const teamMembers = [
        'Gourav',
        'Joseph',
        'Yaseen',
        'Gaurinandana',
        'Parvathy',
    ];

    return (
        <footer className="relative mt-20 pb-8 px-4 w-full z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <GlassCard className="max-w-7xl mx-auto overflow-hidden !p-0 !bg-black/40 !backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 relative overflow-hidden">

                        {/* Ambient Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent blur-sm" />

                        {/* Left Section */}
                        <div className="space-y-4 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                                    TEAM E
                                </h3>
                                <p className="text-sm font-medium text-emerald-500/80 tracking-widest mt-1">INNOVATORS</p>
                            </div>
                            <div className="space-y-1 text-gray-400">
                                <p className="font-semibold text-white">IoT-Based Landslide Early Warning System</p>
                                <p className="text-sm">Cochin University of Science and Technology Hackathon</p>
                            </div>
                        </div>

                        {/* Center Section - Team Grid */}
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">The Team</h4>
                            <div className="flex flex-wrap justify-center gap-3">
                                {teamMembers.map((member) => (
                                    <span
                                        key={member}
                                        className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
                                    >
                                        {member}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right Section - Contact */}
                        <div className="flex flex-col items-center md:items-end justify-center space-y-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-400 mb-2">Get in touch</p>
                                <a
                                    href="mailto:gouravunair@gmail.com"
                                    className="group flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
                                >
                                    <span className="p-2 rounded-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </span>
                                    <span className="font-medium">gouravunair@gmail.com</span>
                                    <Zap className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="relative border-t border-white/5 bg-black/20 p-4 text-center">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                        <p className="text-xs text-gray-500">
                            © 2026 TEAM E | Built for CUSAT Hackathon
                        </p>
                    </div>
                </GlassCard>
            </motion.div>
        </footer>
    );
}
