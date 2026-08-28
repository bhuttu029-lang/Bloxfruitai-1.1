export interface MutationMove {
  key: 'Z' | 'X' | 'C' | 'V' | 'F';
  name: string;
  description: string;
  damage: number; // Base test damage (e.g. 3200 - 8500)
  cooldown: number; // in seconds
  kenBreak: 'True Break' | 'Bypasses Ken' | 'Ken Drain' | 'None';
  hitboxType: 'Single Target' | 'Cone Wave' | 'Giant AoE' | 'Piercing Beam' | 'Domain Arena' | 'Dash Grab';
  masteryReq: number;
  iconEmoji: string;
}

export interface MutationAuraTheme {
  id: string;
  name: string;
  colorHex: string;
  gradientClass: string;
  glowClass: string;
  particleType: string;
}

export interface MutationPassiveTrait {
  id: string;
  name: string;
  description: string;
  icon: string;
  buffType: 'Defense' | 'Mobility' | 'Offense' | 'Utility';
}

export interface PresetMutation {
  id: string;
  name: string;
  title: string;
  fusionType: 'hybrid' | 'awakening';
  fruit1Name: string;
  fruit1Emoji: string;
  fruit2Name?: string;
  fruit2Emoji?: string;
  element: string;
  lore: string;
  auraTheme: MutationAuraTheme;
  passives: MutationPassiveTrait[];
  moves: MutationMove[];
  stats: {
    damage: number; // 1-100
    range: number;
    mobility: number;
    combo: number;
    raidUtility: number;
  };
  quote: string;
}

export const AURA_THEMES: MutationAuraTheme[] = [
  {
    id: 'azure-foxfire',
    name: 'Azure Foxfire Ember',
    colorHex: '#38bdf8',
    gradientClass: 'from-cyan-400 via-sky-500 to-indigo-600',
    glowClass: 'shadow-cyan-500/50 border-cyan-400',
    particleType: 'Blue Spirit Flames'
  },
  {
    id: 'solar-blaze',
    name: 'Solar Celestial Sunfire',
    colorHex: '#f59e0b',
    gradientClass: 'from-amber-400 via-orange-500 to-red-600',
    glowClass: 'shadow-amber-500/50 border-amber-400',
    particleType: 'Solar Plasma Sparks'
  },
  {
    id: 'void-singularity',
    name: 'Void Singularity & Cosmic Dark',
    colorHex: '#8b5cf6',
    gradientClass: 'from-purple-500 via-violet-600 to-slate-950',
    glowClass: 'shadow-purple-500/50 border-purple-400',
    particleType: 'Dark Matter Spirals'
  },
  {
    id: 'molten-obsidian',
    name: 'Molten Obsidian Magma',
    colorHex: '#ef4444',
    gradientClass: 'from-red-600 via-orange-600 to-stone-900',
    glowClass: 'shadow-red-500/50 border-red-500',
    particleType: 'Volcanic Lava Eruptions'
  },
  {
    id: 'cyber-lightning',
    name: 'Quantum Cyber Electro',
    colorHex: '#06b6d4',
    gradientClass: 'from-cyan-300 via-blue-500 to-teal-400',
    glowClass: 'shadow-cyan-400/50 border-cyan-300',
    particleType: 'High-Voltage Electric Arcs'
  },
  {
    id: 'golden-divinity',
    name: 'Golden Buddha Radiance',
    colorHex: '#eab308',
    gradientClass: 'from-yellow-300 via-amber-400 to-yellow-600',
    glowClass: 'shadow-yellow-400/50 border-yellow-300',
    particleType: 'Divine Golden Runes'
  },
  {
    id: 'cryo-inferno',
    name: 'Glacial Cryo-Inferno',
    colorHex: '#67e8f9',
    gradientClass: 'from-teal-300 via-cyan-500 to-blue-700',
    glowClass: 'shadow-teal-400/50 border-teal-300',
    particleType: 'Frozen Shards & Frost Embers'
  },
  {
    id: 'toxic-acid',
    name: 'Corrosive Acid Venom',
    colorHex: '#a855f7',
    gradientClass: 'from-lime-400 via-emerald-500 to-purple-800',
    glowClass: 'shadow-emerald-500/50 border-lime-400',
    particleType: 'Bubbling Toxic Fumes'
  }
];

export const PASSIVE_TRAITS_LIST: MutationPassiveTrait[] = [
  {
    id: 'water-walking',
    name: 'Sea Sovereign (Water Immunity)',
    description: 'Immune to sea water damage and gains +25% swimming speed even without Shark Race.',
    icon: '🌊',
    buffType: 'Utility'
  },
  {
    id: 'm1-infusion',
    name: 'Elemental M1 Sword Infusion',
    description: 'Normal sword and melee attacks inflict hybrid burn & stun status effects.',
    icon: '⚔️',
    buffType: 'Offense'
  },
  {
    id: 'ken-bypass-passive',
    name: 'True Sight Ken-Bypass',
    description: 'All basic attacks ignore opponent Observation Haki dodges by 50%.',
    icon: '👁️',
    buffType: 'Offense'
  },
  {
    id: 'damage-reduction',
    name: 'Colossal Ironhide (-35% Damage)',
    description: 'Incoming damage from all sources reduced by 35% when transformed.',
    icon: '🛡️',
    buffType: 'Defense'
  },
  {
    id: 'rift-flash-step',
    name: 'Dimensional Phase Dash',
    description: 'Flash Step has zero cooldown and leaves a damaging dimensional singularity behind.',
    icon: '⚡',
    buffType: 'Mobility'
  },
  {
    id: 'auto-regen',
    name: 'Spirit Flame Regeneration',
    description: 'Regenerates 4% maximum Health and Energy every 2 seconds during active combat.',
    icon: '❤️‍🔥',
    buffType: 'Defense'
  },
  {
    id: 'tail-burst',
    name: 'Nine-Tail Wrath Surge',
    description: 'Every 5th hit triggers an automatic 360-degree shockwave knocking back all enemies.',
    icon: '🦊',
    buffType: 'Offense'
  },
  {
    id: 'raid-clearing-aura',
    name: 'Cataclysmic Raid Aura',
    description: 'Deals 5,000 continuous tick damage to all NPC raid mobs within 30 meters.',
    icon: '🌀',
    buffType: 'Utility'
  }
];

export const PRESET_MUTATIONS: PresetMutation[] = [
  {
    id: 'solar-fox-emperor',
    name: 'Solar Fox Emperor',
    title: 'Mythical Beast Fusion (Kitsune + Dragon)',
    fusionType: 'hybrid',
    fruit1Name: 'Kitsune',
    fruit1Emoji: '🦊',
    fruit2Name: 'Dragon (East)',
    fruit2Emoji: '🐉',
    element: 'Celestial Solar Foxfire',
    lore: 'Forged at the apex of Sea 3 when an ancient 9-tailed fox consumed the scorching heart of the Eastern Dragon. Commands both hypersonic fox agility and catastrophic draconic firestorms.',
    quote: '"The heavens burn beneath nine burning suns."',
    auraTheme: AURA_THEMES[1], // Solar Blaze
    passives: [PASSIVE_TRAITS_LIST[6], PASSIVE_TRAITS_LIST[0]], // Tail burst + Water immunity
    moves: [
      {
        key: 'Z',
        name: 'Solar Tail Comet',
        description: 'Fires 9 spiraling solar orbs that pierce obstacles and ignite targets in azure sunfire.',
        damage: 4200,
        cooldown: 4.5,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Piercing Beam',
        masteryReq: 1,
        iconEmoji: '☄️'
      },
      {
        key: 'X',
        name: 'Draconic Fox Pounce',
        description: 'Teleports forward at light-speed, slashing in a 360° circle with flaming dragon claws.',
        damage: 4800,
        cooldown: 6.0,
        kenBreak: 'True Break',
        hitboxType: 'Cone Wave',
        masteryReq: 50,
        iconEmoji: '🐾'
      },
      {
        key: 'C',
        name: 'Celestial Dragon Roar',
        description: 'Unleashes a deafening draconic howl that drags all nearby players into a fiery vortex.',
        damage: 5600,
        cooldown: 9.0,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 100,
        iconEmoji: '🐲'
      },
      {
        key: 'V',
        name: 'Transformation: 9-Sun Chimera',
        description: 'Transforms into a towering 9-Tailed Sun Dragon with 40% damage resistance and flight.',
        damage: 7500,
        cooldown: 25.0,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Domain Arena',
        masteryReq: 200,
        iconEmoji: '👑'
      },
      {
        key: 'F',
        name: 'Solar Astral Soar',
        description: 'Hypersonic flight leaving an infernal trail that damages anyone foolish enough to chase.',
        damage: 2100,
        cooldown: 3.0,
        kenBreak: 'None',
        hitboxType: 'Dash Grab',
        masteryReq: 1,
        iconEmoji: '🔥'
      }
    ],
    stats: {
      damage: 98,
      range: 92,
      mobility: 96,
      combo: 94,
      raidUtility: 90
    }
  },
  {
    id: 'eclipse-phantom',
    name: 'Eclipse Singularity Phantom',
    title: 'Elemental Parity Fusion (Dark + Light)',
    fusionType: 'hybrid',
    fruit1Name: 'Dark',
    fruit1Emoji: '🌑',
    fruit2Name: 'Light',
    fruit2Emoji: '✨',
    element: 'Photon Void Singularity',
    lore: 'The ultimate synthesis of absolute illumination and boundless event horizons. Bends time, light, and gravity to trap opponents in inescapable photon prisons.',
    quote: '"Where all light dies, a new universe is born."',
    auraTheme: AURA_THEMES[2], // Void Singularity
    passives: [PASSIVE_TRAITS_LIST[4], PASSIVE_TRAITS_LIST[2]], // Rift Flash Step + Ken Bypass
    moves: [
      {
        key: 'Z',
        name: 'Photon Black Hole',
        description: 'Summons an event horizon that sucks enemies in and bombards them with laser shards.',
        damage: 4100,
        cooldown: 5.0,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 1,
        iconEmoji: '🕳️'
      },
      {
        key: 'X',
        name: 'Light-Speed Eclipse Slashes',
        description: 'Flashes through opponents 7 times in 0.4 seconds with twin blades of pure dark matter.',
        damage: 4950,
        cooldown: 7.0,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Dash Grab',
        masteryReq: 50,
        iconEmoji: '⚔️'
      },
      {
        key: 'C',
        name: 'Event Horizon Stun',
        description: 'Freezes target player in a localized time dilation field for 2.2 seconds.',
        damage: 4300,
        cooldown: 8.5,
        kenBreak: 'True Break',
        hitboxType: 'Single Target',
        masteryReq: 125,
        iconEmoji: '⏳'
      },
      {
        key: 'V',
        name: 'Supernova Collapse',
        description: 'Creates a cataclysmic singularity that detonates the entire battlefield in pure white-violet fire.',
        damage: 8200,
        cooldown: 22.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 250,
        iconEmoji: '💥'
      },
      {
        key: 'F',
        name: 'Light-Speed Warp Shift',
        description: 'Instantaneous teleportation across up to 300 meters with zero travel lag.',
        damage: 0,
        cooldown: 2.0,
        kenBreak: 'None',
        hitboxType: 'Single Target',
        masteryReq: 1,
        iconEmoji: '💫'
      }
    ],
    stats: {
      damage: 94,
      range: 96,
      mobility: 100,
      combo: 98,
      raidUtility: 88
    }
  },
  {
    id: 'volcanic-titan',
    name: 'Volcanic Colossus Titan',
    title: 'Gargantuan DPS Fusion (Buddha + Magma)',
    fusionType: 'hybrid',
    fruit1Name: 'Buddha',
    fruit1Emoji: '🧘‍♂️',
    fruit2Name: 'Magma',
    fruit2Emoji: '🌋',
    element: 'Molten Obsidian Divinity',
    lore: 'Combining the boundless colossal stature of Golden Buddha with the terrifying molten magma core. Each M1 strike shatters ground and spawns lava pools.',
    quote: '"Tread lightly, for the earth itself answers my call."',
    auraTheme: AURA_THEMES[3], // Molten Obsidian
    passives: [PASSIVE_TRAITS_LIST[3], PASSIVE_TRAITS_LIST[7]], // -35% damage + Raid clearing aura
    moves: [
      {
        key: 'Z',
        name: 'Tectonic Molten Fist',
        description: 'A massive 20-meter golden magma fist slams the ground, launching geysers of lava.',
        damage: 4600,
        cooldown: 4.0,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 1,
        iconEmoji: '👊'
      },
      {
        key: 'X',
        name: 'Magmatic Shockwave',
        description: 'Claps giant hands together to produce a volcanic sonic wave that shatters all Ken shields.',
        damage: 4900,
        cooldown: 6.5,
        kenBreak: 'True Break',
        hitboxType: 'Cone Wave',
        masteryReq: 50,
        iconEmoji: '🌋'
      },
      {
        key: 'C',
        name: 'Lava Hound Colossus',
        description: 'Fires three gargantuan molten magma beasts that track enemies and leave burning lava puddles.',
        damage: 5800,
        cooldown: 8.0,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Piercing Beam',
        masteryReq: 100,
        iconEmoji: '🐕'
      },
      {
        key: 'V',
        name: 'Awakened Volcanic Sovereign',
        description: 'Grows to 4x normal size coated in golden obsidian armor. +60% Damage resistance, extended melee reach.',
        damage: 6500,
        cooldown: 18.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 150,
        iconEmoji: '🗿'
      },
      {
        key: 'F',
        name: 'Meteor Leap & Crater',
        description: 'Leaps high into the sky and crashes down like a meteor, dealing massive landing AoE damage.',
        damage: 3800,
        cooldown: 4.5,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 1,
        iconEmoji: '☄️'
      }
    ],
    stats: {
      damage: 100,
      range: 82,
      mobility: 74,
      combo: 86,
      raidUtility: 100
    }
  },
  {
    id: 'quantum-thunder-chimera',
    name: 'Quantum Warp Thunder',
    title: 'High-Velocity Stun Fusion (Portal + Rumble)',
    fusionType: 'hybrid',
    fruit1Name: 'Portal',
    fruit1Emoji: '🌀',
    fruit2Name: 'Rumble',
    fruit2Emoji: '⚡',
    element: 'High-Voltage Quantum Rift',
    lore: 'Infuses dimensional rift gateways with 500-million volt thunderbolts. Allows the user to rip open lightning portals that shock all entities across entire sea maps.',
    quote: '"You cannot run from that which strikes everywhere at once."',
    auraTheme: AURA_THEMES[4], // Cyber Lightning
    passives: [PASSIVE_TRAITS_LIST[4], PASSIVE_TRAITS_LIST[1]], // Rift dash + M1 sword infusion
    moves: [
      {
        key: 'Z',
        name: 'Rift Lightning Javelin',
        description: 'Throws an electric javelin into a micro-portal, striking the target instantly from behind.',
        damage: 3900,
        cooldown: 4.0,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Piercing Beam',
        masteryReq: 1,
        iconEmoji: '⚡'
      },
      {
        key: 'X',
        name: 'Parallel Thunder Prison',
        description: 'Opens 4 dimensional gates around the opponent, electrocuting them for 3.0s continuous stun.',
        damage: 4800,
        cooldown: 7.0,
        kenBreak: 'True Break',
        hitboxType: 'Single Target',
        masteryReq: 60,
        iconEmoji: '⛩️'
      },
      {
        key: 'C',
        name: 'Quantum Sky Dragon',
        description: 'Summons a gigantic thunder dragon bursting out of a massive sky portal.',
        damage: 5700,
        cooldown: 9.5,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 120,
        iconEmoji: '🐉'
      },
      {
        key: 'V',
        name: 'Dimension Zero: Overcharge',
        description: 'Transports everyone in a 100m radius into an electrified pocket dimension with non-stop lightning strikes.',
        damage: 7900,
        cooldown: 24.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 220,
        iconEmoji: '🌌'
      },
      {
        key: 'F',
        name: 'Sub-Atomic Teleportation',
        description: 'Instant map-wide waypoint travel with an electric explosion on departure and arrival.',
        damage: 2500,
        cooldown: 3.5,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Giant AoE',
        masteryReq: 1,
        iconEmoji: '⚡'
      }
    ],
    stats: {
      damage: 92,
      range: 98,
      mobility: 100,
      combo: 100,
      raidUtility: 85
    }
  },
  {
    id: 'dough-v3-overlord',
    name: 'Dough V3: Pastry Overlord',
    title: 'Custom Awakening V3 (Dough Awk)',
    fusionType: 'awakening',
    fruit1Name: 'Dough',
    fruit1Emoji: '🍩',
    element: 'Mirror Mochi Singularity',
    lore: 'The forbidden Tier-3 Awakening of Dough. Infuses the user with ultimate future-sight observation and razor-sharp candied spikes capable of shredding entire fleets.',
    quote: '"Every move you think of, I have already countered."',
    auraTheme: AURA_THEMES[0], // Azure Foxfire
    passives: [PASSIVE_TRAITS_LIST[2], PASSIVE_TRAITS_LIST[1]], // Ken bypass + M1 infusion
    moves: [
      {
        key: 'Z',
        name: 'Missile Barrage V3',
        description: 'Sprouts 16 doughnut portals firing candied fist rockets at 100 rounds per second.',
        damage: 4400,
        cooldown: 4.5,
        kenBreak: 'True Break',
        hitboxType: 'Cone Wave',
        masteryReq: 1,
        iconEmoji: '🍩'
      },
      {
        key: 'X',
        name: 'Piercing Clothesline V3',
        description: 'Stretches arm into an unstoppable trident spike that drags targets across 80 meters.',
        damage: 4900,
        cooldown: 6.0,
        kenBreak: 'True Break',
        hitboxType: 'Dash Grab',
        masteryReq: 75,
        iconEmoji: '🔱'
      },
      {
        key: 'C',
        name: 'Caramel Carved Anvil',
        description: 'Drops an enormous 100-ton hardened caramel anvil from the heavens, crushing opponents.',
        damage: 5500,
        cooldown: 8.5,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Giant AoE',
        masteryReq: 150,
        iconEmoji: '🔨'
      },
      {
        key: 'V',
        name: 'Infinite Doughnut Domain',
        description: 'Creates a domain of floating mochi arms that mimic every punch you throw with 3x damage multiplier.',
        damage: 8100,
        cooldown: 20.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 250,
        iconEmoji: '✨'
      },
      {
        key: 'F',
        name: 'Glazed Roller Rampage',
        description: 'Transforms into a spiked glazed wheel that flattens enemies with continuous 400 DPS tick damage.',
        damage: 2800,
        cooldown: 3.0,
        kenBreak: 'None',
        hitboxType: 'Cone Wave',
        masteryReq: 1,
        iconEmoji: '🍩'
      }
    ],
    stats: {
      damage: 96,
      range: 88,
      mobility: 90,
      combo: 100,
      raidUtility: 92
    }
  },
  {
    id: 'cryo-phoenix-emperor',
    name: 'Glacial Phoenix Sovereign',
    title: 'Immortal Cryo Rebirth Fusion (Blizzard + Phoenix)',
    fusionType: 'hybrid',
    fruit1Name: 'Blizzard',
    fruit1Emoji: '❄️',
    fruit2Name: 'Phoenix',
    fruit2Emoji: '🔥',
    element: 'Sub-Zero Blue Frostfire',
    lore: 'An immortal avian deity forged in absolute zero blizzards. Possesses instant healing flames that simultaneously freeze opponents solid upon contact.',
    quote: '"From frozen ashes we rise, colder and eternal."',
    auraTheme: AURA_THEMES[6], // Cryo Inferno
    passives: [PASSIVE_TRAITS_LIST[5], PASSIVE_TRAITS_LIST[0]], // Auto regen + Water walking
    moves: [
      {
        key: 'Z',
        name: 'Cryo-Flame Feather Barrage',
        description: 'Fires 20 sharp azure frost feathers that slow opponent movement by 60%.',
        damage: 4300,
        cooldown: 4.0,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Piercing Beam',
        masteryReq: 1,
        iconEmoji: '🪶'
      },
      {
        key: 'X',
        name: 'Glacial Rebirth Dive',
        description: 'Dives headfirst into the ground, creating a sub-zero vortex that heals allies and freezes foes.',
        damage: 4700,
        cooldown: 6.5,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 60,
        iconEmoji: '🦅'
      },
      {
        key: 'C',
        name: 'Frostbite Tempest Roar',
        description: 'Summons a Category 5 freezing tornado infusing targets with cryogenic hypothermia.',
        damage: 5400,
        cooldown: 8.5,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 120,
        iconEmoji: '🌪️'
      },
      {
        key: 'V',
        name: 'Celestial Cryo-Phoenix Transformation',
        description: 'Ascends into a gigantic 40-meter Frostfire Phoenix with unlimited healing aura and aerial speed.',
        damage: 7800,
        cooldown: 20.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 220,
        iconEmoji: '👑'
      },
      {
        key: 'F',
        name: 'Absolute Zero Astral Flight',
        description: 'Glides across the sky leaving a solid frozen trail that players can stand or run upon.',
        damage: 2200,
        cooldown: 2.5,
        kenBreak: 'None',
        hitboxType: 'Dash Grab',
        masteryReq: 1,
        iconEmoji: '❄️'
      }
    ],
    stats: {
      damage: 92,
      range: 95,
      mobility: 98,
      combo: 90,
      raidUtility: 100
    }
  },
  {
    id: 'phantom-shadow-leopard',
    name: 'Phantom Shadow Apex',
    title: 'Hypersonic Stealth Fusion (Leopard + Shadow)',
    fusionType: 'hybrid',
    fruit1Name: 'Leopard',
    fruit1Emoji: '🐆',
    fruit2Name: 'Shadow',
    fruit2Emoji: '👤',
    element: 'Umbral Predatory Void',
    lore: 'The forbidden predator that stalks within the darkness between dimensions. Moves faster than sound and consumes enemy energy meters with each claw swipe.',
    quote: '"You will never see the claws that end you."',
    auraTheme: AURA_THEMES[2], // Void Singularity
    passives: [PASSIVE_TRAITS_LIST[4], PASSIVE_TRAITS_LIST[2]], // Rift Flash Step + Ken Bypass
    moves: [
      {
        key: 'Z',
        name: 'Umbral Pounce Slashes',
        description: 'Disappears into shadows and slashes 6 times behind opponent back at light speed.',
        damage: 4600,
        cooldown: 4.5,
        kenBreak: 'True Break',
        hitboxType: 'Dash Grab',
        masteryReq: 1,
        iconEmoji: '🐾'
      },
      {
        key: 'X',
        name: 'Shadow Corvus Howl',
        description: 'Releases a terrifying pitch-black sonic screech that blinds all nearby players for 2.0s.',
        damage: 5100,
        cooldown: 6.5,
        kenBreak: 'Bypasses Ken',
        hitboxType: 'Cone Wave',
        masteryReq: 70,
        iconEmoji: '🌑'
      },
      {
        key: 'C',
        name: 'Nightmare Somersault',
        description: 'Flips high into the air coated in dark matter, slamming downward with shattering force.',
        damage: 5900,
        cooldown: 9.0,
        kenBreak: 'True Break',
        hitboxType: 'Giant AoE',
        masteryReq: 140,
        iconEmoji: '⚡'
      },
      {
        key: 'V',
        name: 'Beast of the Void: Leopard Sovereign',
        description: 'Transforms into an obsidian armored Shadow Leopard with +50% sprint and teleportation dashes.',
        damage: 8300,
        cooldown: 22.0,
        kenBreak: 'True Break',
        hitboxType: 'Domain Arena',
        masteryReq: 240,
        iconEmoji: '🐆'
      },
      {
        key: 'F',
        name: 'Umbral Dimension Leap',
        description: 'Teleports up to 150 meters through shadow rifts instantly with zero travel duration.',
        damage: 1800,
        cooldown: 2.0,
        kenBreak: 'None',
        hitboxType: 'Single Target',
        masteryReq: 1,
        iconEmoji: '👤'
      }
    ],
    stats: {
      damage: 98,
      range: 85,
      mobility: 100,
      combo: 98,
      raidUtility: 86
    }
  }
];

export interface MutationEvaluationResult {
  score: number; // 0-100
  tier: 'SSS+' | 'SSS' | 'SS+' | 'S+' | 'A' | 'B' | 'C' | 'D';
  tierLabel: string;
  fallChancePercent: number; // e.g. 0.04%
  fallChanceFormatted: string;
  instabilityRiskPercent: number; // e.g. 3.5%
  instabilityLabel: 'Harmonic Resonance' | 'Stable Synthesis' | 'Moderate Volatility' | 'High Instability' | 'Critical Decay Risk';
  dpsMultiplier: string;
  stunLockScore: number; // 1-10
  kenBreakPotential: '100% True Ken-Break' | '80% Hybrid Bypass' | '60% Ken Drain' | '30% Partial';
  elementalHarmonics: string;
  pvpVerdict: string;
  grindVerdict: string;
  fallSourceLore: string;
  aiCommentary: string;
  recommendedCombo: string;
}

/**
 * Universal AI Engine to Rate EVERY combination of fruit mutations
 * with calculated chance of falling/dropping, decay risk, and combat synergy.
 */
export function evaluateMutationCombination(
  fruit1: { id: string; name: string; rarity?: string; physicalValue?: number; pvpTier?: string; grindTier?: string; type?: string; category?: string },
  fruit2: { id: string; name: string; rarity?: string; physicalValue?: number; pvpTier?: string; grindTier?: string; type?: string; category?: string }
): MutationEvaluationResult {
  const f1Val = fruit1.physicalValue || 5000000;
  const f2Val = fruit2.physicalValue || 5000000;
  const combinedVal = f1Val + f2Val;

  const f1Rarity = (fruit1.rarity || 'Rare').toLowerCase();
  const f2Rarity = (fruit2.rarity || 'Rare').toLowerCase();

  const isBothMythical = f1Rarity.includes('mythic') && f2Rarity.includes('mythic');
  const isOneMythical = f1Rarity.includes('mythic') || f2Rarity.includes('mythic');
  const isBothLegendary = f1Rarity.includes('legend') && f2Rarity.includes('legend');

  // 1. Calculate Base Score (0-100)
  let baseScore = 50;
  if (isBothMythical) baseScore = 92;
  else if (isOneMythical && isBothLegendary) baseScore = 84;
  else if (isOneMythical) baseScore = 78;
  else if (isBothLegendary) baseScore = 74;
  else baseScore = 60;

  // Check synergy combos
  const f1Id = fruit1.id.toLowerCase();
  const f2Id = fruit2.id.toLowerCase();

  const isKitsuneDragon = (f1Id.includes('kitsune') && f2Id.includes('dragon')) || (f1Id.includes('dragon') && f2Id.includes('kitsune'));
  const isBuddhaPortal = (f1Id.includes('buddha') && f2Id.includes('portal')) || (f1Id.includes('portal') && f2Id.includes('buddha'));
  const isDoughLeopard = (f1Id.includes('dough') && f2Id.includes('leopard')) || (f1Id.includes('leopard') && f2Id.includes('dough'));
  const isVenomTrex = (f1Id.includes('venom') && f2Id.includes('rex')) || (f1Id.includes('rex') && f2Id.includes('venom'));
  const isBlizzardMagma = (f1Id.includes('blizzard') && f2Id.includes('magma')) || (f1Id.includes('magma') && f2Id.includes('blizzard'));
  const isSpiritShadow = (f1Id.includes('spirit') && f2Id.includes('shadow')) || (f1Id.includes('shadow') && f2Id.includes('spirit'));
  const isLightDark = (f1Id.includes('light') && f2Id.includes('dark')) || (f1Id.includes('dark') && f2Id.includes('light'));
  const isSoundMammoth = (f1Id.includes('sound') && f2Id.includes('mammoth')) || (f1Id.includes('mammoth') && f2Id.includes('sound'));

  let synergyBonus = 0;
  let opposingClash = false;

  if (isKitsuneDragon) synergyBonus = 8;
  else if (isBuddhaPortal) synergyBonus = 7;
  else if (isDoughLeopard) synergyBonus = 6;
  else if (isVenomTrex) synergyBonus = 5;
  else if (isSpiritShadow) synergyBonus = 5;
  else if (isSoundMammoth) synergyBonus = 4;
  else if (isBlizzardMagma || isLightDark) {
    synergyBonus = 3;
    opposingClash = true;
  }

  const score = Math.min(100, Math.max(35, baseScore + synergyBonus));

  // 2. Assign Tier
  let tier: 'SSS+' | 'SSS' | 'SS+' | 'S+' | 'A' | 'B' | 'C' | 'D' = 'A';
  let tierLabel = 'A (Standard Hybrid)';

  if (score >= 98) {
    tier = 'SSS+';
    tierLabel = 'SSS+ (Divine Primordial Ascendant)';
  } else if (score >= 92) {
    tier = 'SSS';
    tierLabel = 'SSS (Celestial Sovereign)';
  } else if (score >= 85) {
    tier = 'SS+';
    tierLabel = 'SS+ (Mythic Overlord)';
  } else if (score >= 78) {
    tier = 'S+';
    tierLabel = 'S+ (Apex Predator)';
  } else if (score >= 68) {
    tier = 'A';
    tierLabel = 'A (Potent Synergy)';
  } else if (score >= 55) {
    tier = 'B';
    tierLabel = 'B (Volatile Fusion)';
  } else {
    tier = 'C';
    tierLabel = 'C (High Decay Risk)';
  }

  // 3. Fall Chance Calculation (Mathematical rarity based on combined fruit value)
  // Higher combined value = lower drop chance
  let fallPct = 0.05;
  if (combinedVal > 1000000000) { // Over 1 Billion
    fallPct = parseFloat((0.02 + (Math.sin(combinedVal) + 1) * 0.015).toFixed(3));
  } else if (combinedVal > 400000000) { // 400M - 1B
    fallPct = parseFloat((0.08 + (combinedVal % 100) * 0.001).toFixed(3));
  } else if (combinedVal > 100000000) { // 100M - 400M
    fallPct = parseFloat((0.45 + (combinedVal % 50) * 0.005).toFixed(2));
  } else if (combinedVal > 30000000) { // 30M - 100M
    fallPct = parseFloat((1.8 + (combinedVal % 20) * 0.05).toFixed(2));
  } else {
    fallPct = parseFloat((6.5 + (combinedVal % 10) * 0.4).toFixed(1));
  }

  const fallChanceFormatted = `${fallPct}% Probability (${fallPct < 0.1 ? 'Ultra-Rare Celestial Fall' : fallPct < 1.0 ? 'Mythical Boss Drop' : 'Raid Catalyst Drop'})`;

  // 4. Instability & Decay Risk
  let instabilityRisk = 4.2;
  let instabilityLabel: 'Harmonic Resonance' | 'Stable Synthesis' | 'Moderate Volatility' | 'High Instability' | 'Critical Decay Risk' = 'Stable Synthesis';

  if (opposingClash) {
    instabilityRisk = 18.5;
    instabilityLabel = 'High Instability';
  } else if (isKitsuneDragon || isBuddhaPortal) {
    instabilityRisk = 0.9;
    instabilityLabel = 'Harmonic Resonance';
  } else if (isBothMythical) {
    instabilityRisk = 3.2;
    instabilityLabel = 'Stable Synthesis';
  } else if (score < 60) {
    instabilityRisk = 14.8;
    instabilityLabel = 'Moderate Volatility';
  }

  // 5. Combat Multipliers & Stun
  const dpsMultiplier = `${(1.2 + (score / 100) * 0.9).toFixed(2)}x Base Damage`;
  const stunLockScore = parseFloat((5.5 + (score / 100) * 4.4).toFixed(1));
  const kenBreakPotential = score >= 88 ? '100% True Ken-Break' : score >= 75 ? '80% Hybrid Bypass' : '60% Ken Drain';

  // 6. Lore-Based Fall Source
  let fallSourceLore = 'Obtainable via Sea 3 Raid Catalyst Fusion or Boss Raid Gauntlet.';
  if (isBothMythical) {
    fallSourceLore = '0.02% Fall Rate from Leviathan Heart Harpoon Extract in Sea Danger 6 during Full Moon, or synthesized in the Fusion Reactor with 1,500 Fragments.';
  } else if (isOneMythical) {
    fallSourceLore = '0.15% Fall Rate from Dough King / Cake Prince defeat or Tier 3 Raid Chests.';
  } else {
    fallSourceLore = '1.2% Drop Chance from Factory Raids, Pirate Raids, or Castle on the Sea Boss Invasions.';
  }

  // 7. Tactical AI Commentary
  let aiCommentary = `Synthesizing ${fruit1.name} with ${fruit2.name} yields an overall combat rating of ${score}/100. `;
  if (isKitsuneDragon) {
    aiCommentary += 'Combines Nine-Tailed celestial foxfire with Eastern Dragon scales for near-infinite hyper-armor and unmatched aerial dominance.';
  } else if (isBuddhaPortal) {
    aiCommentary += 'Massive 800% melee hitbox paired with instant dimensional rifts creates an insurmountable obstacle in both PvP arenas and raid gauntlets.';
  } else if (opposingClash) {
    aiCommentary += 'Opposing elemental polarities create high burst shockwaves but require careful timing to prevent energy backlash.';
  } else {
    aiCommentary += 'Balanced fusion linking high crowd-control stuns with continuous melee damage.';
  }

  const recommendedCombo = `[Z] ${fruit1.name.split(' ')[0]} Dash ➔ [X] ${fruit2.name.split(' ')[0]} Stun ➔ [C] Hybrid Vortex ➔ [V] Sovereign Transformation`;

  return {
    score,
    tier,
    tierLabel,
    fallChancePercent: fallPct,
    fallChanceFormatted,
    instabilityRiskPercent: instabilityRisk,
    instabilityLabel,
    dpsMultiplier,
    stunLockScore,
    kenBreakPotential,
    elementalHarmonics: `${fruit1.name} (${fruit1.type || fruit1.category || 'Elemental'}) + ${fruit2.name} (${fruit2.type || fruit2.category || 'Beast'})`,
    pvpVerdict: score >= 85 ? 'Meta SS+ One-Shot Inescapable' : 'Solid PvP Competitive',
    grindVerdict: score >= 80 ? 'God-Tier Fast Mob Clear' : 'Efficient PvE Farming',
    fallSourceLore,
    aiCommentary,
    recommendedCombo
  };
}

