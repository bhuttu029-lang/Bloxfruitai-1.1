import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Compass, 
  Layers, 
  Target, 
  Search, 
  SlidersHorizontal, 
  Calculator, 
  ChevronRight, 
  ShieldCheck, 
  Flame, 
  Clock, 
  MapPin, 
  HelpCircle, 
  Award,
  Zap,
  RefreshCw,
  Copy,
  Check,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { getEffectiveFruitList, FruitItem, formatValueNumber } from '../data/bloxFruitsData';
import { PRESET_LADDERS, TRADING_HOTSPOTS_TIPS, PresetLadderJourney, LadderStep } from '../data/tradeLadderData';
import { SafeFruitImage } from './SafeFruitImage';

interface TradeLadderNavigatorProps {
  onSendToCalculator?: (giveFruits: string[], receiveFruits: string[]) => void;
  onAskSensei?: (query: string) => void;
}

export const TradeLadderNavigator: React.FC<TradeLadderNavigatorProps> = ({
  onSendToCalculator,
  onAskSensei
}) => {
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(PRESET_LADDERS[0].id);
  const [activeTabMode, setActiveTabMode] = useState<'presets' | 'custom' | 'hotspots'>('presets');
  
  // Progress tracker for active preset
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('blox_trade_ladder_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom Route Builder State
  const [customStartFruits, setCustomStartFruits] = useState<string[]>(['portal', 'sound']);
  const [customTargetFruitId, setCustomTargetFruitId] = useState<string>('kitsune');
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedJourney = useMemo(() => {
    return PRESET_LADDERS.find(j => j.id === selectedJourneyId) || PRESET_LADDERS[0];
  }, [selectedJourneyId]);

  const currentJourneyCompletedSteps = completedSteps[selectedJourney.id] || [];

  const handleToggleStep = (stepNumber: number) => {
    soundFX.playSuccess();
    setCompletedSteps(prev => {
      const currentList = prev[selectedJourney.id] || [];
      const updated = currentList.includes(stepNumber)
        ? currentList.filter(s => s !== stepNumber)
        : [...currentList, stepNumber];
      
      const newMap = { ...prev, [selectedJourney.id]: updated };
      try {
        localStorage.setItem('blox_trade_ladder_progress', JSON.stringify(newMap));
      } catch {}
      return newMap;
    });
  };

  const handleResetProgress = (journeyId: string) => {
    soundFX.playPop();
    setCompletedSteps(prev => {
      const newMap = { ...prev, [journeyId]: [] };
      try {
        localStorage.setItem('blox_trade_ladder_progress', JSON.stringify(newMap));
      } catch {}
      return newMap;
    });
  };

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

  // Helper to find fruit details
  const getFruit = (id: string): FruitItem | undefined => {
    return effectiveFruits.find(f => f.id.toLowerCase() === id.toLowerCase());
  };

  // Generate dynamic custom path based on customStartFruits & customTargetFruitId
  const customGeneratedSteps = useMemo<LadderStep[]>(() => {
    const targetFruit = getFruit(customTargetFruitId) || effectiveFruits.find(f => f.id === 'kitsune') || effectiveFruits[0];
    
    // Estimate total start value
    let startVal = 0;
    customStartFruits.forEach(fid => {
      const f = getFruit(fid);
      if (f) startVal += f.physicalValue;
    });

    const targetVal = targetFruit.physicalValue;
    const ratio = startVal > 0 ? targetVal / startVal : 10;

    const dynamicSteps: LadderStep[] = [];

    if (ratio <= 1.2) {
      dynamicSteps.push({
        stepNumber: 1,
        title: `Direct Value Trade ➔ ${targetFruit.name}`,
        giveItems: customStartFruits,
        receiveItems: [targetFruit.id],
        profitEstimate: 'Fair / +10%',
        difficulty: 'Easy',
        strategyTip: `Your offered fruits total approximately ~$${(startVal / 1000000).toFixed(1)}M, which is close to ${targetFruit.name}'s value (~$${(targetVal / 1000000).toFixed(1)}M). Post in Second or Third Sea to find an immediate trade partner.`,
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '30 - 60 mins',
        whyItWorks: 'Direct parity trade with comparable demand.'
      });
    } else {
      dynamicSteps.push({
        stepNumber: 1,
        title: 'Step 1: Convert Inventory to Universal High-Demand Staples',
        giveItems: customStartFruits,
        receiveItems: ['buddha', 'portal'],
        profitEstimate: '+$5M Demand Surge',
        difficulty: 'Medium',
        strategyTip: 'Always convert miscellaneous fruits into Buddha and Portal first. Buddha has 10/10 demand from grinding players.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '1 - 2 hours',
        whyItWorks: 'Buddha and Portal act like liquid cash in Blox Fruits trading.'
      });

      if (targetVal >= 40000000) {
        dynamicSteps.push({
          stepNumber: 2,
          title: 'Step 2: Consolidate into Mid-Tier Mythicals (Spirit / Venom / Mammoth)',
          giveItems: ['buddha', 'portal', 'blizzard'],
          receiveItems: ['spirit', 'venom'],
          profitEstimate: '+$12M Value',
          difficulty: 'Medium',
          strategyTip: 'Trade Buddha + adds to Sea 2 players who need Buddha to farm mastery. Collect Spirit or Mammoth.',
          recommendedLocation: 'Third Sea Turtle Mansion',
          timeEstimate: '2 - 4 hours',
          whyItWorks: 'Mythicals allow you to build dense bundles for endgame fruits.'
        });

        dynamicSteps.push({
          stepNumber: 3,
          title: 'Step 3: Bundle for Dough (The Awakening Staple)',
          giveItems: ['spirit', 'venom'],
          receiveItems: ['dough'],
          profitEstimate: '+$18M Value',
          difficulty: 'Hard',
          strategyTip: '2 solid mid mythicals equals 1 Dough. Dough is universally accepted by all Leopard and Kitsune owners.',
          recommendedLocation: 'Discord Trading / Reddit',
          timeEstimate: '4 - 8 hours',
          whyItWorks: 'Dough V2 PvP demand makes it an impenetrable store of value.'
        });
      }

      if (targetVal >= 90000000) {
        dynamicSteps.push({
          stepNumber: 4,
          title: 'Step 4: Dough + T-Rex / Adds ➔ Leopard',
          giveItems: ['dough', 't-rex'],
          receiveItems: ['leopard'],
          profitEstimate: '+$25M Value',
          difficulty: 'Hard',
          strategyTip: 'Combine Dough with another high tier fruit like T-Rex. Leopard is the gatekeeper to Kitsune / Dragon.',
          recommendedLocation: 'Third Sea Turtle Mansion',
          timeEstimate: '1 - 2 days',
          whyItWorks: 'Leopard is mandatory for high-end mythical deals.'
        });
      }

      dynamicSteps.push({
        stepNumber: dynamicSteps.length + 1,
        title: `Final Milestone ➔ Acquire ${targetFruit.name}! ${targetFruit.imageEmoji}`,
        giveItems: targetVal > 80000000 ? ['leopard', 'dough', 't-rex', 'buddha'] : ['spirit', 'buddha', 'portal'],
        receiveItems: [targetFruit.id],
        profitEstimate: '+$35M Value Goal Met',
        difficulty: 'Extreme',
        strategyTip: `Post your exact bundle on Discord: "[H] Your Bundle [W] ${targetFruit.name}". Ensure in-game 40% Beli difference rule is met with balance adds.`,
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '1 - 3 days',
        whyItWorks: 'Comprehensive 4-slot bundle provides maximum liquidity to the seller.'
      });
    }

    return dynamicSteps;
  }, [customStartFruits, customTargetFruitId]);

  const progressPercent = Math.round((currentJourneyCompletedSteps.length / selectedJourney.steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl shadow-indigo-950/60">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-black uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Trade Ladder & Profit Path Navigator</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Zero to Kitsune Roadmap 🪜
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Step-by-step algorithmic trade flipping paths. Learn how to transform starter drops into Mythicals like <span className="text-amber-300 font-bold">Kitsune, Dragon, and Perm Portal</span> without spending Robux.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                soundFX.playPop();
                setActiveTabMode('presets');
              }}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeTabMode === 'presets'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/60 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Preset Journeys</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setActiveTabMode('custom');
              }}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeTabMode === 'custom'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/60 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Custom Route</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setActiveTabMode('hotspots');
              }}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                activeTabMode === 'hotspots'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/60 border border-indigo-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Trade Hotspots</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: PRESET JOURNEYS */}
      {activeTabMode === 'presets' && (
        <div className="space-y-6">
          {/* Preset Cards Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRESET_LADDERS.map((journey) => {
              const isSelected = journey.id === selectedJourneyId;
              const journeyDoneCount = (completedSteps[journey.id] || []).length;
              const pct = Math.round((journeyDoneCount / journey.steps.length) * 100);

              return (
                <button
                  key={journey.id}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedJourneyId(journey.id);
                  }}
                  className={`relative p-5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-950/60 -translate-y-1'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                        {journey.badge}
                      </span>
                      <span className="text-2xl">{journey.targetEmoji}</span>
                    </div>

                    <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2">
                      {journey.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                      {journey.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{journey.steps.length} Steps</span>
                      <span className="text-cyan-300 font-bold">{journey.estimatedHours}</span>
                    </div>

                    {/* Mini progress bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 bg-gradient-to-r ${journey.accentColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Progress</span>
                      <span className="text-slate-300 font-bold">{pct}% ({journeyDoneCount}/{journey.steps.length})</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Preset Header & Overall Progress Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedJourney.targetEmoji}</span>
                  <h2 className="text-xl md:text-2xl font-black text-white">
                    {selectedJourney.title}
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-slate-300">
                  {selectedJourney.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleResetProgress(selectedJourney.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
                  title="Reset completed checkmarks for this journey"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset Tracker</span>
                </button>

                {onAskSensei && (
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onAskSensei(`Help me with trading strategy for the "${selectedJourney.title}" path in Blox Fruits.`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Advice</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Journey Completion</span>
                <span className="text-cyan-400">{progressPercent}% ({currentJourneyCompletedSteps.length} of {selectedJourney.steps.length} Steps Done)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${selectedJourney.accentColor} shadow-lg shadow-indigo-500/50`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Ladder Steps Timeline */}
          <div className="space-y-4">
            {selectedJourney.steps.map((step) => {
              const isCompleted = currentJourneyCompletedSteps.includes(step.stepNumber);

              // Live DB Value calculations
              const giveValSum = step.giveItems.reduce((acc, fid) => {
                const item = getFruit(fid);
                return acc + (item ? item.physicalValue : 0);
              }, 0);

              const receiveValSum = step.receiveItems.reduce((acc, fid) => {
                const item = getFruit(fid);
                return acc + (item ? item.physicalValue : 0);
              }, 0);

              const liveMargin = receiveValSum - giveValSum;

              return (
                <div
                  key={step.stepNumber}
                  className={`relative p-5 md:p-6 rounded-2xl transition-all border backdrop-blur-xl ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-90 shadow-md shadow-emerald-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-xl'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                    {/* Step Title & Checkbox */}
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => handleToggleStep(step.stepNumber)}
                        className={`mt-1 w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/40'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-indigo-400 hover:text-white'
                        }`}
                        title={isCompleted ? 'Mark step as incomplete' : 'Mark step as completed'}
                      >
                        {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-black">{step.stepNumber}</span>}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-black px-2 py-0.5 rounded-lg border ${
                            step.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                            step.difficulty === 'Medium' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                            step.difficulty === 'Hard' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                            'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}>
                            {step.difficulty}
                          </span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                            {step.profitEstimate}
                          </span>
                          {giveValSum > 0 && receiveValSum > 0 && (
                            <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                              DB Live: {formatValueNumber(giveValSum)} ➔ {formatValueNumber(receiveValSum)} ({liveMargin >= 0 ? '+' : ''}{formatValueNumber(liveMargin)})
                            </span>
                          )}
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {step.timeEstimate}
                          </span>
                        </div>

                        <h3 className={`text-lg font-black ${isCompleted ? 'text-emerald-200 line-through' : 'text-white'}`}>
                          {step.title}
                        </h3>

                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
                          💡 <strong className="text-amber-300">Haggling Tip:</strong> {step.strategyTip}
                        </p>
                      </div>
                    </div>

                    {/* Trade Card Box (Give ➔ Receive) */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                      {/* Give side */}
                      <div className="flex items-center gap-1.5 flex-wrap justify-center">
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider mr-1">You Give:</span>
                        {step.giveItems.map((fid, idx) => {
                          const item = getFruit(fid);
                          return (
                            <div
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                            >
                              <SafeFruitImage
                                src={item?.iconUrl}
                                alt={item?.name || fid}
                                category={item?.category}
                                rarity={item?.rarity}
                                fallbackEmoji={item?.imageEmoji || '🍎'}
                                className="w-4 h-4 object-contain"
                              />
                              <span>{item?.name || fid}</span>
                            </div>
                          );
                        })}
                      </div>

                      <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />

                      {/* Receive side */}
                      <div className="flex items-center gap-1.5 flex-wrap justify-center">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mr-1">You Get:</span>
                        {step.receiveItems.map((fid, idx) => {
                          const item = getFruit(fid);
                          return (
                            <div
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-bold text-emerald-200 flex items-center gap-1.5 shadow-sm"
                            >
                              <SafeFruitImage
                                src={item?.iconUrl}
                                alt={item?.name || fid}
                                category={item?.category}
                                rarity={item?.rarity}
                                fallbackEmoji={item?.imageEmoji || '✨'}
                                className="w-4 h-4 object-contain"
                              />
                              <span>{item?.name || fid}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Test in Calculator Button */}
                      {onSendToCalculator && (
                        <button
                          onClick={() => {
                            soundFX.playPop();
                            onSendToCalculator(step.giveItems, step.receiveItems);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all border border-indigo-400/40 flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer ml-auto sm:ml-2"
                          title="Open this trade inside the Trade Calculator"
                        >
                          <Calculator className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Test Calc</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footnote on where to find trade */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      Recommended Hub: <strong className="text-slate-200">{step.recommendedLocation}</strong>
                    </span>
                    <span className="text-slate-500">
                      Why: {step.whyItWorks}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: CUSTOM PROFIT ROUTE BUILDER */}
      {activeTabMode === 'custom' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <span>Custom Profit Route Generator</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Select the fruit(s) you currently own, choose your dream target fruit, and generate a customized trade sequence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Starting Bag */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <label className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. Your Starting Inventory (What you own)</span>
                </label>

                {/* Selected starting chips */}
                <div className="flex flex-wrap gap-2 min-h-[42px] p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {customStartFruits.map((fid, idx) => {
                    const f = getFruit(fid);
                    return (
                      <span
                        key={`${fid}-${idx}`}
                        className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-500/50 text-xs font-bold text-indigo-200 flex items-center gap-1.5"
                      >
                        <span>{f?.imageEmoji || '🍎'}</span>
                        <span>{f?.name || fid}</span>
                        <button
                          onClick={() => {
                            soundFX.playPop();
                            setCustomStartFruits(prev => prev.filter(x => x !== fid));
                          }}
                          className="hover:text-red-400 ml-1 text-slate-400 font-black"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                  {customStartFruits.length === 0 && (
                    <span className="text-xs text-slate-500 italic p-1">No fruits selected. Pick below.</span>
                  )}
                </div>

                {/* Quick Add Buttons */}
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 font-bold">Add starting fruit:</div>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 custom-scrollbar">
                    {effectiveFruits.filter(f => f.category === 'fruit').map(fruit => (
                      <button
                        key={fruit.id}
                        onClick={() => {
                          soundFX.playPop();
                          if (!customStartFruits.includes(fruit.id) && customStartFruits.length < 4) {
                            setCustomStartFruits(prev => [...prev, fruit.id]);
                          }
                        }}
                        className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                          customStartFruits.includes(fruit.id)
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <span>{fruit.imageEmoji}</span>
                        <span>{fruit.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Target Destination */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <label className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>2. Target Goal Fruit</span>
                </label>

                <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40 flex items-center justify-between">
                  {(() => {
                    const target = getFruit(customTargetFruitId) || effectiveFruits[0];
                    return (
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{target.imageEmoji}</span>
                        <div>
                          <div className="font-black text-white text-base">{target.name}</div>
                          <div className="text-xs text-emerald-400 font-mono font-bold">
                            Value: ~${(target.physicalValue / 1000000).toFixed(1)}M Trading Beli
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400 font-bold">Select target fruit:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 custom-scrollbar">
                    {effectiveFruits.filter(f => f.rarity === 'Mythical' || f.id === 'buddha' || f.id === 'portal' || f.id === 'dough').map(fruit => (
                      <button
                        key={fruit.id}
                        onClick={() => {
                          soundFX.playPop();
                          setCustomTargetFruitId(fruit.id);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold border transition-all text-left truncate flex items-center gap-1.5 ${
                          customTargetFruitId === fruit.id
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <span>{fruit.imageEmoji}</span>
                        <span className="truncate">{fruit.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Ladder Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Generated Flip Sequence ({customGeneratedSteps.length} Steps)</span>
              </h3>
            </div>

            {customGeneratedSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 md:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-3"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        {step.profitEstimate}
                      </span>
                      <span className="text-xs text-slate-400">⏱️ {step.timeEstimate}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      💡 <strong>Strategy:</strong> {step.strategyTip}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black text-rose-400 mr-1">Give:</span>
                      {step.giveItems.map((fid, i) => {
                        const it = getFruit(fid);
                        return (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs text-white">
                            {it?.imageEmoji || '🍎'} {it?.name || fid}
                          </span>
                        );
                      })}
                    </div>

                    <ArrowRight className="w-4 h-4 text-cyan-400 hidden sm:block" />

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black text-emerald-400 mr-1">Get:</span>
                      {step.receiveItems.map((fid, i) => {
                        const it = getFruit(fid);
                        return (
                          <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 font-bold">
                            {it?.imageEmoji || '✨'} {it?.name || fid}
                          </span>
                        );
                      })}
                    </div>

                    {onSendToCalculator && (
                      <button
                        onClick={() => {
                          soundFX.playPop();
                          onSendToCalculator(step.giveItems, step.receiveItems);
                        }}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all border border-indigo-400/40 ml-auto sm:ml-2 cursor-pointer"
                      >
                        Calc
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: TRADING HOTSPOTS & HAGGLING TACTICS */}
      {activeTabMode === 'hotspots' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRADING_HOTSPOTS_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tip.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-white text-base">{tip.location}</h3>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      {tip.tag}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {tip.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <strong className="text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Pro Negotiator Rule:
                </strong>
                <p>{tip.hagglingTip}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
