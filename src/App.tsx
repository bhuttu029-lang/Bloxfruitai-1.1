import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FruitItem, TradeSideItem, BLOX_FRUITS_DATA, getEffectiveFruitList, syncFruitDataWithServer } from './data/bloxFruitsData';
import { initRealtimeFirebaseSync } from './lib/firebaseSync';
import { Sidebar, NavTabType } from './components/Sidebar';
import { TopHud } from './components/TopHud';
import { VfxBackground } from './components/VfxBackground';
import { BuildCrafter } from './components/BuildCrafter';
import { SeaProgressionGuide } from './components/SeaProgressionGuide';
import { TradeCalculator } from './components/TradeCalculator';
import { ValuesDatabase } from './components/ValuesDatabase';
import { ObtainmentExplorer } from './components/ObtainmentExplorer';
import { MasterKnowledgeFaq } from './components/MasterKnowledgeFaq';
import { MyChecklist } from './components/MyChecklist';
import { AiOracleChat } from './components/AiOracleChat';
import { TradeLadderNavigator } from './components/TradeLadderNavigator';
import { MutationLab } from './components/MutationLab';
import { SuggestionsBoard } from './components/SuggestionsBoard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ItemSelectorModal } from './components/ItemSelectorModal';
import { CopyrightSecurityModal } from './components/CopyrightSecurityModal';
import { SecretOwnerVaultModal } from './components/SecretOwnerVaultModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { initSecurityProtection, COPYRIGHT_DATA } from './utils/security';
import { initContinuousBrowserWikiSync } from './utils/browserWikiSync';
import { soundFX } from './utils/audio';
import { AppTheme, getStoredTheme, setStoredTheme, applyThemeClass } from './utils/theme';
import { Flame, Swords, Compass, Bot, Calculator, Database, BookOpen, Brain, ShieldCheck, Lock, AlertTriangle, CheckSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('sensei');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(getStoredTheme());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [senseiQuery, setSenseiQuery] = useState<string>('');
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState<boolean>(false);
  const [isOwnerVaultOpen, setIsOwnerVaultOpen] = useState<boolean>(false);
  const [prefillOwnerKey, setPrefillOwnerKey] = useState<string>('');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [activeAdminUsername, setActiveAdminUsername] = useState<string>('Admin');
  const [securityToast, setSecurityToast] = useState<string | null>(null);

  // Initialize anti-tamper security protection, console warnings, direct free browser wiki sync, and cloud sync
  useEffect(() => {
    initContinuousBrowserWikiSync();
    const unsubRealtime = initRealtimeFirebaseSync();
    const cleanup = initSecurityProtection((alertMsg) => {
      setSecurityToast(alertMsg);
      setTimeout(() => setSecurityToast(null), 4000);
    });
    return () => {
      cleanup();
      unsubRealtime();
    };
  }, []);

  // Listen for secret grandmaster control & admin panel opening events from chat unlock sequences
  useEffect(() => {
    const handleOpenVault = (e: any) => {
      if (e.detail?.prefillKey) {
        setPrefillOwnerKey(e.detail.prefillKey);
      }
      setIsOwnerVaultOpen(true);
    };
    const handleOpenAdminPanel = (e: any) => {
      if (e.detail?.username) {
        setActiveAdminUsername(e.detail.username);
      }
      setIsAdminPanelOpen(true);
    };

    window.addEventListener('blox_fruits_open_owner_vault', handleOpenVault);
    window.addEventListener('blox_fruits_open_admin_panel', handleOpenAdminPanel);

    return () => {
      window.removeEventListener('blox_fruits_open_owner_vault', handleOpenVault);
      window.removeEventListener('blox_fruits_open_admin_panel', handleOpenAdminPanel);
    };
  }, []);

  // Trade state: You give vs They give (Persisted in localStorage with manual overrides preserved)
  const [yourItems, setYourItems] = useState<TradeSideItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('blox_fruits_trade_your_items_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    const effective = getEffectiveFruitList();
    const dogBlade = effective.find((i) => i.id === 'dog-blade') || effective[0];
    return dogBlade ? [{ uid: 'init-1', item: dogBlade, isPermanent: false }] : [];
  });

  const [theirItems, setTheirItems] = useState<TradeSideItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('blox_fruits_trade_their_items_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    const effective = getEffectiveFruitList();
    const kitsune = effective.find((i) => i.id === 'kitsune') || effective[1];
    return kitsune ? [{ uid: 'init-2', item: kitsune, isPermanent: false }] : [];
  });

  // Persist trade state to window.localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('blox_fruits_trade_your_items_v2', JSON.stringify(yourItems));
      localStorage.setItem('blox_fruits_trade_their_items_v2', JSON.stringify(theirItems));
    } catch (e) {
      console.error('Failed to sync trade items to localStorage:', e);
    }
  }, [yourItems, theirItems]);

  // Keep trade item values updated when manual overrides or custom fruit data change
  useEffect(() => {
    const handleOverridesUpdate = () => {
      const effectiveList = getEffectiveFruitList();
      const effectiveMap = new Map(effectiveList.map((i) => [i.id, i]));

      setYourItems((prev) =>
        prev.map((tradeItem) => {
          const updatedFruit = effectiveMap.get(tradeItem.item.id);
          return updatedFruit ? { ...tradeItem, item: updatedFruit } : tradeItem;
        })
      );

      setTheirItems((prev) =>
        prev.map((tradeItem) => {
          const updatedFruit = effectiveMap.get(tradeItem.item.id);
          return updatedFruit ? { ...tradeItem, item: updatedFruit } : tradeItem;
        })
      );
    };

    // Auto-sync server overrides on mount
    syncFruitDataWithServer();

    window.addEventListener('blox_fruits_overrides_updated', handleOverridesUpdate);
    window.addEventListener('blox_fruits_custom_data_updated', handleOverridesUpdate);

    return () => {
      window.removeEventListener('blox_fruits_overrides_updated', handleOverridesUpdate);
      window.removeEventListener('blox_fruits_custom_data_updated', handleOverridesUpdate);
    };
  }, []);

  // Modal states
  const [selectorTargetSide, setSelectorTargetSide] = useState<'you' | 'them' | null>(null);
  const [inspectedItem, setInspectedItem] = useState<FruitItem | null>(null);

  // Add Item to side
  const handleAddItem = (side: 'you' | 'them', item: FruitItem, isPermanent: boolean) => {
    const newItem: TradeSideItem = {
      uid: `${item.id}-${isPermanent ? 'perm' : 'phys'}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      item,
      isPermanent
    };

    if (side === 'you') {
      if (yourItems.length < 4) {
        setYourItems((prev) => [...prev, newItem]);
      }
    } else {
      if (theirItems.length < 4) {
        setTheirItems((prev) => [...prev, newItem]);
      }
    }
  };

  // Remove Item from side
  const handleRemoveItem = (side: 'you' | 'them', uid: string) => {
    if (side === 'you') {
      setYourItems((prev) => prev.filter((i) => i.uid !== uid));
    } else {
      setTheirItems((prev) => prev.filter((i) => i.uid !== uid));
    }
  };

  // Clear all items
  const handleClearTrade = () => {
    setYourItems([]);
    setTheirItems([]);
  };

  // Swap sides
  const handleSwapSides = () => {
    const temp = [...yourItems];
    setYourItems([...theirItems]);
    setTheirItems(temp);
  };

  // Apply Preset
  const handleApplyPreset = (
    yourList: { id: string; perm?: boolean }[],
    theirList: { id: string; perm?: boolean }[]
  ) => {
    const effectiveList = getEffectiveFruitList();
    const newYour: TradeSideItem[] = [];
    yourList.forEach((entry, idx) => {
      const found = effectiveList.find((i) => i.id === entry.id);
      if (found) {
        newYour.push({
          uid: `preset-y-${idx}-${Date.now()}`,
          item: found,
          isPermanent: !!entry.perm
        });
      }
    });

    const newTheir: TradeSideItem[] = [];
    theirList.forEach((entry, idx) => {
      const found = effectiveList.find((i) => i.id === entry.id);
      if (found) {
        newTheir.push({
          uid: `preset-t-${idx}-${Date.now()}`,
          item: found,
          isPermanent: !!entry.perm
        });
      }
    });

    setYourItems(newYour);
    setTheirItems(newTheir);
  };

  // Send from Trade Ladder to Calculator
  const handleSendToCalculatorFromLadder = (giveIds: string[], receiveIds: string[]) => {
    const effectiveList = getEffectiveFruitList();
    const newYour: TradeSideItem[] = [];
    giveIds.forEach((id, idx) => {
      const found = effectiveList.find((i) => i.id.toLowerCase() === id.toLowerCase());
      if (found) {
        newYour.push({
          uid: `ladder-y-${idx}-${Date.now()}`,
          item: found,
          isPermanent: false
        });
      }
    });

    const newTheir: TradeSideItem[] = [];
    receiveIds.forEach((id, idx) => {
      const found = effectiveList.find((i) => i.id.toLowerCase() === id.toLowerCase());
      if (found) {
        newTheir.push({
          uid: `ladder-t-${idx}-${Date.now()}`,
          item: found,
          isPermanent: id.startsWith('perm-')
        });
      }
    });

    setYourItems(newYour);
    setTheirItems(newTheir);
    setActiveTab('calculator');
  };

  return (
    <div className={`min-h-screen ${applyThemeClass(currentTheme).bgClass} flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden transition-colors duration-500`}>
      {/* Ambient Particle & Haki Aura Background */}
      <VfxBackground />

      {/* Side Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const res = soundFX.toggleMute();
          setSoundEnabled(res);
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Content Area with Dynamic Padding for Sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 relative z-10 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Top HUD Banner with Animated Status, Moon Timer & Dev Credits */}
          <TopHud
            activeTab={activeTab}
            onTabChange={setActiveTab}
            soundEnabled={soundEnabled}
            onToggleSound={() => {
              const res = soundFX.toggleMute();
              setSoundEnabled(res);
            }}
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />

          {/* Animated Tab Content Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full"
            >
              {/* 0. Personal Obtainment & Collection Checklist */}
              {activeTab === 'checklist' && (
                <MyChecklist
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 1. Solas Blox Fruits Grandmaster AI */}
              {activeTab === 'sensei' && (
                <AiOracleChat
                  currentTrade={{
                    yourItems,
                    theirItems
                  }}
                  initialQuery={senseiQuery}
                />
              )}

              {/* 2. Trade Ladder & Profit Path Navigator ("Zero to Kitsune") */}
              {activeTab === 'tradeladder' && (
                <TradeLadderNavigator
                  onSendToCalculator={handleSendToCalculatorFromLadder}
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 3. My Checklist (Swords, Guns, Accessories, V4, Titles) */}
              {activeTab === 'checklist' && (
                <MyChecklist
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 4. PvP & Combo Builder */}
              {activeTab === 'crafter' && (
                <BuildCrafter
                  onAskSenseiAboutBuild={() => {
                    setSenseiQuery('What is the highest damage PvP combo and build right now?');
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 5. 33 FAQs & Race V4 Gears Codex */}
              {activeTab === 'faq' && (
                <MasterKnowledgeFaq
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 6. Obtainment & Drop Guide Codex */}
              {activeTab === 'obtainment' && (
                <ObtainmentExplorer
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 7. Sea Progression & Leveling Guide */}
              {activeTab === 'progression' && (
                <SeaProgressionGuide />
              )}

              {/* 8. Trade Matrix & Calculator */}
              {activeTab === 'calculator' && (
                <TradeCalculator
                  yourItems={yourItems}
                  theirItems={theirItems}
                  onOpenSelector={(side) => setSelectorTargetSide(side)}
                  onRemoveItem={handleRemoveItem}
                  onClearTrade={handleClearTrade}
                  onSwapSides={handleSwapSides}
                  onApplyPreset={handleApplyPreset}
                  onInspectItem={(item) => setInspectedItem(item)}
                  onAskAiWithCurrentTrade={() => {
                    setSenseiQuery('Evaluate my current trade and explain if it is a win or loss.');
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 9. Wiki & Values Database */}
              {activeTab === 'database' && (
                <ValuesDatabase
                  onSelectItem={(item) => setInspectedItem(item)}
                  onAddToYou={(item, isPerm) => {
                    handleAddItem('you', item, isPerm);
                    setActiveTab('calculator');
                  }}
                  onAddToThem={(item, isPerm) => {
                    handleAddItem('them', item, isPerm);
                    setActiveTab('calculator');
                  }}
                />
              )}

              {/* 10. Blox Fruit Mutation Game & Combat Arena (Arcade Mini-Game RPG) */}
              {activeTab === 'mutationlab' && (
                <MutationLab
                  onAskSensei={(query) => {
                    setSenseiQuery(query);
                    setActiveTab('sensei');
                  }}
                />
              )}

              {/* 11. Community Suggestions Hub (Remembered for Life) */}
              {activeTab === 'suggestions' && (
                <SuggestionsBoard />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Selector Modal */}
        <ItemSelectorModal
          isOpen={selectorTargetSide !== null}
          targetSide={selectorTargetSide || 'you'}
          onClose={() => setSelectorTargetSide(null)}
          onSelect={(item, isPermanent) => {
            if (selectorTargetSide) {
              handleAddItem(selectorTargetSide, item, isPermanent);
            }
          }}
        />

        {/* Item Detail Modal */}
        <ItemDetailModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
          onAddToYou={(item, isPerm) => {
            handleAddItem('you', item, isPerm);
            setActiveTab('calculator');
          }}
          onAddToThem={(item, isPerm) => {
            handleAddItem('them', item, isPerm);
            setActiveTab('calculator');
          }}
        />

        {/* Security & Copyright Certificate Modal */}
        <CopyrightSecurityModal
          isOpen={isCopyrightModalOpen}
          onClose={() => setIsCopyrightModalOpen(false)}
        />

        {/* Grandmaster Control Modal (Sequence: 477047704770 -> mouse4770) */}
        <SecretOwnerVaultModal
          isOpen={isOwnerVaultOpen}
          onClose={() => setIsOwnerVaultOpen(false)}
          initialPrefillKey={prefillOwnerKey}
        />

        {/* Admin Management Panel Modal */}
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          adminUsername={activeAdminUsername}
        />

        {/* Anti-Tamper / Security Warning Toast */}
        <AnimatePresence>
          {securityToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 border border-red-500/50 shadow-2xl shadow-red-950/60 text-slate-100 flex items-start gap-3 backdrop-blur-xl"
            >
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 text-xs">
                <h5 className="font-bold text-red-300">Security & Copyright Alert</h5>
                <p className="text-slate-300 mt-0.5 leading-relaxed">{securityToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl py-6 text-center text-xs text-slate-400 mt-8 relative">
          <div className="max-w-7xl mx-auto px-4 space-y-4">
            {/* 6 Free Limits Rule & AI Disclaimer Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-left">
                <span className="text-base">🛡️</span>
                <span>
                  <strong className="text-cyan-300 font-bold">Search Policy:</strong> You have <strong>6 free search limits</strong> per 12 hours. After that, you have to stop or authorize your Discord account to get 12 searches per 12 hours.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-amber-300 text-[11px] font-semibold">⚠️ AI can make mistakes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <p className="text-slate-300 font-bold">© 2026 Blox Fruits Master Hub • All Rights Reserved</p>
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      setIsCopyrightModalOpen(true);
                    }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 transition-all"
                    title="View Official Security & Copyright Certificate"
                  >
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>VERIFIED LICENSE</span>
                  </button>
                </div>
                <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">
                  Sole Author & Intellectual Property Owner: <strong className="text-white">1_solas</strong> (DC: 1304013684577665074)
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-slate-400 text-[11px] flex-wrap justify-center sm:justify-end">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setIsCopyrightModalOpen(true);
                  }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-slate-300 font-medium cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Security & Copyright</span>
                </button>
                <span>•</span>
                <span className="font-mono text-slate-500">SHA-256 Protected</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

