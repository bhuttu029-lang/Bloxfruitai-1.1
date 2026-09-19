/**
 * Loot Glow Animation & Theming Utilities
 * Provides CSS class mappings and RGBA values for rarity-based loot glow effects.
 */

export type FruitRarityType = 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common' | string;

export interface LootGlowConfig {
  rarity: string;
  iconClass: string;
  cardClass: string;
  badgeClass: string;
  glowColor: string;
  accentColor: string;
  pulseSpeed: string;
  haloGradient: string;
  labelColor: string;
}

export function getNormalizedRarity(rarity?: string): 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common' {
  if (!rarity) return 'Common';
  const lower = rarity.toLowerCase().trim();
  if (lower.includes('mythic')) return 'Mythical';
  if (lower.includes('legend')) return 'Legendary';
  if (lower.includes('rare') && !lower.includes('uncommon')) return 'Rare';
  if (lower.includes('uncommon')) return 'Uncommon';
  return 'Common';
}

export function getLootGlowConfig(rarity?: string): LootGlowConfig {
  const norm = getNormalizedRarity(rarity);

  switch (norm) {
    case 'Mythical':
      return {
        rarity: 'Mythical',
        iconClass: 'loot-icon-mythical',
        cardClass: 'loot-card-mythical',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
        glowColor: 'rgba(245, 158, 11, 0.45)',
        accentColor: '#f59e0b',
        pulseSpeed: '2.4s',
        haloGradient: 'from-amber-500/30 via-yellow-500/15 to-transparent',
        labelColor: 'text-amber-400 font-extrabold',
      };
    case 'Legendary':
      return {
        rarity: 'Legendary',
        iconClass: 'loot-icon-legendary',
        cardClass: 'loot-card-legendary',
        badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]',
        glowColor: 'rgba(168, 85, 247, 0.45)',
        accentColor: '#a855f7',
        pulseSpeed: '2.8s',
        haloGradient: 'from-purple-500/30 via-fuchsia-500/15 to-transparent',
        labelColor: 'text-purple-400 font-extrabold',
      };
    case 'Rare':
      return {
        rarity: 'Rare',
        iconClass: 'loot-icon-rare',
        cardClass: 'loot-card-rare',
        badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.35)]',
        glowColor: 'rgba(59, 130, 246, 0.4)',
        accentColor: '#3b82f6',
        pulseSpeed: '3.2s',
        haloGradient: 'from-blue-500/25 via-cyan-500/10 to-transparent',
        labelColor: 'text-blue-400 font-bold',
      };
    case 'Uncommon':
      return {
        rarity: 'Uncommon',
        iconClass: 'loot-icon-uncommon',
        cardClass: 'loot-card-uncommon',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]',
        glowColor: 'rgba(34, 197, 94, 0.35)',
        accentColor: '#22c55e',
        pulseSpeed: '3.6s',
        haloGradient: 'from-emerald-500/25 via-teal-500/10 to-transparent',
        labelColor: 'text-emerald-400 font-bold',
      };
    case 'Common':
    default:
      return {
        rarity: 'Common',
        iconClass: 'loot-icon-common',
        cardClass: 'loot-card-common',
        badgeClass: 'bg-slate-700/40 text-slate-300 border-slate-600/50',
        glowColor: 'rgba(148, 163, 184, 0.25)',
        accentColor: '#94a3b8',
        pulseSpeed: '4s',
        haloGradient: 'from-slate-500/20 via-slate-600/10 to-transparent',
        labelColor: 'text-slate-400 font-medium',
      };
  }
}
