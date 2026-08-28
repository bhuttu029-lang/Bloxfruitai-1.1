export type AppTheme = 'dark_void' | 'ocean_blue' | 'magma_red';

const THEME_STORAGE_KEY = 'blox_fruits_app_theme_v1';

export function getStoredTheme(): AppTheme {
  if (typeof window === 'undefined') return 'dark_void';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme;
    if (stored === 'ocean_blue' || stored === 'magma_red' || stored === 'dark_void') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'dark_void';
}

export function setStoredTheme(theme: AppTheme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new Event('blox_fruits_theme_updated'));
  } catch (e) {
    console.error('Failed to save theme:', e);
  }
}

export function applyThemeClass(theme: AppTheme): {
  bgClass: string;
  cardBgClass: string;
  accentText: string;
  accentBg: string;
  borderClass: string;
  glowClass: string;
  badgeBg: string;
} {
  switch (theme) {
    case 'ocean_blue':
      return {
        bgClass: 'bg-blue-950 text-slate-100',
        cardBgClass: 'bg-blue-900/60',
        accentText: 'text-sky-400',
        accentBg: 'bg-sky-500',
        borderClass: 'border-sky-500/30',
        glowClass: 'shadow-sky-500/20',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      };
    case 'magma_red':
      return {
        bgClass: 'bg-stone-950 text-slate-100',
        cardBgClass: 'bg-stone-900/70',
        accentText: 'text-amber-400',
        accentBg: 'bg-rose-600',
        borderClass: 'border-rose-500/30',
        glowClass: 'shadow-rose-500/25',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      };
    case 'dark_void':
    default:
      return {
        bgClass: 'bg-slate-950 text-slate-100',
        cardBgClass: 'bg-slate-900/80',
        accentText: 'text-cyan-400',
        accentBg: 'bg-cyan-500',
        borderClass: 'border-slate-800',
        glowClass: 'shadow-cyan-500/20',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      };
  }
}
