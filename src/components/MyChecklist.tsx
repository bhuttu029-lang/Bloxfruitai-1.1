import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckSquare,
  Square,
  CheckCircle2,
  Trophy,
  Filter,
  Search,
  RotateCcw,
  Share2,
  Copy,
  Sparkles,
  Bot,
  Compass,
  Swords,
  Flame,
  Shield,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import {
  BLOX_CHECKLIST_ITEMS,
  CHECKLIST_CATEGORIES,
  ChecklistItem,
  ChecklistCategoryMeta
} from '../data/bloxChecklistData';
import { soundFX } from '../utils/audio';

interface MyChecklistProps {
  onAskSensei: (query: string) => void;
}

const STORAGE_KEY = 'blox_master_user_checklist_progress';

export const MyChecklist: React.FC<MyChecklistProps> = ({ onAskSensei }) => {
  // Loaded completed IDs from localStorage
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load checklist from localStorage', e);
    }
    return new Set<string>();
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSea, setSelectedSea] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedIds)));
    } catch (e) {
      console.error('Failed to save checklist to localStorage', e);
    }
  }, [checkedIds]);

  // Toggle single item
  const handleToggleItem = (id: string) => {
    soundFX.playPop();
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Check all currently filtered
  const handleCheckAllFiltered = (filteredItems: ChecklistItem[]) => {
    soundFX.playPop();
    setCheckedIds((prev) => {
      const next = new Set(prev);
      filteredItems.forEach((item) => next.add(item.id));
      return next;
    });
  };

  // Uncheck all currently filtered
  const handleUncheckAllFiltered = (filteredItems: ChecklistItem[]) => {
    soundFX.playPop();
    setCheckedIds((prev) => {
      const next = new Set(prev);
      filteredItems.forEach((item) => next.delete(item.id));
      return next;
    });
  };

  // Reset entire checklist
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all checklist progress?')) {
      soundFX.playPop();
      setCheckedIds(new Set());
    }
  };

  // Statistics calculation
  const totalItemsCount = BLOX_CHECKLIST_ITEMS.length;
  const totalCompletedCount = useMemo(() => {
    return BLOX_CHECKLIST_ITEMS.filter((item) => checkedIds.has(item.id)).length;
  }, [checkedIds]);

  const overallProgressPercentage = Math.round((totalCompletedCount / (totalItemsCount || 1)) * 100);

  // Category statistics
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number; percentage: number }> = {};
    CHECKLIST_CATEGORIES.forEach((cat) => {
      const itemsInCat = BLOX_CHECKLIST_ITEMS.filter((i) => i.category === cat.id);
      const completedInCat = itemsInCat.filter((i) => checkedIds.has(i.id)).length;
      stats[cat.id] = {
        total: itemsInCat.length,
        completed: completedInCat,
        percentage: itemsInCat.length > 0 ? Math.round((completedInCat / itemsInCat.length) * 100) : 0
      };
    });
    return stats;
  }, [checkedIds]);

  // Sea statistics
  const seaStats = useMemo(() => {
    const calculateSea = (seaNum: number | 'All') => {
      const items = BLOX_CHECKLIST_ITEMS.filter((i) => i.sea === seaNum);
      const done = items.filter((i) => checkedIds.has(i.id)).length;
      return { total: items.length, done, pct: items.length > 0 ? Math.round((done / items.length) * 100) : 0 };
    };
    return {
      sea1: calculateSea(1),
      sea2: calculateSea(2),
      sea3: calculateSea(3),
      allSeas: calculateSea('All')
    };
  }, [checkedIds]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return BLOX_CHECKLIST_ITEMS.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesHow = item.howToGet.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesHow) return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Sea
      if (selectedSea !== 'all') {
        if (selectedSea === '1' && item.sea !== 1) return false;
        if (selectedSea === '2' && item.sea !== 2) return false;
        if (selectedSea === '3' && item.sea !== 3) return false;
        if (selectedSea === 'All' && item.sea !== 'All') return false;
      }

      // Rarity
      if (selectedRarity !== 'all' && item.rarity !== selectedRarity) {
        return false;
      }

      // Status
      const isDone = checkedIds.has(item.id);
      if (statusFilter === 'completed' && !isDone) return false;
      if (statusFilter === 'incomplete' && isDone) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSea, selectedRarity, statusFilter, checkedIds]);

  // Copy share summary
  const handleCopySummary = () => {
    soundFX.playPop();
    const text = `🏆 Blox Fruits Collection Tracker\n` +
      `Overall Completion: ${totalCompletedCount}/${totalItemsCount} (${overallProgressPercentage}%)\n\n` +
      `• Weapons: ${categoryStats.weapons?.completed}/${categoryStats.weapons?.total} (${categoryStats.weapons?.percentage}%)\n` +
      `• Fighting Styles: ${categoryStats.fighting_styles?.completed}/${categoryStats.fighting_styles?.total} (${categoryStats.fighting_styles?.percentage}%)\n` +
      `• Race Evolutions: ${categoryStats.races?.completed}/${categoryStats.races?.total} (${categoryStats.races?.percentage}%)\n` +
      `• Accessories: ${categoryStats.accessories?.completed}/${categoryStats.accessories?.total} (${categoryStats.accessories?.percentage}%)\n` +
      `• Awakenings: ${categoryStats.awakenings?.completed}/${categoryStats.awakenings?.total} (${categoryStats.awakenings?.percentage}%)\n` +
      `• Titles: ${categoryStats.titles?.completed}/${categoryStats.titles?.total} (${categoryStats.titles?.percentage}%)\n\n` +
      `Tracked via Blox Fruits Master Hub!`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const getRarityBadgeStyle = (rarity: string) => {
    switch (rarity) {
      case 'Mythical':
        return 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-500/20';
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Uncommon':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Personal Progression Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              My Blox Fruits <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Checklist</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Check off your unlocked swords, Godhuman & Sanguine Art, V4 awakenings, rare boss drops, and prestigious titles. Your progress automatically saves locally!
            </p>

            {/* Quick Share & Reset */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="copy-checklist-summary-btn"
                onClick={handleCopySummary}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              >
                {copiedNotification ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedNotification ? 'Copied Progress Summary!' : 'Share Progress Report'}</span>
              </button>

              <button
                id="reset-checklist-btn"
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          </div>

          {/* Overall Progress Gauge Widget */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 sm:min-w-[340px]">
            {/* Progress Circle Visual */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 transition-all duration-700 ease-out"
                  strokeDasharray={`${overallProgressPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white">{overallProgressPercentage}%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Done</span>
              </div>
            </div>

            {/* Numerical breakdown */}
            <div className="space-y-1.5 text-center sm:text-left w-full">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">Total Unlocked</span>
                <span className="text-sm font-extrabold text-cyan-300">{totalCompletedCount} / {totalItemsCount}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPercentage}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-400">
                <div className="bg-slate-900/90 rounded-lg p-1.5 text-center border border-slate-800/60">
                  <div className="text-slate-500 text-[9px] uppercase font-bold">Sea 1</div>
                  <div className="font-bold text-slate-200">{seaStats.sea1.done}/{seaStats.sea1.total}</div>
                </div>
                <div className="bg-slate-900/90 rounded-lg p-1.5 text-center border border-slate-800/60">
                  <div className="text-slate-500 text-[9px] uppercase font-bold">Sea 2</div>
                  <div className="font-bold text-slate-200">{seaStats.sea2.done}/{seaStats.sea2.total}</div>
                </div>
                <div className="bg-slate-900/90 rounded-lg p-1.5 text-center border border-slate-800/60">
                  <div className="text-slate-500 text-[9px] uppercase font-bold">Sea 3</div>
                  <div className="font-bold text-slate-200">{seaStats.sea3.done}/{seaStats.sea3.total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <button
          id="checklist-cat-all"
          onClick={() => {
            soundFX.playPop();
            setSelectedCategory('all');
          }}
          className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/15 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-base">🌐</span>
            <span className="text-xs font-black text-cyan-300">{overallProgressPercentage}%</span>
          </div>
          <div className="font-extrabold text-xs text-white">All Categories</div>
          <div className="text-[10px] text-slate-400">{totalCompletedCount}/{totalItemsCount} items</div>
          <div className="w-full bg-slate-950 rounded-full h-1 mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${overallProgressPercentage}%` }} />
          </div>
        </button>

        {CHECKLIST_CATEGORIES.map((cat) => {
          const stats = categoryStats[cat.id] || { total: 0, completed: 0, percentage: 0 };
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`checklist-cat-${cat.id}`}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">{cat.icon}</span>
                <span className={`text-xs font-black ${stats.percentage === 100 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {stats.percentage}%
                </span>
              </div>
              <div className="font-extrabold text-xs text-white truncate">{cat.name}</div>
              <div className="text-[10px] text-slate-400">{stats.completed}/{stats.total}</div>
              <div className="w-full bg-slate-950 rounded-full h-1 mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    stats.percentage === 100 ? 'bg-emerald-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="checklist-search-input"
              type="text"
              placeholder="Search items (e.g. Saber, Godhuman, Cyborg V4, Dark Coat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sea Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-1 hidden sm:inline">Sea:</span>
            {[
              { id: 'all', label: 'All Seas' },
              { id: '1', label: 'Sea 1' },
              { id: '2', label: 'Sea 2' },
              { id: '3', label: 'Sea 3' },
              { id: 'All', label: 'Any Sea' }
            ].map((s) => (
              <button
                key={s.id}
                id={`filter-sea-${s.id}`}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedSea(s.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSea === s.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-1 hidden sm:inline">Status:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'incomplete', label: 'Incomplete' },
              { id: 'completed', label: 'Unlocked' }
            ].map((st) => (
              <button
                key={st.id}
                id={`filter-status-${st.id}`}
                onClick={() => {
                  soundFX.playPop();
                  setStatusFilter(st.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  statusFilter === st.id
                    ? 'bg-purple-500 text-white shadow-md font-black'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Batch Operations Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredItems.length}</strong> matching items</span>
            <span>•</span>
            <span><strong className="text-cyan-300">{filteredItems.filter((i) => checkedIds.has(i.id)).length}</strong> checked</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="check-all-filtered-btn"
              onClick={() => handleCheckAllFiltered(filteredItems)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 font-semibold transition-all"
            >
              Check All Filtered
            </button>
            <button
              id="uncheck-all-filtered-btn"
              onClick={() => handleUncheckAllFiltered(filteredItems)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-rose-300 border border-slate-800 font-semibold transition-all"
            >
              Uncheck All Filtered
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl mx-auto">
            🔍
          </div>
          <h3 className="text-lg font-bold text-white">No Items Match Your Filters</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your search query, sea selection, or category filters to find the items you are looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedSea('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isCompleted = checkedIds.has(item.id);
            return (
              <div
                key={item.id}
                id={`checklist-card-${item.id}`}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="p-5 space-y-3">
                  {/* Top Bar: Checkbox + Name + Badges */}
                  <div className="flex items-start gap-3">
                    <button
                      id={`toggle-item-${item.id}`}
                      onClick={() => handleToggleItem(item.id)}
                      className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                          : 'bg-slate-950 border-slate-700 text-transparent hover:border-cyan-400'
                      }`}
                      aria-label={`Mark ${item.name} as ${isCompleted ? 'incomplete' : 'completed'}`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-black text-base leading-tight truncate ${
                          isCompleted ? 'text-emerald-300 line-through decoration-emerald-500/60' : 'text-white'
                        }`}>
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges: Rarity + Sea */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${getRarityBadgeStyle(item.rarity)}`}>
                      {item.rarity}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-400">
                      {item.sea === 'All' ? 'All Seas' : `Sea ${item.sea}`}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-400 capitalize">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Obtainment Step Instruction */}
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-amber-300">How to unlock: </span>
                    {item.howToGet}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="px-5 py-3 bg-slate-950/50 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isCompleted ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isCompleted ? '✅ Unlocked' : '⭕ Mark Complete'}
                  </button>

                  <button
                    id={`ask-solas-about-${item.id}`}
                    onClick={() => {
                      soundFX.playPop();
                      onAskSensei(`How do I get ${item.name} and what are the exact requirements?`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Bot className="w-3 h-3" />
                    <span>Ask Solas</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
