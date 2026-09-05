import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TopProgressBarProps {
  activeTab: string;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ activeTab }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const prevTabRef = useRef(activeTab);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const startProgress = () => {
    // Clear any existing timeouts
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    setIsVisible(true);
    setProgress(15);

    // Realistic perceived performance curve (fast jump, steady crawl, quick finish)
    const t1 = setTimeout(() => setProgress(45), 60);
    const t2 = setTimeout(() => setProgress(78), 160);
    const t3 = setTimeout(() => setProgress(94), 260);
    const t4 = setTimeout(() => {
      setProgress(100);
      const t5 = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 280);
      timerRef.current.push(t5);
    }, 380);

    timerRef.current.push(t1, t2, t3, t4);
  };

  // Trigger when activeTab changes
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      startProgress();
    }
  }, [activeTab]);

  // Also listen for custom events like search, live sync, or calculation
  useEffect(() => {
    const handleGlobalTrigger = () => {
      startProgress();
    };

    window.addEventListener('blox_fruits_trigger_progress', handleGlobalTrigger);
    return () => {
      window.removeEventListener('blox_fruits_trigger_progress', handleGlobalTrigger);
      timerRef.current.forEach(clearTimeout);
    };
  }, []);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      id="top-screen-progress-bar"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3.5px] overflow-visible"
    >
      {/* Background track (subtle dark glass) */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />

      {/* Main Animated Slim Gradient Bar */}
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 via-indigo-500 to-fuchsia-500 relative"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: progress === 100 ? 0.2 : 0.28,
          ease: progress === 100 ? 'easeOut' : [0.16, 1, 0.3, 1],
        }}
        style={{
          boxShadow: '0 0 12px #38bdf8, 0 0 24px rgba(168, 85, 247, 0.8)',
        }}
      >
        {/* Leading Sparkling Energy Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_30px_#38bdf8] flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
        </div>

        {/* Ambient Top Glow Diffusion Beam */}
        <div className="absolute top-0 right-0 w-32 h-2.5 bg-gradient-to-r from-transparent to-white/40 blur-sm pointer-events-none" />
      </motion.div>
    </div>
  );
};
