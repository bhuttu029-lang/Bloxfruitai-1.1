import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Swords, 
  Zap, 
  Shield, 
  Flame, 
  Wind, 
  Eye, 
  Layers, 
  Sliders, 
  Share2, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  Award,
  ChevronRight,
  Crosshair,
  Activity,
  Heart,
  Crown,
  Dices,
  GitBranch,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { getEffectiveFruitList, FruitItem } from '../data/bloxFruitsData';
import { 
  MutationMove, 
  MutationAuraTheme, 
  MutationPassiveTrait, 
  PresetMutation, 
  AURA_THEMES, 
  PASSIVE_TRAITS_LIST, 
  PRESET_MUTATIONS 
} from '../data/mutationLabData';
import { MutationRaidArena } from './MutationRaidArena';
import { MutationGachaRoulette, RolledMutation } from './MutationGachaRoulette';
import { MutationEvolutionTree } from './MutationEvolutionTree';
import { EvolutionNode } from '../data/mutationEvolutionData';
import { SafeFruitImage } from './SafeFruitImage';

interface MutationLabProps {
  onAskSensei?: (query: string) => void;
}

export type MutationLabCategory = 'fusion' | 'presets' | 'raid-trials' | 'gacha-roulette' | 'evolution-trees';

export const MutationLab: React.FC<MutationLabProps> = ({ onAskSensei }) => {
  const [labMode, setLabMode] = useState<MutationLabCategory>('fusion');

  // Selected base fruits for fusion
  const [fruit1Id, setFruit1Id] = useState<string>('kitsune');
  const [fruit2Id, setFruit2Id] = useState<string>('dragon');

  // Custom Mutation State
  const [customName, setCustomName] = useState<string>('Solar Fox Emperor');
  const [customTitle, setCustomTitle] = useState<string>('Celestial Beast Fusion');
  const [customLore, setCustomLore] = useState<string>('Forged at the apex of Sea 3 when a Nine-Tailed Fox consumed the celestial core of the Eastern Dragon.');
  const [customElement, setCustomElement] = useState<string>('Celestial Solar Foxfire');
  const [selectedAura, setSelectedAura] = useState<MutationAuraTheme>(AURA_THEMES[1]);
  const [selectedPassives, setSelectedPassives] = useState<string[]>([PASSIVE_TRAITS_LIST[0].id, PASSIVE_TRAITS_LIST[6].id]);

  // Moves State
  const [moves, setMoves] = useState<MutationMove[]>(PRESET_MUTATIONS[0].moves);

  // Sparring Dummy Combat State
  const [dummyHealth, setDummyHealth] = useState<number>(50000);
  const [totalDamageDealt, setTotalDamageDealt] = useState<number>(0);
  const [comboCount, setComboCount] = useState<number>(0);
  const [recentHits, setRecentHits] = useState<{ id: number; text: string; damage: number; color: string }[]>([]);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [copiedCard, setCopiedCard] = useState<boolean>(false);
  const [isFusingAnimation, setIsFusingAnimation] = useState<boolean>(false);

  const [effectiveFruits, setEffectiveFruits] = useState(() => getEffectiveFruitList());

  useEffect(() => {
    const handleUpdate = () => setEffectiveFruits(getEffectiveFruitList());
    window.addEventListener('blox_fruits_overrides_updated', handleUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleUpdate);
    };
  }, []);

  // Get fruit objects
  const fruit1 = useMemo(() => effectiveFruits.find(f => f.id === fruit1Id) || effectiveFruits[0], [effectiveFruits, fruit1Id]);
  const fruit2 = useMemo(() => effectiveFruits.find(f => f.id === fruit2Id) || effectiveFruits[1], [effectiveFruits, fruit2Id]);

  // Cooldown countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCooldowns(prev => {
        const next: Record<string, number> = {};
        let changed = false;
        Object.entries(prev).forEach(([key, val]) => {
          const numVal = typeof val === 'number' ? val : 0;
          if (numVal > 0.1) {
            next[key] = Math.max(0, parseFloat((numVal - 0.1).toFixed(1)));
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Handle Loading a Preset Mutation
  const handleLoadPreset = (preset: PresetMutation) => {
    soundFX.playSuccess();
    setCustomName(preset.name);
    setCustomTitle(preset.title);
    setCustomLore(preset.lore);
    setCustomElement(preset.element);
    setSelectedAura(preset.auraTheme);
    setSelectedPassives(preset.passives.map(p => p.id));
    setMoves(preset.moves);
    setLabMode('fusion');
  };

  // Handle Loading from Gacha Roulette
  const handleLoadRolledMutation = (rolled: RolledMutation) => {
    soundFX.playSuccess();
    setFruit1Id(rolled.fruit1.id);
    setFruit2Id(rolled.fruit2.id);
    setCustomName(rolled.name);
    setCustomTitle(rolled.title);
    setCustomLore(rolled.lore);
    setCustomElement(rolled.element);
    setSelectedAura(rolled.auraTheme);
    setMoves(rolled.moves);
    setLabMode('fusion');
  };

  // Handle Loading from Evolution Tree
  const handleLoadAwakeningToLab = (fruitName: string, node: EvolutionNode) => {
    soundFX.playSuccess();
    setCustomName(`${fruitName} (${node.stage})`);
    setCustomTitle(node.badge);
    setCustomLore(node.description);
    setCustomElement(`${node.stage} Celestial Mastery`);
    setMoves(prev => [
      {
        key: 'Z',
        name: node.unlockedMove,
        description: `Unlocked at mastery ${node.masteryRequired} via fruit ascension.`,
        damage: 4800,
        cooldown: 4.5,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: node.masteryRequired,
        iconEmoji: node.icon
      },
      ...prev.slice(1)
    ]);
    setLabMode('fusion');
  };

  // Perform Fuse action with animation
  const handleTriggerFuse = () => {
    soundFX.playPop();
    setIsFusingAnimation(true);
    setTimeout(() => {
      soundFX.playSuccess();
      setIsFusingAnimation(false);
      // Auto generate name
      setCustomName(`${fruit1.name.split(' ')[0]} ${fruit2.name.split(' ')[0]} Chimera`);
      setCustomTitle(`Hybrid Synthesis (${fruit1.name} + ${fruit2.name})`);
      setCustomLore(`An unprecedented hybrid fusion synthesizing the elemental properties of ${fruit1.name} and ${fruit2.name}.`);
    }, 1200);
  };

  // Dummy Combat Hit trigger
  const handleExecuteMove = (move: MutationMove) => {
    if ((cooldowns[move.key] || 0) > 0) return;

    soundFX.playHit();
    // Put on cooldown
    setCooldowns(prev => ({ ...prev, [move.key]: move.cooldown }));

    // Deal damage
    const dmg = move.damage;
    setDummyHealth(prev => Math.max(0, prev - dmg));
    setTotalDamageDealt(prev => prev + dmg);
    setComboCount(prev => prev + 1);

    // Floating text item
    const hitId = Date.now() + Math.random();
    setRecentHits(prev => [
      ...prev.slice(-4),
      {
        id: hitId,
        text: `${move.key}: ${move.name} (${move.hitboxType})`,
        damage: dmg,
        color: selectedAura.colorHex
      }
    ]);

    setTimeout(() => {
      setRecentHits(prev => prev.filter(h => h.id !== hitId));
    }, 1800);
  };

  const handleResetDummy = () => {
    soundFX.playPop();
    setDummyHealth(50000);
    setTotalDamageDealt(0);
    setComboCount(0);
    setRecentHits([]);
    setCooldowns({});
  };

  const handleCopyCardText = () => {
    soundFX.playPop();
    const text = `🔥 BLOX FRUITS MUTATION LAB SPECIFICATION 🔥
Name: ${customName} [${customTitle}]
Element: ${customElement}
Aura Theme: ${selectedAura.name}
Base Fruits: ${fruit1.name} + ${fruit2.name}

⚔️ MOVESET:
${moves.map(m => `• [${m.key}] ${m.name} - ${m.damage} DMG | CD: ${m.cooldown}s | ${m.kenBreak} | ${m.hitboxType}`).join('\n')}

🛡️ PASSIVE TRAITS:
${selectedPassives.map(pid => {
  const p = PASSIVE_TRAITS_LIST.find(x => x.id === pid);
  return p ? `• ${p.icon} ${p.name}: ${p.description}` : '';
}).join('\n')}

📜 LORE:
${customLore}`;

    navigator.clipboard.writeText(text);
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  // Calculate Overall Calculated Rating
  const averageDmg = Math.round(moves.reduce((acc, m) => acc + m.damage, 0) / moves.length);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/80 to-slate-900 border border-purple-500/30 p-6 md:p-8 shadow-2xl shadow-purple-950/60">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-black uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5 text-pink-300" />
              <span>🎮 Mini-Game • Boss Raid Combat & Fusion RPG Arena</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Fruit Mutation Game • Combat Arena ⚔️
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Play real-time Boss Raid Gauntlets, spin the Catalyst Gacha Wheel, simulate hybrid dual-fruit battle movesets, or level up Fruit Awakening Evolution Trees.
            </p>
          </div>

          {/* Expanded 5-Category Mode Switcher */}
          <div className="flex flex-wrap items-center p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner gap-1 w-full xl:w-auto">
            <button
              onClick={() => {
                soundFX.playPop();
                setLabMode('fusion');
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                labMode === 'fusion'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Fusion Forge</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setLabMode('presets');
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                labMode === 'presets'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Mythical Presets</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setLabMode('raid-trials');
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                labMode === 'raid-trials'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg border border-rose-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-rose-400" />
              <span>Boss Raid Trials</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setLabMode('gacha-roulette');
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                labMode === 'gacha-roulette'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold shadow-lg border border-amber-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dices className="w-3.5 h-3.5 text-amber-300" />
              <span>Catalyst Gacha</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setLabMode('evolution-trees');
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                labMode === 'evolution-trees'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg border border-cyan-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-cyan-300" />
              <span>Evolution Trees</span>
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY 3: BOSS RAID TRIALS */}
      {labMode === 'raid-trials' && (
        <MutationRaidArena
          customMutationName={customName}
          customMutationElement={customElement}
          customMoves={moves}
          auraTheme={selectedAura}
          onAskSensei={onAskSensei}
        />
      )}

      {/* CATEGORY 4: CATALYST GACHA ROULETTE */}
      {labMode === 'gacha-roulette' && (
        <MutationGachaRoulette
          onLoadToLab={handleLoadRolledMutation}
          onAskSensei={onAskSensei}
        />
      )}

      {/* CATEGORY 5: EVOLUTION & AWAKENING TREES */}
      {labMode === 'evolution-trees' && (
        <MutationEvolutionTree
          onLoadAwakeningToLab={handleLoadAwakeningToLab}
          onAskSensei={onAskSensei}
        />
      )}

      {/* CATEGORY 2: PRESETS BROWSER */}
      {labMode === 'presets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Pre-Engineered Mythical Mutations & Awakenings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRESET_MUTATIONS.map((preset) => (
              <div
                key={preset.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                      {preset.fusionType === 'hybrid' ? '🧬 Hybrid Fusion' : '⚡ Custom Awakening'}
                    </span>
                    <div className="flex items-center gap-1 text-xl">
                      <span>{preset.fruit1Emoji}</span>
                      {preset.fruit2Emoji && <span>+ {preset.fruit2Emoji}</span>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                      {preset.name}
                    </h3>
                    <div className="text-xs text-purple-300 font-bold">{preset.title}</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {preset.lore}
                  </p>

                  {/* Moves pill preview */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {preset.moves.map(m => (
                      <span key={m.key} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                        [{m.key}] {m.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleLoadPreset(preset)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg border border-purple-400/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Load Into Fusion Forge & Test</span>
                  </button>

                  <button
                    onClick={() => {
                      handleLoadPreset(preset);
                      setLabMode('raid-trials');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-950 hover:bg-rose-950 text-rose-300 font-bold text-xs border border-rose-900/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Take Directly Into Boss Raid</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY 1: FUSION LAB SANDBOX */}
      {labMode === 'fusion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: FUSION FORGE & MOVE DESIGNER (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fruit Fusion Chamber */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-purple-400" />
                  <span>Dual Fruit Fusion Reactor</span>
                </h3>
                <button
                  onClick={handleTriggerFuse}
                  disabled={isFusingAnimation}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-xs transition-all shadow-lg border border-purple-300/40 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isFusingAnimation ? 'animate-spin' : ''}`} />
                  <span>{isFusingAnimation ? 'Fusing Elements...' : 'Synthesize Fusion'}</span>
                </button>
              </div>

              {/* Fruit Selectors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {/* Fruit 1 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-[11px] font-black text-cyan-300 uppercase">Primary Base Fruit</label>
                  <select
                    value={fruit1Id}
                    onChange={(e) => setFruit1Id(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    {effectiveFruits.filter(f => f.category === 'fruit').map(f => (
                      <option key={f.id} value={f.id}>{f.imageEmoji} {f.name} ({f.rarity})</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {fruit1.iconUrl ? (
                        <SafeFruitImage src={fruit1.iconUrl} alt={fruit1.name} category={fruit1.category} rarity={fruit1.rarity} className="w-5 h-5 object-contain" />
                      ) : (
                        <span>{fruit1.imageEmoji}</span>
                      )}
                    </div>
                    <span className="font-bold text-white">{fruit1.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{fruit1.type || 'Elemental'}</span>
                  </div>
                </div>

                {/* Fruit 2 */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-[11px] font-black text-amber-300 uppercase">Secondary Hybrid Catalyst</label>
                  <select
                    value={fruit2Id}
                    onChange={(e) => setFruit2Id(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {effectiveFruits.filter(f => f.category === 'fruit').map(f => (
                      <option key={f.id} value={f.id}>{f.imageEmoji} {f.name} ({f.rarity})</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {fruit2.iconUrl ? (
                        <SafeFruitImage src={fruit2.iconUrl} alt={fruit2.name} category={fruit2.category} rarity={fruit2.rarity} className="w-5 h-5 object-contain" />
                      ) : (
                        <span>{fruit2.imageEmoji}</span>
                      )}
                    </div>
                    <span className="font-bold text-white">{fruit2.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{fruit2.type || 'Natural'}</span>
                  </div>
                </div>
              </div>

              {/* Name & Title Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Custom Mutation Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:border-purple-400 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Elemental Classification</label>
                  <input
                    type="text"
                    value={customElement}
                    onChange={(e) => setCustomElement(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-bold focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              {/* Aura Palette Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Aura Theme & Particle Vfx</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AURA_THEMES.map(aura => (
                    <button
                      key={aura.id}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedAura(aura);
                      }}
                      className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 cursor-pointer ${
                        selectedAura.id === aura.id
                          ? 'bg-slate-800 border-white ring-2 ring-purple-500 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: aura.colorHex }} />
                      <span className="truncate font-bold text-[11px] text-white">{aura.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Move Customizer (Z, X, C, V, F) */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-xl space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Swords className="w-5 h-5 text-cyan-400" />
                <span>Move Designer (Z, X, C, V, F)</span>
              </h3>

              <div className="space-y-3">
                {moves.map((move, idx) => (
                  <div
                    key={move.key}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-600/30 border border-purple-500/50 text-purple-300 font-mono font-black text-xs flex items-center justify-center">
                          {move.key}
                        </span>
                        <input
                          type="text"
                          value={move.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMoves(prev => prev.map((m, i) => i === idx ? { ...m, name: val } : m));
                          }}
                          className="p-1 rounded bg-slate-900 border border-slate-700 text-white font-bold text-xs focus:border-cyan-400 outline-none min-w-[160px]"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 text-[11px]">Hitbox:</span>
                        <select
                          value={move.hitboxType}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setMoves(prev => prev.map((m, i) => i === idx ? { ...m, hitboxType: val } : m));
                          }}
                          className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-medium"
                        >
                          <option value="Single Target">Single Target</option>
                          <option value="Cone Wave">Cone Wave</option>
                          <option value="Giant AoE">Giant AoE</option>
                          <option value="Piercing Beam">Piercing Beam</option>
                          <option value="Domain Arena">Domain Arena</option>
                          <option value="Dash Grab">Dash Grab</option>
                        </select>

                        <select
                          value={move.kenBreak}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setMoves(prev => prev.map((m, i) => i === idx ? { ...m, kenBreak: val } : m));
                          }}
                          className="p-1 rounded bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-medium"
                        >
                          <option value="True Break">True Break</option>
                          <option value="Bypasses Ken">Bypasses Ken</option>
                          <option value="Ken Drain">Ken Drain</option>
                          <option value="None">No Break</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Base DMG:</span>
                        <input
                          type="number"
                          value={move.damage}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setMoves(prev => prev.map((m, i) => i === idx ? { ...m, damage: val } : m));
                          }}
                          className="w-24 p-1 rounded bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs font-bold"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">Cooldown (s):</span>
                        <input
                          type="number"
                          step="0.5"
                          value={move.cooldown}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 1;
                            setMoves(prev => prev.map((m, i) => i === idx ? { ...m, cooldown: val } : m));
                          }}
                          className="w-20 p-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Passive Perks Selection */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>Passive Perks & Traits (Pick up to 2)</span>
                </h3>
                <span className="text-xs text-slate-400">{selectedPassives.length}/2 Active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PASSIVE_TRAITS_LIST.map(trait => {
                  const isSelected = selectedPassives.includes(trait.id);
                  return (
                    <button
                      key={trait.id}
                      onClick={() => {
                        soundFX.playPop();
                        if (isSelected) {
                          setSelectedPassives(prev => prev.filter(x => x !== trait.id));
                        } else if (selectedPassives.length < 2) {
                          setSelectedPassives(prev => [...prev, trait.id]);
                        }
                      }}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{trait.icon}</span>
                        <div className="font-bold text-xs text-white">{trait.name}</div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {trait.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AI RATING & FALL RISK ANALYZER & SPARRING ARENA (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI MUTATION RATING & CHANCE OF FALLING ANALYZER */}
            {(() => {
              const totalMoveDmg = moves.reduce((acc, m) => acc + m.damage, 0);
              const avgCd = moves.reduce((acc, m) => acc + m.cooldown, 0) / (moves.length || 1);
              const kenBreaks = moves.filter(m => m.kenBreak === 'True Break' || m.kenBreak === 'Bypasses Ken').length;
              const passiveScore = selectedPassives.length * 9;
              const rawPowerScore = Math.min(99, Math.max(25, Math.round((totalMoveDmg / 42) + (kenBreaks * 14) + passiveScore)));

              const defensiveCount = selectedPassives.filter(pid => pid === 'iron-skin' || pid === 'celestial-shield' || pid === 'vampiric').length;
              const calculatedFallRisk = Math.min(48, Math.max(1.2, Math.round((totalMoveDmg / 52) - (defensiveCount * 8) + (avgCd < 3.2 ? 8 : 2))));

              const ratingTier = rawPowerScore >= 90 ? 'S+ GOD TIER' : rawPowerScore >= 75 ? 'S-TIER META' : rawPowerScore >= 60 ? 'A-TIER VIABLE' : 'B-TIER STANDARD';
              const ratingBadgeColor = rawPowerScore >= 90 ? 'text-amber-300 border-amber-500/50 bg-amber-500/20' : rawPowerScore >= 75 ? 'text-purple-300 border-purple-500/50 bg-purple-500/20' : 'text-cyan-300 border-cyan-500/50 bg-cyan-500/20';

              return (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/40 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                      <h3 className="font-black text-white text-base">Solas AI Mutation Rating & Fall Risk</h3>
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${ratingBadgeColor}`}>
                      {ratingTier}
                    </span>
                  </div>

                  {/* Rating Progress Bars */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Power Rating</span>
                        <span className="text-amber-300 font-mono font-black">{rawPowerScore}%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400" style={{ width: `${rawPowerScore}%` }} />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Chance of Falling</span>
                        <span className="text-rose-400 font-mono font-black">{calculatedFallRisk}%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-rose-600 to-amber-500" style={{ width: `${calculatedFallRisk * 2}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Verdict & Stability Analysis */}
                  <div className="p-3.5 rounded-xl bg-slate-950/90 border border-purple-500/30 text-xs space-y-2 text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span>🛡️ Solas AI Verdict:</span>
                      <span className={calculatedFallRisk > 25 ? 'text-rose-400' : 'text-emerald-400'}>
                        {calculatedFallRisk > 25 ? 'High Volatility Warning!' : 'Stable Combat Build'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {calculatedFallRisk > 25 
                        ? `This combination exhibits massive damage output (${totalMoveDmg} total) but carries a **${calculatedFallRisk}% Chance of Falling** due to high energy strain and short cooldowns. Consider adding defensive passives or catalysts to prevent skill collapse in Sea Danger raids.`
                        : `Excellent synergy! With a low **${calculatedFallRisk}% Chance of Falling** and strong Ken-break priority, this mutation holds exceptional stability across boss encounters and gacha raids.`}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* SPARRING COMBAT ARENA */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-400 animate-pulse" />
                  <h3 className="font-black text-white text-base">Combat Dummy Sparring Cage</h3>
                </div>
                <button
                  onClick={handleResetDummy}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Dummy</span>
                </button>
              </div>

              {/* Dummy Health & Combo Display */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-center relative">
                <div className="text-4xl my-1 animate-bounce">🤖</div>
                <div className="text-xs font-bold text-slate-300">Level 2800 Obsidian Training Dummy (Update 27.4 Max)</div>

                {/* Dummy HP Bar */}
                <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-300"
                    style={{ width: `${(dummyHealth / 50000) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>HP: {dummyHealth.toLocaleString()} / 50,000</span>
                  <span className="text-rose-400 font-bold">Total Damage: {totalDamageDealt.toLocaleString()}</span>
                </div>

                {/* Floating Damage Text */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col">
                  {recentHits.map(h => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -40, scale: 1.2 }}
                      transition={{ duration: 1.2 }}
                      className="font-black text-sm drop-shadow-md"
                      style={{ color: h.color }}
                    >
                      💥 -{h.damage.toLocaleString()} DMG! ({h.text})
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Active Combo Stats */}
              <div className="flex items-center justify-around text-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">Combo Hits</div>
                  <div className="text-lg font-black text-cyan-300 font-mono">{comboCount}x</div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">Avg Move DMG</div>
                  <div className="text-lg font-black text-amber-300 font-mono">{averageDmg.toLocaleString()}</div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">DPS Rating</div>
                  <div className="text-lg font-black text-emerald-400 font-mono">S+ Tier</div>
                </div>
              </div>

              {/* Move Execution Buttons */}
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Execute Attacks:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {moves.map(move => {
                    const cd = cooldowns[move.key] || 0;
                    const isOnCd = cd > 0;

                    return (
                      <button
                        key={move.key}
                        onClick={() => handleExecuteMove(move)}
                        disabled={isOnCd}
                        className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex items-center justify-between cursor-pointer ${
                          isOnCd
                            ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                            : 'bg-slate-950 hover:bg-slate-900 border-indigo-500/40 text-white hover:border-cyan-400 active:scale-95 shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                            {move.key}
                          </span>
                          <div>
                            <div className="font-extrabold text-xs text-white truncate max-w-[130px]">{move.name}</div>
                            <div className="text-[10px] text-amber-400 font-mono font-bold">{move.damage.toLocaleString()} DMG</div>
                          </div>
                        </div>

                        {isOnCd && (
                          <span className="text-xs font-black text-cyan-400 font-mono animate-pulse">
                            {cd.toFixed(1)}s
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* EXPORTABLE MUTATION STAT CARD & RAID LAUNCHER */}
            <div className={`p-6 rounded-2xl bg-slate-950 border-2 ${selectedAura.glowClass} shadow-2xl space-y-4 relative overflow-hidden`}>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/50 uppercase">
                  🏆 Mythical Mutation Card
                </span>
                <button
                  onClick={handleCopyCardText}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {copiedCard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  <span>{copiedCard ? 'Copied!' : 'Copy Spec Card'}</span>
                </button>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white">{customName}</h2>
                <div className="text-xs text-cyan-300 font-bold">{customElement} • {selectedAura.name}</div>
              </div>

              <p className="text-xs text-slate-300 italic border-l-2 border-purple-500 pl-3">
                "{customLore}"
              </p>

              {/* Passives */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-black text-slate-400 uppercase">Equipped Perks:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPassives.map((pid, idx) => {
                    const p = PASSIVE_TRAITS_LIST.find(x => x.id === pid);
                    return p ? (
                      <span key={`${pid}-${idx}`} className="px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-1">
                        <span>{p.icon}</span>
                        <span>{p.name.split('(')[0]}</span>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Quick Launch into Raid Boss Trial */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  setLabMode('raid-trials');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Swords className="w-4 h-4" />
                <span>Test This Mutation In Boss Raid Trials</span>
              </button>

              {onAskSensei && (
                <button
                  onClick={() => {
                    soundFX.playPop();
                    onAskSensei(`Evaluate my custom Blox Fruit mutation "${customName}" (${fruit1.name} + ${fruit2.name}) with ${averageDmg} average damage.`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Solas AI To Rate This Custom Fruit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
