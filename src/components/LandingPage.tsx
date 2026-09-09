import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { 
  Bot, 
  Calculator, 
  Database, 
  Swords, 
  Compass, 
  TrendingUp, 
  FlaskConical, 
  CheckSquare, 
  ShieldCheck, 
  Radar, 
  Zap, 
  Eye, 
  Sparkles, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Radio, 
  Flame, 
  ExternalLink,
  Layers,
  Activity,
  Award,
  Lock,
  ChevronRight
} from 'lucide-react';
import { NavTabType } from './Sidebar';
import { soundFX } from '../utils/audio';

interface LandingPageProps {
  onNavigate: (tab: NavTabType) => void;
}

const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmv39CtKh7A6goTZ6vG0CcvfaHhhrFguImD3dVFqi0LU3G2vPumLSnjsTXblgaxp5rfeACOLkVOZ1r78NIqJJETBxTxcmS_mE_lUT9_7dg_vaY8KRU4I3lmFy-nIQ9ZNbp90vVtwM9--LwVUGISD5neYfnMWAIK0iMuDieQVIFEo8bF7--KhpDTKsPL7DEIgAdpiif1SPvrf_8Bx1upYYk16XqZQvXggpofZrbGGhsQGoQ-c2E42RY1rXryJpxsQJh3go",
  portal: "https://lh3.googleusercontent.com/aida/AEtjO1Xp6DRjNvI2WxB5ZHoF2sL8GzvFPkvk3kLqyD981bqu4IBsJP6dwd7uGLXs6oj3gRJ2NpCNVZ9BHespTMiuJSx3BkRqluwg-8nKgXz2kgOibtACqsGvpEsINNIvVhH8CIeSFGTdpF_NbsnqmzsdrmdJ8bOGd1V0B3WfeYE3psxPZZzJBALbfK6ieO8cpfDWWQrUKFIZLMKRH_dbhlJGLRmKhufxDCBCR7-X-cB-cbK1oqxWLOQT_JiThX-n",
  dragon: "https://lh3.googleusercontent.com/aida/AEtjO1UrDWW3eCvLt-2fvHfVgrWa2f6VoRBKJ9TbQeNeDkpphuC5-w0jZkbGZMpk6aFzzMIi_UM3NHCbZDkrVD1sGcV9eRY_GO6GKk0OjuUy3JkMzkeg-hzIBQdJ4ZsjUfmbCtUvEZPa9nDOYTIXKIjpipzimIRb5abNlXsoZO9bfa2f_tYMd09ypKQO8vaw-XOs-hor5sTiu5cD7ES0i_4XTg2uJpSyczlqFxT2xvjDfjcV3YlF9dq0aGHuZYFf",
  dough: "https://lh3.googleusercontent.com/aida/AEtjO1V6raZ7n9EZOND2KAMnWStTlQuUeRRZX1JVquUeDMkSj49_fpkp_IAqRK7qW3bpb6zIdAoXZVvnRf0VT_DdSFJK-ZqDCqd4GiIsXU0p29ZHewoF4pG-6ln5rkCW5cC0khfYxLt0oSSb0zQmYWxCfnd_IQ7tC9igMbMyVDVUZzKX4wbg2SzLcKLfuJ1JpuYdoTlC9OXPslSh51juY5La_GG8K3ZPGABp2JaFTbr_0ML4mLnGlZm9YWPCURA5",
  leopard: "https://lh3.googleusercontent.com/aida/AEtjO1VHByRGAKFE9czW2BVaGhgpCggr5wntSVRTaWg6z_atypFMbjdFAHVoNxXmX615Wi59eEUJvVl5odiPXOUhFkBNkyIZ2M-aPLQMP_eYfpyXU1OJgoGfvc92CEhT1k73Y7EjxK3XMtksWK-y4OpVerkEdlonBsgzlZM_LgOo6Th-iSacoCmzDaG0OOSbfH_pRBnjoNMLA1MAtviBFTFZtA1UVSDbf3n-TazpVP7uEypdziqGx4-KjjyrBuBw",
  kitsuneHero: "https://lh3.googleusercontent.com/aida/AEtjO1XjNtyRCzj0kPEI-rTbtPSMddHm1yJV7BqpEwRzE6k1Pl9qI5HSx9iRGHpbtKxQukFZ4muwltrU8gcbi7e0UFp2tcKO9_B2D-YVcEN8pbE0Rc-vLCry2Vzl5Clk29AJaCMIWlQKdzrLHh2s7q5vzAhPOO6NRldyCEyTF9p8r5FZVfyZzVa1tsNDXQUR_poKuiCaAwGmwPeOq_O8mypyHt5iWGbkJbT4WLaPTtAUryLj-CNt7_T-SMIADIap",
  navalCombat: "https://lh3.googleusercontent.com/aida/AEtjO1WQah3qPH69Qu8Kc2fyBmKz6t3WPT0PhwQu6GzL81C5qfy1960uURDe7GVKSCoC5QZFRvpzI0XTfrcL7Y18ev4nyGZfH-rVfctQj849k0UDmRNdRwUkrEYDvBf6ti1Ctr8Bt1iRUsecUBF9kdOjriLrVMC0WirOIoagyH8tHeMphuR80jlvxY_nRFaZeixQu0wg_rBRrFR9E7VDFK8egDp5xuzfCNRUF--yZa7l54ERP_-YFRy82Pzeq5E",
  footerCrest: "https://lh3.googleusercontent.com/aida-public/AB6AXuCveXK537RLD342CfvmWutfOa79BI0PDtGo0FcAZXByt6QFhOtU30Mew4o6bZ9--P0t1kdaN4hk4ZtxFDY-DOcQc69paAEDtZMoxKoi4YXvX5OGLGk12I8fmPOg-8rn1eCYmGThsoUucT3VKPbnCzsmS0ZrqIvtshyoAM8mla5ahqjceaBlijR0Ztzb5VYVwF1YyFTzT25JXSv4UrTVBPK0wOwmvMvcWyKtreXq2h-ZZFY1Mm8d4UXb0N6ZCSaA8G4JaOE"
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [selectedMythicIndex, setSelectedMythicIndex] = useState<number>(0);

  // Three.js interactive 3D Mythical Blox Fruit Engine
  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    // Clear any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1026, 2.2);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x00f0ff, 5.0, 30);
    pointLightCyan.position.set(4, 4, 4);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 4.5, 30);
    pointLightPurple.position.set(-4, -3, 3);
    scene.add(pointLightPurple);

    const pointLightGold = new THREE.PointLight(0xffb703, 3.5, 20);
    pointLightGold.position.set(0, 5, 2);
    scene.add(pointLightGold);

    // Mythic Fruit Artifact Group
    const fruitGroup = new THREE.Group();
    scene.add(fruitGroup);

    // Fruit Core - Mythic Icosahedron Geosphere
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x050b1a,
      emissive: 0x003b5c,
      specular: 0x00f0ff,
      shininess: 90,
      wireframe: false,
      flatShading: true
    });
    const fruitCore = new THREE.Mesh(coreGeo, coreMat);
    fruitGroup.add(fruitCore);

    // Outer Cyber Wireframe Shield
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireShield = new THREE.Mesh(wireGeo, wireMat);
    fruitGroup.add(wireShield);

    // Swirling Rings
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.8 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    fruitGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.75 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    fruitGroup.add(ring2);

    // Swirling Mythic Horns
    const hornGeo = new THREE.ConeGeometry(0.28, 1.1, 5);
    const hornMat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x002233, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const horn = new THREE.Mesh(hornGeo, hornMat);
      const angle = (i / 4) * Math.PI * 2;
      horn.position.set(Math.cos(angle) * 1.15, 1.35, Math.sin(angle) * 1.15);
      horn.rotation.x = 0.4;
      horn.rotation.y = angle;
      fruitGroup.add(horn);
    }

    // Floating Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 2.2 + Math.random() * 2.0;
      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.07,
      transparent: true,
      opacity: 0.7
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    fruitGroup.add(particleSystem);

    // Mouse Interaction Drag / Hover
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => { isDragging = false; };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        fruitGroup.rotation.y += deltaX * 0.01;
        fruitGroup.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
          mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        fruitGroup.rotation.y += 0.02;
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        fruitGroup.rotation.y += 0.008;
        fruitGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.12 - targetY * 0.4;
        fruitGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      wireShield.rotation.y = -elapsedTime * 0.2;
      ring1.rotation.z = elapsedTime * 0.45;
      ring2.rotation.x = elapsedTime * 0.35;
      particleSystem.rotation.y = elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchmove', handleTouchMove);
      renderer.dispose();
    };
  }, []);

  const marqueeFruits = [
    {
      name: "PORTAL FRUIT",
      tier: "MYTHIC",
      badge: "SS+ TIER",
      val: "32,000,000",
      desc: "DIMENSIONAL WARP",
      img: ASSETS.portal,
      border: "border-cyan-500/50",
      shadow: "shadow-[0_0_20px_rgba(0,240,255,0.25)]",
      floatClass: "fruit-float-1",
      accent: "text-cyan-400"
    },
    {
      name: "DRAGON (REWORK)",
      tier: "ANCIENT",
      badge: "APEX REWORK",
      val: "90,000,000",
      desc: "DESTRUCTION INCINERATION",
      img: ASSETS.dragon,
      border: "border-rose-500/50",
      shadow: "shadow-[0_0_20px_rgba(244,63,94,0.25)]",
      floatClass: "fruit-float-2",
      accent: "text-rose-300"
    },
    {
      name: "DOUGH (AWK)",
      tier: "SPECIAL",
      badge: "S-TIER",
      val: "25,000,000",
      desc: "TRUE STUN COMBO",
      img: ASSETS.dough,
      border: "border-yellow-400/50",
      shadow: "shadow-[0_0_20px_rgba(250,204,21,0.25)]",
      floatClass: "fruit-float-3",
      accent: "text-yellow-300"
    },
    {
      name: "LEOPARD FRUIT",
      tier: "BEAST",
      badge: "S-TIER",
      val: "40,000,000",
      desc: "APEX SPEED PREDATOR",
      img: ASSETS.leopard,
      border: "border-amber-500/50",
      shadow: "shadow-[0_0_20px_rgba(255,153,0,0.25)]",
      floatClass: "fruit-float-4",
      accent: "text-amber-300"
    }
  ];

  const showcaseFruits = [
    {
      id: "portal",
      name: "Portal Fruit",
      sub: "Dimensional World Warp",
      tierBadge: "SS+ TIER",
      type: "MYTHIC",
      value: "32,000,000",
      demand: "99.4% (Max Velocity)",
      img: ASSETS.portal,
      border: "border-cyan-500/40 hover:border-cyan-400",
      glow: "rgba(0, 240, 255, 0.15)",
      badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      valColor: "text-cyan-400",
      targetTab: "calculator" as NavTabType
    },
    {
      id: "dragon",
      name: "Dragon (Rework)",
      sub: "Draconic Incineration",
      tierBadge: "ANCIENT",
      type: "APEX REWORK",
      value: "90,000,000",
      demand: "100% (Apex Max)",
      img: ASSETS.dragon,
      border: "border-rose-500/40 hover:border-rose-400",
      glow: "rgba(244, 63, 94, 0.15)",
      badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      valColor: "text-rose-300",
      targetTab: "database" as NavTabType
    },
    {
      id: "dough",
      name: "Dough (Awakened)",
      sub: "True Stun Combo King",
      tierBadge: "S-TIER",
      type: "AWAKENED",
      value: "25,000,000",
      demand: "98.1% (High)",
      img: ASSETS.dough,
      border: "border-yellow-400/40 hover:border-yellow-300",
      glow: "rgba(250, 204, 21, 0.15)",
      badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
      valColor: "text-yellow-300",
      targetTab: "crafter" as NavTabType
    },
    {
      id: "leopard",
      name: "Leopard Fruit",
      sub: "Speed S+ Apex Predator",
      tierBadge: "S-TIER",
      type: "BEAST TYPE",
      value: "40,000,000",
      demand: "97.5% (High)",
      img: ASSETS.leopard,
      border: "border-amber-500/40 hover:border-amber-400",
      glow: "rgba(255, 153, 0, 0.15)",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      valColor: "text-amber-300",
      targetTab: "database" as NavTabType
    }
  ];

  return (
    <div className="w-full bg-[#05070d] text-[#e1e2ec] font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* ============================================================ */}
      {/* 1. TOP MARKETING NAVIGATION BAR                              */}
      {/* ============================================================ */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#05070d]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo with Platform Picture */}
          <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-1 rounded-xl bg-cyan-500/30 blur-md group-hover:bg-cyan-400/50 transition-all"></div>
              <img 
                alt="Solas AI Platform Branding" 
                className="h-11 w-14 object-cover object-center relative z-10 rounded-xl border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.4)]" 
                src={ASSETS.logo}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 tracking-wider drop-shadow-[0_0_14px_rgba(0,240,255,0.6)] font-mono">
                  SOLAS AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 rounded-full font-bold">
                  100% FREE
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                Blox Fruits Intelligence Matrix
              </span>
            </div>
          </div>

          {/* Quick Anchor / Tool Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide flex items-center gap-1.5" 
              href="#precision-tools"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Precision Tools</span>
            </a>
            <a 
              className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide flex items-center gap-1.5" 
              href="#vfx-stream"
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Fruit VFX</span>
            </a>
            <a 
              className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide flex items-center gap-1.5" 
              href="#showcase"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Mythical Index</span>
            </a>
            <a 
              className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide flex items-center gap-1.5" 
              href="#naval-radar"
            >
              <Radar className="w-4 h-4 text-emerald-400" />
              <span>Fleet Ops</span>
            </a>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-800 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>14ms Tokyo Cluster</span>
            </div>
          </nav>

          {/* Launch Free Radar CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFX.playSuccess();
                onNavigate('calculator');
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 cursor-pointer"
            >
              <Radar className="w-4 h-4 text-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
              <span>LAUNCH FREE RADAR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Page Content */}
      <main className="relative overflow-hidden">
        
        {/* Glowing Background Ambiance */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full"></div>
        <div className="absolute top-[600px] right-[-200px] w-[600px] h-[600px] bg-purple-600/15 blur-[180px] pointer-events-none rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none"></div>

        {/* ============================================================ */}
        {/* 2. GRAND HERO SECTION                                        */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#00f985]"></span>
                </span>
                <span className="font-mono text-xs text-cyan-300 tracking-wide font-semibold">
                  NEURAL ENGINE V4.8.2 ACTIVE
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-purple-300">BLOX FRUITS SEA 3 READY</span>
              </div>

              {/* Hero Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_0_35px_rgba(0,240,255,0.35)] font-mono">
                  CRUSH TRADES.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 drop-shadow-[0_0_40px_rgba(0,240,255,0.7)]">
                    DOMINATE THE SEAS.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  The apex companion protocol engineered for high-elo Blox Fruits combatants. Real-time market arbitrage, frame-perfect PvP combo execution, and instant Leviathan Gate orbital sonar — completely free forever.
                </p>
              </div>

              {/* High-Converting Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    soundFX.playSuccess();
                    onNavigate('sensei');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:shadow-[0_0_50px_rgba(0,240,255,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 cursor-pointer"
                >
                  <Bot className="w-5 h-5 text-slate-950" />
                  <span>Launch Solas AI Free</span>
                </button>
                <a 
                  href="#showcase"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span>Explore Live Radar</span>
                </a>
              </div>

              {/* Social Proof Key Metric Counters */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 font-mono">
                    142K+
                  </div>
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mt-1">Active Hunters</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500 font-mono">
                    $2.4B+
                  </div>
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mt-1">Value Tracked</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 font-mono">
                    99.8%
                  </div>
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mt-1">Win Delta Rate</div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Cohesive Interactive 3D Artifact Showcase & Kitsune Hero Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] neon-card-glow">
                
                {/* Reticle HUD Accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                {/* Top Meta Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider uppercase">Interactive 3D Mythic Core</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/30">
                    Live WebGL 60FPS
                  </span>
                </div>

                {/* Dual Hero Showcase Display: 3D Canvas + Mythic Kitsune Visual */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* 3D Three.js Scene Container */}
                  <div className="md:col-span-7 relative h-72 sm:h-80 rounded-xl overflow-hidden bg-black/60 border border-slate-800 flex flex-col justify-between">
                    
                    {/* Glowing Cyber Ambient Flares */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-purple-600/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

                    {/* ThreeJS Canvas Container */}
                    <div 
                      ref={threeContainerRef} 
                      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                    />

                    {/* Top HUD Meta Header */}
                    <div className="relative z-20 pointer-events-none p-3.5 flex justify-between items-start">
                      <span className="font-mono text-[10px] text-cyan-400 bg-black/80 px-2.5 py-1 rounded-md border border-cyan-500/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        DRAG TO ROTATE
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 bg-black/80 px-2 py-0.5 rounded border border-slate-800">
                        T3 GEO-MESH
                      </span>
                    </div>

                    {/* Bottom HUD Title Bar */}
                    <div className="relative z-20 pointer-events-none p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent border-t border-slate-800/80 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-cyan-300 tracking-wide flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                            Kitsune-Dragon Orbital Core
                          </div>
                          <div className="font-mono text-[11px] text-slate-400 mt-0.5">Real-time reactive physics matrix</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                          <Activity className="w-3 h-3 text-cyan-400" />
                          <span>3D SYNC</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glowing Mythical Kitsune Artwork Card */}
                  <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-purple-500/50 group bg-slate-900/60 p-2.5 flex flex-col justify-between">
                    <div className="relative h-48 sm:h-52 rounded-lg overflow-hidden border border-cyan-500/30">
                      <img 
                        alt="Portal Fruit 3D Asset" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        src={ASSETS.portal}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-80"></div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-950/90 text-rose-400 font-mono text-[10px] font-bold border border-rose-500/40 animate-pulse">
                        SS+ TIER
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <span className="font-mono text-xs text-cyan-300 font-bold">VAL: 32,000,000</span>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold">▲ +28.5% WIN</span>
                      </div>
                    </div>

                    {/* Quick Insight */}
                    <div className="mt-2.5 p-2 rounded bg-black/80 border border-slate-800">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-purple-300 font-bold">DIMENSIONAL RIFT</span>
                        <span className="text-emerald-400">99.8% LIQUID</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        Instant dimensional warp solver with synchronized World Warp coordinates and escape tech.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      SYSTEM: OPTIMAL
                    </span>
                    <span className="text-slate-700">|</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      SEA 3 RADAR: LOCKED
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/40 font-bold">
                      MIRAGE: 04:12
                    </span>
                    <span className="text-cyan-400 font-semibold">14ms Tokyo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MOVING FRUITS VFX STREAM SECTION (INFINITE MARQUEE & FLOATING)*/}
        {/* ============================================================ */}
        <section className="w-full py-12 relative overflow-hidden bg-black/60 border-y border-cyan-500/30" id="vfx-stream">
          
          {/* Glow backdrop flares */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-28 bg-cyan-500/15 blur-[60px] pointer-events-none rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-28 bg-purple-500/15 blur-[60px] pointer-events-none rounded-full"></div>

          {/* Top Section Label */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-bold">
                LIVE TELEMETRY VFX STREAM // DRIFTING BLOX FRUITS
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                8 ACTIVE PARADIGMS
              </span>
            </div>
            <span className="font-mono text-xs text-slate-400">SYNC VELOCITY: 60 FPS</span>
          </div>

          {/* Infinite Marquee Track with Real Glowing Fruit Icons & Badges */}
          <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee flex items-center gap-6 py-4">
              {[...marqueeFruits, ...marqueeFruits, ...marqueeFruits].map((fruit, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    soundFX.playPop();
                    onNavigate('database');
                  }}
                  className={`${fruit.floatClass} group flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-slate-900/90 border ${fruit.border} ${fruit.shadow} hover:scale-105 transition-all cursor-pointer backdrop-blur-xl`}
                >
                  <div className="w-12 h-12 flex-shrink-0 relative flex items-center justify-center drop-shadow-[0_0_14px_rgba(0,240,255,0.8)]">
                    <img 
                      alt={fruit.name} 
                      className="w-12 h-12 object-contain rounded-full" 
                      src={fruit.img}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {fruit.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-mono font-bold text-slate-300 border border-slate-700">
                        {fruit.tier}
                      </span>
                    </div>
                    <span className={`font-mono text-[11px] font-semibold ${fruit.accent}`}>
                      VAL: {fruit.val} • {fruit.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. FEATURE VALUE PROPOSITIONS SECTION                        */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" id="precision-tools">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Built for Competitive Dominance
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 font-mono">
              Precision Tools. Zero Guesswork.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Replace outdated wiki pages and guesswork. Solas AI runs direct algorithmic analysis for every trade, combo, and sea event in real-time.
            </p>
          </div>

          {/* 3 High-Impact Marketing Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature Card 1: Neural Trade Calculator */}
            <div 
              onClick={() => {
                soundFX.playSuccess();
                onNavigate('calculator');
              }}
              className="bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 neon-card-glow backdrop-blur-xl relative cursor-pointer"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none"></div>
              
              <div>
                <div className="w-14 h-14 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <Calculator className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  Algorithmic Arbitrage
                </span>
                <h3 className="text-2xl font-bold text-cyan-200 mb-3 font-mono">
                  Neural Trade Calculator
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Instant W/F/L evaluations before accepting any trade. Our neural engine tracks 50,000+ hourly transactions across Sea 3 Cafe trading floors to protect you from bad offers.
                </p>

                {/* Interactive Micro Preview UI */}
                <div className="p-3 rounded-xl bg-black/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400">Your Offer: Dragon + Portal</span>
                    <span className="text-slate-300 font-semibold">48.2M</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-cyan-400 font-bold">Their Offer: Kitsune + Leopard</span>
                    <span className="text-emerald-400 font-bold">83.0M</span>
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between mt-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> MASSIVE WIN (W)
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400">+34.8M DELTA</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">99.8% Arbitrage Accuracy</span>
                <span className="text-cyan-400 flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Feature Card 2: Frame-Perfect Combo Solver */}
            <div 
              onClick={() => {
                soundFX.playSuccess();
                onNavigate('crafter');
              }}
              className="bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 neon-purple-glow backdrop-blur-xl relative cursor-pointer"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-purple-400 pointer-events-none"></div>
              
              <div>
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
                  <Swords className="w-8 h-8 text-purple-400" />
                </div>
                <span className="font-mono text-xs text-purple-300 font-bold uppercase tracking-wider block mb-1">
                  True 100-0 Stun Logic
                </span>
                <h3 className="text-2xl font-bold text-purple-200 mb-3 font-mono">
                  Frame Combo Solver
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Master unescapable one-shot combo strings for Godhuman, Portal, Cursed Dual Katana, and Dough. Includes millisecond startup windows, cancel cancels, and Ken-trick counters.
                </p>

                {/* Interactive Micro Preview UI */}
                <div className="p-3 rounded-xl bg-black/90 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs text-purple-300 font-bold flex justify-between">
                    <span>CYBORG V4 META BUILD</span>
                    <span className="text-emerald-400">TRUE STUN: 2.4s</span>
                  </div>
                  <div className="flex items-center justify-between gap-1 pt-1 font-mono text-[11px]">
                    <span className="px-2 py-1 bg-slate-800 rounded border border-cyan-500/40 text-cyan-300 font-bold">[PORTAL X]</span>
                    <span className="text-purple-400 font-bold">&gt;</span>
                    <span className="px-2 py-1 bg-slate-800 rounded border border-purple-500/40 text-purple-300 font-bold">[GH C]</span>
                    <span className="text-purple-400 font-bold">&gt;</span>
                    <span className="px-2 py-1 bg-slate-800 rounded border border-rose-500/40 text-rose-400 font-bold">[CDK Z]</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Startup: 18 frames</span>
                    <span className="text-rose-400 font-semibold">0% Escape Tech</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">Over 1,200 Solved Trees</span>
                <span className="text-purple-400 flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  Explore Combos <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Feature Card 3: Leviathan & Sea Event Sonar */}
            <div 
              onClick={() => {
                soundFX.playSuccess();
                onNavigate('progression');
              }}
              className="bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl relative cursor-pointer"
              style={{ boxShadow: '0 10px 40px -10px rgba(0, 249, 133, 0.12)' }}
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>
              
              <div>
                <div className="w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Compass className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                  Zone 6 Deep Sea Recon
                </span>
                <h3 className="text-2xl font-bold text-emerald-200 mb-3 font-mono">
                  Leviathan &amp; Mirage Sonar
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Never sail blind again. Live telemetry detects Leviathan Gate conditions, Frozen Dimension openings, Terror Shark swarms, and exact Mirage Island Full Moon alignment timers.
                </p>

                {/* Interactive Micro Preview UI */}
                <div className="p-3 rounded-xl bg-black/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      DANGER ZONE 6
                    </span>
                    <span className="text-emerald-400 font-bold">GATE: OPEN (94%)</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 pt-1 border-t border-slate-800">
                    <span>Mirage Full Moon:</span>
                    <span className="text-cyan-400 font-semibold">In 14 Mins</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                    <span>Terror Shark Blips:</span>
                    <span className="text-purple-300 font-semibold">2 Detected Near Ship</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">Real-Time Orbital GPS</span>
                <span className="text-emerald-400 flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  View Sea Guide <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* NAVAL COMBAT RADAR SPOTLIGHT (WITH PICTURE FROM CODE.HTML)   */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" id="naval-radar">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.15)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 relative h-80 sm:h-96 overflow-hidden">
                <img 
                  alt="Epic Naval Combat in Blox Fruits Sea 3" 
                  className="w-full h-full object-cover" 
                  src={ASSETS.navalCombat}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05070d]/30 to-[#05070d] hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent lg:hidden"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 border border-cyan-500/50 font-mono text-xs text-cyan-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>ORBITAL SECTOR: ZONE 6 DEEP OCEAN</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
                <span className="px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider">
                  Naval Fleet Intelligence
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight font-mono">
                  Synchronized Sea Event Domination
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Solas AI coordinates armada raids, warning all fleet members of incoming Terror Sharks, Sea Beast ambushes, and Leviathan Heart extraction timing in millisecond accuracy.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-black/80 border border-slate-800">
                    <div className="text-emerald-400 font-bold">100% SUCCESS</div>
                    <div className="text-slate-400 text-[11px]">Heart Harpoon Pulls</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/80 border border-slate-800">
                    <div className="text-cyan-400 font-bold">&lt; 14ms DELTA</div>
                    <div className="text-slate-400 text-[11px]">Sub-orbital Sync</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundFX.playPop();
                    onNavigate('progression');
                  }}
                  className="w-full py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Open Sea 1-3 Route Radar</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. MYTHICAL FRUITS SHOWCASE GALLERY                          */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" id="showcase">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/40 text-purple-300 font-mono text-xs uppercase font-bold tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Apex Market Assets
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-cyan-300 font-mono">
                Live Mythical Index Showcase
              </h2>
            </div>
            <p className="text-slate-300 text-sm max-w-md">
              Automated valuation pegs synced directly with active Sea 3 Cafe trading floors. Refreshed every 60 seconds.
            </p>
          </div>

          {/* Polished Glassmorphic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseFruits.map((fruit, idx) => (
              <div 
                key={fruit.id}
                onClick={() => {
                  soundFX.playPop();
                  onNavigate(fruit.targetTab);
                }}
                className={`bg-slate-900/80 border ${fruit.border} rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl relative cursor-pointer`}
                style={{ boxShadow: `${fruit.glow} 0px 10px 40px -10px` }}
              >
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-slate-800 bg-black">
                  <img 
                    alt={`${fruit.name} 3D`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={fruit.img}
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${fruit.badgeBg}`}>
                    {fruit.tierBadge}
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/90 font-mono text-[10px] text-cyan-300 border border-cyan-500/30">
                    {fruit.type}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors font-mono">
                    {fruit.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-400 mb-3">{fruit.sub}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/80 border border-slate-800">
                      <span className="font-mono text-xs text-slate-400">Value:</span>
                      <span className={`font-mono text-xs font-bold ${fruit.valColor}`}>{fruit.value}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono px-1">
                      <span className="text-slate-400">Demand:</span>
                      <span className="text-emerald-400 font-semibold">{fruit.demand}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-white transition-colors">
                  <span>Trade &amp; Value Specs</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. SOCIAL PROOF / TESTIMONIALS & STATS                       */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" id="community">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Bounty Hunters &amp; Grandmasters
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
              Trusted Across Every Sea
            </h2>
            <p className="text-slate-400 text-sm">
              See how high-elo players are scaling leaderboards and stockpiling mythics without paying a cent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Review 1 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center text-cyan-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  "Gained 10M bounty in 1 week. The Godhuman + Portal combo sequence is frame-perfect. You literally press the sequence and opponents can't even Ken-trick out of it."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono text-cyan-300 font-bold">
                  KX
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">KageX // 30M Bounty</div>
                  <div className="font-mono text-[11px] text-emerald-400">Third Sea Marine Leader</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-purple-500/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center text-purple-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  "Best trade scanner ever created. Saved me from trading my Kitsune for worthless hype items twice. Turned a 30M inventory into over 280M pure value in a month."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono text-purple-300 font-bold">
                  VR
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">VortexRider</div>
                  <div className="font-mono text-[11px] text-purple-300">Top Arbitrage Trader</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-center text-emerald-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  "The Leviathan radar pinged the Frozen Dimension gate opening within 10 seconds. Our 5-man crew got the Leviathan Heart on our very first run without waiting hours."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono text-emerald-400 font-bold">
                  SL
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">Solaris_Levi</div>
                  <div className="font-mono text-[11px] text-emerald-400">Cyborg V4 Max Mastery</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. FINAL HIGH-CONVERTING CALL TO ACTION BANNER                */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10" id="get-started">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/50 bg-gradient-to-br from-slate-900 via-[#0a1024] to-slate-950 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] text-center">
            
            {/* Laser Neon Top Accent */}
            <div className="absolute -top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            
            {/* Glowing Radial Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] pointer-events-none rounded-full"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-cyan-400" />
                JOIN THE GRANDMASTER PROTOCOL
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-400 tracking-tight font-mono">
                Ready to Rule the Third Sea?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                Join 142,000+ Blox Fruits grandmasters capitalizing on real-time neural trade predictions and unescapable combo trees. 100% free forever.
              </p>

              {/* CTA Action Cluster */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    soundFX.playSuccess();
                    onNavigate('calculator');
                  }}
                  className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:shadow-[0_0_60px_rgba(0,240,255,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-slate-950" />
                  <span>Launch Solas AI Free</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playPop();
                    onNavigate('sensei');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span>Consult Solas AI Sensei</span>
                </button>
              </div>

              {/* Trust Features */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  100% Free Forever
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  No Roblox Password Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Sub-15ms Global CDN Response
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 7. MINIMAL MARKETING FOOTER                                  */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#030509] border-t border-slate-800 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            
            {/* Brand & Description */}
            <div className="flex items-center gap-3">
              <img 
                alt="Solas AI Crest" 
                className="h-9 w-12 object-cover rounded-lg border border-cyan-500/40" 
                src={ASSETS.footerCrest}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-base text-cyan-300 font-bold tracking-wider font-mono">SOLAS AI PROTOCOL</span>
                <span className="text-[10px] font-mono text-slate-400">Blox Fruits Neural Companion &amp; Trade Engine</span>
              </div>
            </div>

            {/* Quick Nav Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <button onClick={() => onNavigate('calculator')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                Trade Calculator
              </button>
              <button onClick={() => onNavigate('database')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                Values Database
              </button>
              <button onClick={() => onNavigate('crafter')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                PvP Combos
              </button>
              <button onClick={() => onNavigate('progression')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                Sea Progression
              </button>
              <button onClick={() => onNavigate('sensei')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                Solas AI Sensei
              </button>
            </div>

            {/* System Telemetry Status */}
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00f985]"></span>
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2024 SOLAS AI. Free independent companion software. Not affiliated with Gamer Robot Inc. or Roblox Corporation.
            </div>
            <div className="font-mono text-[11px] text-slate-600">
              ENCRYPTED SECURE CHANNEL · TOKYO-EAST 14ms
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
