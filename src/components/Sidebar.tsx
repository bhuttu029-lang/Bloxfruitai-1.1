import React, { useState } from 'react';
import { 
  Bot, 
  Calculator, 
  Database, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Swords, 
  Compass, 
  Moon, 
  Flame, 
  BookOpen, 
  Brain, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Copy, 
  Check, 
  Radio, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Key,
  Shield,
  TrendingUp,
  FlaskConical,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { getInitialAuthProfile } from '../utils/aiQuota';
import { UserAuthProfile } from '../types';
import { AuthModal } from './AuthModal';

export type NavTabType = 
  | 'checklist' 
  | 'crafter' 
  | 'tradeladder'
  | 'mutationlab'
  | 'suggestions'
  | 'faq' 
  | 'obtainment' 
  | 'progression' 
  | 'calculator' 
  | 'database' 
  | 'sensei';

interface NavItemConfig {
  id: NavTabType;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  accentColor: string;
  description: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'sensei',
    label: 'Solas AI Sensei',
    shortLabel: 'Solas AI',
    icon: Bot,
    badge: 'AI ALL-ROUNDER',
    badgeColor: 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 text-amber-200 border-amber-400/50',
    accentColor: 'from-amber-400 via-cyan-400 to-indigo-500',
    description: 'Blox Fruits AI, Humor & Chat'
  },
  {
    id: 'tradeladder',
    label: 'Zero-to-Kitsune Ladder',
    shortLabel: 'Trade Ladder',
    icon: TrendingUp,
    badge: 'GUIDE',
    badgeColor: 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-emerald-300 border-emerald-400/40',
    accentColor: 'from-amber-400 via-emerald-400 to-cyan-500',
    description: 'Step-by-step profit roadmap & flips'
  },
  {
    id: 'checklist',
    label: 'My Checklist',
    shortLabel: 'Checklist',
    icon: CheckSquare,
    badge: 'V4 & Titles',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentColor: 'from-emerald-400 to-cyan-500',
    description: 'Track Swords, Guns, V4 & Titles'
  },
  {
    id: 'crafter',
    label: 'PvP Combos & Builds',
    shortLabel: 'PvP Builds',
    icon: Swords,
    accentColor: 'from-cyan-400 to-blue-500',
    description: 'Damage calc, one-shots & synergies'
  },
  {
    id: 'faq',
    label: '33 FAQs & V4 Gears',
    shortLabel: '33 FAQs',
    icon: Brain,
    badge: '33 Guides',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accentColor: 'from-purple-400 to-indigo-500',
    description: 'Anti-cheat, glitch tech, V4 trees'
  },
  {
    id: 'obtainment',
    label: 'Item Obtainment Codex',
    shortLabel: 'Items Codex',
    icon: BookOpen,
    accentColor: 'from-amber-400 to-orange-500',
    description: 'Drops, limited events & puzzle steps'
  },
  {
    id: 'progression',
    label: 'Sea 1-3 Progression',
    shortLabel: 'Sea Routes',
    icon: Compass,
    accentColor: 'from-blue-400 to-teal-500',
    description: 'Level 1-2550 questlines & islands'
  },
  {
    id: 'calculator',
    label: 'Trade Value & W/F/L',
    shortLabel: 'Trade Calc',
    icon: Calculator,
    badge: 'W/F/L',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    accentColor: 'from-teal-400 to-emerald-500',
    description: 'Physical & Perm values analyzer'
  },
  {
    id: 'database',
    label: 'Price & Demand Codex',
    shortLabel: 'Values DB',
    icon: Database,
    accentColor: 'from-indigo-400 to-violet-500',
    description: 'Live market stats & hype tiers'
  },
  {
    id: 'mutationlab',
    label: '🎮 Fruit Mutation Game',
    shortLabel: 'Mutation Game',
    icon: FlaskConical,
    badge: 'MINI-GAME',
    badgeColor: 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-pink-300 border-pink-500/40',
    accentColor: 'from-purple-400 via-pink-400 to-indigo-500',
    description: 'Boss raid combat & fusion RPG game'
  },
  {
    id: 'suggestions',
    label: '💡 Visitor Suggestions',
    shortLabel: 'Suggestions',
    icon: Lightbulb,
    badge: 'COMMUNITY',
    badgeColor: 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 text-amber-200 border-amber-400/40',
    accentColor: 'from-amber-400 via-purple-400 to-cyan-500',
    description: 'Remembered for life by Solas AI'
  }
];

interface SidebarProps {
  activeTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  isCollapsed,
  onToggleCollapse,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [copiedDc, setCopiedDc] = useState(false);
  const [authProfile, setAuthProfile] = useState<UserAuthProfile>(() => getInitialAuthProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  React.useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      if (e.detail) setAuthProfile(e.detail);
    };
    window.addEventListener('blox_auth_profile_updated', handleProfileUpdate);
    return () => window.removeEventListener('blox_auth_profile_updated', handleProfileUpdate);
  }, []);

  const handleCopyDiscord = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('1_solas (DC: 1304013684577665074)');
    setCopiedDc(true);
    soundFX.playPop();
    setTimeout(() => setCopiedDc(false), 2200);
  };

  const handleSelectTab = (tab: NavTabType) => {
    soundFX.playPop();
    onTabChange(tab);
    if (mobileMenuOpen) {
      onToggleMobileMenu();
    }
  };

  const renderSidebarContent = (isMobileView = false) => {
    const collapsed = !isMobileView && isCollapsed;

    return (
      <div className="flex flex-col h-full justify-between select-none">
        {/* Top Header & Brand */}
        <div className="p-4 border-b border-slate-800/80">
          <div 
            onClick={() => handleSelectTab('crafter')}
            className={`flex items-center gap-3 cursor-pointer group transition-all ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/25 font-black text-xl border border-cyan-300/40 group-hover:scale-105 transition-transform">
                <span>🏴‍☠️</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </div>

            {!collapsed && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                    Blox Fruits <span className="text-cyan-400">Hub</span>
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Grandmaster
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">v2026 Engine</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 no-scrollbar">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Navigation Matrix</span>
              <span className="text-cyan-400 font-mono">8 Modules</span>
            </div>
          )}

          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const isGameItem = item.id === 'mutationlab';

            return (
              <React.Fragment key={item.id}>
                {isGameItem && (
                  <div className="pt-3 pb-1">
                    <div className="border-t border-purple-500/30 mb-2" />
                    {!collapsed && (
                      <div className="px-2 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-pink-400">
                        <span>🎮 Mini-Game Arena</span>
                        <span className="px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 text-[9px] border border-pink-500/40">RPG MODE</span>
                      </div>
                    )}
                  </div>
                )}
                <motion.button
                  id={`sidebar-tab-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  whileHover={{ x: collapsed ? 0 : 3 }}
                  whileTap={{ scale: 0.98 }}
                  title={collapsed ? `${item.label} - ${item.description}` : undefined}
                  className={`relative w-full rounded-2xl transition-all flex items-center gap-3 p-2.5 text-left group overflow-hidden ${
                    isActive
                      ? isGameItem
                        ? 'bg-purple-950/80 text-white shadow-lg border border-pink-500/60'
                        : 'bg-slate-800/90 text-white shadow-lg border border-slate-700/80'
                      : isGameItem
                        ? 'text-pink-300/80 hover:text-pink-200 hover:bg-purple-950/40 border border-purple-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  } ${collapsed ? 'justify-center px-2' : ''}`}
                >
                  {/* Active Indicator Glow Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${item.accentColor} rounded-r-full shadow-lg shadow-cyan-500/50`}
                    />
                  )}

                  {/* Ambient active background shimmer */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.accentColor} opacity-10 pointer-events-none`} />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? `bg-gradient-to-br ${item.accentColor} text-slate-950 font-black shadow-md shadow-cyan-500/30 scale-105`
                        : isGameItem
                          ? 'bg-purple-950/90 text-pink-400 group-hover:text-pink-200 group-hover:bg-purple-900 border border-purple-500/30'
                          : 'bg-slate-900/90 text-slate-400 group-hover:text-white group-hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Text Labels & Badges (Only in expanded view) */}
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`text-xs font-bold truncate ${
                            isActive ? 'text-white font-extrabold' : isGameItem ? 'text-pink-200' : 'text-slate-300'
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                              item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                            } shrink-0`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] truncate transition-colors ${
                        isGameItem ? 'text-purple-300/70 group-hover:text-purple-200' : 'text-slate-500 group-hover:text-slate-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Panel: Sound Toggle, Discord Credits & Collapse */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          {/* Creator Credits Badge */}
          {!collapsed ? (
            <div 
              id="sidebar-dc-credit"
              onClick={handleCopyDiscord}
              className="p-2.5 rounded-2xl bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-500/30 transition-all cursor-pointer group"
              title="Click to copy Discord handle"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-indigo-200">
                      Credits: <span className="text-white">1_solas</span>
                    </div>
                    <div className="text-[9px] text-indigo-400/80 font-mono">
                      DC: 1304013684577665074
                    </div>
                  </div>
                </div>
                <div className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-[9px] font-bold text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors flex items-center gap-1">
                  {copiedDc ? (
                    <>
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCopyDiscord}
              title="Credits: 1_solas (1304013684577665074) - Click to copy"
              className="w-full h-9 rounded-xl bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </button>
          )}

          {/* Sound & Controls row */}
          <div className={`flex items-center gap-2 ${collapsed ? 'flex-col' : 'justify-between'}`}>
            <button
              id="sidebar-sound-toggle-btn"
              onClick={() => {
                onToggleSound();
                soundFX.playPop();
              }}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold ${
                soundEnabled
                  ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              } ${collapsed ? 'w-full justify-center' : 'flex-1'}`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {!collapsed && <span>Sound FX: ON</span>}
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />
                  {!collapsed && <span>Sound FX: OFF</span>}
                </>
              )}
            </button>

            {/* Collapse / Expand Toggle button (Desktop only) */}
            {!isMobileView && (
              <button
                id="sidebar-collapse-toggle-btn"
                onClick={() => {
                  soundFX.playPop();
                  onToggleCollapse();
                }}
                title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0"
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 1. Desktop Fixed Sidebar */}
      <aside
        id="main-sidebar"
        className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-r border-slate-800/80 shadow-2xl transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {renderSidebarContent(false)}
      </aside>

      {/* 2. Mobile / Tablet Top Header Bar */}
      <header className="lg:hidden sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSelectTab('crafter')}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md border border-cyan-300/40">
            <span>🏴‍☠️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-white">Blox Fruits Hub</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-extrabold border border-cyan-500/30">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.shortLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Discord Auth button */}
          <button
            id="mobile-auth-btn"
            onClick={() => {
              soundFX.playPop();
              setIsAuthModalOpen(true);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border shadow-sm ${
              authProfile.discord
                ? 'bg-indigo-950/90 border-indigo-500/60 text-indigo-200'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/40'
            }`}
            title="Authentication & Discord Login"
          >
            <Key className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-[11px]">{authProfile.discord ? `@${authProfile.discord.username.slice(0, 8)}` : 'Auth'}</span>
          </button>

          <button
            onClick={() => {
              onToggleSound();
              soundFX.playPop();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs"
            title="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => {
              soundFX.playPop();
              onToggleMobileMenu();
            }}
            className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleMobileMenu}
              className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 z-50 w-4/5 max-w-sm bg-slate-950 border-r border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onToggleMobileMenu}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderSidebarContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Auth Modal for mobile */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authProfile={authProfile}
        onProfileUpdated={setAuthProfile}
      />
    </>
  );
};
