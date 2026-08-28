/**
 * Image URL Resolution & Sanitization Utilities for Blox Fruits Items
 */

/**
 * Enforces HTTPS protocol and strips problematic Wikia/Fandom scaling parameters.
 */
export function sanitizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';
  let cleaned = url.trim();
  if (!cleaned) return '';

  // Enforce HTTPS
  if (cleaned.startsWith('http://')) {
    cleaned = 'https://' + cleaned.slice(7);
  } else if (cleaned.startsWith('//')) {
    cleaned = 'https:' + cleaned;
  }

  // Sanitize Wikia/Fandom CDN URLs (remove scaling down parameters that cause 404/broken images)
  // e.g. static.wikia.nocookie.net/bloxfruits/images/a/b/Fruit.png/revision/latest/scale-to-width-down/350?cb=123
  if (cleaned.includes('wikia.nocookie.net') || cleaned.includes('fandom.com')) {
    const scaleIndex = cleaned.indexOf('/scale-to-width-down');
    if (scaleIndex !== -1) {
      cleaned = cleaned.substring(0, scaleIndex);
    }
  }

  return cleaned;
}

/**
 * Validates whether a string is a well-formed image URL or data URI.
 */
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const str = url.trim();
  if (!str) return false;
  if (str.startsWith('data:image/')) return true;
  try {
    const parsed = new URL(str.startsWith('//') ? `https:${str}` : str);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Gets color scheme classes based on Blox Fruits category/rarity.
 */
export function getItemCategoryColors(category?: string, rarity?: string) {
  const cat = (category || rarity || '').toLowerCase();

  if (cat.includes('mythic') || cat.includes('mythical')) {
    return {
      bg: 'from-rose-950/90 via-purple-950/80 to-slate-900',
      border: 'border-rose-500/50',
      text: 'text-rose-400',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)]',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    };
  }
  if (cat.includes('legend') || cat.includes('legendary')) {
    return {
      bg: 'from-fuchsia-950/90 via-pink-950/80 to-slate-900',
      border: 'border-fuchsia-500/50',
      text: 'text-fuchsia-400',
      glow: 'shadow-[0_0_20px_rgba(217,70,239,0.35)]',
      badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40'
    };
  }
  if (cat.includes('rare')) {
    return {
      bg: 'from-sky-950/90 via-blue-950/80 to-slate-900',
      border: 'border-sky-500/50',
      text: 'text-sky-400',
      glow: 'shadow-[0_0_15px_rgba(56,189,248,0.35)]',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
    };
  }
  if (cat.includes('uncommon')) {
    return {
      bg: 'from-emerald-950/90 via-teal-950/80 to-slate-900',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    };
  }
  return {
    bg: 'from-slate-900 via-slate-800 to-slate-950',
    border: 'border-slate-700/60',
    text: 'text-slate-300',
    glow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]',
    badgeBg: 'bg-slate-800 text-slate-300 border-slate-700'
  };
}
