export interface EvolutionNode {
  id: string;
  stage: 'Base' | 'Awakened V1' | 'Ascended V2' | 'Celestial V3';
  name: string;
  badge: string;
  fragmentCost: number;
  masteryRequired: number;
  unlockedMove: string;
  passivePerk: string;
  statBonus: string;
  icon: string;
  description: string;
}

export interface FruitEvolutionTree {
  fruitId: string;
  fruitName: string;
  emoji: string;
  tier: 'Mythical' | 'Legendary' | 'Rare';
  element: string;
  quote: string;
  evolutionBranch: EvolutionNode[];
}

export const FRUIT_EVOLUTION_TREES: FruitEvolutionTree[] = [
  {
    fruitId: 'kitsune',
    fruitName: 'Kitsune Fruit',
    emoji: '🦊',
    tier: 'Mythical',
    element: 'Celestial Spirit Foxfire',
    quote: '"Nine tails ignite nine heavenly suns across the sea."',
    evolutionBranch: [
      {
        id: 'kit-base',
        stage: 'Base',
        name: 'Fox Spirit Unawakened',
        badge: 'Base Form',
        fragmentCost: 0,
        masteryRequired: 1,
        unlockedMove: '[Z] Fox Fire Disruption',
        passivePerk: 'Water Run Speed (+10%)',
        statBonus: '+0% Bonus Stats',
        icon: '🐾',
        description: 'Standard natural Fox Spirit incarnation with agile movement.'
      },
      {
        id: 'kit-v1',
        stage: 'Awakened V1',
        name: 'Three-Tailed Foxfire Awakening',
        badge: 'V1 Raid Tier',
        fragmentCost: 5000,
        masteryRequired: 200,
        unlockedMove: '[X] Scorching Spirit Slash V1',
        passivePerk: 'Spirit Orb Regen (+20% faster meter gain)',
        statBonus: '+15% Move Damage',
        icon: '🔥',
        description: 'Awakens 3 fiery spirit tails, infusing melee attacks with continuous blue burn.'
      },
      {
        id: 'kit-v2',
        stage: 'Ascended V2',
        name: 'Six-Tailed Astral Shifter',
        badge: 'V2 Master Tier',
        fragmentCost: 14500,
        masteryRequired: 400,
        unlockedMove: '[C] Celestial Roar & Fox Domain V2',
        passivePerk: 'Ken Haki 100% Dodge on Dash',
        statBonus: '+30% Damage & +25% Speed',
        icon: '⚡',
        description: 'Unlocks mid-air multidirectional spirit dashes and 6-tail orbital bombardment.'
      },
      {
        id: 'kit-v3',
        stage: 'Celestial V3',
        name: 'Nine-Sun Emperor: Chaos Kitsune V3',
        badge: 'V3 Apex Deity',
        fragmentCost: 35000,
        masteryRequired: 600,
        unlockedMove: '[V] 9-Sun Supernova Transformation V3',
        passivePerk: 'Immunity to Stuns + Infinite Water Sprint + 50% Ken Bypass',
        statBonus: '+50% All Stats & Domain Aura',
        icon: '👑',
        description: 'Transcends mortality into the Nine-Sun Fox Emperor. Turns the entire sea sky into blazing azure twilight.'
      }
    ]
  },
  {
    fruitId: 'dragon',
    fruitName: 'Dragon (East / West)',
    emoji: '🐉',
    tier: 'Mythical',
    element: 'Volcanic Draconic Plasma',
    quote: '"When the dragon ascends, emperors fall to their knees."',
    evolutionBranch: [
      {
        id: 'drag-base',
        stage: 'Base',
        name: 'Draconic Hatchling',
        badge: 'Base Form',
        fragmentCost: 0,
        masteryRequired: 1,
        unlockedMove: '[Z] Heatwave Beam',
        passivePerk: 'Draconic Scales (-10% Incoming Dmg)',
        statBonus: '+0% Bonus Stats',
        icon: '🐲',
        description: 'Base draconic logia form with explosive fire breath.'
      },
      {
        id: 'drag-v1',
        stage: 'Awakened V1',
        name: 'Wyvern Dragon Awakening',
        badge: 'V1 Raid Tier',
        fragmentCost: 6000,
        masteryRequired: 250,
        unlockedMove: '[X] Dragon Claw Tempest V1',
        passivePerk: 'Continuous Burn M1 Infusion',
        statBonus: '+18% Move Damage',
        icon: '🔥',
        description: 'Enlarges wings and talons for devastating aerial claw sweeps.'
      },
      {
        id: 'drag-v2',
        stage: 'Ascended V2',
        name: 'Eastern Sky Tyrant V2',
        badge: 'V2 Master Tier',
        fragmentCost: 16000,
        masteryRequired: 450,
        unlockedMove: '[C] Fire Shower Cataclysm V2',
        passivePerk: 'Permanent Flight Speed +40%',
        statBonus: '+35% Damage & 40% Armor',
        icon: '🌪️',
        description: 'Summons raging volcanic lightning storms across entire islands.'
      },
      {
        id: 'drag-v3',
        stage: 'Celestial V3',
        name: 'Primordial Dragon God V3 (Update 2026)',
        badge: 'V3 Apex Deity',
        fragmentCost: 40000,
        masteryRequired: 600,
        unlockedMove: '[V] Primordial Roar & Cosmic Cataclysm V3',
        passivePerk: 'Meteor Strike on every M1 + 60% Damage Reduction + True Ken Break',
        statBonus: '+65% All Stats & Colossal Reach',
        icon: '☄️',
        description: 'The definitive Mythical Dragon Rework V3. Crushes mountains and leaves scorched magma craters.'
      }
    ]
  },
  {
    fruitId: 'dough',
    fruitName: 'Dough Fruit (Mochi)',
    emoji: '🍩',
    tier: 'Mythical',
    element: 'Caramel Mirror Singularity',
    quote: '"I see every single future movement before you even blink."',
    evolutionBranch: [
      {
        id: 'dough-base',
        stage: 'Base',
        name: 'Mochi Dough Unawakened',
        badge: 'Base Form',
        fragmentCost: 0,
        masteryRequired: 1,
        unlockedMove: '[Z] Restless Dough Barrage',
        passivePerk: 'Physical M1 Immunity',
        statBonus: '+0% Bonus Stats',
        icon: '🌾',
        description: 'Unawakened sticky dough body with basic stretching punches.'
      },
      {
        id: 'dough-v1',
        stage: 'Awakened V1',
        name: 'Awakened Dough V1',
        badge: 'V1 Raid Tier',
        fragmentCost: 5000,
        masteryRequired: 200,
        unlockedMove: '[Z] Missile Jab Awakening',
        passivePerk: 'Ground Stickiness Stun',
        statBonus: '+15% Move Damage',
        icon: '🍩',
        description: 'Transforms fist into high-speed dough rockets that stick targets.'
      },
      {
        id: 'dough-v2',
        stage: 'Ascended V2',
        name: 'Awakened Dough V2 (Full Raid Awk)',
        badge: 'V2 Master Tier',
        fragmentCost: 18500,
        masteryRequired: 400,
        unlockedMove: '[V] Dough Empowerment & Piercing Clothesline V2',
        passivePerk: 'Auto Future Sight (3 Free Ken Dodges)',
        statBonus: '+35% Combo Lock Duration',
        icon: '🔱',
        description: 'Unlocks legendary Dough V2 one-shot combo strings and giant mochi roller.'
      },
      {
        id: 'dough-v3',
        stage: 'Celestial V3',
        name: 'Mochi Singularity Overlord V3',
        badge: 'V3 Apex Deity',
        fragmentCost: 32000,
        masteryRequired: 600,
        unlockedMove: '[V] Infinite Doughnut Domain & 1000-Anvil Rain V3',
        passivePerk: '100% Ken Break on All Skills + Mirror Reflection Counter',
        statBonus: '+55% Combo Damage & Zero Windup',
        icon: '👑',
        description: 'Commands thousands of floating candy mirrors that copy every attack simultaneously.'
      }
    ]
  },
  {
    fruitId: 'portal',
    fruitName: 'Portal Fruit (Warp)',
    emoji: '🌀',
    tier: 'Legendary',
    element: 'Quantum Rift Singularity',
    quote: '"Distance is an illusion in the multi-dimensional void."',
    evolutionBranch: [
      {
        id: 'portal-base',
        stage: 'Base',
        name: 'Dimensional Rift Unawakened',
        badge: 'Base Form',
        fragmentCost: 0,
        masteryRequired: 1,
        unlockedMove: '[Z] Portal Dash',
        passivePerk: 'Quick Flash Step Range (+30%)',
        statBonus: '+0% Bonus Stats',
        icon: '🚪',
        description: 'Opens simple spatial gateways for instantaneous short-range travel.'
      },
      {
        id: 'portal-v1',
        stage: 'Awakened V1',
        name: 'Quantum Warp Gateway V1',
        badge: 'V1 Raid Tier',
        fragmentCost: 4500,
        masteryRequired: 200,
        unlockedMove: '[X] Parallel World Singularity',
        passivePerk: 'Invulnerability Frames during Portal Jump (+0.5s)',
        statBonus: '+15% Warp Speed',
        icon: '⚡',
        description: 'Sucks opponents into a pocket dimension, disorienting their camera angle.'
      },
      {
        id: 'portal-v2',
        stage: 'Ascended V2',
        name: 'Dimensional Architect V2',
        badge: 'V2 Master Tier',
        fragmentCost: 14000,
        masteryRequired: 400,
        unlockedMove: '[C] Dimensional Rift Cage V2',
        passivePerk: 'Zero-Lag Map Waypoint Teleportation',
        statBonus: '+30% Sword & Melee Combo Velocity',
        icon: '🌌',
        description: 'Creates linked twin portals on battlefield for continuous loop combos.'
      },
      {
        id: 'portal-v3',
        stage: 'Celestial V3',
        name: 'Omnipresent Void King V3',
        badge: 'V3 Apex Deity',
        fragmentCost: 30000,
        masteryRequired: 600,
        unlockedMove: '[V] Dimension Zero: Event Horizon Cataclysm V3',
        passivePerk: 'Instant Map-Wide Striking + True Ken Bypass + Flash Step 0s CD',
        statBonus: '+50% All Speed & Unbreakable Combos',
        icon: '✨',
        description: 'Transports entire server battlefield into an anti-gravity quantum singularity.'
      }
    ]
  },
  {
    fruitId: 'buddha',
    fruitName: 'Buddha Fruit (Human: Buddha)',
    emoji: '🧘‍♂️',
    tier: 'Legendary',
    element: 'Golden Divine Radiance',
    quote: '"Unshakable as Mount Meru, radiant as thousand suns."',
    evolutionBranch: [
      {
        id: 'buddha-base',
        stage: 'Base',
        name: 'Golden Buddha Unawakened',
        badge: 'Base Form',
        fragmentCost: 0,
        masteryRequired: 1,
        unlockedMove: '[Z] Transform: Golden Colossus',
        passivePerk: '+30% Damage Reduction',
        statBonus: '+0% Bonus Stats',
        icon: '✨',
        description: 'Transforms player into a giant golden deity with extended melee hitbox.'
      },
      {
        id: 'buddha-v1',
        stage: 'Awakened V1',
        name: 'Shift Awakening V1',
        badge: 'V1 Raid Tier',
        fragmentCost: 4000,
        masteryRequired: 200,
        unlockedMove: '[Z] Shift: Awakened Colossus (+50% Dmg Red)',
        passivePerk: 'Water Walk Immunity in Giant Form',
        statBonus: '+20% Sword & Melee Reach',
        icon: '🛡️',
        description: 'Grants legendary 50% damage reduction and ability to walk on water seamlessly.'
      },
      {
        id: 'buddha-v2',
        stage: 'Ascended V2',
        name: 'Asura Divine Titan V2',
        badge: 'V2 Master Tier',
        fragmentCost: 14000,
        masteryRequired: 400,
        unlockedMove: '[X] Heavenly Golden Shockwave V2',
        passivePerk: '360° M1 Cleave Range + Raid Mob Repel',
        statBonus: '+40% Reach & 60% Damage Resistance',
        icon: '💥',
        description: 'Sprouts 6 golden arms that strike all surrounding mobs simultaneously.'
      },
      {
        id: 'buddha-v3',
        stage: 'Celestial V3',
        name: 'Nirvana Sovereign Colossus V3',
        badge: 'V3 Apex Deity',
        fragmentCost: 30000,
        masteryRequired: 600,
        unlockedMove: '[V] Nirvana Sun Domain: 100-Meter Colossus V3',
        passivePerk: '75% Damage Reduction + Permanent Water Walk + Instant M1 Shockwaves',
        statBonus: '+70% Defense & Unbreakable Hyperarmor',
        icon: '👑',
        description: 'Grows to 100 meters tall with golden obsidian runes. The ultimate raid clearing titan.'
      }
    ]
  }
];
