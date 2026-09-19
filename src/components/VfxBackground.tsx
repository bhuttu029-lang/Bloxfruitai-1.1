import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundFX } from '../utils/audio';
import { Moon, CloudLightning, Waves, Sparkles, Compass, Zap } from 'lucide-react';

export type AtmosphereType = 'mirage_moon' | 'leviathan_storm' | 'sunken_ocean' | 'conqueror_void' | 'auto_sync';
export type PerformanceMode = 'high' | 'balanced' | 'performance';

interface VfxBackgroundProps {
  forcedAtmosphere?: AtmosphereType;
}

interface SkillTriggerEvent {
  name: string;
  icon: string;
  color: string;
}

const SKILL_TYPES: SkillTriggerEvent[] = [
  { name: "Conqueror's Haki Burst", icon: '⚡', color: '#dc2626' },
  { name: 'Dragon Magma Eruption', icon: '🔥', color: '#f97316' },
  { name: 'Kitsune Foxfire Spiral', icon: '🦊', color: '#38bdf8' },
  { name: 'Frost Nova Ice Surge', icon: '❄️', color: '#60a5fa' },
  { name: 'Buddha Holy Radiant Ray', icon: '✨', color: '#fbbf24' },
  { name: 'Yoru Dimensional Slash', icon: '🗡️', color: '#10b981' }
];

export const VfxBackground: React.FC<VfxBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentAtmosphere, setCurrentAtmosphere] = useState<AtmosphereType>('mirage_moon');
  const [isAutoSync, setIsAutoSync] = useState<boolean>(true);
  const [perfMode, setPerfMode] = useState<PerformanceMode>('balanced');
  const [recentSkill, setRecentSkill] = useState<SkillTriggerEvent | null>(null);
  const [showAtmospherePicker, setShowAtmospherePicker] = useState<boolean>(false);

  const perfModeRef = useRef<PerformanceMode>(perfMode);
  perfModeRef.current = perfMode;

  const currentAtmosphereRef = useRef<AtmosphereType>(currentAtmosphere);
  currentAtmosphereRef.current = currentAtmosphere;

  // Auto-sync atmosphere cycle timer (cycles every 45s)
  useEffect(() => {
    if (!isAutoSync) return;
    const environments: AtmosphereType[] = ['mirage_moon', 'leviathan_storm', 'sunken_ocean', 'conqueror_void'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % environments.length;
      setCurrentAtmosphere(environments[idx]);
    }, 45000);
    return () => clearInterval(interval);
  }, [isAutoSync]);

  // Main Canvas Animation Engine with Zero-ShadowBlur & Frame-Throttling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Parallax tracking (smooth & lightweight)
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;
    let lastMouseMoveTime = 0;

    // Fast particle pools
    interface Sparkle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      speedX: number;
      speedY: number;
    }

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      color: string;
    }

    interface Particle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      size: number;
      opacity: number;
      color: string;
      decay: number;
      shape: 'circle' | 'line' | 'diamond';
    }

    const cursorTrail: Sparkle[] = [];
    const shockwaves: Shockwave[] = [];
    const particles: Particle[] = [];

    // Throttled mouse move for zero lag
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTime < 35) return; // Cap mouse processing to ~30fps
      lastMouseMoveTime = now;

      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      if (perfModeRef.current === 'performance') return; // skip trail in max performance

      if (cursorTrail.length < (perfModeRef.current === 'balanced' ? 10 : 18)) {
        cursorTrail.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2 + 1,
          opacity: 0.8,
          color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24',
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: -(Math.random() * 1.2 + 0.3)
        });
      }
    };

    // Lightweight On Click Handler (No heavy shadowBlur, capped counts)
    let lastClickTime = 0;
    const handleWindowClick = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastClickTime < 60) return; // debounce rapid spam
      lastClickTime = now;

      const x = e.clientX;
      const y = e.clientY;

      const skillIdx = Math.floor(Math.random() * SKILL_TYPES.length);
      const skill = SKILL_TYPES[skillIdx];
      setRecentSkill(skill);

      soundFX.playPop();

      const isPerf = perfModeRef.current === 'performance';
      const particleLimit = isPerf ? 6 : perfModeRef.current === 'balanced' ? 10 : 16;

      // 1. Single primary shockwave
      shockwaves.push({
        x,
        y,
        radius: 4,
        maxRadius: isPerf ? 55 : 85,
        opacity: 0.9,
        color: skill.color
      });

      // 2. Lightweight particles (strictly no expensive shadowBlur)
      for (let i = 0; i < particleLimit; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1;
        particles.push({
          x,
          y,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.2,
          opacity: 0.95,
          color: skill.color,
          decay: Math.random() * 0.035 + 0.025,
          shape: skillIdx === 3 ? 'diamond' : skillIdx === 5 ? 'line' : 'circle'
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleWindowClick, { passive: true });

    // Pre-allocated static star positions (capped to 40 for optimal performance)
    const stars: Array<{ x: number; y: number; size: number; pulseVal: number; color: string }> = [];
    const starCount = 42;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.6,
        pulseVal: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? '#bae6fd' : i % 3 === 1 ? '#fef08a' : '#ffffff'
      });
    }

    // Pre-allocated rain drops (capped to 25)
    const rainDrops: Array<{ x: number; y: number; len: number; speed: number }> = [];
    for (let i = 0; i < 28; i++) {
      rainDrops.push({
        x: Math.random(),
        y: Math.random(),
        len: Math.random() * 18 + 12,
        speed: Math.random() * 8 + 7
      });
    }

    // Pre-allocated bubbles (capped to 16)
    const bubbles: Array<{ x: number; y: number; r: number; speed: number; wobble: number }> = [];
    for (let i = 0; i < 16; i++) {
      bubbles.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 3 + 1.5,
        speed: Math.random() * 0.5 + 0.3,
        wobble: Math.random() * Math.PI * 2
      });
    }

    let tick = 0;
    let lastFrameTime = performance.now();

    // High-Efficiency Render Loop
    const render = (currentTime: number) => {
      // Frame rate throttling for performance
      const delta = currentTime - lastFrameTime;
      if (delta < 15) {
        // cap to ~60fps
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;
      tick++;

      ctx.clearRect(0, 0, width, height);

      const mode = perfModeRef.current;
      const atmo = currentAtmosphereRef.current;

      // Smooth Parallax Lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      const pX = (currentMouseX - width / 2) * 0.015;
      const pY = (currentMouseY - height / 2) * 0.015;

      // 1. Atmosphere: Mirage Full Moon
      if (atmo === 'mirage_moon') {
        const mx = width * 0.82 + pX * 0.5;
        const my = height * 0.2 + pY * 0.5;
        const mr = Math.min(width, height) * 0.08 + 20;

        // Moon Body
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();

        // Single light ring
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, mr + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Atmosphere: Leviathan Storm Rain
      else if (atmo === 'leviathan_storm' && mode !== 'performance') {
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        rainDrops.forEach((d) => {
          d.y += d.speed / height;
          if (d.y > 1) d.y = 0;
          const rx = d.x * width;
          const ry = d.y * height;
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx + 2, ry + d.len);
        });
        ctx.stroke();
      }

      // 3. Atmosphere: Sunken Ocean Bubbles
      else if (atmo === 'sunken_ocean' && mode !== 'performance') {
        ctx.strokeStyle = 'rgba(165, 243, 252, 0.35)';
        ctx.lineWidth = 1;
        bubbles.forEach((b) => {
          b.y -= b.speed / height;
          b.wobble += 0.02;
          if (b.y < 0) b.y = 1;
          const bx = b.x * width + Math.sin(b.wobble) * 8 + pX;
          const by = b.y * height;
          ctx.beginPath();
          ctx.arc(bx, by, b.r, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // 4. Atmosphere: Conqueror Radar Ring
      else if (atmo === 'conqueror_void' && mode !== 'performance') {
        const cx = width / 2 + pX * 0.3;
        const cy = height / 2 + pY * 0.3;
        const radius = Math.min(width, height) * 0.35;

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Universal Ambient Stars (Fast Render)
      if (mode !== 'performance') {
        const count = mode === 'balanced' ? 24 : stars.length;
        for (let i = 0; i < count; i++) {
          const s = stars[i];
          s.pulseVal += 0.02;
          const op = (Math.sin(s.pulseVal) * 0.3 + 0.6) * 0.6;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = op;
          ctx.fillRect(s.x * width + pX * 0.2, s.y * height + pY * 0.2, s.size, s.size);
        }
        ctx.globalAlpha = 1;
      }

      // Cursor Trail
      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const ct = cursorTrail[i];
        ct.x += ct.speedX;
        ct.y += ct.speedY;
        ct.opacity -= 0.05;

        if (ct.opacity <= 0) {
          cursorTrail.splice(i, 1);
          continue;
        }

        ctx.fillStyle = ct.color;
        ctx.globalAlpha = ct.opacity;
        ctx.fillRect(ct.x, ct.y, ct.size, ct.size);
      }
      ctx.globalAlpha = 1;

      // Shockwaves (Zero shadowBlur - pure fast stroke)
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.15 + 1;
        sw.opacity -= 0.04;

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = Math.max(0, sw.opacity);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Particles (Zero shadowBlur - fast direct geometry)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedX *= 0.94;
        p.speedY *= 0.94;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.shape === 'line') {
          ctx.fillRect(p.x - p.size, p.y - 0.5, p.size * 2, 1);
        } else {
          ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const atmospheresList: Array<{ id: AtmosphereType; name: string; icon: any; color: string; desc: string }> = [
    { id: 'mirage_moon', name: 'Mirage Full Moon', icon: Moon, color: 'text-cyan-400', desc: 'Lunar halo & mist' },
    { id: 'leviathan_storm', name: 'Leviathan Danger 6', icon: CloudLightning, color: 'text-purple-400', desc: 'Ocean storm rain' },
    { id: 'sunken_ocean', name: 'Sunken Sea Abyss', icon: Waves, color: 'text-teal-400', desc: 'Underwater bubbles' },
    { id: 'conqueror_void', name: 'Conqueror Void', icon: Compass, color: 'text-amber-400', desc: 'Cyber-sea radar' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Optimized Lightweight Ambient Glows with hardware acceleration */}
      {perfMode !== 'performance' && (
        <>
          <div
            className={`absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full blur-[70px] opacity-40 will-change-transform transition-colors duration-700 pointer-events-none ${
              currentAtmosphere === 'mirage_moon'
                ? 'bg-cyan-600/15'
                : currentAtmosphere === 'leviathan_storm'
                ? 'bg-purple-800/18'
                : currentAtmosphere === 'sunken_ocean'
                ? 'bg-teal-700/15'
                : 'bg-indigo-700/15'
            }`}
          />
          <div
            className={`absolute bottom-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[80px] opacity-35 will-change-transform transition-colors duration-700 pointer-events-none ${
              currentAtmosphere === 'mirage_moon'
                ? 'bg-purple-600/12'
                : currentAtmosphere === 'leviathan_storm'
                ? 'bg-blue-900/20'
                : currentAtmosphere === 'sunken_ocean'
                ? 'bg-cyan-800/15'
                : 'bg-amber-600/10'
            }`}
          />
        </>
      )}

      {/* Main High-Performance Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full will-change-transform" />

      {/* Floating Atmosphere & Performance Controller (Interactive) */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-auto flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => {
              soundFX.playPop();
              setShowAtmospherePicker((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-300 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 group"
            title="Atmosphere & Performance Settings"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold capitalize text-[11px]">
              {isAutoSync ? 'Auto-Sync' : currentAtmosphere.replace('_', ' ')}
            </span>
          </button>

          {/* Atmosphere & Performance Dropdown Menu */}
          {showAtmospherePicker && (
            <div className="absolute bottom-full left-0 mb-2 w-64 p-2 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              {/* Performance Switch */}
              <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> MODE
                </span>
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  {(['performance', 'balanced', 'high'] as PerformanceMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setPerfMode(m);
                        soundFX.playPop();
                      }}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                        perfMode === m
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m === 'performance' ? '⚡ Lite' : m === 'balanced' ? 'Balanced' : 'Ultra'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto Sync Toggle */}
              <div className="flex items-center justify-between px-2 py-1 mb-1 text-[11px] font-bold text-slate-400">
                <span>ATMOSPHERE</span>
                <button
                  onClick={() => {
                    setIsAutoSync(!isAutoSync);
                    soundFX.playPop();
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    isAutoSync ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isAutoSync ? 'AUTO SYNC' : 'MANUAL'}
                </button>
              </div>

              <div className="space-y-1">
                {atmospheresList.map((atm) => {
                  const IconComp = atm.icon;
                  const isSelected = currentAtmosphere === atm.id && !isAutoSync;
                  return (
                    <button
                      key={atm.id}
                      onClick={() => {
                        setIsAutoSync(false);
                        setCurrentAtmosphere(atm.id);
                        setShowAtmospherePicker(false);
                        soundFX.playPop();
                      }}
                      className={`w-full flex items-start gap-2.5 p-1.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                          : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg bg-slate-950/80 ${atm.color} mt-0.5 shrink-0`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">{atm.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{atm.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Transient Click Skill HUD Toast */}
        {recentSkill && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 backdrop-blur-md shadow-md animate-in fade-in zoom-in-95 duration-150">
            <span className="text-xs">{recentSkill.icon}</span>
            <span className="font-bold text-white truncate max-w-[130px] sm:max-w-[160px]">
              {recentSkill.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
