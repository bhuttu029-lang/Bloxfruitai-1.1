export interface FightingStyle {
  id: string;
  name: string;
  generation: 'V1' | 'V2' | 'V3';
  sea: 'First Sea' | 'Second Sea' | 'Third Sea';
  beliCost: number;
  fragCost: number;
  materials?: string[];
  trainerName: string;
  trainerLocation: string;
  requirements: string;
  moves: { key: string; name: string; mastery: number; description: string }[];
  pvpTier: 'S+' | 'S' | 'A' | 'B';
  grindTier: 'S+' | 'S' | 'A' | 'B';
  icon: string;
  color: string;
  description: string;
}

export interface Accessory {
  id: string;
  name: string;
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon';
  sea: 'First Sea' | 'Second Sea' | 'Third Sea';
  dropSource: string;
  buffs: string[];
  pvpRating: number; // 1-10
  icon: string;
  description: string;
}

export interface RaceInfo {
  id: string;
  name: string;
  baseBuffs: string[];
  v2Buffs: string[];
  v3Ability: { name: string; effect: string; cooldown: string };
  v4Awakening: {
    name: string;
    trialType: string;
    gears: string[];
    description: string;
  };
  pvpTier: 'S+' | 'S' | 'A';
  icon: string;
  color: string;
}

export interface ComboPreset {
  id: string;
  name: string;
  playstyle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master' | 'One-Shot';
  fruitId: string;
  styleId: string;
  swordId: string;
  gunId: string;
  raceId: string;
  accessoryId: string;
  sequence: string[];
  damageEstimate: string;
  explanation: string;
  tips: string;
}

export interface SeaLocation {
  levelRange: string;
  name: string;
  sea: 1 | 2 | 3;
  enemies: string[];
  boss?: string;
  keyUnlocks: string[];
  tip: string;
}

export interface RaidInfo {
  id: string;
  fruitName: string;
  type: 'Regular' | 'Advanced';
  cost: string;
  totalFragmentsToAwaken: number;
  awakenedMoves: { name: string; fragments: number; key: string }[];
  recommendedFruit: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
}

export const FIGHTING_STYLES: FightingStyle[] = [
  {
    id: 'godhuman',
    name: 'Godhuman',
    generation: 'V3',
    sea: 'Third Sea',
    beliCost: 5000000,
    fragCost: 5000,
    materials: ['20 Fish Tails', '20 Magma Ore', '10 Dragon Scales', '10 Mystic Droplets'],
    trainerName: 'Ancient Monk',
    trainerLocation: 'Floating Turtle (Inside the Great Tree root cave)',
    requirements: '400+ Mastery on Superhuman, Death Step, Sharkman Karate, Electric Claw, and Dragon Talon.',
    moves: [
      { key: 'Z', name: 'Soaring Beast', mastery: 125, description: 'Dashes forward creating a massive wind beast that pierces through enemies and breaks Ken/Instinct.' },
      { key: 'X', name: 'Heaven and Earth', mastery: 250, description: 'Channels divine aura into a devastating ground shockwave with huge AoE pull and knockup.' },
      { key: 'C', name: 'Sixth Realm Gun', mastery: 350, description: 'Rapid dash punch delivering an omni-directional explosive barrage. The premier one-shot combo finisher.' }
    ],
    pvpTier: 'S+',
    grindTier: 'S',
    icon: '👊✨',
    color: '#eab308',
    description: 'The pinnacle martial art in Blox Fruits. Possesses hyper-armor, guard break, instant dashes, and extreme burst damage.'
  },
  {
    id: 'sanguine-art',
    name: 'Sanguine Art',
    generation: 'V3',
    sea: 'Third Sea',
    beliCost: 5000000,
    fragCost: 5000,
    materials: ['Leviathan Heart (Beast Hunter)', '20 Demonic Wisps', '20 Vampire Fangs', '2 Dark Fragments'],
    trainerName: 'Shafi',
    trainerLocation: 'Tiki Outpost (Basement Crypt)',
    requirements: 'Defeat Leviathan and harpoon its heart back to Tiki Outpost.',
    moves: [
      { key: 'Z', name: 'Bloodthirsty Ruin', mastery: 125, description: 'Sends a blood wave forward, life-stealing HP and pulling the enemy into your hitbox.' },
      { key: 'X', name: 'Scarlet Tear', mastery: 250, description: 'Performs an aerial claw dash that pins opponents and drains their energy.' },
      { key: 'C', name: 'Devourer of Worlds', mastery: 350, description: 'Creates a crimson vortex that traps multiple targets in sustained lifesteal and launches them.' }
    ],
    pvpTier: 'S+',
    grindTier: 'S+',
    icon: '🩸🦇',
    color: '#dc2626',
    description: 'Ancient vampiric martial art with passive life-steal, heavy stun locks, and massive health sustain for both PvP and Leviathan hunts.'
  },
  {
    id: 'dragon-talon',
    name: 'Dragon Talon',
    generation: 'V2',
    sea: 'Third Sea',
    beliCost: 3000000,
    fragCost: 5000,
    materials: ['Fire Essence (from Haunted Castle Death King)'],
    trainerName: 'Uzoth',
    trainerLocation: 'Haunted Castle (Gear tower)',
    requirements: '400+ Mastery on Dragon Breath + Fire Essence.',
    moves: [
      { key: 'Z', name: 'Talon Lighter', mastery: 125, description: 'Launches forward and shoots a flaming projectile with instant guard break.' },
      { key: 'X', name: 'Biting Fire', mastery: 250, description: 'Roars and creates a vortex of dragon fire that pulls targets in and juggles them.' },
      { key: 'C', name: 'Infernal Whirlwind', mastery: 350, description: 'Dashes and slams the ground with an expanding fiery explosion.' }
    ],
    pvpTier: 'S',
    grindTier: 'S',
    icon: '🔥🦅',
    color: '#f97316',
    description: 'Draconic fire attacks with massive AoE and easy combo extension.'
  },
  {
    id: 'electric-claw',
    name: 'Electric Claw',
    generation: 'V2',
    sea: 'Third Sea',
    beliCost: 3000000,
    fragCost: 5000,
    materials: ['Complete 30-second dash quest from Previous Hero'],
    trainerName: 'Previous Hero',
    trainerLocation: 'Floating Turtle (Mansion arch)',
    requirements: '400+ Mastery on Electro + Dash to Mansion within 30 seconds.',
    moves: [
      { key: 'Z', name: 'Rampage Dash', mastery: 110, description: 'Extremely fast lunge slashing targets with electric claws.' },
      { key: 'X', name: 'Lightning Thrust', mastery: 220, description: 'Fires an electric beam that stuns and pulls the enemy directly to you.' },
      { key: 'C', name: 'Thunderclap Flash', mastery: 330, description: 'Teleports into an omni-directional electric explosion.' }
    ],
    pvpTier: 'S+',
    grindTier: 'A',
    icon: '⚡🐾',
    color: '#38bdf8',
    description: 'The premier combo-starter style known for hyper-speed dashes and unescapable stun.'
  },
  {
    id: 'sharkman-karate',
    name: 'Sharkman Karate',
    generation: 'V2',
    sea: 'Second Sea',
    beliCost: 2500000,
    fragCost: 5000,
    materials: ['Water Key from Tide Keeper Boss'],
    trainerName: 'Daigrock',
    trainerLocation: 'Forgotten Island',
    requirements: '400+ Mastery on Water Kung Fu + Water Key.',
    moves: [
      { key: 'Z', name: 'Twelve Water Palms', mastery: 100, description: 'Rapid water thrust barrage with zero cooldown.' },
      { key: 'X', name: 'Pressure Whirlpool', mastery: 200, description: 'Creates a massive water vortex that launches enemies high into the air.' },
      { key: 'C', name: 'Great Sea Spear', mastery: 300, description: 'Throws a concentrated water spear causing huge knockback.' }
    ],
    pvpTier: 'S',
    grindTier: 'S+',
    icon: '🌊🦈',
    color: '#0ea5e9',
    description: 'Highest M1 attack speed in the game. The undisputed #1 fighting style for Buddha grinding and raid soloing.'
  },
  {
    id: 'death-step',
    name: 'Death Step',
    generation: 'V2',
    sea: 'Second Sea',
    beliCost: 2500000,
    fragCost: 5000,
    materials: ['Library Key from Awakened Ice Admiral'],
    trainerName: 'Phoey',
    trainerLocation: 'Ice Castle (Secret library)',
    requirements: '400+ Mastery on Dark Step + Library Key.',
    moves: [
      { key: 'Z', name: 'Rocket Kick', mastery: 110, description: 'Flies forward with a flame-imbued thrust kick.' },
      { key: 'X', name: 'Wind Bullet', mastery: 220, description: 'Kicks a rapid series of burning air slices.' },
      { key: 'C', name: 'Maximum Overheat', mastery: 330, description: 'Ignites legs into white-hot flames, buffing all damage by 15% and causing burn ticks.' }
    ],
    pvpTier: 'A',
    grindTier: 'A',
    icon: '🦵🔥',
    color: '#ef4444',
    description: 'High damage kicking style with lingering burn ticks and intense burst damage.'
  }
];

export const ACCESSORIES_DATA: Accessory[] = [
  {
    id: 'leviathan-shield',
    name: 'Leviathan Shield',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropSource: 'Crafted at Beast Hunter with Leviathan Scales & Electric Wings',
    buffs: ['+1200 Max Health', '+15% Defense against Sea Events & PvP', '+90% Resistance to Water Damage', '+30% Armor against Swords'],
    pvpRating: 10,
    icon: '🛡️🐉',
    description: 'The tankiest accessory in the entire game. Essential for deep ocean hunting and high-bounty PvP survival.'
  },
  {
    id: 'pale-scarf',
    name: 'Pale Scarf',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropSource: 'Defeat Dough King or Cake Prince Boss at Sea of Treats',
    buffs: ['+15% Blox Fruit & Sword Damage', '+2 Extra Instinct/Ken Dodges', '+10x Instinct Vision Range'],
    pvpRating: 10,
    icon: '🧣✨',
    description: 'The standard competitive PvP accessory for seeing enemy cooldowns and gaining extra dodges.'
  },
  {
    id: 'kitsune-ribbon',
    name: 'Kitsune Ribbon',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropSource: 'Trade 20 Azure Embers at Kitsune Shrine during Full Moon',
    buffs: ['+10% Movement Speed', '+2500 Energy', '+7% Health Regen', '+15% Flash Step Cooldown Reduction'],
    pvpRating: 9,
    icon: '🎀🦊',
    description: 'Unmatched energy capacity and speed sustain for endless PvP combo skirmishes.'
  },
  {
    id: 'swan-glasses',
    name: 'Swan Glasses',
    rarity: 'Legendary',
    sea: 'Second Sea',
    dropSource: 'Defeat Don Swan Boss at Mansion (2.5% Drop Rate)',
    buffs: ['+8% All Damage', '+8% Defense', '+8% Cooldown Reduction', '+25% Movement Speed', '+250 HP & Energy'],
    pvpRating: 9,
    icon: '🕶️🦩',
    description: 'The most versatile all-around buff accessory bridging Second and Third Seas.'
  },
  {
    id: 'dark-coat',
    name: 'Dark Coat',
    rarity: 'Mythical',
    sea: 'First Sea',
    dropSource: 'Defeat Darkbeard Boss at Dark Arena (Requires Fist of Darkness)',
    buffs: ['+15% Fruit Damage', '+600 Energy', '+600 Health'],
    pvpRating: 8,
    icon: '🧥🌑',
    description: 'Extremely rare First/Second Sea trophy item with high fruit damage scaling.'
  }
];

export const RACES_DATA: RaceInfo[] = [
  {
    id: 'cyborg',
    name: 'Cyborg',
    baseBuffs: ['+10% Energy Regen on damage taken', 'High Defense Shielding'],
    v2Buffs: ['+15% Defense', 'Converts 2.5% of damage taken into Energy'],
    v3Ability: { name: 'Energy Core', effect: 'Creates an electric shield dealing heavy ticking damage, breaking Ken, and granting 30% damage reduction.', cooldown: '30s' },
    v4Awakening: {
      name: 'Energy Overload & Supercharged Gear',
      trialType: 'Trial of Machines (Dodge explosive missiles without taking damage)',
      gears: ['Electric Chain Reaction', 'Supercharged Jump & Hover Thrusters'],
      description: 'Emits continuous electric arcs to nearby enemies, completely shutting down their Instinct/Ken dodges.'
    },
    pvpTier: 'S+',
    icon: '🤖⚡',
    color: '#06b6d4'
  },
  {
    id: 'shark',
    name: 'Shark (Fishman)',
    baseBuffs: ['Immune to Water Damage (100% at V2)', 'Faster Swimming'],
    v2Buffs: ['Complete water immunity even as Fruit user', '+10% Swim Speed'],
    v3Ability: { name: 'Water Body', effect: 'Reduces all incoming damage by 80% for 6.5 seconds.', cooldown: '25s' },
    v4Awakening: {
      name: 'Leviathan Leviathan Armor & Whirlpool Shield',
      trialType: 'Trial of Water (Defeat the Sea Beast before timer expires)',
      gears: ['Whirlpool Slow & Ken Drain', 'Invincible Water Armor Shield'],
      description: 'Generates a passive water shield that absorbs massive damage and creates a whirlpool that slows enemies.'
    },
    pvpTier: 'S+',
    icon: '🦈🌊',
    color: '#0284c7'
  },
  {
    id: 'angel',
    name: 'Angel (Skypiean)',
    baseBuffs: ['Increased Jump Height', 'Extended Air Glide'],
    v2Buffs: ['Triple Jump', '+15% Jump Distance'],
    v3Ability: { name: 'Heavenly Blood', effect: 'Instantly regenerates 20% Health & Energy and grants +25% Defense for 6s.', cooldown: '20s' },
    v4Awakening: {
      name: 'Prince of the Skies & Divine Aura',
      trialType: 'Trial of Skies (Parkour cloud pillars in under 60 seconds)',
      gears: ['Heavenly Flight & Glide', 'Aura of Stun (Enemies near you are stunned and drained)'],
      description: 'Grants true free-flight in the air and a blinding divine aura that stuns anyone who approaches.'
    },
    pvpTier: 'S+',
    icon: '🪽✨',
    color: '#facc15'
  },
  {
    id: 'human',
    name: 'Human',
    baseBuffs: ['Standard balanced stats'],
    v2Buffs: ['+2 Extra Flash Steps', 'Lower Flash Step Cooldown'],
    v3Ability: { name: 'Last Resort', effect: 'Increases your damage output by up to +33% as your HP drops lower.', cooldown: '20s' },
    v4Awakening: {
      name: 'Limit Break & Psycho Instinct',
      trialType: 'Trial of Strength (Defeat your own shadow clone with identical stats)',
      gears: ['Psycho Flash Step (Infinite dashes)', 'Rage Meter (Deals up to +150% extra burst damage)'],
      description: 'The ultimate offensive one-shot race. Max rage allows you to one-shot almost any player in the game.'
    },
    pvpTier: 'S',
    icon: '🥋🔥',
    color: '#f97316'
  },
  {
    id: 'ghoul',
    name: 'Ghoul',
    baseBuffs: ['Night-time speed boost', 'Passive lifesteal on melee attacks'],
    v2Buffs: ['+25% Movement Speed at night', '+8% Lifesteal on all melee damage'],
    v3Ability: { name: 'Heightened Senses', effect: 'Resets cooldowns by 40%, increases speed by 15%, and allows use of skills even at low energy.', cooldown: '25s' },
    v4Awakening: {
      name: 'Domain of Darkness & Blood Crow Swarm',
      trialType: 'Trial of Carnage (Defeat hordes of zombies within time limit)',
      gears: ['Blindness Sphere (Blinds opponent screen)', 'Blood Drain Crows'],
      description: 'Spawns a dark dome blinding all nearby enemies while crows continuously drain their health.'
    },
    pvpTier: 'S',
    icon: '🦇🩸',
    color: '#9333ea'
  },
  {
    id: 'mink',
    name: 'Mink (Rabbit)',
    baseBuffs: ['+100% Base Sprint Speed', 'Lightning Dash trails'],
    v2Buffs: ['Lower dash stamina cost', '+15% Faster overall mobility'],
    v3Ability: { name: 'Agility', effect: 'Increases sprint speed by +100% and extends dash distance for 6.5s.', cooldown: '30s' },
    v4Awakening: {
      name: 'Lightning Cloak & Electro Tornadoes',
      trialType: 'Trial of Speed (Complete complex maze before timer runs out)',
      gears: ['Electric Tornado Traps', 'Max Speed Hyper Sonic Trails'],
      description: 'Move faster than the camera can track and leave behind electric cyclones that trap pursuers.'
    },
    pvpTier: 'A',
    icon: '🐰⚡',
    color: '#a855f7'
  }
];

export const COMBO_PRESETS: ComboPreset[] = [
  {
    id: 'dogblade-godhuman-oneshot',
    name: 'Dog Blade + Godhuman Burst Lock',
    playstyle: 'Sword Main Aggro',
    difficulty: 'One-Shot',
    fruitId: 'portal',
    styleId: 'godhuman',
    swordId: 'dog-blade',
    gunId: 'soul-guitar',
    raceId: 'cyborg',
    accessoryId: 'pale-scarf',
    sequence: [
      'Portal V (Dimensional Rift to close gap)',
      'Soul Guitar Z (El Diablo stun & Ken Break)',
      'Godhuman C (Sixth Realm Gun dash burst)',
      'Dog Blade Z (Spoiled Strike dash stun)',
      'Dog Blade X (Tantrum Whirlwind explosion)',
      'Godhuman Z + X (Heaven and Earth execution)'
    ],
    damageEstimate: '22,400+ Damage (Guaranteed One-Shot)',
    explanation: 'Combines the instant Ken Break of Soul Guitar Z with the high-damage stun frames of the new Dog Blade and Godhuman Sixth Realm Gun.',
    tips: 'Ensure you hit Soul Guitar Z while the enemy is exiting the portal rift to prevent them from activating Shark V3.'
  },
  {
    id: 'dough-godhuman-cdk',
    name: 'Dough V2 + CDK Classic Stun Meta',
    playstyle: 'Fruit / Sword Hybrid',
    difficulty: 'Intermediate',
    fruitId: 'dough',
    styleId: 'godhuman',
    swordId: 'cursed-dual-katana',
    gunId: 'kabucha',
    raceId: 'human',
    accessoryId: 'pale-scarf',
    sequence: [
      'Dough X (Missile Jab pull)',
      'Dough C (Carving Dough slam)',
      'Cursed Dual Katana Z (Revolving Ravager stun)',
      'Godhuman Z (Soaring Beast)',
      'Dough V (Fist Fusillade finisher)'
    ],
    damageEstimate: '19,800+ Damage',
    explanation: 'The most reliable stun chain in competitive Blox Fruits PvP. Leaves almost zero escape frames once Dough X connects.',
    tips: 'Use Dough V while the enemy is suspended in CDK Z stun for maximum tick damage.'
  },
  {
    id: 'dragon-west-inferno-annihilation',
    name: 'Dragon West + Sanguine Aerial Dominance',
    playstyle: 'Fruit Main Tank',
    difficulty: 'Beginner',
    fruitId: 'dragon-west',
    styleId: 'sanguine-art',
    swordId: 'dark-blade',
    gunId: 'serpent-bow',
    raceId: 'shark',
    accessoryId: 'leviathan-shield',
    sequence: [
      'Dragon Form Transformation',
      'Dragon C (Draconic Beam sweep)',
      'Dragon X (Infernal Meteor Rain)',
      'Sanguine Art Z (Bloodthirsty Ruin pull)',
      'Sanguine Art C (Devourer of Worlds vortex)'
    ],
    damageEstimate: '24,500+ Damage (Massive AoE)',
    explanation: 'Takes full advantage of Western Dragon’s super-armor breath attacks and Sanguine Art lifesteal to overpower entire groups.',
    tips: 'Stay in the sky to make sword users unable to hit you with ground melee skills.'
  },
  {
    id: 'kitsune-speed-blitz',
    name: 'Kitsune + Electric Claw Fox Blitz',
    playstyle: 'Speed Demon Hit-and-Run',
    difficulty: 'Intermediate',
    fruitId: 'kitsune',
    styleId: 'electric-claw',
    swordId: 'shark-anchor',
    gunId: 'soul-guitar',
    raceId: 'mink',
    accessoryId: 'kitsune-ribbon',
    sequence: [
      'Kitsune C (Fox Fire barrage)',
      'Electric Claw C (Thunderclap Flash teleport)',
      'Kitsune Z (Tails of Wrath burst)',
      'Shark Anchor X (Typhoon Toss pull)',
      'Kitsune V (Fox Transformation roar)'
    ],
    damageEstimate: '21,000+ Damage',
    explanation: 'Relentless speed that overwhelms the opponent’s camera sensitivity and burns through their Ken dodges in under 2 seconds.',
    tips: 'Use Kitsune passive speed to bait out enemy combo starters before engaging.'
  }
];

export const SEA_PROGRESSION: SeaLocation[] = [
  // FIRST SEA (Lv 1 - 700)
  {
    sea: 1,
    levelRange: 'Lv 1 - 10',
    name: 'Starter Island (Pirate / Marine)',
    enemies: ['Bandit', 'Trainee'],
    keyUnlocks: ['Boat Dealer', 'Sword Dealer ($1,000 Katana / Cutlass)'],
    tip: 'Put all initial stat points into Melee and Blox Fruit / Sword for fast M1 grinding.'
  },
  {
    sea: 1,
    levelRange: 'Lv 10 - 30',
    name: 'Jungle Island',
    enemies: ['Monkey', 'Gorilla'],
    boss: 'Gorilla King (Lv 25)',
    keyUnlocks: ['Blox Fruit Gacha Cousin (Lv 50+)', 'Saber Expert Quest (Saber V1)'],
    tip: 'Complete the Jungle button puzzle to unlock the secret Saber Expert door under the stairs.'
  },
  {
    sea: 1,
    levelRange: 'Lv 30 - 60',
    name: 'Pirate Village',
    enemies: ['Pirate', 'Brute'],
    boss: 'Bobby the Clown (Lv 55)',
    keyUnlocks: ['Black Leg / Dark Step Teacher ($150,000)'],
    tip: 'Bobby is immune to sword cuts! Use Melee or Fruit attacks to defeat him.'
  },
  {
    sea: 1,
    levelRange: 'Lv 60 - 90',
    name: 'Desert Island',
    enemies: ['Desert Bandit', 'Desert Officer'],
    keyUnlocks: ['Secret Desert Pyramid Cup (for Saber Quest)'],
    tip: 'Elemental / Logia immunity activates at level 64 for Desert Bandits.'
  },
  {
    sea: 1,
    levelRange: 'Lv 90 - 120',
    name: 'Frozen Village',
    enemies: ['Snow Bandit', 'Snowman'],
    boss: 'Yeti (Lv 105)',
    keyUnlocks: ['Ability Teacher (Air Jump $10k, Aura / Buso Haki $25k, Flash Step $100k)'],
    tip: 'MUST buy Aura (Buso Haki) and Air Jump immediately from the secret cave near the docks!'
  },
  {
    sea: 1,
    levelRange: 'Lv 120 - 150',
    name: 'Marine Fortress',
    enemies: ['Chief Petty Officer'],
    boss: 'Vice Admiral (Lv 130)',
    keyUnlocks: ['Parlus the Blacksmith', 'Grey Coat ($50k)'],
    tip: 'Vice Admiral gives huge exp and Beli; server-hop him to level up rapidly.'
  },
  {
    sea: 1,
    levelRange: 'Lv 150 - 190',
    name: 'Skylands (Sky Islands)',
    enemies: ['Sky Bandit', 'Dark Master'],
    boss: 'Wysper (Lv 500)',
    keyUnlocks: ['Electro Fighting Style ($500,000)', 'Bazooka Gun'],
    tip: 'Break the cloud door to reach Upper Skylands and buy Electro behind the rocks.'
  },
  {
    sea: 1,
    levelRange: 'Lv 190 - 300',
    name: 'Prison & Colosseum',
    enemies: ['Prisoner', 'Dangerous Prisoner'],
    boss: 'Warden (Lv 220), Chief Warden (Lv 230), Swan (Lv 240)',
    keyUnlocks: ['Water Kung Fu at Underwater City ($750,000)'],
    tip: 'Prison allows you to chain 3 bosses continuously without leaving the island.'
  },
  {
    sea: 1,
    levelRange: 'Lv 300 - 450',
    name: 'Magma Village & Underwater City',
    enemies: ['Military Soldier', 'Fishman Warrior'],
    boss: 'Magma Admiral (Lv 350), Fishman Lord (Lv 425)',
    keyUnlocks: ['Water Kung Fu Teacher', 'Trident drop'],
    tip: 'Fishman Lord drops Trident and gives great mastery for Water Kung Fu.'
  },
  {
    sea: 1,
    levelRange: 'Lv 450 - 700',
    name: 'Skylands Upper & Fountain City',
    enemies: ['God’s Guard', 'Galley Pirate', 'Galley Captain'],
    boss: 'Thunder God (Enel Lv 575), Cyborg (Lv 675)',
    keyUnlocks: ['Instinct / Ken Haki Teacher (Lord of Destruction for $750,000)', 'Second Sea Quest at Prison Detective'],
    tip: 'At Lv 700, talk to the Military Detective at Prison to get the key to Ice Castle and fight Ice Admiral to unlock Second Sea!'
  },

  // SECOND SEA (Lv 700 - 1500)
  {
    sea: 2,
    levelRange: 'Lv 700 - 875',
    name: 'Kingdom of Rose & Café',
    enemies: ['Raider', 'Mercenary', 'Swan Pirate'],
    boss: 'Diamond (Lv 750), Jeremy (Lv 850)',
    keyUnlocks: ['Café Trading Floor', 'Bartilo Quest (Race V2 unlock)', 'Alchemist'],
    tip: 'The Café is the safe zone for item trading, fruit storage, and starting the Bartilo questline.'
  },
  {
    sea: 2,
    levelRange: 'Lv 875 - 1000',
    name: 'Green Zone',
    enemies: ['Marine Lieutenant', 'Marine Captain'],
    boss: 'Fajita (Lv 925)',
    keyUnlocks: ['True Triple Katana Dealer (Shisui, Wando, Saddi)', 'Race V3 Teacher (Arowe)'],
    tip: 'Check with Manager at Café every 3 hours for Legendary Sword Dealer spawn in Green Zone leaves.'
  },
  {
    sea: 2,
    levelRange: 'Lv 1000 - 1100',
    name: 'Graveyard & Snow Mountain',
    enemies: ['Zombie', 'Vampire', 'Snow Trooper'],
    boss: 'Don Swan (Lv 1000 in Mansion)',
    keyUnlocks: ['Ghoul Race NPC (El Perro)', 'Swan Glasses Drop'],
    tip: 'Give Trevor a $1M+ Beli fruit in Mansion to enter Don Swan’s room for Swan Glasses.'
  },
  {
    sea: 2,
    levelRange: 'Lv 1100 - 1350',
    name: 'Hot and Cold (Raid Lab) & Cursed Ship',
    enemies: ['Lab Subordinate', 'Horned Warrior', 'Ship Deckhand'],
    boss: 'Smoke Admiral (Lv 1150), Cursed Captain (Lv 1325)',
    keyUnlocks: ['Raid Scientist (Awakening Raids)', 'Ectoplasm Shop', 'Midnight Blade'],
    tip: 'Buy Microchips from Raid Scientist for $100k Beli or any trash physical fruit to start Fruit Awakening Raids!'
  },
  {
    sea: 2,
    levelRange: 'Lv 1350 - 1500',
    name: 'Ice Castle & Forgotten Island',
    enemies: ['Arctic Warrior', 'Snow Lurker', 'Sea Soldier'],
    boss: 'Awakened Ice Admiral (Lv 1400), Tide Keeper (Lv 1475)',
    keyUnlocks: ['Death Step (Library Key)', 'Sharkman Karate (Water Key)', 'Dragon Breath ($1,500 Frags)', 'Third Sea Colosseum Quest'],
    tip: 'At Lv 1500, defeat Don Swan, free prisoners at Colosseum, and defeat rip_indra at Dark Arena to travel to Third Sea!'
  },

  // THIRD SEA (Lv 1500 - 2550 MAX)
  {
    sea: 3,
    levelRange: 'Lv 1500 - 1775',
    name: 'Port Town & Hydra Island',
    enemies: ['Pirate Millionaire', 'Pistol Billionaire', 'Dragon Crew'],
    boss: 'Stone (Lv 1550), Island Empress (Lv 1675)',
    keyUnlocks: ['Tushita Sword Quest (Waterfall Door)', 'Yama Sword Quest (30 Elite Hunter kills)'],
    tip: 'Defeat 30 Elite Pirates to safely pull the Legendary Yama sword from the Waterfall Crypt without dying.'
  },
  {
    sea: 3,
    levelRange: 'Lv 1775 - 2000',
    name: 'Great Tree & Floating Turtle',
    enemies: ['Marine Commodore', 'Jungle Pirate', 'Musketeer Pirate'],
    boss: 'Kilo Admiral (Lv 1750), Captain Elephant (Lv 1875), Beautiful Pirate (Lv 1950)',
    keyUnlocks: ['Cursed Dual Katana (CDK) Crypt', 'Godhuman Ancient Monk Cave', 'Electric Claw Quest'],
    tip: 'Have 350+ mastery on Yama and Tushita to begin the Cursed Dual Katana trials with the Alchemist & Cryptmaster.'
  },
  {
    sea: 3,
    levelRange: 'Lv 2000 - 2275',
    name: 'Haunted Castle & Sea of Treats',
    enemies: ['Reborn Skeleton', 'Living Zombie', 'Demonic Soul', 'Peanut Scout'],
    boss: 'Soul Reaper (Hallow Scythe), Dough King / Cake Prince (Pale Scarf & Mirror Fract)',
    keyUnlocks: ['Death King (Random Surprise / Fire Essence for Dragon Talon)', 'Soul Guitar Puzzle', 'Dough Awakening Raid Key'],
    tip: 'Defeat 500 NPCs at Sea of Treats with Chalice + 10 Cocoa to summon Dough King for the Mirror Fractal (V4 requirement).'
  },
  {
    sea: 3,
    levelRange: 'Lv 2275 - 2550',
    name: 'Tiki Outpost & Deep Sea Zone',
    enemies: ['Sun-kissed Warrior', 'Isle Outlaw', 'Island Boy'],
    boss: 'Leviathan (Frozen Dimension), Terrorshark (Danger Lv 6), Doghouse Boss',
    keyUnlocks: ['Sanguine Art (Shafi Basement)', 'Shark Anchor (Monster Magnet)', 'Dog Blade (August 2026 Doghouse Event)', 'Leviathan Shield Crafting'],
    tip: 'Sail to Danger Zone 6 with a 5-man crew on Beast Hunter boat to spawn Leviathan and harpoon its heart for Sanguine Art!'
  }
];

export const RAIDS_DATA: RaidInfo[] = [
  {
    id: 'buddha-raid',
    fruitName: 'Buddha',
    type: 'Regular',
    cost: '$100,000 Beli or any physical fruit',
    totalFragmentsToAwaken: 14500,
    recommendedFruit: 'Buddha (Melee M1 Spam) or Magma',
    difficulty: 'Medium',
    awakenedMoves: [
      { name: 'Shift (Giant Golden Form + 50% Defense)', fragments: 500, key: 'Z' },
      { name: 'Heavenly Impact', fragments: 3000, key: 'X' },
      { name: 'Light of Annihilation', fragments: 4000, key: 'C' },
      { name: 'Twilight of the Gods', fragments: 5000, key: 'V' },
      { name: 'Retribution Dash', fragments: 2000, key: 'F' }
    ]
  },
  {
    id: 'dough-raid',
    fruitName: 'Dough',
    type: 'Advanced',
    cost: 'Special Microchip (Requires Cake Scientist unlock + God’s Chalice / 1000 Frags)',
    totalFragmentsToAwaken: 18500,
    recommendedFruit: 'Awakened Buddha + Shark V3/V4',
    difficulty: 'Extreme',
    awakenedMoves: [
      { name: 'Missile Jab (Instant Piercing Pull)', fragments: 500, key: 'Z' },
      { name: 'Pastry River', fragments: 3000, key: 'X' },
      { name: 'Piercing Clothesline', fragments: 4000, key: 'C' },
      { name: 'Dough Fist Fusillade', fragments: 5000, key: 'V' },
      { name: 'Scorching Dough (Flaming Donut Roll)', fragments: 6000, key: 'F' }
    ]
  },
  {
    id: 'magma-raid',
    fruitName: 'Magma',
    type: 'Regular',
    cost: '$100,000 Beli or any fruit',
    totalFragmentsToAwaken: 14500,
    recommendedFruit: 'Buddha or Magma',
    difficulty: 'Easy',
    awakenedMoves: [
      { name: 'Magma Shower (Highest Sea Beast DPS)', fragments: 500, key: 'Z' },
      { name: 'Volcanic Assault', fragments: 3000, key: 'X' },
      { name: 'Great Magma Hound', fragments: 4000, key: 'C' },
      { name: 'Volcano Eruption', fragments: 5000, key: 'V' },
      { name: 'Beast Ride (Water Walk)', fragments: 2000, key: 'F' }
    ]
  },
  {
    id: 'rumble-raid',
    fruitName: 'Rumble',
    type: 'Regular',
    cost: '$100,000 Beli or any fruit',
    totalFragmentsToAwaken: 14500,
    recommendedFruit: 'Buddha or Blizzard',
    difficulty: 'Medium',
    awakenedMoves: [
      { name: 'Lightning Beast', fragments: 500, key: 'Z' },
      { name: 'Thunderstorm (Massive Stun)', fragments: 3000, key: 'X' },
      { name: 'Sky Judgement', fragments: 4000, key: 'C' },
      { name: 'Thunderball Destruction', fragments: 5000, key: 'V' },
      { name: 'Lightning Flash (Triple Teleport)', fragments: 2000, key: 'F' }
    ]
  }
];
