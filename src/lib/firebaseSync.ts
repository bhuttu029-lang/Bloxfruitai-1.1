import { collection, getDocs, setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { AdminAccount, UserCustomValueOverride, FruitItem, CustomResponseEntry } from '../data/bloxFruitsData';
import { BACKUP_BLOX_FRUITS_DATA } from '../data/officialBackupData';

const ADMIN_ACCOUNTS_COLLECTION = 'admin_accounts';
const FRUIT_OVERRIDES_COLLECTION = 'fruit_overrides';
const CUSTOM_ITEMS_COLLECTION = 'custom_items';
const DELETED_ITEMS_COLLECTION = 'deleted_items';
const CUSTOM_RESPONSES_COLLECTION = 'custom_responses';

const STORAGE_KEY_ADMIN_ACCOUNTS = 'blox_fruits_admin_accounts_v1';
const STORAGE_KEY_OVERRIDES = 'blox_fruits_user_overrides_v2';
const STORAGE_KEY_CUSTOM_ITEMS = 'blox_fruits_custom_items_v2';
const STORAGE_KEY_DELETED_ITEMS = 'blox_fruits_deleted_items_v2';
const CUSTOM_RESPONSES_STORAGE_KEY = 'blox_fruits_custom_owner_responses_v1';

let isRealtimeInitialized = false;

export function initRealtimeFirebaseSync(): () => void {
  if (typeof window === 'undefined' || isRealtimeInitialized) {
    return () => {};
  }
  isRealtimeInitialized = true;

  const unsubscribes: Array<() => void> = [];

  try {
    // 1. Live overrides listener
    const unsubOverrides = onSnapshot(collection(db, FRUIT_OVERRIDES_COLLECTION), (snapshot) => {
      const overridesMap: Record<string, UserCustomValueOverride> = {};
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as any;
        const itemId = data.itemId || docSnap.id;
        const img = data.customIconUrl || data.iconUrl || data.imageUrl || data.image || data.src || data.photoUrl || data.customImage;
        if (itemId) {
          overridesMap[itemId] = {
            ...data,
            itemId,
            customIconUrl: img || data.customIconUrl,
          };
        }
      });
      const next = JSON.stringify(overridesMap);
      const prev = localStorage.getItem(STORAGE_KEY_OVERRIDES);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_OVERRIDES, next);
        window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
        window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
      }
    }, (err) => console.warn('Realtime overrides sync warning:', err));
    unsubscribes.push(unsubOverrides);

    // 2. Live custom items listener
    const unsubCustom = onSnapshot(collection(db, CUSTOM_ITEMS_COLLECTION), (snapshot) => {
      const customList: FruitItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as any;
        const img = data.iconUrl || data.customIconUrl || data.imageUrl || data.image || data.src || data.photoUrl || data.customImage;
        customList.push({
          ...data,
          iconUrl: img || data.iconUrl,
        });
      });
      const next = JSON.stringify(customList);
      const prev = localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, next);
        window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
        window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
      }
    }, (err) => console.warn('Realtime custom items sync warning:', err));
    unsubscribes.push(unsubCustom);

    // 3. Live deleted items listener
    const unsubDeleted = onSnapshot(collection(db, DELETED_ITEMS_COLLECTION), (snapshot) => {
      const deletedIds: string[] = [];
      snapshot.forEach((docSnap) => {
        deletedIds.push(docSnap.id);
      });
      const next = JSON.stringify(deletedIds);
      const prev = localStorage.getItem(STORAGE_KEY_DELETED_ITEMS);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, next);
        window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
        window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
      }
    }, (err) => console.warn('Realtime deleted items sync warning:', err));
    unsubscribes.push(unsubDeleted);

    // 4. Live admin accounts listener
    const unsubAdmins = onSnapshot(collection(db, ADMIN_ACCOUNTS_COLLECTION), (snapshot) => {
      const accounts: AdminAccount[] = [];
      snapshot.forEach((docSnap) => {
        accounts.push(docSnap.data() as AdminAccount);
      });
      if (accounts.length > 0) {
        const next = JSON.stringify(accounts);
        const prev = localStorage.getItem(STORAGE_KEY_ADMIN_ACCOUNTS);
        if (prev !== next) {
          localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNTS, next);
          window.dispatchEvent(new Event('blox_fruits_admin_accounts_updated'));
        }
      }
    }, (err) => console.warn('Realtime admins sync warning:', err));
    unsubscribes.push(unsubAdmins);

    // 5. Live custom responses listener
    const unsubResponses = onSnapshot(collection(db, CUSTOM_RESPONSES_COLLECTION), (snapshot) => {
      const responses: CustomResponseEntry[] = [];
      snapshot.forEach((docSnap) => {
        responses.push(docSnap.data() as CustomResponseEntry);
      });
      const next = JSON.stringify(responses);
      const prev = localStorage.getItem(CUSTOM_RESPONSES_STORAGE_KEY);
      if (prev !== next) {
        localStorage.setItem(CUSTOM_RESPONSES_STORAGE_KEY, next);
        window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
      }
    }, (err) => console.warn('Realtime custom responses sync warning:', err));
    unsubscribes.push(unsubResponses);
  } catch (e) {
    console.warn('Failed to attach Firebase realtime listeners:', e);
  }

  return () => {
    unsubscribes.forEach(unsub => unsub());
    isRealtimeInitialized = false;
  };
}

export async function syncAdminAccountsFromFirebase(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const snapshot = await getDocs(collection(db, ADMIN_ACCOUNTS_COLLECTION));
    if (!snapshot.empty) {
      const accounts: AdminAccount[] = [];
      snapshot.forEach((docSnap) => {
        accounts.push(docSnap.data() as AdminAccount);
      });
      if (accounts.length > 0) {
        const prev = localStorage.getItem(STORAGE_KEY_ADMIN_ACCOUNTS);
        const next = JSON.stringify(accounts);
        if (prev !== next) {
          localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNTS, next);
          window.dispatchEvent(new Event('blox_fruits_admin_accounts_updated'));
        }
      }
    }
  } catch (err) {
    // Silent catch for offline / initial state
  }
}

export async function pushAdminAccountsToFirebase(accounts: AdminAccount[]): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    for (const acc of accounts) {
      if (acc.id) {
        await setDoc(doc(db, ADMIN_ACCOUNTS_COLLECTION, acc.id), acc, { merge: true });
      }
    }
  } catch (err) {
    console.error('Failed to push admin accounts to Firebase:', err);
  }
}

export async function deleteAdminAccountFromFirebase(id: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await deleteDoc(doc(db, ADMIN_ACCOUNTS_COLLECTION, id));
  } catch (err) {
    console.error('Failed to delete admin account from Firebase:', err);
  }
}

export async function syncFruitDataFromFirebase(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    let isChanged = false;

    // Overrides
    const overridesSnap = await getDocs(collection(db, FRUIT_OVERRIDES_COLLECTION));
    if (!overridesSnap.empty) {
      const overridesMap: Record<string, UserCustomValueOverride> = {};
      overridesSnap.forEach((docSnap) => {
        const data = docSnap.data() as any;
        const itemId = data.itemId || docSnap.id;
        const img = data.customIconUrl || data.customImageUrl || data.iconUrl || data.imageUrl || data.image || data.src || data.photoUrl || data.customImage;
        if (itemId) {
          overridesMap[itemId] = {
            ...data,
            itemId,
            customIconUrl: img || data.customIconUrl,
            customImageUrl: img || data.customImageUrl,
          };
        }
      });
      const prev = localStorage.getItem(STORAGE_KEY_OVERRIDES);
      const next = JSON.stringify(overridesMap);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_OVERRIDES, next);
        isChanged = true;
      }
    }

    // Custom items
    const customSnap = await getDocs(collection(db, CUSTOM_ITEMS_COLLECTION));
    if (!customSnap.empty) {
      const customList: FruitItem[] = [];
      customSnap.forEach((docSnap) => {
        const data = docSnap.data() as any;
        const img = data.iconUrl || data.imageUrl || data.customIconUrl || data.customImageUrl || data.image || data.src || data.photoUrl || data.customImage;
        customList.push({
          ...data,
          iconUrl: img || data.iconUrl,
          imageUrl: img || data.imageUrl,
        });
      });
      const prev = localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS);
      const next = JSON.stringify(customList);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, next);
        isChanged = true;
      }
    }

    // Deleted items
    const deletedSnap = await getDocs(collection(db, DELETED_ITEMS_COLLECTION));
    if (!deletedSnap.empty) {
      const deletedIds: string[] = [];
      deletedSnap.forEach((docSnap) => {
        deletedIds.push(docSnap.id);
      });
      const prev = localStorage.getItem(STORAGE_KEY_DELETED_ITEMS);
      const next = JSON.stringify(deletedIds);
      if (prev !== next) {
        localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, next);
        isChanged = true;
      }
    }

    // Auto seed to Firebase if Firestore has no data yet
    if (overridesSnap.empty && customSnap.empty) {
      await seedBackupDataToFirebase(false);
    }

    if (isChanged) {
      window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
      window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    }
  } catch (err) {
    // If Firestore access is pending or empty, seed locally and push
    seedBackupDataToFirebase(false).catch(() => {});
  }
}

export async function seedBackupDataToFirebase(force: boolean = false): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const overrides = BACKUP_BLOX_FRUITS_DATA.overrides as Record<string, UserCustomValueOverride>;
    const customItems = BACKUP_BLOX_FRUITS_DATA.customItems as FruitItem[];
    const deletedItemIds = BACKUP_BLOX_FRUITS_DATA.deletedItemIds;

    // Check local storage to initialize if needed
    if (!localStorage.getItem(STORAGE_KEY_OVERRIDES)) {
      localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    }
    if (!localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS)) {
      localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(customItems));
    }
    if (!localStorage.getItem(STORAGE_KEY_DELETED_ITEMS)) {
      localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify(deletedItemIds));
    }

    await pushFruitDataToFirebase(overrides, customItems, deletedItemIds);
  } catch (err) {
    console.warn('Firebase seeding note:', err);
  }
}

export async function pushFruitDataToFirebase(
  overrides: Record<string, UserCustomValueOverride>,
  customItems: FruitItem[],
  deletedItemIds: string[]
): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    for (const [key, val] of Object.entries(overrides)) {
      const itemId = val.itemId || key;
      const img = val.customIconUrl || val.customImageUrl || (val as any).iconUrl || (val as any).imageUrl;
      const payload = {
        ...val,
        itemId,
        customIconUrl: img || val.customIconUrl || val.customImageUrl || '',
        customImageUrl: img || val.customImageUrl || val.customIconUrl || '',
      };
      await setDoc(doc(db, FRUIT_OVERRIDES_COLLECTION, itemId), payload, { merge: true });
    }
    for (const item of customItems) {
      if (item.id) {
        const img = item.iconUrl || item.imageUrl || (item as any).customIconUrl || (item as any).customImageUrl;
        const payload = {
          ...item,
          iconUrl: img || item.iconUrl || item.imageUrl || '',
          imageUrl: img || item.imageUrl || item.iconUrl || '',
        };
        await setDoc(doc(db, CUSTOM_ITEMS_COLLECTION, item.id), payload, { merge: true });
      }
    }
    for (const id of deletedItemIds) {
      await setDoc(doc(db, DELETED_ITEMS_COLLECTION, id), { id, deletedAt: new Date().toISOString() });
    }
  } catch (err) {
    console.error('Failed to push fruit data to Firebase:', err);
  }
}

export async function deleteFruitOverrideFromFirebase(itemId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await deleteDoc(doc(db, FRUIT_OVERRIDES_COLLECTION, itemId));
  } catch (err) {
    console.error('Failed to delete fruit override from Firebase:', err);
  }
}

export async function deleteCustomItemFromFirebase(itemId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await deleteDoc(doc(db, CUSTOM_ITEMS_COLLECTION, itemId));
  } catch (err) {
    console.error('Failed to delete custom item from Firebase:', err);
  }
}

export async function syncCustomResponsesFromFirebase(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const snap = await getDocs(collection(db, CUSTOM_RESPONSES_COLLECTION));
    if (!snap.empty) {
      const responses: CustomResponseEntry[] = [];
      snap.forEach((docSnap) => {
        responses.push(docSnap.data() as CustomResponseEntry);
      });
      if (responses.length > 0) {
        const prev = localStorage.getItem(CUSTOM_RESPONSES_STORAGE_KEY);
        const next = JSON.stringify(responses);
        if (prev !== next) {
          localStorage.setItem(CUSTOM_RESPONSES_STORAGE_KEY, next);
          window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
        }
      }
    }
  } catch (err) {
    // Silent catch
  }
}

export async function pushCustomResponsesToFirebase(responses: CustomResponseEntry[]): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    for (const resp of responses) {
      if (resp.id) {
        await setDoc(doc(db, CUSTOM_RESPONSES_COLLECTION, resp.id), resp, { merge: true });
      }
    }
  } catch (err) {
    console.error('Failed to push custom responses to Firebase:', err);
  }
}

export async function deleteCustomResponseFromFirebase(id: string): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    await deleteDoc(doc(db, CUSTOM_RESPONSES_COLLECTION, id));
  } catch (err) {
    console.error('Failed to delete custom response from Firebase:', err);
  }
}
