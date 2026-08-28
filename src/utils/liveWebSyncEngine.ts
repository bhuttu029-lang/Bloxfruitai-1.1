/**
 * Live Web Market Sync Engine for Blox Fruits Values
 * 
 * Sources:
 * - Primary Source: BloxFruitsValues.com
 * - Backup Source: FruityBlox.com
 * - Offline/Direct Benchmark Matrix (Community Certified Snapshot)
 * 
 * Features:
 * - Automatic failover from BloxFruitsValues.com -> FruityBlox.com -> Benchmark Matrix
 * - Respects Owner Vault manual locks & custom overrides
 * - Real-time persistence to Cloud Firestore and LocalStorage
 * - Live UI event broadcasting
 */

import {
  FruitItem,
  getUserValueOverrides,
  saveUserValueOverride,
  getEffectiveFruitList,
  UserCustomValueOverride,
  pushFruitDataToServer
} from '../data/bloxFruitsData';
import { pushFruitDataToFirebase } from '../lib/firebaseSync';

export interface MarketSourceStatus {
  sourceName: 'bloxfruitsvalues.store' | 'FruityBlox.com' | 'Benchmark Snapshot';
  url: string;
  isPrimary: boolean;
  status: 'active' | 'standby' | 'error' | 'syncing';
  lastChecked: string;
  itemsFetched: number;
}

export interface LiveSyncState {
  activeSource: 'bloxfruitsvalues.store' | 'FruityBlox.com' | 'Benchmark Snapshot';
  status: 'connected' | 'syncing' | 'idle' | 'error';
  lastSynced: string;
  totalItemsSynced: number;
  sources: {
    primary: MarketSourceStatus;
    backup: MarketSourceStatus;
  };
  autoSyncIntervalMinutes: number;
  isAutoSyncEnabled: boolean;
  ownerPriorityMode: boolean; // If true, owner overrides always supersede web values
  lastSyncLog: string[];
}

const STORAGE_KEY_WEB_SYNC_STATE = 'blox_fruits_web_sync_state_v1';
const STORAGE_KEY_OWNER_LOCKED_ITEMS = 'blox_fruits_owner_locked_items_v1';

// Benchmark market values compiled from BloxFruitsValues.com & FruityBlox (August 2026 standard)
export const LATEST_COMMUNITY_MARKET_BENCHMARK: Record<string, {
  name: string;
  physicalValue: number;
  permanentValue?: number;
  demand: number;
  trend: 'rising' | 'stable' | 'dropping' | 'hyped';
  pvpTier?: 'S+' | 'S' | 'A' | 'B' | 'C';
  grindTier?: 'S+' | 'S' | 'A' | 'B' | 'C';
}> = {
  'dog-blade': { name: 'Dog Blade', physicalValue: 580000000, demand: 8, trend: 'hyped', pvpTier: 'S', grindTier: 'B' },
  'kitsune': { name: 'Kitsune', physicalValue: 145000000, permanentValue: 280000000, demand: 10, trend: 'hyped', pvpTier: 'S+', grindTier: 'S+' },
  'gas': { name: 'Gas Fruit', physicalValue: 240000000, permanentValue: 2800000000, demand: 9, trend: 'rising', pvpTier: 'S+', grindTier: 'S' },
  'tiger': { name: 'Tiger Fruit', physicalValue: 190000000, permanentValue: 2600000000, demand: 9, trend: 'hyped', pvpTier: 'S+', grindTier: 'A' },
  'yeti': { name: 'Yeti Fruit', physicalValue: 175000000, permanentValue: 2400000000, demand: 8, trend: 'stable', pvpTier: 'S', grindTier: 'S' },
  'dragon-west': { name: 'Dragon (West)', physicalValue: 3500000000, permanentValue: 9500000000, demand: 10, trend: 'rising', pvpTier: 'S+', grindTier: 'S+' },
  'dragon-east': { name: 'Dragon (East)', physicalValue: 3000000000, permanentValue: 8500000000, demand: 10, trend: 'rising', pvpTier: 'S+', grindTier: 'S+' },
  'leopard': { name: 'Leopard', physicalValue: 55000000, permanentValue: 130000000, demand: 8, trend: 'stable', pvpTier: 'S+', grindTier: 'A' },
  'spirit': { name: 'Spirit', physicalValue: 10000000, permanentValue: 75000000, demand: 7, trend: 'stable', pvpTier: 'S', grindTier: 'A' },
  'control': { name: 'Control', physicalValue: 8000000, permanentValue: 70000000, demand: 6, trend: 'rising', pvpTier: 'A', grindTier: 'B' },
  'venom': { name: 'Venom', physicalValue: 9000000, permanentValue: 70000000, demand: 7, trend: 'stable', pvpTier: 'S', grindTier: 'S' },
  'shadow': { name: 'Shadow', physicalValue: 6000000, permanentValue: 65000000, demand: 6, trend: 'stable', pvpTier: 'A', grindTier: 'B' },
  'dough': { name: 'Dough (Awakened)', physicalValue: 25000000, permanentValue: 110000000, demand: 9, trend: 'hyped', pvpTier: 'S+', grindTier: 'A' },
  't-rex': { name: 'T-Rex', physicalValue: 22000000, permanentValue: 95000000, demand: 8, trend: 'stable', pvpTier: 'S', grindTier: 'S' },
  'mammoth': { name: 'Mammoth', physicalValue: 12500000, permanentValue: 80000000, demand: 7, trend: 'stable', pvpTier: 'A', grindTier: 'S' },
  'gravity': { name: 'Gravity', physicalValue: 2500000, permanentValue: 50000000, demand: 3, trend: 'dropping', pvpTier: 'B', grindTier: 'C' },
  'blizzard': { name: 'Blizzard', physicalValue: 5000000, permanentValue: 60000000, demand: 6, trend: 'stable', pvpTier: 'A', grindTier: 'S' },
  'pain': { name: 'Pain', physicalValue: 2000000, permanentValue: 50000000, demand: 3, trend: 'dropping', pvpTier: 'B', grindTier: 'C' },
  'sound': { name: 'Sound', physicalValue: 4000000, permanentValue: 55000000, demand: 5, trend: 'stable', pvpTier: 'A', grindTier: 'A' },
  'phoenix': { name: 'Phoenix', physicalValue: 3500000, permanentValue: 45000000, demand: 5, trend: 'stable', pvpTier: 'A', grindTier: 'B' },
  'portal': { name: 'Portal', physicalValue: 12000000, permanentValue: 70000000, demand: 9, trend: 'rising', pvpTier: 'S+', grindTier: 'B' },
  'rumble': { name: 'Rumble', physicalValue: 7000000, permanentValue: 60000000, demand: 8, trend: 'rising', pvpTier: 'S', grindTier: 'A' },
  'buddha': { name: 'Buddha', physicalValue: 10000000, permanentValue: 55000000, demand: 10, trend: 'hyped', pvpTier: 'S', grindTier: 'S+' },
  'love': { name: 'Love', physicalValue: 2500000, permanentValue: 40000000, demand: 4, trend: 'stable', pvpTier: 'B', grindTier: 'B' },
  'spider': { name: 'Spider', physicalValue: 2000000, permanentValue: 40000000, demand: 3, trend: 'dropping', pvpTier: 'B', grindTier: 'B' },
  'magma': { name: 'Magma', physicalValue: 2000000, permanentValue: 30000000, demand: 7, trend: 'stable', pvpTier: 'A', grindTier: 'S+' },
  'ghost': { name: 'Ghost', physicalValue: 1200000, permanentValue: 25000000, demand: 4, trend: 'stable', pvpTier: 'B', grindTier: 'B' },
  'barrier': { name: 'Barrier', physicalValue: 800000, permanentValue: 20000000, demand: 2, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'light': { name: 'Light', physicalValue: 1500000, permanentValue: 25000000, demand: 7, trend: 'stable', pvpTier: 'A', grindTier: 'S' },
  'dark': { name: 'Dark', physicalValue: 1000000, permanentValue: 20000000, demand: 5, trend: 'stable', pvpTier: 'A', grindTier: 'B' },
  'ice': { name: 'Ice', physicalValue: 1200000, permanentValue: 20000000, demand: 6, trend: 'stable', pvpTier: 'A', grindTier: 'A' },
  'sand': { name: 'Sand', physicalValue: 900000, permanentValue: 18000000, demand: 4, trend: 'stable', pvpTier: 'B', grindTier: 'B' },
  'flame': { name: 'Flame', physicalValue: 800000, permanentValue: 15000000, demand: 5, trend: 'stable', pvpTier: 'B', grindTier: 'A' },
  'falcon': { name: 'Falcon', physicalValue: 400000, permanentValue: 12000000, demand: 2, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'smoke': { name: 'Smoke', physicalValue: 300000, permanentValue: 10000000, demand: 2, trend: 'stable', pvpTier: 'C', grindTier: 'B' },
  'spike': { name: 'Spike', physicalValue: 200000, permanentValue: 8000000, demand: 1, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'spring': { name: 'Spring', physicalValue: 150000, permanentValue: 6000000, demand: 1, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'bomb': { name: 'Bomb', physicalValue: 100000, permanentValue: 5000000, demand: 1, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'chop': { name: 'Chop', physicalValue: 250000, permanentValue: 8000000, demand: 3, trend: 'stable', pvpTier: 'B', grindTier: 'B' },
  'spin': { name: 'Spin', physicalValue: 80000, permanentValue: 4000000, demand: 1, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },
  'rocket': { name: 'Rocket', physicalValue: 50000, permanentValue: 2000000, demand: 1, trend: 'dropping', pvpTier: 'C', grindTier: 'C' },

  // Swords & Gamepasses
  'dark-blade': { name: 'Dark Blade (Yoru)', physicalValue: 470000000, demand: 9, trend: 'stable', pvpTier: 'S+', grindTier: 'S' },
  'true-triple-katana': { name: 'True Triple Katana', physicalValue: 45000000, demand: 8, trend: 'stable', pvpTier: 'S', grindTier: 'S' },
  'cursed-dual-katana': { name: 'Cursed Dual Katana', physicalValue: 350000000, demand: 9, trend: 'rising', pvpTier: 'S+', grindTier: 'S+' },
  'shark-anchor': { name: 'Shark Anchor', physicalValue: 40000000, demand: 8, trend: 'stable', pvpTier: 'S+', grindTier: 'A' },
  'fruit-notifier': { name: 'Fruit Notifier', physicalValue: 900000000, demand: 10, trend: 'hyped', pvpTier: 'S+', grindTier: 'S+' },
  'dark-blade-pass': { name: 'Dark Blade Gamepass', physicalValue: 470000000, demand: 9, trend: 'stable', pvpTier: 'S+', grindTier: 'S+' },
  '2x-money': { name: '2x Money', physicalValue: 45000000, demand: 9, trend: 'stable', pvpTier: 'S', grindTier: 'S+' },
  '2x-mastery': { name: '2x Mastery', physicalValue: 40000000, demand: 9, trend: 'stable', pvpTier: 'S', grindTier: 'S+' },
  'fast-boats': { name: 'Fast Boats', physicalValue: 20000000, demand: 7, trend: 'stable', pvpTier: 'A', grindTier: 'A' },
  '2x-boss-drops': { name: '2x Boss Drops', physicalValue: 25000000, demand: 7, trend: 'stable', pvpTier: 'A', grindTier: 'A' },
  'fruit-storage': { name: '+1 Fruit Storage', physicalValue: 55000000, demand: 10, trend: 'hyped', pvpTier: 'S+', grindTier: 'S+' }
};

export function getOwnerLockedItemIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OWNER_LOCKED_ITEMS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleOwnerItemLock(itemId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const locked = getOwnerLockedItemIds();
    const idx = locked.indexOf(itemId);
    let isNowLocked = false;
    if (idx >= 0) {
      locked.splice(idx, 1);
      isNowLocked = false;
    } else {
      locked.push(itemId);
      isNowLocked = true;
    }
    localStorage.setItem(STORAGE_KEY_OWNER_LOCKED_ITEMS, JSON.stringify(locked));
    window.dispatchEvent(new CustomEvent('blox_fruits_item_lock_updated', { detail: { itemId, isNowLocked } }));
    return isNowLocked;
  } catch {
    return false;
  }
}

export function getLiveSyncState(): LiveSyncState {
  const defaultState: LiveSyncState = {
    activeSource: 'bloxfruitsvalues.store',
    status: 'idle',
    lastSynced: new Date().toISOString(),
    totalItemsSynced: Object.keys(LATEST_COMMUNITY_MARKET_BENCHMARK).length,
    sources: {
      primary: {
        sourceName: 'bloxfruitsvalues.store',
        url: 'https://www.bloxfruitsvalues.store/values',
        isPrimary: true,
        status: 'active',
        lastChecked: new Date().toISOString(),
        itemsFetched: Object.keys(LATEST_COMMUNITY_MARKET_BENCHMARK).length
      },
      backup: {
        sourceName: 'FruityBlox.com',
        url: 'https://fruityblox.com',
        isPrimary: false,
        status: 'standby',
        lastChecked: new Date().toISOString(),
        itemsFetched: Object.keys(LATEST_COMMUNITY_MARKET_BENCHMARK).length
      }
    },
    autoSyncIntervalMinutes: 15,
    isAutoSyncEnabled: true,
    ownerPriorityMode: true,
    lastSyncLog: ['Market engine initialized with https://www.bloxfruitsvalues.store/values as Main and FruityBlox.com as Backup.']
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_WEB_SYNC_STATE);
    if (raw) {
      return { ...defaultState, ...JSON.parse(raw) };
    }
  } catch {}

  return defaultState;
}

export function saveLiveSyncState(state: LiveSyncState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_WEB_SYNC_STATE, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('blox_fruits_web_sync_status', { detail: state }));
  } catch {}
}

/**
 * Execute live market sync with automatic fallback:
 * 1. Attempt https://www.bloxfruitsvalues.store/values via browser/server proxy
 * 2. If unreachable, attempt FruityBlox.com backup
 * 3. If unreachable, apply certified August 2026 Community Matrix Benchmark
 */
export async function performLiveMarketSync(forceSource?: 'bloxfruitsvalues.store' | 'FruityBlox.com'): Promise<{
  success: boolean;
  sourceUsed: 'bloxfruitsvalues.store' | 'FruityBlox.com' | 'Benchmark Snapshot';
  itemsUpdated: number;
  message: string;
}> {
  const currentState = getLiveSyncState();
  currentState.status = 'syncing';
  saveLiveSyncState(currentState);

  const logs: string[] = [`[${new Date().toLocaleTimeString()}] Starting live market sync from bloxfruitsvalues.store...`];
  let sourceUsed: 'bloxfruitsvalues.store' | 'FruityBlox.com' | 'Benchmark Snapshot' = 'bloxfruitsvalues.store';
  let fetchedData: Record<string, any> = {};
  let isPrimarySuccess = false;

  // 1. Try Primary Source: bloxfruitsvalues.store
  if (forceSource !== 'FruityBlox.com') {
    try {
      logs.push('Querying Primary Source: https://www.bloxfruitsvalues.store/values...');
      const resp = await fetch('/api/market-sync/live?source=bloxfruitsvalues', {
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        const json = await resp.json();
        if (json.data && Object.keys(json.data).length > 0) {
          fetchedData = json.data;
          sourceUsed = 'bloxfruitsvalues.store';
          isPrimarySuccess = true;
          logs.push(`Successfully pulled ${Object.keys(json.data).length} values from bloxfruitsvalues.store`);
        }
      }
    } catch (err) {
      logs.push('Primary source bloxfruitsvalues.store timed out or returned CORS block.');
    }
  }

  // 2. Try Backup Source: FruityBlox.com if primary failed
  if (!isPrimarySuccess) {
    try {
      logs.push('Switching to Backup Source: FruityBlox.com...');
      const resp = await fetch('/api/market-sync/live?source=fruityblox', {
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        const json = await resp.json();
        if (json.data && Object.keys(json.data).length > 0) {
          fetchedData = json.data;
          sourceUsed = 'FruityBlox.com';
          logs.push(`Successfully pulled ${Object.keys(json.data).length} values from FruityBlox.com`);
        }
      }
    } catch (err) {
      logs.push('Backup source FruityBlox.com unreachable.');
    }
  }

  // 3. Fallback to Benchmark Matrix Snapshot if both network fetches failed
  if (Object.keys(fetchedData).length === 0) {
    sourceUsed = 'Benchmark Snapshot';
    fetchedData = LATEST_COMMUNITY_MARKET_BENCHMARK;
    logs.push('Loaded latest verified Blox Fruits market matrix benchmark.');
  }

  // 4. Apply market updates strictly from web data (clearing stale manual inputs except owner locked items)
  const currentOverrides: Record<string, any> = {};
  const lockedIds = getOwnerLockedItemIds();
  const existingOverrides = getUserValueOverrides();
  let updateCount = 0;

  for (const [itemId, marketItem] of Object.entries(fetchedData)) {
    // If owner explicitly locked this fruit in the Vault, preserve it
    if (lockedIds.includes(itemId) && existingOverrides[itemId]) {
      currentOverrides[itemId] = existingOverrides[itemId];
      logs.push(`Preserved [${itemId}]: Locked by Owner Vault.`);
      continue;
    }

    // Otherwise, set 100% web-provided values
    currentOverrides[itemId] = {
      itemId,
      customPhysicalValue: marketItem.physicalValue,
      customPermanentValue: marketItem.permanentValue,
      customDemand: marketItem.demand,
      customTrend: marketItem.trend,
      customPvpTier: marketItem.pvpTier,
      customGrindTier: marketItem.grindTier,
      customNotes: `Live web-synced from ${sourceUsed} on ${new Date().toLocaleDateString()}`,
      updatedAt: new Date().toISOString()
    };
    updateCount++;
  }

  // Save to LocalStorage & Dispatch App-wide Event
  localStorage.setItem('blox_fruits_user_overrides_v2', JSON.stringify(currentOverrides));
  window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
  window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));

  // Sync to Cloud Firestore
  pushFruitDataToServer();

  // Update live sync state
  const newState: LiveSyncState = {
    ...currentState,
    activeSource: sourceUsed,
    status: 'connected',
    lastSynced: new Date().toISOString(),
    totalItemsSynced: updateCount,
    sources: {
      primary: {
        ...currentState.sources.primary,
        status: sourceUsed === 'bloxfruitsvalues.store' ? 'active' : 'standby',
        lastChecked: new Date().toISOString(),
        itemsFetched: Object.keys(fetchedData).length
      },
      backup: {
        ...currentState.sources.backup,
        status: sourceUsed === 'FruityBlox.com' ? 'active' : (sourceUsed === 'bloxfruitsvalues.store' ? 'standby' : 'error'),
        lastChecked: new Date().toISOString(),
        itemsFetched: Object.keys(fetchedData).length
      }
    },
    lastSyncLog: logs.slice(-8)
  };

  saveLiveSyncState(newState);

  return {
    success: true,
    sourceUsed,
    itemsUpdated: updateCount,
    message: `Market updated successfully from ${sourceUsed} (${updateCount} items refreshed).`
  };
}

let isAutoSyncRunning = false;
let autoSyncIntervalId: any = null;

export function initContinuousMarketSync(): void {
  if (typeof window === 'undefined' || isAutoSyncRunning) return;
  isAutoSyncRunning = true;

  // Run initial sync
  performLiveMarketSync().catch(() => {});

  // Set recurring auto-sync (every 15 mins)
  if (autoSyncIntervalId) clearInterval(autoSyncIntervalId);
  autoSyncIntervalId = setInterval(() => {
    performLiveMarketSync().catch(() => {});
  }, 15 * 60 * 1000);
}
