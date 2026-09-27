import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FruitItem, formatValueNumber, getEffectiveFruitList } from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';
import { TrendingUp, TrendingDown, Flame, Zap, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface LiveMarketTickerProps {
  onSelectItem?: (item: FruitItem) => void;
}

export const LiveMarketTicker: React.FC<LiveMarketTickerProps> = ({ onSelectItem }) => {
  const [items, setItems] = useState<FruitItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedItemName, setCopiedItemName] = useState<string | null>(null);

  useEffect(() => {
    const list = getEffectiveFruitList();
    // Sort by high-value / hyped items first
    const highlighted = list
      .filter(i => i.physicalValue >= 5000000 || i.demand >= 7 || i.trend === 'hyped' || i.id === 'dog-blade')
      .sort((a, b) => b.physicalValue - a.physicalValue);
    setItems(highlighted);

    const handleUpdate = () => {
      const refreshed = getEffectiveFruitList()
        .filter(i => i.physicalValue >= 5000000 || i.demand >= 7 || i.trend === 'hyped' || i.id === 'dog-blade')
        .sort((a, b) => b.physicalValue - a.physicalValue);
      setItems(refreshed);
    };

    window.addEventListener('blox_fruits_overrides_updated', handleUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleUpdate);
    };
  }, []);

  if (items.length === 0) return null;

  // Duplicate items array for infinite smooth marquee
  const displayItems = [...items, ...items];

  const handleItemClick = (item: FruitItem) => {
    soundFX.playPop();
    if (onSelectItem) {
      onSelectItem(item);
    } else {
      navigator.clipboard.writeText(`${item.name}: ${formatValueNumber(item.physicalValue)} value`);
      setCopiedItemName(item.name);
      setTimeout(() => setCopiedItemName(null), 2000);
    }
  };

  return (
    <div 
      className="relative z-30 bg-slate-950/90 border-b border-cyan-500/20 backdrop-blur-md overflow-hidden select-none py-1.5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center">
        {/* Left Live Indicator Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-0.5 bg-cyan-950/80 border-r border-cyan-500/30 text-[10px] font-black uppercase text-cyan-300 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="hidden sm:inline">LIVE MARKET</span>
          <span className="sm:hidden">LIVE</span>
        </div>

        {/* Rolling Marquee Container */}
        <div className="overflow-hidden flex-1 relative">
          <motion.div
            className="flex items-center gap-6 whitespace-nowrap"
            animate={{ x: isPaused ? undefined : ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: Math.max(35, items.length * 3.5),
            }}
          >
            {displayItems.map((item, idx) => {
              const isHyped = item.trend === 'hyped';
              const isRising = item.trend === 'rising';
              const isDropping = item.trend === 'dropping';

              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => handleItemClick(item)}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900/60 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs transition-all cursor-pointer group shrink-0"
                  title={`Click to inspect or copy ${item.name} (${formatValueNumber(item.physicalValue)})`}
                >
                  <span className="text-sm shrink-0 group-hover:scale-110 transition-transform">
                    {item.imageEmoji || '🍎'}
                  </span>
                  <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono font-black text-cyan-400">
                    {formatValueNumber(item.physicalValue)}
                  </span>

                  {item.permanentValue && (
                    <span className="text-[10px] text-purple-300 font-mono hidden md:inline">
                      (Perm: {formatValueNumber(item.permanentValue)})
                    </span>
                  )}

                  {isHyped && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
                      <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span>Hyped</span>
                    </span>
                  )}

                  {isRising && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Rising</span>
                    </span>
                  )}

                  {isDropping && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/40">
                      <TrendingDown className="w-2.5 h-2.5 text-rose-400" />
                      <span>Dropping</span>
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {copiedItemName && (
          <div className="shrink-0 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-lg mx-2 animate-bounce">
            Copied {copiedItemName}!
          </div>
        )}
      </div>
    </div>
  );
};
