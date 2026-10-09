import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { formatValueNumber } from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';
import { Scale, Zap, Sparkles, TrendingUp, TrendingDown, Equal } from 'lucide-react';

interface AnimatedTradeScalesProps {
  yourTotalValue: number;
  theirTotalValue: number;
  verdict: string;
  difference: number;
}

export const AnimatedTradeScales: React.FC<AnimatedTradeScalesProps> = ({
  yourTotalValue,
  theirTotalValue,
  verdict,
  difference,
}) => {
  const prevDiffRef = useRef<number>(difference);

  // Compute scale tilt angle (-14deg to +14deg)
  // Positive tilt = theirTotalValue > yourTotalValue (They Give is heavier -> tilts clockwise/right)
  // Negative tilt = yourTotalValue > theirTotalValue (You Give is heavier -> tilts counter-clockwise/left)
  const totalBoth = Math.max(1, yourTotalValue + theirTotalValue);
  const ratio = (theirTotalValue - yourTotalValue) / totalBoth; // -1 to +1
  const tiltAngle = Math.max(-14, Math.min(14, ratio * 28));

  // Pan vertical displacement in pixels based on tilt
  const leftPanY = (tiltAngle / 14) * -20; // If tilt is positive (right down), left goes up
  const rightPanY = -leftPanY; // If tilt is positive, right goes down

  // Play subtle metallic balance tick when balance shifts noticeably
  useEffect(() => {
    if (Math.abs(difference - prevDiffRef.current) > 5000000) {
      soundFX.playScaleTilt();
    }
    prevDiffRef.current = difference;
  }, [difference]);

  const isWin = verdict.includes('Win');
  const isLoss = verdict.includes('Loss');
  const isFair = verdict === 'Fair';

  const statusColor = isWin
    ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
    : isLoss
    ? 'text-rose-400 border-rose-500/40 bg-rose-950/40'
    : 'text-amber-400 border-amber-500/40 bg-amber-950/40';

  const beamGlow = isWin
    ? 'shadow-[0_0_25px_rgba(16,185,129,0.35)]'
    : isLoss
    ? 'shadow-[0_0_25px_rgba(244,63,94,0.35)]'
    : 'shadow-[0_0_25px_rgba(245,158,11,0.25)]';

  return (
    <div className={`p-4 sm:p-5 rounded-3xl bg-slate-950/90 border border-slate-800 ${beamGlow} relative overflow-hidden transition-all duration-500`}>
      {/* Background Energy Lines & Clashing Sparks */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)]" />

      {/* Header bar of scale */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400">
            <Scale className="w-4 h-4" />
          </div>
          <span className="font-bold text-white tracking-wider uppercase text-[11px]">
            Dynamic Golden Scale Physics
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            You: {formatValueNumber(yourTotalValue)}
          </span>
          <span className="text-slate-600 font-bold">vs</span>
          <span className="text-purple-400 font-semibold flex items-center gap-1">
            Them: {formatValueNumber(theirTotalValue)}
          </span>
        </div>
      </div>

      {/* Mechanical Balance Scale Visual Representation */}
      <div className="relative w-full h-44 flex items-center justify-center select-none pt-2">
        {/* Central Stand Pillar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-28 bg-gradient-to-t from-slate-900 via-slate-700 to-amber-500/80 rounded-t-sm border-x border-t border-amber-400/40 flex flex-col items-center">
          {/* Base of Pillar */}
          <div className="absolute -bottom-2 w-20 h-4 bg-slate-900 border border-amber-500/50 rounded-full shadow-lg" />
        </div>

        {/* Central Fulcrum Jewel */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-950 border border-amber-300 animate-pulse" />
        </div>

        {/* Articulated Tilting Crossbeam */}
        <motion.div
          animate={{ rotate: tiltAngle }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.8 }}
          style={{ transformOrigin: 'center center' }}
          className="absolute top-13 left-1/2 -translate-x-1/2 w-[85%] max-w-md h-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-400 border border-amber-200/60 shadow-[0_0_12px_rgba(245,158,11,0.4)] z-10 flex items-center justify-between px-1"
        >
          {/* Left Hinge Joint */}
          <div className="w-3 h-3 rounded-full bg-cyan-400 border border-white shadow-[0_0_8px_#38bdf8]" />

          {/* Center alignment marker */}
          <div className="w-2 h-4 bg-amber-200 rounded-sm" />

          {/* Right Hinge Joint */}
          <div className="w-3 h-3 rounded-full bg-purple-400 border border-white shadow-[0_0_8px_#c084fc]" />
        </motion.div>

        {/* Left Pan (You Give) Suspended with Counter-displacement */}
        <motion.div
          animate={{ y: leftPanY }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.8 }}
          className="absolute top-13 left-[12%] sm:left-[18%] flex flex-col items-center z-10"
        >
          {/* Suspension Chains */}
          <svg width="46" height="42" className="stroke-slate-500/70" strokeWidth="1.2">
            <line x1="23" y1="0" x2="4" y2="42" strokeDasharray="3 2" />
            <line x1="23" y1="0" x2="42" y2="42" strokeDasharray="3 2" />
          </svg>

          {/* Left Glowing Weighing Dish */}
          <div className="relative -mt-1 w-20 sm:w-24 h-5 rounded-b-2xl bg-gradient-to-b from-slate-800 to-slate-950 border-x border-b border-cyan-400/60 shadow-[0_4px_12px_rgba(56,189,248,0.25)] flex flex-col items-center">
            {/* Energy Orb on pan */}
            <div
              className="absolute -top-5 rounded-full bg-cyan-400/30 border border-cyan-400 shadow-[0_0_16px_#38bdf8] flex items-center justify-center transition-all duration-300"
              style={{
                width: Math.min(36, Math.max(18, 18 + (yourTotalValue / 50000000) * 16)),
                height: Math.min(36, Math.max(18, 18 + (yourTotalValue / 50000000) * 16)),
              }}
            >
              <span className="text-[9px] font-black text-white leading-none">YOU</span>
            </div>
          </div>

          {/* Value Label */}
          <div className="mt-2 text-center">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow">
              {formatValueNumber(yourTotalValue)}
            </span>
          </div>
        </motion.div>

        {/* Right Pan (They Give) Suspended with Counter-displacement */}
        <motion.div
          animate={{ y: rightPanY }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.8 }}
          className="absolute top-13 right-[12%] sm:right-[18%] flex flex-col items-center z-10"
        >
          {/* Suspension Chains */}
          <svg width="46" height="42" className="stroke-slate-500/70" strokeWidth="1.2">
            <line x1="23" y1="0" x2="4" y2="42" strokeDasharray="3 2" />
            <line x1="23" y1="0" x2="42" y2="42" strokeDasharray="3 2" />
          </svg>

          {/* Right Glowing Weighing Dish */}
          <div className="relative -mt-1 w-20 sm:w-24 h-5 rounded-b-2xl bg-gradient-to-b from-slate-800 to-slate-950 border-x border-b border-purple-400/60 shadow-[0_4px_12px_rgba(168,85,247,0.25)] flex flex-col items-center">
            {/* Energy Orb on pan */}
            <div
              className="absolute -top-5 rounded-full bg-purple-400/30 border border-purple-400 shadow-[0_0_16px_#c084fc] flex items-center justify-center transition-all duration-300"
              style={{
                width: Math.min(36, Math.max(18, 18 + (theirTotalValue / 50000000) * 16)),
                height: Math.min(36, Math.max(18, 18 + (theirTotalValue / 50000000) * 16)),
              }}
            >
              <span className="text-[9px] font-black text-white leading-none">THEM</span>
            </div>
          </div>

          {/* Value Label */}
          <div className="mt-2 text-center">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-950/70 border border-purple-500/40 text-purple-300 shadow">
              {formatValueNumber(theirTotalValue)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Live Balance Status Bar */}
      <div className="mt-2 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black border uppercase flex items-center gap-1.5 ${statusColor}`}>
            {isWin ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : isLoss ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Equal className="w-3.5 h-3.5" />
            )}
            {verdict}
          </span>
          <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">
            {Math.abs(tiltAngle) < 1
              ? 'Perfect equilibrium between offers'
              : tiltAngle > 0
              ? `Scale favors you by +${formatValueNumber(Math.abs(difference))}`
              : `Scale requires +${formatValueNumber(Math.abs(difference))} to balance`}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-500">Balance Ratio:</span>
          <span
            className={`font-black ${
              isWin ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-amber-400'
            }`}
          >
            {Math.round((theirTotalValue / Math.max(1, yourTotalValue)) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
