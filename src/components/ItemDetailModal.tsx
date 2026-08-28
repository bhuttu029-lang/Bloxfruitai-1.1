import React, { useState } from 'react';
import { FruitItem, formatValueNumber } from '../data/bloxFruitsData';
import { X, Sparkles, Shield, Swords, Plus, TrendingUp, AlertTriangle, Flame, BookOpen, ChevronRight } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { ALL_OBTAINMENT_DATA } from '../data/bloxObtainmentData';
import { SafeFruitImage } from './SafeFruitImage';

interface ItemDetailModalProps {
  item: FruitItem | null;
  onClose: () => void;
  onAddToYou: (item: FruitItem, isPerm: boolean) => void;
  onAddToThem: (item: FruitItem, isPerm: boolean) => void;
  onItemUpdated?: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToYou,
  onAddToThem,
  onItemUpdated,
}) => {
  const [isPerm, setIsPerm] = useState<boolean>(false);

  if (!item) return null;

  const currentVal = isPerm && item.permanentValue ? item.permanentValue : item.physicalValue;

  // Check if there is an obtainment guide for this item
  const obtainmentGuide = ALL_OBTAINMENT_DATA.find(
    (g) => g.id === item.id || g.name.toLowerCase() === item.name.toLowerCase()
  );

  return (
    <>
      <div
        id="item-detail-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        <div
          id="item-detail-modal-card"
          className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-950/50 text-slate-100 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Top Glow */}
          <div
            className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: item.accentColor }}
          />

          {/* Close Button */}
          <button
            id="close-item-detail-btn"
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Emoji & Name */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border border-slate-700 bg-slate-800/90 shadow-inner relative overflow-hidden shrink-0"
              style={{ borderColor: item.accentColor + '80' }}
            >
              <SafeFruitImage
                src={item.iconUrl}
                alt={item.name}
                category={item.category}
                rarity={item.rarity}
                fallbackEmoji={item.imageEmoji}
                className="w-12 h-12 object-contain"
              />
              {item.isNewOrReworked && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-wide">{item.name}</h3>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: item.accentColor + '25',
                    color: item.accentColor,
                    border: `1px solid ${item.accentColor}50`,
                  }}
                >
                  {item.rarity}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 capitalize">
                {item.type ? `${item.type} Type • ` : ''}
                {item.category === 'sword' ? 'Melee Weapon' : item.category === 'gamepass' ? 'Special Gamepass' : 'Devil Fruit'}
              </p>
            </div>
          </div>

          {/* Permanent Toggle (if applicable) */}
          {item.permanentValue && (
            <div className="flex items-center justify-between p-2.5 mb-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Trading Mode:
              </span>
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  id="toggle-physical-btn"
                  type="button"
                  onClick={() => {
                    soundFX.playPop();
                    setIsPerm(false);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    !isPerm ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Physical
                </button>
                <button
                  id="toggle-perm-btn"
                  type="button"
                  onClick={() => {
                    soundFX.playPop();
                    setIsPerm(true);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    isPerm ? 'bg-amber-400 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Permanent
                </button>
              </div>
            </div>
          )}

          {/* Primary Value & Demand Matrix */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center relative group/val">
              <div className="text-[11px] text-slate-400 font-medium">Trade Value</div>
              <div className="text-lg font-black text-cyan-400 tracking-tight mt-0.5">
                {formatValueNumber(currentVal)}
              </div>
              <div className="text-[10px] text-slate-500">{currentVal.toLocaleString()} Beli</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-medium">Market Demand</div>
              <div className="text-lg font-black text-amber-400 tracking-tight mt-0.5 flex items-center justify-center gap-1">
                <span>{item.demand}/10</span>
                {item.demand >= 9 && <Flame className="w-4 h-4 text-orange-500 fill-orange-500 inline" />}
              </div>
              <div className="text-[10px] text-slate-500 capitalize">{item.trend} Velocity</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 font-medium">Combat Tier</div>
              <div className="text-lg font-black text-emerald-400 tracking-tight mt-0.5 flex items-center justify-center gap-1.5">
                <span title="PvP Tier">⚔️ {item.pvpTier}</span>
                <span className="text-slate-600">|</span>
                <span title="Grind Tier">🌾 {item.grindTier}</span>
              </div>
              <div className="text-[10px] text-slate-500">PvP / Grind</div>
            </div>
          </div>

          {/* Description & Lore */}
          <div className="mb-4 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
            <p>{item.description}</p>
          </div>

          {/* Obtainment Guide Section (if available) */}
          {obtainmentGuide && (
            <div className="mb-4 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <BookOpen className="w-4 h-4" />
                <span>How to Obtain:</span>
              </div>
              <div className="space-y-1 text-slate-300 pl-1 text-[11px] leading-relaxed">
                {obtainmentGuide.obtainmentSteps.slice(0, 3).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Update Note Banner */}
          {item.updateNote && (
            <div className="mb-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-cyan-300">Market Note: </span>
                {item.updateNote}
              </div>
            </div>
          )}

          {/* Actions: Add to You / Add to Them */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id={`add-to-you-${item.id}`}
              onClick={() => {
                soundFX.playPop();
                onAddToYou(item, isPerm);
                onClose();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-900/30 hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add to You Give
            </button>
            <button
              id={`add-to-them-${item.id}`}
              onClick={() => {
                soundFX.playPop();
                onAddToThem(item, isPerm);
                onClose();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-900/30 hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add to They Give
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
