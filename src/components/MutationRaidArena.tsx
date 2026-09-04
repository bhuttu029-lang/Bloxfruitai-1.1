import React, { useState, useEffect, useRef } from 'react';
import { 
  Swords, 
  Shield, 
  Zap, 
  RotateCcw, 
  Crown, 
  Trophy, 
  AlertTriangle, 
  Flame, 
  Sparkles,
  Heart,
  ChevronRight,
  Eye,
  Crosshair
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';
import { RAID_BOSSES, RaidBoss } from '../data/mutationRaidData';
import { MutationMove, MutationAuraTheme } from '../data/mutationLabData';

interface MutationRaidArenaProps {
  customMutationName: string;
  customMutationElement: string;
  customMoves: MutationMove[];
  auraTheme: MutationAuraTheme;
  onAskSensei?: (query: string) => void;
}

export const MutationRaidArena: React.FC<MutationRaidArenaProps> = ({
  customMutationName,
  customMutationElement,
  customMoves,
  auraTheme,
  onAskSensei
}) => {
  const [selectedBoss, setSelectedBoss] = useState<RaidBoss>(RAID_BOSSES[0]);
  const [bossHp, setBossHp] = useState<number>(RAID_BOSSES[0].health);
  const [playerHp, setPlayerHp] = useState<number>(10000);
  const [maxPlayerHp] = useState<number>(10000);
  const [kenCharges, setKenCharges] = useState<number>(8);
  const [maxKenCharges] = useState<number>(8);
  const [isBattleActive, setIsBattleActive] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [isDefeat, setIsDefeat] = useState<boolean>(false);
  const [isEnraged, setIsEnraged] = useState<boolean>(false);
  
  // Cooldowns for moves
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  
  // Combat log
  const [battleLogs, setBattleLogs] = useState<{ id: number; text: string; type: 'player' | 'boss' | 'system' | 'dodge' }[]>([]);
  const [recentFloatingHits, setRecentFloatingHits] = useState<{ id: number; text: string; isCrit?: boolean; isBoss?: boolean }[]>([]);
  
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Initialize or Reset Battle
  const handleStartBattle = (boss: RaidBoss = selectedBoss) => {
    soundFX.playPop();
    setSelectedBoss(boss);
    setBossHp(boss.health);
    setPlayerHp(maxPlayerHp);
    setKenCharges(maxKenCharges);
    setCooldowns({});
    setIsEnraged(false);
    setIsVictory(false);
    setIsDefeat(false);
    setIsBattleActive(true);
    setRecentFloatingHits([]);
    
    setBattleLogs([
      {
        id: Date.now(),
        text: `⚔️ Raid Initiated: ${boss.name} (${boss.title}) emerged from ${boss.sea}!`,
        type: 'system'
      },
      {
        id: Date.now() + 1,
        text: `⚡ Entering arena with active mutation: "${customMutationName}" [${customMutationElement}]`,
        type: 'system'
      }
    ]);
  };

  // Auto-scroll battle log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [battleLogs]);

  // Timer for move cooldowns
  useEffect(() => {
    if (!isBattleActive) return;
    const interval = setInterval(() => {
      setCooldowns(prev => {
        const next: Record<string, number> = {};
        let changed = false;
        Object.entries(prev).forEach(([key, val]) => {
          const numVal = typeof val === 'number' ? val : 0;
          if (numVal > 0.1) {
            next[key] = Math.max(0, parseFloat((numVal - 0.1).toFixed(1)));
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isBattleActive]);

  // Boss Attack Loop
  useEffect(() => {
    if (!isBattleActive || isVictory || isDefeat) return;

    const bossAttackInterval = setInterval(() => {
      // Pick random attack
      const atk = selectedBoss.attacks[Math.floor(Math.random() * selectedBoss.attacks.length)];
      const isEnragedMultiplier = isEnraged ? 1.35 : 1.0;
      const rawDamage = Math.round(atk.damage * isEnragedMultiplier);

      // Check if player has Ken Dodges available and attack is not bypass
      if (kenCharges > 0 && !atk.kenBypass) {
        soundFX.playPop();
        setKenCharges(prev => Math.max(0, prev - 1));
        
        const logId = Date.now();
        setBattleLogs(prev => [
          ...prev.slice(-15),
          {
            id: logId,
            text: `👁️ Observation Haki Activated! Dodged ${selectedBoss.avatarEmoji} ${selectedBoss.name}'s "${atk.name}" (${kenCharges - 1} Ken left)!`,
            type: 'dodge'
          }
        ]);

        setRecentFloatingHits(prev => [
          ...prev.slice(-4),
          { id: logId, text: 'DODGED! (Ken Haki)', isBoss: false }
        ]);
        setTimeout(() => setRecentFloatingHits(prev => prev.filter(h => h.id !== logId)), 1500);
      } else {
        // Player takes hit
        soundFX.playHit();
        setPlayerHp(prev => {
          const nextHp = Math.max(0, prev - rawDamage);
          if (nextHp <= 0) {
            setIsBattleActive(false);
            setIsDefeat(true);
            soundFX.playLoss();
            setBattleLogs(l => [
              ...l,
              {
                id: Date.now() + 2,
                text: `💀 Defeated! You were overpowered by ${selectedBoss.name}. Upgrade your mutation and retry!`,
                type: 'system'
              }
            ]);
          }
          return nextHp;
        });

        const logId = Date.now();
        setBattleLogs(prev => [
          ...prev.slice(-15),
          {
            id: logId,
            text: `💥 ${selectedBoss.avatarEmoji} ${selectedBoss.name} hit you with "${atk.name}" for -${rawDamage.toLocaleString()} DMG! ${atk.kenBypass ? '(Ken Bypassed!)' : ''}`,
            type: 'boss'
          }
        ]);

        setRecentFloatingHits(prev => [
          ...prev.slice(-4),
          { id: logId, text: `-${rawDamage.toLocaleString()} HP!`, isBoss: true }
        ]);
        setTimeout(() => setRecentFloatingHits(prev => prev.filter(h => h.id !== logId)), 1500);
      }
    }, isEnraged ? 2400 : 3200);

    return () => clearInterval(bossAttackInterval);
  }, [isBattleActive, isVictory, isDefeat, selectedBoss, isEnraged, kenCharges]);

  // Player Execute Move
  const handlePlayerAttack = (move: MutationMove) => {
    if (!isBattleActive || isVictory || isDefeat) return;
    if ((cooldowns[move.key] || 0) > 0) return;

    soundFX.playHit();
    // Cooldown
    setCooldowns(prev => ({ ...prev, [move.key]: move.cooldown }));

    // Crit chance based on KenBreak
    const isCrit = move.kenBreak === 'True Break' || Math.random() < 0.25;
    const dmg = Math.round(move.damage * (isCrit ? 1.4 : 1.0));

    setBossHp(prev => {
      const nextHp = Math.max(0, prev - dmg);
      
      // Check Enrage trigger
      if (nextHp <= selectedBoss.health * selectedBoss.enrageThreshold && !isEnraged) {
        setIsEnraged(true);
        soundFX.playWin();
        setBattleLogs(l => [
          ...l,
          {
            id: Date.now() + 5,
            text: `⚠️ ENRAGE PHASE TRIGGERED: ${selectedBoss.name} entered [${selectedBoss.phase2Name}]! +35% ATK speed & damage!`,
            type: 'system'
          }
        ]);
      }

      // Check Victory
      if (nextHp <= 0) {
        setIsBattleActive(false);
        setIsVictory(true);
        soundFX.playSuccess();
        setBattleLogs(l => [
          ...l,
          {
            id: Date.now() + 10,
            text: `🏆 RAID CLEARED! You vanquished ${selectedBoss.name}! Claimed ${selectedBoss.rewards.item} & +${selectedBoss.rewards.fragments.toLocaleString()} Fragments!`,
            type: 'system'
          }
        ]);
      }
      return nextHp;
    });

    const hitId = Date.now();
    setRecentFloatingHits(prev => [
      ...prev.slice(-4),
      { id: hitId, text: `💥 -${dmg.toLocaleString()} DMG (${move.name})`, isCrit }
    ]);
    setTimeout(() => setRecentFloatingHits(prev => prev.filter(h => h.id !== hitId)), 1500);

    setBattleLogs(prev => [
      ...prev.slice(-15),
      {
        id: hitId,
        text: `⚔️ You unleashed [${move.key}] ${move.name} dealing ${dmg.toLocaleString()} DMG! ${isCrit ? '🔥 CRITICAL HIT!' : ''}`,
        type: 'player'
      }
    ]);
  };

  // Manual Ken Haki Recharge / Focus
  const handleRechargeKen = () => {
    if (kenCharges >= maxKenCharges) return;
    soundFX.playPop();
    setKenCharges(maxKenCharges);
    setBattleLogs(prev => [
      ...prev,
      {
        id: Date.now(),
        text: `👁️ Observation Haki fully focused & recharged to ${maxKenCharges} dodges!`,
        type: 'dodge'
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/70 to-slate-900 border border-rose-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-black uppercase tracking-wider mb-2">
              <Swords className="w-3.5 h-3.5" />
              <span>Boss Raid Arena & Gauntlet Trial</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>Test Mutation in High-Stakes Boss Battles ⚔️</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl mt-1">
              Pit your forged mutation against the deadliest Blox Fruits raid bosses. Manage Observation Haki dodges, break boss shields, survive enrage phases, and secure legendary raid rewards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartBattle()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBattleActive ? 'Restart Raid' : 'Launch Raid Battle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOSS SELECTOR CAROUSEL */}
      <div className="space-y-2">
        <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Select Raid Boss Target:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {RAID_BOSSES.map(boss => (
            <button
              key={boss.id}
              onClick={() => handleStartBattle(boss)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedBoss.id === boss.id
                  ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/50 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{boss.avatarEmoji}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                  {boss.sea}
                </span>
              </div>

              <div>
                <div className="font-black text-xs text-white truncate">{boss.name.split('(')[0]}</div>
                <div className="text-[10px] text-rose-400 font-mono font-bold">
                  {(boss.health).toLocaleString()} HP
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE ARENA STAGE (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LIVE BATTLEFIELD (7 COLS) */}
        <div className="lg:col-span-7 space-y-5">
          {/* COMBAT ARENA STAGE */}
          <div className={`p-6 rounded-2xl bg-slate-950 border-2 ${isEnraged ? 'border-rose-500 shadow-rose-950/60 animate-pulse' : 'border-slate-800'} shadow-2xl space-y-5 relative overflow-hidden`}>
            {/* Top Boss HUD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedBoss.avatarEmoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-white">{selectedBoss.name}</h3>
                      {isEnraged && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600 text-white uppercase animate-bounce">
                          ENRAGED
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-semibold">{selectedBoss.element}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-rose-400 font-bold">
                  {bossHp.toLocaleString()} / {selectedBoss.health.toLocaleString()} HP
                </div>
              </div>

              {/* Boss HP Bar */}
              <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${(bossHp / selectedBoss.health) * 100}%` }}
                />
              </div>
            </div>

            {/* Middle Stage: Boss & Player Visual clash */}
            <div className="py-8 px-4 rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 text-center relative flex items-center justify-around">
              {/* Player Avatar */}
              <div className="space-y-1 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-purple-500/30 ring-2 ring-white/20">
                  🧙‍♂️
                </div>
                <div className="text-xs font-black text-white">{customMutationName.split(' ')[0]}</div>
                <div className="text-[10px] text-cyan-300 font-bold">Player</div>
              </div>

              {/* VS Clash Icon */}
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-amber-400 animate-pulse">⚡ VS ⚡</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Raid Battle</span>
              </div>

              {/* Boss Avatar */}
              <div className="space-y-1 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-700 to-rose-900 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-red-500/30 ring-2 ring-red-500/50 ${isEnraged ? 'scale-110' : ''} transition-transform`}>
                  {selectedBoss.avatarEmoji}
                </div>
                <div className="text-xs font-black text-white">{selectedBoss.name.split(' ')[0]}</div>
                <div className="text-[10px] text-rose-400 font-bold">Raid Boss</div>
              </div>

              {/* Floating Hits */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col">
                {recentFloatingHits.map(h => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 1, y: 0, scale: 0.9 }}
                    animate={{ opacity: 0, y: -45, scale: 1.2 }}
                    transition={{ duration: 1.2 }}
                    className={`font-black text-sm drop-shadow-md ${h.isBoss ? 'text-rose-400' : h.isCrit ? 'text-amber-300 text-base' : 'text-cyan-300'}`}
                  >
                    {h.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Player Health & Ken Haki Status */}
            <div className="space-y-2 pt-2 border-t border-slate-900">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Player Health: {playerHp.toLocaleString()} / {maxPlayerHp.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-cyan-300 font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Observation Ken:</span>
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: maxKenCharges }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i < kenCharges ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-slate-800'}`}
                      />
                    ))}
                  </div>
                  {kenCharges < maxKenCharges && (
                    <button
                      onClick={handleRechargeKen}
                      className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold hover:bg-cyan-900"
                    >
                      Focus
                    </button>
                  )}
                </div>
              </div>

              {/* Player HP Bar */}
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                />
              </div>
            </div>

            {/* Victory / Defeat Modal Overlay */}
            {isVictory && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-3">
                <div className="text-3xl">🏆👑</div>
                <h4 className="text-base font-black text-emerald-300">RAID BOSS SLAIN!</h4>
                <p className="text-xs text-slate-200">
                  Congratulations! Your mutation successfully shattered {selectedBoss.name}.
                </p>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-around font-mono">
                  <span className="text-amber-400 font-bold">🎁 {selectedBoss.rewards.item}</span>
                  <span className="text-purple-300">💎 +{selectedBoss.rewards.fragments.toLocaleString()} Frags</span>
                  <span className="text-emerald-300">💰 +${selectedBoss.rewards.beli.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => handleStartBattle()}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors"
                >
                  Play Next Raid Trial
                </button>
              </div>
            )}

            {isDefeat && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-center space-y-3">
                <div className="text-3xl">💀☠️</div>
                <h4 className="text-base font-black text-rose-300">YOU WERE DEFEATED!</h4>
                <p className="text-xs text-slate-300">
                  The boss dealt critical damage before you could finish them off. Re-adjust your mutation passives and try again!
                </p>
                <button
                  onClick={() => handleStartBattle()}
                  className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors"
                >
                  Retry Raid Battle
                </button>
              </div>
            )}

            {/* Action Buttons for Player Mutation Attacks */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                Unleash Mutation Attacks:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {customMoves.map(move => {
                  const cd = cooldowns[move.key] || 0;
                  const isOnCd = cd > 0;

                  return (
                    <button
                      key={move.key}
                      onClick={() => handlePlayerAttack(move)}
                      disabled={isOnCd || !isBattleActive}
                      className={`p-3 rounded-xl text-left border transition-all relative overflow-hidden flex items-center justify-between cursor-pointer ${
                        isOnCd || !isBattleActive
                          ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800 border-indigo-500/40 text-white hover:border-cyan-400 active:scale-95 shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                          {move.key}
                        </span>
                        <div>
                          <div className="font-extrabold text-xs text-white truncate max-w-[130px]">{move.name}</div>
                          <div className="text-[10px] text-amber-400 font-mono font-bold">
                            {move.damage.toLocaleString()} DMG • {move.kenBreak}
                          </div>
                        </div>
                      </div>

                      {isOnCd && (
                        <span className="text-xs font-black text-cyan-400 font-mono animate-pulse">
                          {cd.toFixed(1)}s
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME COMBAT LOG & REWARD MATRIX (5 COLS) */}
        <div className="lg:col-span-5 space-y-5">
          {/* COMBAT LOG */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-black text-white">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                <span>Raid Combat Log</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Live Telemetry</span>
            </div>

            <div
              ref={logContainerRef}
              className="h-64 overflow-y-auto space-y-2 pr-1 font-mono text-[11px] leading-relaxed"
            >
              {battleLogs.length === 0 ? (
                <div className="text-slate-500 italic text-center pt-8">
                  Battle log will populate when raid starts.
                </div>
              ) : (
                battleLogs.map(log => (
                  <div
                    key={log.id}
                    className={`p-2 rounded-lg border text-xs ${
                      log.type === 'player'
                        ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200'
                        : log.type === 'boss'
                        ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                        : log.type === 'dodge'
                        ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
                        : 'bg-slate-950 border-slate-800 text-amber-300'
                    }`}
                  >
                    {log.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* BOSS LOOT & REWARD CODEX */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-xs font-black text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Target Boss Guaranteed Rewards</span>
            </h4>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Exclusive Drop:</span>
                <span className="font-bold text-amber-300">{selectedBoss.rewards.itemEmoji} {selectedBoss.rewards.item}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Drop Chance:</span>
                <span className="font-bold text-emerald-400">{selectedBoss.rewards.dropChance}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Fragments Granted:</span>
                <span className="font-bold text-purple-300 font-mono">+{selectedBoss.rewards.fragments.toLocaleString()} Frags</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Beli Reward:</span>
                <span className="font-bold text-emerald-300 font-mono">+${selectedBoss.rewards.beli.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Mastery XP Boost:</span>
                <span className="font-bold text-cyan-300 font-mono">+{selectedBoss.rewards.masteryXp.toLocaleString()} XP</span>
              </div>
            </div>

            {onAskSensei && (
              <button
                onClick={() => {
                  soundFX.playPop();
                  onAskSensei(`What is the optimal strategy, fruit combo, and Ken break rotation to solo defeat ${selectedBoss.name} in Sea 3?`);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Solas AI For ${selectedBoss.name.split(' ')[0]} Raid Guide</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
