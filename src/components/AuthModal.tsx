import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Clock, 
  AlertCircle,
  Sparkles,
  Info,
  KeyRound,
  LogOut,
  Check,
  Crown,
  Gift,
  Zap
} from 'lucide-react';
import { UserAuthProfile } from '../types';
import { 
  openDiscordOAuthTab, 
  logoutDiscordAccount,
  unlockVipUnlimitedSession,
  resetVipSession,
  redeemVipPasscodeOnServer
} from '../utils/aiQuota';
import { getOwnerAuthStatus, loginAdminWithServer } from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authProfile: UserAuthProfile;
  onProfileUpdated: (updated: UserAuthProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  authProfile,
  onProfileUpdated,
}) => {
  const [hoursRemaining, setHoursRemaining] = useState<string>('');
  const [isOpeningPopup, setIsOpeningPopup] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null);
  const [promoCodeSuccess, setPromoCodeSuccess] = useState<string | null>(null);

  // Admin Authentication State
  const [adminUsernameInput, setAdminUsernameInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);
  const [adminAuthSuccess, setAdminAuthSuccess] = useState<string | null>(null);
  const [isLoggingInAdmin, setIsLoggingInAdmin] = useState(false);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsernameInput.trim() || !adminPasswordInput.trim()) return;
    setIsLoggingInAdmin(true);
    setAdminAuthError(null);
    setAdminAuthSuccess(null);

    const res = await loginAdminWithServer(adminUsernameInput.trim(), adminPasswordInput.trim());
    setIsLoggingInAdmin(false);

    if (res.success && res.account) {
      soundFX.playWin();
      const updated = unlockVipUnlimitedSession(authProfile);
      onProfileUpdated(updated);
      setAdminAuthSuccess(`✅ Welcome, @${res.account.username}! Opening Admin Panel...`);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('blox_fruits_open_admin_panel', {
            detail: { username: res.account.username }
          }));
        }
        onClose();
      }, 600);
    } else {
      soundFX.playPop();
      setAdminAuthError(res.error || '⛔ Invalid Admin Credentials. Please verify your username and password.');
    }
  };

  useEffect(() => {
    const calcHours = () => {
      const now = Date.now();
      const diff = authProfile.windowResetTime - now;
      if (diff <= 0) {
        setHoursRemaining('Resetting now...');
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setHoursRemaining(`${hrs}h ${mins}m`);
    };

    calcHours();
    const interval = setInterval(calcHours, 60000);
    return () => clearInterval(interval);
  }, [authProfile.windowResetTime]);

  const handleLaunchOAuthTab = () => {
    soundFX.playPop();
    setIsOpeningPopup(true);
    openDiscordOAuthTab();
    setTimeout(() => setIsOpeningPopup(false), 3000);
  };

  const handleLogout = () => {
    soundFX.playPop();
    const updated = logoutDiscordAccount(authProfile);
    onProfileUpdated(updated);
  };

  const handlePromoCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim();
    if (!code) return;
    const res = await redeemVipPasscodeOnServer(code);
    if (res.success) {
      soundFX.playWin();
      const updated = unlockVipUnlimitedSession(authProfile);
      onProfileUpdated(updated);
      setPromoCodeSuccess('⚡ Unlimited Search Pass Activated! Enjoy infinite searches (∞) for this session.');
      setPromoCodeError(null);
      setPromoCodeInput('');
    } else {
      soundFX.playPop();
      setPromoCodeError('⛔ Invalid Code. Please enter a valid unlock passcode.');
      setPromoCodeSuccess(null);
    }
  };

  const handlePromoLogout = () => {
    soundFX.playPop();
    const updated = resetVipSession(authProfile);
    onProfileUpdated(updated);
    setPromoCodeSuccess(null);
  };

  if (!isOpen) return null;

  const isOwnerActive = authProfile.tier === 'owner' || getOwnerAuthStatus();
  const isVipActive = authProfile.tier === 'vip' || isOwnerActive;
  const isUnlimited = isVipActive;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden text-slate-100 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 shrink-0">
              <KeyRound className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Access & Search Quota Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {isUnlimited ? 'VIP Pass' : 'Tier Access'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isUnlimited
                  ? '⚡ Unlimited Searches Pass Active! You have infinite searches (∞) for this session.'
                  : 'Guests get 6 searches per 12h. Connect Discord for 12 searches, or redeem a code for Unlimited (∞).'}
              </p>
            </div>
          </div>

          {/* Current Quota & Tier Overview Card */}
          <div className={`mt-5 p-5 rounded-2xl border space-y-3 ${
            isUnlimited 
              ? 'bg-emerald-950/20 border-emerald-500/40' 
              : 'bg-slate-950/80 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Account Status:</span>
                {isUnlimited ? (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Code Unlocked (VIP) • UNLIMITED SEARCHES (∞)
                  </span>
                ) : authProfile.discord ? (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-indigo-600/30 text-indigo-300 border border-indigo-500/50 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Discord Connected (@{authProfile.discord.username}) • 12 Searches / 12h
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    Guest Free Tier • 6 Searches / 12h
                  </span>
                )}
              </div>

              {!isUnlimited && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>12h Reset: {hoursRemaining}</span>
                </div>
              )}
            </div>

            {/* Searches progress bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">
                  Searches Used:{' '}
                  <strong className={isUnlimited ? 'text-emerald-400' : 'text-cyan-400'}>
                    {isUnlimited ? '0' : authProfile.searchesUsed} / {isUnlimited ? '∞ (Unlimited)' : authProfile.maxSearches}
                  </strong>
                </span>
                <span className={isOwnerActive ? 'text-amber-300 font-bold' : isVipActive ? 'text-emerald-300 font-bold' : 'text-cyan-300 font-bold'}>
                  {isUnlimited ? '∞ Unlimited Searches' : `${Math.max(0, authProfile.maxSearches - authProfile.searchesUsed)} Searches Remaining`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOwnerActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400'
                      : isVipActive
                      ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400'
                      : authProfile.searchesUsed >= authProfile.maxSearches
                      ? 'bg-rose-500'
                      : authProfile.searchesUsed >= authProfile.maxSearches - 1
                      ? 'bg-amber-400'
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                  }`}
                  style={{
                    width: isUnlimited ? '100%' : `${Math.min(100, (authProfile.searchesUsed / authProfile.maxSearches) * 100)}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section: Redeem Secret Passcode */}
          <div className="mt-5 p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Redeem Secret Passcode</h3>
                  <p className="text-[11px] text-slate-400">
                    Have a private access passcode? Enter it below to unlock unlimited searches (∞) for this session.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                ∞ Searches
              </span>
            </div>

            {isVipActive ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-xs font-extrabold text-emerald-200">
                      Secret Pass Active • Infinite Searches Enabled!
                    </span>
                  </div>
                  <button
                    onClick={handlePromoLogout}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                  >
                    Reset Pass
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePromoCodeSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Enter secret passcode..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Redeem</span>
                  </button>
                </div>
                {promoCodeError && (
                  <p className="text-rose-400 text-xs font-semibold">{promoCodeError}</p>
                )}
                {promoCodeSuccess && (
                  <p className="text-emerald-400 text-xs font-semibold">{promoCodeSuccess}</p>
                )}
              </form>
            )}
          </div>

          {/* Section: Firebase Admin Key & Username Login */}
          <div className="mt-5 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Firebase Admin Login</h3>
                  <p className="text-[11px] text-slate-400">
                    Enter your Admin Username and Admin Key (verified against Firebase Firestore) to open the Admin Panel.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-cyan-400" />
                Moderator Access
              </span>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Admin Username</label>
                  <input
                    type="text"
                    value={adminUsernameInput}
                    onChange={(e) => setAdminUsernameInput(e.target.value)}
                    placeholder="Username (e.g. admin)"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Admin Key / Password</label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="Admin Key / Password"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isLoggingInAdmin}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{isLoggingInAdmin ? 'Verifying with Firebase...' : 'Login & Open Admin Panel'}</span>
                </button>
              </div>

              {adminAuthError && (
                <p className="text-rose-400 text-xs font-semibold">{adminAuthError}</p>
              )}
              {adminAuthSuccess && (
                <p className="text-cyan-300 text-xs font-semibold">{adminAuthSuccess}</p>
              )}
            </form>
          </div>

          {/* Discord OAuth Login Section */}
          <div className="mt-5 p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Discord OAuth2 Flow</h3>
                  <p className="text-[11px] text-slate-400">
                    Opens a dedicated secure tab to authorize Discord and permanently link your account.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
                12 Searches / 12h
              </span>
            </div>

            {authProfile.discord ? (
              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
                      {authProfile.discord.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">@{authProfile.discord.username}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" />
                        Account remembered & active indefinitely
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>You will remain signed in across reloads until you click <strong>Sign Out</strong>.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {/* Official Discord OAuth2 Flow Button */}
                <button
                  onClick={handleLaunchOAuthTab}
                  disabled={isOpeningPopup}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>{isOpeningPopup ? 'Opening OAuth Tab...' : 'Log in with Discord OAuth2'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </button>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-indigo-300 block">Step 1</span>
                    <span className="text-[11px] text-slate-400">Click Authorize</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-indigo-300 block">Step 2</span>
                    <span className="text-[11px] text-slate-400">Approve in Tab</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-emerald-300 block">Step 3</span>
                    <span className="text-[11px] text-emerald-400 font-semibold">12 Searches / 12h</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info Notice */}
          <div className="mt-5 space-y-2">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Tier Allowances:</strong> Guest mode grants 6 searches every 12h. Discord grants 12 searches. Secret promo passes grant <strong>Unlimited searches (∞)</strong> without owner permissions.
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span><strong>Session Persistence:</strong> Your unlimited search pass stays active for this session.</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">{isUnlimited ? '∞ Unlimited' : '12h Window'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
