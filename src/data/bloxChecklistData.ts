export interface ChecklistItem {
  id: string;
  name: string;
  category: 'weapons' | 'fighting_styles' | 'races' | 'accessories' | 'awakenings' | 'titles' | 'milestones';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical';
  sea: 1 | 2 | 3 | 'All';
  description: string;
  howToGet: string;
  icon?: string;
  badgeCode?: string;
}

export interface ChecklistCategoryMeta {
  id: ChecklistItem['category'];
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CHECKLIST_CATEGORIES: ChecklistCategoryMeta[] = [
  {
    id: 'weapons',
    name: 'Swords & Guns',
    icon: '⚔️',
    description: 'Track all mythical, legendary, and iconic swords, guns, and slingshots across all three seas.',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'fighting_styles',
    name: 'Fighting Styles',
    icon: '🥊',
    description: 'Master all martial arts from basic Combat to Godhuman and Sanguine Art.',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'races',
    name: 'Race Evolutions (V1 - V4)',
    icon: '⚡',
    description: 'Track your race awakenings across Human, Mink, Shark, Angel, Ghoul, and Cyborg.',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'accessories',
    name: 'Rare Accessories & Drops',
    icon: '👑',
    description: 'Collect legendary coats, scarfs, shields, ribbons, and limited holiday headgear.',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'awakenings',
    name: 'Fruit Awakenings',
    icon: '🍎',
    description: 'Track complete raid awakenings for Dough, Buddha, Magma, Rumble, Light, and more.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'titles',
    name: 'Prestigious Titles',
    icon: '🏆',
    description: 'Unlock numbered player titles from race evolutions, bounty milestones, and boss clears.',
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'milestones',
    name: 'Sea & Account Milestones',
    icon: '🌟',
    description: 'Major progression milestones, Sea unlocks, max level 2550, and essential gamepasses.',
    color: 'from-blue-500 to-purple-600'
  }
];

export const BLOX_CHECKLIST_ITEMS: ChecklistItem[] = [
  // ==========================================
  // WEAPONS (SWORDS & GUNS)
  // ==========================================
  {
    id: 'wp-saber',
    name: 'Saber (V1 / V2)',
    category: 'weapons',
    rarity: 'Legendary',
    sea: 1,
    description: 'The iconic First Sea sword with massive single-target slash damage.',
    howToGet: 'Defeat Saber Expert (Lv 200) inside the Jungle temple basement puzzle.'
  },
  {
    id: 'wp-cdk',
    name: 'Cursed Dual Katana (CDK)',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 3,
    description: 'Top-tier dual blade combining Yama and Tushita with unstoppable mobility stuns.',
    howToGet: 'Get 350+ Mastery on Yama & Tushita, complete the Cursed Dual Katana scroll trials at Floating Turtle mansion.'
  },
  {
    id: 'wp-ttk',
    name: 'True Triple Katana (TTK)',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 2,
    description: 'Colossal triple sword formed by uniting Shisui, Saddi, and Wando.',
    howToGet: 'Buy Shisui, Saddi, and Wando from Legendary Sword Dealer ($2M Beli each), reach 300 Mastery on each, craft at Green Zone peak for $2M Beli.'
  },
  {
    id: 'wp-shark-anchor',
    name: 'Shark Anchor',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 3,
    description: 'Colossal nautical anchor with devastating armor pull and Typhoon Toss.',
    howToGet: 'Craft Monster Magnet at Shark Hunter NPC, sail to Sea Danger Level 6, and defeat the Terror Shark with 195k HP.'
  },
  {
    id: 'wp-fox-lamp',
    name: 'Fox Lamp',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 3,
    description: 'Mythical Kitsune lamp delivering fiery spectral slashes and long-range Fox Fire.',
    howToGet: 'Collect 20-25 Azure Embers at the Kitsune Shrine during Full Moon in Sea Danger Level 6.'
  },
  {
    id: 'wp-dark-blade',
    name: 'Dark Blade (Yoru V1 / V2 / V3)',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 'All',
    description: 'The supreme black blade wielded by Mihawk with colossal cross slashes.',
    howToGet: 'Purchase for 1,200 Robux or obtain via Brazilian / Admin gift; upgrade to V2 with the Son Quest and V3 with dual Fist of Darkness.'
  },
  {
    id: 'wp-soul-guitar',
    name: 'Soul Guitar',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 3,
    description: 'Undead musical gun that stuns and drains health with El Diablo soul beams.',
    howToGet: 'Complete the Haunted Castle full moon puzzle: pray at gravestones, defeat 6 living zombies at once, align trophy signs, and craft with 500 Bones + 250 Ectoplasm + 1 Dark Fragment.'
  },
  {
    id: 'wp-yama',
    name: 'Yama',
    category: 'weapons',
    rarity: 'Legendary',
    sea: 3,
    description: 'Demon blade that feeds on the souls of defeated elite pirates.',
    howToGet: 'Defeat 30 Elite Hunters (or 20+ with luck) in Third Sea, then pull the blade from the Secret Waterfall cave at Hydra Island.'
  },
  {
    id: 'wp-tushita',
    name: 'Tushita',
    category: 'weapons',
    rarity: 'Legendary',
    sea: 3,
    description: 'Sacred celestial sword with lightning-fast Heavenly Lunges.',
    howToGet: 'Summon rip_indra at Castle on the Sea, enter the Secret Waterfall at Hydra Island, equip the Holy Torch, and light the 5 torches within 5 minutes.'
  },
  {
    id: 'wp-hallow-scythe',
    name: 'Hallow Scythe',
    category: 'weapons',
    rarity: 'Mythical',
    sea: 3,
    description: 'Deathly scythe wielded by the Soul Reaper.',
    howToGet: 'Spawn Soul Reaper at Haunted Castle using Hallow Essence (5% drop from Death King bone gacha) and defeat him.'
  },
  {
    id: 'wp-spikey-trident',
    name: 'Spikey Trident',
    category: 'weapons',
    rarity: 'Legendary',
    sea: 3,
    description: 'Dough King trident with colossal grab and pull combo potential.',
    howToGet: 'Defeat Cake Prince or Dough King inside the Mirror Dimension at Sea of Treats (10% drop).'
  },
  {
    id: 'wp-dragon-trident',
    name: 'Dragon Trident',
    category: 'weapons',
    rarity: 'Rare',
    sea: 2,
    description: 'Aquatic trident fired by the Tide Keeper with water dragon bursts.',
    howToGet: 'Defeat the Tide Keeper boss at the Forgotten Island in Second Sea.'
  },
  {
    id: 'wp-acidum-rifle',
    name: 'Acidum Rifle',
    category: 'weapons',
    rarity: 'Rare',
    sea: 2,
    description: 'High-damage toxic rifle with armor pierce and poison tick damage.',
    howToGet: 'Defeat Factory raid core in Second Sea (Kingdom of Rose) with top damage.'
  },
  {
    id: 'wp-serpent-bow',
    name: 'Serpent Bow',
    category: 'weapons',
    rarity: 'Legendary',
    sea: 3,
    description: 'Venomous bow with toxic clouds and fast reload.',
    howToGet: 'Defeat Island Empress boss inside the Hydra Island palace (10% drop).'
  },

  // ==========================================
  // FIGHTING STYLES
  // ==========================================
  {
    id: 'fs-godhuman',
    name: 'Godhuman',
    category: 'fighting_styles',
    rarity: 'Mythical',
    sea: 3,
    description: 'The pinnacle martial art combining all 5 ancient fighting styles into unstoppable God fists.',
    howToGet: '400+ Mastery on Superhuman, Death Step, Sharkman Karate, Electric Claw, and Dragon Talon + 20 Dragon Scales, 20 Magma Ore, 10 Dragon Fangs, 10 Mystic Droplets + $5M Beli & 5,000 Frags at Floating Turtle ancient tree.'
  },
  {
    id: 'fs-sanguine-art',
    name: 'Sanguine Art',
    category: 'fighting_styles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Vampiric blood-bending martial art with lifesteal and Bloodshot grab.',
    howToGet: 'Obtain Leviathan Heart using Beast Hunter Harpoon + 20 Demonic Wisps, 20 Vampire Fangs, 2 Dark Fragments + $5M Beli & 5,000 Frags from Shafi inside Tiki Outpost basement.'
  },
  {
    id: 'fs-electric-claw',
    name: 'Electric Claw',
    category: 'fighting_styles',
    rarity: 'Legendary',
    sea: 3,
    description: 'Lightning-fast claw strikes with instant Thunderclap dash.',
    howToGet: '400 Mastery on Electro, complete Previous Hero sprint trial from Floating Turtle mansion to Mansion gate under 30s + $3M Beli & 5,000 Frags.'
  },
  {
    id: 'fs-dragon-talon',
    name: 'Dragon Talon',
    category: 'fighting_styles',
    rarity: 'Legendary',
    sea: 3,
    description: 'Blazing dragon claws with massive AoE fire vortex and Talon Lighter.',
    howToGet: '400 Mastery on Dragon Breath, give Fire Essence (from Death King gacha) to Uzoth inside the Haunted Castle gear + $3M Beli & 5,000 Frags.'
  },
  {
    id: 'fs-sharkman-karate',
    name: 'Sharkman Karate',
    category: 'fighting_styles',
    rarity: 'Legendary',
    sea: 2,
    description: 'Rapid-fire aquatic punches and Great Sea Spear vortex.',
    howToGet: '400 Mastery on Water Kung Fu, give Water Key (from Tide Keeper) to Daigrock at Forgotten Island + $2.5M Beli & 5,000 Frags.'
  },
  {
    id: 'fs-death-step',
    name: 'Death Step',
    category: 'fighting_styles',
    rarity: 'Legendary',
    sea: 2,
    description: 'Black burning kick martial art with Vermillion fire passive.',
    howToGet: '400 Mastery on Dark Step, give Library Key (from Awakened Ice Admiral) to Phoey at Ice Castle + $2.5M Beli & 5,000 Frags.'
  },
  {
    id: 'fs-superhuman',
    name: 'Superhuman',
    category: 'fighting_styles',
    rarity: 'Legendary',
    sea: 2,
    description: 'High-speed combo martial art featuring Beast Owl Slash and Thunder Clap.',
    howToGet: '300 Mastery on Dark Step, Electro, Fishman Karate, and Dragon Breath + $3M Beli from Martial Arts Master inside the Snow Mountain cave.'
  },

  // ==========================================
  // RACE EVOLUTIONS (V1 - V4)
  // ==========================================
  {
    id: 'race-human-v4',
    name: 'Human V4 (Trial of Strength)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Berserker rage transformation multiplying raw damage output by up to +150% with Psycho Boost.',
    howToGet: 'Complete Trial of Strength in Temple of Time during Full Moon, unlock Gear 1 to 5 with Ancient Clock.'
  },
  {
    id: 'race-cyborg-v4',
    name: 'Cyborg V4 (Trial of Machines)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Electric overdrive with continuous Instinct/Ken-breaking chain lightning and supercharged battery.',
    howToGet: 'Complete Trial of Machines (dodge missiles) in Temple of Time during Full Moon.'
  },
  {
    id: 'race-shark-v4',
    name: 'Shark / Fishman V4 (Trial of Water)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Leviathan armor shield granting massive damage absorption, water whirlpools, and zero water damage.',
    howToGet: 'Defeat summoned Sea Beast in Trial of Water inside Temple of Time during Full Moon.'
  },
  {
    id: 'race-angel-v4',
    name: 'Angel / Skypiean V4 (Trial of King)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Heavenly flight aura that slows and drains HP/energy from all nearby players.',
    howToGet: 'Complete sky platforming trial inside Temple of Time during Full Moon.'
  },
  {
    id: 'race-ghoul-v4',
    name: 'Ghoul V4 (Trial of Carnage)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Blood Moon darkness sphere with 100% blind field, hyper lifesteal, and 40% cooldown reduction.',
    howToGet: 'Defeat waves of undead in Trial of Carnage inside Temple of Time during Full Moon.'
  },
  {
    id: 'race-mink-v4',
    name: 'Rabbit / Mink V4 (Trial of Speed)',
    category: 'races',
    rarity: 'Mythical',
    sea: 3,
    description: 'Hypersonic speed with lightning tornadoes and untargetable dash speed.',
    howToGet: 'Complete the speed maze in Trial of Speed inside Temple of Time during Full Moon.'
  },

  // ==========================================
  // RARE ACCESSORIES & BOSS DROPS
  // ==========================================
  {
    id: 'acc-leviathan-shield',
    name: 'Leviathan Shield',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+1200 Health, +90% Sea Event defense, and +15% universal damage reduction.',
    howToGet: 'Craft at Beast Hunter NPC with 1 Leviathan Heart, 10 Leviathan Scales, 20 Electric Wings, and 30 Dark Fragments.'
  },
  {
    id: 'acc-leviathan-crown',
    name: 'Leviathan Crown',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+12% damage to Sea Events, +40% health regen, and +10% melee/gun damage.',
    howToGet: 'Craft at Beast Hunter NPC with 10 Leviathan Scales, 5 Electric Wings, and 1 Shark Tooth.'
  },
  {
    id: 'acc-kitsune-mask',
    name: 'Kitsune Mask',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+2 Instinct dodges, +10% fruit damage, and immunity to Kitsune blindness.',
    howToGet: 'Turn in 25 Azure Embers at the Kitsune Shrine during Full Moon in Sea Danger Level 6.'
  },
  {
    id: 'acc-kitsune-ribbon',
    name: 'Kitsune Ribbon',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+10% run speed, +2500 Energy, and +7% HP regen.',
    howToGet: 'Turn in 15-20 Azure Embers at the Kitsune Shrine during Full Moon.'
  },
  {
    id: 'acc-pale-scarf',
    name: 'Pale Scarf',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+15% Sword & Fruit damage, +2 extra Instinct dodges, and 10x Instinct highlight range.',
    howToGet: '100% guaranteed drop from defeating Cake Prince or Dough King at Sea of Treats.'
  },
  {
    id: 'acc-dark-coat',
    name: 'Dark Coat',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 2,
    description: '+600 HP, +600 Energy, and +15% Fruit damage (Ultra rare 2% drop).',
    howToGet: 'Defeat Darkbeard (Blackbeard) raid boss at Dark Arena using Fist of Darkness.'
  },
  {
    id: 'acc-valkyrie-helm',
    name: 'Valkyrie Helm',
    category: 'accessories',
    rarity: 'Mythical',
    sea: 3,
    description: '+15% Sword, Melee, and Gun damage + +600 HP & Energy.',
    howToGet: 'Defeat rip_indra raid boss (True Form) at Castle on the Sea with top damage.'
  },
  {
    id: 'acc-swan-glasses',
    name: 'Swan Glasses',
    category: 'accessories',
    rarity: 'Legendary',
    sea: 2,
    description: '+8% universal damage, +8% defense, +8% cooldown reduction, and +25% sprint speed.',
    howToGet: 'Defeat Don Swan boss inside Swan Mansion basement in Second Sea (5% drop).'
  },
  {
    id: 'acc-cupid-coat',
    name: 'Cupid Coat (Limited Event)',
    category: 'accessories',
    rarity: 'Legendary',
    sea: 'All',
    description: '+12.5% Fruit & Gun damage, +600 HP, +400 Energy, and +10% HP regen.',
    howToGet: 'Purchased for 1,000 Hearts from the Valentine Event shop in Middle Town (Limited).'
  },
  {
    id: 'acc-santa-hat',
    name: 'Santa Hat (Christmas Event)',
    category: 'accessories',
    rarity: 'Legendary',
    sea: 'All',
    description: '+12.5% Sword & Fruit damage, +400 HP, +400 Energy, and +30% run speed.',
    howToGet: 'Purchased for 500 Candies from Santa Claus NPC at North Pole during Christmas event.'
  },

  // ==========================================
  // FRUIT AWAKENINGS
  // ==========================================
  {
    id: 'awk-dough',
    name: 'Awakened Dough (Mochi V2)',
    category: 'awakenings',
    rarity: 'Mythical',
    sea: 3,
    description: 'Top PvP fruit with unstoppable Restless Dough Barrage and Dough Fist Fusillade.',
    howToGet: 'Defeat Dough King with Cake Chalice + 500 enemies defeated to unlock Dough Raid chip from Cake Scientist (requires 18,500 Frags to fully awaken).'
  },
  {
    id: 'awk-buddha',
    name: 'Awakened Buddha (Daibutsu V2)',
    category: 'awakenings',
    rarity: 'Legendary',
    sea: 2,
    description: 'The #1 grinding and raid solo fruit with +50% damage reduction and massive M1 reach.',
    howToGet: 'Complete Buddha Raids at Hot & Cold or Castle on the Sea (requires 14,500 Frags to fully awaken; Z Shift alone needs 500 Frags).'
  },
  {
    id: 'awk-magma',
    name: 'Awakened Magma (Magu V2)',
    category: 'awakenings',
    rarity: 'Legendary',
    sea: 2,
    description: 'Highest raw DPS in the entire game, walking on water passive, and Sea Beast killer.',
    howToGet: 'Complete Magma Raids (14,500 Frags for all 5 skills: Magma Shower, Volcanic Storm, Great Yamata).'
  },
  {
    id: 'awk-rumble',
    name: 'Awakened Rumble (Goro V2)',
    category: 'awakenings',
    rarity: 'Mythical',
    sea: 2,
    description: 'Colossal electric stuns, multi-teleports, and massive Thunderstorm combo chains.',
    howToGet: 'Complete Rumble Raids (requires 14,500 Frags for all 5 skills).'
  },
  {
    id: 'awk-light',
    name: 'Awakened Light (Pika V2)',
    category: 'awakenings',
    rarity: 'Legendary',
    sea: 2,
    description: 'Hypersonic steerable flight and blinding laser barages.',
    howToGet: 'Complete Light Raids (14,500 Frags to fully awaken).'
  },
  {
    id: 'awk-ice',
    name: 'Awakened Ice (Hie V2)',
    category: 'awakenings',
    rarity: 'Rare',
    sea: 2,
    description: 'Walking on water passive with Absolute Zero ground stuns.',
    howToGet: 'Complete Ice Raids (14,500 Frags to fully awaken).'
  },
  {
    id: 'awk-flame',
    name: 'Awakened Flame (Mera V2)',
    category: 'awakenings',
    rarity: 'Rare',
    sea: 2,
    description: 'Classic fire fist with massive fire columns and soaring flight.',
    howToGet: 'Complete Flame Raids (14,500 Frags to fully awaken).'
  },
  {
    id: 'awk-dark',
    name: 'Awakened Dark (Yami V2)',
    category: 'awakenings',
    rarity: 'Rare',
    sea: 2,
    description: 'Infinite combo stun chains with Dark Void black hole pull.',
    howToGet: 'Complete Dark Raids (14,500 Frags to fully awaken).'
  },
  {
    id: 'awk-quake',
    name: 'Awakened Quake (Gura V2)',
    category: 'awakenings',
    rarity: 'Legendary',
    sea: 2,
    description: 'Tsunami waves and colossal screen-shaking seismic tremors.',
    howToGet: 'Complete Quake Raids (17,000 Frags to fully awaken).'
  },
  {
    id: 'awk-spider',
    name: 'Awakened Spider (String V2)',
    category: 'awakenings',
    rarity: 'Legendary',
    sea: 2,
    description: 'Multi-thread slicing cage and Ultimate String Prison.',
    howToGet: 'Complete Spider Raids (17,000 Frags to fully awaken).'
  },
  {
    id: 'awk-sand',
    name: 'Awakened Sand (Suna V2)',
    category: 'awakenings',
    rarity: 'Rare',
    sea: 2,
    description: 'Desert sand blades, heavy stuns, and flying tornadoes.',
    howToGet: 'Complete Sand Raids (14,500 Frags to fully awaken).'
  },
  {
    id: 'awk-phoenix',
    name: 'Awakened Phoenix (Tori V2)',
    category: 'awakenings',
    rarity: 'Mythical',
    sea: 3,
    description: 'Healing flames, teammates healing aura, and blazing bird form.',
    howToGet: 'Get 400 Mastery on Phoenix, buy Phoenix Microchip from Sick Scientist for 1,000 Frags or 1M+ fruit, complete Phoenix Raid (18,500 Frags total).'
  },

  // ==========================================
  // PRESTIGIOUS TITLES
  // ==========================================
  {
    id: 'title-berserker',
    name: 'Title #013: "Berserker" (Human V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Human Race V4 in Temple of Time.',
    howToGet: 'Unlock Human V4 and complete training trials.',
    badgeCode: '#013'
  },
  {
    id: 'title-leviathan-race',
    name: 'Title #015: "Leviathan" (Shark V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Shark Race V4 in Temple of Time.',
    howToGet: 'Unlock Shark V4 and complete training trials.',
    badgeCode: '#015'
  },
  {
    id: 'title-genesis',
    name: 'Title #018: "Genesis" (Cyborg V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Cyborg Race V4 in Temple of Time.',
    howToGet: 'Unlock Cyborg V4 and complete training trials.',
    badgeCode: '#018'
  },
  {
    id: 'title-his-majesty',
    name: 'Title #016: "His Majesty" (Angel V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Angel Race V4 in Temple of Time.',
    howToGet: 'Unlock Angel V4 and complete training trials.',
    badgeCode: '#016'
  },
  {
    id: 'title-nightwalker',
    name: 'Title #017: "Nightwalker" (Ghoul V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Ghoul Race V4 in Temple of Time.',
    howToGet: 'Unlock Ghoul V4 and complete training trials.',
    badgeCode: '#017'
  },
  {
    id: 'title-thunderbolt',
    name: 'Title #014: "Thunderbolt" (Mink V4)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for awakening the final stage of Mink Race V4 in Temple of Time.',
    howToGet: 'Unlock Mink V4 and complete training trials.',
    badgeCode: '#014'
  },
  {
    id: 'title-emperor-sea',
    name: 'Title #022: "Emperor of the Sea" (20M Bounty)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 'All',
    description: 'Awarded to supreme pirate lords who reach 20 Million Pirate Bounty.',
    howToGet: 'Reach 20,000,000 Pirate Bounty in PvP.',
    badgeCode: '#022'
  },
  {
    id: 'title-fleet-admiral',
    name: 'Title #025: "Fleet Admiral" (20M Honor)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 'All',
    description: 'Awarded to supreme Marine officers who reach 20 Million Marine Honor.',
    howToGet: 'Reach 20,000,000 Marine Honor in PvP.',
    badgeCode: '#025'
  },
  {
    id: 'title-bread-chaser',
    name: 'Title #042: "Bread Chaser" (Awakened Dough)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for unlocking all moves on Awakened Dough.',
    howToGet: 'Fully awaken all 5 Dough moves.',
    badgeCode: '#042'
  },
  {
    id: 'title-shadow-sovereign',
    name: 'Title #162: "Shadow Sovereign" (Defeat rip_indra)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for slaying the True Form of raid boss rip_indra.',
    howToGet: 'Defeat rip_indra at Castle on the Sea.',
    badgeCode: '#162'
  },
  {
    id: 'title-dough-king',
    name: 'Title #172: "Dough King" (Defeat Dough King)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for defeating Dough King inside the Mirror Dimension.',
    howToGet: 'Summon and defeat Dough King at Sea of Treats.',
    badgeCode: '#172'
  },
  {
    id: 'title-serpent-slayer',
    name: 'Title #174: "Serpent Slayer" (Defeat Leviathan)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for conquering the colossal Leviathan in the Frozen Dimension (Sea Danger 6).',
    howToGet: 'Defeat Leviathan boss in Third Sea.',
    badgeCode: '#174'
  },
  {
    id: 'title-hakaishin',
    name: 'Title #147: "Hakaishin" (All Aura Colors)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 'All',
    description: 'Awarded for owning all regular and legendary Buso Haki aura colors.',
    howToGet: 'Collect all Aura Colors from the Master of Auras.',
    badgeCode: '#147'
  },
  {
    id: 'title-dog',
    name: 'Title #081: "The Dog" (Secret Doghouse)',
    category: 'titles',
    rarity: 'Legendary',
    sea: 2,
    description: 'Secret Easter Egg title from talking to the doghouse in Kingdom of Rose.',
    howToGet: 'Interact with the doghouse outside the mansion in Second Sea.',
    badgeCode: '#081'
  },
  {
    id: 'title-slayer-of-god',
    name: 'Title #148: "Slayer of God" (Dark Blade Secret)',
    category: 'titles',
    rarity: 'Mythical',
    sea: 3,
    description: 'Awarded for solving the secret graveyard puzzle with Dark Blade.',
    howToGet: 'Interact with the secret gravestone while holding Dark Blade V2/V3.',
    badgeCode: '#148'
  },

  // ==========================================
  // SEA & ACCOUNT MILESTONES
  // ==========================================
  {
    id: 'mile-sea2',
    name: 'Second Sea Unlocked (Level 700+)',
    category: 'milestones',
    rarity: 'Rare',
    sea: 1,
    description: 'Completed the First Sea adventure, defeated Ice Admiral, and sailed to Kingdom of Rose.',
    howToGet: 'Level 700 + Military Detective quest at Prison + defeat Ice Admiral at Frozen Village.'
  },
  {
    id: 'mile-sea3',
    name: 'Third Sea Unlocked (Level 1500+)',
    category: 'milestones',
    rarity: 'Legendary',
    sea: 2,
    description: 'Defeated Don Swan, completed Colosseum quest, and sailed to Port Town.',
    howToGet: 'Level 1500 + defeat Don Swan + talk to King Red Head at Colosseum + defeat rip_indra at Green Zone.'
  },
  {
    id: 'mile-max-level',
    name: 'Max Level 2550 Reached',
    category: 'milestones',
    rarity: 'Mythical',
    sea: 3,
    description: 'Achieved the maximum level cap of 2550 with 7,650 maximum stat points allocated.',
    howToGet: 'Grind through Tiki Outpost quests to reach level 2550.'
  },
  {
    id: 'mile-blue-gear',
    name: 'Blue Gear Found (Mirage Island Full Moon)',
    category: 'milestones',
    rarity: 'Mythical',
    sea: 3,
    description: 'Stared at the Full Moon on Mirage Island peak for 15s with Mirror Fractal and collected the Blue Gear.',
    howToGet: 'Spawn Mirage Island during Full Moon, activate V3, look at moon for 15s, and locate glowing Blue Gear.'
  },
  {
    id: 'mile-mirror-fractal',
    name: 'Mirror Fractal Obtained',
    category: 'milestones',
    rarity: 'Mythical',
    sea: 3,
    description: 'Prerequisite item for Race V4 awakening from defeating Dough King.',
    howToGet: 'Defeat Dough King at Sea of Treats (100% drop).'
  },
  {
    id: 'mile-instinct-v2',
    name: 'Instinct V2 Unlocked (Observation V2)',
    category: 'milestones',
    rarity: 'Mythical',
    sea: 3,
    description: 'Enables seeing enemy fighting style, fruit, sword, gun, and exact HP & Energy numbers.',
    howToGet: 'Level 1800+, 5000 Instinct V1 EXP, complete Hungry Man quest (Apple, Banana, Pineapple + Citizen Hat) for $5M Beli & 5,000 Frags.'
  }
];
