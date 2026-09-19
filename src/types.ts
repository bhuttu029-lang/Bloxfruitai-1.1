export type UserAuthTier = 'guest' | 'discord' | 'vip' | 'owner';

export interface DiscordAccountInfo {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string;
  connectedAt: number;
}

export interface UserAuthProfile {
  tier: UserAuthTier;
  ip?: string;
  discord?: DiscordAccountInfo | null;
  searchesUsed: number;
  maxSearches: number; // 6 for guest, 12 for discord
  windowResetTime: number; // timestamp when 12h window resets
}

export interface QuotaStatusResponse {
  ip: string;
  tier: UserAuthTier;
  searchesUsed: number;
  maxSearches: number;
  remaining: number;
  windowResetTime: number;
  resetHoursRemaining: number;
  allowed: boolean;
}

export type GlobalEventType = 'broadcast' | 'disco' | 'ai_spam' | 'clear';
export type GlobalEventStyle = 'gold' | 'neon' | 'conqueror' | 'magma' | 'party' | 'matrix';

export interface GlobalLiveEvent {
  id: string;
  type: GlobalEventType;
  title: string;
  message: string;
  author: string;
  timestamp: number;
  expiresAt: number;
  durationSeconds?: number;
  style?: GlobalEventStyle;
  directive?: string;
  spamMessages?: string[];
  burstIntervalMs?: number;
  active: boolean;
}

