import React, { useState, useEffect } from 'react';
import { sanitizeImageUrl, getItemCategoryColors } from '../utils/imageUtils';

interface SafeFruitImageProps {
  src?: string | null;
  alt: string;
  category?: string;
  rarity?: string;
  className?: string;
  containerClassName?: string;
  fallbackInitial?: string;
  fallbackEmoji?: string;
  showCategoryBadge?: boolean;
}

export const SafeFruitImage: React.FC<SafeFruitImageProps> = ({
  src,
  alt,
  category,
  rarity,
  className = 'w-full h-full object-contain',
  containerClassName = '',
  fallbackInitial,
  fallbackEmoji,
  showCategoryBadge = false,
}) => {
  // 0: primary, 1: sanitized wikia fallback, 2: tertiary fallback (emoji or high-res SVG)
  const [fallbackStage, setFallbackStage] = useState<number>(0);
  const sanitized = sanitizeImageUrl(src);

  useEffect(() => {
    setFallbackStage(0);
  }, [src]);

  const handleImageError = () => {
    if (fallbackStage === 0 && sanitized && (sanitized.includes('wikia') || sanitized.includes('fandom') || sanitized.includes('revision'))) {
      setFallbackStage(1);
    } else {
      setFallbackStage(2);
    }
  };

  const colors = getItemCategoryColors(category, rarity);
  const initial = (fallbackInitial || alt || 'F').trim().charAt(0).toUpperCase();

  // If no valid source or image load failed, try emoji fallback first, then SVG badge
  if (!src || !sanitized || fallbackStage === 2) {
    if (fallbackEmoji) {
      return (
        <div className={`relative flex items-center justify-center select-none ${containerClassName}`} title={alt}>
          <span className="text-current leading-none">{fallbackEmoji}</span>
        </div>
      );
    }

    return (
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.glow} p-2 overflow-hidden select-none ${containerClassName}`}
        title={alt}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-[80%] max-h-[80%] drop-shadow-md"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id={`glow-${initial}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="42" className={colors.text} fill={`url(#glow-${initial})`} stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="42"
            fontWeight="900"
            fontFamily="sans-serif"
            className={colors.text}
            fill="currentColor"
          >
            {initial}
          </text>
        </svg>

        {showCategoryBadge && (
          <span className={`absolute bottom-1 right-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md border ${colors.badgeBg}`}>
            {category || rarity || 'ITEM'}
          </span>
        )}
      </div>
    );
  }

  let currentSrc = sanitized;
  if (fallbackStage === 1 && sanitized) {
    const revIndex = sanitized.indexOf('/revision');
    if (revIndex !== -1) {
      currentSrc = sanitized.substring(0, revIndex);
    }
  }

  return (
    <div className={`relative flex items-center justify-center ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className={className}
      />
    </div>
  );
};
