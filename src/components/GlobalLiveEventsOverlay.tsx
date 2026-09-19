import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Crown, 
  Radio, 
  Volume2, 
  VolumeX, 
  X, 
  Disc3, 
  Bot, 
  Sparkles, 
  Flame, 
  Clock, 
  Music,
  PartyPopper
} from 'lucide-react';
import { GlobalLiveEvent } from '../types';
import { soundFX } from '../utils/audio';

export const GlobalLiveEventsOverlay: React.FC = () => {
  const [activeBroadcast, setActiveBroadcast] = useState<GlobalLiveEvent | null>(null);
  const [activeDisco, setActiveDisco] = useState<GlobalLiveEvent | null>(null);
  const [discoRemaining, setDiscoRemaining] = useState<number>(0);
  const [isDiscoMuted, setIsDiscoMuted] = useState<boolean>(false);
  const [activeAiSpam, setActiveAiSpam] = useState<GlobalLiveEvent | null>(null);
  const [currentSpamIndex, setCurrentSpamIndex] = useState<number>(0);
  const [spamMessagesList, setSpamMessagesList] = useState<string[]>([]);
  const [visibleSpamCards, setVisibleSpamCards] = useState<Array<{ id: string; text: string; idx: number }>>([]);

  const handledEventIdsRef = useRef<Set<string>>(new Set());
  const discoAudioIntervalRef = useRef<any>(null);

  // Poll server endpoint as instant/offline fallback to ensure 100% sync
  useEffect(() => {
    const pollServerEvents = async () => {
      try {
        const res = await fetch('/api/global-event/live');
        if (res.ok) {
          const data = await res.json();
          if (data.activeEvent) {
            handleIncomingEvent(data.activeEvent);
          }
        }
      } catch {}
    };

    pollServerEvents();
    const interval = setInterval(pollServerEvents, 4000);
    return () => clearInterval(interval);
  }, []);

  // Listen to Firestore real-time window events
  useEffect(() => {
    const handleEventTriggered = (e: any) => {
      const event: GlobalLiveEvent = e.detail;
      if (event) {
        handleIncomingEvent(event);
      }
    };

    const handleEventCleared = () => {
      setActiveBroadcast(null);
      setActiveDisco(null);
      setActiveAiSpam(null);
      setVisibleSpamCards([]);
    };

    window.addEventListener('blox_fruits_global_event_triggered', handleEventTriggered);
    window.addEventListener('blox_fruits_global_event_cleared', handleEventCleared);

    return () => {
      window.removeEventListener('blox_fruits_global_event_triggered', handleEventTriggered);
      window.removeEventListener('blox_fruits_global_event_cleared', handleEventCleared);
    };
  }, []);

  const handleIncomingEvent = (event: GlobalLiveEvent) => {
    const now = Date.now();
    if (event.expiresAt && event.expiresAt <= now) return;

    const isNew = !handledEventIdsRef.current.has(event.id);
    handledEventIdsRef.current.add(event.id);

    if (event.type === 'broadcast') {
      setActiveBroadcast(event);
      if (isNew) {
        soundFX.playConquerorBlast();
      }
    } else if (event.type === 'disco') {
      setActiveDisco(event);
      const remainingSecs = Math.max(1, Math.ceil((event.expiresAt - now) / 1000));
      setDiscoRemaining(remainingSecs);

      if (isNew) {
        soundFX.playDiscoBeat();
        // Fire celebration confetti cannon
        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    } else if (event.type === 'ai_spam') {
      setActiveAiSpam(event);
      const messages = event.spamMessages && event.spamMessages.length > 0 
        ? event.spamMessages 
        : [event.message || '⚡ SOLAS AI COMMANDS COMPLIANCE! ⚡'];
      
      setSpamMessagesList(messages);
      setCurrentSpamIndex(0);

      if (isNew) {
        soundFX.playAiSpamChime();
        // Fire a stream of cards with interval
        const intervalMs = event.burstIntervalMs || 2200;
        messages.forEach((msg, idx) => {
          setTimeout(() => {
            const cardId = `spam_${Date.now()}_${idx}`;
            setVisibleSpamCards((prev) => [...prev.slice(-3), { id: cardId, text: msg, idx }]);
            soundFX.playAiSpamChime();
          }, idx * intervalMs);
        });
      }
    }
  };

  // Broadcast auto-expiration timer
  useEffect(() => {
    if (!activeBroadcast) return;
    const now = Date.now();
    const delay = Math.max(100, activeBroadcast.expiresAt - now);
    const timer = setTimeout(() => {
      setActiveBroadcast(null);
    }, delay);
    return () => clearTimeout(timer);
  }, [activeBroadcast]);

  // Disco countdown timer & rhythmic party pulse
  useEffect(() => {
    if (!activeDisco) {
      if (discoAudioIntervalRef.current) clearInterval(discoAudioIntervalRef.current);
      return;
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.ceil((activeDisco.expiresAt - now) / 1000));
      setDiscoRemaining(left);
      if (left <= 0) {
        setActiveDisco(null);
      }
    }, 1000);

    // Disco beat loop (every 3.5s if not muted)
    discoAudioIntervalRef.current = setInterval(() => {
      if (!isDiscoMuted) {
        soundFX.playDiscoBeat();
      }
    }, 3600);

    return () => {
      clearInterval(timer);
      if (discoAudioIntervalRef.current) clearInterval(discoAudioIntervalRef.current);
    };
  }, [activeDisco, isDiscoMuted]);

  // AI spam auto-cleanup timer
  useEffect(() => {
    if (!activeAiSpam) return;
    const now = Date.now();
    const delay = Math.max(500, activeAiSpam.expiresAt - now);
    const timer = setTimeout(() => {
      setActiveAiSpam(null);
      setVisibleSpamCards([]);
    }, delay);
    return () => clearTimeout(timer);
  }, [activeAiSpam]);

  return (
    <>
      {/* 1. DISCO / PARTY MODE AMBIENT OVERLAY */}
      <AnimatePresence>
        {activeDisco && (
          <motion.div
            key="disco-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          >
            {/* Animated Strobe & Neon Aurora Canvas */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 mix-blend-screen animate-pulse" />
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2), transparent 70%)',
                animation: 'spin 12s linear infinite'
              }}
            />

            {/* RAINING TACOS & PARTY CONFETTI ANIMATION CANNON */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => {
                const emojis = ['🌮', '🌮', '🌯', '🎉', '✨', '🌮', '🧀', '🌮', '🔥'];
                const emoji = emojis[i % emojis.length];
                const leftPos = (i * 4.2) % 96;
                const duration = 2.5 + (i % 5) * 0.5;
                const delay = (i % 6) * 0.4;
                const size = 24 + (i % 4) * 8;
                return (
                  <motion.div
                    key={`taco-rain-${i}`}
                    initial={{ y: -60, x: `${leftPos}vw`, rotate: 0, opacity: 0 }}
                    animate={{
                      y: ['0vh', '110vh'],
                      rotate: [0, (i % 2 === 0 ? 360 : -360)],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: duration,
                      delay: delay,
                      ease: 'linear'
                    }}
                    style={{ fontSize: `${size}px` }}
                    className="absolute top-0 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                  >
                    {emoji}
                  </motion.div>
                );
              })}
            </div>

            {/* Floating Top-Right DJ HUD */}
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -60, opacity: 0, scale: 0.9 }}
              className="pointer-events-auto absolute top-20 right-4 sm:right-8 bg-slate-900/95 backdrop-blur-xl border-2 border-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.5)] rounded-2xl p-4 flex items-center gap-4 text-white max-w-sm"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg"
                >
                  <Disc3 className="w-8 h-8 text-white animate-spin" />
                </motion.div>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-[11px] font-black items-center justify-center">🌮</span>
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <span>🌮 RAINING TACOS DISCO</span>
                  </span>
                  <span className="text-xs font-bold text-pink-400 font-mono">
                    {discoRemaining}s
                  </span>
                </div>
                <div className="font-black text-sm text-slate-100 truncate mt-0.5 flex items-center gap-1">
                  <span>{activeDisco.title || '🌮 Raining Tacos Disco Party'}</span>
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <Crown className="w-3 h-3 text-amber-400 inline" />
                  <span>Grandmaster 1_solas DJ Loop</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsDiscoMuted(!isDiscoMuted)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isDiscoMuted ? 'Unmute Taco Audio' : 'Mute Taco Audio'}
                >
                  {isDiscoMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
                <button
                  onClick={() => setActiveDisco(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                  title="Dismiss Disco HUD"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. GLOBAL LIVE BROADCAST BANNER (TOP STRIKE) */}
      <AnimatePresence>
        {activeBroadcast && (
          <motion.div
            key="global-broadcast-banner"
            initial={{ y: -120, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -120, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="fixed top-3 inset-x-0 mx-auto z-50 px-4 max-w-3xl pointer-events-auto"
          >
            <div className={`relative overflow-hidden rounded-2xl border-2 backdrop-blur-xl shadow-2xl p-4 sm:p-5 ${
              activeBroadcast.style === 'conqueror'
                ? 'bg-red-950/95 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] text-red-50'
                : activeBroadcast.style === 'neon'
                ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] text-cyan-50'
                : activeBroadcast.style === 'magma'
                ? 'bg-amber-950/95 border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.4)] text-orange-50'
                : 'bg-slate-900/95 border-amber-400 shadow-[0_0_45px_rgba(251,191,36,0.35)] text-amber-50'
            }`}>
              {/* Header Badges & Author */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    Global Owner Broadcast
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                    <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                    All Servers Synced
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {activeBroadcast.author || '1_solas'}
                  </span>
                  <button
                    onClick={() => setActiveBroadcast(null)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Broadcast Message Title & Body */}
              <div className="space-y-1">
                {activeBroadcast.title && (
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {activeBroadcast.title}
                  </h3>
                )}
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100 whitespace-pre-wrap">
                  {activeBroadcast.message}
                </p>
              </div>

              {/* Progress bar indicating display duration */}
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mt-3">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ 
                    duration: activeBroadcast.durationSeconds || 25, 
                    ease: 'linear' 
                  }}
                  className={`h-full ${
                    activeBroadcast.style === 'conqueror'
                      ? 'bg-red-500'
                      : activeBroadcast.style === 'neon'
                      ? 'bg-cyan-400'
                      : 'bg-amber-400'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. AI-DIRECTED SPAM STREAM (DYNAMIC FLOATING CARDS) */}
      <div className="fixed bottom-6 right-4 sm:right-8 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full">
        <AnimatePresence>
          {visibleSpamCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 80, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.85 }}
              transition={{ type: 'spring', damping: 18, stiffness: 220 }}
              className="pointer-events-auto bg-slate-900/95 backdrop-blur-xl border-2 border-purple-500/80 shadow-[0_0_30px_rgba(168,85,247,0.35)] rounded-2xl p-4 text-slate-100"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-purple-300 flex items-center gap-1">
                      <span>Solas AI Directive</span>
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </div>
                    {activeAiSpam?.directive && (
                      <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                        "{activeAiSpam.directive}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Spam #{card.idx + 1}
                  </span>
                  <button
                    onClick={() => setVisibleSpamCards((prev) => prev.filter((c) => c.id !== card.id))}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-sm font-bold text-white pl-9 pr-2 leading-snug">
                {card.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
