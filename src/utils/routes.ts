import { NavTabType } from '../components/Sidebar';

export interface RouteConfig {
  id: NavTabType;
  path: string;
  aliases: string[];
  title: string;
  shortTitle: string;
  description: string;
}

export const APP_ROUTES: RouteConfig[] = [
  {
    id: 'sensei',
    path: '/sensei',
    aliases: ['/', '/ai', '/chat', '/solas', '/sensei', '/oracle'],
    title: 'Solas AI Sensei • Blox Fruits Master Hub',
    shortTitle: 'Solas AI Sensei',
    description: 'Blox Fruits AI Grandmaster companion, trade value evaluator, PvP tactician, and combat sensei.'
  },
  {
    id: 'calculator',
    path: '/calculator',
    aliases: ['/calculator', '/trade', '/calc', '/wfl', '/trade-calc', '/trade-calculator'],
    title: 'Trade Value & W/F/L Calculator • Blox Fruits Master Hub',
    shortTitle: 'Trade Calculator',
    description: 'Real-time Blox Fruits trade analyzer with 40% Beli difference limits, win/fair/loss verification, and Physical vs Perm values.'
  },
  {
    id: 'database',
    path: '/database',
    aliases: ['/database', '/values', '/prices', '/market', '/tier-list', '/codex'],
    title: 'Price & Demand Values Codex • Blox Fruits Master Hub',
    shortTitle: 'Values Database',
    description: 'Live Blox Fruits market values, demand ratings, hype scores, and permanent vs physical trading prices.'
  },
  {
    id: 'tradeladder',
    path: '/tradeladder',
    aliases: ['/tradeladder', '/ladder', '/zero-to-kitsune', '/profit-ladder', '/flip-guide'],
    title: 'Zero-to-Kitsune Trading Ladder • Blox Fruits Master Hub',
    shortTitle: 'Trade Ladder',
    description: 'Step-by-step profit roadmaps, tier upgrade sequences, and trading flip techniques from Common to Mythical.'
  },
  {
    id: 'checklist',
    path: '/checklist',
    aliases: ['/checklist', '/tracker', '/inventory', '/titles', '/v4-tracker'],
    title: 'My Collection Checklist • Blox Fruits Master Hub',
    shortTitle: 'My Checklist',
    description: 'Track all your Blox Fruits Swords, Guns, Accessories, Race V4 gears, and Titles with persistent progress.'
  },
  {
    id: 'crafter',
    path: '/crafter',
    aliases: ['/crafter', '/combos', '/pvp', '/builds', '/combo-builder', '/pvp-combos'],
    title: 'PvP Combos & Builds Crafter • Blox Fruits Master Hub',
    shortTitle: 'PvP Combos',
    description: 'Build meta loadouts, calculate combo damage, cooldowns, and test one-shot synergies for bounty hunting.'
  },
  {
    id: 'faq',
    path: '/faq',
    aliases: ['/faq', '/faqs', '/guides', '/v4-gears', '/codex-faq'],
    title: '33 FAQs & Race V4 Gears Codex • Blox Fruits Master Hub',
    shortTitle: '33 Master FAQs',
    description: '33 exhaustive guides covering anti-cheat, glitch mechanics, Sea Danger 1-6, Leviathan hunts, and Race V4 skill trees.'
  },
  {
    id: 'obtainment',
    path: '/obtainment',
    aliases: ['/obtainment', '/drops', '/items', '/weapons', '/obtain-guide'],
    title: 'Item Obtainment & Drops Codex • Blox Fruits Master Hub',
    shortTitle: 'Obtainment Codex',
    description: 'Exhaustive step-by-step obtainment guides, drop chances, and quest puzzles for every weapon and accessory.'
  },
  {
    id: 'progression',
    path: '/progression',
    aliases: ['/progression', '/sea', '/leveling', '/routes', '/sea-guide'],
    title: 'Sea 1-3 Progression Guide • Blox Fruits Master Hub',
    shortTitle: 'Sea Progression',
    description: 'Level 1 to 2800 leveling routes, island questlines, boss locations, sea transitions, and Mirage Island.'
  },
  {
    id: 'mutationlab',
    path: '/mutationlab',
    aliases: ['/mutationlab', '/mutation', '/game', '/arena', '/mini-game', '/rpg'],
    title: 'Fruit Mutation Game & Combat Arena • Blox Fruits Master Hub',
    shortTitle: 'Mutation Game',
    description: 'Real-time boss battle simulations, Gacha spins, hybrid fruit mutations, and Tier-3 awakening combat RPG.'
  },
  {
    id: 'suggestions',
    path: '/suggestions',
    aliases: ['/suggestions', '/feedback', '/community', '/ideas'],
    title: 'Community Suggestions Hub • Blox Fruits Master Hub',
    shortTitle: 'Visitor Suggestions',
    description: 'Submit, review, and upvote community ideas and feature requests for the Blox Fruits Master Hub.'
  }
];

export interface ResolvedRoute {
  tab: NavTabType;
  openModal?: 'owner' | 'admin' | 'copyright' | null;
}

// HIGH-SECURITY: Cryptographically unique, unguessable secret routes
// Standard guessable terms like /owner, /admin, /vault, /mod are strictly BLOCKED and never open panels
export const SECRET_OWNER_VAULT_PATH = '/solas-omega-vault-8849k';
export const SECRET_ADMIN_PANEL_PATH = '/staff-nexus-gate-4927x';

/**
 * Normalizes any path or alias into standard format: lowercased, trimmed, leading slash, no trailing slash
 */
export function normalizePath(path: string): string {
  if (!path) return '/';
  let clean = path.trim().toLowerCase();
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean;
}

/**
 * Gets the route configuration for a given navigation tab
 */
export function getRouteForTab(tab: NavTabType): RouteConfig {
  const found = APP_ROUTES.find((r) => r.id === tab);
  return found || APP_ROUTES[0];
}

/**
 * Resolves the active tab and any modal trigger from current window location.
 * Provides clean web page separation for all tabs (/calculator, /database, /crafter, etc.).
 * GUESSABLE PATHS LIKE /owner, /admin, /vault ARE STRICTLY BLOCKED!
 */
export function resolveTabFromLocation(): ResolvedRoute {
  if (typeof window === 'undefined') {
    return { tab: 'sensei', openModal: null };
  }

  const location = window.location;
  const rawPath = location.pathname || '/';
  const normalized = normalizePath(rawPath);
  const segments = normalized.split('/').filter(Boolean);
  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';

  // 1. STRICT SECURITY DEFENSE: Intercept and neutralize any guessable admin/owner attempts
  const isGuessableOwnerAttempt = 
    lastSegment === 'owner' || 
    lastSegment === 'vault' || 
    normalized.includes('/owner') || 
    normalized.includes('/vault');

  const isGuessableAdminAttempt = 
    lastSegment === 'admin' || 
    lastSegment === 'mod' || 
    lastSegment === 'panel' || 
    normalized.includes('/admin');

  if (isGuessableOwnerAttempt || isGuessableAdminAttempt) {
    // Neutralize immediately: sanitize URL back to /sensei - NEVER open any panel
    try {
      window.history.replaceState({ tab: 'sensei' }, 'Solas AI Sensei', '/sensei');
    } catch (_) {}
    return { tab: 'sensei', openModal: null };
  }

  // 2. UNGUESSABLE SECRET ROUTE VALIDATION
  let targetModal: 'owner' | 'admin' | 'copyright' | null = null;

  if (normalized === SECRET_OWNER_VAULT_PATH || lastSegment === 'solas-omega-vault-8849k') {
    targetModal = 'owner';
  } else if (normalized === SECRET_ADMIN_PANEL_PATH || lastSegment === 'staff-nexus-gate-4927x') {
    targetModal = 'admin';
  } else if (normalized === '/copyright' || lastSegment === 'copyright') {
    targetModal = 'copyright';
  }

  // 3. Match against standard web page separation routes (/calculator, /database, etc.)
  for (const r of APP_ROUTES) {
    if (r.path === normalized || r.aliases.includes(normalized) || r.aliases.includes('/' + lastSegment)) {
      return { tab: r.id, openModal: targetModal };
    }
  }

  return { tab: 'sensei', openModal: targetModal };
}

/**
 * Updates the browser URL and page meta when navigating to a tab.
 * Uses clean HTML5 pushState to maintain clean web page separation.
 */
export function navigateToRoute(tab: NavTabType, replace = false): void {
  if (typeof window === 'undefined') return;

  const route = getRouteForTab(tab);

  // Update document title and meta description
  document.title = route.title;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', route.description);

  // HTML5 History PushState for clean web page separation
  const targetCleanPath = route.path;

  try {
    const currentPath = window.location.pathname;
    if (currentPath !== targetCleanPath) {
      if (replace) {
        window.history.replaceState({ tab: route.id }, route.title, targetCleanPath);
      } else {
        window.history.pushState({ tab: route.id }, route.title, targetCleanPath);
      }
    }
  } catch (_) {}

  // Dispatch global route change event
  window.dispatchEvent(
    new CustomEvent('blox_fruits_route_changed', {
      detail: { tab: route.id, route }
    })
  );
}

/**
 * Returns clean direct shareable link for a page (e.g. https://domain.com/calculator)
 */
export function getShareablePageLink(tab: NavTabType): string {
  if (typeof window === 'undefined') return '';
  const route = getRouteForTab(tab);
  return `${window.location.origin}${route.path}`;
}
