import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'loading' | 'success' | 'warning' | 'error';
}

export function Modal({ isOpen, onClose, title, message, type = 'warning' }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-md"
                    >
                        <GlassCard className="border-red-500/30 bg-red-950/20">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 text-red-400">
                                    <div className="rounded-full bg-red-500/20 p-2">
                                        <AlertTriangle className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{title}</h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-4">
                                <p className="text-gray-300 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="secondary" onClick={onClose}>
                                    Dismiss
                                </Button>
                                <Button variant="danger" onClick={onClose}>
                                    Acknowledge
                                </Button>
                            </div>
                        </GlassCard>

                        {/* Animated Rings for visual impact */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -inset-4 rounded-3xl border border-red-500/30 -z-10"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
