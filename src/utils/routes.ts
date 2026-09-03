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
 * Fully supports:
 * 1. Clean HTML5 Path: /calculator, /database, /crafter
 * 2. Subdirectory paths (e.g. GitHub Pages /repo-name/calculator)
 * 3. Hash routing: #/calculator, #calculator, #values
 * 4. Query parameters: ?p=/calculator, ?page=calculator, ?tab=calculator
 * 5. Special modal triggers: /owner, /admin, /copyright, ?owner=true, #vault
 */
export function resolveTabFromLocation(): ResolvedRoute {
  if (typeof window === 'undefined') {
    return { tab: 'sensei', openModal: null };
  }

  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const hash = location.hash ? location.hash.replace(/^#\/?/, '').toLowerCase().trim() : '';

  // Check query parameters first
  const queryTab = searchParams.get('tab') || searchParams.get('page') || searchParams.get('p');
  const isOwnerParam = searchParams.get('owner') === 'true' || searchParams.get('owner') === '1' || searchParams.get('vault') === 'true';
  const isAdminParam = searchParams.get('admin') === 'true' || searchParams.get('admin') === '1';
  const isCopyrightParam = searchParams.get('copyright') === 'true';

  let targetModal: 'owner' | 'admin' | 'copyright' | null = null;
  if (isOwnerParam || hash === 'owner' || hash === 'vault') {
    targetModal = 'owner';
  } else if (isAdminParam || hash === 'admin') {
    targetModal = 'admin';
  } else if (isCopyrightParam || hash === 'copyright') {
    targetModal = 'copyright';
  }

  // Check candidate path/alias strings
  const candidates: string[] = [];

  if (queryTab) {
    candidates.push(normalizePath(queryTab));
    candidates.push(queryTab.toLowerCase().trim());
  }

  if (hash) {
    candidates.push(normalizePath(hash));
    candidates.push(hash);
  }

  // Extract pathname segments to handle subpaths (e.g. /my-repo/calculator -> candidates: ['/my-repo/calculator', '/calculator'])
  const rawPath = location.pathname;
  if (rawPath) {
    const normalized = normalizePath(rawPath);
    candidates.push(normalized);
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      candidates.push('/' + lastSegment);
      candidates.push(lastSegment);

      // Check modal from path segment
      if (lastSegment === 'owner' || lastSegment === 'vault') targetModal = 'owner';
      if (lastSegment === 'admin') targetModal = 'admin';
      if (lastSegment === 'copyright') targetModal = 'copyright';
    }
  }

  // Match against routes
  for (const cand of candidates) {
    const matched = APP_ROUTES.find((r) => {
      if (r.id === cand) return true;
      if (r.path === cand) return true;
      return r.aliases.some((alias) => alias === cand || alias.replace(/^\//, '') === cand);
    });

    if (matched) {
      return { tab: matched.id, openModal: targetModal };
    }
  }

  return { tab: 'sensei', openModal: targetModal };
}

/**
 * Updates the browser URL and page meta when navigating to a tab.
 * Updates history with clean path when supported, or updates hash if host is hash-only.
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

  // Determine current environment path strategy
  // If user opened with a hash route initially (e.g. #/calculator), keep hash in sync
  const currentHash = window.location.hash;
  const isHashMode = currentHash.startsWith('#/') || currentHash.startsWith('#');

  // Check if pathname has a base subpath (e.g. /repo-name)
  let basePath = '';
  const pathname = window.location.pathname;
  const knownRootPaths = APP_ROUTES.flatMap((r) => [r.path, ...r.aliases]);
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 1 && !knownRootPaths.includes('/' + segments[0])) {
    basePath = '/' + segments[0];
  }

  const targetCleanPath = (basePath ? `${basePath}${route.path}` : route.path);

  try {
    if (isHashMode) {
      const newHash = `#${route.path}`;
      if (window.location.hash !== newHash) {
        if (replace) {
          window.location.replace(newHash);
        } else {
          window.location.hash = newHash;
        }
      }
    } else {
      // HTML5 pushState
      const currentFull = window.location.pathname + window.location.search;
      if (currentFull !== targetCleanPath) {
        if (replace) {
          window.history.replaceState({ tab: route.id }, route.title, targetCleanPath);
        } else {
          window.history.pushState({ tab: route.id }, route.title, targetCleanPath);
        }
      }
    }
  } catch (err) {
    // Fallback if pushState fails (e.g. strict sandboxed iframe without allow-same-origin)
    try {
      window.location.hash = `#${route.path}`;
    } catch (_) {}
  }

  // Dispatch global route change event
  window.dispatchEvent(
    new CustomEvent('blox_fruits_route_changed', {
      detail: { tab: route.id, route }
    })
  );
}

/**
 * Returns full shareable link for a page.
 * Supports clean link (https://site.com/calculator) and universal hash link (https://site.com/#/calculator)
 */
export function getShareablePageLink(tab: NavTabType, type: 'clean' | 'hash' = 'clean'): string {
  if (typeof window === 'undefined') return '';
  const route = getRouteForTab(tab);
  const origin = window.location.origin;

  // Preserve base subpath if present
  let basePath = '';
  const pathname = window.location.pathname;
  const knownRootPaths = APP_ROUTES.flatMap((r) => [r.path, ...r.aliases]);
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 1 && !knownRootPaths.includes('/' + segments[0])) {
    basePath = '/' + segments[0];
  }

  if (type === 'hash') {
    return `${origin}${basePath}/#${route.path}`;
  }
  return `${origin}${basePath}${route.path}`;
}
