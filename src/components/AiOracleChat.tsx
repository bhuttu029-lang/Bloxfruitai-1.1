import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Flame, 
  ArrowRight, 
  Lightbulb, 
  Zap, 
  Swords, 
  Map, 
  Moon, 
  Compass, 
  Trophy, 
  HelpCircle, 
  Heart, 
  Shield, 
  Gift, 
  Copy, 
  Check, 
  Radio, 
  ShieldAlert, 
  Activity, 
  Eye, 
  Search,
  ExternalLink,
  ChevronRight,
  Terminal,
  Key,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { TradeSideItem } from '../data/bloxFruitsData';
import { generateLocalOracleResponse, getHardcodedBloxFruitsResponse, generateIntelligentBloxFruitsFallback } from '../utils/bloxChatEngine';
import { sanitizeInput } from '../utils/security';
import { queryWikiForQuestion } from '../utils/browserWikiSync';
import { UserAuthProfile } from '../types';
import { 
  getInitialAuthProfile, 
  consumeAiSearch, 
  fetchServerQuota, 
  connectDiscordAccount, 
  unlockOwnerSession,
  unlockVipUnlimitedSession,
  redeemVipPasscodeOnServer,
  DISCORD_OAUTH_URL 
} from '../utils/aiQuota';
import { 
  getOwnerAuthStatus, 
  setOwnerAuthStatus,
  setAdminAuthStatus,
  loginOwnerWithServer, 
  verifyOwnerOtpWithServer,
  armOwnerSequenceOnServer,
  loginAdminWithServer 
} from '../data/bloxFruitsData';
import { AuthModal } from './AuthModal';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  categoryTag?: string;
}

interface AiOracleChatProps {
  currentTrade?: {
    yourItems: TradeSideItem[];
    theirItems: TradeSideItem[];
  };
  initialQuery?: string;
}

interface QuickDeckPrompt {
  title: string;
  desc: string;
  prompt: string;
  icon: string;
  color: string;
  badge: string;
}

const FEATURED_HERO_PROMPTS: QuickDeckPrompt[] = [
  {
    title: '🛡️ Anti-Cheat & Bot Counters',
    desc: 'Turn a deaf ear to auto-bounty scripts & fly-hackers',
    prompt: 'How to "Turn a Deaf Ear" to Cheaters (Beat Auto-Bounty Bots & Scripting)',
    icon: '🛡️',
    color: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20 text-cyan-300 border-cyan-500/40',
    badge: 'PvP Defense'
  },
  {
    title: '💨 Click-to-Move Sky Glitch',
    desc: 'Master the high-jump height tech & flash step reset',
    prompt: 'What is the "Click to Move" High Jump / Sky Glitch and Shift-Lock Reset?',
    icon: '⚡',
    color: 'from-amber-500/20 via-orange-500/10 to-red-500/20 text-amber-300 border-amber-500/40',
    badge: 'Movement Tech'
  },
  {
    title: '🌊 Sea Danger 6 & Leviathan',
    desc: 'Frozen Dimension, Beast Hunter harpoon & heart drop',
    prompt: 'What happens at Sea Danger Level 6 and how do I spawn the Leviathan & harvest its Heart?',
    icon: '🐉',
    color: 'from-purple-500/20 via-indigo-500/10 to-blue-500/20 text-purple-300 border-purple-500/40',
    badge: 'Sea Events'
  },
  {
    title: '🌕 Race V4 All 6 Trials',
    desc: 'Blue Gear, Mirage Island, Lever & Tier 1-3 Gears',
    prompt: 'How to get Blue Gear on Mirage Island and unlock all Race V4 trials (Cyborg, Shark, Angel, Human, Mink, Ghoul)?',
    icon: '🌕',
    color: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20 text-emerald-300 border-emerald-500/40',
    badge: 'Race V4'
  }
];

const CATEGORY_PROMPTS = [
  {
    category: '🛡️ Anti-Cheat & Bot Counters',
    icon: '🛡️',
    prompts: [
      'How to "Turn a Deaf Ear" to Cheaters (Beat Auto-Bounty Bots & Scripting)',
      'How to counter auto-aim scripts and fly-hackers in PvP?',
      'Why does the Safe-Zone boundary break bounty bot scripts?',
      'Best fruits and stuns to freeze auto-aim scripters in air'
    ]
  },
  {
    category: '💨 Movement Glitches & Tech',
    icon: '💨',
    prompts: [
      'What is the "Click to Move" High Jump / Sky Glitch?',
      'How does the Shift-Lock / Flash Step Direction Reset work?',
      'Why do players launch massive distances using Skill-Dashing (Godhuman/Dragonheart)?',
      'How do I escape infinite ground-combo locks?'
    ]
  },
  {
    category: '🌊 Danger Levels & Leviathan',
    icon: '🌊',
    prompts: [
      'What happens at Sea Danger Level 6 and how do I survive without my boat destroying?',
      'How do I spawn the Leviathan and the Frozen Dimension?',
      'How to harvest the Leviathan Heart using the Beast Hunter harpoon?',
      'Does having more players on a boat increase Sea Event spawn rates?'
    ]
  },
  {
    category: '🦈 Terrorshark & Kitsune Shrine',
    icon: '🦈',
    prompts: [
      'How do I craft the Monster Magnet and get the 100% Shark Anchor drop?',
      'How do I spawn Kitsune Island during a Full Moon and what are the rewards?',
      'How many Azure Flames should I offer at the Kitsune Shrine for Fox Lamp and Kitsune Mask?',
      'How to get Terror Jaw and Tooth Necklace?'
    ]
  },
  {
    category: '👑 World Bosses & Secret Rooms',
    icon: '👑',
    prompts: [
      'How do I spawn the Saber Expert, Darkbeard, rip_indra, and Dough King?',
      'How do I open the Colosseum Secret Door, Ice Castle Library, and Hydra Waterfall room?',
      'When do Full Moons, Legendary Sword Dealer, Master of Auras, and Physical Fruits spawn?',
      'How to unlock the Shipwright Subclass and craft the Beast Hunter ship?'
    ]
  },
  {
    category: '🌕 Race V4 & Gears (All 6 Races)',
    icon: '🌕',
    prompts: [
      'How to get Blue Gear on Mirage Island during Full Moon?',
      'How to unlock Cyborg V4 (Trial of Machines)?',
      'How to unlock Shark V4 (Trial of Water)?',
      'Explain Angel V4, Human V4, Mink V4, and Ghoul V4 gear upgrades.'
    ]
  },
  {
    category: '🏹 Limited Events & Rare Items',
    icon: '🏹',
    prompts: [
      'How was Cupid Helmet and Cupid Coat obtained in Valentine Event?',
      'How to get Dark Coat from Darkbeard in Second Sea?',
      'How was Santa Hat and Holiday Cloak obtained in Christmas Event?',
      'How to get Dog Blade in August 2026 Event?'
    ]
  },
  {
    category: '⚔️ Swords, Styles & Trading',
    icon: '⚔️',
    prompts: [
      'How do I unlock Cursed Dual Katana (CDK) and True Triple Katana (TTK)?',
      'How to get Godhuman and Sanguine Art?',
      'How to get Fruit Notifier and what is it worth?',
      'Explain the 40% in-game Beli trading rule.'
    ]
  }
];

export const AiOracleChat: React.FC<AiOracleChatProps> = ({ currentTrade, initialQuery }) => {
  const [authProfile, setAuthProfile] = useState<UserAuthProfile>(() => getInitialAuthProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [hoursRemainingStr, setHoursRemainingStr] = useState<string>('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Ahoy! I am **Solas**, your Blox Fruits Grandmaster AI & Trading Sensei.\nAsk me anything about item obtainment, Race V4 gears, game mechanics, or trade evaluations!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [copiedDcCredit, setCopiedDcCredit] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const ownerStep1TimeRef = useRef<number>(0);
  const ownerStep1TextCountRef = useRef<number>(0);
  const ownerOtpTokenRef = useRef<string | null>(null);
  const ownerOtpExpiresRef = useRef<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertNewline = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setInput(prev => prev + '\n');
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = input.substring(0, start) + '\n' + input.substring(end);
    setInput(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  // Sync auth profile & check URL for Discord OAuth return
  useEffect(() => {
    // 1. Check URL query parameters for Discord callback
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const discordAuth = urlParams.get('discord_auth');
      const discordId = urlParams.get('discord_id');
      const discordUser = urlParams.get('discord_user');

      if (discordAuth === 'success') {
        const updated = connectDiscordAccount(authProfile, {
          id: discordId || 'dc_' + Date.now().toString(36),
          username: discordUser || 'BloxPlayer',
          connectedAt: Date.now()
        });
        setAuthProfile(updated);
        soundFX.playWin();
        // Clean URL query
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // 2. Fetch server quota status
    fetchServerQuota(authProfile).then((serverQuota) => {
      if (serverQuota) {
        setAuthProfile((prev) => ({
          ...prev,
          searchesUsed: serverQuota.searchesUsed,
          maxSearches: serverQuota.maxSearches,
          windowResetTime: serverQuota.windowResetTime
        }));
      }
    });

    // 3. Listen to profile update broadcast
    const handleProfileUpdate = (e: any) => {
      if (e.detail) setAuthProfile(e.detail);
    };
    window.addEventListener('blox_auth_profile_updated', handleProfileUpdate);
    return () => window.removeEventListener('blox_auth_profile_updated', handleProfileUpdate);
  }, []);

  // Update 12-hour countdown
  useEffect(() => {
    const updateCountdown = () => {
      const diff = authProfile.windowResetTime - Date.now();
      if (diff <= 0) {
        setHoursRemainingStr('12h Window resetting');
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setHoursRemainingStr(`${hrs}h ${mins}m`);
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, [authProfile.windowResetTime]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyDiscordCredit = () => {
    navigator.clipboard.writeText('1_solas (DC: 1304013684577665074)');
    setCopiedDcCredit(true);
    soundFX.playPop();
    setTimeout(() => setCopiedDcCredit(false), 2200);
  };

  const copyMessageText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    soundFX.playPop();
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const queryGeminiAiFallback = async (message: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.success && data.reply && typeof data.reply === 'string') {
        return data.reply.trim();
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleSend = async (queryText?: string) => {
    const rawText = (queryText || input).trim();
    const textToSend = sanitizeInput(rawText);
    if (!textToSend || isLoading) return;

    soundFX.playPop();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const clean = textToSend.trim();
    const lower = clean.toLowerCase();

    // 0. Check if awaiting Step 3 OTP verification
    const is6DigitOtp = /^\d{6}$/.test(clean) || /^(\/otp|otp:?)\s*(\d{6})$/i.test(clean);
    if (ownerOtpTokenRef.current && Date.now() < ownerOtpExpiresRef.current && is6DigitOtp) {
      const match = clean.match(/\d{6}/);
      const otpCode = match ? match[0] : clean;
      const verifyRes = await verifyOwnerOtpWithServer(otpCode, ownerOtpTokenRef.current);
      if (verifyRes.success) {
        ownerOtpTokenRef.current = null;
        ownerOtpExpiresRef.current = 0;
        setOwnerAuthStatus(true);
        setAdminAuthStatus(true);
        const unlockedProfile = unlockOwnerSession(authProfile);
        setAuthProfile(unlockedProfile);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('blox_fruits_open_owner_vault', { detail: {} }));
        }

        soundFX.playWin();

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: `👑 **GRANDMASTER OWNER CLEARANCE FULLY ACCEPTED**\n\n• **Clearance:** Grandmaster Verified (1_solas Core)\n• **Security Gate:** 3-Factor Gmail OTP Passed\n• **Status:** Secret Control Center & Unlimited Searches active!\n\n⚡ *Opening the Grandmaster Owner Vault now...*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      } else {
        soundFX.playPop();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: `❌ **Invalid OTP Code**\n${verifyRes.error || 'The 6-digit code does not match.'}\n\nPlease check the verification email sent to **bhuttu029@gmail.com**, or restart the authorization sequence.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      }
    }

    // 0a. Step 1 of Mandatory Owner Protocol: "477047704770" (Silent Arming)
    const isStep1Input = lower === '477047704770' || lower === '/477047704770' || lower === 'code 477047704770' || lower === 'code: 477047704770' || lower === 'code:477047704770' || clean === '477047704770';
    if (isStep1Input) {
      ownerStep1TimeRef.current = Date.now();
      ownerStep1TextCountRef.current = 0;
      armOwnerSequenceOnServer('477047704770').catch(() => {});
      // Silently arms the 45-second / 3-message window; let the AI respond completely normally as a regular chat interaction
    }

    // Check armed state status for 45s and 3 messages limit
    const elapsedSinceStep1 = ownerStep1TimeRef.current > 0 ? (Date.now() - ownerStep1TimeRef.current) : 0;
    const isStep1TimeValid = ownerStep1TimeRef.current > 0 && elapsedSinceStep1 <= 45000;
    const isStep1CountValid = ownerStep1TimeRef.current > 0 && ownerStep1TextCountRef.current <= 3;
    const isSequenceArmed = isStep1TimeValid && isStep1CountValid;

    // 0b. Step 2 of Mandatory Owner Protocol: "mouse4770" or combined sequence "477047704770mouse4770"
    const isMasterKeyInput = lower === 'mouse4770' || lower === '/mouse4770' || lower === '/owner mouse4770' || lower === 'owner mouse4770' || lower === 'owner:mouse4770' || lower === 'owner: mouse4770' || clean === 'mouse4770';
    const isCombinedFullKey = lower === '477047704770mouse4770' || lower === '477047704770 mouse4770' || lower === '/owner 477047704770mouse4770' || lower === '/vault 477047704770mouse4770';

    if (isMasterKeyInput || isCombinedFullKey) {
      // ONLY trigger if sequence was armed within 45s / 3 texts or combined key provided
      if (isSequenceArmed || isCombinedFullKey) {
        // Reset armed state
        ownerStep1TimeRef.current = 0;
        ownerStep1TextCountRef.current = 0;

        // Trigger Step 3 Gmail OTP flow with backend
        const loginRes = await loginOwnerWithServer('mouse4770', '477047704770');
        if (loginRes.requiresOtp && loginRes.otpToken) {
          ownerOtpTokenRef.current = loginRes.otpToken;
          ownerOtpExpiresRef.current = Date.now() + 300000;

          // Dispatch event to open modal
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('blox_fruits_open_owner_vault', { detail: {} }));
          }

          soundFX.playPop();

          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'ai',
              text: `🔐 **GRANDMASTER OWNER PROTOCOL — STEP 3 (GMAIL OTP REQUIRED)**\n\n• **Step 1 (Pre-Auth):** ✅ Clearance Code Verified\n• **Step 2 (Master Key):** ✅ Master Key Verified\n• **Step 3 (MANDATORY):** A secure 6-digit OTP code has been dispatched to **bhuttu029@gmail.com**.\n\n⚡ *Please reply with your 6-digit OTP code into this chat or enter it directly in the Owner Vault modal to unlock access.*`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsLoading(false);
          return;
        } else if (loginRes.success) {
          setOwnerAuthStatus(true);
          setAdminAuthStatus(true);
          const unlockedProfile = unlockOwnerSession(authProfile);
          setAuthProfile(unlockedProfile);

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('blox_fruits_open_owner_vault', { detail: {} }));
          }

          soundFX.playWin();

          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'ai',
              text: `👑 **GRANDMASTER OWNER CLEARANCE ACCEPTED**\n\n• **Clearance:** Grandmaster Verified (1_solas Core)\n• **Security Gate:** Authenticated\n• **Status:** Secret Control Center & Unlimited Searches active!\n\n⚡ *Opening the Grandmaster Owner Vault now...*`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsLoading(false);
          return;
        }
      } else {
        // If entered out-of-sequence or expired: silently reset and act completely normal (zero hints)
        ownerStep1TimeRef.current = 0;
        ownerStep1TextCountRef.current = 0;
      }
    }

    // If pre-auth was armed and user typed a regular message (not 4770 and not master key), advance message counter
    if (ownerStep1TimeRef.current > 0 && !isStep1Input) {
      ownerStep1TextCountRef.current += 1;
      if (ownerStep1TextCountRef.current > 3 || (Date.now() - ownerStep1TimeRef.current) > 45000) {
        ownerStep1TimeRef.current = 0;
        ownerStep1TextCountRef.current = 0;
      }
    }

    // 0c. Admin Username & Password Authentication
    // Format 1: Multi-line in chat (Upper line username, Lower line password)
    // Format 2: "admin [user] [pass]" or "login [user] [pass]" or "user:pass"
    let candidateUser = '';
    let candidatePass = '';
    const lines = textToSend.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length >= 2) {
      candidateUser = lines[0];
      candidatePass = lines[1];
    } else if (clean.includes(' ') && !clean.includes('trade')) {
      const parts = clean.split(/\s+/);
      if (parts.length === 2) {
        candidateUser = parts[0];
        candidatePass = parts[1];
      } else if (parts.length === 3 && (parts[0].toLowerCase() === 'admin' || parts[0].toLowerCase() === 'login')) {
        candidateUser = parts[1];
        candidatePass = parts[2];
      }
    } else if (clean.includes(':')) {
      const parts = clean.split(':');
      if (parts.length === 2) {
        candidateUser = parts[0].trim();
        candidatePass = parts[1].trim();
      }
    }

    if (candidateUser && candidatePass) {
      const adminRes = await loginAdminWithServer(candidateUser, candidatePass);
      if (adminRes.success && adminRes.account) {
        const unlockedVipProfile = unlockVipUnlimitedSession(authProfile);
        setAuthProfile(unlockedVipProfile);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('blox_fruits_open_admin_panel', { 
            detail: { username: adminRes.account.username } 
          }));
        }
        soundFX.playWin();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: `🛡️ **ADMIN ACCESS AUTHORIZED**\n\n• **User:** @${adminRes.account.username}\n• **Role:** ${adminRes.account.displayName || 'Moderator'}\n• **Status:** Admin Management Panel is now unlocked!\n\n⚡ *Opening the Admin Panel now... You can change live fruit values and permanently add new fruits.*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      }
    }

    // 0d. Promo Code: Unlocks infinite searches for this session
    if (clean.length >= 4 && clean.length <= 32) {
      const vipRes = await redeemVipPasscodeOnServer(clean);
      if (vipRes.success) {
        const unlockedVipProfile = unlockVipUnlimitedSession(authProfile);
        setAuthProfile(unlockedVipProfile);
        soundFX.playWin();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: `✨ **Unlimited Search Access Pass Unlocked!**\n\nYour secret unlock passcode has been successfully applied to your session.\n\n• **Search Quota:** ∞ Unlimited (Infinite Searches)\n• **12-Hour Limits:** Completely Bypassed\n• **Status:** Active for this session\n\nYou can now ask any question, analyze builds, calculate trades, and chat with Solas AI without limits!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      }
    }

    // --- 12-HOUR RATE LIMIT / QUOTA CHECK (IP & DISCORD) ---
    const quotaCheck = await consumeAiSearch(authProfile);
    if (!quotaCheck.allowed) {
      soundFX.playLoss();
      const limitMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⛔ **12-Hour AI Search Limit Reached**\n\nYou have used all **${authProfile.maxSearches} searches** available for your current tier in this 12-hour window.\n\n*Window resets in: ${hoursRemainingStr}*\n\n🔓 **Ways to unlock more searches:**\n1. **Connect Discord Account:** Double your quota to **8 searches per 12 hours**.\n2. **Authorize Google Account:** Unlock **FULL UNLIMITED ACCESS (∞)** to Solas Grandmaster AI.\n\nClick the **Authorization & Tier Hub** button above to connect your account!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, limitMsg]);
      setIsLoading(false);
      setIsAuthModalOpen(true);
      return;
    }

    // Update state with newly consumed search
    setAuthProfile(quotaCheck.updatedProfile);

    // --- STRICT WATERFALL ROUTING ARCHITECTURE (Zero Interference Guarantee) ---
    let replyText = '';

    // STEP 1: Strict Hardcoded Rules, Calculations, Dev Credits, Mutation Lab, FAQs & Item Data
    // (If our internal code or game datasets have an exact match, use it immediately!)
    const hardcodedReply = getHardcodedBloxFruitsResponse(textToSend, currentTrade);
    if (hardcodedReply) {
      replyText = hardcodedReply;
    }

    // STEP 2: Live Blox Fruits Wiki Database
    // (If no hardcoded rule matched, search official Blox Fruits wiki articles)
    if (!replyText) {
      try {
        const wikiResult = await queryWikiForQuestion(textToSend);
        if (wikiResult && wikiResult.extract && wikiResult.extract.length > 50) {
          replyText = `🌐 **Blox Fruits Wiki Live Intel: ${wikiResult.title}**\n\n${wikiResult.extract}\n\n🔗 *Official Wiki Entry:* ${wikiResult.url}\n*(Retrieved directly from browser wiki stream • 100% Free & Continuous)*`;
        }
      } catch {
        // Wiki search silent catch; proceed to cloud AI fallback
      }
    }

    // STEP 3: Gemini Cloud AI Conversational Fallback
    // (ONLY used when NEITHER the hardcoded code/data NOR the wiki had any keywords or rules)
    if (!replyText) {
      const geminiReply = await queryGeminiAiFallback(textToSend);
      if (geminiReply) {
        replyText = geminiReply;
      } else {
        // STEP 4: Seamless Client-Side Intelligent Fallback Pool (Zero-failure safety net)
        replyText = generateIntelligentBloxFruitsFallback(textToSend);
      }
    }

    soundFX.playWin();
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsLoading(false);
  };

  return (
    <div id="ai-oracle-container" className="space-y-6">
      {/* 1. HERO VFX AI REACTOR CORE BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 via-indigo-950/70 to-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl overflow-hidden neon-border-cyan">
        {/* Animated Background Energy Rings & Floating Glyphs */}
        <div className="absolute top-[-50px] right-[-50px] w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/15 to-transparent blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-30px] w-80 h-80 rounded-full bg-gradient-to-tr from-amber-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Ambient Orbiting Ring */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
          <div className="w-56 h-56 rounded-full border border-cyan-400/30 border-dashed animate-spin-slow flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border border-purple-400/40 animate-spin-reverse flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-amber-400/30 flex items-center justify-center">
                <span className="text-2xl animate-float">☀️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* 3D Animated Solas Core Reactor */}
            <div className="relative shrink-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 p-[2px] shadow-xl shadow-cyan-500/30"
              >
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 animate-pulse" />
                  <span className="text-2xl sm:text-3xl font-black relative z-10 animate-float">☀️</span>
                </div>
              </motion.div>
              {/* Online Pulse Beacon */}
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-emerald-500 absolute animate-ping opacity-75" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 relative z-10" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 tracking-tight">
                  Solas • Blox Fruits Grandmaster AI
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 text-cyan-400 animate-pulse" /> Embedded 2026 Engine
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Instant offline encyclopedia for all 33 master FAQ branches, Anti-Cheat combat exploitation, movement glitch mechanics, Sea Danger 1-6 & Leviathan harpoon, Race V4 tier branches, and boss timers.
              </p>

              {/* Real-time Frequency Wave Visualizer */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-slate-300 font-bold">Haki Core:</span>
                  <div className="flex items-center gap-0.5 mx-1">
                    {[12, 18, 8, 22, 14, 20, 10, 16, 24, 12].map((height, i) => (
                      <span
                        key={i}
                        className="w-1 bg-gradient-to-t from-cyan-500 to-purple-400 rounded-full animate-pulse"
                        style={{
                          height: `${isLoading ? height : 6}px`,
                          animationDelay: `${i * 0.15}s`,
                          transition: 'height 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-cyan-400 font-mono text-[10px]">0ms Latency</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-xl border border-purple-500/30">
                  <Flame className="w-3.5 h-3.5 text-purple-400" />
                  <span>33 Master Codexes</span>
                </div>

                <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Direct Browser Wiki: Free Continuous Sync</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discord Dev Credits Badge & Auth Tier Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              id="solas-auth-hub-btn"
              onClick={() => {
                soundFX.playPop();
                setIsAuthModalOpen(true);
              }}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-black flex items-center justify-between gap-2.5 transition-all shadow-lg cursor-pointer active:scale-95 ${
                authProfile.tier === 'owner'
                  ? 'bg-amber-950/90 border-amber-500/60 text-amber-200 hover:bg-amber-900 shadow-amber-950/50'
                  : authProfile.tier === 'vip'
                  ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900 shadow-emerald-950/50'
                  : authProfile.tier === 'discord'
                  ? 'bg-indigo-950/90 border-indigo-500/60 text-indigo-200 hover:bg-indigo-900 shadow-indigo-950/50'
                  : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200 hover:bg-cyan-900 shadow-cyan-950/50'
              }`}
              title="Click to manage 12-hour search limit and authorization tiers"
            >
              <div className="flex items-center gap-2">
                {authProfile.tier === 'owner' ? (
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                ) : authProfile.tier === 'vip' ? (
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                ) : (
                  <Key className="w-4 h-4 text-cyan-400" />
                )}
                <span>
                  {authProfile.tier === 'owner'
                    ? '👑 Owner: Unlimited (∞)'
                    : authProfile.tier === 'vip'
                    ? '⚡ VIP: Unlimited Searches (∞)'
                    : authProfile.tier === 'discord'
                    ? `💬 Discord Member (${Math.max(0, authProfile.maxSearches - authProfile.searchesUsed)}/12 left)`
                    : `🛡️ Guest Free (${Math.max(0, authProfile.maxSearches - authProfile.searchesUsed)}/6 left)`}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-black/40 text-white font-mono border border-white/10">
                {authProfile.tier === 'owner' || authProfile.tier === 'vip' ? '∞ Unlimited' : authProfile.tier === 'discord' ? '12 / 12h' : '6 / 12h'}
              </span>
            </button>

            <button
              id="solas-dc-credit-btn"
              onClick={copyDiscordCredit}
              className="px-4 py-2.5 rounded-2xl bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/50 text-xs text-indigo-200 font-extrabold flex items-center justify-between gap-2.5 transition-all shadow-lg shadow-indigo-950/50 cursor-pointer active:scale-95 group"
              title="Click to copy Discord handle"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">💬</span>
                <span>Credits: <strong className="text-white">1_solas</strong></span>
              </div>
              <span className="text-[10px] bg-indigo-500/30 px-2 py-0.5 rounded-lg text-indigo-100 font-mono border border-indigo-500/40 group-hover:bg-indigo-500/50 transition-colors">
                {copiedDcCredit ? '✓ Copied!' : '1304013684577665074'}
              </span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setMessages([
                  {
                    id: 'welcome-reset',
                    sender: 'ai',
                    text: 'Chat history reset. I am **Solas**!\nAsk me anything about items, Race V4 gears, game mechanics, or trade evaluations.',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              className="px-3 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
              title="Reset Chat Session"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEATURED INTERACTIVE VFX COMBAT PROMPT CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>High-Priority Grandmaster Runes</span>
          </div>
          <span className="text-[11px] text-slate-500">Tap any card to query Solas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FEATURED_HERO_PROMPTS.map((item, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSend(item.prompt)}
              className={`p-4 rounded-2xl bg-gradient-to-b ${item.color} border text-left flex flex-col justify-between gap-3 shadow-lg transition-all relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-950/80 border border-current text-white">
                  {item.badge}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 pt-1 border-t border-white/10 group-hover:translate-x-1 transition-transform">
                <span>Deploy Query</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3. MAIN CHAT CONSOLE WITH NEON BORDERS & PARTICLES */}
      <div className="flex flex-col h-[680px] bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl relative">
        {/* Category Navigation Ribbon */}
        <div className="p-3 bg-slate-950/95 border-b border-slate-800/90 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORY_PROMPTS.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFX.playPop();
                setSelectedCategory(idx);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Fast Prompts:
          </span>
          {CATEGORY_PROMPTS[selectedCategory].prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all whitespace-nowrap active:scale-95 shadow-sm"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon with Glowing Ring */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white border border-indigo-400/40'
                    : 'bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 text-slate-950 border border-cyan-300/40 shadow-cyan-500/20'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : '☀️'}
              </div>

              {/* Message Box */}
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xl relative group ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-none shadow-cyan-900/30'
                    : 'bg-slate-950/90 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-black/40'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Footer bar with timestamp and copy button */}
                <div
                  className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                    msg.sender === 'user'
                      ? 'border-cyan-400/20 text-cyan-100'
                      : 'border-slate-800/80 text-slate-500'
                  }`}
                >
                  <span className="font-mono">{msg.timestamp}</span>

                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => copyMessageText(msg.id, msg.text)}
                      className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 font-bold transition-colors px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/30"
                      title="Copy guide text"
                    >
                      {copiedMsgId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Thinking / Calculating VFX State */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 text-slate-950 flex items-center justify-center text-sm font-black shrink-0 animate-pulse">
                ☀️
              </div>
              <div className="p-4 rounded-3xl rounded-tl-none bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm flex items-center gap-3 shadow-lg shadow-cyan-950/30">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="font-medium animate-pulse">
                  Querying Solas knowledge core for exact obtainment steps & stats...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Interactive Input Bar */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-950/90 backdrop-blur-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      handleSend();
                    }
                  }
                }}
                placeholder="Ask Solas: 'How to get Cupid Helmet?', 'How to beat bounty bots?', 'How to get CDK?'..."
                disabled={isLoading}
                className="w-full pl-4 pr-24 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 transition-all shadow-inner resize-none max-h-32 min-h-[48px]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleInsertNewline}
                  className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-bold border border-slate-700 transition-all shadow-sm cursor-pointer flex items-center gap-0.5"
                  title="Insert New Line (Change Line on Mobile/Phone)"
                >
                  <span>↵</span>
                  <span>New Line</span>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-2xl font-black shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 shrink-0"
            >
              <span>Transmit</span>
              <Send className="w-4 h-4" />
            </motion.button>
          </form>

          {/* 12-Hour Quota & AI Disclaimer Footnote */}
          <div className="mt-2.5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1.5 px-1">
            <div className="flex items-center gap-1.5">
              <span>⚠️ <strong>Notice:</strong> AI can make mistakes. Verify important trades with recent market logs.</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-slate-500">Free Guests: 6 searches/12h • Discord: 12 searches/12h</span>
              <button
                onClick={() => {
                  soundFX.playPop();
                  setIsAuthModalOpen(true);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
              >
                {authProfile.discord ? 'Manage Discord' : 'Authorize Discord'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Hour Tier Quota & Account Authorization Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authProfile={authProfile}
        onProfileUpdated={setAuthProfile}
      />
    </div>
  );
};
