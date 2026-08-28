import React, { useState } from 'react';
import { Compass, Map, Shield, Flame, Swords, Moon, Sparkles, Trophy, ChevronRight, CheckCircle, HelpCircle, Zap } from 'lucide-react';
import { SEA_PROGRESSION, RAIDS_DATA, RACES_DATA, SeaLocation, RaidInfo } from '../data/bloxExtraData';
import { soundFX } from '../utils/audio';

export const SeaProgressionGuide: React.FC = () => {
  const [activeSea, setActiveSea] = useState<1 | 2 | 3>(3);
  const [activeSection, setActiveSection] = useState<'islands' | 'v4' | 'leviathan' | 'raids' | 'swords'>('islands');
  const [selectedRaid, setSelectedRaid] = useState<RaidInfo>(RAIDS_DATA[0]);

  const locations = SEA_PROGRESSION.filter(loc => loc.sea === activeSea);

  return (
    <div id="sea-progression-container" className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Complete Game Progression
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Lv 1 → Lv 2550 MAX
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sea Progression, Raids & Grandmaster Quests
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Leveling paths for First, Second, and Third Sea, Mirage Island Blue Gear puzzle, Leviathan Heart hunting, Race V4 trials, and Raid awakenings.
            </p>
          </div>

          {/* Section Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'islands', label: '🗺️ Island Leveling', icon: Map },
              { id: 'v4', label: '🌕 Race V4 & Mirage', icon: Moon },
              { id: 'leviathan', label: '🐉 Leviathan & Sanguine', icon: Flame },
              { id: 'raids', label: '🔮 Raids & Frags', icon: Sparkles },
              { id: 'swords', label: '⚔️ CDK & TTK Quests', icon: Swords },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playPop();
                  setActiveSection(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeSection === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. Island Leveling Routes */}
      {activeSection === 'islands' && (
        <div className="space-y-6">
          {/* Sea Switcher */}
          <div className="flex items-center justify-between bg-slate-900/90 p-2 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-2">
              {[
                { sea: 1, name: 'First Sea (Old World)', lvl: 'Lv 1 - 700', badge: 'Early Game' },
                { sea: 2, name: 'Second Sea (Dressrosa)', lvl: 'Lv 700 - 1500', badge: 'Mid Game' },
                { sea: 3, name: 'Third Sea (New World)', lvl: 'Lv 1500 - 2550', badge: 'Endgame / PvP' },
              ].map(s => (
                <button
                  key={s.sea}
                  onClick={() => {
                    soundFX.playPop();
                    setActiveSea(s.sea as any);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    activeSea === s.sea
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg font-black'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <div className="font-extrabold">{s.name}</div>
                  <div className="text-[10px] opacity-80">{s.lvl} • {s.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Islands List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {loc.levelRange}
                  </span>
                  {loc.boss && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      👑 {loc.boss.split('(')[0]}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-white">{loc.name}</h3>

                <div className="text-xs text-slate-400 space-y-1">
                  <div><strong>Enemies:</strong> {loc.enemies.join(', ')}</div>
                  <div><strong>Key Unlocks:</strong> <span className="text-amber-300">{loc.keyUnlocks.join(' • ')}</span></div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300">
                  💡 <strong className="text-cyan-400">Pro Tip:</strong> {loc.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Race V4 & Mirage Island */}
      {activeSection === 'v4' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-400" /> Complete Race V4 Awakening Walkthrough
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Follow these sequential steps to find Mirage Island, align with the Full Moon, pull the Temple of Time lever, and triumph in 3-player race trials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Full Moon & Mirage Island</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Sail into Danger Zones 3–6 in Third Sea.</li>
                <li>When Mirage spawns during Full Moon, climb the highest cliff.</li>
                <li>Activate Race V3 and stare at the moon with Ken/Instinct for 15s until it glows pink.</li>
                <li>Search the island for the glowing <strong>Blue Gear</strong>.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Temple of Time & Lever</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Head to Great Tree and speak with the Ancient One on top of the peak.</li>
                <li>Enter the Temple of Time and locate the secret wall lever.</li>
                <li>Pull the lever (requires Blue Gear unlocked).</li>
                <li>Open the 6 race trial doors.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-white">The 3-Player Trial of Power</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Gather 3 players with different races at the doors during Full Moon.</li>
                <li>Activate V3 abilities simultaneously on count of 3.</li>
                <li>Complete your race trial (Missiles, Sea Beast, Clouds, Speed, etc.).</li>
                <li>Defeat other players and resonate with the Ancient Clock to socket gears!</li>
              </ul>
            </div>
          </div>

          {/* Race Trials Summary */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">All 6 Race Trial Mechanics:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RACES_DATA.map(r => (
                <div key={r.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white flex items-center gap-1.5">
                      <span>{r.icon}</span> {r.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                      {r.pvpTier} PvP
                    </span>
                  </div>
                  <div className="text-slate-400 font-medium">{r.v4Awakening.trialType}</div>
                  <div className="text-[11px] text-cyan-400">{r.v4Awakening.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Leviathan & Sanguine Art */}
      {activeSection === 'leviathan' && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" /> Leviathan Hunt & Sanguine Art Guide
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Defeat the gargantuan ocean serpent in Danger Zone 6, harpoon its heart, and master the Sanguine Art martial style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300">1. Beast Hunter Boat & Spy NPC</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Craft the <strong>Beast Hunter</strong> at Tiki Outpost using 20 Leviathan Scales, 6 Electric Wings, and 2 Mutant Teeth. Speak with the Spy NPC until he states <em>"The Leviathan is out there"</em>. Sail to Danger Level 6 (??? Sea) with at least 5 players.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300">
                ⚠️ Make sure your boat driver has high health and defensive race (Shark V3/V4 recommended).
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-rose-400">2. Harpooning the Heart & Unlocking Sanguine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Defeat Leviathan segments. When the heart drops, fire the Beast Hunter harpoon gun to latch on. Drive the boat back to Tiki Outpost. Talk to <strong>Shafi</strong> in the crypt with $5,000,000 Beli, 5,000 Frags, 20 Demonic Wisps, 20 Vampire Fangs, and 2 Dark Fragments.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300">
                🩸 <strong>Sanguine Art:</strong> Possesses passive lifesteal, massive stun, and SS-tier raid survivability.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Raids & Fragment Awakenings */}
      {activeSection === 'raids' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RAIDS_DATA.map(raid => (
              <button
                key={raid.id}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedRaid(raid);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedRaid.id === raid.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-base font-black text-white">{raid.fruitName} Raid</div>
                <div className="text-[11px] text-cyan-400 mt-0.5">{raid.totalFragmentsToAwaken.toLocaleString()} Frags Total</div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white">{selectedRaid.fruitName} Awakening Progression</h3>
                <p className="text-xs text-slate-400">Raid Type: <strong className="text-cyan-300">{selectedRaid.type}</strong> ({selectedRaid.difficulty} Difficulty)</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Host Cost:</span>
                <div className="text-xs font-bold text-amber-300">{selectedRaid.cost}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Moveset Awakening Order:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedRaid.awakenedMoves.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center">
                        {m.key}
                      </span>
                      <span className="font-bold text-slate-200">{m.name}</span>
                    </div>
                    <span className="font-extrabold text-amber-400">{m.fragments.toLocaleString()} Frags</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CDK & TTK Quests */}
      {activeSection === 'swords' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗡️⚡</span>
              <div>
                <h3 className="text-lg font-black text-white">Cursed Dual Katana (CDK)</h3>
                <span className="text-xs text-purple-400 font-bold">Yama & Tushita (350+ Mastery Each)</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter the crypt behind Mansion Waterfall. Complete 3 Yama trials (Pain & Haze, Fog Spirits, dying to Soul Reaper) and 3 Tushita trials (Docks, Pirate Raid, Cake Queen). Slay the Cursed Skeleton Boss to claim CDK!
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚔️✨</span>
              <div>
                <h3 className="text-lg font-black text-white">True Triple Katana (TTK)</h3>
                <span className="text-xs text-cyan-400 font-bold">Shisui, Wando, Saddi ($2M Each)</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buy Shisui, Wando, and Saddi from Legendary Sword Dealer in Second Sea ($6M total). Level all 3 to 300+ Mastery. Talk to the Mysterious Man on the peak stem of Green Zone for $2,000,000 Beli to forge TTK!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
