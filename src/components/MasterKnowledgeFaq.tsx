import React, { useState, useMemo } from 'react';
import { BLOX_MASTER_FAQ, RACE_V4_GEAR_DATA, FaqQuestionEntry, RaceV4GearGuide } from '../data/bloxMasterFaqData';
import {
  Search,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Compass,
  Swords,
  Shield,
  Zap,
  BookOpen,
  Copy,
  Check,
  Bot,
  ExternalLink,
  Flame,
  Layers,
  MapPin,
  Coins
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface MasterKnowledgeFaqProps {
  onAskSensei?: (query: string) => void;
}

export const MasterKnowledgeFaq: React.FC<MasterKnowledgeFaqProps> = ({ onAskSensei }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryNum, setSelectedCategoryNum] = useState<number | 'all'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(BLOX_MASTER_FAQ[0].id);
  const [selectedRaceV4, setSelectedRaceV4] = useState<string>('cyborg');
  const [activeGearView, setActiveGearView] = useState<'faq' | 'gears'>('faq');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Group unique categories
  const categories = useMemo(() => {
    const map = new Map<number, string>();
    BLOX_MASTER_FAQ.forEach((item) => {
      if (!map.has(item.categoryNumber)) {
        map.set(item.categoryNumber, item.categoryName);
      }
    });
    return Array.from(map.entries())
      .map(([num, name]) => ({ num, name }))
      .sort((a, b) => a.num - b.num);
  }, []);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return BLOX_MASTER_FAQ.filter((item) => {
      if (selectedCategoryNum !== 'all' && item.categoryNumber !== selectedCategoryNum) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.shortAnswer.toLowerCase().includes(q) ||
          item.fullAnswer.toLowerCase().includes(q) ||
          item.aliases.some((a) => a.toLowerCase().includes(q)) ||
          item.tags.some((t) => t.toLowerCase().includes(q)) ||
          (item.gearExplanation && item.gearExplanation.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategoryNum]);

  const activeRaceGuide = useMemo(() => {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === selectedRaceV4) || RACE_V4_GEAR_DATA[0];
  }, [selectedRaceV4]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundFX.playPop();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="master-knowledge-faq-container" className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 border border-purple-400/40 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                <span>🧠</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  33 Master Knowledge & Gear Categories
                </h2>
                <div className="text-[11px] text-purple-300 font-semibold flex items-center gap-1.5 mt-0.5">
                  <span>Curated & Developed by <strong>1_solas</strong> (DC: 1304013684577665074)</span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Exhaustive encyclopedia covering all 33 player query categories, anti-cheat & bot counters, movement glitches, sea danger levels 1-6, Leviathan & Kitsune Shrine, deep Race V4 Gear matrices, and offline Solas AI integration.
            </p>
          </div>

          {/* Tab Switcher: FAQ Explorer vs V4 Gear Matrix */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              id="view-faq-tab-btn"
              onClick={() => {
                soundFX.playPop();
                setActiveGearView('faq');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeGearView === 'faq'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>33 FAQ Categories ({BLOX_MASTER_FAQ.length})</span>
            </button>
            <button
              id="view-gears-tab-btn"
              onClick={() => {
                soundFX.playPop();
                setActiveGearView('gears');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeGearView === 'gears'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Race V4 Gear Matrix</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any question (e.g. 'How to reach Sea 2', 'Cyborg V4 gear', 'Soul Guitar puzzle', 'CDK vs TTK', 'Dough raid key')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* VIEW 1: RACE V4 GEAR MATRIX */}
      {activeGearView === 'gears' && (
        <div className="space-y-6">
          {/* Race Selector Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {RACE_V4_GEAR_DATA.map((race) => (
              <button
                key={race.raceId}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedRaceV4(race.raceId);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
                  selectedRaceV4 === race.raceId
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{race.raceId === 'cyborg' ? '⚡' : race.raceId === 'shark' ? '🦈' : race.raceId === 'angel' ? '🕊️' : race.raceId === 'human' ? '🩸' : race.raceId === 'ghoul' ? '🦇' : '⚡'}</span>
                <span>{race.raceName}</span>
              </button>
            ))}
          </div>

          {/* Active Race Detailed Gear Matrix Station */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    Temple of Time Awakened
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• {activeRaceGuide.trialName}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {activeRaceGuide.raceName} Gear Explanations & Upgrade Ladder
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  <strong className="text-slate-300">Trial Objective:</strong> {activeRaceGuide.trialObjective}
                </p>
              </div>

              {onAskSensei && (
                <button
                  onClick={() => onAskSensei(`Tell me all about ${activeRaceGuide.raceName} gears and best builds`)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 whitespace-nowrap self-start md:self-auto"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask Solas About {activeRaceGuide.raceName}</span>
                </button>
              )}
            </div>

            {/* Gear 1 to 5 Visual Ladder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gear 1: Base Core */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <span className="text-sm font-black text-white">{activeRaceGuide.gear1.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-lg border border-cyan-800/40">
                    {activeRaceGuide.gear1.costFrags.toLocaleString()} Frags ({activeRaceGuide.gear1.trainingSessions} Sessions)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeRaceGuide.gear1.description}</p>
              </div>

              {/* Gear 2: Tier 1 Branching */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <span className="text-sm font-black text-white">{activeRaceGuide.gear2.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-lg border border-cyan-800/40">
                    {activeRaceGuide.gear2.costFrags.toLocaleString()} Frags ({activeRaceGuide.gear2.trainingSessions} Sessions)
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear2.tierOptions.branchA}
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear2.tierOptions.branchB}
                  </div>
                </div>
                <p className="text-[11px] text-amber-300/80 italic">{activeRaceGuide.gear2.description}</p>
              </div>

              {/* Gear 3: Tier 2 Branching */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <span className="text-sm font-black text-white">{activeRaceGuide.gear3.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-lg border border-cyan-800/40">
                    {activeRaceGuide.gear3.costFrags.toLocaleString()} Frags ({activeRaceGuide.gear3.trainingSessions} Sessions)
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear3.tierOptions.branchA}
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear3.tierOptions.branchB}
                  </div>
                </div>
                <p className="text-[11px] text-amber-300/80 italic">{activeRaceGuide.gear3.description}</p>
              </div>

              {/* Gear 4: Tier 3 Ultimate Branching */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">
                      4
                    </span>
                    <span className="text-sm font-black text-white">{activeRaceGuide.gear4.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-lg border border-cyan-800/40">
                    {activeRaceGuide.gear4.costFrags.toLocaleString()} Frags ({activeRaceGuide.gear4.trainingSessions} Sessions)
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear4.tierOptions.branchA}
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                    {activeRaceGuide.gear4.tierOptions.branchB}
                  </div>
                </div>
                <p className="text-[11px] text-amber-300/80 italic">{activeRaceGuide.gear4.description}</p>
              </div>
            </div>

            {/* Gear 5: Clock Mastery & Verdict */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/30 text-amber-300 text-[10px] font-black uppercase">
                    Gear 5 Max Resonation
                  </span>
                  <span className="text-sm font-black text-white">{activeRaceGuide.gear5.name}</span>
                </div>
                <p className="text-xs text-slate-300">{activeRaceGuide.gear5.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>⚔️ <strong className="text-slate-200">PvP Verdict:</strong> {activeRaceGuide.metaPvPVerdict}</span>
                  <span>🌾 <strong className="text-slate-200">Grind:</strong> {activeRaceGuide.metaGrindVerdict}</span>
                </div>
              </div>
              <span className="text-xs font-black text-amber-300 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-800/60 whitespace-nowrap">
                {activeRaceGuide.gear5.costFrags.toLocaleString()} Frags (12 Sessions)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 23 FAQ CATEGORIES EXPLORER */}
      {activeGearView === 'faq' && (
        <div className="space-y-6">
          {/* Category Filter Pills (23 Categories) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => {
                soundFX.playPop();
                setSelectedCategoryNum('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategoryNum === 'all'
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Categories ({BLOX_MASTER_FAQ.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.num}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedCategoryNum(c.num);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCategoryNum === c.num
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {c.num}. {c.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900 border-purple-500/50 shadow-xl shadow-purple-500/5'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Question Header */}
                  <div
                    onClick={() => {
                      soundFX.playPop();
                      setExpandedFaqId(isExpanded ? null : faq.id);
                    }}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 sm:mt-0">
                        {faq.categoryNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400/80">
                            {faq.categoryName}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-4">
                      {/* Short summary highlight */}
                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 font-medium leading-relaxed">
                        <strong className="text-purple-300 font-black">Quick Summary: </strong>
                        {faq.shortAnswer}
                      </div>

                      {/* Detailed formatted answer */}
                      <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                        {faq.fullAnswer}
                      </div>

                      {/* Gear Explanation if present */}
                      {faq.gearExplanation && (
                        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
                          <strong className="text-amber-300 font-black flex items-center gap-1.5 mb-1">
                            <Cpu className="w-3.5 h-3.5" />
                            Gear Explanation & Upgrade Branches:
                          </strong>
                          {faq.gearExplanation}
                        </div>
                      )}

                      {/* Metadata Badges */}
                      {(faq.prerequisites || faq.location || faq.npc || faq.cost) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                          {faq.prerequisites && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                              <strong className="text-slate-300">Prereq:</strong> {faq.prerequisites}
                            </span>
                          )}
                          {faq.location && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                              <strong className="text-slate-300">Location:</strong> {faq.location}
                            </span>
                          )}
                          {faq.npc && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                              <strong className="text-slate-300">NPC:</strong> {faq.npc}
                            </span>
                          )}
                          {faq.cost && (
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                              <strong className="text-slate-300">Cost:</strong> {faq.cost}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-slate-400 font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(faq.id, `${faq.question}\n\n${faq.fullAnswer}`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            {copiedId === faq.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>

                          {onAskSensei && (
                            <button
                              onClick={() => onAskSensei(faq.question)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                            >
                              <Bot className="w-3.5 h-3.5" />
                              <span>Ask Solas</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                <p className="text-sm text-slate-400">No questions found matching "{searchQuery}"</p>
                <p className="text-xs text-slate-500">
                  Try searching for keywords like "Sea 2", "Mirage", "Cyborg", "Soul Guitar", or "Kitsune".
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
