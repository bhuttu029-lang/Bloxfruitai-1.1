import { UserAuthProfile, UserAuthTier, DiscordAccountInfo, QuotaStatusResponse } from '../types';
import { getOwnerAuthStatus, setOwnerAuthStatus } from '../data/bloxFruitsData';

const STORAGE_KEY_AUTH = 'blox_ai_user_auth_profile_v1';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

export const DISCORD_OAUTH_URL =
  'https://discord.com/oauth2/authorize?client_id=1501240614313000990&response_type=code&redirect_uri=https%3A%2F%2Fblox-fruit-ai.lovable.app%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify';

// Dedicated Popup / New Tab OAuth flow launcher
export function openDiscordOAuthTab(): Window | null {
  const url = '/auth/discord/flow';
  const width = 560;
  const height = 760;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    url,
    'DiscordOAuth2Flow',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no`
  );

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    // If popup blocked, open in new tab
    return window.open(url, '_blank');
  }

  return popup;
}

export function getInitialAuthProfile(): UserAuthProfile {
  const isOwner = getOwnerAuthStatus();
  if (isOwner) {
    return {
      tier: 'owner',
      discord: null,
      searchesUsed: 0,
      maxSearches: Infinity,
      windowResetTime: Date.now() + TWELVE_HOURS_MS
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.tier === 'owner' || isOwner) {
        parsed.tier = 'owner';
        parsed.maxSearches = Infinity;
        parsed.searchesUsed = 0;
      } else if (parsed.tier === 'vip') {
        parsed.tier = 'vip';
        parsed.maxSearches = Infinity;
        parsed.searchesUsed = 0;
      } else if (parsed.discord && parsed.discord.id) {
        parsed.tier = 'discord';
        parsed.maxSearches = 12;
      } else {
        parsed.tier = 'guest';
        parsed.maxSearches = 6;
      }
      return parsed;
    }
  } catch {
    // Ignore error
  }

  const now = Date.now();
  return {
    tier: 'guest',
    discord: null,
    searchesUsed: 0,
    maxSearches: 6,
    windowResetTime: now + TWELVE_HOURS_MS
  };
}

export function saveAuthProfile(profile: UserAuthProfile) {
  try {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('blox_auth_profile_updated', { detail: profile }));
  } catch {
    // Ignore error
  }
}

// Setup Cross-Tab BroadcastChannel and storage listeners
if (typeof window !== 'undefined') {
  try {
    const bc = new BroadcastChannel('blox_auth_channel');
    bc.onmessage = (event) => {
      if (event.data?.type === 'BLOX_DISCORD_OAUTH_SUCCESS' && event.data.discord) {
        const current = getInitialAuthProfile();
        const updated = connectDiscordAccount(current, event.data.discord);
        window.dispatchEvent(new CustomEvent('blox_auth_profile_updated', { detail: updated }));
      }
    };
  } catch {
    // BroadcastChannel unsupported fallback
  }

  window.addEventListener('message', (event) => {
    // Restrict origin verification
    if (event.origin !== window.location.origin && !event.origin.includes('lovable.app') && !event.origin.includes('google.com')) {
      return;
    }
    if (event.data?.type === 'BLOX_DISCORD_OAUTH_SUCCESS' && event.data.discord) {
      const current = getInitialAuthProfile();
      const updated = connectDiscordAccount(current, event.data.discord);
      window.dispatchEvent(new CustomEvent('blox_auth_profile_updated', { detail: updated }));
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY_AUTH && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        window.dispatchEvent(new CustomEvent('blox_auth_profile_updated', { detail: parsed }));
      } catch {}
    }
  });

  // Listen for owner auth updates
  window.addEventListener('blox_fruits_owner_auth_updated', () => {
    const isOwner = getOwnerAuthStatus();
    const current = getInitialAuthProfile();
    if (isOwner) {
      const updated: UserAuthProfile = {
        ...current,
        tier: 'owner',
        maxSearches: Infinity,
        searchesUsed: 0
      };
      saveAuthProfile(updated);
    } else if (current.tier === 'owner') {
      const updated: UserAuthProfile = {
        ...current,
        tier: current.discord ? 'discord' : 'guest',
        maxSearches: current.discord ? 12 : 6,
        searchesUsed: 0
      };
      saveAuthProfile(updated);
    }
  });
}

export function getMaxSearchesForTier(tier: UserAuthTier): number {
  if (tier === 'owner' || tier === 'vip' || getOwnerAuthStatus()) return Infinity;
  return tier === 'discord' ? 12 : 6;
}

export function checkAndRefreshQuotaWindow(profile: UserAuthProfile): UserAuthProfile {
  const isOwner = getOwnerAuthStatus() || profile.tier === 'owner';
  if (isOwner) {
    const updated: UserAuthProfile = {
      ...profile,
      tier: 'owner',
      maxSearches: Infinity,
      searchesUsed: 0,
    };
    saveAuthProfile(updated);
    return updated;
  }

  if (profile.tier === 'vip') {
    const updated: UserAuthProfile = {
      ...profile,
      tier: 'vip',
      maxSearches: Infinity,
      searchesUsed: 0,
    };
    saveAuthProfile(updated);
    return updated;
  }

  const now = Date.now();
  let updated = { ...profile };

  if (!updated.windowResetTime || now >= updated.windowResetTime) {
    updated.searchesUsed = 0;
    updated.windowResetTime = now + TWELVE_HOURS_MS;
  }

  updated.maxSearches = getMaxSearchesForTier(updated.tier);
  saveAuthProfile(updated);
  return updated;
}

export async function fetchServerQuota(profile: UserAuthProfile): Promise<QuotaStatusResponse> {
  const isOwner = getOwnerAuthStatus() || profile.tier === 'owner';
  if (isOwner) {
    return {
      ip: 'Admin / Owner Session',
      tier: 'owner',
      searchesUsed: 0,
      maxSearches: Infinity,
      remaining: Infinity,
      windowResetTime: Date.now() + TWELVE_HOURS_MS,
      resetHoursRemaining: 12,
      allowed: true
    };
  }

  if (profile.tier === 'vip') {
    return {
      ip: 'Unlimited Pass Active',
      tier: 'vip',
      searchesUsed: 0,
      maxSearches: Infinity,
      remaining: Infinity,
      windowResetTime: Date.now() + TWELVE_HOURS_MS,
      resetHoursRemaining: 12,
      allowed: true
    };
  }

  const localRefreshed = checkAndRefreshQuotaWindow(profile);
  const max = getMaxSearchesForTier(localRefreshed.tier);
  const remainingLocal = Math.max(0, max - localRefreshed.searchesUsed);

  try {
    const res = await fetch('/api/ai/quota');
    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip || 'Verified Host',
        tier: data.tier || localRefreshed.tier,
        searchesUsed: data.searchesUsed !== undefined ? data.searchesUsed : localRefreshed.searchesUsed,
        maxSearches: data.maxSearches || max,
        remaining: data.remaining !== undefined ? data.remaining : remainingLocal,
        windowResetTime: data.windowResetTime || localRefreshed.windowResetTime,
        resetHoursRemaining: data.resetHoursRemaining || Math.max(0, Math.ceil((localRefreshed.windowResetTime - Date.now()) / (1000 * 60 * 60))),
        allowed: data.allowed !== undefined ? data.allowed : remainingLocal > 0
      };
    }
  } catch {
    // Fallback to local
  }

  return {
    ip: 'Local Host',
    tier: localRefreshed.tier,
    searchesUsed: localRefreshed.searchesUsed,
    maxSearches: max,
    remaining: remainingLocal,
    windowResetTime: localRefreshed.windowResetTime,
    resetHoursRemaining: Math.max(0, Math.ceil((localRefreshed.windowResetTime - Date.now()) / (1000 * 60 * 60))),
    allowed: remainingLocal > 0
  };
}

export async function consumeAiSearch(currentProfile: UserAuthProfile): Promise<{
  allowed: boolean;
  updatedProfile: UserAuthProfile;
  remaining: number;
  reason?: string;
}> {
  const isOwner = getOwnerAuthStatus() || currentProfile.tier === 'owner';
  if (isOwner) {
    const ownerProfile: UserAuthProfile = {
      ...currentProfile,
      tier: 'owner',
      maxSearches: Infinity,
      searchesUsed: 0
    };
    saveAuthProfile(ownerProfile);
    return {
      allowed: true,
      updatedProfile: ownerProfile,
      remaining: Infinity
    };
  }

  if (currentProfile.tier === 'vip') {
    const vipProfile: UserAuthProfile = {
      ...currentProfile,
      tier: 'vip',
      maxSearches: Infinity,
      searchesUsed: 0
    };
    saveAuthProfile(vipProfile);
    return {
      allowed: true,
      updatedProfile: vipProfile,
      remaining: Infinity
    };
  }

  const refreshed = checkAndRefreshQuotaWindow(currentProfile);
  const maxAllowed = getMaxSearchesForTier(refreshed.tier);

  if (refreshed.searchesUsed >= maxAllowed) {
    const hoursLeft = Math.max(1, Math.ceil((refreshed.windowResetTime - Date.now()) / (1000 * 60 * 60)));
    return {
      allowed: false,
      updatedProfile: refreshed,
      remaining: 0,
      reason: `You have used your ${maxAllowed} searches per 12-hour limit (${refreshed.tier === 'guest' ? '6 free searches for Guest' : '12 searches for Discord Member'}). Resets in ~${hoursLeft}h.`
    };
  }

  const newCount = refreshed.searchesUsed + 1;
  const updated: UserAuthProfile = {
    ...refreshed,
    searchesUsed: newCount
  };
  saveAuthProfile(updated);

  return {
    allowed: true,
    updatedProfile: updated,
    remaining: Math.max(0, maxAllowed - newCount)
  };
}

// Server-Verified VIP Code Redemption (No hardcoded passcode in client bundle)
export async function redeemVipPasscodeOnServer(code: string): Promise<{ success: boolean; isOwner?: boolean; error?: string }> {
  try {
    const res = await fetch('/api/auth/vip/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.isOwner) {
        setOwnerAuthStatus(true);
      }
      return { success: data.success, isOwner: Boolean(data.isOwner) };
    }
    return { success: false, error: 'Invalid passcode or unauthorized request' };
  } catch {
    return { success: false, error: 'Network communication error' };
  }
}

export function unlockOwnerSession(profile: UserAuthProfile): UserAuthProfile {
  setOwnerAuthStatus(true);
  const updated: UserAuthProfile = {
    ...profile,
    tier: 'owner',
    maxSearches: Infinity,
    searchesUsed: 0
  };
  saveAuthProfile(updated);
  return updated;
}

export function unlockVipUnlimitedSession(profile: UserAuthProfile): UserAuthProfile {
  const updated: UserAuthProfile = {
    ...profile,
    tier: profile.tier === 'owner' ? 'owner' : 'vip',
    maxSearches: Infinity,
    searchesUsed: 0
  };
  saveAuthProfile(updated);
  return updated;
}

export function resetVipSession(profile: UserAuthProfile): UserAuthProfile {
  const isOwner = getOwnerAuthStatus();
  const updated: UserAuthProfile = {
    ...profile,
    tier: isOwner ? 'owner' : profile.discord ? 'discord' : 'guest',
    maxSearches: isOwner ? Infinity : profile.discord ? 12 : 6,
    searchesUsed: 0
  };
  saveAuthProfile(updated);
  return updated;
}

export function connectDiscordAccount(profile: UserAuthProfile, discordData: DiscordAccountInfo): UserAuthProfile {
  if (getOwnerAuthStatus() || profile.tier === 'owner') {
    const updated: UserAuthProfile = {
      ...profile,
      discord: discordData,
      tier: 'owner',
      maxSearches: Infinity,
      searchesUsed: 0
    };
    saveAuthProfile(updated);
    return updated;
  }

  const now = Date.now();
  const updated: UserAuthProfile = {
    ...profile,
    tier: 'discord',
    discord: discordData,
    maxSearches: 12,
    windowResetTime: profile.windowResetTime > now ? profile.windowResetTime : now + TWELVE_HOURS_MS
  };
  saveAuthProfile(updated);
  return updated;
}

export function logoutDiscordAccount(profile: UserAuthProfile): UserAuthProfile {
  const isOwner = getOwnerAuthStatus();
  fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  const updated: UserAuthProfile = {
    ...profile,
    discord: null,
    tier: isOwner ? 'owner' : 'guest',
    maxSearches: isOwner ? Infinity : 6
  };
  saveAuthProfile(updated);
  return updated;
}
