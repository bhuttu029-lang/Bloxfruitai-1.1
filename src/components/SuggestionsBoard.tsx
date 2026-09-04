import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Send, ThumbsUp, MessageSquare, Sparkles, CheckCircle, Shield, Trash2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

export interface VisitorSuggestion {
  id: string;
  author: string;
  category: 'Feature' | 'Mutation Idea' | 'PvP Balance' | 'Trade Hub' | 'General';
  content: string;
  timestamp: string;
  likes: number;
}

const STORAGE_KEY = 'solas_visitor_suggestions_v1';

const DEFAULT_SUGGESTIONS: VisitorSuggestion[] = [
  {
    id: 'sug-1',
    author: 'KitsuneMaster99',
    category: 'Mutation Idea',
    content: 'Add an Ascended Void-Dragon mutation that gives 100% water immunity and teleportation trail!',
    timestamp: '2026-08-15 14:22',
    likes: 42
  },
  {
    id: 'sug-2',
    author: 'BladeKing2026',
    category: 'PvP Balance',
    content: 'Make the Dog Blade bark shockwave stun scale with sword mastery level in the sparring arena.',
    timestamp: '2026-08-15 16:40',
    likes: 38
  },
  {
    id: 'sug-3',
    author: 'TraderJoe_BF',
    category: 'Trade Hub',
    content: 'Add a live global auction house simulator where players can bid physical fruits with Beli.',
    timestamp: '2026-08-16 02:10',
    likes: 29
  }
];

export function getStoredSuggestions(): VisitorSuggestion[] {
  if (typeof window === 'undefined') return DEFAULT_SUGGESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read suggestions', e);
  }
  return DEFAULT_SUGGESTIONS;
}

export function saveStoredSuggestions(list: VisitorSuggestion[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('blox_suggestions_updated', { detail: list }));
  } catch (e) {
    console.warn('Could not save suggestions', e);
  }
}

export const SuggestionsBoard: React.FC = () => {
  const [suggestions, setSuggestions] = useState<VisitorSuggestion[]>(() => getStoredSuggestions());
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'Feature' | 'Mutation Idea' | 'PvP Balance' | 'Trade Hub' | 'General'>('Mutation Idea');
  const [content, setContent] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertNewline = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent(prev => prev + '\n');
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = content.substring(0, start) + '\n' + content.substring(end);
    setContent(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail) setSuggestions(e.detail);
    };
    window.addEventListener('blox_suggestions_updated', handleUpdate);
    return () => window.removeEventListener('blox_suggestions_updated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    soundFX.playWin();
    const newSug: VisitorSuggestion = {
      id: 'sug-' + Date.now(),
      author: author.trim() || 'Anonymous Pirate',
      category,
      content: content.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      likes: 1
    };

    const updated = [newSug, ...suggestions];
    setSuggestions(updated);
    saveStoredSuggestions(updated);
    setContent('');
    setAuthor('');
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  const handleLike = (id: string) => {
    soundFX.playPop();
    const updated = suggestions.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s);
    setSuggestions(updated);
    saveStoredSuggestions(updated);
  };

  const filtered = filterCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === filterCategory);

  return (
    <div id="suggestions-board-container" className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-purple-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Community Life-Memory Board</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Visitor Suggestions & Feature Hub
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Share your mutation ideas, PvP balance concepts, and feature requests. Solas AI and the developers remember every suggestion for life, and approved ideas make it straight into future updates!
            </p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-amber-400 font-mono">{suggestions.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Ideas Logged</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submit Form */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-5 sticky top-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-white">Submit Your Suggestion</h3>
            </div>

            {submittedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Suggestion successfully saved for life! Solas AI has logged it.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Pirate / Visitor Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. Grandmaster Luffy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                >
                  <option value="Mutation Idea">🧬 Mutation Idea</option>
                  <option value="PvP Balance">⚔️ PvP Balance</option>
                  <option value="Feature">✨ New Feature</option>
                  <option value="Trade Hub">💰 Trade Hub</option>
                  <option value="General">🌐 General</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Your Suggestion / Idea</label>
                  <button
                    type="button"
                    onClick={handleInsertNewline}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold border border-slate-700 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                    title="Insert New Line (Change Line on Mobile/Phone)"
                  >
                    <span>↵</span>
                    <span>New Line</span>
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Save Suggestion For Life
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Feed of Suggestions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs font-bold text-slate-300 px-2">
              Community Ideas ({filtered.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'Mutation Idea', 'PvP Balance', 'Feature', 'Trade Hub'].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFX.playPop();
                    setFilterCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Ideas' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map(sug => {
              const badgeColor = 
                sug.category === 'Mutation Idea' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                sug.category === 'PvP Balance' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                sug.category === 'Feature' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';

              return (
                <div
                  key={sug.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-black text-sm">
                        🏴‍☠️
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{sug.author}</div>
                        <div className="text-[10px] text-slate-400">{sug.timestamp}</div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${badgeColor}`}>
                      {sug.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {sug.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <button
                      onClick={() => handleLike(sug.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 font-bold border border-slate-800 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{sug.likes} Upvotes</span>
                    </button>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Saved for Life in Memory
                    </span>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No suggestions found in this category. Be the first to add one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
