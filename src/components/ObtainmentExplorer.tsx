import React, { useState, useMemo } from 'react';
import { ALL_OBTAINMENT_DATA, ItemObtainmentGuide } from '../data/bloxObtainmentData';
import { Search, Filter, Sparkles, MapPin, Gift, Swords, Moon, Shield, Crosshair, ChevronRight, Zap, Info, Flame } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ObtainmentExplorerProps {
  onAskSensei?: (query: string) => void;
}

export const ObtainmentExplorer: React.FC<ObtainmentExplorerProps> = ({ onAskSensei }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSea, setSelectedSea] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<ItemObtainmentGuide>(ALL_OBTAINMENT_DATA[0]);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: '🌐 All Items' },
      { id: 'Limited Event', label: '🏹 Limited Event Items' },
      { id: 'Accessory', label: '🧥 Rare Drops & Accessories' },
      { id: 'Race Awakening', label: '🌕 Race V4 Awakening' },
      { id: 'Sword', label: '🗡️ Swords (CDK, TTK, Yoru)' },
      { id: 'Gun', label: '🎯 Guns (Soul Guitar)' },
      { id: 'Fighting Style', label: '🥊 Fighting Styles (Godhuman)' },
      { id: 'Fruit', label: '🍎 Blox Fruits' },
      { id: 'Gamepass', label: '👑 Gamepasses (Notifier 6B)' },
      { id: 'Material', label: '🔮 Quest Items & Keys' }
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return ALL_OBTAINMENT_DATA.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedSea !== 'all' && item.sea !== selectedSea && item.sea !== 'All Seas') {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.rarity.toLowerCase().includes(q) ||
          (item.eventName && item.eventName.toLowerCase().includes(q)) ||
          item.obtainmentSteps.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, selectedCategory, selectedSea]);

  return (
    <div id="obtainment-explorer-container" className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">
                <span>📜</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                Blox Fruits Master Obtainment Codex
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Complete, verified step-by-step guides for obtaining every limited-time event item, boss drop (Dark Coat 2%), Race V4 trial, sword, gun, fighting style, and gamepass.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{ALL_OBTAINMENT_DATA.length} Complete Guides</span>
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Cupid Helmet, Dark Coat, Santa Hat, CDK, Cyborg V4, Godhuman..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedSea}
              onChange={(e) => {
                soundFX.playPop();
                setSelectedSea(e.target.value);
              }}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">🌊 All Seas / All Locations</option>
              <option value="First Sea">First Sea (Old World)</option>
              <option value="Second Sea">Second Sea (Kingdom of Rose / Darkbeard)</option>
              <option value="Third Sea">Third Sea (Mirage Island / Haunted Castle)</option>
              <option value="Special Dimension">Special Dimensions (Temple of Time / Leviathan)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80 mt-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Pane Layout: Item List + Active Guide Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Items Grid / List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              No obtainment guides match your search criteria.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = activeItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundFX.playPop();
                    setActiveItem(item);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 translate-x-1'
                      : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/90 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white truncate">{item.name}</span>
                        {item.isLimitedEvent && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            EVENT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-cyan-400 font-semibold">{item.category}</span>
                        <span>•</span>
                        <span className="truncate">{item.sea}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Active Dossier View */}
        <div className="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 sticky top-20">
          {activeItem ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-3xl shadow-inner">
                    {activeItem.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-wide">{activeItem.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {activeItem.rarity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeItem.category} • {activeItem.sea}
                    </p>
                  </div>
                </div>

                {onAskSensei && (
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onAskSensei(`How to get ${activeItem.name}?`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Ask Sensei</span>
                  </button>
                )}
              </div>

              {/* Limited Event Alert (if event item) */}
              {activeItem.isLimitedEvent && (
                <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Limited Event Exclusive: </strong>
                    Originally obtained during the <em>{activeItem.eventName}</em>. If the event is concluded, this item is obtainable through physical trading tables in Second & Third Sea!
                  </div>
                </div>
              )}

              {/* Stats & Prerequisites Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Location / NPC</div>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">
                    {activeItem.npcLocation || activeItem.sea}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Drop Rate / Cost</div>
                  <div className="text-xs font-bold text-amber-400 mt-1">
                    {activeItem.dropChance
                      ? activeItem.dropChance
                      : activeItem.costRobux
                      ? `${activeItem.costRobux} Robux`
                      : activeItem.costBeli
                      ? `$${activeItem.costBeli.toLocaleString()} Beli`
                      : 'Quest / Trial'}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Requirements</div>
                  <div className="text-xs font-bold text-cyan-300 mt-1 truncate" title={activeItem.requirements}>
                    {activeItem.requirements || 'None'}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" /> Complete Obtainment Steps:
                </h4>
                <div className="space-y-2 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/90">
                  {activeItem.obtainmentSteps.map((step, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buffs & Perks */}
              {activeItem.buffsOrMoves && activeItem.buffsOrMoves.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Buffs, Perks & Abilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeItem.buffsOrMoves.map((buff, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-emerald-300 font-medium">
                        • {buff}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pro Tip */}
              {activeItem.tips && (
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-300">Sensei Strategy: </strong>
                    {activeItem.tips}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center text-slate-500 text-sm">
              Select an item from the list to view its complete obtainment dossier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
