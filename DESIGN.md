---
name: Blox Fruits Grandmaster HUD
colors:
  surface: '#11131a'
  surface-dim: '#11131a'
  surface-bright: '#373941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b22'
  surface-container: '#1d1f26'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#daffde'
  on-tertiary: '#003919'
  tertiary-container: '#00f985'
  on-tertiary-container: '#006d37'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#60ff99'
  tertiary-fixed-dim: '#00e479'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#11131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 15px
    letterSpacing: 0.02em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  telemetry-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
  telemetry-micro:
    fontFamily: JetBrains Mono
    fontSize: 8.5px
    fontWeight: '700'
    lineHeight: 10px
    letterSpacing: 0.1em
spacing:
  hud-gutter: 0.75rem
  hud-margin: 1rem
  module-gap: 0.5rem
  compact-pad: 0.25rem
  dock-pad: 1.5rem
  col-gap: 0.5rem
---

## Brand & Style

The brand personality is high-octane, computational, lethal, and uncompromisingly tactical. Engineered for top-tier competitive Blox Fruits combatants, the interface operates as a high-density, real-time telemetry command deck. The emotional impact is cold tactical dominance, extreme precision, and cognitive immersion inside an ultra-responsive cybernetic overlay.

The visual direction merges **Cyberpunk High-Density HUD** with **Dark Glassmorphism** and razor-sharp architectural UI. Data is prioritized with zero decorative fluff: scanning rings, coordinate tags, sub-millisecond weapon cooling states, and live bounty metrics populate the viewport. The aesthetic features crystalline semi-transparent panels layered over deep abyss backdrops, sliced chamfer corners, scanlines, and laser-guided vector lines pulsing with electric cyan, plasma purple, and overdrive emerald indicators.

## Colors

The palette is tuned specifically for deep void legibility, OLED black depths, and high-frequency luminescent contrast:

- **Dominant Void (`neutral`):** `#05070D` establishes the foundation. Secondary containers step down into tactical darks: `#090D1A` for low-tier surfaces and `rgba(10, 15, 28, 0.75)` for active frosted HUD glass plates.
- **Primary Energy (`primary`):** `#00F0FF` (Electric Hyper-Cyan). Used for prime targeting crosshairs, weapon mastery tracking, critical system borders, and active command focal points.
- **Secondary Plasma (`secondary`):** `#8B5CF6` / `#A855F7` (Vivid Void Purple). Anchors fruit awakening meters, transcendent abilities, rarity indicators, and secondary contextual triggers.
- **Overdrive Indicator (`tertiary`):** `#00FF88` (Neon Emerald / Kinetic Mint). Reserved strictly for winning delta telemetry, maxed stat states, health thresholds, active fruit mastery buffs, and micro-latency confirmations.
- **Warning & Hazard:** `#FF0055` (Laser Crimson). Alerts players to incoming bounty hunters, PvP danger zones, depleted stamina, and lethal strike states.
- **Border Gradients:** 1px stroke running an angled gradient `linear-gradient(135deg, rgba(0,240,255,0.4) 0%, rgba(139,92,246,0.15) 50%, rgba(0,255,136,0.05) 100%)`.

## Typography

The typography architecture uses a tripartite layout hierarchy:

1. **Space Grotesk (Display & Headlines):** Imparts brutal, geometric precision with engineered cuts that command attention for bounty titles, critical fruit status, and combat module headers.
2. **Geist (Body UI):** Provides low-noise, clinical legibility for ability logs, server status, tactical combat logs, and system explanations.
3. **JetBrains Mono (Telemetry & Badges):** The core engine font. Formatted in uppercase tabular numbers, it handles stat deltas, millisecond cooldowns, weapon combo matrices, coordinates (`X: 1042.8 | Y: -84.2`), and HUD badges.

Letters in telemetry modules use wide character tracking (`0.05em` to `0.1em`) with full uppercase formatting to mimic military heads-up navigation displays.

## Layout & Spacing

The layout philosophy follows a high-density, multi-panel **Fluid Tactical Grid**. Every pixel is harnessed: dead margins are minimized to retain maximum situational awareness.

- **Grid Architecture:** 16-column flexible layout desktop grid with a persistent dual-flank docking layout (Left Flank: Stat matrices & character builds; Right Flank: Real-time PvP telemetry & DPS graphing; Center Viewport: Targeting overlay & Fruit Mastery HUD).
- **Scanline & Structural Overlays:** Surfaces sit above a persistent CSS scanline overlay (`repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.015) 3px)`).
- **Responsive Adaptation:**
  - **Desktop (1440px+):** Full 16-column high-density command mode with persistent flanking docks.
  - **Tablet (768px - 1439px):** Refactor to 12 columns. Flanking modules dock into collapsible sliding glass trays.
  - **Mobile (< 768px):** Refactor to 4-column compact stack. Non-critical telemetry collapses into compact pill-shaped ticker ribbons along the top and bottom edges.

## Elevation & Depth

Depth is established via photonic layering, translucent light occlusion, and luminous vector glows rather than soft organic drop shadows:

- **Level 0 (Abyss):** Pure `#05070D` base plate with subtle 24px isometric grid lines stroked in `rgba(0, 240, 255, 0.03)`.
- **Level 1 (Dock & Deck Surfaces):** `rgba(10, 15, 28, 0.75)` combined with `backdrop-filter: blur(16px) saturate(180%)`. Outlined with razor-thin 1px `rgba(0, 240, 255, 0.15)`.
- **Level 2 (Active Combat Cards & Modals):** `rgba(14, 21, 38, 0.85)` with cyan-to-violet corner edge highlights and ambient luminescence: `box-shadow: 0 0 25px -5px rgba(0, 240, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)`.
- **Level 3 (Overdrive Popouts & Active Triggers):** `rgba(19, 29, 53, 0.95)` framed in pure neon stroke with high-frequency halo glow: `box-shadow: 0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(139, 92, 246, 0.2)`.

## Shapes

The shape profile is **Zero-Radius Sharp (`roundedness: 0`)** with hard cybernetic chamfers. 

- **Edge Treatments:** Surfaces feature 45-degree corner clips (`clip-path: polygon(...)`) ranging from 4px to 10px depending on module hierarchy. Rectangles stay unapologetically sharp, emphasizing military engineering and digital weaponry.
- **Pill Exceptions:** High-density telemetry status markers and micro indicators utilize ultra-tight rounded pill shapes (`border-radius: 9999px`) to create an immediate visual separation between structural layout framing and dynamic, fast-ticking data variables.

## Components

### Tactical Action Buttons
- **Primary Cyber Matrix Button:** 0px radius or chamfered bottom-right corner. Background is a vibrant gradient of `rgba(0, 240, 255, 0.15)` to `rgba(139, 92, 246, 0.2)` with a 1px border of `#00F0FF`. Monospace uppercase font with `letter-spacing: 0.1em`. Hover triggers rapid sweep glow and inverted neon fill (`#00F0FF` background with `#05070D` text).
- **Secondary Ghost Action Button:** Transparent background, `1px solid rgba(139, 92, 246, 0.4)`, muted violet typography shifting to `#A855F7` with subtle neon box bloom on hover.

### HUD Telemetry Badges & Chips
- **Bounty & Win-Rate Pills:** Ultra-compact badges with `telemetry-xs` typography. Left segment displays a static indicator code (e.g., `SYS.DPS`) with darker background; right segment displays live glowing numeric values in `#00FF88` or `#00F0FF`.
- **Fruit State Tags:** Chamfered tags with neon border indicators (`AWAKENED · V2`) showing active aura levels.

### Combat Telemetry Lists
- Fixed-height rows separated by hairline borders (`1px solid rgba(0, 240, 255, 0.08)`).
- Alternate row background toggles between pure transparent and `rgba(10, 15, 28, 0.3)`. Monospaced numerical values right-aligned with tabular figures for instant delta comparison.

### Form Inputs & Terminal Fields
- Dark crystalline input plates (`rgba(7, 11, 20, 0.9)`) with recessed top border shadow and bottom 1px underline in `#00F0FF`. Cursor renders as an electric cyan block cursor (`width: 8px; height: 14px`). Prefix indicators (`[CMD_IN]>`) rendered in JetBrains Mono.

### HUD Data Cards
- Multi-tiered panels with top header ribbon displaying system coordinates, diagnostic glyphs, and module shutdown crosshairs. Corners feature 1px L-shaped reticle brackets (`border-top` and `border-left` active cyan accents).
- Scanline texture overlay applied on background layer.

### Real-Time Combat Health & Energy Gauges
- Segmented linear meters built of discrete slanted vector blocks. Depleting values flash crimson before extinguishing; critical energy reserves pulse via CSS keyframe glow along the leading edge.