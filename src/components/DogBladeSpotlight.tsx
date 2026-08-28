import React, { useState, useEffect } from 'react';
import { getEffectiveFruitList, formatValueNumber, FruitItem } from '../data/bloxFruitsData';
import { Sparkles, Shield, Flame, Sword, Info, CheckCircle2, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface DogBladeSpotlightProps {
  onAddToYou: (item: FruitItem, isPerm: boolean) => void;
  onAddToThem: (item: FruitItem, isPerm: boolean) => void;
  onAskAiAboutDogBlade: () => void;
}

export const DogBladeSpotlight: React.FC<DogBladeSpotlightProps> = ({
  onAddToYou,
  onAddToThem,
  onAskAiAboutDogBlade,
}) => {
  const [items, setItems] = useState(() => getEffectiveFruitList());

  useEffect(() => {
    const handleUpdate = () => setItems(getEffectiveFruitList());
    window.addEventListener('blox_fruits_overrides_updated', handleUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleUpdate);
    };
  }, []);

  const dogBlade = items.find((i) => i.id === 'dog-blade') || items[0];
  const darkBlade = items.find((i) => i.id === 'dark-blade') || items[1];
  const kitsune = items.find((i) => i.id === 'kitsune') || items[2];

  return (
    <div id="dog-blade-spotlight-container" className="space-y-6 animate-fade-in">
      {/* Hero Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Card & Badge */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-900/90 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/20 flex flex-col items-center justify-center text-6xl relative overflow-hidden">
                <span className="animate-bounce-subtle">🐶🗡️</span>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 text-xs font-bold text-cyan-300 tracking-wider uppercase">
                  Mythical Sword
                </div>
              </div>
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg uppercase tracking-wider">
                Event Limited
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-4 tracking-wide">
              Dog Blade
            </h2>
            <p className="text-xs text-cyan-300 font-medium">August 2026 Doghouse Event</p>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                Value: {formatValueNumber(dogBlade.physicalValue)}
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" /> Demand: 8/10
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                PvP Tier: S
              </span>
            </div>

            {/* Add to Trade Buttons */}
            <div className="flex gap-2 w-full mt-5">
              <button
                id="dog-blade-add-you-btn"
                onClick={() => {
                  soundFX.playPop();
                  onAddToYou(dogBlade, false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add to You
              </button>
              <button
                id="dog-blade-add-them-btn"
                onClick={() => {
                  soundFX.playPop();
                  onAddToThem(dogBlade, false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add to Them
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Breakdown & Lore */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Latest Update Intel & Analysis
              </span>
              <button
                id="ask-ai-dogblade-btn"
                onClick={() => {
                  soundFX.playPop();
                  onAskAiAboutDogBlade();
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1"
              >
                Ask AI Strategy for Dog Blade →
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              The <strong className="text-cyan-300">Dog Blade</strong> was introduced in the limited-time <strong className="text-white">Doghouse Event (August 1, 2026)</strong>. Players had to navigate through event dungeon rooms, slay the Doghouse Boss, and open event-exclusive <span className="text-amber-300 font-semibold">Love Letters</span> to obtain it. Since the event has concluded, it is strictly unobtainable via gameplay, making it a high-value collector sword.
            </p>

            {/* Moveset Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-cyan-400 mb-1 flex items-center gap-1">
                  <Sword className="w-3.5 h-3.5" /> Normal Attack (M1)
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Three rapid turquoise slashes followed by a short piercing forward dash. High stun lock timing.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> [Z] Spoiled Strike
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Sudden directional burst dash delivering multiple multi-hit slashes with armor break.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-purple-400 mb-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> [X] Tantrum Mode
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Transforms into a doghouse for 5s: complete stun immunity, Instinct bypass, and a massive AoE explosion finish.
                </p>
              </div>
            </div>

            {/* Market Comparison Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Trading Valuation vs Top Meta Items</span>
                <span className="text-[11px] text-slate-500">Live August 2026 Benchmark</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                  <div className="text-slate-400 text-[10px]">Dog Blade</div>
                  <div className="font-extrabold text-cyan-400 text-sm">580M</div>
                  <div className="text-[10px] text-amber-400">Demand: 8/10</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30">
                  <div className="text-slate-400 text-[10px]">Dark Blade (Yoru)</div>
                  <div className="font-extrabold text-emerald-400 text-sm">470M</div>
                  <div className="text-[10px] text-amber-400">Demand: 9/10</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-cyan-400/30">
                  <div className="text-slate-400 text-[10px]">Physical Kitsune</div>
                  <div className="font-extrabold text-cyan-300 text-sm">640M</div>
                  <div className="text-[10px] text-amber-400">Demand: 10/10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Trading Tips for Dog Blade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Optimal Trade Targets</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Due to its 580M benchmark, Dog Blade can be traded straight for top physical mythical beasts like Kitsune (with small add) or combined with Buddha for Perm Portal / Perm Dough.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Enchantment Limitation</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Note that Dog Blade cannot be upgraded at the Blacksmith and is restricted to common scroll enchantments. Emphasize its collector scarcity and PvP Tantrum immunity in trades.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Holding vs Flipping</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Since it is currently unobtainable following the event conclusion, long-term supply will dry up. Holding it for 2-3 months could yield 650M+ in collector offers.
          </p>
        </div>
      </div>
    </div>
  );
};
