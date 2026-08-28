export interface RaidBoss {
  id: string;
  name: string;
  title: string;
  sea: 'Sea 2' | 'Sea 3';
  health: number;
  maxHealth: number;
  attackPower: number;
  element: string;
  avatarEmoji: string;
  lore: string;
  enrageThreshold: number; // 0.5 = 50%
  phase2Name: string;
  attacks: {
    name: string;
    damage: number;
    kenBypass: boolean;
    description: string;
    icon: string;
  }[];
  rewards: {
    item: string;
    itemEmoji: string;
    dropChance: string;
    beli: number;
    fragments: number;
    masteryXp: number;
  };
}

export const RAID_BOSSES: RaidBoss[] = [
  {
    id: 'leviathan',
    name: 'Leviathan, The Frozen Abyss Lord',
    title: 'Mythic Sea 3 Danger Level 6 Calamity',
    sea: 'Sea 3',
    health: 120000,
    maxHealth: 120000,
    attackPower: 3800,
    element: 'Glacial Abyssal Frost',
    avatarEmoji: '🐉',
    lore: 'The titan of the sub-zero ocean abyss. Encircled by colossal frozen segments and armored scales that deflect basic attacks.',
    enrageThreshold: 0.5,
    phase2Name: 'Enraged Sub-Zero Cataclysm',
    attacks: [
      {
        name: 'Glacial Breath Wave',
        damage: 3200,
        kenBypass: false,
        description: 'Fires a massive cone of frost that freezes opponents in place.',
        icon: '❄️'
      },
      {
        name: 'Abyssal Tail Thrash',
        damage: 4100,
        kenBypass: true,
        description: 'Slams titanic barbed tail creating a 100m shockwave.',
        icon: '🌊'
      },
      {
        name: 'Iceberg Orbital Bombardment',
        damage: 5500,
        kenBypass: true,
        description: 'Rains colossal frozen meteors crushing the entire arena.',
        icon: '☄️'
      }
    ],
    rewards: {
      item: 'Leviathan Heart & Scales',
      itemEmoji: '🫀',
      dropChance: '100% Guaranteed',
      beli: 150000,
      fragments: 2500,
      masteryXp: 50000
    }
  },
  {
    id: 'dough-king',
    name: 'Dough King (Katakuri Apex)',
    title: 'Mirror Dimension Monarch',
    sea: 'Sea 3',
    health: 150000,
    maxHealth: 150000,
    attackPower: 4400,
    element: 'Candied Future Sight Singularity',
    avatarEmoji: '🍩',
    lore: 'Wielder of ultimate Observation Haki Future Sight and awakened Mochi manipulation. Dodges 8 consecutive attacks naturally.',
    enrageThreshold: 0.45,
    phase2Name: 'Future Sight Transcendence',
    attacks: [
      {
        name: 'Candied Piercing Clothesline',
        damage: 3600,
        kenBypass: false,
        description: 'Extends mochi arm at mach 5 dragging target across the dimension.',
        icon: '🔱'
      },
      {
        name: '100-Doughnut Fist Rain',
        damage: 4800,
        kenBypass: true,
        description: 'Spawns 100 floating mirror rings bombarding with armament fists.',
        icon: '💥'
      },
      {
        name: 'Caramel Anvil Execution',
        damage: 6200,
        kenBypass: true,
        description: 'Crushes target beneath a 500-ton hardened candy anvil.',
        icon: '🔨'
      }
    ],
    rewards: {
      item: 'Mirror Fractal & Red Key',
      itemEmoji: '🪞',
      dropChance: '100% Guaranteed',
      beli: 200000,
      fragments: 3000,
      masteryXp: 65000
    }
  },
  {
    id: 'rip-indra',
    name: 'Rip_Indra (Awakened Dark Blade God)',
    title: 'Castle on the Sea True Deity',
    sea: 'Sea 3',
    health: 180000,
    maxHealth: 180000,
    attackPower: 5200,
    element: 'Dark Void Horizon Slashes',
    avatarEmoji: '⚔️',
    lore: 'The supreme swordsman possessing the Awakened Yoru Dark Blade and Conqueror Haki shockwaves.',
    enrageThreshold: 0.5,
    phase2Name: 'Awakened Yoru Horizon Realm',
    attacks: [
      {
        name: 'Thousand Dark Slices',
        damage: 4200,
        kenBypass: false,
        description: 'Unleashes a barrage of dark green sonic blade waves.',
        icon: '🗡️'
      },
      {
        name: 'Dimensional Rift Cleave',
        damage: 5400,
        kenBypass: true,
        description: 'Splits space itself, ignoring all defense shields.',
        icon: '🌌'
      },
      {
        name: 'Conqueror Dragon Execution',
        damage: 7000,
        kenBypass: true,
        description: 'Slashes with a dark dragon avatar that shakes the server.',
        icon: '🐉'
      }
    ],
    rewards: {
      item: 'Dark Dagger & Holy Grail',
      itemEmoji: '🗡️',
      dropChance: '2.5% Mythic Drop',
      beli: 250000,
      fragments: 4000,
      masteryXp: 80000
    }
  },
  {
    id: 'terror-shark',
    name: 'Terror Shark (Level 2000 Abyss Alpha)',
    title: 'Ship Hunter of the Rough Seas',
    sea: 'Sea 3',
    health: 90000,
    maxHealth: 90000,
    attackPower: 3500,
    element: 'Blood Vortex Hydrodynamics',
    avatarEmoji: '🦈',
    lore: 'The apex predator of Rough Sea zone 6. Devours sea vessels whole and pulls players underwater into shredding teeth vortices.',
    enrageThreshold: 0.5,
    phase2Name: 'Bloodlust Frenzy Mode',
    attacks: [
      {
        name: 'Submerged Tail Whip',
        damage: 2900,
        kenBypass: false,
        description: 'Whips titanic tail sending razor-sharp water blades.',
        icon: '🌊'
      },
      {
        name: 'Anchor Chomp & Drag',
        damage: 4200,
        kenBypass: true,
        description: 'Bites with immense jaws inflicting severe bleeding DOT.',
        icon: '🦷'
      },
      {
        name: 'Maelstrom Devastation',
        damage: 5100,
        kenBypass: true,
        description: 'Creates a colossal whirlpool pulling all entities in.',
        icon: '🌀'
      }
    ],
    rewards: {
      item: 'Terror Eyes & Shark Tooth',
      itemEmoji: '👁️',
      dropChance: '100% Guaranteed',
      beli: 120000,
      fragments: 1800,
      masteryXp: 40000
    }
  },
  {
    id: 'soul-reaper',
    name: 'Soul Reaper (Haunted Castle Sovereign)',
    title: 'Nether Undead Archon',
    sea: 'Sea 3',
    health: 110000,
    maxHealth: 110000,
    attackPower: 4000,
    element: 'Cursed Netherfire Phantasm',
    avatarEmoji: '💀',
    lore: 'Summoned via the Hallow Essence at the Haunted Castle altar. Siphons health from living players and wields the Cursed Hallow Scythe.',
    enrageThreshold: 0.4,
    phase2Name: 'Soul Harvest Apocalypse',
    attacks: [
      {
        name: 'Netherfire Scythe Cleave',
        damage: 3400,
        kenBypass: false,
        description: 'Swings giant flaming scythe dealing burning ghost flame damage.',
        icon: '🪓'
      },
      {
        name: 'Soul Siphon Drain',
        damage: 4600,
        kenBypass: true,
        description: 'Drains player HP and heals Soul Reaper for 50% of damage dealt.',
        icon: '👻'
      },
      {
        name: 'Spectral Torment Burst',
        damage: 5800,
        kenBypass: true,
        description: 'Explodes all trapped souls in a 360-degree green supernova.',
        icon: '🔥'
      }
    ],
    rewards: {
      item: 'Hallow Scythe & Bones',
      itemEmoji: '🌾',
      dropChance: '5% Mythic Drop',
      beli: 180000,
      fragments: 2200,
      masteryXp: 55000
    }
  }
];
