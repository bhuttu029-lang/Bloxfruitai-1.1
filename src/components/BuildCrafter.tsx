import React, { useState, useEffect } from 'react';
import { Swords, Shield, Zap, Sparkles, Flame, Target, Award, Play, RotateCcw, Copy, Check, ChevronRight } from 'lucide-react';
import { getEffectiveFruitList, FruitItem } from '../data/bloxFruitsData';
import { FIGHTING_STYLES, ACCESSORIES_DATA, RACES_DATA, COMBO_PRESETS, ComboPreset } from '../data/bloxExtraData';
import { soundFX } from '../utils/audio';

interface BuildCrafterProps {
  onAskSenseiAboutBuild?: (buildSummary: string) => void;
}

export const BuildCrafter: React.FC<BuildCrafterProps> = ({ onAskSenseiAboutBuild }) => {
  const [effectiveItems, setEffectiveItems] = useState(() => getEffectiveFruitList());

  useEffect(() => {
    const handleUpdate = () => setEffectiveItems(getEffectiveFruitList());
    window.addEventListener('blox_fruits_overrides_updated', handleUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleUpdate);
    };
  }, []);

  // Loadout state
  const fruits = effectiveItems.filter(i => i.category === 'fruit');
  const swords = effectiveItems.filter(i => i.category === 'sword');

  const [selectedFruit, setSelectedFruit] = useState<FruitItem>(fruits.find(f => f.id === 'portal') || fruits[0]);
  const [selectedStyle, setSelectedStyle] = useState(FIGHTING_STYLES[0]); // Godhuman
  const [selectedSword, setSelectedSword] = useState<FruitItem>(swords.find(s => s.id === 'dog-blade') || swords[0]);
  const [selectedGun, setSelectedGun] = useState('Soul Guitar');
  const [selectedRace, setSelectedRace] = useState(RACES_DATA[0]); // Cyborg
  const [selectedAccessory, setSelectedAccessory] = useState(ACCESSORIES_DATA[1]); // Pale Scarf
  const [isV4Awakened, setIsV4Awakened] = useState<boolean>(true);

  // Stat point allocation (Total max 7650, 2550 per category)
  const [stats, setStats] = useState<{ melee: number; defense: number; sword: number; gun: number; fruit: number }>({
    melee: 2550,
    defense: 2550,
    sword: 2550,
    gun: 0,
    fruit: 0
  });

  // Combo testing animation state
  const [activeComboStep, setActiveComboStep] = useState<number>(-1);
  const [isTestingCombo, setIsTestingCombo] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Available Guns
  const GUN_OPTIONS = [
    { name: 'Soul Guitar', rarity: 'Mythical', type: 'Stun / Ken Break', icon: '🎸⚡' },
    { name: 'Acidum Rifle', rarity: 'Rare', type: 'Acid Stun / Rapid', icon: '🔫🧪' },
    { name: 'Kabucha', rarity: 'Legendary', type: 'Wind Knockback', icon: '🎯💨' },
    { name: 'Serpent Bow', rarity: 'Legendary', type: 'Poison Snare', icon: '🏹🐍' },
    { name: 'Bizarre Rifle', rarity: 'Rare', type: 'Explosive Burst', icon: '💥' }
  ];

  // Calculate Synergy & Build Archetype
  const totalStats = stats.melee + stats.defense + stats.sword + stats.gun + stats.fruit;
  let archetype = 'Hybrid Warrior';
  if (stats.sword >= 2000 && stats.melee >= 2000) archetype = '⚔️ Sword Main Hunter';
  else if (stats.fruit >= 2000 && stats.melee >= 2000) archetype = '🍎 Fruit Main Caster';
  else if (stats.gun >= 2000) archetype = '🎯 Sniper Marksman';

  let synergyScore = 85;
  if (selectedSword.id === 'dog-blade' && selectedStyle.id === 'godhuman') synergyScore += 10;
  if (selectedFruit.id === 'portal' && selectedAccessory.id === 'pale-scarf') synergyScore += 5;
  if (isV4Awakened) synergyScore = Math.min(100, synergyScore + 5);

  // Find matching preset combo or generate combo
  const matchingPreset = COMBO_PRESETS.find(p => p.swordId === selectedSword.id || p.fruitId === selectedFruit.id) || COMBO_PRESETS[0];

  const handleApplyPreset = (preset: ComboPreset) => {
    soundFX.playPop();
    const f = fruits.find(item => item.id === preset.fruitId);
    if (f) setSelectedFruit(f);

    const s = swords.find(item => item.id === preset.swordId);
    if (s) setSelectedSword(s);

    const style = FIGHTING_STYLES.find(st => st.id === preset.styleId);
    if (style) setSelectedStyle(style);

    const r = RACES_DATA.find(rc => rc.id === preset.raceId);
    if (r) setSelectedRace(r);

    const acc = ACCESSORIES_DATA.find(a => a.id === preset.accessoryId);
    if (acc) setSelectedAccessory(acc);

    if (preset.playstyle.includes('Sword')) {
      setStats({ melee: 2550, defense: 2550, sword: 2550, gun: 0, fruit: 0 });
    } else {
      setStats({ melee: 2550, defense: 2550, sword: 0, gun: 0, fruit: 2550 });
    }
  };

  const handleTestCombo = () => {
    if (isTestingCombo) return;
    setIsTestingCombo(true);
    setActiveComboStep(0);
    soundFX.playPop();

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < matchingPreset.sequence.length) {
        setActiveComboStep(step);
        soundFX.playPop();
      } else {
        clearInterval(interval);
        soundFX.playWin();
        setIsTestingCombo(false);
      }
    }, 700);
  };

  return (
    <div id="build-crafter-container" className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" /> PvP & Combo Studio
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Max Lv 2550
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Blox Fruits Loadout & Combo Builder
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Craft your competitive PvP build, allocate stat points, test one-shot combos, and examine gear synergies across Fruits, Fighting Styles, Swords, Guns, and Race V4.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Presets:</span>
            {COMBO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{preset.name.split('+')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 6-Slot Loadout Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" /> Equipped Combat Loadout
              </h3>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
                {archetype}
              </span>
            </div>

            {/* Loadout Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Slot 1: Fruit */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🍎 Blox Fruit</span>
                  <span className="text-cyan-400 font-bold">{selectedFruit.rarity}</span>
                </div>
                <select
                  value={selectedFruit.id}
                  onChange={(e) => {
                    const found = fruits.find(f => f.id === e.target.value);
                    if (found) setSelectedFruit(found);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {fruits.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.imageEmoji} {f.name} ({f.pvpTier} PvP)
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>PvP: <strong className="text-white">{selectedFruit.pvpTier}</strong></span>
                  <span>Grind: <strong className="text-white">{selectedFruit.grindTier}</strong></span>
                  <span>Type: <strong className="text-cyan-300">{selectedFruit.type || 'Natural'}</strong></span>
                </div>
              </div>

              {/* Slot 2: Fighting Style */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🥊 Fighting Style</span>
                  <span className="text-amber-400 font-bold">{selectedStyle.generation}</span>
                </div>
                <select
                  value={selectedStyle.id}
                  onChange={(e) => {
                    const found = FIGHTING_STYLES.find(s => s.id === e.target.value);
                    if (found) setSelectedStyle(found);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {FIGHTING_STYLES.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.name} ({s.sea})
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>PvP: <strong className="text-white">{selectedStyle.pvpTier}</strong></span>
                  <span>Grind: <strong className="text-white">{selectedStyle.grindTier}</strong></span>
                  <span>Moves: <strong className="text-amber-300">Z, X, C</strong></span>
                </div>
              </div>

              {/* Slot 3: Sword */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🗡️ Sword</span>
                  <span className="text-sky-400 font-bold">{selectedSword.rarity}</span>
                </div>
                <select
                  value={selectedSword.id}
                  onChange={(e) => {
                    const found = swords.find(s => s.id === e.target.value);
                    if (found) setSelectedSword(found);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {swords.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.imageEmoji} {s.name} {s.id === 'dog-blade' ? '🔥 (Event)' : ''}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>PvP: <strong className="text-white">{selectedSword.pvpTier}</strong></span>
                  <span>Grind: <strong className="text-white">{selectedSword.grindTier}</strong></span>
                  {selectedSword.id === 'dog-blade' && <span className="text-amber-400 font-bold">580M Event Item</span>}
                </div>
              </div>

              {/* Slot 4: Gun */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🎯 Gun / Stun Tool</span>
                  <span className="text-purple-400 font-bold">Support</span>
                </div>
                <select
                  value={selectedGun}
                  onChange={(e) => setSelectedGun(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {GUN_OPTIONS.map(g => (
                    <option key={g.name} value={g.name}>
                      {g.icon} {g.name} ({g.type})
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Utility: <strong className="text-white">Ken Break & Pull</strong></span>
                  <span>Range: <strong className="text-cyan-300">Long</strong></span>
                </div>
              </div>

              {/* Slot 5: Race */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🧬 Race</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsV4Awakened(!isV4Awakened)}
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition-colors ${
                        isV4Awakened ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isV4Awakened ? 'V4 Active' : 'V3 Mode'}
                    </button>
                  </div>
                </div>
                <select
                  value={selectedRace.id}
                  onChange={(e) => {
                    const found = RACES_DATA.find(r => r.id === e.target.value);
                    if (found) setSelectedRace(found);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {RACES_DATA.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.icon} {r.name} ({r.pvpTier} Tier)
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 truncate">
                  V3: <strong className="text-slate-200">{selectedRace.v3Ability.name}</strong> ({selectedRace.v3Ability.cooldown})
                </div>
              </div>

              {/* Slot 6: Accessory */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>🧣 Accessory</span>
                  <span className="text-amber-400 font-bold">★ {selectedAccessory.pvpRating}/10</span>
                </div>
                <select
                  value={selectedAccessory.id}
                  onChange={(e) => {
                    const found = ACCESSORIES_DATA.find(a => a.id === e.target.value);
                    if (found) setSelectedAccessory(found);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                >
                  {ACCESSORIES_DATA.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.icon} {a.name} ({a.sea})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 truncate">
                  {selectedAccessory.buffs[0]}
                </div>
              </div>
            </div>

            {/* Stat Points Allocator */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Stat Allocation</span>
                  <span className="text-xs text-slate-500">(Max 2550 / Stat • Budget 7650)</span>
                </div>
                <button
                  onClick={() => {
                    if (stats.sword > 0) {
                      setStats({ melee: 2550, defense: 2550, sword: 0, gun: 0, fruit: 2550 });
                    } else {
                      setStats({ melee: 2550, defense: 2550, sword: 2550, gun: 0, fruit: 0 });
                    }
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                >
                  Swap Sword / Fruit Main
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {([
                  { key: 'melee', label: 'Melee', val: stats.melee, color: 'text-amber-400' },
                  { key: 'defense', label: 'Defense', val: stats.defense, color: 'text-emerald-400' },
                  { key: 'sword', label: 'Sword', val: stats.sword, color: 'text-sky-400' },
                  { key: 'gun', label: 'Gun', val: stats.gun, color: 'text-purple-400' },
                  { key: 'fruit', label: 'Blox Fruit', val: stats.fruit, color: 'text-rose-400' }
                ] as const).map(st => (
                  <div key={st.key} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-slate-400 font-medium">{st.label}</div>
                    <div className={`text-base font-black ${st.color}`}>{st.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Combo Simulator & Synergy Analytics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Synergy Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">PvP Combat Rating</span>
                <div className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span>{synergyScore}/100</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    S+ Competitive Tier
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
                🏆
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Ken Break Potential:</span>
                <strong className="text-cyan-400">Extreme (Soul Guitar + {selectedSword.name})</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Mobility & Escape:</span>
                <strong className="text-amber-400">{selectedFruit.name === 'portal' ? 'God Tier (Infinite Rift)' : 'High'}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Race V4 Passive:</span>
                <strong className="text-purple-400">{selectedRace.name} ({selectedRace.v4Awakening.name.split('&')[0]})</strong>
              </div>
            </div>
          </div>

          {/* Combo Sequence Player */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-cyan-400" /> {matchingPreset.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Est. Damage: <strong className="text-emerald-400">{matchingPreset.damageEstimate}</strong>
                </p>
              </div>

              <button
                onClick={handleTestCombo}
                disabled={isTestingCombo}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTestingCombo ? 'Simulating...' : 'Test Combo'}</span>
              </button>
            </div>

            {/* Sequence Steps */}
            <div className="space-y-2">
              {matchingPreset.sequence.map((stepStr, idx) => {
                const isActive = activeComboStep === idx;
                const isCompleted = activeComboStep > idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md translate-x-1'
                        : isCompleted
                        ? 'bg-slate-950/80 border-slate-800 text-slate-400'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                        isActive ? 'bg-cyan-400 text-slate-950' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{stepStr}</span>
                    </div>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-slate-950 animate-pulse">
                        HIT!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
              💡 <strong className="text-slate-200">Sensei Tip:</strong> {matchingPreset.tips}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
