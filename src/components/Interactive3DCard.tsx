import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 10
  scaleHover?: number; // default 1.02
  glowColor?: string; // e.g. 'rgba(56, 189, 248, 0.3)'
  showFoilSheen?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  maxTilt = 9,
  scaleHover = 1.015,
  glowColor,
  showFoilSheen = true,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt degrees
      const tiltX = -((y - centerY) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      // Calculate glare coordinates in percentages
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ x: tiltX, y: tiltY });
      setGlare({ x: glareX, y: glareY, opacity: 0.35 });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="inline-block w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        id={id}
        onClick={onClick}
        animate={{
          rotateX: isHovered ? tilt.x : 0,
          rotateY: isHovered ? tilt.y : 0,
          scale: isHovered ? scaleHover : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow:
            isHovered && glowColor
              ? `0 16px 38px -12px ${glowColor}, 0 0 24px ${glowColor}`
              : undefined,
        }}
        className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {/* Child Content */}
        <div style={{ transform: 'translateZ(10px)' }}>{children}</div>

        {/* Dynamic Holographic Specular Glare Foil */}
        {showFoilSheen && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(56, 189, 248, 0.12) 30%, rgba(168, 85, 247, 0.08) 55%, transparent 75%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
