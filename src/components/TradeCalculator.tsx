import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { FruitItem, TradeSideItem, evaluateTrade, formatValueNumber, BLOX_FRUITS_DATA } from '../data/bloxFruitsData';
import {
  HISTORICAL_TRENDS_DATA,
  TRACKED_SERIES,
  filterHistoricalData,
  HistoricalDataPoint
} from '../data/historicalTrends';
import { generateLocalTradeBreakdown } from '../utils/bloxChatEngine';
import { SafeFruitImage } from './SafeFruitImage';
import {
  Plus,
  Trash2,
  Sparkles,
  Bot,
  Scale,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRightLeft,
  RotateCcw,
  Zap,
  Info,
  ShieldAlert,
  ArrowRight,
  Share2,
  Calendar,
  Layers,
  ArrowUpRight,
  CheckSquare,
  Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';

interface TradeCalculatorProps {
  yourItems: TradeSideItem[];
  theirItems: TradeSideItem[];
  onOpenSelector: (side: 'you' | 'them') => void;
  onRemoveItem: (side: 'you' | 'them', uid: string) => void;
  onClearTrade: () => void;
  onSwapSides: () => void;
  onApplyPreset: (yourList: { id: string; perm?: boolean }[], theirList: { id: string; perm?: boolean }[]) => void;
  onInspectItem: (item: FruitItem) => void;
  onAskAiWithCurrentTrade: () => void;
}

const PRESET_TRADES = [
  {
    name: 'Dog Blade for Kitsune',
    desc: 'Event Limited vs Mythical Beast',
    your: [{ id: 'dog-blade' }],
    their: [{ id: 'kitsune' }]
  },
  {
    name: 'Dragon West for Perm Portal',
    desc: 'Supreme Dragon vs Top PvP Perm',
    your: [{ id: 'dragon-west' }],
    their: [{ id: 'portal', perm: true }]
  },
  {
    name: 'Dough + Buddha for T-Rex + Sound',
    desc: 'Classic High Demand Flip',
    your: [{ id: 'dough' }, { id: 'buddha' }],
    their: [{ id: 't-rex' }, { id: 'sound' }]
  },
  {
    name: 'Gas + Tiger for Dog Blade',
    desc: 'New Mythical Reworks for Limited Sword',
    your: [{ id: 'gas' }, { id: 'tiger' }],
    their: [{ id: 'dog-blade' }]
  }
];

export const TradeCalculator: React.FC<TradeCalculatorProps> = ({
  yourItems,
  theirItems,
  onOpenSelector,
  onRemoveItem,
  onClearTrade,
  onSwapSides,
  onApplyPreset,
  onInspectItem,
  onAskAiWithCurrentTrade
}) => {
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Smooth swap animation states
  const [swapKey, setSwapKey] = useState(0);
  const [swapRotation, setSwapRotation] = useState(0);

  const handleSwapSides = () => {
    soundFX.playPop();
    setSwapRotation((prev) => prev + 180);
    setSwapKey((prev) => prev + 1);
    onSwapSides();
    setAiAnalysis(null);
  };

  // --- 30-DAY HISTORICAL VALUE TREND CHART STATE ---
  const savedCalcSettings = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('blox_fruits_trade_calc_settings_v1');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const [trendRange, setTrendRange] = useState<'7d' | '14d' | '30d' | 'all'>(savedCalcSettings?.trendRange || '30d');
  const [chartType, setChartType] = useState<'area' | 'line'>(savedCalcSettings?.chartType || 'area');
  const [selectedSeriesIds, setSelectedSeriesIds] = useState<string[]>(
    () => savedCalcSettings?.selectedSeriesIds || ['dog-blade', 'kitsune', 'dragon-west']
  );
  const [inspectedSeriesId, setInspectedSeriesId] = useState<string>('dog-blade');

  // Sync trend and chart preferences to window.localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        'blox_fruits_trade_calc_settings_v1',
        JSON.stringify({ trendRange, chartType, selectedSeriesIds })
      );
    } catch (e) {
      console.error('Failed to sync TradeCalculator settings to localStorage:', e);
    }
  }, [trendRange, chartType, selectedSeriesIds]);

  // Sync active trade items directly to window.localStorage to ensure trade states and manual overrides are preserved across reloads
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('blox_fruits_trade_your_items_v2', JSON.stringify(yourItems));
      localStorage.setItem('blox_fruits_trade_their_items_v2', JSON.stringify(theirItems));
    } catch (e) {
      console.error('Failed to sync trade items to localStorage:', e);
    }
  }, [yourItems, theirItems]);

  // Auto-sync series when items in trade change
  useEffect(() => {
    const tradeItemIds = [...yourItems, ...theirItems].map((i) => i.item.id);
    const validTrackedIds = tradeItemIds.filter((id) => TRACKED_SERIES.some((s) => s.id === id));
    if (validTrackedIds.length > 0) {
      setSelectedSeriesIds((prev) => {
        const set = new Set([...prev, ...validTrackedIds]);
        return Array.from(set);
      });
      setInspectedSeriesId(validTrackedIds[0]);
    }
  }, [yourItems, theirItems]);

  const historicalChartData = useMemo(() => {
    return filterHistoricalData(trendRange);
  }, [trendRange]);

  const toggleChartSeries = (id: string) => {
    soundFX.playPop();
    setSelectedSeriesIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const inspectedSeriesStats = useMemo(() => {
    const seriesMeta = TRACKED_SERIES.find((s) => s.id === inspectedSeriesId) || TRACKED_SERIES[0];
    if (!historicalChartData || historicalChartData.length === 0) return null;

    const values = historicalChartData
      .map((d) => (d as any)[inspectedSeriesId] as number)
      .filter((v) => typeof v === 'number' && v > 0);

    if (values.length === 0) return null;

    const currentVal = values[values.length - 1];
    const initialVal = values[0];
    const highVal = Math.max(...values);
    const lowVal = Math.min(...values);

    const changeDiff = currentVal - initialVal;
    const changePct = initialVal > 0 ? (changeDiff / initialVal) * 100 : 0;

    return {
      meta: seriesMeta,
      currentVal,
      highVal,
      lowVal,
      changeDiff,
      changePct
    };
  }, [inspectedSeriesId, historicalChartData]);

  // Custom 30-Day Recharts Tooltip
  const CustomTrendsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0]?.payload as HistoricalDataPoint;
      return (
        <div className="rounded-2xl bg-slate-950/95 border border-cyan-500/40 p-3.5 shadow-2xl backdrop-blur-xl text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-extrabold text-white">{dataPoint.displayDate} ({dataPoint.date})</span>
            {dataPoint.eventNote && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {dataPoint.eventNote}
              </span>
            )}
          </div>
          <div className="space-y-1 pt-1">
            {payload.map((entry: any) => {
              const series = TRACKED_SERIES.find((s) => s.id === entry.dataKey);
              return (
                <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="font-medium text-slate-200">
                      {series?.emoji} {series?.name || entry.dataKey}:
                    </span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {formatValueNumber(entry.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const result = evaluateTrade(yourItems, theirItems);
  const isSignificantProfit = result.verdict === 'Big Win' || result.difference > 50000000;
  const isSignificantLoss = result.verdict === 'Big Loss' || result.difference < -50000000;

  // Trigger win sound & confetti on big win
  useEffect(() => {
    if (result.verdict === 'Big Win' && (yourItems.length > 0 || theirItems.length > 0)) {
      soundFX.playWin();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignored
      }
    } else if (result.verdict === 'Big Loss') {
      soundFX.playLoss();
    }
  }, [result.verdict, yourItems.length, theirItems.length]);

  // Handle Tactical Advice generation
  const handleFetchAiAdvice = () => {
    if (yourItems.length === 0 && theirItems.length === 0) {
      triggerToast('Please add items to trade windows first!');
      return;
    }
    soundFX.playPop();
    setIsAnalyzingAi(true);
    setAiAnalysis(null);

    setTimeout(() => {
      const breakdown = generateLocalTradeBreakdown(
        yourItems,
        theirItems,
        result.yourTotalValue,
        result.theirTotalValue,
        result.verdict,
        result.difference
      );
      setAiAnalysis(breakdown);
      setIsAnalyzingAi(false);
      soundFX.playWin();
    }, 150);
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Verdict style helpers
  const getVerdictBadge = () => {
    switch (result.verdict) {
      case 'Big Win':
        return {
          bg: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
          meterColor: 'bg-emerald-500',
          meterWidth: '95%',
          label: '🔥 BIG WIN (W)',
          desc: 'Supreme overpay! You gain tremendous market value.'
        };
      case 'Small Win':
        return {
          bg: 'bg-teal-500/20 border-teal-500/50 text-teal-300',
          meterColor: 'bg-teal-400',
          meterWidth: '70%',
          label: '✅ WIN (W)',
          desc: 'Positive trade surplus in your favor.'
        };
      case 'Fair Trade':
        return {
          bg: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
          meterColor: 'bg-blue-400',
          meterWidth: '50%',
          label: '⚖️ FAIR TRADE (F)',
          desc: 'Balanced equal market exchange.'
        };
      case 'Small Loss':
        return {
          bg: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
          meterColor: 'bg-amber-400',
          meterWidth: '30%',
          label: '⚠️ SMALL LOSS (L)',
          desc: 'Slight value deficit. Proceed only if securing a holy grail.'
        };
      case 'Big Loss':
        return {
          bg: 'bg-rose-500/20 border-rose-500/50 text-rose-300',
          meterColor: 'bg-rose-500',
          meterWidth: '10%',
          label: '⛔ BIG LOSS (L)',
          desc: 'Heavy loss! You are severely under-compensated.'
        };
    }
  };

  const verdictStyle = getVerdictBadge();

  return (
    <div id="trade-calculator-root" className="space-y-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500 text-cyan-300 text-xs font-bold shadow-xl animate-bounce-subtle">
          {showToast}
        </div>
      )}

      {/* Preset Trades Ticker */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Hot Scenarios:
        </span>
        {PRESET_TRADES.map((preset, idx) => (
          <button
            key={idx}
            id={`preset-trade-${idx}`}
            onClick={() => {
              soundFX.playPop();
              onApplyPreset(preset.your, preset.their);
              setAiAnalysis(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="font-semibold">{preset.name}</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">({preset.desc})</span>
          </button>
        ))}
      </div>

      {/* Trade Calculator Dual Tables */}
      <div
        id="trade-calculator-dual-tables"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative"
        style={{ perspective: 1200 }}
      >
        {/* Center Action Toolbar */}
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 z-20 flex lg:flex-col items-center justify-center gap-2 py-2">
          <motion.button
            id="swap-trade-sides-btn"
            onClick={handleSwapSides}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-cyan-950/70 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-300 shadow-xl transition-colors cursor-pointer active:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            title="Swap Your Offer & Their Offer"
          >
            <motion.div
              animate={{ rotate: swapRotation }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <ArrowRightLeft className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            id="clear-trade-btn"
            onClick={() => {
              soundFX.playPop();
              onClearTrade();
              setAiAnalysis(null);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-rose-950/70 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-300 shadow-xl transition-colors cursor-pointer"
            title="Clear all trade items"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* --- LEFT WINDOW: YOU GIVE --- */}
        <motion.div
          id="trade-side-you"
          animate={
            swapKey > 0
              ? {
                  rotateY: swapKey % 2 === 1 ? [0, -12, 0] : [0, 12, 0],
                  scale: [1, 0.985, 1],
                  x: swapKey % 2 === 1 ? [0, 6, 0] : [0, -6, 0],
                }
              : {
                  rotateY: 0,
                  scale: 1,
                  x: 0,
                }
          }
          transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-5 sm:p-6 shadow-2xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-subtle" />
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">
                    You Give
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {yourItems.length} / 4 Slots Used • Avg Demand: {result.yourAverageDemand}/10
                </p>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-medium text-slate-400">Total Value</div>
                <div className="text-2xl font-black text-cyan-400 tracking-tight">
                  {formatValueNumber(result.yourTotalValue)}
                </div>
              </div>
            </div>

            {/* 4 Trade Slots */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {[0, 1, 2, 3].map((slotIdx) => {
                const itemEntry = yourItems[slotIdx];

                if (!itemEntry) {
                  return (
                    <button
                      key={slotIdx}
                      id={`you-slot-empty-${slotIdx}`}
                      onClick={() => {
                        soundFX.playPop();
                        onOpenSelector('you');
                      }}
                      className="h-28 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/60 bg-slate-950/40 hover:bg-slate-900/60 flex flex-col items-center justify-center text-slate-500 hover:text-cyan-400 transition-all group"
                    >
                      <Plus className="w-6 h-6 mb-1 group-hover:scale-125 transition-transform" />
                      <span className="text-xs font-semibold">Add Item</span>
                    </button>
                  );
                }

                const item = itemEntry.item;
                const isPerm = itemEntry.isPermanent;
                const itemVal = isPerm && item.permanentValue ? item.permanentValue : item.physicalValue;

                return (
                  <div
                    key={itemEntry.uid}
                    id={`you-slot-filled-${slotIdx}`}
                    className="relative h-28 rounded-2xl bg-slate-950 border border-slate-800 p-3 flex flex-col justify-between group hover:border-cyan-500 transition-all shadow-md overflow-hidden"
                  >
                    {/* Delete button */}
                    <button
                      id={`delete-you-item-${slotIdx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.playPop();
                        onRemoveItem('you', itemEntry.uid);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        soundFX.playPop();
                        onInspectItem(item);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl bg-slate-900 border border-slate-800 shrink-0 overflow-hidden">
                          <SafeFruitImage
                            src={item.iconUrl}
                            alt={item.name}
                            category={item.category}
                            rarity={item.rarity}
                            fallbackEmoji={item.imageEmoji}
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1 pr-4">
                          <div className="text-xs font-bold text-white truncate">
                            {isPerm ? `Perm ${item.name}` : item.name}
                          </div>
                          <div className="text-[10px] text-cyan-400 font-medium truncate">
                            {item.rarity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                      <span className="font-extrabold text-cyan-400">
                        {formatValueNumber(itemVal)}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        ★ {item.demand}/10
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            id="open-you-selector-btn"
            onClick={() => {
              soundFX.playPop();
              onOpenSelector('you');
            }}
            disabled={yourItems.length >= 4}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add to Your Offer
          </button>
        </motion.div>

        {/* --- RIGHT WINDOW: THEY GIVE --- */}
        <motion.div
          id="trade-side-them"
          animate={
            swapKey > 0
              ? {
                  rotateY: swapKey % 2 === 1 ? [0, 12, 0] : [0, -12, 0],
                  scale: [1, 0.985, 1],
                  x: swapKey % 2 === 1 ? [0, -6, 0] : [0, 6, 0],
                }
              : {
                  rotateY: 0,
                  scale: 1,
                  x: 0,
                }
          }
          transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="rounded-3xl bg-slate-900/90 border border-purple-500/30 p-5 sm:p-6 shadow-2xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping-subtle" />
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">
                    They Give
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {theirItems.length} / 4 Slots Used • Avg Demand: {result.theirAverageDemand}/10
                </p>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-medium text-slate-400">Total Value</div>
                <div className="text-2xl font-black text-purple-400 tracking-tight">
                  {formatValueNumber(result.theirTotalValue)}
                </div>
              </div>
            </div>

            {/* 4 Trade Slots */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {[0, 1, 2, 3].map((slotIdx) => {
                const itemEntry = theirItems[slotIdx];

                if (!itemEntry) {
                  return (
                    <button
                      key={slotIdx}
                      id={`them-slot-empty-${slotIdx}`}
                      onClick={() => {
                        soundFX.playPop();
                        onOpenSelector('them');
                      }}
                      className="h-28 rounded-2xl border-2 border-dashed border-slate-800 hover:border-purple-500/60 bg-slate-950/40 hover:bg-slate-900/60 flex flex-col items-center justify-center text-slate-500 hover:text-purple-400 transition-all group"
                    >
                      <Plus className="w-6 h-6 mb-1 group-hover:scale-125 transition-transform" />
                      <span className="text-xs font-semibold">Add Item</span>
                    </button>
                  );
                }

                const item = itemEntry.item;
                const isPerm = itemEntry.isPermanent;
                const itemVal = isPerm && item.permanentValue ? item.permanentValue : item.physicalValue;

                return (
                  <div
                    key={itemEntry.uid}
                    id={`them-slot-filled-${slotIdx}`}
                    className="relative h-28 rounded-2xl bg-slate-950 border border-slate-800 p-3 flex flex-col justify-between group hover:border-purple-500 transition-all shadow-md overflow-hidden"
                  >
                    {/* Delete button */}
                    <button
                      id={`delete-them-item-${slotIdx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.playPop();
                        onRemoveItem('them', itemEntry.uid);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        soundFX.playPop();
                        onInspectItem(item);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl bg-slate-900 border border-slate-800 shrink-0 overflow-hidden">
                          <SafeFruitImage
                            src={item.iconUrl}
                            alt={item.name}
                            category={item.category}
                            rarity={item.rarity}
                            fallbackEmoji={item.imageEmoji}
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1 pr-4">
                          <div className="text-xs font-bold text-white truncate">
                            {isPerm ? `Perm ${item.name}` : item.name}
                          </div>
                          <div className="text-[10px] text-purple-400 font-medium truncate">
                            {item.rarity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                      <span className="font-extrabold text-purple-400">
                        {formatValueNumber(itemVal)}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        ★ {item.demand}/10
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            id="open-them-selector-btn"
            onClick={() => {
              soundFX.playPop();
              onOpenSelector('them');
            }}
            disabled={theirItems.length >= 4}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-purple-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add to Their Offer
          </button>
        </motion.div>
      </div>

      {/* --- LIVE VALUATION METER & VERDICT CARD --- */}
      <motion.div
        animate={
          isSignificantProfit
            ? {
                borderColor: ['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.95)', 'rgba(16, 185, 129, 0.4)'],
                boxShadow: ['0 0 15px rgba(16, 185, 129, 0.2)', '0 0 30px rgba(16, 185, 129, 0.5)', '0 0 15px rgba(16, 185, 129, 0.2)']
              }
            : isSignificantLoss
            ? {
                borderColor: ['rgba(244, 63, 94, 0.4)', 'rgba(244, 63, 94, 0.95)', 'rgba(244, 63, 94, 0.4)'],
                boxShadow: ['0 0 15px rgba(244, 63, 94, 0.2)', '0 0 30px rgba(244, 63, 94, 0.5)', '0 0 15px rgba(244, 63, 94, 0.2)']
              }
            : { borderColor: 'rgba(30, 41, 59, 1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }
        }
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`rounded-3xl bg-slate-900 border p-6 shadow-2xl space-y-5 ${
          isSignificantProfit
            ? 'border-emerald-500/80 text-emerald-100'
            : isSignificantLoss
            ? 'border-rose-500/80 text-rose-100'
            : 'border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Trade Verdict Calculation
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span
                className={`px-4 py-1.5 rounded-2xl text-base sm:text-lg font-black border tracking-wide ${verdictStyle.bg}`}
              >
                {verdictStyle.label}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {result.verdictDescription}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-slate-400">Net Profit / Loss</div>
              <div
                className={`text-xl font-black ${
                  result.difference > 0
                    ? 'text-emerald-400'
                    : result.difference < 0
                    ? 'text-rose-400'
                    : 'text-slate-300'
                }`}
              >
                {result.difference > 0 ? '+' : ''}
                {formatValueNumber(result.difference)}
              </div>
            </div>

            <button
              id="ai-deep-dive-btn"
              onClick={handleFetchAiAdvice}
              disabled={isAnalyzingAi}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzingAi ? 'animate-spin' : ''}`} />
              <span>{isAnalyzingAi ? 'AI Analyzing...' : 'AI Strategy Breakdown'}</span>
            </button>
          </div>
        </div>

        {/* Visual Progress Bar Ratio */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>You Give: {formatValueNumber(result.yourTotalValue)}</span>
            <span>They Give: {formatValueNumber(result.theirTotalValue)}</span>
          </div>
          <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ${verdictStyle.meterColor}`}
              style={{ width: verdictStyle.meterWidth }}
            />
          </div>
        </div>

        {/* Game Rules & Demand Matrix Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* 40% Beli rule */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              result.isWithin40PercentRule
                ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}
          >
            {result.isWithin40PercentRule ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <div className="text-xs">
              <div className="font-bold">
                {result.isWithin40PercentRule ? 'Within 40% In-Game Rule' : 'Fails 40% In-Game Beli Rule'}
              </div>
              <p className="text-[10px] text-slate-400">
                {result.isWithin40PercentRule
                  ? 'Trade table will allow physical exchange.'
                  : 'Beli difference too large! Game may block trade.'}
              </p>
            </div>
          </div>

          {/* Demand Advantage */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-center gap-3">
            <Flame className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold">
                Demand Advantage:{' '}
                <span className="text-amber-400">{result.demandAdvantage}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                You: {result.yourAverageDemand}/10 | Them: {result.theirAverageDemand}/10
              </p>
            </div>
          </div>

          {/* Dog Blade Event Indicator */}
          <div
            className={`p-3 rounded-2xl border flex items-center gap-3 ${
              result.dogBladePresent
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold">
                {result.dogBladePresent ? 'Dog Blade Involved!' : 'Standard Trade Matrix'}
              </div>
              <p className="text-[10px] text-slate-400">
                {result.dogBladePresent
                  ? 'August 2026 limited event sword (580M value).'
                  : 'Calculated from August 2026 database.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- 30-DAY HISTORICAL VALUE TREND CHART (RECHARTS) --- */}
      <div id="trade-historical-trends-chart" className="rounded-3xl bg-slate-900/95 border border-cyan-500/30 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 30-Day Value Fluctuation Visualizer
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                August 2026 Index
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1">
              Historical Fruit Value Trajectory (Last 30 Days)
            </h3>
            <p className="text-xs text-slate-400">
              Interactive Recharts graph tracking market movements, high/low boundaries, and post-update shifts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Timeline Filter */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['7d', '14d', '30d', 'all'] as const).map((range) => (
                <button
                  key={range}
                  id={`trade-trend-range-${range}`}
                  onClick={() => {
                    soundFX.playPop();
                    setTrendRange(range);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    trendRange === range
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range === '7d' ? '7D' : range === '14d' ? '14D' : range === '30d' ? '30 Days' : 'All'}
                </button>
              ))}
            </div>

            {/* Line / Area Toggle */}
            <button
              id="trade-chart-type-toggle"
              onClick={() => {
                soundFX.playPop();
                setChartType((prev) => (prev === 'area' ? 'line' : 'area'));
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1 transition-colors"
              title="Toggle Area or Line chart view"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{chartType === 'area' ? 'Area' : 'Line'}</span>
            </button>
          </div>
        </div>

        {/* Inspected Item 30-Day Quick Stats */}
        {inspectedSeriesStats && (
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <span>{inspectedSeriesStats.meta.emoji} Selected: {inspectedSeriesStats.meta.name}</span>
              </div>
              <div className="text-base sm:text-lg font-black text-cyan-400 mt-0.5">
                {formatValueNumber(inspectedSeriesStats.currentVal)}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-semibold">30-Day Net Fluctuation</div>
              <div className={`text-sm sm:text-base font-black flex items-center gap-0.5 mt-0.5 ${
                inspectedSeriesStats.changeDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                <ArrowUpRight className={`w-3.5 h-3.5 ${inspectedSeriesStats.changeDiff < 0 ? 'rotate-90' : ''}`} />
                <span>{inspectedSeriesStats.changeDiff >= 0 ? '+' : ''}{inspectedSeriesStats.changePct.toFixed(1)}%</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-semibold">30-Day Low</div>
              <div className="text-sm font-bold text-slate-300 mt-0.5">
                {formatValueNumber(inspectedSeriesStats.lowVal)}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-semibold">30-Day Peak High</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">
                {formatValueNumber(inspectedSeriesStats.highVal)}
              </div>
            </div>
          </div>
        )}

        {/* Recharts Canvas */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={historicalChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {TRACKED_SERIES.map((s) => (
                    <linearGradient key={s.id} id={`trade-grad-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => formatValueNumber(v)}
                  width={55}
                />
                <Tooltip content={<CustomTrendsTooltip />} />
                <ReferenceLine
                  x="Aug 1"
                  stroke="#38bdf8"
                  strokeDasharray="4 4"
                  label={{
                    value: '🐶 Dog Blade Launch',
                    position: 'top',
                    fill: '#38bdf8',
                    fontSize: 10,
                    fontWeight: 700
                  }}
                />
                {selectedSeriesIds.map((id, idx) => {
                  const series = TRACKED_SERIES.find((s) => s.id === id);
                  if (!series) return null;
                  return (
                    <Area
                      key={`${id}-${idx}`}
                      type="monotone"
                      dataKey={id}
                      stroke={series.color}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill={`url(#trade-grad-${id})`}
                      name={series.name}
                    />
                  );
                })}
              </AreaChart>
            ) : (
              <LineChart data={historicalChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => formatValueNumber(v)}
                  width={55}
                />
                <Tooltip content={<CustomTrendsTooltip />} />
                <ReferenceLine
                  x="Aug 1"
                  stroke="#38bdf8"
                  strokeDasharray="4 4"
                  label={{
                    value: '🐶 Dog Blade Launch',
                    position: 'top',
                    fill: '#38bdf8',
                    fontSize: 10,
                    fontWeight: 700
                  }}
                />
                {selectedSeriesIds.map((id, idx) => {
                  const series = TRACKED_SERIES.find((s) => s.id === id);
                  if (!series) return null;
                  return (
                    <Line
                      key={`${id}-${idx}`}
                      type="monotone"
                      dataKey={id}
                      stroke={series.color}
                      strokeWidth={3}
                      dot={{ r: 3, fill: series.color }}
                      activeDot={{ r: 6 }}
                      name={series.name}
                    />
                  );
                })}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Fruit Toggles */}
        <div className="pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span>Toggle Fruits & Items on 30-Day Trend Graph:</span>
            <span className="text-[10px] text-slate-500">Auto-includes trade items</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {TRACKED_SERIES.map((series) => {
              const isSelected = selectedSeriesIds.includes(series.id);
              const isInspected = inspectedSeriesId === series.id;
              const isInTrade = [...yourItems, ...theirItems].some((i) => i.item.id === series.id);

              return (
                <div
                  key={series.id}
                  id={`trade-series-chip-${series.id}`}
                  onClick={() => {
                    setInspectedSeriesId(series.id);
                    if (!isSelected) toggleChartSeries(series.id);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-950 border-slate-700 text-white shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
                  } ${isInspected ? 'ring-2 ring-cyan-400' : ''} ${
                    isInTrade ? 'border-cyan-500/60 bg-cyan-950/20' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChartSeries(series.id);
                    }}
                    className="p-0.5"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5" style={{ color: series.color }} />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: series.color }}
                  />
                  <span>{series.emoji} {series.name}</span>
                  {isInTrade && (
                    <span className="text-[9px] px-1 rounded bg-cyan-500/20 text-cyan-300 font-extrabold ml-0.5">
                      In Trade
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {aiAnalysis && (
        <div
          id="ai-trade-breakdown-card"
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/50 border border-cyan-500/40 p-6 shadow-2xl shadow-cyan-950/50 space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Gemini Grandmaster AI Tactical Report
                </h4>
                <div className="text-[10px] text-cyan-300">
                  Risk Assessment: {aiAnalysis.riskRating || 'Calculated'}
                </div>
              </div>
            </div>

            <button
              onClick={onAskAiWithCurrentTrade}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
            >
              Discuss with AI Oracle →
            </button>
          </div>

          <div className="text-sm font-bold text-cyan-200">
            {aiAnalysis.verdictHeadline}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Demand & Flip Dynamics</div>
              <p className="leading-relaxed">{aiAnalysis.demandAnalysis}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">Tactical Strategy</div>
              <p className="leading-relaxed">{aiAnalysis.tacticalStrategy}</p>
            </div>
          </div>

          {aiAnalysis.dogBladeContext && (
            <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{aiAnalysis.dogBladeContext}</span>
            </div>
          )}

          {aiAnalysis.suggestedCounters && aiAnalysis.suggestedCounters.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold text-slate-300">Tactical Counter Recommendations:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {aiAnalysis.suggestedCounters.map((counter: string, i: number) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{counter}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
