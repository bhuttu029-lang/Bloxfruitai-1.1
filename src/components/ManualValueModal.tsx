import React, { useState, useEffect } from 'react';
import { FruitItem, formatValueNumber, saveUserValueOverride, removeUserValueOverride } from '../data/bloxFruitsData';
import { X, Edit3, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { SafeFruitImage } from './SafeFruitImage';

interface ManualValueModalProps {
  item: FruitItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  hasCustomOverride?: boolean;
}

export const ManualValueModal: React.FC<ManualValueModalProps> = ({
  item,
  isOpen,
  onClose,
  onSaved,
  hasCustomOverride,
}) => {
  const [physicalVal, setPhysicalVal] = useState<string>('');
  const [permanentVal, setPermanentVal] = useState<string>('');
  const [demand, setDemand] = useState<number>(10);
  const [iconUrl, setIconUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (item && isOpen) {
      setPhysicalVal(item.physicalValue.toString());
      setPermanentVal(item.permanentValue ? item.permanentValue.toString() : '');
      setDemand(item.demand || 10);
      setIconUrl(item.iconUrl || '');
      setNotes(item.updateNote || '');
      setError('');
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const physNum = Number(physicalVal);
    if (isNaN(physNum) || physNum < 0) {
      setError('Please enter a valid positive number for physical value.');
      return;
    }

    const permNum = permanentVal.trim() ? Number(permanentVal) : undefined;
    if (permNum !== undefined && (isNaN(permNum) || permNum < 0)) {
      setError('Please enter a valid positive number for permanent value.');
      return;
    }

    saveUserValueOverride({
      itemId: item.id,
      customPhysicalValue: physNum,
      customPermanentValue: permNum,
      customDemand: demand,
      customIconUrl: iconUrl.trim() || undefined,
      customNotes: notes.trim() || undefined,
      updatedAt: new Date().toISOString()
    });

    soundFX.playWin();
    onSaved();
    onClose();
  };

  const handleResetToOfficial = () => {
    soundFX.playPop();
    removeUserValueOverride(item.id);
    onSaved();
    onClose();
  };

  const applyPresetMultiplier = (multiplier: number) => {
    soundFX.playPop();
    const current = Number(physicalVal) || item.physicalValue;
    setPhysicalVal(Math.round(current * multiplier).toString());
  };

  const setDirectPreset = (val: number) => {
    soundFX.playPop();
    setPhysicalVal(val.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 overflow-hidden space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-950 border border-slate-800 shrink-0 overflow-hidden"
              style={{ borderColor: item.accentColor }}
            >
              {item.iconUrl ? (
                <SafeFruitImage
                  src={item.iconUrl}
                  alt={item.name}
                  category={item.category}
                  rarity={item.rarity}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span>{item.imageEmoji}</span>
              )}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Manual Value Override</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.name}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Input custom pricing if automatic updates are unavailable.
              </p>
            </div>
          </div>

          <button
            id="close-manual-modal-btn"
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Physical Value Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Custom Physical / Trade Value (Beli Points)
              </label>
              <span className="text-xs font-extrabold text-cyan-400">
                Preview: {formatValueNumber(Number(physicalVal) || 0)}
              </span>
            </div>
            <input
              id="manual-physical-val-input"
              type="number"
              value={physicalVal}
              onChange={(e) => setPhysicalVal(e.target.value)}
              placeholder="e.g. 3500000000"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
              required
            />
            {/* Quick shortcuts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 self-center">Presets:</span>
              <button
                type="button"
                onClick={() => setDirectPreset(6000000000)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
              >
                6.0B (Notifier)
              </button>
              <button
                type="button"
                onClick={() => setDirectPreset(3500000000)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-red-300 border border-slate-700"
              >
                3.5B (Dragon West)
              </button>
              <button
                type="button"
                onClick={() => setDirectPreset(3000000000)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-orange-300 border border-slate-700"
              >
                3.0B (Dragon East)
              </button>
              <button
                type="button"
                onClick={() => setDirectPreset(580000000)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
              >
                580M (Dog Blade)
              </button>
              <button
                type="button"
                onClick={() => applyPresetMultiplier(1.1)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                +10%
              </button>
              <button
                type="button"
                onClick={() => applyPresetMultiplier(0.9)}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                -10%
              </button>
            </div>
          </div>

          {/* Permanent Value Input (if applicable) */}
          {item.permanentValue !== undefined && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Custom Permanent Value (Optional)
                </label>
                <span className="text-xs font-extrabold text-amber-400">
                  Preview: {formatValueNumber(Number(permanentVal) || 0)}
                </span>
              </div>
              <input
                id="manual-permanent-val-input"
                type="number"
                value={permanentVal}
                onChange={(e) => setPermanentVal(e.target.value)}
                placeholder="e.g. 9500000000"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Demand Rating Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Custom Demand Rating: <span className="text-amber-400 font-extrabold">{demand}/10</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {demand >= 9 ? '🔥 Extreme' : demand >= 7 ? '⚡ High' : demand >= 5 ? '⚖️ Moderate' : '🧊 Low'}
              </span>
            </div>
            <input
              id="manual-demand-slider"
              type="range"
              min="1"
              max="10"
              value={demand}
              onChange={(e) => setDemand(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Custom Image URL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>Custom Image URL (Stored at Firebase)</span>
              </label>
              {iconUrl && (
                <span className="text-[10px] text-cyan-400 font-semibold">
                  Live Preview Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                id="manual-icon-url-input"
                type="url"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://static.wikia.nocookie.net/bloxfruits/images/..."
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-700 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                <SafeFruitImage
                  src={iconUrl || item.iconUrl}
                  alt={item.name}
                  category={item.category}
                  rarity={item.rarity}
                  fallbackInitial={item.name.charAt(0)}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Custom Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Custom Market Note / Trade Reason
            </label>
            <input
              id="manual-note-input"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Trading floor price after Dog Blade hype surge"
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
            {hasCustomOverride && (
              <button
                id="reset-manual-override-btn"
                type="button"
                onClick={handleResetToOfficial}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Official
              </button>
            )}

            <button
              id="save-manual-override-btn"
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Custom Override
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
