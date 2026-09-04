import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  Save, 
  RotateCcw, 
  Flame, 
  Zap, 
  Tag, 
  Coins, 
  TrendingUp, 
  Search, 
  Database,
  Layers,
  UserCheck,
  Lock,
  LogOut,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FruitItem, 
  formatValueNumber, 
  getEffectiveFruitList, 
  getAdminAuthStatus, 
  setAdminAuthStatus, 
  loginAdminWithServer,
  saveFullItemOverride, 
  addCustomFruitItem, 
  removeUserValueOverride,
  getUserValueOverrides 
} from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';
import { SafeFruitImage } from './SafeFruitImage';
import { isValidImageUrl, sanitizeImageUrl } from '../utils/imageUtils';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminUsername?: string;
}

type AdminTab = 'edit_values' | 'add_new';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  adminUsername = 'Admin'
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAdminAuthStatus());
  const [adminUser, setAdminUser] = useState<string>(adminUsername);
  const [loginUsernameInput, setLoginUsernameInput] = useState<string>('');
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('edit_values');
  
  // Edit Tab State
  const [allItems, setAllItems] = useState<FruitItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const selectedItemIdRef = useRef<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');

  useEffect(() => {
    selectedItemIdRef.current = selectedItemId;
  }, [selectedItemId]);
  
  // Form fields for editing
  const [editName, setEditName] = useState<string>('');
  const [editPhysicalValue, setEditPhysicalValue] = useState<string>('0');
  const [editPermanentValue, setEditPermanentValue] = useState<string>('');
  const [editBeliPrice, setEditBeliPrice] = useState<string>('');
  const [editRobuxPrice, setEditRobuxPrice] = useState<string>('');
  const [editDemand, setEditDemand] = useState<number>(8);
  const [editTrend, setEditTrend] = useState<'rising' | 'stable' | 'dropping' | 'hyped'>('hyped');
  const [editPvpTier, setEditPvpTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [editGrindTier, setEditGrindTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [editEmoji, setEditEmoji] = useState<string>('🍎');
  const [editIconUrl, setEditIconUrl] = useState<string>('');
  const [editAccentColor, setEditAccentColor] = useState<string>('#38bdf8');
  const [editWidgetTag, setEditWidgetTag] = useState<string>('');
  const [editUpdateNote, setEditUpdateNote] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  
  // Add New Item State
  const [newName, setNewName] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'fruit' | 'permanent' | 'gamepass' | 'sword'>('fruit');
  const [newRarity, setNewRarity] = useState<'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common'>('Mythical');
  const [newType, setNewType] = useState<'Natural' | 'Elemental' | 'Beast'>('Beast');
  const [newPhysicalValue, setNewPhysicalValue] = useState<string>('500000000');
  const [newPermanentValue, setNewPermanentValue] = useState<string>('2000000000');
  const [newBeliPrice, setNewBeliPrice] = useState<string>('4000000');
  const [newRobuxPrice, setNewRobuxPrice] = useState<string>('2400');
  const [newDemand, setNewDemand] = useState<number>(9);
  const [newTrend, setNewTrend] = useState<'rising' | 'stable' | 'dropping' | 'hyped'>('hyped');
  const [newPvpTier, setNewPvpTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [newGrindTier, setNewGrindTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [newEmoji, setNewEmoji] = useState<string>('🔥');
  const [newIconUrl, setNewIconUrl] = useState<string>('');
  const [newAccentColor, setNewAccentColor] = useState<string>('#f97316');
  const [newWidgetTag, setNewWidgetTag] = useState<string>('ADMIN INJECTED');
  const [newDescription, setNewDescription] = useState<string>('Custom fruit item added via Admin Management Panel.');
  const [newUpdateNote, setNewUpdateNote] = useState<string>('Injected by Moderator Admin into live Blox Fruits matrix.');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Sync items
  const reloadData = () => {
    const list = getEffectiveFruitList();
    setAllItems(list);
    const currId = selectedItemIdRef.current;
    if (list.length > 0) {
      if (!currId) {
        loadItemForEdit(list[0]);
      } else {
        const existing = list.find(i => i.id === currId);
        if (!existing) {
          loadItemForEdit(list[0]);
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const auth = getAdminAuthStatus();
      setIsAuthenticated(auth);
      if (adminUsername && adminUsername !== 'Admin') {
        setAdminUser(adminUsername);
      }
      if (auth) {
        reloadData();
      }
    } else {
      setLoginError(null);
      setLoginPasswordInput('');
    }
  }, [isOpen, adminUsername]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = loginUsernameInput.trim();
    const p = loginPasswordInput.trim();
    if (!u || !p) {
      setLoginError('Both admin username and password are required.');
      soundFX.playPop();
      return;
    }
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await loginAdminWithServer(u, p);
      if (res.success) {
        setAdminAuthStatus(true);
        setIsAuthenticated(true);
        setAdminUser(res.account?.displayName || res.account?.username || u);
        soundFX.playWin();
        reloadData();
      } else {
        soundFX.playPop();
        setLoginError(res.error || 'Access Denied: Invalid admin username or password.');
      }
    } catch {
      soundFX.playPop();
      setLoginError('Verification failed. Check network or server status.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const handleDataUpdate = () => {
      reloadData();
    };
    window.addEventListener('blox_fruits_custom_data_updated', handleDataUpdate);
    return () => {
      window.removeEventListener('blox_fruits_custom_data_updated', handleDataUpdate);
    };
  }, []);

  const loadItemForEdit = (item: FruitItem) => {
    selectedItemIdRef.current = item.id;
    setSelectedItemId(item.id);
    setEditName(item.name);
    setEditPhysicalValue(item.physicalValue.toString());
    setEditPermanentValue(item.permanentValue ? item.permanentValue.toString() : '');
    setEditBeliPrice(item.beliPrice ? item.beliPrice.toString() : '');
    setEditRobuxPrice(item.robuxPrice ? item.robuxPrice.toString() : '');
    setEditDemand(item.demand);
    setEditTrend(item.trend);
    setEditPvpTier(item.pvpTier || 'A');
    setEditGrindTier(item.grindTier || 'A');
    setEditEmoji(item.imageEmoji || '🍎');
    setEditIconUrl(item.iconUrl || '');
    setEditAccentColor(item.accentColor || '#38bdf8');
    setEditWidgetTag(item.widgetTag || '');
    setEditUpdateNote(item.updateNote || '');
    setEditDescription(item.description || '');
    setSaveSuccessMsg(null);
  };

  const parseValueInput = (val: string): number => {
    if (!val) return 0;
    const clean = val.replace(/,/g, '').trim().toLowerCase();
    if (clean.endsWith('b')) return (parseFloat(clean) || 0) * 1_000_000_000;
    if (clean.endsWith('m')) return (parseFloat(clean) || 0) * 1_000_000;
    if (clean.endsWith('k')) return (parseFloat(clean) || 0) * 1_000;
    return parseFloat(clean) || 0;
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId) return;

    soundFX.playWin();
    const physVal = parseValueInput(editPhysicalValue);
    const permVal = editPermanentValue.trim() ? parseValueInput(editPermanentValue) : undefined;
    const beli = editBeliPrice.trim() ? parseValueInput(editBeliPrice) : undefined;
    const robux = editRobuxPrice.trim() ? parseValueInput(editRobuxPrice) : undefined;

    saveFullItemOverride(selectedItemId, {
      name: editName.trim(),
      physicalValue: physVal,
      permanentValue: permVal,
      beliPrice: beli,
      robuxPrice: robux,
      demand: editDemand,
      trend: editTrend,
      pvpTier: editPvpTier,
      grindTier: editGrindTier,
      imageEmoji: editEmoji.trim(),
      iconUrl: editIconUrl.trim() || undefined,
      accentColor: editAccentColor,
      widgetTag: editWidgetTag.trim() || undefined,
      updateNote: editUpdateNote.trim() || undefined,
      description: editDescription.trim() || undefined,
    });

    setSaveSuccessMsg(`✅ "${editName}" updated successfully! Changes are live across all tools & AI.`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
    reloadData();
    const updatedList = getEffectiveFruitList();
    const target = updatedList.find(i => i.id === selectedItemId);
    if (target) loadItemForEdit(target);
  };

  const handleResetCurrentOverride = () => {
    if (!selectedItemId) return;
    soundFX.playPop();
    removeUserValueOverride(selectedItemId);
    reloadData();
    const list = getEffectiveFruitList();
    const target = list.find(i => i.id === selectedItemId);
    if (target) loadItemForEdit(target);
    setSaveSuccessMsg(`🔄 Reset "${editName}" to original base values.`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    soundFX.playWin();
    const generatedId = newName.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now();
    const physVal = Number(newPhysicalValue) || 0;
    const permVal = newPermanentValue ? Number(newPermanentValue) : undefined;
    const beli = newBeliPrice ? Number(newBeliPrice) : undefined;
    const robux = newRobuxPrice ? Number(newRobuxPrice) : undefined;

    const newItem: FruitItem = {
      id: generatedId,
      name: newName.trim(),
      category: newCategory,
      rarity: newRarity,
      type: newType,
      physicalValue: physVal,
      permanentValue: permVal,
      beliPrice: beli,
      robuxPrice: robux,
      demand: newDemand,
      trend: newTrend,
      pvpTier: newPvpTier,
      grindTier: newGrindTier,
      imageEmoji: newEmoji.trim() || '🔥',
      iconUrl: newIconUrl.trim() || undefined,
      accentColor: newAccentColor,
      widgetTag: newWidgetTag.trim() || undefined,
      description: newDescription.trim() || 'Custom item added by Admin.',
      updateNote: newUpdateNote.trim() || 'Admin injected item into live Blox Fruits engine.',
      isCustomAdded: true,
      isNewOrReworked: true,
    };

    addCustomFruitItem(newItem);
    setSaveSuccessMsg(`🎉 "${newName}" successfully created and injected into all trade calculators & AI!`);
    setNewName('');
    setActiveTab('edit_values');
    reloadData();
    setSelectedItemId(generatedId);
    loadItemForEdit(newItem);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleLogout = () => {
    soundFX.playPop();
    setAdminAuthStatus(false);
    setIsAuthenticated(false);
    setLoginPasswordInput('');
    onClose();
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-blue-500/40 rounded-3xl shadow-2xl shadow-blue-950/70 overflow-hidden my-auto text-slate-100 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">Staff Authentication</h3>
                  <p className="text-xs text-blue-300 font-mono">Restricted Admin Access</p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playPop();
                  onClose();
                }}
                className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Admin & Moderator credentials required. Unauthorized access attempts are monitored and blocked.
                </span>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-semibold flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginUsernameInput}
                    onChange={(e) => setLoginUsernameInput(e.target.value)}
                    placeholder="e.g. bhuttu or Moderator ID"
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-700 focus:border-blue-500 focus:outline-none text-sm text-white placeholder-slate-500 font-medium"
                    autoFocus
                    required
                  />
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Password / Passkey
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPasswordInput}
                    onChange={(e) => setLoginPasswordInput(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-700 focus:border-blue-500 focus:outline-none text-sm text-white placeholder-slate-500 font-mono"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate As Staff</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playPop();
                    onClose();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-blue-500/40 rounded-3xl shadow-2xl shadow-blue-950/70 overflow-hidden my-auto text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative p-5 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white tracking-tight">Admin Management Panel</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    MODERATOR ACCESS
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Logged in as <strong className="text-blue-300">@{adminUsername}</strong> • Live Fruit & Value Override Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playPop();
                  onClose();
                }}
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reversibility Notice & Sync Now Trigger */}
          <div className="px-5 py-2.5 bg-blue-950/30 border-b border-blue-500/20 text-[11px] text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                <strong>Admin Notice:</strong> All item values and new fruits added here apply live across the trading calculator, database, and AI engine.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFX.playPop();
                reloadData();
                setSaveSuccessMsg('🔄 Successfully synchronized current fruit values from the browser synchronization layer!');
                setTimeout(() => setSaveSuccessMsg(null), 4000);
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Force re-fetch of current fruit values from synchronization layer"
            >
              <RotateCcw className="w-3.5 h-3.5 animate-spin-once" />
              <span>Sync Now</span>
            </button>
          </div>

          {/* Success Banner */}
          {saveSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 py-2.5 bg-emerald-950/80 border-b border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </motion.div>
          )}

          {/* Main Scrollable Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Tabs Navigation */}
            <div className="flex gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
              <button
                onClick={() => {
                  soundFX.playPop();
                  setActiveTab('edit_values');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'edit_values'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>Change Fruit & Item Values</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playPop();
                  setActiveTab('add_new');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'add_new'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Fruit Permanently</span>
              </button>
            </div>

            {/* TAB 1: EDIT VALUES */}
            {activeTab === 'edit_values' && (
              <div className="space-y-4">
                {/* Item Selector */}
                <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-blue-400" />
                      <span>Select Fruit / Item to Change:</span>
                    </label>
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search fruit name..."
                      className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1 no-scrollbar">
                    {allItems
                      .filter(i => i.name.toLowerCase().includes(searchFilter.toLowerCase()))
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            soundFX.playPop();
                            loadItemForEdit(item);
                          }}
                          className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all cursor-pointer ${
                            selectedItemId === item.id
                              ? 'bg-blue-950/90 border-blue-400 text-blue-200 shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-lg shrink-0">{item.imageEmoji || '🍎'}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{formatValueNumber(item.physicalValue)}</p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSaveEdit} className="p-4 sm:p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{editEmoji}</span>
                      <div>
                        <h4 className="text-sm font-black text-white">{editName}</h4>
                        <span className="text-[10px] text-blue-400 font-mono">Target: {selectedItemId}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetCurrentOverride}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Reset this item to default base values"
                      >
                        <RotateCcw className="w-3 h-3 text-amber-400" />
                        <span>Reset Item</span>
                      </button>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        Current: {formatValueNumber(Number(editPhysicalValue) || 0)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Physical Trading Value (e.g. 3.5B, 500M, 500000000)</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={editPhysicalValue}
                        onChange={(e) => setEditPhysicalValue(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                        placeholder="e.g. 500M or 500000000"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Permanent Trading Value (e.g. 2B)</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={editPermanentValue}
                        onChange={(e) => setEditPermanentValue(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-purple-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                        placeholder="e.g. 2B or 2000000000"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Demand Rating (1-10)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editDemand}
                        onChange={(e) => setEditDemand(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Market Trend</label>
                      <select
                        value={editTrend}
                        onChange={(e) => setEditTrend(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                      >
                        <option value="hyped">🔥 Hyped / Skyrocketing</option>
                        <option value="rising">📈 Rising</option>
                        <option value="stable">⚖️ Stable</option>
                        <option value="dropping">📉 Dropping</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Icon Emoji</label>
                      <input
                        type="text"
                        value={editEmoji}
                        onChange={(e) => setEditEmoji(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-center font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-400 font-bold text-xs flex items-center gap-1.5">
                          <span>Fruit Image URL (Fandom, Wikia, Roblox CDN)</span>
                          {editIconUrl && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isValidImageUrl(editIconUrl) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'}`}>
                              {isValidImageUrl(editIconUrl) ? 'Valid URL Format' : 'Invalid URL Format'}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="url"
                          value={editIconUrl}
                          onChange={(e) => setEditIconUrl(e.target.value)}
                          placeholder="https://static.wikia.nocookie.net/bloxfruits/images/...png"
                          className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-blue-500"
                        />
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                          {editIconUrl ? (
                            <SafeFruitImage
                              src={editIconUrl}
                              alt={editName || 'Fruit'}
                              category="fruit"
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span className="text-sm">{editEmoji}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1 text-xs">Admin Reason / Update Note</label>
                    <input
                      type="text"
                      value={editUpdateNote}
                      onChange={(e) => setEditUpdateNote(e.target.value)}
                      placeholder="e.g. Adjusted after latest game update trade hype"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Live Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: ADD NEW FRUIT */}
            {activeTab === 'add_new' && (
              <form onSubmit={handleCreateNewItem} className="p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <Flame className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-black text-white">Inject New Fruit into Live Platform</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Fruit Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Celestial Dragon"
                      required
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                    >
                      <option value="fruit">Blox Fruit (Physical & Perm)</option>
                      <option value="gamepass">Gamepass</option>
                      <option value="sword">Sword / Special</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Rarity</label>
                    <select
                      value={newRarity}
                      onChange={(e) => setNewRarity(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                    >
                      <option value="Mythical">👑 Mythical</option>
                      <option value="Legendary">💎 Legendary</option>
                      <option value="Rare">✨ Rare</option>
                      <option value="Uncommon">🟢 Uncommon</option>
                      <option value="Common">⚪ Common</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Physical Trading Value</label>
                    <input
                      type="number"
                      value={newPhysicalValue}
                      onChange={(e) => setNewPhysicalValue(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Permanent Trading Value</label>
                    <input
                      type="number"
                      value={newPermanentValue}
                      onChange={(e) => setNewPermanentValue(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-purple-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Demand (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newDemand}
                      onChange={(e) => setNewDemand(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Fruit Emoji</label>
                    <input
                      type="text"
                      value={newEmoji}
                      onChange={(e) => setNewEmoji(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-center font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-400 font-bold text-xs flex items-center gap-1.5">
                        <span>Fruit Image URL (Fandom, Wikia, Roblox CDN)</span>
                        {newIconUrl && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isValidImageUrl(newIconUrl) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'}`}>
                            {isValidImageUrl(newIconUrl) ? 'Valid URL Format' : 'Invalid URL Format'}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="url"
                        value={newIconUrl}
                        onChange={(e) => setNewIconUrl(e.target.value)}
                        placeholder="https://static.wikia.nocookie.net/bloxfruits/images/...png"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                        {newIconUrl ? (
                          <SafeFruitImage
                            src={newIconUrl}
                            alt={newName || 'Fruit'}
                            category={newRarity || 'Fruit'}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <span className="text-sm">{newEmoji || '🔥'}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Market Trend</label>
                    <select
                      value={newTrend}
                      onChange={(e) => setNewTrend(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                    >
                      <option value="hyped">🔥 Hyped</option>
                      <option value="rising">📈 Rising</option>
                      <option value="stable">⚖️ Stable</option>
                      <option value="dropping">📉 Dropping</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Widget Tag</label>
                    <input
                      type="text"
                      value={newWidgetTag}
                      onChange={(e) => setNewWidgetTag(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1 text-xs">Fruit Description</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create & Inject Fruit Live</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
