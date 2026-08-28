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

    window.addEventListener('resize', handleResize);

    // Particle system (Haki embers, sea stars, spirit wisps)
    const particleCount = intensity === 'high' ? 75 : 45;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      color: string;
      pulseSpeed: number;
      pulseVal: number;
    }> = [];

    // Shooting stars / Haki lightning streaks
    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      color: string;
      active: boolean;
    }> = [];

    const colors = [
      'rgba(56, 189, 248, ',   // Cyan / Sky
      'rgba(168, 85, 247, ',  // Purple / Conqueror Haki
      'rgba(245, 158, 11, ',   // Solar / Kitsune Gold
      'rgba(99, 102, 241, ',   // Indigo / Deep Sea
      'rgba(236, 72, 153, ',   // Pink / Mirage
      'rgba(16, 185, 129, ',   // Emerald / Dragon V4
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.2,
        maxOpacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < 3; i++) {
      meteors.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.5),
        length: Math.random() * 90 + 60,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        active: Math.random() > 0.5
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Update and draw meteors
      if (tick % 120 === 0) {
        meteors.forEach((m) => {
          if (!m.active && Math.random() > 0.4) {
            m.active = true;
            m.x = Math.random() * width * 0.8;
            m.y = Math.random() * (height * 0.3);
            m.opacity = 0.9;
          }
        });
      }

      meteors.forEach((m) => {
        if (!m.active) return;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.012;

        if (m.opacity <= 0 || m.x > width || m.y > height) {
          m.active = false;
        } else {
          ctx.beginPath();
          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;
          const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          grad.addColorStop(0, `${m.color}0)`);
          grad.addColorStop(1, `${m.color}${m.opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();

          // Star head spark
          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update and draw embers / Haki particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;
        const currentOpacity = (Math.sin(p.pulseVal) * 0.5 + 0.5) * p.maxOpacity;

        // Wrap around boundaries
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Draw particle glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
        gradient.addColorStop(0, `${p.color}${currentOpacity})`);
        gradient.addColorStop(0.5, `${p.color}${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1, currentOpacity + 0.4)})`;
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Animated Gradient Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/15 blur-[130px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/18 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[25%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/20 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-amber-600/10 blur-[130px]" />

      {/* Subtle Blox Fruits Cyber Grid & Radial Focus Mask */}
      <div 
        className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_60%,transparent_100%)]" 
      />

      {/* Floating Canvas Particles & Meteors */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
