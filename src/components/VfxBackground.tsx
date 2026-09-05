import React, { useEffect, useRef } from 'react';

interface VfxBackgroundProps {
  intensity?: 'subtle' | 'high';
}

export const VfxBackground: React.FC<VfxBackgroundProps> = ({ intensity = 'high' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Track mouse coordinates for interactive Haki field repulsion & cursor sparkle trails
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseActive = false;
    let mouseLeaveTimeout: any = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
      clearTimeout(mouseLeaveTimeout);
      mouseLeaveTimeout = setTimeout(() => {
        isMouseActive = false;
      }, 2000);

      // Spawn occasional micro cursor sparks when moving
      if (Math.random() > 0.45 && cursorSparks.length < 25) {
        cursorSparks.push({
          x: mouseX + (Math.random() - 0.5) * 16,
          y: mouseY + (Math.random() - 0.5) * 16,
          size: Math.random() * 2 + 0.8,
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: -(Math.random() * 1.4 + 0.4),
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: getThemeColors()[Math.floor(Math.random() * getThemeColors().length)]
        });
      }
    };

    // Expanding shockwaves & Haki burst sparks on clicks anywhere on the site
    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
      lineWidth: number;
    }

    interface BurstSpark {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      size: number;
      opacity: number;
      color: string;
      decay: number;
    }

    interface CursorSpark {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      decay: number;
      color: string;
    }

    const shockwaves: Shockwave[] = [];
    const burstSparks: BurstSpark[] = [];
    const cursorSparks: CursorSpark[] = [];

    const handleWindowClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const themeColors = getThemeColors();
      const primaryColor = themeColors[0];
      const accentColor = themeColors[1] || themeColors[0];

      // Shockwave ring
      if (shockwaves.length < 6) {
        shockwaves.push({
          x,
          y,
          radius: 4,
          maxRadius: Math.random() * 40 + 75,
          opacity: 0.85,
          color: primaryColor,
          lineWidth: 2.5
        });
      }

      // 10-14 Haki burst sparks shooting outward in radial directions
      const sparkCount = intensity === 'high' ? 12 : 7;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.8 + 1.2;
        burstSparks.push({
          x,
          y,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          size: Math.random() * 2.6 + 1,
          opacity: 1,
          color: Math.random() > 0.4 ? primaryColor : accentColor,
          decay: Math.random() * 0.028 + 0.018
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleWindowClick, { passive: true });

    // Dynamic Theme Palettes
    function getThemeColors(): string[] {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark_void';
      if (theme === 'ocean_blue') {
        return [
          'rgba(56, 189, 248, ',   // Sky Cyan
          'rgba(59, 130, 246, ',   // Sea Blue
          'rgba(45, 212, 191, ',   // Teal Aqua
          'rgba(147, 197, 253, ',  // Light Frost Blue
          'rgba(255, 255, 255, '   // Pure Star Spark
        ];
      }
      if (theme === 'magma_red') {
        return [
          'rgba(245, 158, 11, ',   // Solar Gold
          'rgba(239, 68, 68, ',    // Fiery Red
          'rgba(249, 115, 22, ',   // Magma Orange
          'rgba(251, 191, 36, ',   // Ember Yellow
          'rgba(255, 255, 255, '   // Star Core
        ];
      }
      // dark_void (Default Cyber/Conqueror Haki)
      return [
        'rgba(56, 189, 248, ',   // Cyan / Light Spirit
        'rgba(168, 85, 247, ',  // Purple / Conqueror Haki
        'rgba(245, 158, 11, ',   // Solar / Kitsune Gold
        'rgba(99, 102, 241, ',   // Indigo / Celestial
        'rgba(236, 72, 153, ',   // Pink / Mirage
        'rgba(16, 185, 129, '    // Emerald / Dragon V4
      ];
    }

    // Ambient floating particles (Haki embers, sea stars, spirit wisps)
    const particleCount = intensity === 'high' ? 80 : 45;
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      color: string;
      pulseSpeed: number;
      pulseVal: number;
      isTwinkle: boolean;
    }> = [];

    // High velocity shooting stars / comets
    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      color: string;
      active: boolean;
      tailWidth: number;
    }> = [];

    const initParticles = () => {
      const colors = getThemeColors();
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        particles.push({
          x,
          baseX: x,
          y: Math.random() * height,
          size: Math.random() * 2.6 + 0.8,
          speedY: -(Math.random() * 0.45 + 0.18),
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          maxOpacity: Math.random() * 0.65 + 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulseVal: Math.random() * Math.PI * 2,
          isTwinkle: Math.random() > 0.7
        });
      }

      meteors.length = 0;
      for (let i = 0; i < 4; i++) {
        meteors.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 110 + 70,
          speed: Math.random() * 7 + 4.5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.22,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          active: Math.random() > 0.4,
          tailWidth: Math.random() * 1.5 + 1.2
        });
      }
    };

    initParticles();

    // Re-initialize palette when theme changes
    const handleThemeUpdated = () => {
      initParticles();
    };
    window.addEventListener('blox_fruits_theme_updated', handleThemeUpdated);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // 1. Render Active Meteors & Comets with luminous tails
      if (tick % 100 === 0) {
        meteors.forEach((m) => {
          if (!m.active && Math.random() > 0.35) {
            const colors = getThemeColors();
            m.active = true;
            m.x = Math.random() * width * 0.85;
            m.y = Math.random() * (height * 0.35);
            m.opacity = 0.95;
            m.color = colors[Math.floor(Math.random() * colors.length)];
          }
        });
      }

      meteors.forEach((m) => {
        if (!m.active) return;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.011;

        if (m.opacity <= 0 || m.x > width + 100 || m.y > height + 100) {
          m.active = false;
        } else {
          ctx.beginPath();
          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;
          const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          grad.addColorStop(0, `${m.color}0)`);
          grad.addColorStop(0.6, `${m.color}${m.opacity * 0.5})`);
          grad.addColorStop(1, `${m.color}${m.opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = m.tailWidth;
          ctx.lineCap = 'round';
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          // Radiant comet head core
          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ffffff';
          ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 2. Render Interactive Click Shockwaves (Haki Ripples)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.09 + 0.8;
        sw.opacity -= 0.024;
        sw.lineWidth = Math.max(0.5, sw.lineWidth * 0.96);

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color}${Math.max(0, sw.opacity)})`;
        ctx.lineWidth = sw.lineWidth;
        ctx.stroke();

        // Inner glowing highlight
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color}${Math.max(0, sw.opacity * 0.35)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Render Burst Sparks from clicks
      for (let i = burstSparks.length - 1; i >= 0; i--) {
        const bs = burstSparks[i];
        bs.x += bs.speedX;
        bs.y += bs.speedY;
        bs.speedX *= 0.94; // Air resistance / drag
        bs.speedY *= 0.94;
        bs.opacity -= bs.decay;

        if (bs.opacity <= 0) {
          burstSparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(bs.x, bs.y, bs.size, 0, Math.PI * 2);
        ctx.fillStyle = `${bs.color}${Math.max(0, bs.opacity)})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = bs.color.slice(0, -1) + '1)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Render Mouse Cursor Micro-Sparks
      for (let i = cursorSparks.length - 1; i >= 0; i--) {
        const cs = cursorSparks[i];
        cs.x += cs.speedX;
        cs.y += cs.speedY;
        cs.life -= cs.decay;

        if (cs.life <= 0) {
          cursorSparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(cs.x, cs.y, cs.size * cs.life, 0, Math.PI * 2);
        ctx.fillStyle = `${cs.color}${Math.max(0, cs.life * 0.85)})`;
        ctx.fill();
      }

      // 5. Render Ambient Haki Particles with gentle cursor repulsion field
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Interactive cursor repulsion (Haki aura field)
        if (isMouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        const currentOpacity = (Math.sin(p.pulseVal) * 0.5 + 0.5) * p.maxOpacity;

        // Wrap boundaries seamlessly
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Multi-stop soft radial glow aura
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.8);
        gradient.addColorStop(0, `${p.color}${currentOpacity})`);
        gradient.addColorStop(0.5, `${p.color}${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Intense particle core
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1, currentOpacity + 0.35)})`;
        ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
        ctx.fill();

        // Subtle 4-point cross glint on twinkling celestial particles
        if (p.isTwinkle && currentOpacity > 0.55) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.8;
          const arm = p.size * 2.2;
          ctx.moveTo(p.x - arm, p.y);
          ctx.lineTo(p.x + arm, p.y);
          ctx.moveTo(p.x, p.y - arm);
          ctx.lineTo(p.x, p.y + arm);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('blox_fruits_theme_updated', handleThemeUpdated);
      clearTimeout(mouseLeaveTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Animated Cosmic Gradient Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[58vw] h-[58vw] rounded-full bg-cyan-600/15 blur-[140px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[-15%] right-[-10%] w-[62vw] h-[62vw] rounded-full bg-purple-600/18 blur-[160px] animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-[30%] right-[8%] w-[42vw] h-[42vw] rounded-full bg-indigo-900/22 blur-[130px]" />
      <div className="absolute bottom-[20%] left-[6%] w-[38vw] h-[38vw] rounded-full bg-amber-600/12 blur-[140px]" />

      {/* Subtle Blox Fruits Cyber Grid & Radial Focus Mask */}
      <div 
        className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_60%,transparent_100%)]" 
      />

      {/* Floating Canvas Particles, Shockwaves & Interactive Haki Energy */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

