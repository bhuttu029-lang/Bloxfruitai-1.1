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
