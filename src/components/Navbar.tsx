import React from 'react';
import { Bot, Calculator, Database, Sparkles, Volume2, VolumeX, Swords, Compass, Moon, Flame, BookOpen, Brain, HelpCircle, Cpu, CheckSquare, Palette } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { AppTheme } from '../utils/theme';

export type NavTabType = 'checklist' | 'crafter' | 'obtainment' | 'faq' | 'progression' | 'calculator' | 'database' | 'sensei';


interface NavbarProps {
  activeTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('crafter')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 font-black text-xl border border-cyan-400/40">
              <span>🏴‍☠️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg text-white tracking-wide">
                  Blox Fruits <span className="text-cyan-400">Master Hub</span>
                </span>
                <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  All-Rounder Companion
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                All Items Obtainment • Race V4 • PvP Combos • Sea Progression • Values
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            {/* My Checklist */}
            <button
              id="nav-tab-checklist"
              onClick={() => {
                soundFX.playPop();
                onTabChange('checklist');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>My Checklist</span>
            </button>

            {/* PvP & Combos */}
            <button
              id="nav-tab-crafter"
              onClick={() => {
                soundFX.playPop();
                onTabChange('crafter');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'crafter'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>PvP Combos</span>
            </button>

            {/* 33 FAQ & V4 Gears Codex */}
            <button
              id="nav-tab-faq"
              onClick={() => {
                soundFX.playPop();
                onTabChange('faq');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-300" />
              <span>33 FAQs & Gears</span>
            </button>

            {/* Obtainment & Drops Codex */}
            <button
              id="nav-tab-obtainment"
              onClick={() => {
                soundFX.playPop();
                onTabChange('obtainment');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'obtainment'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Items Codex</span>
            </button>

            {/* Sea Progression */}
            <button
              id="nav-tab-progression"
              onClick={() => {
                soundFX.playPop();
                onTabChange('progression');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'progression'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Progression</span>
            </button>

            {/* Trade Matrix */}
            <button
              id="nav-tab-calculator"
              onClick={() => {
                soundFX.playPop();
                onTabChange('calculator');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Trades</span>
            </button>

            {/* Wiki & Database */}
            <button
              id="nav-tab-database"
              onClick={() => {
                soundFX.playPop();
                onTabChange('database');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Wiki</span>
            </button>

            {/* Solas AI */}
            <button
              id="nav-tab-sensei"
              onClick={() => {
                soundFX.playPop();
                onTabChange('sensei');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'sensei'
                  ? 'bg-gradient-to-r from-amber-400 via-cyan-500 to-indigo-600 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Solas AI</span>
            </button>
          </nav>

          {/* Theme Selector & Sound Mute Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                value={currentTheme}
                onChange={e => {
                  soundFX.playPop();
                  onThemeChange(e.target.value as AppTheme);
                }}
                className="appearance-none bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-xs font-bold py-2 pl-8 pr-7 rounded-xl cursor-pointer focus:outline-none transition-all"
                title="Select Color Theme"
              >
                <option value="dark_void">🌌 Dark Void</option>
                <option value="ocean_blue">🌊 Ocean Blue</option>
                <option value="magma_red">🌋 Magma Red</option>
              </select>
              <Palette className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              id="toggle-sound-btn"
              onClick={() => {
                onToggleSound();
                soundFX.playPop();
              }}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
