import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Moon, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Search, 
  Volume2, 
  VolumeX, 
  Clock, 
  Check, 
  Copy,
  Radio,
  Key,
  Shield,
  Palette
} from 'lucide-react';
import { motion } from 'motion/react';
import { NavTabType } from './Sidebar';
import { soundFX } from '../utils/audio';
import { getInitialAuthProfile, DISCORD_OAUTH_URL, logoutDiscordAccount } from '../utils/aiQuota';
import { UserAuthProfile } from '../types';
import { AuthModal } from './AuthModal';
import { AppTheme, getStoredTheme, setStoredTheme } from '../utils/theme';

interface TopHudProps {
  activeTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentTheme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

export const TopHud: React.FC<TopHudProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  currentTheme = getStoredTheme(),
  onThemeChange
}) => {
  const [copiedCredit, setCopiedCredit] = useState(false);
  const [serverTime, setServerTime] = useState<string>('');
  const [fullMoonPhase, setFullMoonPhase] = useState<string>('🌕 Full Moon in 14m');
  const [authProfile, setAuthProfile] = useState<UserAuthProfile>(() => getInitialAuthProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      if (e.detail) setAuthProfile(e.detail);
    };
    window.addEventListener('blox_auth_profile_updated', handleProfileUpdate);
    return () => window.removeEventListener('blox_auth_profile_updated', handleProfileUpdate);
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setServerTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      // Calculate a realistic game moon cycle simulation (every ~80 mins)
      const minutes = now.getMinutes();
      const moonMin = (minutes * 3) % 80;
      if (moonMin < 15) {
        setFullMoonPhase('🌕 FULL MOON ACTIVE NOW!');
      } else {
        setFullMoonPhase(`🌘 Next Full Moon: ${80 - moonMin}m`);
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText('1_solas (DC: 1304013684577665074)');
    setCopiedCredit(true);
    soundFX.playPop();
    setTimeout(() => setCopiedCredit(false), 2200);
  };

  const getTabTitleInfo = () => {
    switch (activeTab) {
      case 'tradeladder':
        return {
          title: 'Zero-to-Kitsune Trading Ladder',
          subtitle: 'Systematic profit roadmaps, tier upgrade sequences & flip techniques from Common to Mythical',
          tag: 'Profit Roadmap',
          color: 'from-amber-400 via-emerald-400 to-cyan-500'
        };
      case 'mutationlab':
        return {
          title: '🎮 Fruit Mutation Game & Raid Arena',
          subtitle: 'Real-time boss battle simulations, Gacha spins, hybrid fruit combat engine & awakening progressions',
          tag: 'Mini-Game / RPG',
          color: 'from-purple-400 via-pink-400 to-indigo-500'
        };
      case 'checklist':
        return {
          title: 'My Collection Checklist',
          subtitle: 'Track your Swords, Guns, Accessories, Race V4 & Titles progress',
          tag: 'Local Persistence',
          color: 'from-emerald-400 to-cyan-500'
        };
      case 'crafter':
        return {
          title: 'PvP Combo Crafter & Builds',
          subtitle: 'Build meta loadouts, calculate true combo damage, and test one-shot synergies',
          tag: 'Meta S-Tier',
          color: 'from-cyan-400 to-blue-500'
        };
      case 'faq':
        return {
          title: '33 Master FAQs & Race V4 Gear Matrix',
          subtitle: 'Anti-Cheat PvP tech, glitch mechanics, Sea Danger 1-6, Leviathan & V4 skill trees',
          tag: '33 Full Guides',
          color: 'from-purple-400 to-indigo-500'
        };
      case 'obtainment':
        return {
          title: 'Item Obtainment & Drops Codex',
          subtitle: 'Exhaustive step-by-step guides for every Sword, Gun, Accessory, and Rare Drop',
          tag: 'Complete Codex',
          color: 'from-amber-400 to-orange-500'
        };
      case 'progression':
        return {
          title: 'Sea 1-3 Progression Guide',
          subtitle: 'Level 1 to 2550 questlines, boss locations, sea transitions, and Mirage Island secrets',
          tag: 'Sea 1 • 2 • 3',
          color: 'from-blue-400 to-teal-500'
        };
      case 'calculator':
        return {
          title: 'Trade Value & W/F/L Analyzer',
          subtitle: 'Real-time trade calculation with 40% Beli limits, demand tiers, and win/loss verification',
          tag: 'Live Economy',
          color: 'from-teal-400 to-emerald-500'
        };
      case 'database':
        return {
          title: 'Price & Demand Database',
          subtitle: 'Searchable database for all Physical & Permanent fruits with trading demand ratings',
          tag: 'All Fruits & Gamepasses',
          color: 'from-indigo-400 to-violet-500'
        };
      case 'sensei':
        return {
          title: 'Solas • Blox Fruits Grandmaster AI',
          subtitle: 'Full embedded offline intelligence for all secrets, items, mechanics, and strategies',
          tag: '1_solas Engine',
          color: 'from-amber-400 via-cyan-400 to-indigo-500'
        };
      default:
        return {
          title: 'Blox Fruits Master Hub',
          subtitle: 'Ultimate Game Encyclopedia & Companion',
          tag: 'v2026 Engine',
          color: 'from-cyan-400 to-indigo-500'
        };
    }
  };

  const info = getTabTitleInfo();

  return (
    <div className="relative mb-6">
      {/* Top ambient banner */}
      <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Glow ambient accent */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${info.color} opacity-10 blur-3xl pointer-events-none`} />
        
        {/* Top Status Ticker Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80 text-xs">
          {/* Live Status Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Blox Fruits 2026 Engine</span>
            </span>

            {/* Simulated Full Moon tracker */}
            <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 text-[11px] border ${
              fullMoonPhase.includes('ACTIVE')
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
            }`}>
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span>{fullMoonPhase}</span>
            </span>

            {/* Server clock */}
            <span className="hidden sm:flex px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 font-mono text-[11px] items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{serverTime || '00:00:00'}</span>
            </span>
          </div>

          {/* Top Authentication & Discord Login */}
          <div className="flex items-center gap-2">
            {authProfile.discord ? (
              <button
                id="top-hud-discord-profile-btn"
                onClick={() => {
                  soundFX.playPop();
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/60 text-indigo-200 font-bold flex items-center gap-2 transition-all text-xs shadow-lg shadow-indigo-950/60 hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-indigo-500/40"
                title="Discord Authentication Active (12 searches per 12h)"
              >
                <div className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate max-w-[130px]">@{authProfile.discord.username}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-100 font-mono border border-indigo-400/30">
                  {Math.max(0, authProfile.maxSearches - authProfile.searchesUsed)}/12 left
                </span>
              </button>
            ) : (
              <button
                id="top-hud-login-discord-btn"
                onClick={() => {
                  soundFX.playPop();
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold flex items-center gap-2 transition-all text-xs shadow-lg shadow-indigo-950/70 hover:scale-105 active:scale-95 border border-indigo-300/40 cursor-pointer ring-1 ring-cyan-400/30"
                title="Authentication: Log in with Discord OAuth2 for 12 searches per 12h"
              >
                <div className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-200" />
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Authentication</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-black/40 rounded-lg text-cyan-200 font-mono border border-white/10">
                  {Math.max(0, authProfile.maxSearches - authProfile.searchesUsed)}/6 Free
                </span>
              </button>
            )}

            <button
              id="top-hud-dc-credit-btn"
              onClick={handleCopyDiscord}
              className="px-3 py-1 rounded-xl bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-200 font-bold flex items-center gap-1.5 transition-all text-xs shadow-sm hover:scale-105 active:scale-95"
              title="Click to copy Discord handle"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dev: <strong className="text-white">1_solas</strong></span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 font-mono">
                {copiedCredit ? 'Copied!' : '1304013684577665074'}
              </span>
            </button>

            {/* Theme Selector Toggle */}
            <div className="relative group">
              <select
                value={currentTheme}
                onChange={e => {
                  soundFX.playPop();
                  const newTheme = e.target.value as AppTheme;
                  setStoredTheme(newTheme);
                  if (onThemeChange) onThemeChange(newTheme);
                }}
                className="appearance-none bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-xs font-bold py-1.5 pl-7 pr-6 rounded-xl cursor-pointer focus:outline-none transition-all shadow-sm"
                title="Select Color Theme ('Dark Void', 'Ocean Blue', 'Magma Red')"
              >
                <option value="dark_void">🌌 Dark Void</option>
                <option value="ocean_blue">🌊 Ocean Blue</option>
                <option value="magma_red">🌋 Magma Red</option>
              </select>
              <Palette className="w-3.5 h-3.5 text-cyan-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black bg-gradient-to-r ${info.color} text-slate-950 shadow-md`}>
                {info.tag}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                {info.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {info.subtitle}
            </p>
          </div>

          {/* Quick Action Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => {
                soundFX.playPop();
                onTabChange('checklist');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeTab === 'checklist'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              ✓ Checklist
            </button>
            <button
              onClick={() => {
                soundFX.playPop();
                onTabChange('faq');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeTab === 'faq'
                  ? 'bg-purple-600 text-white border-purple-500 font-extrabold shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              🧠 33 FAQs
            </button>
            <button
              onClick={() => {
                soundFX.playPop();
                onTabChange('sensei');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeTab === 'sensei'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-md'
                  : 'bg-slate-950/60 text-amber-300 hover:text-amber-200 border-amber-500/30'
              }`}
            >
              ☀️ Solas AI
            </button>
          </div>
        </div>
      </div>

      {/* Discord OAuth2 & Search Limit Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authProfile={authProfile}
        onProfileUpdated={setAuthProfile}
      />
    </div>
  );
};
