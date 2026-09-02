import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Key, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Flame, 
  Crown, 
  Zap, 
  Tag, 
  Coins, 
  TrendingUp, 
  Search, 
  AlertTriangle,
  Eye,
  EyeOff,
  Database,
  Terminal,
  Layers,
  Lightbulb,
  MessageSquarePlus,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  Mail,
  RefreshCw,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FruitItem, 
  formatValueNumber, 
  getEffectiveFruitList, 
  loginOwnerWithServer,
  verifyOwnerOtpWithServer,
  resendOwnerOtpWithServer,
  logoutFromServer,
  getOwnerAuthStatus, 
  setOwnerAuthStatus, 
  saveFullItemOverride, 
  removeUserValueOverride,
  addCustomFruitItem, 
  deleteFruitItemPermanently, 
  restoreDefaultDatabase, 
  exportDatabaseToJson, 
  importDatabaseFromJson, 
  getCustomAddedItems, 
  getUserValueOverrides,
  AdminAccount,
  getStoredAdminAccounts,
  createOrUpdateAdminAccount,
  deleteAdminAccount,
  CustomResponseEntry,
  getStoredCustomResponses,
  addCustomResponse,
  updateCustomResponse,
  deleteCustomResponse,
  toggleCustomResponseStatus,
  pushFruitDataToServer
} from '../data/bloxFruitsData';
import { seedBackupDataToFirebase } from '../lib/firebaseSync';
import { soundFX } from '../utils/audio';
import { getStoredSuggestions, saveStoredSuggestions, VisitorSuggestion } from './SuggestionsBoard';

interface SecretOwnerVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrefillKey?: string;
}

type VaultTab = 'edit_values' | 'add_new' | 'custom_responses' | 'manage_items' | 'backup_export' | 'manage_suggestions' | 'manage_admins' | 'discord_webhooks';

export const SecretOwnerVaultModal: React.FC<SecretOwnerVaultModalProps> = ({
  isOpen,
  onClose,
  initialPrefillKey = ''
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [step1Input, setStep1Input] = useState<string>('');
  const [keyInput, setKeyInput] = useState<string>(initialPrefillKey);
  const [showKeyText, setShowKeyText] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<VaultTab>('edit_values');
  
  // Step 3 Gmail OTP state
  const [isOtpPending, setIsOtpPending] = useState<boolean>(false);
  const [otpToken, setOtpToken] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [maskedEmail, setMaskedEmail] = useState<string>('bh***29@gmail.com');
  const [otpTimerSeconds, setOtpTimerSeconds] = useState<number>(300);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isOtpPending && otpTimerSeconds > 0) {
      interval = setInterval(() => {
        setOtpTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOtpPending, otpTimerSeconds]);

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
  const [editAccentColor, setEditAccentColor] = useState<string>('#38bdf8');
  const [editWidgetTag, setEditWidgetTag] = useState<string>('');
  const [editUpdateNote, setEditUpdateNote] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  
  // Add New Item State
  const [newName, setNewName] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'fruit' | 'permanent' | 'gamepass' | 'sword'>('fruit');
  const [newRarity, setNewRarity] = useState<'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common'>('Mythical');
  const [newType, setNewType] = useState<'Natural' | 'Elemental' | 'Beast'>('Beast');
  const [newPhysicalValue, setNewPhysicalValue] = useState<string>('1000000000');
  const [newPermanentValue, setNewPermanentValue] = useState<string>('3000000000');
  const [newBeliPrice, setNewBeliPrice] = useState<string>('5000000');
  const [newRobuxPrice, setNewRobuxPrice] = useState<string>('2500');
  const [newDemand, setNewDemand] = useState<number>(9);
  const [newTrend, setNewTrend] = useState<'rising' | 'stable' | 'dropping' | 'hyped'>('hyped');
  const [newPvpTier, setNewPvpTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [newGrindTier, setNewGrindTier] = useState<'S+' | 'S' | 'A' | 'B' | 'C'>('S+');
  const [newEmoji, setNewEmoji] = useState<string>('⚡👑');
  const [newAccentColor, setNewAccentColor] = useState<string>('#a855f7');
  const [newWidgetTag, setNewWidgetTag] = useState<string>('2026 OWNER LEAK');
  const [newDescription, setNewDescription] = useState<string>('Exclusive Grandmaster item added via secure control center.');
  const [newUpdateNote, setNewUpdateNote] = useState<string>('Grandmaster injected item into live Blox Fruits engine.');

  // JSON backup state
  const [jsonBackupText, setJsonBackupText] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Suggestions state
  const [adminSuggestions, setAdminSuggestions] = useState<VisitorSuggestion[]>(() => getStoredSuggestions());

  // Admin Account Management State
  const [adminAccountsList, setAdminAccountsList] = useState<AdminAccount[]>(() => getStoredAdminAccounts());
  const [newAdminUsername, setNewAdminUsername] = useState<string>('');
  const [newAdminPassword, setNewAdminPassword] = useState<string>('');
  const [newAdminDisplayName, setNewAdminDisplayName] = useState<string>('');
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);

  // Discord Webhooks State
  const [selectedChannelId, setSelectedChannelId] = useState<string>('channel_1');
  const [customWebhookUrl, setCustomWebhookUrl] = useState<string>('');
  const [webhookMessage, setWebhookMessage] = useState<string>('👑 **Grandmaster Market Alert**: Blox Fruits values have been updated live in the Master Hub!');
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  // Owner Custom Responses State
  const [customResponsesList, setCustomResponsesList] = useState<CustomResponseEntry[]>(() => getStoredCustomResponses());
  const [newTriggerInput, setNewTriggerInput] = useState<string>('');
  const [newResponseInput, setNewResponseInput] = useState<string>('');
  const [editingCustomResponseId, setEditingCustomResponseId] = useState<string | null>(null);
  const [customResponseFilter, setCustomResponseFilter] = useState<string>('');

  const handleSaveCustomResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTriggerInput.trim() || !newResponseInput.trim()) return;
    soundFX.playWin();
    if (editingCustomResponseId) {
      updateCustomResponse(editingCustomResponseId, newTriggerInput, newResponseInput);
      setSaveSuccessMsg(`✅ Updated custom response for "${newTriggerInput.trim()}"!`);
    } else {
      addCustomResponse(newTriggerInput, newResponseInput);
      setSaveSuccessMsg(`✅ Added new custom response for "${newTriggerInput.trim()}"!`);
    }
    setCustomResponsesList(getStoredCustomResponses());
    setNewTriggerInput('');
    setNewResponseInput('');
    setEditingCustomResponseId(null);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleToggleCustomResponse = (id: string) => {
    soundFX.playPop();
    toggleCustomResponseStatus(id);
    setCustomResponsesList(getStoredCustomResponses());
  };

  const handleDeleteCustomResponse = (id: string, trigger: string) => {
    soundFX.playPop();
    deleteCustomResponse(id);
    setCustomResponsesList(getStoredCustomResponses());
    setSaveSuccessMsg(`🗑️ Deleted custom response for "${trigger}"`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleEditCustomResponse = (item: CustomResponseEntry) => {
    soundFX.playPop();
    setEditingCustomResponseId(item.id);
    setNewTriggerInput(item.trigger);
    setNewResponseInput(item.response);
  };

  const handleDeleteSuggestion = (id: string) => {
    soundFX.playPop();
    const updated = adminSuggestions.filter(s => s.id !== id);
    setAdminSuggestions(updated);
    saveStoredSuggestions(updated);
  };

  const handleSaveAdminAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim() || !newAdminPassword.trim()) return;
    soundFX.playWin();
    createOrUpdateAdminAccount(
      newAdminUsername.trim(),
      newAdminPassword.trim(),
      newAdminDisplayName.trim() || undefined,
      editingAdminId || undefined
    );
    setAdminAccountsList(getStoredAdminAccounts());
    setNewAdminUsername('');
    setNewAdminPassword('');
    setNewAdminDisplayName('');
    setEditingAdminId(null);
    setSaveSuccessMsg(editingAdminId ? '✅ Admin account credentials updated!' : '✅ New Admin account successfully created!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleDeleteAdmin = (id: string) => {
    soundFX.playPop();
    deleteAdminAccount(id);
    setAdminAccountsList(getStoredAdminAccounts());
    setSaveSuccessMsg('🗑️ Admin account revoked and deleted.');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

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
    setAdminSuggestions(getStoredSuggestions());
    setAdminAccountsList(getStoredAdminAccounts());
    setCustomResponsesList(getStoredCustomResponses());
  };

  useEffect(() => {
    if (isOpen) {
      const isAuth = getOwnerAuthStatus();
      if (isAuth) {
        setIsAuthenticated(true);
      } else if (initialPrefillKey) {
        setKeyInput(initialPrefillKey);
      }
      reloadData();
    }
  }, [isOpen, initialPrefillKey]);

  useEffect(() => {
    const handleDataUpdate = () => {
      reloadData();
    };
    window.addEventListener('blox_fruits_custom_data_updated', handleDataUpdate);
    return () => {
      window.removeEventListener('blox_fruits_custom_data_updated', handleDataUpdate);
    };
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanStep1 = step1Input.trim();
    const cleanKey = keyInput.trim();

    if (!cleanKey && !cleanStep1) return;

    // Check if combined key was entered in either field
    const effectiveKey = cleanKey || cleanStep1;
    const effectivePreAuth = cleanStep1 || (cleanKey.toLowerCase().startsWith('477047704770') ? '477047704770' : undefined);

    const res = await loginOwnerWithServer(effectiveKey, effectivePreAuth);
    if (res.success) {
      if (res.requiresOtp && res.otpToken) {
        setIsOtpPending(true);
        setOtpToken(res.otpToken);
        setMaskedEmail(res.emailTarget || 'bh***29@gmail.com');
        setOtpTimerSeconds(res.expiresIn || 300);
        setResendCooldown(30);
        setAuthError(null);
        soundFX.playPop();
        return;
      }
      setIsAuthenticated(true);
      setAuthError(null);
      soundFX.playWin();
      reloadData();
    } else {
      setAuthError(res.error || '⛔ Access Denied. Valid Pre-authorization code and Master Key required.');
      soundFX.playPop();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanOtp = otpInput.trim();
    if (!cleanOtp) {
      setAuthError('Please enter the 6-digit OTP code sent to your Gmail.');
      return;
    }

    setIsVerifyingOtp(true);
    setAuthError(null);

    const res = await verifyOwnerOtpWithServer(cleanOtp, otpToken);
    setIsVerifyingOtp(false);

    if (res.success) {
      setIsOtpPending(false);
      setIsAuthenticated(true);
      setOtpInput('');
      setAuthError(null);
      soundFX.playWin();
      reloadData();
    } else {
      setAuthError(res.error || 'Invalid 6-Digit OTP code. Please check your Gmail inbox.');
      soundFX.playPop();
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || !otpToken) return;
    const res = await resendOwnerOtpWithServer(otpToken);
    if (res.success) {
      setResendMessage(res.message || 'New 6-digit OTP sent to your Gmail.');
      setResendCooldown(30);
      setOtpTimerSeconds(300);
      setTimeout(() => setResendMessage(null), 5000);
      soundFX.playPop();
    } else {
      setAuthError(res.error || 'Failed to resend code. Please try again.');
    }
  };

  const handleCancelOtp = () => {
    setIsOtpPending(false);
    setOtpToken('');
    setOtpInput('');
    setAuthError(null);
    setResendMessage(null);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setIsOtpPending(false);
    setOtpToken('');
    setOtpInput('');
    await logoutFromServer();
    setStep1Input('');
    setKeyInput('');
    soundFX.playPop();
  };

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
    setEditPvpTier(item.pvpTier);
    setEditGrindTier(item.grindTier);
    setEditEmoji(item.imageEmoji || '🍎');
    setEditAccentColor(item.accentColor || '#38bdf8');
    setEditWidgetTag(item.widgetTag || '');
    setEditUpdateNote(item.updateNote || '');
    setEditDescription(item.description || '');
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

    soundFX.playPop();
    const physVal = parseValueInput(editPhysicalValue);
    const permVal = editPermanentValue.trim() ? parseValueInput(editPermanentValue) : undefined;
    const beliVal = editBeliPrice.trim() ? parseValueInput(editBeliPrice) : undefined;
    const robuxVal = editRobuxPrice.trim() ? parseValueInput(editRobuxPrice) : undefined;

    saveFullItemOverride(selectedItemId, {
      name: editName.trim(),
      physicalValue: physVal,
      permanentValue: permVal,
      beliPrice: beliVal,
      robuxPrice: robuxVal,
      demand: editDemand,
      trend: editTrend,
      pvpTier: editPvpTier,
      grindTier: editGrindTier,
      imageEmoji: editEmoji,
      accentColor: editAccentColor,
      widgetTag: editWidgetTag.trim() || undefined,
      updateNote: editUpdateNote.trim() || undefined,
      description: editDescription.trim()
    });

    setSaveSuccessMsg(`✓ Saved "${editName}" with value ${formatValueNumber(physVal)}! All systems updated.`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
    reloadData();
    const updatedList = getEffectiveFruitList();
    const updatedItem = updatedList.find(i => i.id === selectedItemId);
    if (updatedItem) {
      loadItemForEdit(updatedItem);
    }
  };

  const handleResetCurrentOverride = () => {
    if (!selectedItemId) return;
    soundFX.playPop();
    removeUserValueOverride(selectedItemId);
    reloadData();
    const list = getEffectiveFruitList();
    const target = list.find(i => i.id === selectedItemId);
    if (target) loadItemForEdit(target);
    setSaveSuccessMsg(`🔄 Reset "${editName}" back to original base values.`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    soundFX.playWin();
    const safeId = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4);
    const physVal = Number(newPhysicalValue) || 0;
    const permVal = newPermanentValue ? Number(newPermanentValue) : undefined;
    const beliVal = newBeliPrice ? Number(newBeliPrice) : undefined;
    const robuxVal = newRobuxPrice ? Number(newRobuxPrice) : undefined;

    const newItem: FruitItem = {
      id: safeId,
      name: newName.trim(),
      category: newCategory,
      rarity: newRarity,
      type: newCategory === 'fruit' ? newType : undefined,
      physicalValue: physVal,
      permanentValue: permVal,
      beliPrice: beliVal,
      robuxPrice: robuxVal,
      demand: newDemand,
      trend: newTrend,
      pvpTier: newPvpTier,
      grindTier: newGrindTier,
      imageEmoji: newEmoji.trim() || '👑',
      accentColor: newAccentColor,
      widgetTag: newWidgetTag.trim() || undefined,
      description: newDescription.trim(),
      updateNote: newUpdateNote.trim() || undefined,
      isCustomAdded: true,
      isNewOrReworked: true
    };

    addCustomFruitItem(newItem);
    setSaveSuccessMsg(`✓ Successfully created custom ${newCategory} "${newItem.name}" (${formatValueNumber(physVal)})!`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);

    // Reset inputs
    setNewName('');
    reloadData();
    setActiveTab('manage_items');
  };

  const handleDeleteItem = (itemId: string, itemName: string) => {
    if (confirm(`Are you sure you want to permanently delete/hide "${itemName}" from the database?`)) {
      soundFX.playPop();
      deleteFruitItemPermanently(itemId);
      setSaveSuccessMsg(`✓ Deleted "${itemName}" from the database.`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
      reloadData();
    }
  };

  const handleExportJson = () => {
    soundFX.playPop();
    const json = exportDatabaseToJson();
    setJsonBackupText(json);

    // Trigger file download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blox_fruits_master_db_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    if (!jsonBackupText.trim()) return;
    const success = importDatabaseFromJson(jsonBackupText.trim());
    if (success) {
      soundFX.playWin();
      setSaveSuccessMsg('✓ Database imported and restored successfully!');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
      reloadData();
    } else {
      alert('Failed to parse JSON backup. Please ensure valid JSON structure.');
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all values and custom items back to default Blox Fruits values?')) {
      soundFX.playPop();
      restoreDefaultDatabase();
      setSaveSuccessMsg('✓ Restored all values to default.');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
      reloadData();
    }
  };

  const handleSyncToFirebase = async () => {
    soundFX.playPop();
    try {
      await seedBackupDataToFirebase(true);
      pushFruitDataToServer();
      soundFX.playWin();
      setSaveSuccessMsg('✓ All backup item data & image URLs synced to Firebase Firestore!');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
      reloadData();
    } catch (e) {
      alert('Failed to sync to Firebase. Please check connection.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden relative"
      >
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-500" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Grandmaster Control Center & Value Injector
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  RESTRICTED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Encrypted terminal for adding custom fruits, game passes, full value overriding & AI synchronization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-xs text-red-300 font-bold transition-all flex items-center gap-1"
                title="Lock Vault"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            )}
            <button
              onClick={() => {
                soundFX.playPop();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Notification Toast */}
          {saveSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </motion.div>
          )}

          {/* 1. AUTHENTICATION GATE */}
          {!isAuthenticated ? (
            isOtpPending ? (
              /* STEP 3: GMAIL OTP VERIFICATION */
              <div className="max-w-md mx-auto py-6 text-center space-y-5">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 relative shadow-lg shadow-cyan-500/20">
                  <Mail className="w-10 h-10 animate-bounce text-cyan-300" />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-amber-400 rounded-full text-slate-950">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Step 3: Gmail Two-Factor Authentication</span>
                  </div>
                  <h4 className="text-xl font-black text-white">Enter 6-Digit Email OTP</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Pre-authorization & Master Key verified! A one-time 6-digit code has been dispatched to <strong className="text-cyan-300 font-mono">{maskedEmail}</strong>.
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
                  <div>
                    <label className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between mb-1.5">
                      <span>One-Time Passcode (OTP)</span>
                      <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Expires in: {Math.floor(otpTimerSeconds / 60)}:{String(otpTimerSeconds % 60).padStart(2, '0')}
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        autoFocus
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••••"
                        className="w-full text-center tracking-[0.6em] text-2xl font-mono py-3.5 bg-slate-950 border-2 border-cyan-500/50 focus:border-cyan-400 rounded-2xl text-cyan-200 placeholder-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  {resendMessage && (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{resendMessage}</span>
                    </div>
                  )}

                  {authError && (
                    <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-xs text-red-300 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      disabled={isVerifyingOtp || otpInput.length < 6}
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isVerifyingOtp ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                      <span>{isVerifyingOtp ? 'Verifying OTP...' : 'Unlock Grandmaster Vault'}</span>
                    </button>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCancelOtp}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Restart Protocol</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 disabled:opacity-50 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${resendCooldown > 0 ? '' : 'text-cyan-400'}`} />
                        <span>{resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend Email OTP'}</span>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-500 text-left space-y-1">
                  <p>🔒 <strong>3-Factor Security Gate:</strong> Verification email dispatched to <code className="text-cyan-300">{maskedEmail}</code>. One-time passcodes expire after 5 minutes.</p>
                </div>
              </div>
            ) : (
              /* STEPS 1 & 2: PRE-AUTH + MASTER KEY */
              <div className="max-w-md mx-auto py-8 text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400/20 via-cyan-400/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Lock className="w-10 h-10 animate-pulse" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">Grandmaster 3-Factor Authorization</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enforce mandatory pre-authorization, master clearance key, and Gmail OTP verification to unlock the control center.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                  {/* Step 1: Pre-authorization Code */}
                  <div>
                    <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center justify-between mb-1.5">
                      <span>Step 1: Pre-Authorization Code</span>
                      <span className="text-[10px] text-slate-500 font-mono">Mandatory</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={step1Input}
                        onChange={(e) => setStep1Input(e.target.value)}
                        placeholder="Enter pre-authorization clearance code..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-amber-500/40 focus:border-amber-400 rounded-2xl text-sm font-mono text-amber-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-amber-400 font-black">#1</span>
                    </div>
                  </div>

                  {/* Step 2: Master Access Key */}
                  <div>
                    <label className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between mb-1.5">
                      <span>Step 2: Master Clearance Key</span>
                      <span className="text-[10px] text-slate-500 font-mono">Grandmaster Secret</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showKeyText ? 'text' : 'password'}
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Enter master clearance key..."
                        className="w-full pl-10 pr-12 py-3 bg-slate-950 border border-cyan-500/40 focus:border-cyan-400 rounded-2xl text-sm font-mono text-cyan-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                      />
                      <Key className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowKeyText(!showKeyText)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-xs text-red-300 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-600 hover:from-amber-300 hover:to-indigo-500 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Proceed to Step 3 (Gmail OTP)</span>
                  </button>
                </form>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-500 text-left space-y-1">
                  <p>🔒 <strong>Zero-Trust 3FA Protocol:</strong> Verification requires Step 1 Pre-Auth + Step 2 Master Key. A single-use 6-digit OTP will be dispatched to your verified email address.</p>
                </div>
              </div>
            )
          ) : (
            /* 2. AUTHENTICATED OWNER CONTROL MATRIX */
            <div className="space-y-5">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('edit_values');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'edit_values'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Update Values & Stats</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('add_new');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'add_new'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Fruit / Game Pass</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('custom_responses');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'custom_responses'
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Custom AI Responses ({customResponsesList.length})</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('manage_items');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'manage_items'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Manage Items & Deletions</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('backup_export');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'backup_export'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Database JSON Backup</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('manage_suggestions');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'manage_suggestions'
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Manage Suggestions ({adminSuggestions.length})</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('manage_admins');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'manage_admins'
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-slate-950 shadow-md shadow-blue-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Accounts & Passwords ({adminAccountsList.length})</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playPop();
                    setActiveTab('discord_webhooks');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'discord_webhooks'
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>📢 Discord Webhooks</span>
                </button>
              </div>

              {/* TAB 1: UPDATE EXISTING VALUES */}
              {activeTab === 'edit_values' && (
                <div className="space-y-4">
                  {/* Item Selector Grid */}
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Select Fruit / Game Pass to Update:</span>
                      </label>
                      <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Search item..."
                        className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
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
                            className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all ${
                              selectedItemId === item.id
                                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-sm'
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
                          <span className="text-[10px] text-cyan-400 font-mono">ID: {selectedItemId}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleResetCurrentOverride}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors"
                          title="Reset to default official values"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          Current: {formatValueNumber(parseValueInput(editPhysicalValue))}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      {/* Name */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Display Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Physical Trade Value */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">
                          Physical Trade Value (Beli Points or e.g. 3.5B / 350M)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editPhysicalValue}
                          onChange={(e) => setEditPhysicalValue(e.target.value)}
                          placeholder="e.g. 3500000000 or 3.5B"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-bold focus:outline-none focus:border-cyan-500"
                        />
                        <span className="text-[10px] text-slate-500 mt-0.5 block">
                          Preview: {formatValueNumber(parseValueInput(editPhysicalValue))}
                        </span>
                      </div>

                      {/* Permanent Trade Value */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">
                          Permanent Value (Optional, e.g. 9.5B)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editPermanentValue}
                          onChange={(e) => setEditPermanentValue(e.target.value)}
                          placeholder="e.g. 9500000000 or 9.5B"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-purple-300 font-bold focus:outline-none focus:border-cyan-500"
                        />
                        <span className="text-[10px] text-slate-500 mt-0.5 block">
                          Preview: {editPermanentValue ? formatValueNumber(parseValueInput(editPermanentValue)) : 'None'}
                        </span>
                      </div>

                      {/* In-Game Beli Price */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">In-Game Beli Price</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editBeliPrice}
                          onChange={(e) => setEditBeliPrice(e.target.value)}
                          placeholder="e.g. 5000000 or 5M"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-300 font-bold focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Robux Price */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Robux Price</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editRobuxPrice}
                          onChange={(e) => setEditRobuxPrice(e.target.value)}
                          placeholder="e.g. 2500"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-emerald-300 font-bold focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Demand */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Demand Rating ({editDemand}/10)</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={editDemand}
                          onChange={(e) => setEditDemand(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      {/* Market Trend */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Market Trend</label>
                        <select
                          value={editTrend}
                          onChange={(e) => setEditTrend(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="hyped">🔥 Hyped</option>
                          <option value="rising">📈 Rising</option>
                          <option value="stable">⚖️ Stable</option>
                          <option value="dropping">📉 Dropping</option>
                        </select>
                      </div>

                      {/* PvP Tier */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">PvP Tier</label>
                        <select
                          value={editPvpTier}
                          onChange={(e) => setEditPvpTier(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                        >
                          <option value="S+">S+ Tier (Top Meta)</option>
                          <option value="S">S Tier</option>
                          <option value="A">A Tier</option>
                          <option value="B">B Tier</option>
                          <option value="C">C Tier</option>
                        </select>
                      </div>

                      {/* Custom Widget Tag */}
                      <div>
                        <label className="text-slate-400 font-bold block mb-1 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-amber-400" />
                          <span>Custom Widget Badge Tag</span>
                        </label>
                        <input
                          type="text"
                          value={editWidgetTag}
                          onChange={(e) => setEditWidgetTag(e.target.value)}
                          placeholder="e.g. 2026 META, REWORKED, VIP"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Update Notes & Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Custom Update Note</label>
                        <input
                          type="text"
                          value={editUpdateNote}
                          onChange={(e) => setEditUpdateNote(e.target.value)}
                          placeholder="Note displayed in AI answers and value cards..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Lore / Obtainment Insight</label>
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Combat & obtainment lore..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Broadcast to AI & UI</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: ADD NEW CUSTOM FRUIT / GAME PASS */}
              {activeTab === 'add_new' && (
                <form onSubmit={handleCreateNewItem} className="p-4 sm:p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4">
                  <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>Create Brand New Fruit, Game Pass, or Sword</span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Automatically registers into the Trade Calculator, Value Database, and Solas AI NLP query model.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {/* Item Name */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Item Name *</label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Celestial Dragon, Instant Boat..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                      >
                        <option value="fruit">Blox Fruit</option>
                        <option value="gamepass">Game Pass</option>
                        <option value="sword">Sword / Weapon</option>
                        <option value="permanent">Permanent Fruit</option>
                      </select>
                    </div>

                    {/* Rarity */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Rarity</label>
                      <select
                        value={newRarity}
                        onChange={(e) => setNewRarity(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                      >
                        <option value="Mythical">Mythical (Red)</option>
                        <option value="Legendary">Legendary (Purple)</option>
                        <option value="Rare">Rare (Blue)</option>
                        <option value="Uncommon">Uncommon (Green)</option>
                        <option value="Common">Common (Gray)</option>
                      </select>
                    </div>

                    {/* Emoji */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Icon / Emoji</label>
                      <input
                        type="text"
                        value={newEmoji}
                        onChange={(e) => setNewEmoji(e.target.value)}
                        placeholder="e.g. 🐉✨, 👑, ⚡"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold focus:outline-none"
                      />
                    </div>

                    {/* Physical Value */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Physical Value (Points)</label>
                      <input
                        type="number"
                        value={newPhysicalValue}
                        onChange={(e) => setNewPhysicalValue(e.target.value)}
                        placeholder="e.g. 1000000000"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-bold focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Preview: {formatValueNumber(Number(newPhysicalValue) || 0)}
                      </span>
                    </div>

                    {/* Permanent Value */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Permanent Value (Optional)</label>
                      <input
                        type="number"
                        value={newPermanentValue}
                        onChange={(e) => setNewPermanentValue(e.target.value)}
                        placeholder="e.g. 3500000000"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-purple-300 font-bold focus:outline-none"
                      />
                    </div>

                    {/* Robux Price */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">Robux Price</label>
                      <input
                        type="number"
                        value={newRobuxPrice}
                        onChange={(e) => setNewRobuxPrice(e.target.value)}
                        placeholder="e.g. 2500"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
                      />
                    </div>

                    {/* Widget Tag */}
                    <div>
                      <label className="text-slate-400 font-bold block mb-1 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        <span>Custom Widget Tag</span>
                      </label>
                      <input
                        type="text"
                        value={newWidgetTag}
                        onChange={(e) => setNewWidgetTag(e.target.value)}
                        placeholder="e.g. 2026 OWNER LEAK, VIP"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-300 font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="text-xs">
                    <label className="text-slate-400 font-bold block mb-1">Item Description & Combat Mechanics</label>
                    <textarea
                      rows={2}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Detailed playstyle mechanics and obtainment instructions..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Inject Custom Item into Database</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: CUSTOM RESPONSES MANAGER */}
              {activeTab === 'custom_responses' && (
                <div className="space-y-6">
                  {/* Form to Add / Edit Custom Response */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquarePlus className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h4 className="text-sm font-black text-white">
                            {editingCustomResponseId ? 'Edit Custom AI Response' : 'Add New Custom AI Response'}
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Set custom triggers and answers for Solas AI. When someone types the trigger, the AI responds with your exact custom message!
                          </p>
                        </div>
                      </div>
                      {editingCustomResponseId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCustomResponseId(null);
                            setNewTriggerInput('');
                            setNewResponseInput('');
                          }}
                          className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveCustomResponse} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Trigger Keyword / Question (e.g., "AD", "who is the best trader", "my guild")
                        </label>
                        <input
                          type="text"
                          value={newTriggerInput}
                          onChange={(e) => setNewTriggerInput(e.target.value)}
                          placeholder="e.g. hello, what is your name, top fruit"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          AI Response Text (Markdown supported)
                        </label>
                        <textarea
                          rows={3}
                          value={newResponseInput}
                          onChange={(e) => setNewResponseInput(e.target.value)}
                          placeholder="Type the exact custom AI reply..."
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{editingCustomResponseId ? 'Update Custom Response' : 'Save Custom Response'}</span>
                      </button>
                    </form>
                  </div>

                  {/* Existing Custom Responses List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <span>Configured Custom Responses</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                          {customResponsesList.length} total
                        </span>
                      </h4>
                      <div className="relative w-48">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={customResponseFilter}
                          onChange={(e) => setCustomResponseFilter(e.target.value)}
                          placeholder="Filter triggers..."
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {customResponsesList
                        .filter(item => 
                          !customResponseFilter || 
                          item.trigger.toLowerCase().includes(customResponseFilter.toLowerCase()) || 
                          item.response.toLowerCase().includes(customResponseFilter.toLowerCase())
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              item.enabled
                                ? 'bg-slate-950/90 border-slate-800 hover:border-emerald-500/40'
                                : 'bg-slate-950/40 border-slate-900 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                                    Trigger: "{item.trigger}"
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    item.enabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {item.enabled ? 'ACTIVE' : 'DISABLED'}
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-medium whitespace-pre-wrap">
                                  {item.response}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleToggleCustomResponse(item.id)}
                                  className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                    item.enabled
                                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                  }`}
                                  title={item.enabled ? 'Disable Custom Response' : 'Enable Custom Response'}
                                >
                                  {item.enabled ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-500" />}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleEditCustomResponse(item)}
                                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteCustomResponse(item.id, item.trigger)}
                                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                      {customResponsesList.length === 0 && (
                        <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <MessageSquarePlus className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-xs font-bold text-slate-400">No Custom AI Responses Configured</p>
                          <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                            Add your first custom response above! Set any trigger keyword (e.g. "hello", "secret", "rules") and the AI will reply with your custom answer.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MANAGE ITEMS & PERMANENT DELETIONS */}
              {activeTab === 'manage_items' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                      <span>Database Items Registry ({allItems.length} Total Items)</span>
                      <button
                        onClick={handleResetDefaults}
                        className="px-3 py-1 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset All to Defaults</span>
                      </button>
                    </h4>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
                      {allItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xl shrink-0">{item.imageEmoji || '🍎'}</span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h5 className="font-bold text-white truncate">{item.name}</h5>
                                {item.widgetTag && (
                                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-black uppercase">
                                    {item.widgetTag}
                                  </span>
                                )}
                                {item.isCustomAdded && (
                                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-black uppercase">
                                    CUSTOM
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Value: <strong className="text-amber-300">{formatValueNumber(item.physicalValue)}</strong> • Demand: {item.demand}/10 • Category: {item.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                soundFX.playPop();
                                loadItemForEdit(item);
                                setActiveTab('edit_values');
                              }}
                              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors"
                              title="Edit Item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id, item.name)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                              title="Delete Item Permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: JSON BACKUP & RESTORE */}
              {activeTab === 'backup_export' && (
                <div className="p-4 sm:p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4 text-xs">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span>Permanent Database Backup & JSON Sync</span>
                    </h4>
                    <p className="text-slate-400 mt-0.5">
                      Export your custom items, overrides, and widget tags into an offline JSON snapshot, or import across devices.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleExportJson}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup (.json)</span>
                    </button>
                    <button
                      onClick={handleImportJson}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Apply JSON from Textarea</span>
                    </button>
                    <button
                      onClick={handleSyncToFirebase}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-black flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Upload & Seed All to Firebase</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">JSON Backup Raw Content</label>
                    <textarea
                      rows={6}
                      value={jsonBackupText}
                      onChange={(e) => setJsonBackupText(e.target.value)}
                      placeholder="Paste exported database JSON here..."
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono text-[11px] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: MANAGE VISITOR SUGGESTIONS */}
              {activeTab === 'manage_suggestions' && (
                <div className="p-4 sm:p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>Visitor Community Suggestions ({adminSuggestions.length})</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Review community ideas and delete any invalid or outdated suggestions.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                    {adminSuggestions.map((sug) => (
                      <div
                        key={sug.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{sug.author}</span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase">
                              {sug.category}
                            </span>
                            <span className="text-[10px] text-slate-500">{sug.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2">{sug.content}</p>
                          <div className="text-[10px] text-cyan-400 font-bold">{sug.likes} Upvotes</div>
                        </div>

                        <button
                          onClick={() => handleDeleteSuggestion(sug.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors shrink-0"
                          title="Delete Suggestion"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {adminSuggestions.length === 0 && (
                      <div className="text-center py-12 text-slate-500 text-xs">
                        No visitor suggestions found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 6: MANAGE ADMIN ACCOUNTS & PASSWORDS (OWNER CONTROL) */}
              {activeTab === 'manage_admins' && (
                <div className="p-4 sm:p-5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>Admin Access & Password Manager</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Create, update, or revoke Admin usernames and passwords. Admins can log in directly through the AI Chat.
                      </p>
                    </div>
                  </div>

                  {/* Create / Edit Admin Form */}
                  <form onSubmit={handleSaveAdminAccount} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold text-blue-300">
                      {editingAdminId ? '✏️ Edit Admin Account' : '➕ Create New Admin Credentials'}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Admin Username</label>
                        <input
                          type="text"
                          value={newAdminUsername}
                          onChange={(e) => setNewAdminUsername(e.target.value)}
                          placeholder="e.g. mod_alex"
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Admin Password</label>
                        <input
                          type="text"
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="e.g. secret_pass_99"
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono font-bold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 font-bold block mb-1">Display Role / Title</label>
                        <input
                          type="text"
                          value={newAdminDisplayName}
                          onChange={(e) => setNewAdminDisplayName(e.target.value)}
                          placeholder="e.g. Senior Trade Mod"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      {editingAdminId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAdminId(null);
                            setNewAdminUsername('');
                            setNewAdminPassword('');
                            setNewAdminDisplayName('');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{editingAdminId ? 'Update Credentials' : 'Create Admin'}</span>
                      </button>
                    </div>
                  </form>

                  {/* Active Admin List */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-300">Active Admin Accounts ({adminAccountsList.length})</h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {adminAccountsList.map((acc) => (
                        <div
                          key={acc.id}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">@{acc.username}</span>
                              {acc.displayName && (
                                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                                  {acc.displayName}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-500 font-mono">
                                Password: <code className="text-amber-400">{acc.password}</code>
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500">
                              Created: {new Date(acc.createdAt).toLocaleDateString()} by {acc.createdBy}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                soundFX.playPop();
                                setEditingAdminId(acc.id);
                                setNewAdminUsername(acc.username);
                                setNewAdminPassword(acc.password);
                                setNewAdminDisplayName(acc.displayName || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit Credentials"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteAdmin(acc.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                              title="Revoke Admin Access"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {adminAccountsList.length === 0 && (
                        <div className="text-center py-6 text-slate-500 text-xs">
                          No active admin accounts. Create one above!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: DISCORD COMMUNITY WEBHOOKS */}
              {activeTab === 'discord_webhooks' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <span>📢 Discord Community Webhooks Broadcast Center</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">3 Channels Configured</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Broadcast market updates, value changes, fruit injections, and grandmaster alerts directly to your Discord community channels via secure server-side dispatch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Webhook Channel</h5>
                      
                      <div className="space-y-2">
                        {[
                          { id: 'channel_1', name: 'Discord Server #1 (Primary Community Feed)', desc: 'Official main announcements & general updates channel' },
                          { id: 'channel_2', name: 'Discord Server #2 (Market Values & Trade Alerts)', desc: 'Trading hub, value trends, and fruit demand updates' },
                          { id: 'channel_3', name: 'Discord Server #3 (Grandmaster Owner Announcements)', desc: 'Exclusive owner broadcasts & VIP patch notes' }
                        ].map((webhook, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{webhook.name}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {webhook.desc}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedChannelId(webhook.id);
                                setCustomWebhookUrl('');
                              }}
                              className={`px-3 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                                selectedChannelId === webhook.id && !customWebhookUrl
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              {selectedChannelId === webhook.id && !customWebhookUrl ? '✓ Selected' : 'Select'}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-bold text-slate-300 mb-1">Or Custom Webhook URL (Optional)</label>
                        <input
                          type="text"
                          value={customWebhookUrl}
                          onChange={e => setCustomWebhookUrl(e.target.value)}
                          placeholder="https://discord.com/api/webhooks/..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Compose & Send Broadcast</h5>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: '🔥 Market Value Update', text: '👑 **Grandmaster Market Alert**: Blox Fruits values have been updated live in the Master Hub! Check out the latest rising demands and trade tier shifts.' },
                          { label: '⚡ New Item Injected', text: '⚡ **Vault Leak**: A new exclusive item/fruit has been injected into the live database by 1_solas!' },
                          { label: '🏆 Grandmaster Notice', text: '🏆 **Owner Announcement**: All traders please note the latest trade value adjustments. Owner decisions are final!' },
                          { label: '🧪 Test Ping', text: '🔔 **Solas AI Hub**: Test broadcast ping successful! System operational.' }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setWebhookMessage(preset.text)}
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white transition-all text-left flex flex-col justify-between cursor-pointer"
                          >
                            <span>{preset.label}</span>
                            <span className="text-[9px] text-slate-400 font-normal mt-1 truncate">Click to load template</span>
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Message Content / Embed Text</label>
                        <textarea
                          rows={4}
                          value={webhookMessage}
                          onChange={e => setWebhookMessage(e.target.value)}
                          placeholder="Type your broadcast message here..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            if (!webhookMessage.trim()) {
                              setSaveSuccessMsg('⚠️ Please type a message to broadcast.');
                              return;
                            }
                            setIsBroadcasting(true);
                            soundFX.playPop();
                            try {
                              const res = await fetch('/api/owner/discord-broadcast', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  channelId: customWebhookUrl.trim() ? undefined : selectedChannelId,
                                  customWebhookUrl: customWebhookUrl.trim() || undefined,
                                  message: webhookMessage.trim()
                                })
                              });
                              const data = await res.json();
                              if (data.success) {
                                soundFX.playWin();
                                setSaveSuccessMsg('✅ Successfully broadcasted message to Discord server via secure backend!');
                              } else {
                                soundFX.playPop();
                                setSaveSuccessMsg(`❌ Broadcast error: ${data.error || 'Failed to dispatch'}`);
                              }
                            } catch (err: any) {
                              soundFX.playPop();
                              setSaveSuccessMsg('❌ Network error dispatching broadcast.');
                            } finally {
                              setIsBroadcasting(false);
                              setTimeout(() => setSaveSuccessMsg(null), 4000);
                            }
                          }}
                          disabled={isBroadcasting}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isBroadcasting ? 'Broadcasting...' : '🚀 Send to Selected Server'}
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            if (!webhookMessage.trim()) {
                              setSaveSuccessMsg('⚠️ Please type a message to broadcast.');
                              return;
                            }
                            setIsBroadcasting(true);
                            soundFX.playPop();
                            try {
                              const res = await fetch('/api/owner/discord-broadcast', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  channelId: 'all',
                                  message: webhookMessage.trim()
                                })
                              });
                              const data = await res.json();
                              if (data.success) {
                                soundFX.playWin();
                                setSaveSuccessMsg('✅ Successfully broadcasted to ALL 3 Discord Servers simultaneously!');
                              } else {
                                soundFX.playPop();
                                setSaveSuccessMsg(`❌ Broadcast error: ${data.error || 'Failed to dispatch'}`);
                              }
                            } catch (err) {
                              soundFX.playPop();
                              setSaveSuccessMsg('❌ Network error dispatching broadcast.');
                            } finally {
                              setIsBroadcasting(false);
                              setTimeout(() => setSaveSuccessMsg(null), 4000);
                            }
                          }}
                          disabled={isBroadcasting}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isBroadcasting ? 'Broadcasting All...' : '⚡ Broadcast to ALL 3 Servers'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="font-mono text-[11px]">
            Master Session: <strong className="text-cyan-300">Verified & Encrypted</strong> (1_solas Core)
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
          >
            Close Vault
          </button>
        </div>
      </motion.div>
    </div>
  );
};
