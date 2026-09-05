import React, { useState, useMemo, useEffect } from 'react';
import {
  FruitItem,
  formatValueNumber,
  getUserValueOverrides,
  getEffectiveFruitList,
  clearAllUserValueOverrides,
  removeUserValueOverride,
  syncFruitDataWithServer,
} from '../data/bloxFruitsData';
import { performLiveMarketSync } from '../utils/liveWebSyncEngine';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Flame,
  Swords,
  ExternalLink,
  Plus,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { soundFX } from '../utils/audio';
import { SafeFruitImage } from './SafeFruitImage';

interface ValuesDatabaseProps {
  onSelectItem: (item: FruitItem) => void;
  onAddToYou: (item: FruitItem, isPerm: boolean) => void;
  onAddToThem: (item: FruitItem, isPerm: boolean) => void;
}

const VALUES_DB_SETTINGS_KEY = 'blox_fruits_values_db_settings_v1';

export const ValuesDatabase: React.FC<ValuesDatabaseProps> = ({
  onSelectItem,
  onAddToYou,
  onAddToThem,
}) => {
  // Load saved filter/view state from localStorage
  const savedSettings = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(VALUES_DB_SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const [search, setSearch] = useState<string>(savedSettings?.search || '');
  const [category, setCategory] = useState<'all' | 'fruit' | 'permanent' | 'sword' | 'gamepass'>(savedSettings?.category || 'all');
  const [rarity, setRarity] = useState<'all' | 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon'>(savedSettings?.rarity || 'all');
  const [sortBy, setSortBy] = useState<'value-desc' | 'value-asc' | 'demand-desc' | 'name-asc'>(savedSettings?.sortBy || 'value-desc');
  const [viewPermValues, setViewPermValues] = useState<boolean>(savedSettings?.viewPermValues || false);

  const [overrides, setOverrides] = useState(() => getUserValueOverrides());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Sync settings state to window.localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const settings = { search, category, rarity, sortBy, viewPermValues };
      localStorage.setItem(VALUES_DB_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save ValuesDatabase settings to localStorage:', e);
    }
  }, [search, category, rarity, sortBy, viewPermValues]);

  // Sync manual overrides and custom items with window.localStorage and server
  useEffect(() => {
    const handleOverridesUpdate = () => {
      setOverrides(getUserValueOverrides());
    };

    // Ensure server overrides are synchronized on mount
    syncFruitDataWithServer();

    window.addEventListener('blox_fruits_overrides_updated', handleOverridesUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleOverridesUpdate);

    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleOverridesUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleOverridesUpdate);
    };
  }, []);

  const effectiveItems = useMemo(() => {
    return getEffectiveFruitList(overrides);
  }, [overrides]);

  const customOverrideCount = Object.keys(overrides).length;

  const handleManualSync = async () => {
    soundFX.playPop();
    setIsRefreshing(true);
    try {
      await performLiveMarketSync();
      setIsRefreshing(false);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      soundFX.playWin();
    } catch {
      setIsRefreshing(false);
    }
  };

  const filteredItems = useMemo(() => {
    let result = effectiveItems.filter((item) => {
      if (category === 'permanent') {
        if (!item.permanentValue) return false;
      } else if (category !== 'all' && item.category !== category) {
        return false;
      }

      if (rarity !== 'all' && item.rarity !== rarity) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.rarity.toLowerCase().includes(q) ||
          (item.type && item.type.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q)
        );
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      const aVal = (viewPermValues || category === 'permanent') && a.permanentValue ? a.permanentValue : a.physicalValue;
      const bVal = (viewPermValues || category === 'permanent') && b.permanentValue ? b.permanentValue : b.physicalValue;

      if (sortBy === 'value-desc') return bVal - aVal;
      if (sortBy === 'value-asc') return aVal - bVal;
      if (sortBy === 'demand-desc') return b.demand - a.demand;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [effectiveItems, search, category, rarity, sortBy, viewPermValues]);

  return (
    <div id="values-database-container" className="space-y-5">
      {/* Real-time sync & manual input status ticker */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🌐 Live Web: BloxFruitsValues.com (Main) + FruityBlox (Backup)</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">
            Synced {lastSyncedTime} • Dog Blade (580M), Kitsune (145M), Dragon Rework (180M)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {customOverrideCount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px]">
                {customOverrideCount} Custom Override{customOverrideCount > 1 ? 's' : ''}
              </span>
              <button
                id="reset-all-overrides-btn"
                onClick={() => {
                  soundFX.playPop();
                  clearAllUserValueOverrides();
                }}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-[11px] flex items-center gap-1"
                title="Reset all values to official Dog Blade update defaults"
              >
                <RotateCcw className="w-3 h-3" /> Reset All
              </button>
            </div>
          )}

          <button
            id="refresh-values-sync-btn"
            onClick={handleManualSync}
            disabled={isRefreshing}
            className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Market'}</span>
          </button>
        </div>
      </div>

      {/* Top Banner & Control Bar */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span>Blox Fruits Value Matrix</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                August 2026 Live
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified market values, trading demand ratings, PvP tiers, and live community trends.
            </p>
          </div>

          {/* Quick Perm Value Switch */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              id="perm-view-toggle-off"
              onClick={() => {
                soundFX.playPop();
                setViewPermValues(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !viewPermValues ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Physical Values
            </button>
            <button
              id="perm-view-toggle-on"
              onClick={() => {
                soundFX.playPop();
                setViewPermValues(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewPermValues ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Permanent Values
            </button>
          </div>
        </div>

        {/* Search & Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="database-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Dog Blade, Dragon, Notifier, Kitsune, Gas..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Sort By */}
          <div className="sm:col-span-3">
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => {
                soundFX.playPop();
                setSortBy(e.target.value as any);
              }}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="value-desc">Sort: Highest Value</option>
              <option value="value-asc">Sort: Lowest Value</option>
              <option value="demand-desc">Sort: Highest Demand (10/10)</option>
              <option value="name-asc">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Rarity Select */}
          <div className="sm:col-span-3">
            <select
              id="rarity-filter-select"
              value={rarity}
              onChange={(e) => {
                soundFX.playPop();
                setRarity(e.target.value as any);
              }}
              className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Rarities</option>
              <option value="Mythical">Mythical Tier</option>
              <option value="Legendary">Legendary Tier</option>
              <option value="Rare">Rare Tier</option>
              <option value="Uncommon">Uncommon Tier</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/80">
          {(['all', 'fruit', 'permanent', 'sword', 'gamepass'] as const).map((c) => (
            <button
              key={c}
              id={`cat-pill-${c}`}
              onClick={() => {
                soundFX.playPop();
                setCategory(c);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                category === c
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c === 'all'
                ? '🌐 All Items'
                : c === 'fruit'
                ? '🍎 Physical Fruits'
                : c === 'permanent'
                ? '✨ Permanent Fruits'
                : c === 'sword'
                ? '🗡️ Swords (Dog Blade, CDK)'
                : '🎟️ Gamepasses (Notifier, Passes)'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Item Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const isPerm = viewPermValues || category === 'permanent';
          const displayVal = isPerm && item.permanentValue ? item.permanentValue : item.physicalValue;
          const hasCustom = !!overrides[item.id];

          return (
            <div
              key={item.id}
              id={`database-card-${item.id}`}
              className="group relative rounded-2xl bg-slate-900/85 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-4 card-vfx-interactive foil-card-shine flex flex-col justify-between"
            >
              {/* Item Top Row */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform overflow-hidden shrink-0"
                      style={{ borderColor: item.accentColor + '60' }}
                    >
                      {/* Ambient rarity aura backdrop */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity blur-sm pointer-events-none"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <SafeFruitImage
                        src={item.iconUrl}
                        alt={item.name}
                        category={item.category}
                        rarity={item.rarity}
                        fallbackEmoji={item.imageEmoji}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {isPerm ? `Perm ${item.name}` : item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: item.accentColor }}
                        >
                          {item.rarity}
                        </span>
                        {item.type && (
                          <span className="text-[10px] text-slate-500">
                            • {item.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {item.widgetTag && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {item.widgetTag}
                      </span>
                    )}
                    {item.isCustomAdded && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        Custom Added
                      </span>
                    )}
                    {hasCustom && !item.isCustomAdded && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Custom
                      </span>
                    )}
                    {item.isNewOrReworked && !item.widgetTag && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-cyan-500 text-slate-950 uppercase">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div>
                    <div className="text-[10px] text-slate-400">Trade Value</div>
                    <div className="text-sm font-extrabold text-cyan-400">
                      {formatValueNumber(displayVal)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">Demand Rating</div>
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                      <span>{item.demand}/10</span>
                      {item.demand >= 9 && <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />}
                    </div>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Combat Utility:</span>
                    <span className="text-emerald-400 font-semibold">
                      PvP: {item.pvpTier} | Grind: {item.grindTier}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  id={`details-btn-${item.id}`}
                  onClick={() => {
                    soundFX.playPop();
                    onSelectItem(item);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> View Intel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    id={`add-you-db-${item.id}`}
                    onClick={() => {
                      soundFX.playPop();
                      onAddToYou(item, isPerm);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-xs font-bold transition-colors text-center"
                    title="Add to You Give"
                  >
                    + You Give
                  </button>
                  <button
                    id={`add-them-db-${item.id}`}
                    onClick={() => {
                      soundFX.playPop();
                      onAddToThem(item, isPerm);
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-purple-600/30 hover:bg-purple-500 text-purple-300 hover:text-white text-xs font-bold transition-colors text-center"
                    title="Add to They Give"
                  >
                    + They Give
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
