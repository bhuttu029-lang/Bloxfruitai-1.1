import React, { useState, useMemo, useEffect } from 'react';
import { FruitItem, getEffectiveFruitList, getUserValueOverrides, formatValueNumber } from '../data/bloxFruitsData';
import { X, Search, Sparkles, Filter, Swords, Gift, Flame } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { SafeFruitImage } from './SafeFruitImage';

interface ItemSelectorModalProps {
  isOpen: boolean;
  targetSide: 'you' | 'them';
  onClose: () => void;
  onSelect: (item: FruitItem, isPermanent: boolean) => void;
}

export const ItemSelectorModal: React.FC<ItemSelectorModalProps> = ({
  isOpen,
  targetSide,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fruit' | 'sword' | 'gamepass'>('all');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'Mythical' | 'Legendary' | 'Rare'>('all');
  const [isPermanentMode, setIsPermanentMode] = useState<boolean>(false);
  const [dataVersion, setDataVersion] = useState<number>(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener('blox_fruits_custom_data_updated', handleUpdate);
    window.addEventListener('blox_fruits_overrides_updated', handleUpdate);
    return () => {
      window.removeEventListener('blox_fruits_custom_data_updated', handleUpdate);
      window.removeEventListener('blox_fruits_overrides_updated', handleUpdate);
    };
  }, []);

  const effectiveItems = useMemo(() => {
    return getEffectiveFruitList();
  }, [isOpen, dataVersion]);

  const filteredItems = useMemo(() => {
    return effectiveItems.filter((item) => {
      // If in permanent mode, only show items with permanentValue
      if (isPermanentMode && !item.permanentValue) {
        return false;
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedRarity !== 'all' && item.rarity !== selectedRarity) {
        return false;
      }

      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.rarity.toLowerCase().includes(query) ||
          (item.type && item.type.toLowerCase().includes(query)) ||
          item.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [effectiveItems, search, selectedCategory, selectedRarity, isPermanentMode]);

  if (!isOpen) return null;

  return (
    <div
      id="item-selector-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="item-selector-modal"
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                Select Item for <span className={targetSide === 'you' ? 'text-cyan-400 font-extrabold' : 'text-purple-400 font-extrabold'}>
                  {targetSide === 'you' ? 'Your Offer' : "Their Offer"}
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose from fruits, swords (Dog Blade), and gamepasses with latest August 2026 values.
            </p>
          </div>

          <button
            id="close-selector-btn"
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls & Filters */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 space-y-3">
          {/* Search bar & Perm toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="item-selector-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fruits, Dog Blade, CDK, Dragon..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mode Switch: Physical vs Permanent */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
              <button
                id="selector-physical-mode-btn"
                type="button"
                onClick={() => {
                  soundFX.playPop();
                  setIsPermanentMode(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !isPermanentMode ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Physical Fruits
              </button>
              <button
                id="selector-perm-mode-btn"
                type="button"
                onClick={() => {
                  soundFX.playPop();
                  setIsPermanentMode(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  isPermanentMode ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Permanent Fruits
              </button>
            </div>
          </div>

          {/* Category & Rarity Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1 self-center mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['all', 'fruit', 'sword', 'gamepass'] as const).map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-300 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Types' : cat === 'fruit' ? 'Fruits' : cat === 'sword' ? 'Swords' : 'Gamepasses'}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-800 self-center mx-1 hidden sm:block" />

            {(['all', 'Mythical', 'Legendary', 'Rare'] as const).map((rar) => (
              <button
                key={rar}
                id={`filter-rarity-${rar}`}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedRarity(rar);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedRarity === rar
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-300 border border-slate-800'
                }`}
              >
                {rar === 'all' ? 'All Rarities' : rar}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[55vh]">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-sm">No items found matching your filters.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                  setSelectedRarity('all');
                  setIsPermanentMode(false);
                }}
                className="mt-2 text-xs text-cyan-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const val = isPermanentMode && item.permanentValue ? item.permanentValue : item.physicalValue;
              return (
                <button
                  key={item.id}
                  id={`select-item-card-${item.id}`}
                  onClick={() => {
                    soundFX.playPop();
                    onSelect(item, isPermanentMode);
                    onClose();
                  }}
                  className="group relative flex flex-col p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/60 hover:bg-slate-800/40 text-left transition-all hover:scale-[1.02] active:scale-95 shadow-sm overflow-hidden"
                >
                  {/* Highlight tag for new/dog blade */}
                  {item.isNewOrReworked && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 uppercase">
                      Update
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl bg-slate-900 border border-slate-800 shrink-0 overflow-hidden group-hover:scale-110 transition-transform">
                      <SafeFruitImage
                        src={item.iconUrl}
                        alt={item.name}
                        category={item.category}
                        rarity={item.rarity}
                        fallbackEmoji={item.imageEmoji}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-200 truncate group-hover:text-white">
                        {isPermanentMode ? `Perm ${item.name}` : item.name}
                      </div>
                      <div
                        className="text-[10px] font-medium"
                        style={{ color: item.accentColor }}
                      >
                        {item.rarity}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-cyan-400">
                      {formatValueNumber(val)}
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-0.5">
                      ★ {item.demand}/10
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
          Showing <span className="text-slate-300 font-bold">{filteredItems.length}</span> items • Click any item to instantly add to {targetSide === 'you' ? 'Your' : 'Their'} trade window.
        </div>
      </div>
    </div>
  );
};
