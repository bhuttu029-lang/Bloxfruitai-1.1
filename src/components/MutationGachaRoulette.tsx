import React, { useState } from 'react';
import { 
  Sparkles, 
  Dices, 
  Crown, 
  Shield, 
  Flame, 
  Zap, 
  ArrowRight, 
  RotateCw, 
  Check, 
  Share2,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { getEffectiveFruitList, FruitItem } from '../data/bloxFruitsData';
import { 
  AURA_THEMES, 
  PASSIVE_TRAITS_LIST, 
  MutationMove, 
  MutationAuraTheme 
} from '../data/mutationLabData';

export interface RolledMutation {
  id: string;
  name: string;
  title: string;
  rarity: 'Rare' | 'Legendary' | 'Mythical' | 'Celestial God';
  rarityColor: string;
  fruit1: FruitItem;
  fruit2: FruitItem;
  element: string;
  modifierTrait: {
    name: string;
    description: string;
    icon: string;
    type: 'Blessing' | 'Curse' | 'Passive';
  };
  auraTheme: MutationAuraTheme;
  stats: {
    damage: number;
    speed: number;
    range: number;
    combo: number;
  };
  moves: MutationMove[];
  lore: string;
}

const MODIFIER_TRAITS = [
  {
    name: 'Abyssal Vacuum Singularity',
    description: 'Every hit creates micro black holes pulling in all enemies within 25 meters.',
    icon: '🕳️',
    type: 'Blessing' as const
  },
  {
    name: 'Solar Plasma Overload',
    description: 'Deals +45% extra burn damage over 6 seconds, bypassing standard logia defense.',
    icon: '☀️',
    type: 'Blessing' as const
  },
  {
    name: 'Glitch Temporal Stun',
    description: '15% chance on any hit to freeze the opponent in a time-dilation frame for 1.5s.',
    icon: '⚡',
    type: 'Blessing' as const
  },
  {
    name: 'Leviathan Scale Armor',
    description: 'Water damage is completely negated; incoming sword & fruit damage reduced by 25%.',
    icon: '🛡️',
    type: 'Blessing' as const
  },
  {
    name: 'Bloodthirsty Berserker',
    description: 'Damage increases by up to +60% as player health drops below 50%.',
    icon: '🩸',
    type: 'Curse' as const
  },
  {
    name: 'Celestial God Aura',
    description: 'Breaks Observation Haki Ken dodges automatically on all basic and skill attacks.',
    icon: '👑',
    type: 'Blessing' as const
  }
];

interface MutationGachaRouletteProps {
  onLoadToLab: (mutation: RolledMutation) => void;
  onAskSensei?: (query: string) => void;
}

export const MutationGachaRoulette: React.FC<MutationGachaRouletteProps> = ({
  onLoadToLab,
  onAskSensei
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<RolledMutation | null>(null);
  const [spinHistory, setSpinHistory] = useState<RolledMutation[]>([]);
  const [spinsCount, setSpinsCount] = useState<number>(0);
  const [pityCounter, setPityCounter] = useState<number>(10);

  const fruitList = getEffectiveFruitList().filter(f => f.category === 'fruit');

  const generateRandomMutation = (): RolledMutation => {
    // Determine Rarity
    const rand = Math.random();
    let rarity: 'Rare' | 'Legendary' | 'Mythical' | 'Celestial God' = 'Rare';
    let rarityColor = 'text-emerald-400 border-emerald-500 bg-emerald-950/40';

    if (pityCounter <= 1 || rand > 0.93) {
      rarity = 'Celestial God';
      rarityColor = 'text-amber-300 border-amber-400 bg-amber-950/60 shadow-amber-500/50';
    } else if (rand > 0.75) {
      rarity = 'Mythical';
      rarityColor = 'text-rose-400 border-rose-500 bg-rose-950/50 shadow-rose-500/40';
    } else if (rand > 0.40) {
      rarity = 'Legendary';
      rarityColor = 'text-purple-400 border-purple-500 bg-purple-950/40';
    }

    // Pick 2 fruits
    const f1 = fruitList[Math.floor(Math.random() * fruitList.length)];
    let f2 = fruitList[Math.floor(Math.random() * fruitList.length)];
    if (f1.id === f2.id) {
      f2 = fruitList[(fruitList.indexOf(f1) + 1) % fruitList.length];
    }

    const modifier = MODIFIER_TRAITS[Math.floor(Math.random() * MODIFIER_TRAITS.length)];
    const aura = AURA_THEMES[Math.floor(Math.random() * AURA_THEMES.length)];

    const name = `${f1.name.split(' ')[0]} ${f2.name.split(' ')[0]} ${rarity === 'Celestial God' ? 'Deity' : rarity === 'Mythical' ? 'Overlord' : 'Chimera'}`;
    const element = `${f1.name} + ${f2.name} Hybrid Catalyst`;

    const baseDmg = rarity === 'Celestial God' ? 6200 : rarity === 'Mythical' ? 5200 : rarity === 'Legendary' ? 4400 : 3600;

    const moves: MutationMove[] = [
      {
        key: 'Z',
        name: `${f1.name} Catalyst Barrage`,
        description: `Fires elemental blasts synthesizing ${f1.name} and ${f2.name}.`,
        damage: baseDmg,
        cooldown: 4.0,
        kenBreak: rarity === 'Celestial God' ? 'True Break' : 'Bypasses Ken',
        hitboxType: 'Cone Wave',
        masteryReq: 1,
        iconEmoji: f1.imageEmoji
      },
      {
        key: 'X',
        name: `${f2.name} Dimensional Surge`,
        description: `Dashes forward inflicting catastrophic hybrid elemental stun.`,
        damage: Math.round(baseDmg * 1.2),
        cooldown: 6.5,
        kenBreak: 'True Break',
        hitboxType: 'Dash Grab',
        masteryReq: 50,
        iconEmoji: f2.imageEmoji
      },
      {
        key: 'C',
        name: `Synthesized Calamity Roar`,
        description: `Unleashes a 360-degree vortex that pulls all enemies into the core.`,
        damage: Math.round(baseDmg * 1.4),
        cooldown: 9.0,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 100,
        iconEmoji: '🌀'
      },
      {
        key: 'V',
        name: `Ascension: ${rarity} Singularity`,
        description: `Full celestial transformation boosting all attributes and reach by 50%.`,
        damage: Math.round(baseDmg * 1.8),
        cooldown: 22.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 200,
        iconEmoji: '👑'
      },
      {
        key: 'F',
        name: `Catalyst Hyper-Flight`,
        description: `Hypersonic flight leaving a trail of ${aura.name} sparks.`,
        damage: Math.round(baseDmg * 0.5),
        cooldown: 3.0,
        kenBreak: 'None',
        hitboxType: 'Cone Wave',
        masteryReq: 1,
        iconEmoji: '⚡'
      }
    ];

    return {
      id: 'gacha_' + Date.now() + Math.random().toString(36).substr(2, 4),
      name,
      title: `${rarity} Dual-Synthesis Mutation`,
      rarity,
      rarityColor,
      fruit1: f1,
      fruit2: f2,
      element,
      modifierTrait: modifier,
      auraTheme: aura,
      stats: {
        damage: rarity === 'Celestial God' ? 99 : rarity === 'Mythical' ? 94 : rarity === 'Legendary' ? 86 : 76,
        speed: rarity === 'Celestial God' ? 98 : rarity === 'Mythical' ? 90 : 80,
        range: rarity === 'Celestial God' ? 96 : 88,
        combo: rarity === 'Celestial God' ? 100 : 92
      },
      moves,
      lore: `A miraculous synthesis generated in the Quantum Catalyst chamber when ${f1.name} and ${f2.name} collided at light speed under ${aura.name} radiation.`
    };
  };

  const handleSpinRoulette = () => {
    if (isSpinning) return;
    soundFX.playPop();
    setIsSpinning(true);

    let counter = 0;
    const spinInterval = setInterval(() => {
      counter++;
      if (counter % 3 === 0) soundFX.playPop();
      if (counter > 12) {
        clearInterval(spinInterval);
        const result = generateRandomMutation();
        setCurrentResult(result);
        setSpinHistory(prev => [result, ...prev.slice(0, 7)]);
        setSpinsCount(c => c + 1);
        setPityCounter(p => (result.rarity === 'Celestial God' || result.rarity === 'Mythical') ? 10 : Math.max(1, p - 1));
        setIsSpinning(false);
        if (result.rarity === 'Celestial God' || result.rarity === 'Mythical') {
          soundFX.playWin();
        } else {
          soundFX.playSuccess();
        }
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-2">
              <Dices className="w-3.5 h-3.5" />
              <span>Mutation Catalyst Gacha & Lucky Roulette</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>Spin for Rare & Celestial Mutants 🎰</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Harness the quantum catalyst to generate randomized dual fruit chimeras with unique blessings, curses, aura palettes, and one-click export into the Fusion Lab.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-black">Mythic Pity</div>
              <div className="text-sm font-black text-amber-400 font-mono">{pityCounter} spins</div>
            </div>
            <button
              onClick={handleSpinRoulette}
              disabled={isSpinning}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Synthesizing...' : 'Spin Mutation Catalyst'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* RESULT & CATALYST CHAMBER (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ACTIVE RESULT CARD (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {currentResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-2xl bg-slate-950 border-2 ${currentResult.rarityColor} shadow-2xl space-y-5 relative overflow-hidden`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-900 border border-white/20 text-white flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentResult.rarity} Mutation</span>
                </span>

                <div className="flex items-center gap-2 text-2xl">
                  <span>{currentResult.fruit1.imageEmoji}</span>
                  <span className="text-xs text-slate-400 font-bold">+</span>
                  <span>{currentResult.fruit2.imageEmoji}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{currentResult.name}</h3>
                <div className="text-xs text-cyan-300 font-bold mt-0.5">
                  {currentResult.fruit1.name} & {currentResult.fruit2.name} • {currentResult.auraTheme.name}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic border-l-2 border-amber-500 pl-3">
                "{currentResult.lore}"
              </p>

              {/* Modifier Perk Banner */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-[10px] font-black text-amber-400 uppercase flex items-center gap-1">
                  <span>{currentResult.modifierTrait.icon}</span>
                  <span>Special Modifier ({currentResult.modifierTrait.type}): {currentResult.modifierTrait.name}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {currentResult.modifierTrait.description}
                </p>
              </div>

              {/* Moveset Preview */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black text-slate-400 uppercase">Generated Moveset:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentResult.moves.map(m => (
                    <div key={m.key} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded bg-indigo-600/40 text-indigo-300 font-mono font-black text-[10px] flex items-center justify-center shrink-0">
                          {m.key}
                        </span>
                        <span className="font-bold text-white truncate">{m.name}</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold shrink-0">{m.damage} DMG</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Equip & Load */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    soundFX.playSuccess();
                    onLoadToLab(currentResult);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Equip & Transfer to Fusion Lab & Sparring Cage</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="text-5xl animate-pulse">🎰</div>
              <h3 className="text-lg font-black text-white">Quantum Catalyst Idle</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Press <strong>"Spin Mutation Catalyst"</strong> above to fuse random fruits with special modifiers and discover rare or divine Tier-3 chimeras!
              </p>
              <button
                onClick={handleSpinRoulette}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors"
              >
                Perform First Spin
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SPIN HISTORY & STAT CODEX (5 COLS) */}
        <div className="lg:col-span-5 space-y-5">
          {/* History */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="text-xs font-black text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Recent Catalyst Rolls ({spinHistory.length})</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono font-bold">Total: {spinsCount} spins</span>
            </div>

            {spinHistory.length === 0 ? (
              <div className="text-slate-500 italic text-center py-6 text-xs">
                No spins yet. Spin to record rolls.
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {spinHistory.map((item, idx) => (
                  <div
                    key={item.id + idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{item.fruit1.imageEmoji}</span>
                      <div>
                        <div className="font-black text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.rarity} • {item.modifierTrait.name}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundFX.playPop();
                        setCurrentResult(item);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-purple-900 text-purple-200 text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rarity Rates Info Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300">Catalyst Probability Rates:</div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                🟢 Rare: 45%
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-purple-400">
                🟣 Legendary: 35%
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-rose-400">
                🔴 Mythical: 15%
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-amber-300">
                ✨ Celestial God: 5%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
