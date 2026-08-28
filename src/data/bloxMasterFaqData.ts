export interface FaqQuestionEntry {
  id: string;
  categoryNumber: number;
  categoryName: string;
  question: string;
  aliases: string[];
  shortAnswer: string;
  fullAnswer: string;
  gearExplanation?: string;
  prerequisites?: string;
  location?: string;
  npc?: string;
  cost?: string;
  tags: string[];
}

export interface RaceV4GearGuide {
  raceId: string;
  raceName: string;
  trialName: string;
  trialObjective: string;
  gear1: { name: string; costFrags: number; trainingSessions: number; description: string };
  gear2: { name: string; costFrags: number; trainingSessions: number; tierOptions: { branchA: string; branchB: string }; description: string };
  gear3: { name: string; costFrags: number; trainingSessions: number; tierOptions: { branchA: string; branchB: string }; description: string };
  gear4: { name: string; costFrags: number; trainingSessions: number; tierOptions: { branchA: string; branchB: string }; description: string };
  gear5: { name: string; costFrags: number; trainingSessions: number; description: string };
  metaPvPVerdict: string;
  metaGrindVerdict: string;
}

export const RACE_V4_GEAR_DATA: RaceV4GearGuide[] = [
  {
    raceId: 'cyborg',
    raceName: 'Cyborg V4',
    trialName: 'Trial of Machines',
    trialObjective: 'Survive and dodge homing explosive missiles inside the machine chamber for 60 seconds without dying.',
    gear1: {
      name: 'Awakening Core & Red Base Gear',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation (Press Y when Awakening meter is full). Grants enhanced stat boosts, electric jumps, and +15% damage reduction.'
    },
    gear2: {
      name: 'Energy Control Gear (Tier 1)',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '⚡ Energy Overflow: Dealing or taking damage continuously generates massive electric shockwaves that break enemy Instinct/Ken.',
        branchB: '🔋 Supercharged Battery: Converts 15% of all incoming damage into instant energy regeneration and defense shield.'
      },
      description: 'Choose Branch A for aggressive PvP Ken-breaking or Branch B for immortal energy sustain against multi-hit combo users.'
    },
    gear3: {
      name: 'Supercharged Thruster & Overclock (Tier 2)',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '🚀 Hyper Dash Thruster: Flash Steps leave electric fields that stun opponents behind you and launch you 2x further.',
        branchB: '⚙️ Overclock Shielding: Reduces stun duration from incoming combo starters by 40%.'
      },
      description: 'Grants high mobility and heavy crowd control against aggressive rushers like Portal and Kitsune.'
    },
    gear4: {
      name: 'Arcing Lightning Storm (Tier 3)',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '🌩️ Chain Lightning Tier 2: Electric bolts arc to up to 4 nearby players or NPCs simultaneously, interrupting their moves.',
        branchB: '🛡️ Core EMP Blast: Transforming immediately emits a colossal EMP blast disabling nearby player movement skills for 2.5s.'
      },
      description: 'The definitive anti-team and anti-Ken gear in competitive Blox Fruits crew wars.'
    },
    gear5: {
      name: 'Ancient Clock Resonation (Max Mastery)',
      costFrags: 3000,
      trainingSessions: 12,
      description: 'Maxes out transformation duration to 90 seconds and reduces Awakening meter build-up requirement by 35%.'
    },
    metaPvPVerdict: 'SS+ Tier: Best counter to Buddha, Portal, and Shark users due to unstoppable chain lightning Ken breaks.',
    metaGrindVerdict: 'S Tier: Massive AoE electric damage that wipes clustered mob groups without needing skills.'
  },
  {
    raceId: 'shark',
    raceName: 'Shark (Fishman) V4',
    trialName: 'Trial of Water',
    trialObjective: 'Defeat the summoned Sea Beast inside the underwater arena before the 60-second timer runs out.',
    gear1: {
      name: 'Leviathan Water Core (Base Gear)',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation. 100% water immunity, infinite swimming speed, and base Leviathan Water Armor.'
    },
    gear2: {
      name: 'Whirlpool & Shield Tier 1',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '🌊 Leviathan Armor: Generates a regenerating super-shield absorbing up to 5,000 extra damage before your HP bar is touched.',
        branchB: '🌀 Whirlpool Aura: Creates a water aura around you that severely slows enemy movement speed and pulls them into melee range.'
      },
      description: 'Branch A makes you practically unkillable in 1v1s; Branch B makes escape impossible for runners.'
    },
    gear3: {
      name: 'Depth Pressure & Hydro Armor Tier 2',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '🛡️ Reinforced Hydro Shield: Shield regenerates 50% faster while standing still or blocking.',
        branchB: '💧 Tidal Drag: Hitting enemies with M1 or skills drains 20% of their dash stamina and locks their Geppo jumps.'
      },
      description: 'Dominates the current meta by shutting down high-mobility fruits.'
    },
    gear4: {
      name: 'Tsunami Overdrive Tier 3',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '🌊 Leviathan Fortification Max: Armor capacity expanded to 8,500 HP; grants full immunity to knockback.',
        branchB: '🌪️ Torrential Vortex: Whirlpool slow stacks up to 70% movement reduction and disables enemy Flash Step.'
      },
      description: 'Transforms you into a walking raid boss in PvP.'
    },
    gear5: {
      name: 'Ocean Deity Clock Mastery',
      costFrags: 3000,
      trainingSessions: 12,
      description: 'Max duration 90s. Regenerates 5% HP every 3 seconds while active.'
    },
    metaPvPVerdict: 'SS+ Tier: The most universally banned or feared race in bounty hunting due to extreme survivability.',
    metaGrindVerdict: 'SS+ Tier: Total sea event dominance (Leviathan, Terrorshark, Sea Beasts).'
  },
  {
    raceId: 'angel',
    raceName: 'Angel (Skypiean) V4',
    trialName: 'Trial of Skies',
    trialObjective: 'Complete a vertical obstacle course of floating cloud pillars within 60 seconds without falling.',
    gear1: {
      name: 'Prince of the Skies Core',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation with golden wings. Grants infinite air glide, double flight speed, and base Holy Aura.'
    },
    gear2: {
      name: 'Divine Aura & Seraphic Wings Tier 1',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '✨ Aura of Stun (King’s Rule): Enemies stepping inside your golden ring are repeatedly stunned and lose 50 energy per second.',
        branchB: '🕊️ Seraphic Flight: Press Spacebar to enter high-speed 3D flight in any direction without stamina cost.'
      },
      description: 'Branch A provides passive free combo starters just by standing near the enemy.'
    },
    gear3: {
      name: 'Heavenly Judgement Tier 2',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '⚡ Divine Beam Pulse: Holy ring emits blinding holy rays that disable opponent camera lock and reduce their vision.',
        branchB: '💖 Heavenly Restoration: Automatically regenerates 30% of max health whenever taking lethal burst damage.'
      },
      description: 'Provides immense defensive counter-play against one-shot combo builds.'
    },
    gear4: {
      name: 'Godly Ascension Tier 3',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '👑 Imperial Aura Max: Stun radius expanded by 60%; breaks Ken immediately when entered.',
        branchB: '🪽 Archangel Glide: Flight speed increased by 100%; grants projectile reflection while gliding.'
      },
      description: 'The top choice for aerial combat fruit mains (Dragon, Leopard, Kitsune).'
    },
    gear5: {
      name: 'Divine Clock Mastery',
      costFrags: 3000,
      trainingSessions: 12,
      description: 'Extends V4 timer to 90s and reduces awakening cooldown.'
    },
    metaPvPVerdict: 'SS Tier: Lethal passive stun field that cancels enemy attacks and enables true infinite combos.',
    metaGrindVerdict: 'S Tier: Rapid island-to-island flight and easy boss juggles.'
  },
  {
    raceId: 'human',
    raceName: 'Human V4',
    trialName: 'Trial of Strength',
    trialObjective: 'Defeat your exact dark shadow clone in 1v1 combat in under 60 seconds.',
    gear1: {
      name: 'Limit Break & Psycho Core',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation. Spawns Psycho Aura and fills the Rage Meter when dealing or receiving damage.'
    },
    gear2: {
      name: 'Psycho Flash Step & Rage Tier 1',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '🩸 Pure Rage Boost: Increases all damage output by up to +120% as your Rage Meter fills to max.',
        branchB: '⚡ Psycho Dash: Flash Step has zero cooldown and can be chained indefinitely to teleport across the map.'
      },
      description: 'Branch A gives the highest damage multiplier in the entire game; Branch B gives unmatched teleportation.'
    },
    gear3: {
      name: 'Berserker Drive Tier 2',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '💥 Lethal Blows: At Max Rage, your attacks pierce through all enemy armor and bypass Shark V3 defense.',
        branchB: '💨 Phantom Teleport: Flash stepping behind an enemy automatically auto-aims your next M1 or skill.'
      },
      description: 'The undisputed king of 1-second one-shot combos.'
    },
    gear4: {
      name: 'Ultimate Destructive Aura Tier 3',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '🔥 Absolute Rage (Max +150% Damage): Turns basic M1s into 4,000+ damage nuclear hits.',
        branchB: '⚡ Psycho Blitz: Chaining 3 Flash Steps creates a vacuum that pulls all nearby targets into your hitbox.'
      },
      description: 'Permits deleting 30M bounty players with just 2 skills (e.g. CDK Z + Godhuman C).'
    },
    gear5: {
      name: 'Mortal Transcendence Clock Mastery',
      costFrags: 3000,
      trainingSessions: 12,
      description: '90-second duration and permanent 1.25x base movement speed.'
    },
    metaPvPVerdict: 'SS+ Tier: Highest damage ceiling in Blox Fruits. Best for skilled sword and fighting style mains.',
    metaGrindVerdict: 'S Tier: Eradicates bosses in seconds.'
  },
  {
    raceId: 'ghoul',
    raceName: 'Ghoul V4',
    trialName: 'Trial of Carnage',
    trialObjective: 'Defeat waves of ravenous zombie horde mobs inside the graveyard arena within 60 seconds.',
    gear1: {
      name: 'Domain of Darkness Core',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation. Spawns the Crimson Nightfield and grants 15% lifesteal on all damage.'
    },
    gear2: {
      name: 'Blindness Sphere & Blood Crows Tier 1',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '🌑 Eclipse Blindness: Spawns a sphere of deep shadow that turns the opponent screen pitch black and disables their Ken.',
        branchB: '🦅 Blood Crow Swarm: Hordes of crows automatically attack nearby enemies, dealing damage and restoring your health.'
      },
      description: 'Branch A completely disorients enemies; Branch B gives passive DPS and continuous lifesteal.'
    },
    gear3: {
      name: 'Cooldown Siphon Tier 2',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '⏳ Cooldown Drain: When hitting blinded enemies, your skill cooldowns are reduced by an extra 40%.',
        branchB: '🩸 Sanguine Leech: Increases lifesteal to 25% of all physical, sword, and fruit damage dealt.'
      },
      description: 'Enables continuous skill spamming with zero downtime.'
    },
    gear4: {
      name: 'Abyssal Dominance Tier 3',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '🦇 Eternal Night Dome: Blindness field covers entire battlefield; enemies cannot see their own character or hotbar.',
        branchB: '🩸 Ravenous Vampire: Grants over-healing shield that converts excess lifesteal into extra temporary HP.'
      },
      description: 'Extremely toxic in close-range spam combos with Buddha, Sanguine Art, or Venom.'
    },
    gear5: {
      name: 'Undead Clock Mastery',
      costFrags: 3000,
      trainingSessions: 12,
      description: '90s duration and instant skill reset upon transforming.'
    },
    metaPvPVerdict: 'S+ Tier: Devastating close-range lock and disorientation; enemies literally cannot see where you are.',
    metaGrindVerdict: 'SS+ Tier: Infinite lifesteal makes dying to raid bosses or mob groups impossible.'
  },
  {
    raceId: 'mink',
    raceName: 'Mink (Rabbit) V4',
    trialName: 'Trial of Speed',
    trialObjective: 'Navigate a fast-paced maze filled with moving traps and checkpoints in under 60 seconds.',
    gear1: {
      name: 'Lightning Cloak Core',
      costFrags: 1000,
      trainingSessions: 3,
      description: 'Activates base V4 transformation. 250% base movement speed, electric dash trails, and infinite Geppo hops.'
    },
    gear2: {
      name: 'Electro Tornadoes & Speed Drift Tier 1',
      costFrags: 1500,
      trainingSessions: 5,
      tierOptions: {
        branchA: '🌪️ Lightning Tornadoes: Moving or dashing leaves behind electric cyclones that trap, spin, and stun pursuers.',
        branchB: '⚡ Hyper Dash: Dashes phase through enemy attacks with 0.5s of true invulnerability.'
      },
      description: 'Branch A punishes aggressive chasers; Branch B gives invincible i-frames.'
    },
    gear3: {
      name: 'Static Overcharge Tier 2',
      costFrags: 2000,
      trainingSessions: 7,
      tierOptions: {
        branchA: '⚡ Electro-Stun Fields: Cyclones linger for 8 seconds and continuously discharge Ken-breaking shocks.',
        branchB: '🚀 Supersonic Momentum: Sprinting past enemies automatically inflicts 15% defense debuff for 4 seconds.'
      },
      description: 'Best hit-and-run gameplay in Blox Fruits history.'
    },
    gear4: {
      name: 'God of Lightning Tier 3',
      costFrags: 2500,
      trainingSessions: 10,
      tierOptions: {
        branchA: '🌪️ Cataclysmic Vortex: Spawns 3 tracking super-cyclones when you activate transformation.',
        branchB: '⚡ Thunder God Velocity: Movement speed is uncapped; camera blurs and opponent lock-on fails.'
      },
      description: 'No other player can catch you or run away from you.'
    },
    gear5: {
      name: 'Speed of Sound Clock Mastery',
      costFrags: 3000,
      trainingSessions: 12,
      description: '90s duration and zero stamina consumption for all mobility actions.'
    },
    metaPvPVerdict: 'S Tier: Unmatchable mobility and escape velocity; amazing with gun mains (Soul Guitar, Acidum Rifle).',
    metaGrindVerdict: 'S Tier: Run across entire islands in 3 seconds.'
  }
];

export const BLOX_MASTER_FAQ: FaqQuestionEntry[] = [
  // ==========================================
  // CATEGORY 1: WORLD NAVIGATION & LEVEL THRESHOLDS
  // ==========================================
  {
    id: 'c1-reach-sea-2',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I reach the Second Sea (Sea 2)?',
    aliases: ['reach sea 2', 'unlock sea 2', 'how to get to sea 2', 'sea 2 requirements', 'go to second sea'],
    shortAnswer: 'Reach Level 700, talk to the Military Detective at Prison in First Sea, defeat Ice Admiral in Ice Castle, then talk to Experienced Captain at Middle Town.',
    fullAnswer: `🌊 **Step-by-Step Guide to Reach Second Sea (Sea 2):**\n\n` +
      `1. **Level Requirement:** Reach **Level 700+** in the First Sea.\n` +
      `2. **Talk to Detective:** Go to the **Prison** island and speak with the **Military Detective** standing in the center courtyard.\n` +
      `3. **Get Key:** He will hand you a **Key**.\n` +
      `4. **Unlock Ice Castle Cave:** Travel to **Frozen Village**. Go to the ability teacher cave near the docks. In the back wall, find the brown wooden door and hold the key to unlock it.\n` +
      `5. **Defeat Ice Admiral:** Enter the room and defeat the **Ice Admiral (Lv 700)** boss.\n` +
      `6. **Return to Detective:** Head back to the Military Detective at Prison. He tells you Don Swan has fled to the Second Sea.\n` +
      `7. **Sail to Sea 2:** Go to **Middle Town** and talk to the **Experienced Captain** NPC standing on the docks. Select "Take me to Second Sea" to teleport!`,
    prerequisites: 'Level 700',
    location: 'Prison & Frozen Village -> Middle Town Docks',
    npc: 'Military Detective & Experienced Captain',
    tags: ['sea 2', 'progression', 'level 700', 'experienced captain', 'ice admiral']
  },
  {
    id: 'c1-reach-sea-3',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I get to the Third Sea (Sea 3)?',
    aliases: ['reach sea 3', 'unlock sea 3', 'how to get to sea 3', 'sea 3 requirements', 'go to third sea', 'level for sea 3'],
    shortAnswer: 'Reach Level 1500, complete Bartilo Quest in Café, defeat Don Swan in Mansion, defeat rip_indra at Dark Arena, then talk to Mr. Captain at Green Zone.',
    fullAnswer: `🗺️ **Step-by-Step Guide to Reach Third Sea (Sea 3):**\n\n` +
      `1. **Level Requirement:** Reach **Level 1500+** in the Second Sea.\n` +
      `2. **Complete Bartilo Quest:** Talk to Bartilo at Café (Defeat 50 Swan Pirates, defeat Jeremy, and solve the Colosseum plate puzzle).\n` +
      `3. **Unlock Don Swan’s Room:** Go to the Mansion in Kingdom of Rose. Hand **Trevor** any physical Blox Fruit worth **$1,000,000+ Beli** (e.g. Quake, Love, Spider, Pain).\n` +
      `4. **Defeat Don Swan:** Enter the double doors and defeat **Don Swan (Lv 1000)**.\n` +
      `5. **King Red Head & Indra Cutscene:** Head to the **Colosseum**, drop into the underground prison cells, and talk to **King Red Head**. Defeat **rip_indra** in the arena cutscene.\n` +
      `6. **Sail to Third Sea:** Travel to **Green Zone docks** and speak with **Mr. Captain**. Confirm travel to arrive at Port Town in the Third Sea!`,
    prerequisites: 'Level 1500, Bartilo Quest, $1M+ Fruit for Trevor',
    location: 'Café -> Mansion -> Colosseum -> Green Zone',
    npc: 'Bartilo, Trevor, King Red Head, Mr. Captain',
    tags: ['sea 3', 'progression', 'level 1500', 'don swan', 'rip_indra', 'mr captain']
  },
  {
    id: 'c1-mirage-island-location',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I reach Mirage Island?',
    aliases: ['how to reach mirage island', 'where is mirage island', 'mirage island spawn', 'find mirage island', 'mirage spawn sea 3'],
    shortAnswer: 'Sail a boat in Third Sea into Danger Levels 4, 5, or 6 (preferably Danger 5/6) and wait for the dynamic sea event to spawn the island from the fog.',
    fullAnswer: `🌫️ **How to Spawn and Reach Mirage Island:**\n\n` +
      `• **Location:** Third Sea outer waters (Tiki Outpost / Port Town sea).\n` +
      `• **Danger Level:** Sail into **Danger Level 4, 5, or 6** (Danger 5 has the optimal spawn rate with manageable sea beasts).\n` +
      `• **Spawn Mechanics:** Mirage Island is a randomized Sea Event. It takes between **10 to 45 minutes of sailing** across the open ocean to trigger.\n` +
      `• **Requirements for Full Moon:** If you want Blue Gear for Race V4, track the day/night cycle. If a Full Moon is active when Mirage spawns, climb the highest peak, activate Race V3 ability, look at the moon for 15 seconds until it shines, and search the foggy ground for the glowing **Blue Gear**!`,
    location: 'Third Sea Ocean (Danger Zone 4-6)',
    tags: ['mirage island', 'v4', 'blue gear', 'full moon', 'danger level 5']
  },
  {
    id: 'c1-temple-of-time-location',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'Where is the Temple of Time located?',
    aliases: ['where is temple of time', 'temple of time location', 'reach temple of time', 'temple of time v4', 'how to enter temple of time'],
    shortAnswer: 'Located atop the Great Tree in Third Sea. Talk to the Sealed King NPC at the very peak after obtaining Mirror Fractal and Blue Gear to enter the dimensional door.',
    fullAnswer: `🏛️ **Temple of Time Location & Access:**\n\n` +
      `• **Location:** **Great Tree Island** in the Third Sea.\n` +
      `• **How to Reach:** Fly or climb to the highest golden canopy branch of the Great Tree. At the peak, you will find a golden dimensional portal and the **Sealed King / Mysterious Force** NPC.\n` +
      `• **Entry Requirement:** You must have acquired the **Mirror Fractal** (from defeating Dough King or Cake Prince) and resonated with the moon on Mirage Island using **Blue Gear**.\n` +
      `• **Inside the Temple:** Inside lies the giant Ancient Clock, the lever wall puzzle, the Ancient One NPC, and the 6 race trial doors (Machine, Water, Skies, Strength, Carnage, Speed).`,
    location: 'Third Sea -> Peak of Great Tree',
    npc: 'Sealed King / Ancient One',
    tags: ['temple of time', 'great tree', 'v4', 'sealed king', 'race trials']
  },
  {
    id: 'c1-underwater-city-location',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'Where is the Underwater City entrance in Sea 1?',
    aliases: ['underwater city entrance', 'where is underwater city', 'find underwater city sea 1', 'how to get to underwater city'],
    shortAnswer: 'Located between Frozen Village and Marine Fortress. Look for the small stone whirlpool / cage in the ocean and swim down into the teleport vortex.',
    fullAnswer: `🌊 **How to Find the Underwater City Entrance (First Sea):**\n\n` +
      `1. Sail your boat between **Frozen Village** and **Marine Fortress**.\n` +
      `2. Look for three small rocky pillars and a whirlpool / stone gate submerged just beneath the surface.\n` +
      `3. Swim directly into the glowing blue teleport vortex.\n` +
      `4. You will instantly load inside **Underwater City (Lv 375 - 450)** where Fishman Lord boss and the **Water Kung Fu ($750,000)** teacher are located!`,
    location: 'First Sea ocean between Frozen Village and Marine Fortress',
    npc: 'Water Kung Fu Teacher',
    tags: ['underwater city', 'water kung fu', 'fishman lord', 'sea 1']
  },
  {
    id: 'c1-upper-skylands-location',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I get to Upper Skylands?',
    aliases: ['how to get to upper skylands', 'upper skylands entrance', 'reach upper sky', 'break cloud door'],
    shortAnswer: 'Fly to the top of Lower Skylands, find the giant beanstalk or cloud pillar, and use an explosive skill (or Flash Step) to break the wooden door at the cloud temple.',
    fullAnswer: `☁️ **Reaching Upper Skylands:**\n\n` +
      `1. Travel to **Skylands (Lv 150)**.\n` +
      `2. Jump or fly up to the highest floating island with the temple ruins.\n` +
      `3. Look for the giant **Beanstalk** reaching up into the stratosphere.\n` +
      `4. Follow the beanstalk up to the upper cloud layer (Lv 450 - 575 area) to fight God’s Guards, Enel (Thunder God), and buy **Instinct / Observation Haki** from Lord of Destruction for $750,000!`,
    location: 'First Sea -> Skylands Beanstalk',
    npc: 'Lord of Destruction & Electro Teacher',
    tags: ['skylands', 'upper skylands', 'instinct', 'enel', 'beanstalk']
  },
  {
    id: 'c1-mansion-sea-2',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I reach the Mansion in Sea 2?',
    aliases: ['mansion in sea 2', 'where is mansion sea 2', 'reach mansion kingdom of rose', 'don swan mansion'],
    shortAnswer: 'Located on the highest plateau of Kingdom of Rose, directly behind the giant mountain wall above the Café.',
    fullAnswer: `🏰 **Reaching the Mansion in Second Sea:**\n\n` +
      `• Follow the main road from the Café up the massive plateau stairs towards the summit.\n` +
      `• The giant luxury yellow-roofed Mansion sits at the top.\n` +
      `• Inside is **Trevor**, the **Don Swan** boss chamber, and the luxury balcony overlooking Kingdom of Rose.`,
    location: 'Second Sea -> Kingdom of Rose Plateau',
    tags: ['mansion', 'sea 2', 'trevor', 'don swan']
  },
  {
    id: 'c1-submerged-island',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I find Submerged Island & Underwater Dimension in Sea 3?',
    aliases: ['find submerged island', 'underwater dimension sea 3', 'frozen dimension leviathan'],
    shortAnswer: 'Submerged Island and the Frozen Dimension are found in Danger Level 6 out past Tiki Outpost. Talk to the Spy at Tiki Outpost to bribe information and track sea anomalies.',
    fullAnswer: `🌊 **Finding Submerged Island & Frozen Dimension:**\n\n` +
      `• Sail out from **Tiki Outpost** into the extreme ocean (Danger Level 6).\n` +
      `• Talk to **The Spy** NPC at the top of Tiki Outpost tower and pay fragments to bribe clues about the **Leviathan** and submerged ruins.\n` +
      `• The Frozen Dimension gate appears as a massive icy rift in Danger 6 with 5+ players on a boat.`,
    location: 'Third Sea -> Danger Level 6 Beyond Tiki Outpost',
    npc: 'The Spy',
    tags: ['submerged island', 'frozen dimension', 'leviathan', 'tiki outpost']
  },
  {
    id: 'c1-castle-on-sea-haunted-castle',
    categoryNumber: 1,
    categoryName: 'World Navigation & Level Thresholds',
    question: 'How do I reach Castle on the Sea and Haunted Castle in Sea 3?',
    aliases: ['reach castle on the sea', 'where is castle on the sea', 'reach haunted castle', 'haunted castle entrance'],
    shortAnswer: 'Castle on the Sea is the central hub island in Third Sea with the giant fortress and portal room. Haunted Castle is the dark spooky ship-island with the cemetery and giant skull.',
    fullAnswer: `🏰 **Reaching Castle on the Sea & Haunted Castle:**\n\n` +
      `• **Castle on the Sea:** Located right in the center of Third Sea. Features the **Elite Hunter**, **Player Hunter**, **Raid Labs**, and **Portal Teleporters** to Hydra Island, Mansion, and Great Tree.\n` +
      `• **Haunted Castle (Lv 2000 - 2075):** Located northwest of Castle on the Sea. Accessible by boat or flying. Enter the giant skull mouth to reach the graveyard, Death King NPC, and Soul Reaper crypt.`,
    location: 'Third Sea Central Hub',
    tags: ['castle on the sea', 'haunted castle', 'death king', 'elite hunter']
  },

  // ==========================================
  // CATEGORY 2: DEVIL FRUITS (ACQUIRING, AWAKENING & TRADING)
  // ==========================================
  {
    id: 'c2-beginner-fruits',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I get fruits as a beginner in First Sea?',
    aliases: ['how do i get fruits as a beginner', 'beginner fruit guide', 'where to get first fruit', 'best beginner fruit'],
    shortAnswer: 'Roll at Blox Fruit Gacha (Jungle, Lv 50+), buy from Blox Fruit Dealer at Middle Town, or pick up random fruits spawning under trees every hour.',
    fullAnswer: `🍎 **How to Get Fruits as a Beginner:**\n\n` +
      `1. **Blox Fruit Gacha (Jungle Island):** Once you hit **Level 50**, talk to the Blox Fruit Gacha Cousin at Jungle. Pay Beli (cost scales with your level: ~$30k to $100k) to roll a random physical fruit every 2 hours!\n` +
      `2. **Blox Fruit Dealer:** Located at Starter Island, Middle Town, Café, and Mansion. Sells fruits for Beli or Robux on a 4-hour restocking rotation.\n` +
      `3. **Physical Fruit Spawns:** Every 60 minutes (45 min on weekends), a random fruit spawns under trees across the map. It despawns after 20 minutes.\n` +
      `4. **Top Starter Fruits to Aim For:** **Light** (fastest flight + sword M1 + Logia immunity), **Ice** (water walking + freeze M1), or **Magma** (highest damage).`,
    location: 'Jungle Island & Middle Town',
    npc: 'Blox Fruit Gacha & Blox Fruit Dealer',
    tags: ['beginner fruits', 'gacha', 'jungle', 'light fruit', 'dealer']
  },
  {
    id: 'c2-gacha-npc-location',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'Where is the Blox Fruit Gacha NPC located in all Seas?',
    aliases: ['where is blox fruit gacha', 'gacha npc location', 'fruit gacha sea 1 2 3', 'fruit dealer cousin location'],
    shortAnswer: 'Sea 1: Jungle Island near the bridge. Sea 2: Inside the Café safe zone. Sea 3: Castle on the Sea on the left side of the fortress courtyard.',
    fullAnswer: `🎲 **Blox Fruit Gacha (Cousin) NPC Locations:**\n\n` +
      `• **First Sea (Sea 1):** On **Jungle Island**, standing outside the wooden hut near the stone bridge.\n` +
      `• **Second Sea (Sea 2):** Inside the **Café** in Kingdom of Rose, right next to the fruit inventory safe and tables.\n` +
      `• **Third Sea (Sea 3):** At **Castle on the Sea**, standing in the left courtyard garden near the raid board.`,
    tags: ['gacha location', 'café', 'castle on the sea', 'jungle']
  },
  {
    id: 'c2-how-to-get-mythicals',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I get Mythical fruits like Dragon, Kitsune, Leopard, or Dough?',
    aliases: ['how to get mythical fruits', 'how to get dragon kitsune leopard', 'get kitsune fruit', 'get dough fruit'],
    shortAnswer: '1) Roll from Blox Fruit Gacha (0.5% - 1% chance), 2) Buy from Dealer when in stock, 3) Trade on trading tables, 4) Complete Factory Raids or Ship Raids for random fruit drops, 5) Collect Azure Embers at Kitsune Island.',
    fullAnswer: `👑 **How to Acquire Top Mythical Fruits:**\n\n` +
      `• **Gacha Rolls:** Roll every 2 hours from the Gacha NPC (Low ~0.8% chance per roll).\n` +
      `• **Blox Fruit Dealer Stock:** Check the stock rotation every 4 hours (Kitsune costs $8,000,000 Beli, Dragon costs $5,000,000 Beli, Leopard costs $5,000,000 Beli).\n` +
      `• **Player Trading:** The fastest guaranteed method. Trade in Second Sea (Café) or Third Sea (Mansion) using our live Trade Matrix to calculate fair value.\n` +
      `• **Kitsune Shrine Event:** Collect 20+ Azure Embers during Full Moon on Kitsune Island for a chance at a direct physical Kitsune fruit drop!\n` +
      `• **Factory Raid & Pirate Castle Raids:** Defeat Core or Tank at Castle on the Sea for a guaranteed physical fruit drop to the #1 damage dealer.`,
    tags: ['mythical fruits', 'kitsune', 'dragon', 'leopard', 'dough', 'trading']
  },
  {
    id: 'c2-perm-fruits-no-robux',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I get permanent fruits without Robux?',
    aliases: ['perm fruits without robux', 'free permanent fruits', 'get perm fruit free', 'trade for perm fruits'],
    shortAnswer: 'Trade physical high-demand Mythical fruits (like Dragon West/East, Kitsune, Dough, Leopard) on trading tables with players who buy and store permanent fruits in their inventory.',
    fullAnswer: `💎 **How to Get Permanent Fruits Without Spending Robux:**\n\n` +
      `• When players purchase a Permanent Fruit from the in-game shop, they can choose **"Store in Inventory"** instead of eating it.\n` +
      `• Stored Permanent Fruits become tradeable items on the trade tables in Second & Third Sea!\n` +
      `• **Strategy:** Farm high-value physical fruits (Dragon West = 3.5B, Kitsune = 640M, Dough = 180M) and bundle 4 of them together to trade for Perm Buddha, Perm Portal, Perm Magma, or Perm Kitsune!`,
    tags: ['perm fruits', 'free perm', 'trading', 'fruit values']
  },
  {
    id: 'c2-fruit-spawns-timers',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'Where and how often do physical fruits spawn under trees?',
    aliases: ['fruit spawn timer', 'how often do fruits spawn', 'where do fruits spawn', 'fruit tree spawn'],
    shortAnswer: 'Spawns once every 60 minutes on weekdays (every 45 minutes on weekends). Despawns after 20 minutes if uncollected. Spawns underneath random trees across all active islands.',
    fullAnswer: `🌳 **Fruit Spawn System & Timers:**\n\n` +
      `• **Weekday Spawn Timer:** Exactly every **60 minutes** after server initialization.\n` +
      `• **Weekend Spawn Timer:** Exactly every **45 minutes** on Saturdays & Sundays.\n` +
      `• **Despawn Timer:** Fruits despawn **20 minutes** after spawning if no player picks them up.\n` +
      `• **Spawn Locations:** Underneath trees on all standard islands.\n` +
      `• **Fruit Notifier Gamepass (2,700 Robux / 6B Trade Value):** Gives an on-screen tracking prompt with exact meter distance whenever a fruit spawns!`,
    tags: ['fruit spawns', 'timers', 'fruit notifier', 'tree spawns']
  },
  {
    id: 'c2-awaken-fruits-raids',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I awaken my fruit and host Fruit Raids?',
    aliases: ['how to awaken fruit', 'how to host fruit raid', 'awaken fruit moves', 'raid scientist location'],
    shortAnswer: 'Reach Level 1100, go to Hot and Cold (Sea 2) or Castle on the Sea (Sea 3), buy a Microchip from Raid Scientist ($100k Beli or any physical fruit), enter the pod, and finish the 5 raid islands to awaken moves in the Awakening Room.',
    fullAnswer: `🔮 **How to Awaken Your Fruit via Raids:**\n\n` +
      `1. **Level Requirement:** Host requirement is **Lv 1100+** (players Lv 700+ can join someone else’s raid).\n` +
      `2. **Raid Locations:**\n` +
      `   • **Second Sea:** **Hot and Cold** inside the lab tower.\n` +
      `   • **Third Sea:** **Castle on the Sea** inside the main fortress basement.\n` +
      `3. **Buy Microchip:** Talk to the **Mysterious Scientist** NPC. Buy for **$100,000 Beli** (2-hour cooldown) or trade **any physical fruit** (zero cooldown).\n` +
      `4. **Start Raid:** Stand on the yellow pod and press the green start button with the chip in hand.\n` +
      `5. **Clear 5 Islands:** Defeat all mob waves before the timer expires.\n` +
      `6. **Awakening Room:** You are teleported to the Awakening Room. Talk to the **Awakening Expert** to spend Fragments and awaken the next move in order (Z -> X -> C -> V -> F)!`,
    prerequisites: 'Level 1100, Microchip, Fragments',
    tags: ['awaken fruit', 'raids', 'fragments', 'microchip', 'mysterious scientist']
  },
  {
    id: 'c2-advanced-raids',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I unlock Advanced Raids (Dough Raid & Phoenix Raid)?',
    aliases: ['how to unlock dough raid', 'how to unlock phoenix raid', 'advanced raid unlock', 'dough microchip', 'phoenix microchip'],
    shortAnswer: 'Dough Raid: Defeat Dough King to get Red Key for Cake Scientist. Phoenix Raid: Get 400+ Mastery on Phoenix fruit and talk to Sick Scientist at Sea of Treats.',
    fullAnswer: `🍩 **Unlocking Advanced Raids (Dough & Phoenix):**\n\n` +
      `**Dough Raid:**\n` +
      `1. Summon and defeat the **Dough King** at Sea of Treats (requires Sweet Chalice + 500 mob kills).\n` +
      `2. Dough King drops the **Red Key** (100% drop).\n` +
      `3. Use the Red Key to unlock the secret door behind the Cake Land castle and talk to the **Cake Scientist**.\n` +
      `4. He will now permanently sell **Special Microchips** for 1,000 Fragments or a $1M+ fruit.\n\n` +
      `**Phoenix Raid:**\n` +
      `1. Level up your Phoenix fruit to **400+ Mastery**.\n` +
      `2. Talk to the **Sick Scientist** at Sea of Treats / Haunted Castle.\n` +
      `3. Pay 1,000 Fragments or a $1M+ fruit to unlock Phoenix raid hosting permanently.`,
    tags: ['dough raid', 'phoenix raid', 'advanced raids', 'red key', 'dough king']
  },
  {
    id: 'c2-fast-mastery-fruits',
    categoryNumber: 2,
    categoryName: 'Devil Fruits (Acquiring, Awakening & Trading)',
    question: 'How do I level up Fruit & Weapon Mastery fast?',
    aliases: ['level up mastery fast', 'fast mastery guide', 'farm mastery fruit sword', 'mastery 600 fast'],
    shortAnswer: 'Equip 2x Mastery gamepass, server-hop high-level bosses (Cake Queen, Beautiful Pirate, Longma), or grind clustered mobs at Haunted Castle / Sea of Treats with Buddha/Logia.',
    fullAnswer: `⚡ **Fastest Mastery Leveling Blueprint (1 to 600):**\n\n` +
      `1. **Boss Server-Hopping:** In Third Sea, rotate between **Cake Queen (Lv 2175)** at Sea of Treats, **Beautiful Pirate (Lv 1950)** inside Floating Turtle dome, and **Captain Elephant (Lv 1875)**.\n` +
      `2. **Low-HP Finish Strategy:** If leveling a hard-to-hit fruit or sword, weaken the boss to 5% HP using your main fighting style, then deliver the final finishing blow with the fruit/weapon you want mastery on!\n` +
      `3. **Haunted Castle Clustered Mobs:** Group up 6 Reborn Skeletons / Living Zombies, group them into a corner, and burst them down with big AoE skills.\n` +
      `4. **2x Mastery Gamepass (450 Robux):** Permanently doubles all earned weapon, fruit, and fighting style mastery.`,
    tags: ['mastery', 'level up fast', 'cake queen', 'boss hopping', '2x mastery']
  },

  // ==========================================
  // CATEGORY 3: FIGHTING STYLES & WEAPONS
  // ==========================================
  {
    id: 'c3-v1-fighting-styles',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Dark Step, Electric, Water Kung Fu, and Dragon Breath?',
    aliases: ['get dark step', 'get electric', 'get water kung fu', 'get dragon breath', 'v1 fighting styles'],
    shortAnswer: 'Dark Step: Pirate Village ($150k). Electric: Skylands ($500k). Water Kung Fu: Underwater City ($750k). Dragon Breath: Kingdom of Rose ($1.5k Fragments from Sabi).',
    fullAnswer: `🥊 **All V1 Fighting Styles Obtainment:**\n\n` +
      `• **Dark Step ($150,000 Beli):** Bought from **Black Leg Teacher** at Pirate Village behind the houses.\n` +
      `• **Electric ($500,000 Beli):** Bought from **Mad Scientist** at Skylands behind the stone rocks near the temple.\n` +
      `• **Water Kung Fu ($750,000 Beli):** Bought from **Water Kung Fu Teacher** inside the Underwater City.\n` +
      `• **Dragon Breath (1,500 Fragments):** Bought from **Sabi** inside the stone wall tunnel at Kingdom of Rose (Second Sea).`,
    tags: ['fighting styles', 'dark step', 'electric', 'water kung fu', 'dragon breath']
  },
  {
    id: 'c3-superhuman',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Superhuman fighting style?',
    aliases: ['how to get superhuman', 'superhuman requirements', 'superhuman teacher location'],
    shortAnswer: 'Get 300+ Mastery on Dark Step, Electric, Water Kung Fu, and Dragon Breath. Then pay Martial Arts Master $3,000,000 Beli inside Snow Mountain cave in Second Sea.',
    fullAnswer: `🥋 **How to Unlock Superhuman:**\n\n` +
      `1. **Mastery Requirements:** Reach **300+ Mastery** on all four V1 fighting styles:\n` +
      `   • Dark Step (300 Mastery)\n` +
      `   • Electric (300 Mastery)\n` +
      `   • Water Kung Fu (300 Mastery)\n` +
      `   • Dragon Breath (300 Mastery)\n` +
      `2. **Location:** Second Sea at **Snow Mountain**.\n` +
      `3. **Secret Cave:** Drop down the snowy cliff behind the Winter Warriors and enter the hidden cave.\n` +
      `4. **Cost:** Talk to the **Martial Arts Master** and pay **$3,000,000 Beli**.`,
    cost: '$3,000,000 Beli',
    tags: ['superhuman', 'fighting styles', 'martial arts master', 'snow mountain']
  },
  {
    id: 'c3-v2-fighting-styles',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Death Step, Sharkman Karate, Electric Claw, and Dragon Talon?',
    aliases: ['how to get death step', 'how to get sharkman karate', 'how to get electric claw', 'how to get dragon talon', 'v2 fighting styles'],
    shortAnswer: 'Each requires 400 Mastery on the V1 style + $2.5M - $3M Beli + 5,000 Fragments + special key/quest.',
    fullAnswer: `🔥 **All V2 Fighting Styles Guide:**\n\n` +
      `1. **Death Step ($2.5M + 5k Frags):** 400 Mastery on Dark Step + **Library Key** from Awakened Ice Admiral at Ice Castle (Sea 2). Talk to **Phoey** in secret library.\n` +
      `2. **Sharkman Karate ($2.5M + 5k Frags):** 400 Mastery on Water Kung Fu + **Water Key** from Tide Keeper at Forgotten Island (Sea 2). Talk to **Daigrock**.\n` +
      `3. **Electric Claw ($3M + 5k Frags):** 400 Mastery on Electric + Complete **Previous Hero’s 30-second dash quest** from Mansion to Turtle (Sea 3).\n` +
      `4. **Dragon Talon ($3M + 5k Frags):** 400 Mastery on Dragon Breath + **Fire Essence** from Death King (Bones roll at Haunted Castle). Talk to **Uzoth** at Haunted Castle gear tower.`,
    tags: ['death step', 'sharkman karate', 'electric claw', 'dragon talon', 'v2 styles']
  },
  {
    id: 'c3-godhuman-requirements',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Godhuman and what are the exact requirements?',
    aliases: ['how to get godhuman', 'godhuman exact requirements', 'godhuman materials', 'godhuman cost', 'ancient monk location'],
    shortAnswer: '400+ Mastery on Superhuman, Death Step, Sharkman Karate, Electric Claw, Dragon Talon + $5,000,000 Beli + 5,000 Fragments + 20 Fish Tails, 20 Magma Ore, 10 Dragon Scales, 10 Mystic Droplets.',
    fullAnswer: `👑 **Exact Godhuman Obtainment Blueprint:**\n\n` +
      `**1. Mastery Requirements (400+ on all 5):**\n` +
      `• Superhuman (400)\n` +
      `• Death Step (400)\n` +
      `• Sharkman Karate (400)\n` +
      `• Electric Claw (400)\n` +
      `• Dragon Talon (400)\n\n` +
      `**2. Currency Cost:**\n` +
      `• **$5,000,000 Beli**\n` +
      `• **5,000 Fragments**\n\n` +
      `**3. Materials Needed:**\n` +
      `• **20 Fish Tails** (Fishman mobs at Underwater City / Forgotten Island)\n` +
      `• **20 Magma Ore** (Magma Island / Hot and Cold)\n` +
      `• **10 Dragon Scales** (Dragon Crew mobs at Hydra Island)\n` +
      `• **10 Mystic Droplets** (Sea Soldier mobs at Forgotten Island)\n\n` +
      `**4. NPC Location:**\n` +
      `Inside the giant hollow root at **Floating Turtle** (Third Sea). Speak with the **Ancient Monk** inside the secret tree tunnel.`,
    tags: ['godhuman', 'ancient monk', 'fighting styles', 'materials', 'meta pvp']
  },
  {
    id: 'c3-sanguine-art',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Sanguine Art with Leviathan Heart?',
    aliases: ['how to get sanguine art', 'sanguine art requirements', 'shafi location', 'leviathan heart fighting style'],
    shortAnswer: 'Craft Beast Hunter boat, defeat Leviathan in Danger Level 6, harpoon its Heart back to Tiki Outpost, then talk to Shafi with $5M Beli, 5k Frags, 20 Demonic Wisps, 20 Vampire Fangs, 2 Dark Fragments.',
    fullAnswer: `🩸 **Sanguine Art Obtainment Guide:**\n\n` +
      `1. **Beast Hunter Boat:** Craft the Beast Hunter boat at Tiki Outpost using Leviathan Scales.\n` +
      `2. **Defeat Leviathan & Harpoon Heart:** Sail to Danger Zone 6 with 5+ players. Defeat Leviathan and use the front harpoon of the Beast Hunter to capture the **Leviathan Heart** and drag it back to Tiki Outpost docks.\n` +
      `3. **Collect Materials:**\n` +
      `   • 1x Leviathan Heart\n` +
      `   • 20x Demonic Wisps (Demonic Souls at Haunted Castle)\n` +
      `   • 20x Vampire Fangs (Vampires at Graveyard Sea 2)\n` +
      `   • 2x Dark Fragments (Darkbeard Boss Sea 2)\n` +
      `   • $5,000,000 Beli + 5,000 Fragments\n` +
      `4. **Talk to Shafi:** Enter the secret basement crypt under Tiki Outpost and learn Sanguine Art!`,
    tags: ['sanguine art', 'leviathan heart', 'shafi', 'tiki outpost', 'lifesteal']
  },
  {
    id: 'c3-saber-sea-1',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get the Saber sword in Sea 1?',
    aliases: ['how to get saber', 'saber puzzle sea 1', 'saber expert quest', 'shanks sword blox fruits'],
    shortAnswer: 'Solve the 5 Jungle green buttons, get Torch, burn Desert hut door, fill Cup in Frozen Village cave, give water to Sick Man, get Relic from Rich Son, defeat Saber Expert (Lv 200) at Jungle.',
    fullAnswer: `🗡️ **Saber Expert Quest Step-by-Step:**\n\n` +
      `1. **5 Jungle Buttons:** Press all 5 hidden green buttons on Jungle Island.\n` +
      `2. **Get Torch:** Go under the stairs in the Jungle Gacha building and grab the **Torch**.\n` +
      `3. **Desert House:** Travel to Desert Island, enter the sunken pyramid hut, and burn the brown door curtain with the torch. Take the **Cup**.\n` +
      `4. **Fill with Water:** Go to Frozen Village cave, stand under the dripping ice stalactite to fill the cup with water.\n` +
      `5. **Sick Man:** Give water to the Sick Man in Frozen Village.\n` +
      `6. **Rich Son & Mob Leader:** Go to Pirate Village, talk to Rich Son, defeat Mob Leader at secret island, then return to Rich Son to get the **Ancient Relic**.\n` +
      `7. **Defeat Saber Expert:** Place Relic into the stone door under Jungle stairs and defeat Saber Expert (Lv 200) for a 100% Saber drop!`,
    tags: ['saber', 'saber quest', 'jungle puzzle', 'shanks', 'first sea sword']
  },
  {
    id: 'c3-true-triple-katana-ttk',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get True Triple Katana (TTK) and find the Legendary Sword Dealer?',
    aliases: ['how to get ttk', 'true triple katana', 'legendary sword dealer', 'shisui saddi wando'],
    shortAnswer: 'Buy Shisui, Saddi, and Wando from Legendary Sword Dealer in Sea 2 ($2,000,000 Beli each), reach 300 Mastery on all three, then pay Mysterious Man $2,000,000 Beli at peak of Green Zone.',
    fullAnswer: `⚔️ **True Triple Katana (TTK) Complete Guide:**\n\n` +
      `**1. Find Legendary Sword Dealer (Sea 2):**\n` +
      `• Talk to the **Manager at Café** to track spawn timers ("Are you new to this island?" -> "He was seen on the island!").\n` +
      `• Spawns for 15 minutes every 3 to 4 hours in one of 7 locations (Green Zone leaves, Colosseum arches, Graveyard, Kingdom of Rose rocks).\n` +
      `• Buy all 3 swords: **Shisui ($2M)**, **Saddi ($2M)**, **Wando ($2M)** = Total $6,000,000 Beli.\n\n` +
      `**2. Mastery Requirements:**\n` +
      `• Level up Shisui to **300+ Mastery**\n` +
      `• Level up Saddi to **300+ Mastery**\n` +
      `• Level up Wando to **300+ Mastery**\n\n` +
      `**3. Craft TTK:**\n` +
      `• Climb to the highest vine leaf pillar at **Green Zone**.\n` +
      `• Talk to the **Mysterious Man** and pay **$2,000,000 Beli** to combine them into True Triple Katana!`,
    tags: ['ttk', 'true triple katana', 'shisui', 'saddi', 'wando', 'legendary sword dealer']
  },
  {
    id: 'c3-cursed-dual-katana-cdk',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Cursed Dual Katana (CDK) and get Yama & Tushita?',
    aliases: ['how to get cdk', 'cursed dual katana', 'how to get yama and tushita', 'cdk trials', 'tushita and yama'],
    shortAnswer: 'Get Yama (30 Elite kills) and Tushita (kill rip_indra, light 5 torches) to 350 Mastery. Open CDK Crypt behind Mansion at Floating Turtle, complete 3 Yama trials & 3 Tushita trials, defeat Cursed Skeleton Boss.',
    fullAnswer: `⚔️ **Cursed Dual Katana (CDK) Master Guide:**\n\n` +
      `**1. Obtain Yama:** Defeat 30 Elite Hunters in Third Sea, pull Yama from Waterfall Crypt on Hydra Island.\n` +
      `**2. Obtain Tushita:** During rip_indra raid, enter secret waterfall door on Hydra Island, get Holy Torch, light 5 torches on Floating Turtle within 5 minutes, defeat Longma (Lv 2000).\n` +
      `**3. 350 Mastery:** Level both Yama and Tushita to **350+ Mastery**.\n` +
      `**4. CDK Crypt Trials (Behind Turtle Mansion):**\n` +
      `   • **Tushita Scroll 1:** Talk to 3 luxury boat dealers.\n` +
      `   • **Tushita Scroll 2:** Defeat Pirate Raid on Castle on the Sea.\n` +
      `   • **Tushita Scroll 3:** Defeat Cake Queen before music finishes.\n` +
      `   • **Yama Scroll 1:** Let mobs hit you until you almost die (Pain).\n` +
      `   • **Yama Scroll 2:** Kill mobs with purple haze dots around the world.\n` +
      `   • **Yama Scroll 3:** Light Haze Chalice at Graveyard and get killed by Soul Reaper.\n` +
      `**5. Defeat Cursed Skeleton:** Place the 6 shards into the crypt pedestal and defeat the boss to forge CDK!`,
    tags: ['cdk', 'cursed dual katana', 'yama', 'tushita', 'mythical sword']
  },
  {
    id: 'c3-soul-guitar',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get the Soul Guitar mythical gun?',
    aliases: ['how to get soul guitar', 'soul guitar puzzle', 'soul guitar full moon', 'haunted castle gun'],
    shortAnswer: 'Be Level 2300+, wait for Full Moon at Haunted Castle, pray at Gravestone, kill 6 Living Zombies together, align 8 signboards, solve trophy color code, wire floor puzzle, craft for 500 Bones, 250 Ectoplasm, 1 Dark Fragment, 5000 Frags.',
    fullAnswer: `🎸 **Soul Guitar Puzzle Complete Solution:**\n\n` +
      `1. **Prerequisite:** Reach **Level 2300+**.\n` +
      `2. **Full Moon Prayer:** Stand in the Haunted Castle graveyard during a **Full Moon** night. Interact with the Gravestone and select "Pray" until the screen turns black.\n` +
      `3. **Zombie Elimination:** Round up 6 Living Zombies into the red mud patch and kill them all simultaneously within 1 second.\n` +
      `4. **Signboard Puzzle:** Count the gravestones on each side of the path and click the signboards to match the side with more graves.\n` +
      `5. **Ghost Dialogue:** Talk to the Ghost NPC inside the castle.\n` +
      `6. **Trophy Alignment:** Look at the trophy handles on the walls and rotate the garden pipes to match their directions.\n` +
      `7. **Color Floor Tiles:** Step on the colored floor tiles in the basement to match the wire colors (Blue, Black, Red, Green).\n` +
      `8. **Craft with Weird Skeleton:** Pay **500 Bones, 250 Ectoplasm, 1 Dark Fragment, and 5,000 Fragments** to forge the Soul Guitar!`,
    tags: ['soul guitar', 'mythical gun', 'haunted castle', 'full moon', 'bones', 'ectoplasm']
  },
  {
    id: 'c3-dark-blade-hallow-scythe',
    categoryNumber: 3,
    categoryName: 'Fighting Styles & Weapons',
    question: 'How do I get Dark Blade (Yoru) and Hallow Scythe?',
    aliases: ['how to get dark blade', 'how to get yoru', 'how to get hallow scythe', 'soul reaper scythe'],
    shortAnswer: 'Dark Blade: 1200 Robux gamepass or trade. Hallow Scythe: 5% drop from Soul Reaper boss at Haunted Castle (spawn with Hallow Essence from Death King bones roll).',
    fullAnswer: `🗡️ **Dark Blade & Hallow Scythe Guide:**\n\n` +
      `• **Dark Blade (Yoru):** Buy from in-game shop for **1,200 Robux** or trade for it in Second/Third Sea (Trade Value: ~1.2 Billion).\n` +
      `• **Hallow Scythe:** Go to Haunted Castle (Third Sea). Roll bones at the **Death King** until you get **Hallow Essence** (1-2% chance). Place Hallow Essence on the summoning altar in the basement to spawn the **Soul Reaper (Lv 2100)**. Defeat him for a ~5% chance at dropping Hallow Scythe!`,
    tags: ['dark blade', 'yoru', 'hallow scythe', 'soul reaper', 'death king']
  },

  // ==========================================
  // CATEGORY 4: RACES, ABILITIES & TRANSFORMATION (V2/V3/V4 + GEARS)
  // ==========================================
  {
    id: 'c4-change-race-cyborg-ghoul',
    categoryNumber: 4,
    categoryName: 'Races, Abilities & Transformation',
    question: 'How do I change my race and unlock Cyborg & Ghoul races?',
    aliases: ['how to change race', 'how to unlock cyborg', 'how to unlock ghoul', 'race reroll tort', 'norp npc'],
    shortAnswer: 'Reroll base race (Human/Mink/Angel/Shark) via Tort (3000 Frags) or Robux (90). Unlock Cyborg via Fist of Darkness + Core Brain at Raid Lab. Unlock Ghoul via 100 Ectoplasm + Hellfire Torch from Cursed Captain.',
    fullAnswer: `🧬 **How to Change Races & Unlock Special Races:**\n\n` +
      `**1. Base Race Rerolls (Human, Mink, Angel, Shark):**\n` +
      `• Talk to **Tort** inside the Café (Sea 2) or Mansion (Sea 3). Pay **3,000 Fragments** per reroll.\n` +
      `• Or purchase race rerolls from the shop for 90 Robux.\n\n` +
      `**2. Unlock Cyborg Race:**\n` +
      `• Get **Fist of Darkness** from Sea 2 chest or Sea Beast.\n` +
      `• Insert Fist of Darkness into the secret machine at Hot and Cold Raid Lab.\n` +
      `• Host Order (Law) Raids until Law drops the **Core Brain** (1% drop).\n` +
      `• Insert Core Brain into the machine and pay **2,500 Fragments** to unlock Cyborg.\n\n` +
      `**3. Unlock Ghoul Race:**\n` +
      `• Collect **100 Ectoplasm** on Cursed Ship in Second Sea.\n` +
      `• Defeat **Cursed Captain** boss inside Cursed Ship to get the **Hellfire Torch** (1-2% drop).\n` +
      `• Talk to **Experimic** NPC in the Cursed Ship kitchen to become Ghoul!`,
    tags: ['change race', 'cyborg race', 'ghoul race', 'tort', 'core brain', 'hellfire torch']
  },
  {
    id: 'c4-race-v2-flowers',
    categoryNumber: 4,
    categoryName: 'Races, Abilities & Transformation',
    question: 'How do I get Race V2 and where are the red, yellow, and blue flowers?',
    aliases: ['how to get race v2', 'race v2 flowers', 'alchemist quest flowers', 'red blue yellow flowers'],
    shortAnswer: 'Complete Bartilo Quest, talk to Alchemist in Green Zone, collect 3 flowers (Red = daytime Green Zone/Mansion, Blue = nighttime Graveyard/Remote Island, Yellow = kill any NPC), and pay $500,000 Beli.',
    fullAnswer: `🌸 **Race V2 Flower Quest Complete Guide:**\n\n` +
      `1. **Prerequisite:** Complete the **Bartilo Quest** in Second Sea.\n` +
      `2. **Talk to Alchemist:** Located under the giant blue mushroom in **Green Zone**.\n` +
      `3. **Collect 3 Flowers:**\n` +
      `   • **Red Flower (Daytime Only):** Spawns in Green Zone grass patches, Mansion plateau gardens, or Fajita boss area.\n` +
      `   • **Blue Flower (Nighttime Only):** Spawns in Graveyard island grass, Cave Island roof hole, or the tiny remote island near Graveyard.\n` +
      `   • **Yellow Flower (Anytime):** Drops automatically from killing any NPC in Second Sea (Swan Pirates / Mercenaries).\n` +
      `4. **Return & Pay:** Return to Alchemist with all 3 flowers and pay **$500,000 Beli** to unlock Race V2!`,
    tags: ['race v2', 'alchemist', 'red flower', 'blue flower', 'yellow flower']
  },
  {
    id: 'c4-race-v3-arowe',
    categoryNumber: 4,
    categoryName: 'Races, Abilities & Transformation',
    question: 'How do I get Race V3 and where is Arowe NPC located?',
    aliases: ['how to get race v3', 'race v3 quest arowe', 'where is arowe', 'race v3 requirements'],
    shortAnswer: 'Defeat Don Swan, go to secret hill chamber in Green Zone to talk to Arowe, complete your race-specific task, and pay $2,000,000 Beli.',
    fullAnswer: `⚡ **Race V3 Complete Guide & Specific Tasks:**\n\n` +
      `1. **Prerequisite:** Defeat **Don Swan** at Mansion (Sea 2) and have Race V2.\n` +
      `2. **Arowe Location:** Under the secret stone cliff opening in **Green Zone** near the diamond rock.\n` +
      `3. **Race Specific Tasks:**\n` +
      `   • **Human:** Defeat 3 bosses (Diamond, Jeremy, Fajita).\n` +
      `   • **Mink:** Collect 30 random chests around the map.\n` +
      `   • **Shark:** Defeat 1 Sea Beast.\n` +
      `   • **Angel:** Kill another player who has the Angel race.\n` +
      `   • **Cyborg:** Give Arowe any physical Blox Fruit.\n` +
      `   • **Ghoul:** Kill 5 players in PvP.\n` +
      `4. **Pay Arowe:** Pay **$2,000,000 Beli** to unlock your V3 active ability (T key)!`,
    tags: ['race v3', 'arowe', 'green zone', 'v3 abilities']
  },
  {
    id: 'c4-race-v4-complete-awakening-gears',
    categoryNumber: 4,
    categoryName: 'Races, Abilities & Transformation',
    question: 'How do I get Race V4 and upgrade all Gears with the Ancient One?',
    aliases: ['how to get race v4', 'race v4 complete guide', 'race v4 gears', 'ancient one v4', 'temple of time lever full moon'],
    shortAnswer: 'Get Mirror Fractal + Blue Gear on Mirage Island during Full Moon. Enter Temple of Time, pull wall lever with 3 players during Full Moon, complete your Race Trial, and spend fragments at the Ancient One to upgrade Gears 1-5.',
    fullAnswer: `🌕 **Race V4 Awakening & Gear Progression Master Blueprint:**\n\n` +
      `**Phase 1: Mirror Fractal & Blue Gear**\n` +
      `1. Defeat **Dough King / Cake Prince** to obtain the **Mirror Fractal**.\n` +
      `2. Sail to Danger 5 in Third Sea until **Mirage Island** spawns during a **Full Moon**.\n` +
      `3. Climb the highest peak, activate Race V3, stare at the moon for 15s until it glows, and find the glowing **Blue Gear** hidden in the fog.\n\n` +
      `**Phase 2: Pulling the Lever & The Trials**\n` +
      `4. Go to **Temple of Time** atop Great Tree.\n` +
      `5. Bring **3 players with different races**.\n` +
      `6. Pull the wall lever at the top of the Temple of Time hallway during an active **Full Moon**.\n` +
      `7. Each player stands in front of their race door (Cyborg = Machine, Shark = Water, Angel = Skies, Human = Strength, Ghoul = Carnage, Mink = Speed).\n` +
      `8. All 3 players count down and activate Race V3 simultaneously to start the trials!\n` +
      `9. Complete your trial, win the final PvP duel in the center arena, and insert the gear into the Ancient Clock!\n\n` +
      `**Phase 3: Gear Upgrades with Ancient One**\n` +
      `• **Gear 1 (1,000 Frags, 3 Trainings):** Base transformation.\n` +
      `• **Gear 2 (1,500 Frags, 5 Trainings):** First branch ability (e.g. Leviathan Armor vs Whirlpool / Rage vs Psycho Dash).\n` +
      `• **Gear 3 (2,000 Frags, 7 Trainings):** Second tier buff & mobility enhancer.\n` +
      `• **Gear 4 (2,500 Frags, 10 Trainings):** Third tier ultimate mastery (e.g. Chain Lightning Max / 150% Rage).\n` +
      `• **Gear 5 (3,000 Frags, 12 Trainings):** Max 90-second duration and accelerated awakening recharge!`,
    gearExplanation: 'Every race features 2 distinct branching paths on Gears 2, 3, and 4. You can switch your active gear skill anytime by talking to the Ancient One in the Temple of Time!',
    tags: ['race v4', 'v4 gears', 'ancient one', 'blue gear', 'mirror fractal', 'temple of time']
  },

  // ==========================================
  // CATEGORY 5: HAKI & PASSIVE BUFFS
  // ==========================================
  {
    id: 'c5-aura-buso-full-body',
    categoryNumber: 5,
    categoryName: 'Haki & Passive Buffs',
    question: 'How do I get Aura (Buso Haki) and level it up to Full Body Haki?',
    aliases: ['how to get aura', 'buso haki', 'full body aura', 'level up aura', 'stage 5 haki'],
    shortAnswer: 'Buy Aura for $25,000 Beli from Ability Teacher in Frozen Village cave (Sea 1). Level up from Stage 1 to Stage 5 by hitting enemies with basic M1 Melee/Sword strikes (requires ~60,000 hits for full body).',
    fullAnswer: `🛡️ **Aura (Enhancement / Buso Haki) Mastery Guide:**\n\n` +
      `1. **Buy Aura:** Go to **Frozen Village** (Sea 1) cave and purchase Aura from **Ability Teacher** for **$25,000 Beli** (Keybind: J).\n` +
      `2. **Aura Stages (1 to 5):**\n` +
      `   • Stage 1 (Arms / Legs): ~4,000 EXP\n` +
      `   • Stage 2 (Arms + Torso): ~12,000 EXP\n` +
      `   • Stage 3 (Full Upper Body): ~24,000 EXP\n` +
      `   • Stage 4 (Body + Head): ~40,000 EXP\n` +
      `   • Stage 5 (Full Body Iron Coating): ~60,000 EXP\n` +
      `3. **How to Level Up Fast:** Equip an unupgraded low-damage sword or fighting style, turn on Aura, and auto-click / M1 farm Logia mobs or bosses with Buddha!`,
    tags: ['aura', 'buso haki', 'full body haki', 'ability teacher', 'frozen village']
  },
  {
    id: 'c5-rainbow-haki-colors',
    categoryNumber: 5,
    categoryName: 'Haki & Passive Buffs',
    question: 'How do I get Rainbow Haki & Haki Colors from Master of Auras?',
    aliases: ['how to get rainbow haki', 'rainbow savior quest', 'master of auras', 'haki colors', 'horn man quest'],
    shortAnswer: 'Rainbow Haki: Complete Horned Man quest at Floating Turtle peak (kill Stone, Island Empress, Kilo Admiral, Captain Elephant, Beautiful Pirate). Haki Colors: Buy regular/legendary colors from Master of Auras NPC across Second & Third Sea for 1,500 Frags.',
    fullAnswer: `🌈 **Rainbow Haki & Master of Auras Colors Guide:**\n\n` +
      `**Rainbow Haki (Rainbow Savior Title):**\n` +
      `1. Reach **Level 1950+** in Third Sea.\n` +
      `2. Climb to the highest tree branch at **Floating Turtle** and talk to the **Horned Man** NPC.\n` +
      `3. Defeat the 5 bosses in order without dying or leaving the server:\n` +
      `   • Stone (Port Town)\n` +
      `   • Island Empress (Hydra Island)\n` +
      `   • Kilo Admiral (Great Tree)\n` +
      `   • Captain Elephant (Floating Turtle)\n` +
      `   • Beautiful Pirate (Floating Turtle Dome)\n` +
      `4. Return to Horned Man to unlock Rainbow Haki permanently!\n\n` +
      `**Regular & Legendary Haki Colors:**\n` +
      `• Look for the **Master of Auras** NPC roaming in Second & Third Sea (Café roof, Snow Mountain, Green Zone, Castle on the Sea, Hydra Island, Floating Turtle).\n` +
      `• Sells Regular Colors for **1,500 Fragments** and Legendary Colors (Pure Red, Snow White, Winter Sky) for **7,500 Fragments**.`,
    tags: ['rainbow haki', 'master of auras', 'horned man', 'haki colors']
  },
  {
    id: 'c5-instinct-v1-v2',
    categoryNumber: 5,
    categoryName: 'Haki & Passive Buffs',
    question: 'How do I get Instinct (Observation Haki) V1 and Instinct V2?',
    aliases: ['how to get instinct', 'observation haki v1', 'how to get instinct v2', 'hungry man quest instinct v2'],
    shortAnswer: 'Instinct V1: Lord of Destruction at Upper Skylands for $750,000 Beli (Lv 300+). Instinct V2: Lv 1800+, 5000 Instinct EXP, Citizen Quest at Floating Turtle, get Fruit Bowl from Hungry Man, pay $5,000,000 Beli + 5,000 Frags.',
    fullAnswer: `👁️ **Instinct (Observation Haki) V1 & V2 Complete Guide:**\n\n` +
      `**Instinct V1:**\n` +
      `• Reached at **Level 300+** after completing the Saber quest.\n` +
      `• Go to the temple in **Upper Skylands** (First Sea) and talk to **Lord of Destruction**.\n` +
      `• Cost: **$750,000 Beli** (Gives 2 to 8 dodges; Keybind: E).\n\n` +
      `**Instinct V2:**\n` +
      `1. Reach **Level 1800+** and max your Instinct V1 to **5,000 EXP** (talk to Citizen to check).\n` +
      `2. Talk to the **Citizen** NPC at Floating Turtle Mansion and complete his quest:\n` +
      `   • Defeat 50 Forest Pirates\n` +
      `   • Defeat Captain Elephant and bring Citizen the Hat\n` +
      `3. **Hungry Man Fruit Bowl:** Talk to **Hungry Man** in the pineapple house. Collect 3 fruits:\n` +
      `   • **Apple:** Floating Turtle tree\n` +
      `   • **Banana:** Great Tree hill\n` +
      `   • **Pineapple:** Port Town port\n` +
      `4. Bring fruits to Citizen to craft the **Fruit Bowl**, feed Hungry Man, and pay **$5,000,000 Beli + 5,000 Fragments** to unlock Instinct V2!\n\n` +
      `*Instinct V2 Perks:* Displays opponent exact level, fighting style, sword, fruit, energy, health, and skill cooldown status!`,
    tags: ['instinct', 'instinct v2', 'observation haki', 'hungry man', 'fruit bowl']
  },

  // ==========================================
  // CATEGORY 6: CURRENCIES, DROPS & MATERIALS
  // ==========================================
  {
    id: 'c6-fast-beli-fragments',
    categoryNumber: 6,
    categoryName: 'Currencies, Drops & Materials',
    question: 'How do I get Beli and Fragments fast?',
    aliases: ['how to get beli fast', 'how to get fragments fast', 'farm money blox fruits', 'farm frags fast'],
    shortAnswer: 'Beli: Farm Sea Beasts / Rumbling Waters with 2x Money, server-hop bosses (Vice Admiral / Fajita / Beautiful Pirate), collect chests with Portal. Fragments: Spam Fruit Raids (1,000 Frags in 3 min), defeat Darkbeard (1,500 Frags), kill Sea Beasts (250 Frags).',
    fullAnswer: `💰 **Fastest Beli & Fragment Farming Methods:**\n\n` +
      `**Fastest Beli (Millions per hour):**\n` +
      `1. **Sea Beast Hunting (Danger Zone 3-6):** Defeating a Sea Beast awards $150,000 to $300,000 Beli ($300k - $600k with 2x Money). Rumbling Waters awards ~1 Million Beli in 2 minutes!\n` +
      `2. **Boss Server-Hopping:** Kill High-Tier bosses with 2x Money.\n` +
      `3. **Chest Runs with Portal V:** Teleport across islands opening diamond/gold chests.\n\n` +
      `**Fastest Fragments (Tens of thousands per hour):**\n` +
      `1. **Raid Speedrunning:** Run easy raids (Flame or Magma) with an Awakened Buddha squad. Each raid finishes in 3 minutes and awards **1,000 Fragments**!\n` +
      `2. **Darkbeard Boss:** Defeating Darkbeard at Dark Arena gives **1,500 Fragments** and a chance at Dark Coat.\n` +
      `3. **Defeat rip_indra / Dough King:** Awards **1,500 to 2,000 Fragments** + rare items.\n` +
      `4. **Ship Raids:** Destroying brigade pirate ships gives 100 - 200 Frags each.`,
    tags: ['beli', 'fragments', 'fast money', 'sea beasts', 'raid farming']
  },
  {
    id: 'c6-bones-materials-farming',
    categoryNumber: 6,
    categoryName: 'Currencies, Drops & Materials',
    question: 'How do I get Bones, Dark Fragments, Dragon Scales, and Leviathan Scales?',
    aliases: ['how to get bones', 'dark fragments', 'dragon scales', 'leviathan scales', 'fools gold'],
    shortAnswer: 'Bones: Kill Haunted Castle mobs. Dark Fragments: Kill Darkbeard boss. Dragon Scales: Kill Dragon Crew mobs on Hydra Island. Leviathan Scales: Defeat Leviathan parts in Danger Level 6.',
    fullAnswer: `📦 **Key Material Farming Locations:**\n\n` +
      `• **Bones:** Kill any skeleton or zombie mob at **Haunted Castle** (drops 1-3 bones per kill; max 50 daily rolls at Death King).\n` +
      `• **Dark Fragments:** Guaranteed drop from defeating the **Darkbeard** raid boss at Dark Arena (Second Sea).\n` +
      `• **Dragon Scales:** Drops from **Dragon Crew Archers & Warriors** at Hydra Island (Third Sea).\n` +
      `• **Fool’s Gold:** Drops from Ghost Ships and Submerged Sea events in Danger Levels 3-6.\n` +
      `• **Demonic Wisps:** Drops from **Demonic Soul** mobs in the Haunted Castle basement.\n` +
      `• **Leviathan Scales:** Drops directly from damaging and destroying **Leviathan segments** during the Leviathan boss fight in Danger Level 6.`,
    tags: ['bones', 'dark fragments', 'dragon scales', 'leviathan scales', 'materials']
  },

  // ==========================================
  // CATEGORY 7: BOSSES, EVENTS & ACCESSORIES
  // ==========================================
  {
    id: 'c7-spawn-indra-dough-king',
    categoryNumber: 7,
    categoryName: 'Bosses, Events & Accessories',
    question: 'How do I spawn rip_indra, Dough King, and get God’s Chalice / Sweet Chalice?',
    aliases: ['how to spawn rip_indra', 'how to spawn dough king', 'gods chalice', 'sweet chalice', 'fist of darkness'],
    shortAnswer: 'God’s Chalice: 2% from Elite Hunter or 4-hour chest in Sea 3. Rip_indra: Place God’s Chalice on Castle on the Sea pedestal with all 3 Aura Colors active. Dough King: Combine God’s Chalice + 10 Conjured Cocoa = Sweet Chalice, kill 500 mobs at Sea of Treats, talk to Drip Mama.',
    fullAnswer: `👑 **Master Boss Summoning Guide:**\n\n` +
      `**1. God’s Chalice:**\n` +
      `• Drops from **Elite Pirates** (2% chance) or found in random chests in Third Sea after the server has been alive for 4+ hours.\n\n` +
      `**2. Spawn rip_indra (Valkyrie Helm drop):**\n` +
      `• Step on all 3 Aura Color pads at Castle on the Sea (Pure Red, Snow White, Winter Sky).\n` +
      `• Place the God’s Chalice on the pedestal in the main fortress room to summon **rip_indra (Lv 5000)**!\n\n` +
      `**3. Spawn Dough King (Mirror Fractal & Pale Scarf drop):**\n` +
      `• Defeat Cocoa Warriors at Sea of Treats to collect **10 Conjured Cocoa**.\n` +
      `• Talk to the **Sweet Crafter** NPC at Sea of Treats to combine God’s Chalice + 10 Cocoa into **Sweet Chalice**.\n` +
      `• Defeat **500 mobs** at Sea of Treats.\n` +
      `• Talk to **Drip Mama** while holding Sweet Chalice to spawn Dough King!`,
    tags: ['rip_indra', 'dough king', 'gods chalice', 'sweet chalice', 'valkyrie helm', 'pale scarf']
  },

  // ==========================================
  // CATEGORY 8: PVP, BOUNTY & STATS
  // ==========================================
  {
    id: 'c8-stat-builds-allocation',
    categoryNumber: 8,
    categoryName: 'PvP, Bounty & Stats',
    question: 'How do I allocate my stat points for a Sword, Fruit, or Gun build, and how do I reset stats?',
    aliases: ['stat points allocation', 'how to reset stats', 'sword build stats', 'fruit main stats', 'plokster stat reset'],
    shortAnswer: 'Max Level 2550 gives 7,650 stat points (Max 2550 per stat). Buddha/Melee: 2550 Melee, 2550 Defense, 2550 Sword. Fruit Main: 2550 Melee, 2550 Defense, 2550 Fruit. Reset stats via Plokster ($2.5k Frags at Bridge), promo codes, or 75 Robux.',
    fullAnswer: `📊 **Stat Allocation & Reset Blueprint (Max Cap: 2550 per stat):**\n\n` +
      `• **Buddha / Sword Main Build:**\n` +
      `  - **Melee:** 2,550 (Max Energy & Melee damage)\n` +
      `  - **Defense:** 2,550 (Max Health)\n` +
      `  - **Sword:** 2,550 (Max Sword burst damage)\n` +
      `  - *Gun & Fruit:* 0 points.\n\n` +
      `• **Fruit Main Build (Kitsune, Dough, Dragon, Portal):**\n` +
      `  - **Melee:** 2,550\n` +
      `  - **Defense:** 2,550\n` +
      `  - **Blox Fruit:** 2,550\n` +
      `  - *Sword & Gun:* 0 points.\n\n` +
      `• **How to Reset Stats:**\n` +
      `  1. **Plokster NPC:** Talk to Plokster on the bridge between Green Zone and Kingdom of Rose (Sea 2) or at Castle on the Sea. Pay **2,500 Fragments**.\n` +
      `  2. **Free Promo Codes:** Redeem active stat reset codes (e.g. \`SUB2GAMERROBOT_RESET1\`).\n` +
      `  3. **Robux:** 75 Robux in the in-game shop.`,
    tags: ['stats', 'stat reset', 'buddha build', 'fruit build', 'plokster']
  },
  {
    id: 'c8-bounty-honor-titles',
    categoryNumber: 8,
    categoryName: 'PvP, Bounty & Stats',
    question: 'How do I get 30 Million Bounty / Honor, turn off PvP, and unlock Title colors?',
    aliases: ['how to get 30 million bounty', 'bounty hunting guide', 'turn off pvp', 'title colors', 'safe zone pvp'],
    shortAnswer: 'Bounty 0 to 2.5M: Kill bosses. 2.5M to 30M: Kill players in PvP. PvP turns off for 15 minutes after dying (PvP disabled buff). Title colors unlock by collecting 50+ titles or reaching 10M/20M/30M bounty.',
    fullAnswer: `🏆 **Bounty / Honor & Title Mastery Guide:**\n\n` +
      `• **Bounty Caps:** Bosses only grant bounty up to **2.5 Million**. To reach 30M, you must defeat real players in PvP!\n` +
      `• **Bounty Damage Buffs:** Having higher bounty grants passive damage and defense multipliers (up to +15% damage and defense at 30M) and unlocks Sea Beast summoning at 10M+!\n` +
      `• **PvP Protection:** Dying in PvP gives you a **15-minute PvP Immunity shield**. Leaving safe zones with this buff keeps you safe unless you manually click "Enable PvP".\n` +
      `• **Title Specialist:** Located inside Café (Sea 2) and Mansion (Sea 3). Allows you to equip titles and choose custom neon glow title colors!`,
    tags: ['bounty', '30 million bounty', 'pvp protection', 'title specialist', 'titles']
  },

  // ==========================================
  // CATEGORY 9: SEA EVENTS & NAUTICAL CRAFTING
  // ==========================================
  {
    id: 'c9-boats-shipwright-leviathan',
    categoryNumber: 9,
    categoryName: 'Sea Events & Nautical Crafting',
    question: 'How do I craft the Beast Hunter boat, reach Danger Level 6, and unlock the Shipwright subclass?',
    aliases: ['how to craft beast hunter', 'shipwright subclass', 'danger level 6', 'leviathan boat', 'wooden planks'],
    shortAnswer: 'Beast Hunter: Crafted at Beast Hunter NPC with 20 Leviathan Scales, 6 Electric Wings, 2 Mutant Teeth, 6 Fool’s Gold. Shipwright: Talk to Shipwright Teacher at Tiki Outpost after completing sea events, repair boats with Wooden Planks.',
    fullAnswer: `🚢 **Nautical Crafting, Subclasses & Sea Danger 6:**\n\n` +
      `**1. Reaching Danger Level 6:**\n` +
      `• Spawn a boat at **Tiki Outpost** (Third Sea) and steer straight into the deep ocean with the compass pointing away from the island.\n` +
      `• The ocean will transition from Danger 1 -> 2 -> 3 -> 4 -> 5 -> **Danger 6 (The Unknown)** where giant lightning strikes, ghost fleets, Terrorsharks, and Leviathans spawn!\n\n` +
      `**2. Craft Beast Hunter Boat:**\n` +
      `• Talk to **Beast Hunter** NPC at Tiki Outpost.\n` +
      `• Materials: 20 Leviathan Scales, 6 Electric Wings, 2 Mutant Teeth, 6 Fool’s Gold.\n` +
      `• Equipped with a front heavy Harpoon to capture Leviathan Hearts!\n\n` +
      `**3. Shipwright Subclass:**\n` +
      `• Talk to the **Shipwright Teacher** at Tiki Outpost docks.\n` +
      `• Complete his quest and spend fragments to unlock the ability to craft wooden planks and repair boat hulls in real-time during sea battles!`,
    tags: ['beast hunter', 'shipwright', 'danger level 6', 'wooden planks', 'sea events']
  },

  // ==========================================
  // CATEGORY 10: ACCESSORIES, SCROLLS & ENCHANTMENTS
  // ==========================================
  {
    id: 'c10-scrolls-dragon-artisan',
    categoryNumber: 10,
    categoryName: 'Accessories, Scrolls & Enchantments',
    question: 'How do I craft Mythical/Legendary Scrolls and enchant weapons at the Dragon Artisan?',
    aliases: ['how to craft scrolls', 'dragon artisan location', 'enchant weapons blox fruits', 'mythical scrolls', 'legendary scrolls'],
    shortAnswer: 'Dragon Artisan is located in the top room of Tiki Outpost. Craft Common, Rare, Legendary, or Mythical scrolls using Fool’s Gold, Leviathan Scales, Terror Eyes, and Shark Teeth to apply random enchantments (Blessings & Curses) to Swords and Guns.',
    fullAnswer: `🔮 **Dragon Artisan & Weapon Enchantment Guide:**\n\n` +
      `• **Dragon Artisan Location:** At the very top floor of the stone pagoda at **Tiki Outpost**.\n` +
      `• **Scroll Types:**\n` +
      `  - **Common / Rare Scrolls:** Adds minor percentage stat boosts.\n` +
      `  - **Legendary Scrolls:** Adds 2-3 high tier stats (e.g. +12% Damage, +8% Crit Chance).\n` +
      `  - **Mythical Scrolls (Requires Leviathan Scales & Terror Eyes):** Can unlock ultra-rare **Blessings** (e.g. *Burning*, *Frozen*, *Storm*, *Lifesteal*) or unique **Curses** that supercharge weapon performance!\n` +
      `• **How to Apply:** Open your inventory, select your Sword or Gun, click "Enchant", and choose your crafted scroll to roll new abilities!`,
    tags: ['dragon artisan', 'scrolls', 'enchantments', 'blessings', 'tiki outpost']
  },

  // ==========================================
  // CATEGORY 11: SECRET QUESTS & EVENT PUZZLES
  // ==========================================
  {
    id: 'c11-colosseum-bartilo-puzzle',
    categoryNumber: 11,
    categoryName: 'Secret Quests & Event Puzzles',
    question: 'How do I solve the Colosseum Code and complete the Bartilo Quest in Sea 2?',
    aliases: ['colosseum code puzzle', 'bartilo quest guide', 'colosseum secret door', 'bartilo table letters'],
    shortAnswer: 'Talk to Bartilo at Café -> Kill 50 Swan Pirates -> Kill Jeremy -> Go to Mansion table to read the letter sequence -> Click the matching Greek letters on the Colosseum basement wall to free the prisoners and get Warrior Helmet.',
    fullAnswer: `🏛️ **Bartilo Quest & Colosseum Code Solution:**\n\n` +
      `1. **Start Quest:** Talk to **Bartilo** inside the Café (Second Sea).\n` +
      `2. **Swan Pirates:** Defeat **50 Swan Pirates** in Kingdom of Rose.\n` +
      `3. **Defeat Jeremy:** Climb the mountain behind the Café and defeat **Jeremy (Lv 850)**.\n` +
      `4. **Mansion Table Code:** Enter the Mansion on the high plateau. On the dining table, look at the carved letters.\n` +
      `5. **Colosseum Basement:** Run to the Colosseum, go down the underground stairs to the prison cells, and click the glowing wall plates in the exact code order!\n` +
      `6. **Reward:** Frees the prisoners, awards the **Warrior Helmet**, unlocks Race V2, and enables Third Sea access at Lv 1500!`,
    tags: ['bartilo quest', 'colosseum code', 'warrior helmet', 'race v2 unlock']
  },

  // ==========================================
  // CATEGORY 12: TROUBLESHOOTING & META QUESTIONS
  // ==========================================
  {
    id: 'c12-troubleshooting-faq',
    categoryNumber: 12,
    categoryName: 'Troubleshooting & Meta Questions',
    question: 'Why isn’t the lever appearing in the Temple of Time, or why didn’t I get fragments from my raid?',
    aliases: ['why lever not appearing', 'temple of time lever missing', 'why no fragments from raid', 'what happens if eat fruit holding fruit', 'lose permanent fruit'],
    shortAnswer: 'Lever requires Mirror Fractal + Blue Gear found on Mirage Island during Full Moon. Raid fragments require dealing at least 10% damage to raid mobs/boss. Permanent fruits can NEVER be lost (they remain permanently equipped in the dealer menu).',
    fullAnswer: `🛠️ **Blox Fruits Troubleshooting & Rule Answers:**\n\n` +
      `• **Why is the Temple of Time lever not pulling / missing?** You have not resonated with the moon on Mirage Island using the Mirror Fractal and Blue Gear. All prerequisites must be completed before the lever becomes interactable.\n` +
      `• **Why didn’t I receive Fragments from a completed Raid?** You must deal a minimum percentage of damage during the raid, or you died on island 5 before the boss was defeated.\n` +
      `• **What happens if I eat a new physical fruit while holding another fruit?** Eating a new fruit replaces your current fruit power. The physical fruit you eat is consumed from your inventory.\n` +
      `• **Can I ever lose my Permanent Fruit if I eat a physical fruit?** **NO!** Permanent fruits are bound to your account forever. You can re-equip any permanent fruit at any time for free by opening the Blox Fruit Dealer menu!`,
    tags: ['troubleshooting', 'temple of time lever', 'permanent fruit safety', 'raid fragments']
  },

  // ==========================================
  // CATEGORY 13: RECENT & ONGOING UPDATES
  // ==========================================
  {
    id: 'c13-recent-updates-gas-draco',
    categoryNumber: 13,
    categoryName: 'Recent & Ongoing Updates',
    question: 'How do I get the Gas Fruit, Magnet Fruit, Draco Race, and Dragonheart Sword / Dragonstorm Gun?',
    aliases: ['how to get gas fruit', 'magnet fruit', 'draco race', 'dragonheart sword', 'dragonstorm gun', 'fossil expert barista', 'aura drinks', 'prehistoric island', 'dojo belts'],
    shortAnswer: 'Gas Fruit: Available in dealer rotation ($5.2M / 2,600 Robux). Draco Race & Dragonheart Sword / Dragonstorm Gun: Obtained via the Prehistoric Island & Dragon Master updates through Barista Aura Drinks and Fossil crafting.',
    fullAnswer: `🐉 **Recent Updates & Special Additions Codex:**\n\n` +
      `• **Gas Fruit (Mythical):** High AoE chemical smog damage with Logia intangibility and toxic flight. (Trade Value: ~220M; Demand: 9/10).\n` +
      `• **Magnet Fruit:** Pulls metal weapons and projectiles out of opponent hands and creates electromagnetic force fields.\n` +
      `• **Dragonheart Sword & Dragonstorm Gun:** Crafted at the **Fossil Expert** on **Prehistoric Island** using Ancient Fossils and Dragon Essences.\n` +
      `• **Barista & Aura Drinks:** The Barista NPC crafts special buff smoothies (Aura Boosters) granting temporary 10% damage increases and faster cooldowns.\n` +
      `• **Dojo Belts (White to Black):** Complete combat challenges at the Dojo master on First Sea revamped islands to earn progressive melee defense belts!`,
    tags: ['gas fruit', 'magnet fruit', 'draco race', 'dragonheart sword', 'dragonstorm gun', 'prehistoric island']
  },

  // ==========================================
  // CATEGORY 14: SPECIFIC TRADING & ECONOMY
  // ==========================================
  {
    id: 'c14-trading-calculations-anti-scam',
    categoryNumber: 14,
    categoryName: 'Specific Trading & Economy Calculations',
    question: 'How do I evaluate complex fruit trades, calculate Kitsune/Dragon adds, and avoid scams?',
    aliases: ['fruit a worth b c', 'adds for kitsune dragon', 'perm fruit demand tier list', 'avoid scams trading'],
    shortAnswer: 'Use our live Trade Matrix to check accurate physical values: Dragon West (3.5B), Dragon East (3.0B), Kitsune (640M), Leopard (180M), Dough (180M). Always verify 40% Beli difference with Quake/Love fillers and never accept off-platform trade links.',
    fullAnswer: `⚖️ **Trading & Economy Strategy Guide:**\n\n` +
      `• **High-Tier Trade Math:**\n` +
      `  - 1x Kitsune (640M) = 3x Dough (180M ea) + 1x Leopard (180M).\n` +
      `  - 1x Dragon West (3.5B) = 5x Kitsune equivalent or Fruit Notifier (6B) with high-tier physical adds.\n` +
      `• **The 40% Beli Rule:** In-game trade tables enforce that shop Beli prices cannot differ by >40%. Add high-Beli, low-demand filler fruits like **Quake ($1M), Love ($1.3M), Spider ($1.5M), or Pain ($2.4M)** to balance the table without losing value!\n` +
      `• **Anti-Scam Golden Rule:** Never trust players asking you to click external Discord/Roblox verification links. Only trade through official Café and Mansion in-game trading tables!`,
    tags: ['trading calculations', 'anti scam', 'kitsune trade', 'dragon trade', '40 percent rule']
  },

  // ==========================================
  // CATEGORY 15: LEVELING & GRINDING EFFICIENCY
  // ==========================================
  {
    id: 'c15-fastest-leveling-path',
    categoryNumber: 15,
    categoryName: 'Leveling & Grinding Efficiency',
    question: 'What is the fastest way to level up from Lv 1 to 2550 and which fruit is best?',
    aliases: ['fastest way to level up', 'island guide by level', 'light vs buddha sea 1', 'best grinding fruit'],
    shortAnswer: 'Sea 1 (1-700): Eat Light Fruit for Logia immunity & fast flight. Sea 2 & 3 (700-2550): Eat Buddha, awaken Z move (Shift), put all stats into Melee and Defense, and spam Sharkman Karate M1 clicks.',
    fullAnswer: `📈 **Ultimate 1 to 2550 Leveling Blueprint:**\n\n` +
      `**1. First Sea (Lv 1 - 700):**\n` +
      `• **Fruit:** **Light Fruit** is #1 (Fastest flight in early game + light sword M1 hits + Elemental Logia immunity).\n` +
      `• **Stat Priority:** 60% Melee, 40% Defense, 0% Fruit.\n\n` +
      `**2. Second & Third Sea (Lv 700 - 2550 Max):**\n` +
      `• **Fruit:** **Buddha Fruit (Awakened Z)** is the undisputed king of grinding!\n` +
      `• **Awakened Z Shift:** Gives +50% damage reduction, massive attack reach, and allows you to use fighting styles while giant.\n` +
      `• **Fighting Style:** Use **Sharkman Karate** or **Electric Claw** for lightning-fast M1 auto-attacks!\n` +
      `• **Stat Priority:** 2550 Melee + 2550 Defense + 2550 Sword. Zero points in Fruit needed!`,
    tags: ['leveling', 'grinding', 'light vs buddha', 'fast exp', 'sea progression']
  },

  // ==========================================
  // CATEGORY 16: ERROR STATES, BUGS & ACCOUNT SAFETY
  // ==========================================
  {
    id: 'c16-error-states-hotbar-safety',
    categoryNumber: 16,
    categoryName: 'Error States, Bugs & Account Safety',
    question: 'Why did my fruit vanish from my hotbar and why can’t I store this fruit in Treasure Inventory?',
    aliases: ['why fruit vanish hotbar', 'cant store fruit treasure inventory', 'fruit storage full', 'report hacker exploiter', 'mirage moon not glowing'],
    shortAnswer: 'Fruits in your hotbar are lost if you disconnect, die, or reset without storing. To store, click the fruit and select "Store in Treasure Inventory". You can only store 1 of each fruit unless you buy the +1 Fruit Storage gamepass.',
    fullAnswer: `🛡️ **Inventory Limits & Account Safety:**\n\n` +
      `• **Hotbar vs Treasure Inventory:** When you unbox or find a physical fruit, it sits in your hotbar. If you leave the game, die to a player, or fall in water, it is permanently lost! Always open the fruit menu and select **"Store in Treasure Inventory"** immediately.\n` +
      `• **Storage Limit:** Default account storage is **1 of each fruit**. To store duplicate fruits (e.g. 2x Kitsune, 3x Buddha), you must purchase the **+1 Fruit Storage Gamepass** (400 Robux / ~80M trade value).\n` +
      `• **Why is the Mirage Moon not glowing?** You must have the Mirror Fractal in your inventory, stand on the highest peak of Mirage Island, activate Race V3, and look at the moon without blinking for a full 15 seconds.`,
    tags: ['fruit storage', 'hotbar safety', 'inventory limit', 'mirage moon bug']
  },

  // ==========================================
  // CATEGORY 17: SYSTEM MECHANICS & UI
  // ==========================================
  {
    id: 'c17-system-mechanics-ui',
    categoryNumber: 17,
    categoryName: 'System Mechanics & UI',
    question: 'How do I turn on Shift Lock, redeem codes, trade permanent fruits, and change keybinds?',
    aliases: ['turn on shift lock', 'redeem blox fruits codes', 'trade perm fruits inventory', 'customize boat skins', 'change keybinds'],
    shortAnswer: 'Shift Lock: Enable Shift Lock Switch in Roblox settings (press Shift). Redeem Codes: Click blue Twitter/X icon on left HUD. Trade Perm Fruits: Select "Store in Inventory" when purchasing in shop. Boat Customization: Talk to Luxury Boat Dealer.',
    fullAnswer: `⚙️ **System Mechanics & Controls Guide:**\n\n` +
      `• **Shift Lock:** Open Roblox Settings (ESC), set **Shift Lock Switch: ON**, and press Left Shift on PC (or tap the Shift Lock icon on mobile) to lock camera orientation for precise PvP aiming.\n` +
      `• **Redeem Promo Codes:** Click the small blue **Twitter / X Bird icon** on the left-side HUD, paste active codes, and click "Try" for free 2x EXP boosts and stat resets.\n` +
      `• **Trade Permanent Fruits:** In the in-game Shop, click a Permanent Fruit and choose **"Store in Inventory"** instead of "Buy for Myself". It now appears on trade tables!\n` +
      `• **Boat Customization:** Talk to the **Luxury Boat Dealer** at major docks to select custom hull colors, pirate flags, and engine trails.`,
    tags: ['shift lock', 'redeem codes', 'system mechanics', 'boat customization']
  },

  // ==========================================
  // CATEGORY 18: SUBCLASSES, TRINKETS & ENDGAME
  // ==========================================
  {
    id: 'c18-subclasses-trinkets-endgame',
    categoryNumber: 18,
    categoryName: 'Subclasses, Trinkets & Endgame Enhancements',
    question: 'How do I unlock and level up the Shipwright Subclass and equip Trinkets?',
    aliases: ['how to unlock shipwright', 'shipwright level up', 'trinkets blox fruits', 'trinket npc', 'farm wooden planks'],
    shortAnswer: 'Shipwright: Unlocked from Shipwright Teacher at Tiki Outpost. Level up by repairing damaged boat hulls during sea events. Trinkets: Equip special accessories and passive artifacts at the Trinket Master in Third Sea.',
    fullAnswer: `⚓ **Shipwright Subclass & Trinkets Guide:**\n\n` +
      `• **Shipwright Unlock:** Talk to **Shipwright Teacher** at Tiki Outpost docks in Third Sea.\n` +
      `• **Shipwright Skills:**\n` +
      `  - *Plank Crafting:* Convert tree wood into repair planks.\n` +
      `  - *Hull Reinforcement:* Increases max boat HP by up to +50%.\n` +
      `  - *Heavy Hammer Repair:* Instantly fixes 2,500 boat HP during combat.\n` +
      `• **Trinkets System:** Trinkets provide small passive percentage buffs (e.g. +5% swimming speed, +3% lifesteal) and are socketed at the Trinket NPC inside the Castle on the Sea.`,
    tags: ['shipwright', 'subclasses', 'trinkets', 'boat repair', 'tiki outpost']
  },

  // ==========================================
  // CATEGORY 19: GAME MODES & DUNGEONS
  // ==========================================
  {
    id: 'c19-game-modes-dungeons',
    categoryNumber: 19,
    categoryName: 'Game Modes & Dungeons',
    question: 'How do I enter Dungeon Mode, defeat Dungeon Bosses, and what are the best solo builds?',
    aliases: ['how to enter dungeon mode', 'defeat dungeon bosses', 'dungeon rewards', 'best fruit solo dungeons'],
    shortAnswer: 'Dungeon / Raid rooms are located at Hot and Cold (Sea 2) and Castle on the Sea (Sea 3). Best solo build: Awakened Buddha + Shark V3/V4 + Sharkman Karate + Pale Scarf for infinite health sustain and reach.',
    fullAnswer: `🏰 **Dungeon & Raid Solo Strategy:**\n\n` +
      `• **Entry:** Buy a Microchip from Mysterious Scientist and stand on the pod.\n` +
      `• **Best Solo Build:**\n` +
      `  - **Fruit:** Awakened Buddha (Z Shift)\n` +
      `  - **Fighting Style:** Sharkman Karate or Sanguine Art\n` +
      `  - **Race:** Shark V4 (Leviathan Armor prevents dying) or Ghoul V4 (Infinite Lifesteal)\n` +
      `  - **Accessory:** Leviathan Shield (+1200 HP) or Pale Scarf\n` +
      `• **Strategy:** Stand in the center of each island in giant Buddha form, hold left-click M1, and spam Sharkman Karate punches to wipe all 5 waves before the timer expires!`,
    tags: ['dungeon mode', 'raids', 'solo buddha', 'dungeon bosses']
  },

  // ==========================================
  // CATEGORY 20: EVENT CURRENCIES, GACHAS & SKINS
  // ==========================================
  {
    id: 'c20-event-currencies-skins',
    categoryNumber: 20,
    categoryName: 'Event Currencies, Gachas & Fruit Skins',
    question: 'How do I get Oni Tokens, Celestial Tokens, and Chromatic Fruit Skins (Purple Lightning, Frustration Pain)?',
    aliases: ['oni tokens', 'celestial tokens', 'summer tokens', 'chromatic fruit skins', 'purple lightning', 'red gacha celestial gacha', 'death king title'],
    shortAnswer: 'Obtained during seasonal live events by completing limited-time event quests, rolling the Event Gacha with event tokens, and trading event items during Halloween, Christmas, Summer, and Valentine updates.',
    fullAnswer: `🎉 **Event Currencies, Gachas & Chromatic Skins Guide:**\n\n` +
      `• **Event Tokens (Oni / Celestial / Summer Tokens):** Earned by defeating event raid bosses and completing daily seasonal challenges.\n` +
      `• **Celestial & Red Event Gacha:** Special event vending machines located at Middle Town and Café that reward limited-time titles, cosmetic fruit skins, and rare event accessories.\n` +
      `• **Chromatic Fruit Skins:** Special visual reskins for popular fruits (e.g. *Purple Lightning Rumble*, *Frustration Pain*, *Golden Buddha*) available through event token exchange or high-tier collector trade tables!\n` +
      `• **Exclusive Event Titles:** Titles like *Death King*, *Skeleton*, and *Cupid* are unlocked by participating in their respective holiday events.`,
    tags: ['event currencies', 'chromatic skins', 'oni tokens', 'event gacha', 'seasonal items']
  },

  // ==========================================
  // CATEGORY 21: SLANG, ABBREVIATIONS & TYPOS
  // ==========================================
  {
    id: 'c21-slang-abbreviations',
    categoryNumber: 21,
    categoryName: 'Slang, Abbreviations & Typos',
    question: 'What do Blox Fruits slang terms mean (CDK, TTK, GH, RDR/Indra, Mirage Full Moon)?',
    aliases: ['cdik', 'rdr', 'gh', 'ttk', 'cdk', 'sea 2 fast no cap', 'mirage full moon', 'buddha fruit cheap'],
    shortAnswer: 'CDK = Cursed Dual Katana, TTK = True Triple Katana, GH = Godhuman, RDR/Indra = rip_indra raid boss, Ken = Observation Haki, M1 = Basic left-click attack, V4 = Race Awakening Tier 4.',
    fullAnswer: `📖 **Blox Fruits Slang & Acronym Dictionary:**\n\n` +
      `• **CDK / CDIK:** Cursed Dual Katana (Top Mythical Sword).\n` +
      `• **TTK:** True Triple Katana (Shisui + Saddi + Wando).\n` +
      `• **GH:** Godhuman (Top Martial Art).\n` +
      `• **RDR / Indra:** rip_indra (Level 5000 Raid Boss at Castle on the Sea).\n` +
      `• **Ken / Instinct:** Observation Haki dodge mechanic.\n` +
      `• **Buso:** Enhancement / Armament Aura Haki.\n` +
      `• **Perm:** Permanent Fruit bought with Robux.\n` +
      `• **M1:** Primary left-click attack on melee/sword/fruit.\n` +
      `• **W / F / L:** Win (Profitable trade), Fair (Even trade), Loss (Overpay/bad trade).`,
    tags: ['slang', 'abbreviations', 'cdk', 'ttk', 'gh', 'indra']
  },

  // ==========================================
  // CATEGORY 22: COMPOUND QUESTIONS
  // ==========================================
  {
    id: 'c22-compound-questions',
    categoryNumber: 22,
    categoryName: 'Multi-Intent / Compound Questions',
    question: 'How do I reach Sea 2 and what level do I need? / How do I get Yama and Tushita at the same time?',
    aliases: ['reach sea 2 and level needed', 'yama and tushita together', 'race v2 npc and flowers', 'mirage island and v4 lever', 'instinct level and cost'],
    shortAnswer: 'Sea 2 requires Level 700 + Ice Admiral. Yama (30 Elite Hunter kills) & Tushita (light 5 torches during rip_indra) can be farmed in parallel once you reach Third Sea (Lv 1500+).',
    fullAnswer: `🔗 **Compound Multi-Step Game Solutions:**\n\n` +
      `• **Sea 2 + Level:** Must be **Level 700**. Talk to Military Detective at Prison, defeat Ice Admiral at Frozen Village cave, and take Experienced Captain at Middle Town.\n` +
      `• **Yama & Tushita Together:** Both swords can be pursued at the same time in Third Sea! Do Elite Hunter quests whenever an elite spawns for Yama (need 30 kills). In between spawns, wait for a player to summon rip_indra at Castle on the Sea to run through the waterfall and light the 5 torches for Tushita!\n` +
      `• **Race V2 NPC & Flowers:** Alchemist is in Green Zone under the blue mushroom. You need 3 flowers: Red (Daytime Green Zone/Mansion), Blue (Nighttime Graveyard), Yellow (NPC drop) + $500,000 Beli.`,
    tags: ['compound questions', 'sea 2 level', 'yama tushita together', 'race v2 flowers']
  },

  // ==========================================
  // CATEGORY 23: DIRECT COMPARISON & DECISION-MAKING
  // ==========================================
  {
    id: 'c23-comparisons-decision-making',
    categoryNumber: 23,
    categoryName: 'Direct Comparison & Decision-Making',
    question: 'Should I reach Max Level 2550 or get Godhuman first? / Light vs Magma for Sea 1? / CDK vs TTK? / Mink vs Cyborg V4?',
    aliases: ['level 2450 vs godhuman first', 'light or magma sea 1', 'cdk vs ttk', 'buddha or blizzard raids', 'mink or cyborg v4 first'],
    shortAnswer: '1) Level to Max Level first with Buddha, then farm Godhuman masteries. 2) Light is better for Sea 1 (faster flight + M1 sword). 3) CDK is better for burst PvP combos than TTK. 4) Cyborg V4 is better for aggressive PvP (Ken breaking); Mink V4 is better for speed/hit-and-run.',
    fullAnswer: `⚖️ **Sensei Direct Comparison & Strategy Breakdown:**\n\n` +
      `• **Max Level 2550 vs Godhuman First:** **Reach Max Level first!** Leveling to max with Buddha gives you 7,650 stat points, making mastery farming on Superhuman, Death Step, Sharkman, E-Claw, and Dragon Talon 5x faster.\n` +
      `• **Light vs Magma for First Sea:** **Light Fruit wins for Sea 1!** Light provides high-speed flight between islands and has a built-in light blade M1. Magma is better for Sea Beasts in Sea 2 & 3.\n` +
      `• **CDK vs TTK:** **CDK wins for PvP!** Cursed Dual Katana has faster startup frames, a long dash stun (CDK Z), and massive knockup (CDK X). True Triple Katana (TTK) has higher single-hit damage but slower combo links.\n` +
      `• **Buddha vs Blizzard for Raids:** **Buddha is #1 for soloing raids** due to 50% defense and giant M1 reach. Blizzard is amazing for crowd control.\n` +
      `• **Cyborg V4 vs Shark V4 vs Mink V4:** Get **Shark V4** for defense and sea events, **Cyborg V4** for Ken-breaking PvP combos, or **Human V4** for one-shot burst damage!`,
    tags: ['comparisons', 'cdk vs ttk', 'light vs magma', 'godhuman vs max level', 'race v4 comparison']
  },

  // ==========================================
  // CATEGORY 24: PRESTIGIOUS TITLES CODEX (#001 - #177)
  // ==========================================
  {
    id: 'titles-race-evolutions',
    categoryNumber: 24,
    categoryName: 'Titles: Race Evolutions (V2, V3, V4)',
    question: 'How do I unlock all Race Evolution Titles (Human, Mink, Shark, Angel, Ghoul, Cyborg V2/V3/V4)?',
    aliases: [
      'how do i get the unleashed #001', 'full power #007', 'berserker #013',
      'unmatched speed #002', 'godspeed #008', 'thunderbolt #014',
      'sea monster #003', 'warrior of the sea #009', 'leviathan #015',
      'sacred warrior #004', 'perfect being #010', 'his majesty #016',
      'the ghoul #005', 'hell hound #011', 'nightwalker #017',
      'the cyborg #006', 'war machine #012', 'genesis #018'
    ],
    shortAnswer: 'V2 titles (#001-#006) require completing the Alchemist flower quest. V3 titles (#007-#012) require Arowe quests in Sea 2. V4 titles (#013-#018) require completing the Temple of Time trials during Full Moon.',
    fullAnswer: `👑 **Comprehensive Race Evolution Titles (#001 - #018):**\n\n` +
      `• **Human Titles:**\n` +
      `  - **#001 "The Unleashed":** Obtain Human V2 ($500k Beli + 3 Flowers from Alchemist).\n` +
      `  - **#007 "Full Power":** Obtain Human V3 (Defeat Diamond, Jeremy, and Fajita for Arowe).\n` +
      `  - **#013 "Berserker":** Awaken Human V4 in the Temple of Time (Trial of Strength).\n\n` +
      `• **Rabbit / Mink Titles:**\n` +
      `  - **#002 "Unmatched Speed":** Obtain Mink V2 (Alchemist flower quest).\n` +
      `  - **#008 "Godspeed":** Obtain Mink V3 (Collect 30 chests across Second Sea for Arowe).\n` +
      `  - **#014 "Thunderbolt":** Awaken Mink V4 in the Temple of Time (Trial of Speed).\n\n` +
      `• **Shark / Fishman Titles:**\n` +
      `  - **#003 "Sea Monster":** Obtain Shark V2 (Alchemist flower quest).\n` +
      `  - **#009 "Warrior of the Sea":** Obtain Shark V3 (Defeat a Sea Beast for Arowe).\n` +
      `  - **#015 "Leviathan":** Awaken Shark V4 in the Temple of Time (Trial of Water).\n\n` +
      `• **Angel / Skypiean Titles:**\n` +
      `  - **#004 "Sacred Warrior":** Obtain Angel V2 (Alchemist flower quest).\n` +
      `  - **#010 "Perfect Being":** Obtain Angel V3 (Defeat a player of the same race for Arowe).\n` +
      `  - **#016 "His Majesty":** Awaken Angel V4 in the Temple of Time (Trial of King).\n\n` +
      `• **Ghoul Titles:**\n` +
      `  - **#005 "The Ghoul":** Obtain Ghoul V2 (Alchemist flower quest).\n` +
      `  - **#011 "Hell Hound":** Obtain Ghoul V3 (Defeat 5 players for Arowe).\n` +
      `  - **#017 "Nightwalker":** Awaken Ghoul V4 in the Temple of Time (Trial of Carnage).\n\n` +
      `• **Cyborg Titles:**\n` +
      `  - **#006 "The Cyborg":** Obtain Cyborg V2 (Alchemist flower quest).\n` +
      `  - **#012 "War Machine":** Obtain Cyborg V3 (Give a physical fruit to Arowe).\n` +
      `  - **#018 "Genesis":** Awaken Cyborg V4 in the Temple of Time (Trial of Machines).`,
    tags: ['titles', 'race v2', 'race v3', 'race v4', 'berserker', 'leviathan', 'genesis']
  },
  {
    id: 'titles-bounty-honor',
    categoryNumber: 24,
    categoryName: 'Titles: Bounty & Honor Thresholds',
    question: 'How do I unlock Bounty and Honor Titles (Pirate Hunter, Emperor of the Sea, Fleet Admiral)?',
    aliases: [
      'pirate hunter #019 #022', 'bounty hunter #020 #023', 'warlord of the sea #021 #024',
      'emperor of the sea #022 #025', 'empress of the sea #023 #026', 'admiral #024 #027', 'fleet admiral #025 #028'
    ],
    shortAnswer: 'Bounty & Honor titles unlock at 5M, 10M, 15M, and 20M+ PvP thresholds. 20M+ grants Emperor/Empress of the Sea (Pirates) and Fleet Admiral (Marines).',
    fullAnswer: `⚔️ **Bounty & Honor PvP Threshold Titles:**\n\n` +
      `• **Basic PvP Titles (5M+):**\n` +
      `  - **#019 / #022 "Pirate Hunter":** Reach 5,000,000 Marine Honor.\n` +
      `  - **#020 / #023 "Bounty Hunter":** Reach 5,000,000 Pirate Bounty.\n\n` +
      `• **High-Tier Pirate Bounty Titles:**\n` +
      `  - **#021 / #024 "Warlord of the Sea":** Reach 10,000,000 Pirate Bounty.\n` +
      `  - **#022 / #025 "Emperor of the Sea":** Reach 20,000,000 Pirate Bounty (Male avatar).\n` +
      `  - **#023 / #026 "Empress of the Sea":** Reach 20,000,000 Pirate Bounty (Female avatar).\n\n` +
      `• **High-Tier Marine Honor Titles:**\n` +
      `  - **#024 / #027 "Admiral":** Reach 10,000,000 Marine Honor.\n` +
      `  - **#025 / #028 "Fleet Admiral":** Reach 20,000,000 Marine Honor.\n\n` +
      `💡 *Note: High bounty also grants up to +15% damage bonus, custom summonable Sea Beasts, and glowing name tags!*`,
    tags: ['titles', 'bounty', 'honor', 'emperor of the sea', 'fleet admiral']
  },
  {
    id: 'titles-fruit-awakenings',
    categoryNumber: 24,
    categoryName: 'Titles: Fruit Awakenings',
    question: 'How do I unlock all Awakened Fruit Titles (Enlightened One, Flame Fist, Bread Chaser, Thunder God)?',
    aliases: [
      'enlightened one #026', 'awakened one #027', 'over heaven #028', 'over hell #029',
      'flame fist #030', 'the ice king #031', 'the ice queen #032', 'the strongest one #033',
      'the first light #034', 'dark lord #035', 'the spider #036', 'thunder god #037',
      'the red dog #038', 'colossal god #039', 'desert prince #040', 'the phoenix #041', 'bread chaser #042'
    ],
    shortAnswer: 'Unlocked by fully completing Fruit Raids and awakening all moves on specific fruits (e.g., Bread Chaser = Dough, Colossal God = Buddha, Thunder God = Rumble).',
    fullAnswer: `🍎 **Fruit Awakening Master Titles (#026 - #045):**\n\n` +
      `• **General Awakening Milestones:**\n` +
      `  - **#026 "Enlightened One":** Awaken your first move in any Fruit Raid.\n` +
      `  - **#027 "Awakened One":** Fully awaken all moves on any fruit.\n` +
      `  - **#028 "Over Heaven":** Fully awaken 5 different fruits.\n` +
      `  - **#029 "Over Hell":** Fully awaken 10 different fruits.\n\n` +
      `• **Fruit-Specific Titles (Fully Awaken All Moves):**\n` +
      `  - **#030 "Flame Fist":** Fully awaken Flame Fruit (Mera).\n` +
      `  - **#031 / #032 "The Ice King" / "The Ice Queen":** Fully awaken Ice Fruit (Hie).\n` +
      `  - **#033 "The Strongest One":** Fully awaken Quake Fruit (Gura).\n` +
      `  - **#034 "The First Light":** Fully awaken Light Fruit (Pika).\n` +
      `  - **#035 "Dark Lord":** Fully awaken Dark Fruit (Yami).\n` +
      `  - **#036 "The Spider":** Fully awaken Spider Fruit (String).\n` +
      `  - **#037 "Thunder God":** Fully awaken Rumble Fruit (Goro).\n` +
      `  - **#038 "The Red Dog":** Fully awaken Magma Fruit (Magu).\n` +
      `  - **#039 "Colossal God":** Fully awaken Buddha Fruit (Daibutsu).\n` +
      `  - **#040 / #043 "Desert Prince":** Fully awaken Sand Fruit (Suna).\n` +
      `  - **#041 / #044 "The Phoenix":** Fully awaken Phoenix Fruit (Tori).\n` +
      `  - **#042 / #045 "Bread Chaser":** Fully awaken Dough Fruit (Mochi).`,
    tags: ['titles', 'fruit awakenings', 'bread chaser', 'colossal god', 'thunder god']
  },
  {
    id: 'titles-boss-defeats-events',
    categoryNumber: 24,
    categoryName: 'Titles: Boss Defeats & Special Events',
    question: 'How do I unlock Boss Defeat and Raid Milestone Titles (Heavenly Devil, Shadow Sovereign, Serpent Slayer)?',
    aliases: [
      'heavenly devil #119', 'the cursed one #120', 'beyond death #121', 'night\'s edge #122',
      'shadow sovereign #162', 'dough commander #171', 'dough king #172', 'serpent slayer #174',
      'the conqueror #099', 'last hope #100', 'the supersonic #101', 'the flash #102'
    ],
    shortAnswer: 'Defeat world and raid bosses (Don Swan, Darkbeard, Order, Cursed Captain, rip_indra, Dough King, Leviathan) and clear raids under strict time limits.',
    fullAnswer: `👑 **Boss Defeat & Raid Speedrun Titles:**\n\n` +
      `• **World & Raid Boss Defeats:**\n` +
      `  - **#119 "Heavenly Devil":** Defeat Don Swan inside Swan Mansion basement (Sea 2).\n` +
      `  - **#120 "The Cursed One":** Defeat Darkbeard at Dark Arena using Fist of Darkness (Sea 2).\n` +
      `  - **#121 "Beyond Death":** Defeat Order (Law raid boss) at Hot and Cold (Sea 2).\n` +
      `  - **#122 "Night\'s Edge":** Defeat Cursed Captain on the Cursed Ship (Sea 2).\n` +
      `  - **#162 "Shadow Sovereign":** Defeat rip_indra (True Form) at Castle on the Sea (Sea 3).\n` +
      `  - **#171 "Dough Commander":** Defeat Cake Prince at Sea of Treats.\n` +
      `  - **#172 "Dough King":** Defeat Dough King in the Mirror Dimension.\n` +
      `  - **#174 "Serpent Slayer":** Defeat the colossal Leviathan in the Frozen Dimension (Sea 3 Danger 6).\n\n` +
      `• **Raid Speed & Milestone Titles:**\n` +
      `  - **#099 "The Conqueror":** Clear any Raid in under 10 minutes.\n` +
      `  - **#100 "Last Hope":** Clear a Raid with under 10% health remaining.\n` +
      `  - **#101 "The Supersonic":** Clear a Raid in under 5 minutes.\n` +
      `  - **#102 "The Flash":** Clear a Raid in under 3 minutes (Speedrun).`,
    tags: ['titles', 'bosses', 'shadow sovereign', 'dough king', 'serpent slayer', 'heavenly devil']
  },
  {
    id: 'titles-weapons-mastery',
    categoryNumber: 24,
    categoryName: 'Titles: Weapons, Styles & Mastery',
    question: 'How do I unlock Weapon, Fighting Style, and Max Mastery 600 Titles (The Master, God Blade, Demon Eye)?',
    aliases: [
      'the master #089 #092', 'unbreakable will #090 #093', 'fist of death #094', 'god blade #095',
      'king sniper #096', 'beyond the sea #097', 'dragonborn #125', 'burning leg #126',
      'sharkman #127', 'the killer #139', 'human weapon #140', 'demon eye #141',
      'the hurricane #142', 'demon mode #159', 'celestial swordsman #160'
    ],
    shortAnswer: 'Reach 600 Mastery on fighting styles/swords/guns/fruits and unlock signature weapons like TTK, CDK, Yama, Tushita, and Superhuman.',
    fullAnswer: `🗡️ **Weapons, Martial Arts & Mastery Titles:**\n\n` +
      `• **600 Max Mastery Milestones:**\n` +
      `  - **#089 / #092 "The Master":** Reach 600 Mastery on any Weapon or Fruit.\n` +
      `  - **#090 / #093 "Unbreakable Will":** Reach 600 Mastery on 3 different items.\n` +
      `  - **#094 "Fist of Death":** Reach 600 Mastery on any Fighting Style.\n` +
      `  - **#095 "God Blade":** Reach 600 Mastery on any Sword.\n` +
      `  - **#096 "King Sniper":** Reach 600 Mastery on any Gun.\n` +
      `  - **#097 "Beyond the Sea":** Reach 600 Mastery on any Blox Fruit.\n\n` +
      `• **Weapon & Fighting Style Unlocks:**\n` +
      `  - **#125 / #128 "Dragonborn":** Unlock Dragon Breath from Sabi ($1.5k Frags).\n` +
      `  - **#126 / #129 "Burning Leg":** Unlock Death Step martial art ($2.5M + 5k Frags).\n` +
      `  - **#127 / #130 "Sharkman":** Unlock Sharkman Karate ($2.5M + 5k Frags).\n` +
      `  - **#139 "The Killer":** Unlock Superhuman fighting style ($3M Beli).\n` +
      `  - **#140 "Human Weapon":** Reach 400 Mastery on Superhuman.\n` +
      `  - **#141 "Demon Eye":** Purchase and forge True Triple Katana (TTK).\n` +
      `  - **#142 "The Hurricane":** Reach 350+ Mastery on TTK.\n` +
      `  - **#159 "Demon Mode":** Obtain Yama sword from Secret Waterfall.\n` +
      `  - **#160 "Celestial Swordsman":** Obtain Tushita sword by lighting 5 torches.`,
    tags: ['titles', 'mastery 600', 'demon eye', 'god blade', 'fist of death', 'ttk', 'yama']
  },
  {
    id: 'titles-pvp-streaks',
    categoryNumber: 24,
    categoryName: 'Titles: PvP Kills & Server Streaks',
    question: 'How do I unlock PvP Killstreak and Multi-Kill Titles (Unstoppable Force, Raging Demon, Apex Predator)?',
    aliases: [
      'unstoppable force #134', 'raging demon #135', 'the protagonist #136',
      'coldblooded #137', 'apex predator #138'
    ],
    shortAnswer: 'Eliminate players in PvP without dying: 5 kills = Unstoppable Force, 20 kills = Raging Demon, 2+ at once = The Protagonist, 25 server kills = Apex Predator.',
    fullAnswer: `🩸 **PvP Killstreak & Server Dominance Titles:**\n\n` +
      `• **#134 "Unstoppable Force":** Defeat 5 players in PvP without dying in a single session.\n` +
      `• **#135 "Raging Demon":** Defeat 20 players in PvP without dying in a single session.\n` +
      `• **#136 "The Protagonist":** Eliminate 2 or more players within 3 seconds using an AoE combo (Multi-kill).\n` +
      `• **#137 "Coldblooded":** Defeat 10 different players in the same public server.\n` +
      `• **#138 "Apex Predator":** Defeat 25 players in the same public server.\n\n` +
      `💡 *Tip: High-AoE fruits like Awakened Dough, Blizzard, and Dragon are ideal for multi-kills!*`,
    tags: ['titles', 'pvp', 'killstreak', 'raging demon', 'apex predator']
  },
  {
    id: 'titles-haki-auras',
    categoryNumber: 24,
    categoryName: 'Titles: Haki & Aura Colors',
    question: 'How do I unlock Haki Titles (Iron Man, Ultra Instinct, Hakaishin, Realm Creator)?',
    aliases: [
      'iron man #068 #071', 'ultra instinct #069 #072', 'the enhancer #143',
      'true heart #144', 'bringer of doom #145', 'realm creator #146', 'hakaishin #147'
    ],
    shortAnswer: 'Max out Stage 5 Full Body Buso Haki (Iron Man), max out Observation/Instinct dodges (Ultra Instinct), unlock rare colors, and buy all regular aura colors (Hakaishin).',
    fullAnswer: `⚡ **Haki & Aura Colors Titles:**\n\n` +
      `• **Haki Mastery:**\n` +
      `  - **#068 / #071 "Iron Man":** Reach Stage 5 Full Body Enhancement / Buso Aura (60,000 hits taken/dealt).\n` +
      `  - **#069 / #072 "Ultra Instinct":** Reach maximum Observation / Instinct V1 dodges (5,000 EXP).\n\n` +
      `• **Aura Color Titles (from Master of Auras NPC):**\n` +
      `  - **#143 "The Enhancer":** Unlock your first non-default Aura Color (1,500 Frags).\n` +
      `  - **#144 "True Heart":** Unlock Pink Aura Color (Pure Red / Heat Wave).\n` +
      `  - **#145 "Bringer of Doom":** Unlock Legendary Aura Color *Snow White* (7,500 Frags).\n` +
      `  - **#146 "Realm Creator":** Unlock Legendary Aura Color *Pure Red* (7,500 Frags).\n` +
      `  - **#147 "Hakaishin":** Purchase all 10 regular Aura Colors + all 3 Legendary Colors (Snow White, Pure Red, Winter Sky).`,
    tags: ['titles', 'haki', 'aura colors', 'iron man', 'ultra instinct', 'hakaishin']
  },
  {
    id: 'titles-sea-events-collectibles',
    categoryNumber: 24,
    categoryName: 'Titles: Sea Events, Farming & Collectibles',
    question: 'How do I unlock Sea Event and Collectible Titles (Beast Hunter, Nautical Bane, Tailed Beast)?',
    aliases: [
      'beast hunter #110 #113', 'the beast #111 #114', 'nautical bane #176',
      'the ghost #149', 'ruler of night #150', 'lonely reaper #151', 'tailed beast #177'
    ],
    shortAnswer: 'Defeat Sea Beasts (1 = Beast Hunter, 25 = The Beast), clear 200 Sea Events (Nautical Bane), collect Ectoplasm on Cursed Ship, and pray at Kitsune Shrine (Tailed Beast).',
    fullAnswer: `🌊 **Sea Events & Collectible Titles:**\n\n` +
      `• **Sea Beasts & Rough Seas:**\n` +
      `  - **#110 / #113 "Beast Hunter":** Defeat your first Sea Beast in Second or Third Sea.\n` +
      `  - **#111 / #114 "The Beast":** Defeat 25 Sea Beasts.\n` +
      `  - **#176 "Nautical Bane":** Clear 200 total Sea Events (Sea Beasts, Ghost Ships, Terror Sharks, Piranhas).\n\n` +
      `• **Ectoplasm Collectibles (Cursed Ship):**\n` +
      `  - **#149 "The Ghost":** Collect 100 Ectoplasm from Cursed Ship mobs.\n` +
      `  - **#150 "Ruler of Night":** Collect 250 Ectoplasm.\n` +
      `  - **#151 "Lonely Reaper":** Collect 1,000 Ectoplasm.\n\n` +
      `• **Kitsune Shrine Event:**\n` +
      `  - **#177 "Tailed Beast":** Collect Azure Embers and successfully pray at the Kitsune Shrine during Full Moon in Sea Danger Level 6.`,
    tags: ['titles', 'sea events', 'beast hunter', 'nautical bane', 'tailed beast', 'ectoplasm']
  },
  {
    id: 'titles-secrets-deaths',
    categoryNumber: 24,
    categoryName: 'Titles: Secret Puzzles & Unexpected Deaths',
    question: 'How do I unlock Secret Easter Egg and Death Titles (The Dog, Slayer of God, Empty Vessel, The Troll)?',
    aliases: [
      'the dog #081 #084', 'slayer of god #148', 'the mad king #079 #082', 'the mastermind #080 #083',
      'forbidden one #113 #116', 'the devil\'s luck #170', 'empty vessel #064 #067',
      'the unlucky #065 #068', 'the vanquished #066 #069', 'fallen hero #067 #070',
      'tide warrior #101 #104', 'the troll #117'
    ],
    shortAnswer: 'Interact with secret Easter Eggs (Doghouse in Sea 2, Dark Blade grave, Chess table) and die in hilarious ways (energy zero, water, holding a physical fruit).',
    fullAnswer: `💀 **Secret Easter Egg & Death Titles:**\n\n` +
      `• **Secret Easter Egg Triggers:**\n` +
      `  - **#081 / #084 "The Dog":** Interact with the secret doghouse next to the Kingdom of Rose mansion in Second Sea.\n` +
      `  - **#148 "Slayer of God":** Interact with the secret gravestone in the graveyard while holding Dark Blade V2/V3.\n` +
      `  - **#079 / #082 "The Mad King":** Play a match on the Chess table in Cafe (Second Sea).\n` +
      `  - **#080 / #083 "The Mastermind":** Win a game of Chess.\n` +
      `  - **#113 / #116 "Forbidden One":** Find a Fist of Darkness inside a random chest in Second Sea.\n` +
      `  - **#170 "The Devil\'s Luck":** Obtain both a Hallow Essence and God\'s Chalice in the same session.\n\n` +
      `• **Funny & Accidental Death Titles:**\n` +
      `  - **#064 / #067 "Empty Vessel":** Completely run out of Energy/Stamina in combat.\n` +
      `  - **#065 / #068 "The Unlucky":** Die to a regular basic mob enemy.\n` +
      `  - **#066 / #069 "The Vanquished":** Die to a boss enemy.\n` +
      `  - **#067 / #070 "Fallen Hero":** Die inside a Fruit Raid.\n` +
      `  - **#101 / #104 "Tide Warrior":** Die to water drowning without Shark race.\n` +
      `  - **#117 "The Troll":** Die while holding an unstored physical fruit in your hands!`,
    tags: ['titles', 'secrets', 'the dog', 'the troll', 'slayer of god', 'death titles']
  },
  {
    id: 'titles-admin-crew-social',
    categoryNumber: 24,
    categoryName: 'Titles: Admin, Crew, Social & Seasonal',
    question: 'How do I unlock Admin, Crew, Social and Seasonal Titles (Equal to the Heavens, rip_family, Pirate King)?',
    aliases: [
      'equal to the heavens #104', 'water gang', 'don axiore familia', 'kitt katt',
      'rip_family #061 #064', 'red_legion #062', 'pirate king #153',
      'undead lord #167', 'death king #168', 'sugar rush #154', 'loco verde #156',
      'deep peach', 'powder blue', 'classic rose'
    ],
    shortAnswer: 'Defeat staff/YouTubers, join official Roblox groups (rip_family), hold #1 crew leaderboard (Pirate King), participate in seasonal events, or unlock 20-140+ titles for colored name tags.',
    fullAnswer: `🌟 **Admin, Crew, Social & Seasonal Titles:**\n\n` +
      `• **Staff & Content Creator Bounties:**\n` +
      `  - **#104 "Equal to the Heavens":** Defeat a Blox Fruits Developer or Admin in PvP.\n` +
      `  - **"Water Gang", "Don Axiore", "Kitt Katt":** Defeat official partnered content creators.\n\n` +
      `• **Roblox Group Verification:**\n` +
      `  - **#061 / #064 "rip_family":** Join the official *rip family* Roblox group and put "rip_" in your Roblox display name.\n` +
      `  - **#062 "red_legion":** Join the official *Red Legion* group.\n\n` +
      `• **Leaderboard Dominance:**\n` +
      `  - **#153 "Pirate King":** Own a Top 10 Crew on the global Bounty Leaderboard for 72+ hours.\n\n` +
      `• **Seasonal & Holiday Events:**\n` +
      `  - **#167 "Undead Lord" / #168 "Death King":** Collect Bones and roll Death King gacha during Halloween.\n` +
      `  - **#154 "Sugar Rush" / #156 "Loco Verde":** Collect Candies during Christmas event.\n\n` +
      `• **Title Milestone Color Badges (Colored Name Tags):**\n` +
      `  - **Deep Peach:** Unlock 20 total titles.\n` +
      `  - **Powder Blue:** Unlock 90 total titles.\n` +
      `  - **Classic Rose:** Unlock 140+ total titles!`,
    tags: ['titles', 'admin titles', 'pirate king', 'rip_family', 'colored titles']
  },

  // ==========================================
  // CATEGORY 25: GAME MECHANICS & TROUBLESHOOTING
  // ==========================================
  {
    id: 'mech-elemental-immunity',
    categoryNumber: 25,
    categoryName: 'Combat & Damage Math',
    question: 'Why am I still taking damage from elemental attacks even though I have elemental immunity?',
    aliases: ['taking damage with elemental immunity', 'why elemental immunity not working', 'logia immunity bypass', 'logia level requirement'],
    shortAnswer: 'Elemental (Logia) immunity only activates when your character level is higher than the enemy NPC by a specific threshold, or if the enemy does NOT have Buso Haki / Ken-bypassing skills.',
    fullAnswer: `🛡️ **Elemental Immunity (Logia) Calculation & Mechanics:**\n\n` +
      `• **The Level Gap Requirement:** Logia immunity is **NOT unconditional**. To gain complete immunity to an NPC's physical attacks, your level must exceed the NPC's level by a specific margin (typically +5 to +20 levels depending on the sea).\n` +
      `• **NPCs with Aura / Buso Haki:** Many NPCs in Second Sea and Third Sea (e.g., Swan Pirates, Chocolate Barbarians, Sea Soldiers) spawn with active **Buso Haki / Aura**. If an enemy has Haki, they will completely bypass your elemental immunity regardless of your level.\n` +
      `• **Boss Moves & Explosions:** All World Bosses, Raid Bosses, and Sea Beasts possess natural Haki and bypass elemental immunity.\n` +
      `• **Player PvP:** All player attacks bypass elemental immunity if they have Buso Haki active or use Elemental / Sword / Gun skills.`,
    tags: ['elemental immunity', 'logia immunity', 'damage calculation', 'troubleshooting']
  },
  {
    id: 'mech-bounty-honor-buffs',
    categoryNumber: 25,
    categoryName: 'Combat & Damage Math',
    question: 'How much extra damage do I actually deal at 30 Million Bounty versus 2.5 Million Bounty?',
    aliases: ['30m bounty damage buff', 'bounty honor damage multiplier', 'does high bounty increase damage', 'bounty stat boosts'],
    shortAnswer: 'Reaching 30 Million Bounty grants a +15% total damage multiplier across Melee, Sword, Gun, and Fruit, plus a +15% defense damage reduction and faster skill cooldowns.',
    fullAnswer: `📈 **Bounty / Honor Stat Scaling Table (2.5M to 30M):**\n\n` +
      `• **2.5 Million (Base):** +0% Bonus Damage, +0% Defense.\n` +
      `• **5.0 Million:** +3% Bonus Damage, +3% Defense.\n` +
      `• **10.0 Million:** +6% Bonus Damage, +6% Defense.\n` +
      `• **15.0 Million:** +9% Bonus Damage, +9% Defense, spawnable Sea Beast in Sea 2 & 3.\n` +
      `• **20.0 Million:** +12% Bonus Damage, +12% Defense, special Emperor/Admiral aura.\n` +
      `• **30.0 Million (Max):** **+15% Total Damage Output**, **+15% Total Damage Reduction**, and reduced move recovery frames.\n\n` +
      `💡 *In high-level competitive PvP, this 15% damage difference turns standard 3-hit combos into instant one-shot kills!*`,
    tags: ['bounty buffs', '30m damage', 'honor multipliers', 'pvp scaling']
  },
  {
    id: 'mech-fruit-mastery-curve',
    categoryNumber: 25,
    categoryName: 'Combat & Damage Math',
    question: 'Does having 600 Mastery on a fruit increase its damage output compared to 300 Mastery?',
    aliases: ['600 mastery vs 300 mastery damage', 'does mastery increase damage blox fruits', 'mastery scaling curve', 'max mastery bonus'],
    shortAnswer: 'Yes! Every 100 Mastery points applies a direct statutory multiplier to the base damage of all moves on that fruit/weapon, resulting in ~15-20% higher overall damage at 600 Mastery.',
    fullAnswer: `📊 **Mastery Stat Curve & Multipliers:**\n\n` +
      `• **Move Unlocks vs Damage Scaling:** While all skills for a fruit are unlocked by 300-400 Mastery, increasing mastery up to the **600 Mastery cap** provides a permanent statutory damage multiplier.\n` +
      `• **Damage Growth Formula:** For every 100 Mastery levels, your move base damage increases by approximately **3.5%**, giving you roughly **18% to 20% higher damage** at 600 Mastery compared to 300 Mastery.\n` +
      `• **Knockback and Stun Duration:** Certain moves also gain slightly faster recovery frames and extended stun reach as mastery milestones are achieved.`,
    tags: ['mastery curve', '600 mastery', 'damage scaling', 'stat multipliers']
  },
  {
    id: 'mech-server-hopping-lockouts',
    categoryNumber: 25,
    categoryName: 'Server Spawns & Anti-Exploit',
    question: 'Why didn\'t the boss spawn when I server hopped to a fresh server?',
    aliases: ['server hopping boss not spawned', 'why rip indra not spawned fresh server', 'server hop boss timers', 'dough king server hopping'],
    shortAnswer: 'Certain world bosses (rip_indra, Dough King, Darkbeard) require active server uptime conditions or manual summoning rituals with items rather than natural server start spawns.',
    fullAnswer: `⏳ **Server Hopping & Boss Spawn Rules:**\n\n` +
      `• **Summonable Raid Bosses vs Natural Spawns:** Bosses like **rip_indra** (God's Chalice + 3 Aura buttons), **Dough King** (Cake Chalice + 500 enemy kills), and **Darkbeard** (Fist of Darkness at Dark Arena) **never spawn naturally**—they MUST be summoned by a player with the required items.\n` +
      `• **Server Uptime Requirements for Items:** Chests only spawn the **Fist of Darkness** after a server has been running for **4+ hours (240 minutes)**. Hopping into a brand new server resets the 4-hour clock.\n` +
      `• **Elite Hunter Timers:** Elite Hunters spawn every **10 minutes** on an active server. If a server just booted up, you must wait until the first 10-minute cycle ticks.`,
    tags: ['server hopping', 'boss spawns', 'fist of darkness timers', 'anti exploit']
  },
  {
    id: 'mech-despawn-protection',
    categoryNumber: 25,
    categoryName: 'Server Spawns & Anti-Exploit',
    question: 'Why did my fruit despawn while holding it during a Sea Event?',
    aliases: ['fruit despawned while holding', 'lost fruit during sea event', 'why did my fruit disappear', 'safe zone fruit loss'],
    shortAnswer: 'Blox Fruits enforces strict item loss mechanics: dying in water, falling off a boat into the sea, or entering combat safe-zones while holding a physical fruit destroys the fruit immediately.',
    fullAnswer: `⚠️ **Fruit Despawn & Safety Rules:**\n\n` +
      `• **Drowning with Physical Fruit:** If your character's health hits 0 in water while holding a physical fruit, the fruit is **permanently destroyed and lost**.\n` +
      `• **PvP Safe Zone Combat Logging:** Entering a safe zone (like Café or Mansion) while holding a physical fruit during active combat status will automatically despawn the fruit as an anti-exploit measure.\n` +
      `• **Disconnection Protection:** Always store high-value fruits into your **Treasure Inventory** immediately (Click Fruit → Store in Inventory). Physical fruits dropped on the ground or held in hand do NOT persist through disconnections.`,
    tags: ['fruit despawn', 'item loss', 'sea event fruit loss', 'storage tips']
  },
  {
    id: 'mech-mirage-moon-glitch',
    categoryNumber: 25,
    categoryName: 'Server Spawns & Anti-Exploit',
    question: 'Why won\'t the moon glow on Mirage Island even though it\'s a Full Moon and I\'m looking from the highest peak?',
    aliases: ['mirage moon not glowing', 'mirage moon glitch', 'why blue gear not spawning', 'moon resonance failed', 'full moon mirage look'],
    shortAnswer: 'You must: 1) Have Mirror Fractal in inventory, 2) Have Race V3 activated, 3) Be in FIRST-PERSON mode directly staring at the moon without looking away for 15+ continuous seconds, and 4) Have a clear unobstructed view.',
    fullAnswer: `🌕 **Mirage Island Moon Resonation Fix & Checklist:**\n\n` +
      `• **Prerequisites:**\n` +
      `  1. **Mirror Fractal:** Must have defeated Dough King and hold the Mirror Fractal in your inventory.\n` +
      `  2. **Race V3:** Your race must already be awakened to V3.\n` +
      `  3. **True Full Moon:** The moon must be 100% full (100% lit circle in the sky).\n` +
      `• **Exact Execution Steps:**\n` +
      `  1. Climb to the **highest peak** of Mirage Island.\n` +
      `  2. Activate your **Race V3 Skill** (e.g. Agility, Water Body, Heavenly Blood).\n` +
      `  3. Switch to **First-Person View** (zoom completely into your character's eyes).\n` +
      `  4. Look directly at the Full Moon and **do NOT move your mouse or press any keys for 15 continuous seconds**.\n` +
      `  5. A message will appear: *"Your <Fruit/Weapon> has resonated with the moon!"* and the moon will glow bright yellow, triggering the Blue Gear to spawn somewhere on Mirage!`,
    tags: ['mirage island', 'blue gear', 'moon resonance', 'v4 awakening', 'troubleshooting']
  },
  {
    id: 'mech-robux-storage-thresholds',
    categoryNumber: 25,
    categoryName: 'Secret Trade & Anti-Scam Rules',
    question: 'How many permanent and physical fruits can I store in my treasure inventory at once?',
    aliases: ['how many fruits can i store', 'fruit storage limit', '+1 fruit storage gamepass', 'permanent fruit inventory limit'],
    shortAnswer: 'Default storage is strictly 1 of each physical fruit. Purchasing the "+1 Fruit Storage" gamepass (400 Robux each) stacks your limit (e.g. 5 gamepasses = 6 of every fruit). Permanent fruits are unlimited and equip directly.',
    fullAnswer: `📦 **Fruit Storage & Inventory Thresholds:**\n\n` +
      `• **Base Physical Fruit Capacity:** Every player starts with a base limit of **1 stored physical copy** of each fruit type (e.g., 1 Kitsune, 1 Leopard, 1 Dragon, 1 Buddha).\n` +
      `• **+1 Fruit Storage Gamepass:** Cost: 400 Robux. Can be purchased multiple times (stackable). If you buy 3 gamepasses, your max capacity becomes **4 of every fruit**.\n` +
      `• **Permanent Fruits (Perms):** Permanent Fruits bought with Robux for personal use are tied directly to your character menu and can be equipped an infinite number of times with zero cooldown or storage constraints. Perms stored as items for trade take up 1 item slot in the trade window.`,
    tags: ['fruit storage', 'gamepass', 'treasure inventory', 'perm fruits']
  },
  {
    id: 'mech-value-gap-lock',
    categoryNumber: 25,
    categoryName: 'Secret Trade & Anti-Scam Rules',
    question: 'Why does the trade menu say \'Difference is too high\' even when both players click accept?',
    aliases: ['difference is too high', 'trade value gap lock', '40 percent trade rule', 'why trade won\'t accept blox fruits'],
    shortAnswer: 'Blox Fruits enforces an anti-scam / anti-exploit 40% Beli value threshold. The total in-game Beli price of both trade tables must be within 40% of each other (e.g., add trash fruits like Quake/Spider to balance).',
    fullAnswer: `⚖️ **The 40% Trade Value Gap Rule & How to Fix It:**\n\n` +
      `• **The 40% Beli Rule:** In the Blox Fruits Trade Tables, the **official in-game Beli shop value** (NOT community trading value) of Player A's items and Player B's items must be within **40% of each other**.\n` +
      `• **Why it Happens:** If you trade a **Dragon Fruit ($3.5M Beli)** for a **Rocket Fruit ($5,000 Beli)**, the system blocks the trade with *"Difference is too high!"* to prevent accidental donations or theft.\n` +
      `• **How to Fix ("Value Adds"):** Add filler high-Beli fruits on the lower side (e.g., **Quake $1.0M**, **Love $1.3M**, **Spider $1.5M**, **Sound $1.7M**) until the difference is within 40%.`,
    tags: ['trade rules', 'value gap', '40 percent rule', 'anti scam', 'trading tips']
  },
  {
    id: 'mech-sea-danger-scaling',
    categoryNumber: 25,
    categoryName: 'Sea Events & Nautical Mechanics',
    question: 'Do Sea Beasts spawn faster if multiple players are sitting on the same boat?',
    aliases: ['do sea beasts spawn faster with more players', 'sea event spawn rate multiple players', 'boat density sea events', 'sea danger level scaling'],
    shortAnswer: 'Yes! Having 3 to 6 players on the same ship in Sea Danger Levels 4-6 significantly increases the Sea Event spawn frequency and allows summoning Rumbling Waters / Terror Sharks much faster.',
    fullAnswer: `⚓ **Sea Danger Levels & Boat Player Scaling:**\n\n` +
      `• **Player Density Multiplier:** Sea Event spawn checks tick every 60-90 seconds. Having **3+ players** aboard a single ship increases the event trigger rate by up to **+50%**.\n` +
      `• **Sea Danger Zones (Third Sea):**\n` +
      `  - **Danger 1-3 (Low):** Small Piranhas, single Ghost Ships.\n` +
      `  - **Danger 4-5 (High):** Dual Sea Beasts, Rumbling Waters (3 Sea Beasts simultaneously), Terror Shark (150k HP).\n` +
      `  - **Danger 6 (The Unknown / Leviathan Zone):** Complete compass spinning, 195k HP Terror Sharks, Frozen Dimension portal for Leviathan, and Mirage Island.\n` +
      `• **Best Boat:** Use the **Beast Hunter Ship** (crafted at Tiki Outpost) for high HP and harpoon mechanics!`,
    tags: ['sea danger scaling', 'sea beasts', 'rumbling waters', 'terror shark', 'leviathan']
  },
  {
    id: 'mech-subclass-xp-caps',
    categoryNumber: 25,
    categoryName: 'Sea Events & Nautical Mechanics',
    question: 'Why am I not gaining Shipwright XP while repairing my boat during a Leviathan fight?',
    aliases: ['shipwright xp not increasing', 'shipwright xp cap', 'why boat repair not giving xp', 'shipwright subclass leveling'],
    shortAnswer: 'Shipwright repair XP is capped per sea event combat cycle, and you must hold Wooden Planks in your inventory while repairing ship damage with the Shipwright Hammer.',
    fullAnswer: `🔨 **Shipwright Subclass XP & Progression Limits:**\n\n` +
      `• **Repair Requirements:** To gain XP, you must have the **Shipwright Hammer** equipped and carry **Wooden Planks** in your material inventory (crafted by cutting down trees at Tiki Outpost).\n` +
      `• **Per-Combat XP Cap:** To prevent AFK macro exploitation, you cannot gain infinite XP on the same boat in a single fight. You must defeat the current Sea Event / Leviathan wave to refresh the combat XP pool.\n` +
      `• **Unlocking Tier 5 Shipwright:** Complete Sea Events in Danger 5-6 and repair boat hull damage across 20+ distinct sea runs.`,
    tags: ['shipwright', 'subclasses', 'xp cap', 'boat repair', 'wooden planks']
  },
  {
    id: 'mech-colosseum-code-lockout',
    categoryNumber: 25,
    categoryName: 'Puzzle & Quest Edge Cases',
    question: 'Why won\'t the Bartilo quest code open the Secret Mansion door in Sea 2?',
    aliases: ['bartilo code not working', 'colosseum code lockout', 'swan mansion door locked sea 2', 'bartilo quest bug'],
    shortAnswer: 'You must complete Bartilo\'s quest in strict order: 1) Defeat 50 Swan Pirates at Kingdom of Rose, 2) Defeat Boss Jeremy at the mountain peak, and 3) View the table in Swan Mansion before clicking the Colosseum tiles.',
    fullAnswer: `🏛️ **Bartilo Quest & Colosseum Code Strict Sequence:**\n\n` +
      `• **Step 1:** Talk to **Bartilo** inside the Café (Second Sea) and accept his quest to defeat **50 Swan Pirates**.\n` +
      `• **Step 2:** Return to Bartilo. He will give you the second task: defeat **Boss Jeremy** on top of the Kingdom of Rose mountain plateau.\n` +
      `• **Step 3:** Return to Bartilo. He will ask you to rescue gladiators.\n` +
      `• **Step 4:** Go inside **Don Swan\'s Mansion** and look at the dining table. The secret symbols on the table represent the order of tiles to click in the Colosseum basement!\n` +
      `• **Step 5:** Head to the Colosseum basement, enter the symbols in order, and free the gladiators to receive the **Warrior Helmet** and unlock the Swan Mansion door!`,
    tags: ['bartilo quest', 'colosseum code', 'swan mansion', 'quest lockout', 'troubleshooting']
  },
  {
    id: 'mech-instinct-v2-apple-spawns',
    categoryNumber: 25,
    categoryName: 'Puzzle & Quest Edge Cases',
    question: 'Why can\'t I pick up the Apple/Banana/Pineapple for the Hungry Man Quest?',
    aliases: ['cannot pick up apple hungry man', 'instinct v2 fruits not picking up', 'hungry man quest bug', 'banana pineapple apple instinct v2'],
    shortAnswer: 'The 3 fruits for Hungry Man (Instinct V2) cannot be picked up unless you have at least 5,000 EXP on Instinct V1, are Level 1800+, and own the Citizen Hat accessory.',
    fullAnswer: `🍎 **Instinct V2 (Hungry Man) Prerequisites & Fruit Spawns:**\n\n` +
      `• **Strict Prerequisites Before Fruits Interact:**\n` +
      `  1. **Level 1800+** in Third Sea.\n` +
      `  2. **5,000 EXP on Instinct V1** (Talk to Citizen NPC at Floating Turtle to verify your dodges).\n` +
      `  3. **Citizen Hat** accessory in inventory (Obtained by completing the Citizen quest at Floating Turtle mansion).\n` +
      `• **Fruit Spawn Locations:**\n` +
      `  - **Apple:** High tree branch on Floating Turtle island.\n` +
      `  - **Banana:** Small island behind the Great Tree.\n` +
      `  - **Pineapple:** Inside one of the fruit crates near Port Town docks.\n` +
      `• **Final Step:** Combine into a Fruit Bowl with Citizen Hat and give to Hungry Man with **$5,000,000 Beli + 5,000 Frags**!`,
    tags: ['instinct v2', 'hungry man', 'apple spawn', 'observation v2', 'troubleshooting']
  },

  // ==========================================
  // CATEGORY 26: ANTI-CHEAT & COUNTERING PVP BOTS
  // ==========================================
  {
    id: 'anti-cheat-countering-bots',
    categoryNumber: 26,
    categoryName: 'Anti-Cheat & Countering PvP Bots',
    question: 'How to "Turn a Deaf Ear" to Cheaters (Beat Auto-Bounty Bots & Scripting)',
    aliases: [
      'how to beat cheaters blox fruits', 'how to beat auto bounty bots', 'how to kill scripters in pvp',
      'turn a deaf ear to cheaters', 'counter auto aim script blox fruits', 'fly hack counter'
    ],
    shortAnswer: 'Cheaters and auto-bounty bots rely on automated, predictable scripts without human reaction time. Defeat them by exploiting vertical air combat/sky jumps, baiting them with timed Observation Haki, locking them in wide AoE stuns (Soul Guitar X, Portal V/C, Gravity Cane), and leading them into Safe-Zone boundaries to freeze their pathfinding.',
    fullAnswer: `🛡️ **How to Counter & Beat Auto-Bounty Bots & Scripting ("Turn a Deaf Ear"):**\n\n` +
      `Cheaters in PvP usually rely on automated scripts (like fly-hacks, auto-aim, or speed-hacks). Because these are run by rigid code rather than human reaction time, they are highly predictable and easy to punish when you know their weaknesses:\n\n` +
      `• **1. Exploit Their Pathfinding (Vertical Air Combat):**\n` +
      `  Most auto-bounty bots attack along direct straight lines (X/Z axes) or attempt to lock you into a grounded combo. Stay continuously in the air using **Sky Jumps, Geppo, and Flash Step**. Bots struggle severely with vertical altitude prediction and will repeatedly whiff their heaviest damage skills and stuns while you hover above them.\n\n` +
      `• **2. Use Instinct (Observation Haki) Trickery:**\n` +
      `  Auto-aim attacks trigger instant, simultaneous ability casts the millisecond they teleport into range. **Turn on Instinct (Ken Haki) right as they teleport to you**—this dodges their entire opening burst. Once their main burst is on cooldown, immediately counter-attack while they are completely defenseless.\n\n` +
      `• **3. Large AoE (Area of Effect) & Auto-Tracking Stuns:**\n` +
      `  Since hackers move faster than normal player speed, manual aiming (like sniper guns or single-target beams) is tough. Use large AoE stuns with lingering hitboxes—such as **Soul Guitar X (El Diablo), Portal V (Dimensional Rift) / Portal C, Gravity Cane Z, or Blizzard V**—to force them into a hard lockdown, allowing you to execute a full one-shot combo.\n\n` +
      `• **4. The Safe-Zone Boundary Bait:**\n` +
      `  If a scripter is relentless, bait them toward a Safe Zone boundary (like Mansion, Café, or Floating Turtle barrier). If they enter or hit you near the line, their script often breaks/glitches out, leaving their avatar frozen or stuck in an input loop, allowing you to burst them down before stepping back inside!`,
    tags: ['anti cheat', 'auto bounty bot', 'counter scripters', 'pvp tactics', 'air combat', 'instinct trickery']
  },

  // ==========================================
  // CATEGORY 27: USEFUL MOVEMENT GLITCHES & TECH Q&A
  // ==========================================
  {
    id: 'tech-click-to-move-high-jump',
    categoryNumber: 27,
    categoryName: 'Movement Glitches & PvP Tech Codex',
    question: 'What is the "Click to Move" High Jump / Sky Glitch?',
    aliases: ['click to move high jump', 'sky glitch blox fruits', 'click to move super jump', 'movement glitches q&a'],
    shortAnswer: 'By enabling "Click to Move" in Roblox settings, tapping far above your avatar onto sky hitboxes while activating dash/jump skills launches your character extremely high into the stratosphere.',
    fullAnswer: `🚀 **The "Click to Move" High Jump / Sky Glitch:**\n\n` +
      `• **How It Works:** In your Roblox settings, switch your movement mode to **"Click to Move"**.\n` +
      `• **Execution:** While activating specific dash or jump abilities, tap far above your avatar onto sky hitboxes or high skybox geometry. The Roblox pathfinding engine attempts to calculate a straight line upwards, sending your character flying extremely high into the air.\n` +
      `• **Common Uses:** Escaping aggressive bounty hunters, resetting combat aggro, or quickly reaching high peaks for Race V4 trials and Mirage Island resonation!`,
    tags: ['click to move', 'high jump', 'sky glitch', 'movement tech', 'glitches']
  },
  {
    id: 'tech-shift-lock-flash-step',
    categoryNumber: 27,
    categoryName: 'Movement Glitches & PvP Tech Codex',
    question: 'How does the Shift-Lock / Flash Step Direction Reset work?',
    aliases: ['shift lock flash step trick', 'flash step direction reset', 'sideways flash step', 'reverse flash step tech'],
    shortAnswer: 'Toggling Shift-Lock off and on instantly while holding directional keys allows you to Flash Step sideways or backward instantly without turning your camera or crosshair.',
    fullAnswer: `⚡ **Shift-Lock / Flash Step Direction Reset:**\n\n` +
      `• **Mechanics:** Normally, Flash Step teleports directly toward your crosshair/camera angle. However, by tapping **Shift-Lock off and on instantly** while holding a directional key (A, S, or D), your character model resets orientation independently from your camera.\n` +
      `• **PvP Advantage:** You can Flash Step sideways or completely backward instantly without changing where your mouse is aiming, catching aggressive players completely off-guard and dodging predictable linear projectiles!`,
    tags: ['flash step', 'shift lock tech', 'direction reset', 'pvp movement']
  },
  {
    id: 'tech-skill-dashing-momentum',
    categoryNumber: 27,
    categoryName: 'Movement Glitches & PvP Tech Codex',
    question: 'Why do some players launch massive distances using Skill-Dashing (e.g., Godhuman / Dragonheart)?',
    aliases: ['skill dashing momentum', 'godhuman dash launch', 'dragonheart dash fling', 'momentum glitch blox fruits'],
    shortAnswer: 'Canceling or layering high-velocity dash skills (like Godhuman Z) with a fast jump-dash transfers the skill\'s initial burst velocity into basic character physics, launching you across the map.',
    fullAnswer: `💨 **Skill-Dashing Momentum Launch Glitch:**\n\n` +
      `• **Physics Momentum Transfer:** Activating a high-velocity dash skill (such as **Godhuman Z - Soaring Beast** or **Dragonheart**) and immediately canceling or layering it with a fast jump-dash transfers the ability\'s burst velocity directly into your base character physics momentum.\n` +
      `• **Result:** Flings your character across entire islands faster than standard flight abilities, perfect for rapid repositioning or chasing down runners!`,
    tags: ['skill dashing', 'godhuman dash', 'momentum launch', 'speed glitch']
  },
  {
    id: 'tech-escape-ground-combo-locks',
    categoryNumber: 27,
    categoryName: 'Movement Glitches & PvP Tech Codex',
    question: 'How do I escape infinite ground-combo locks in PvP?',
    aliases: ['escape ground combo locks', 'break out of infinite combo', 'how to escape stun chain', 'combo escape tech'],
    shortAnswer: 'Spam your F-Flight ability, Race V3 (e.g. Shark Water Body, Angel Heavenly Blood), or Race V4 awakening. Most combo sequences have 0.1-second gaps between skill switches where transformations can break the stun chain.',
    fullAnswer: `🛡️ **Escaping Infinite Ground-Combo Locks:**\n\n` +
      `• **Exploiting Input Gaps:** Even optimal one-shot combo scripts have tiny **0.05 to 0.1-second latency/animation gaps** between weapon switches (e.g. CDK Z into Godhuman C).\n` +
      `• **Execution:** If caught in a combo chain, mash your **F-Flight key** (like Light/Portal/Flame flight) or your **Race V3/V4 activator** (e.g. Shark V3 80% damage reduction or Cyborg V3 shockwave). If your ping registers in that gap, your transformation breaks the hit-stun chain immediately.\n\n` +
      `⚠️ *Note: Basic tech (dash-canceling, shift-lock resets) is standard competitive PvP play. Severe exploits (like map-clipping) can result in game bans or system patches.*`,
    tags: ['combo escape', 'stun break', 'race v3 escape', 'pvp survival']
  },

  // ==========================================
  // CATEGORY 28: SEA DANGER LEVELS & NAVIGATION
  // ==========================================
  {
    id: 'sea-danger-levels-overview',
    categoryNumber: 28,
    categoryName: 'Sea Danger Levels & Oceanic Navigation',
    question: 'What are the different Sea Danger Levels in Blox Fruits (Levels 1 through 6)?',
    aliases: ['sea danger levels explained', 'danger level 1 to 6', 'rough waters blox fruits', 'what are danger zones'],
    shortAnswer: 'Sea 3 features Danger Levels 1 (Calm) through 6 (The Unknown / Rough Waters). Higher danger levels introduce extreme fog, compass spinning, constant high-tier sea events (Terror Sharks, Rumbling Waters), and the Leviathan/Kitsune spawn zones.',
    fullAnswer: `⚓ **Sea Danger Levels Breakdown (Sea 3 Exclusive):**\n\n` +
      `• **Danger Level 1 (Calm Water):** Mild waters near Tiki Outpost. Low chance for small Piranhas and standard single Ghost Ships.\n` +
      `• **Danger Level 2 (Moderate):** Piranha swarms, Ghost Fleets, and occasional solo Sea Beasts.\n` +
      `• **Danger Level 3 (Hazardous):** First sightings of **Terror Sharks (150k HP)**, high-frequency Ghost Ships, and Sea Beast pairs.\n` +
      `• **Danger Level 4 (Severe Danger):** High spawn rate for **Rumbling Waters (3 Sea Beasts simultaneously)**, aggressive Terror Sharks, and heavy fog.\n` +
      `• **Danger Level 5 (Catastrophic):** Dense darkness, lightning storms, continuous Terror Sharks, Rumbling Waters, and Mirage Island spawns.\n` +
      `• **Danger Level 6 (The Unknown / Rough Waters):** Pitch-black skybox, spinning compass, continuous boat damage, 195k HP Terror Sharks, **Frozen Dimension (Leviathan)**, and **Kitsune Island** during Full Moon!`,
    tags: ['sea danger levels', 'danger 1 to 6', 'rough waters', 'ocean navigation']
  },
  {
    id: 'sea-danger-level-6-survival',
    categoryNumber: 28,
    categoryName: 'Sea Danger Levels & Oceanic Navigation',
    question: 'What happens at Sea Danger Level 6 and how do I survive without my boat destroying?',
    aliases: ['danger level 6 survival', 'what happens in danger 6', 'how to survive danger 6', 'rough waters survival'],
    shortAnswer: 'Danger Level 6 features total darkness, compass spinning, and rapid boat damage. Survive by using the Beast Hunter ship (highest HP), having a Shipwright subclass member actively repairing hull with Wooden Planks, and keeping Magma/Buddha DPS on deck.',
    fullAnswer: `🌊 **Sea Danger Level 6 Extreme Hazards & Survival Guide:**\n\n` +
      `• **Hazards in Danger Level 6:**\n` +
      `  - **Pitch-Black Environment:** Vision is reduced to a few meters.\n` +
      `  - **Compass Failure:** Your compass spins wildly, making navigation impossible without visual landmarks.\n` +
      `  - **Hull Erosion:** Constant environmental ocean damage chips away at boat HP.\n` +
      `  - **Elite Spawns:** Frequent 195k HP Terror Sharks, Rumbling Waters, and Piranha swarms.\n\n` +
      `• **Survival Rules:**\n` +
      `  1. **Beast Hunter Ship:** Always craft and sail the Beast Hunter boat (highest HP and armor).\n` +
      `  2. **Shipwright Crew Member:** Have at least 1 player equipped with the **Shipwright Subclass** and **Wooden Planks** continuously repairing the boat hull.\n` +
      `  3. **High-DPS Roles:** Keep Awakened Magma, Blizzard, or Buddha users on deck to vaporize Piranhas and Terror Sharks within seconds before they ram the vessel!`,
    tags: ['danger level 6', 'boat survival', 'shipwright repair', 'beast hunter ship']
  },
  {
    id: 'sea-player-density-and-sea-rules',
    categoryNumber: 28,
    categoryName: 'Sea Danger Levels & Oceanic Navigation',
    question: 'Does having more players on a boat increase Sea Event spawn rates? Can events spawn in Sea 1 or 2?',
    aliases: ['does player density increase sea events', 'more players on boat sea events', 'can sea events spawn in sea 1 or 2', 'sea 2 vs sea 3 sea events'],
    shortAnswer: 'Yes! Higher player density (3 to 6 players on one boat) significantly increases Sea Event trigger frequency. Sea 2 only spawns basic Sea Beasts and Ship Raids; Danger Levels 1-6, Terrorsharks, Leviathan, and Kitsune are strictly Sea 3 exclusive.',
    fullAnswer: `👥 **Boat Player Density & Sea Restrictions:**\n\n` +
      `• **Player Density Multiplier:** The game checks for Sea Event spawns every 60-90 seconds. Carrying **3 to 6 players on a single boat** boosts event trigger rates by up to **+50%**, making Rumbling Waters and Terrorsharks appear much faster.\n\n` +
      `• **Sea 1 vs Sea 2 vs Sea 3:**\n` +
      `  - **Sea 1:** No natural oceanic Sea Events spawn.\n` +
      `  - **Sea 2:** Spawns basic **Sea Beasts** and **Ship Raids** in open water.\n` +
      `  - **Sea 3:** Contains the **Danger Levels 1 to 6 system**, Terrorsharks, Leviathan / Frozen Dimension, Kitsune Island, Mirage Island, and Ghost Fleets!`,
    tags: ['player density', 'sea event rates', 'sea 2 vs sea 3', 'ocean mechanics']
  },

  // ==========================================
  // CATEGORY 29: THE LEVIATHAN & FROZEN DIMENSION
  // ==========================================
  {
    id: 'leviathan-spawning-frozen-dimension',
    categoryNumber: 29,
    categoryName: 'The Leviathan & Frozen Dimension Master Guide',
    question: 'How do I find and spawn the Leviathan and the Frozen Dimension?',
    aliases: [
      'how to spawn leviathan', 'how to find frozen dimension', 'spy npc leviathan bribe',
      'how many players to spawn leviathan', 'spy npc rumors leviathan'
    ],
    shortAnswer: 'Bribe the Spy NPC at Tiki Outpost until he says "The Leviathan is out there!", gather at least 5 players on a Beast Hunter ship, and sail straight into Sea Danger Level 6 to find the Frozen Dimension gate.',
    fullAnswer: `🐉 **Spawning the Leviathan & Frozen Dimension Checklist:**\n\n` +
      `• **Step 1: Spy NPC Bribery (Tiki Outpost Top Tower):**\n` +
      `  Talk to the **Spy NPC** on top of the Tiki Outpost tower and pay fragments for "Clues".\n` +
      `  - If he says *"I don't know anything yet"*: Keep bribing or wait for the server cooldown.\n` +
      `  - If he says *"The Leviathan is out there! Go find it!"*: The Leviathan is officially primed to spawn!\n\n` +
      `• **Step 2: Minimum 5 Players Requirement:**\n` +
      `  You **MUST have at least 5 players** aboard your ship. If you have fewer than 5 players, the Frozen Dimension island will NEVER spawn.\n\n` +
      `• **Step 3: Sailing into Danger Level 6:**\n` +
      `  Sail directly outward past Danger Level 5 into **Danger Level 6 (The Unknown)**. Continue sailing until a giant icy gate appears: the **Frozen Dimension**!`,
    tags: ['leviathan', 'frozen dimension', 'spy npc', 'leviathan spawn', '5 players']
  },
  {
    id: 'leviathan-boss-fight-mechanics',
    categoryNumber: 29,
    categoryName: 'The Leviathan & Frozen Dimension Master Guide',
    question: 'How do I defeat the Leviathan and break its body shields?',
    aliases: ['how to defeat leviathan', 'break leviathan shields', 'leviathan attacks', 'leviathan boss fight guide'],
    shortAnswer: 'Break the Leviathan\'s segmental body armor shields using ship harpoons/cannons or high-damage attacks (Magma/Buddha), dodge its Freezing Breath and Tail Sweeps, and destroy each segment to expose the head.',
    fullAnswer: `⚔️ **Leviathan Boss Fight Strategy & Mechanics:**\n\n` +
      `• **Body Shield Armor Segments:**\n` +
      `  The Leviathan spawns with multiple armored body segments protecting its core. Use **Ship Harpoons, Boat Cannons**, and high-range fruit moves (Awakened Magma, Blizzard, Mammoth) to shatter each segmental shield.\n\n` +
      `• **Leviathan Attack Patterns:**\n` +
      `  - **Freezing Breath:** A massive cyan beam that freezes players and deals heavy boat damage. Flash Step sideways or jump high into the air.\n` +
      `  - **Tail Sweep / Submerge:** Sweeps across the water causing tidal waves. Stay elevated on ice platforms or boat deck.\n` +
      `  - **Water Blasts / Ice Spikes:** Rains homing ice shards down from the sky.\n\n` +
      `• **Phase 2 (Head Phase):** Once all body segments are shattered, focus 100% DPS onto the Leviathan\'s head to defeat the colossal boss!`,
    tags: ['leviathan fight', 'break shields', 'freezing breath', 'boss strategy']
  },
  {
    id: 'leviathan-heart-harpoon-drops',
    categoryNumber: 29,
    categoryName: 'The Leviathan & Frozen Dimension Master Guide',
    question: 'How do I get the Leviathan Heart and use the Beast Hunter harpoon? What happens if the boat sinks?',
    aliases: [
      'how to get leviathan heart', 'beast hunter harpoon leviathan heart', 'drag leviathan heart to tiki',
      'what happens if boat sinks leviathan heart', 'leviathan scales and mutant tails'
    ],
    shortAnswer: 'Shoot the Leviathan Heart with the Beast Hunter ship harpoon, tow it back to Tiki Outpost without sinking, and everyone aboard receives the Leviathan Heart for Sanguine Art. If the boat sinks, the Heart is permanently lost.',
    fullAnswer: `❤️ **Harvesting the Leviathan Heart & Crafting Drops:**\n\n` +
      `• **The Harpoon Requirement:**\n` +
      `  Only the **Beast Hunter Ship** has the special front-mounted Harpoon. When the Leviathan dies, a giant frozen **Leviathan Heart** drops into the water.\n` +
      `• **Harpooning & Towing:**\n` +
      `  1. The Beast Hunter harpoon gunner must shoot the Heart to tether it to the ship.\n` +
      `  2. Sail the ship with the tethered Heart all the way back to **Tiki Outpost**.\n` +
      `  3. Once the ship reaches the Tiki Outpost docks, **every player on the boat receives the Leviathan Heart** in their inventory!\n\n` +
      `⚠️ **Sinking Penalty:** If your boat is destroyed by sea events while towing the Heart, **the Heart is permanently lost** and you must redo the entire raid.\n\n` +
      `• **Other Drops:** Defeating the Leviathan also rewards **Leviathan Scales** (used for Leviathan Crown & Shield) and **Mutant Tails**!`,
    tags: ['leviathan heart', 'beast hunter harpoon', 'sanguine art heart', 'leviathan scales', 'mutant tails']
  },

  // ==========================================
  // CATEGORY 30: TERRORSHARKS, MONSTER MAGNET & SHARK ANCHOR
  // ==========================================
  {
    id: 'terrorsharks-spawns-magnet',
    categoryNumber: 30,
    categoryName: 'Terrorsharks, Monster Magnet & Shark Anchor',
    question: 'How do I spawn the Terrorshark and craft the Monster Magnet from the Shark Hunter NPC?',
    aliases: [
      'how to spawn terrorshark', 'how to craft monster magnet', 'shark hunter npc monster magnet',
      'monster magnet recipe', 'terrorshark danger level'
    ],
    shortAnswer: 'Terrorsharks spawn naturally in Danger Levels 2 to 6. Craft the Monster Magnet at the Shark Hunter NPC at Tiki Outpost using 2 Terror Eyes, 8 Electric Wings, 20 Mutant Tails, and 10 Shark Teeth to guarantee the special 195k HP boss.',
    fullAnswer: `🦈 **Terrorsharks & Monster Magnet Crafting:**\n\n` +
      `• **Natural Spawns:** Standard Terrorsharks (150,000 HP) spawn naturally while sailing in **Danger Levels 2 through 6**.\n\n` +
      `• **Crafting the Monster Magnet (Shark Hunter NPC at Tiki Outpost):**\n` +
      `  - **Prerequisites:** Must have already crafted the **Tooth Necklace** and **Terror Jaw** accessories at the Shark Hunter NPC.\n` +
      `  - **Recipe:** 2 Terror Eyes + 8 Electric Wings + 20 Mutant Tails + 10 Shark Teeth.\n` +
      `• **Using the Magnet:** Carrying the active Monster Magnet while sailing in Danger Levels 3-6 summons the colossal **195,000 HP Anchor Terrorshark**!`,
    tags: ['terrorshark', 'monster magnet', 'shark hunter', 'tiki outpost']
  },
  {
    id: 'shark-anchor-accessories-drops',
    categoryNumber: 30,
    categoryName: 'Terrorsharks, Monster Magnet & Shark Anchor',
    question: 'How do I get the Shark Anchor sword, Terror Jaw, and Tooth Necklace?',
    aliases: [
      'how to get shark anchor', 'how to get terror jaw', 'how to get tooth necklace',
      '195000 hp terrorshark', 'shark anchor 100 drop rate'
    ],
    shortAnswer: 'Defeat the 195,000 HP Terrorshark while carrying an active Monster Magnet to get a 100% guaranteed Shark Anchor drop. Terror Jaw and Tooth Necklace are crafted at the Shark Hunter NPC.',
    fullAnswer: `⚓ **Shark Anchor Sword & Terrorshark Accessories:**\n\n` +
      `• **Shark Anchor Sword (Legendary):**\n` +
      `  - Must hold the **Monster Magnet** in your inventory.\n` +
      `  - Defeat the special **195,000 HP Terrorshark** (a message appears: *"The Monster Magnet reacted to a nearby presence..."*).\n` +
      `  - When defeated, the player holding the magnet receives a **100% guaranteed Shark Anchor drop** (and the magnet is consumed)!\n\n` +
      `• **Terror Jaw Accessory:** Crafted at Shark Hunter NPC (1 Terror Eye + 5 Terrorshark Teeth + 10 Mutant Tails + 10 Shark Teeth). Grants +10% Sword damage and cooldown reduction.\n` +
      `• **Tooth Necklace Accessory:** Crafted at Shark Hunter NPC (1 Terror Eye + 5 Shark Teeth). Grants +20% Run speed and stamina buffs.\n` +
      `• **Drops:** Terrorsharks also drop **Terrorshark Teeth, Terror Eyes, and Fool\'s Gold**!`,
    tags: ['shark anchor', 'terror jaw', 'tooth necklace', '195k terrorshark', 'sword drops']
  },

  // ==========================================
  // CATEGORY 31: MIRAGE ISLAND & KITSUNE SHRINE
  // ==========================================
  {
    id: 'mirage-island-full-moon-guide',
    categoryNumber: 31,
    categoryName: 'Mirage Island & Kitsune Shrine Master Guide',
    question: 'How do I find Mirage Island, resonate the Mirror Fractal, and find the Blue Gear & Advanced Fruit Dealer?',
    aliases: [
      'how to find mirage island', 'mirage island sweet spot', 'how long mirage island stays',
      'how to get blue gear', 'where is advanced fruit dealer mirage'
    ],
    shortAnswer: 'Mirage Island spawns randomly in Sea 3 (highest rate in Danger Levels 2-4) and lasts 15 minutes. During Full Moon, climb the highest peak, activate Race V3, switch to first-person, and stare at the moon for 15s to make it glow and spawn the Blue Gear.',
    fullAnswer: `🌕 **Mirage Island & Blue Gear Step-by-Step Guide:**\n\n` +
      `• **Spawning Mirage Island:**\n` +
      `  - Sail in open water in Sea 3 (optimal sweet spot is **Danger Levels 2 to 4**).\n` +
      `  - **Despawn Timer:** Mirage Island stays spawned for **15 minutes** or until daytime arrives.\n\n` +
      `• **Moon Resonating & Blue Gear Puzzle:**\n` +
      `  1. Must have defeated Dough King to own the **Mirror Fractal**.\n` +
      `  2. Must be on Mirage Island during an active **100% Full Moon** at nighttime.\n` +
      `  3. Climb to the **highest mountain peak** on Mirage Island.\n` +
      `  4. Activate your **Race V3 ability**, switch to **First-Person View**, and stare directly at the moon for **15 continuous seconds**.\n` +
      `  5. A message appears: *"Your <Fruit/Weapon> has resonated with the moon!"* and the moon glows yellow.\n` +
      `  6. Search the island ground/trees for a glowing cyan **Blue Gear** and collect it!\n\n` +
      `• **Advanced Fruit Dealer:** Found in the central ruins of Mirage Island, offering high-tier stock with higher physical fruit buy chances!`,
    tags: ['mirage island', 'blue gear', 'full moon', 'mirror fractal', 'advanced fruit dealer']
  },
  {
    id: 'kitsune-island-shrine-rewards',
    categoryNumber: 31,
    categoryName: 'Mirage Island & Kitsune Shrine Master Guide',
    question: 'How do I spawn Kitsune Island, collect Azure Flames, and get the Kitsune Mask, Ribbon, and Fox Lamp?',
    aliases: [
      'how to spawn kitsune island', 'kitsune shrine event', 'how to collect azure flames',
      'kitsune mask ribbon fox lamp', 'kitsune island rewards'
    ],
    shortAnswer: 'Sail in Danger Level 6 during an active Full Moon to spawn Kitsune Island (lasts 5 minutes). Collect Azure Flames floating across the shrine and offer 20-25 flames per turn for a chance at Kitsune Mask, Ribbon, Fox Lamp sword, and Tailed Beast title.',
    fullAnswer: `🦊 **Kitsune Island & Shrine Event Master Guide:**\n\n` +
      `• **Spawning Kitsune Island:**\n` +
      `  - Must sail into **Sea Danger Level 6 (The Unknown)** during an active **Full Moon**.\n` +
      `  - When it spawns, the sky turns purple and a giant shrine emerges.\n` +
      `  - **Timer:** Kitsune Island only lasts for **5 minutes** before vanishing!\n\n` +
      `• **Collecting Azure Flames:**\n` +
      `  - Touch the central Kitsune Rock Shrine to begin the collection phase.\n` +
      `  - Blue glowing **Azure Flames** will scatter across the island. Run and jump to collect them.\n` +
      `  - **Strategy:** Offer **20 to 25 Azure Flames** in a single turn for maximum probability of high-tier items!\n\n` +
      `• **Shrine Rewards Table:**\n` +
      `  - **Fox Lamp (Legendary Sword)**\n` +
      `  - **Kitsune Mask (Mythical Accessory)**\n` +
      `  - **Kitsune Ribbon (Mythical Accessory)**\n` +
      `  - **#177 "Tailed Beast" Prestigious Title**\n` +
      `  - **Physical Blox Fruits & 2x EXP Boosts**!`,
    tags: ['kitsune island', 'kitsune shrine', 'azure flames', 'fox lamp', 'kitsune mask', 'kitsune ribbon']
  },

  // ==========================================
  // CATEGORY 32: GHOST SHIPS, PIRANHAS & SHIPWRIGHT
  // ==========================================
  {
    id: 'ghost-ships-piranhas-sea-events',
    categoryNumber: 32,
    categoryName: 'Ghost Ships, Piranha Swarms & Shipwright Subclass',
    question: 'How do I spawn and fight Ghost Ships, Piranha Swarms, and regular Sea Beasts?',
    aliases: [
      'how to spawn ghost ship', 'how to fight ghost fleet', 'piranha swarms drops',
      'piranha bones', 'regular sea beasts sea 3'
    ],
    shortAnswer: 'Ghost Ships spawn at night in Danger Levels 1-6 and drop Ectoplasm, Fool\'s Gold, and Gold Doubloons. Piranhas drop Piranha Bones and must be killed quickly before chewing boat hulls.',
    fullAnswer: `👻 **Ghost Ships, Fleets & Oceanic Monsters:**\n\n` +
      `• **Ghost Ships & Fleets:**\n` +
      `  - Spawn at nighttime in **Danger Levels 1 to 6**.\n` +
      `  - Fire ghostly green cannonballs that deal heavy splash damage to boats. Destroy them using ship cannons or ranged fruit attacks (Blizzard, Magma, Spirit).\n` +
      `  - **Drops:** Ectoplasm, Fool\'s Gold, and Gold Doubloons.\n\n` +
      `• **Piranha Swarms:**\n` +
      `  - Fast aggressive sea mobs that chew into boat hulls.\n` +
      `  - Use wide AoE moves to clear the entire swarm instantly.\n` +
      `  - **Drops:** Piranha Bones (vital for boat crafting).\n\n` +
      `• **Regular Sea Beasts (Sea 3):** Spawn in open waters. Carrying multiple crew members increases the chance to trigger Rumbling Waters (3 Sea Beasts simultaneously)!`,
    tags: ['ghost ship', 'piranhas', 'piranha bones', 'sea beasts', 'fool gold']
  },
  {
    id: 'shipwright-boat-crafting-upgrades',
    categoryNumber: 32,
    categoryName: 'Ghost Ships, Piranha Swarms & Shipwright Subclass',
    question: 'How do I unlock the Shipwright Subclass, level it up, and craft the Beast Hunter, Sentinel, and Miracle boats?',
    aliases: [
      'how to unlock shipwright subclass', 'how to level up shipwright', 'how to get wooden planks',
      'craft beast hunter boat', 'craft sentinel boat', 'craft miracle boat'
    ],
    shortAnswer: 'Talk to the Softcaps NPC at Tiki Outpost to unlock Shipwright. Level it up by repairing boat damage using Wooden Planks (from chopping trees) during active sea encounters. Craft Beast Hunter, Sentinel, and Miracle at the Boat Craftsman.',
    fullAnswer: `🔨 **Shipwright Subclass & Boat Crafting Master Guide:**\n\n` +
      `• **Unlocking Shipwright:** Talk to the **Softcaps NPC** inside the Tiki Outpost workshop.\n` +
      `• **Leveling Up Shipwright:** Equip your **Shipwright Hammer** and repair boat damage during active ocean battles. You must carry **Wooden Planks** (harvested by destroying wooden trees on islands).\n\n` +
      `• **Boat Crafting Recipes (Boat Craftsman NPC):**\n` +
      `  - **Beast Hunter Ship:** 20 Leviathan Scales + 6 Electric Wings + 2 Mutant Tails + 20 Fool\'s Gold. (Features Harpoon + Massive HP).\n` +
      `  - **Sentinel Boat:** Fast high-durability patrol vessel.\n` +
      `  - **Miracle Boat:** Streamlined speed vessel.\n` +
      `• **Customization:** Customize boat colors and hull armor at the ship customization docks!`,
    tags: ['shipwright', 'boat crafting', 'beast hunter ship', 'wooden planks', 'softcaps npc']
  },
  {
    id: 'sea-events-troubleshooting-failures',
    categoryNumber: 32,
    categoryName: 'Ghost Ships, Piranha Swarms & Shipwright Subclass',
    question: 'Sea Event Troubleshooting: Why did Leviathan despawn, Spy rumors fail, or Monster Magnet not trigger?',
    aliases: [
      'why did leviathan despawn', 'why spy npc not giving rumors', 'why fruit lost in ocean',
      'monster magnet not working', 'sea event failure cases'
    ],
    shortAnswer: 'Leviathan despawns if players leave the area or night resets. Spy rumors require server cooldowns. Drowning in water destroys held physical fruits. Monster Magnets are consumed ONLY when the 195,000 HP Terrorshark spawns.',
    fullAnswer: `⚠️ **Sea Event Troubleshooting & Common Failure Cases:**\n\n` +
      `• **1. Leviathan Despawned Mid-Fight:** If all players wipe/die or abandon the Frozen Dimension zone, the boss automatically despawns.\n` +
      `• **2. Spy NPC Gives No Rumors:** Requires waiting through a server cooldown period (approx. 20-30 minutes) or continuing to bribe fragments.\n` +
      `• **3. Fruit Vanished in Water:** Falling into the ocean or dying while holding an unstored physical fruit **instantly destroys and deletes the fruit** as an anti-exploit rule.\n` +
      `• **4. Monster Magnet Not Consumed:** If a standard 150,000 HP Terrorshark spawns, the Monster Magnet remains safely in your inventory. It is consumed ONLY when the special 195,000 HP Anchor variant appears!`,
    tags: ['troubleshooting', 'leviathan despawn', 'spy npc cooldown', 'fruit loss', 'monster magnet rules']
  },

  // ==========================================
  // CATEGORY 33: WORLD BOSSES, RAID SPAWNS & TIMERS
  // ==========================================
  {
    id: 'world-bosses-spawns-sea-1-2-3',
    categoryNumber: 33,
    categoryName: 'World Bosses, Raid Spawns, Secret Rooms & Event Timers',
    question: 'How do I spawn all World Bosses and Raid Bosses in Sea 1, Sea 2, and Sea 3?',
    aliases: [
      'how to spawn saber expert', 'how to spawn greybeard', 'how to spawn the saw',
      'how to spawn darkbeard', 'how to start order raid', 'how to open don swan room',
      'how to spawn rip indra', 'how to spawn dough king', 'how to spawn cake prince', 'cursed captain spawn'
    ],
    shortAnswer: 'Sea 1: Saber Expert (5-step Jungle puzzle), Greybeard (every 6 hrs), The Saw (every 1h15m). Sea 2: Darkbeard (Fist of Darkness), Order (Microchip), Don Swan ($1M+ fruit to Trevor). Sea 3: rip_indra (God\'s Chalice + 3 Haki buttons), Dough King (Sweet Chalice + 500 kills), Cake Prince (500 kills without Sweet Chalice), Cursed Captain (33% night spawn on Haunted Ship).',
    fullAnswer: `👑 **World Bosses & Raid Boss Spawning Guide (Sea 1, 2 & 3):**\n\n` +
      `• **Sea 1 Bosses:**\n` +
      `  - **Saber Expert (Shanks):** Solve the 5 green button Jungle puzzle → get Torch → get Cup in Desert → fill with water in Frozen Village → talk to Sick Man → defeat Mob Leader → use Relic at Jungle ruin!\n` +
      `  - **Greybeard:** Spawns automatically at Marine Fortress every **6 hours**.\n` +
      `  - **The Saw:** Spawns automatically at Middle Town every **1 hour and 15 minutes**.\n\n` +
      `• **Sea 2 Bosses:**\n` +
      `  - **Darkbeard:** Place a **Fist of Darkness** (from chests or Sea Beasts) on the Dark Arena altar.\n` +
      `  - **Order (Law Raid):** Buy a Microchip from Argit for 1,000 Fragments or a physical fruit and insert into the pod at Hot and Cold laboratory.\n` +
      `  - **Don Swan:** Give Trevor inside Swan Mansion a physical fruit worth **$1,000,000+ Beli** to unlock Don Swan\'s basement door.\n` +
      `  - **Cursed Captain:** Spawns on the Cursed Ship at nighttime with a **33% chance** every night.\n\n` +
      `• **Sea 3 Bosses:**\n` +
      `  - **rip_indra:** Press all 3 Aura Color buttons (Pure Red, Snow White, Winter Sky) at Castle on the Sea and place a **God\'s Chalice** on the pedestal.\n` +
      `  - **Dough King:** Defeat 500 enemies on Chocolate Land, combine God\'s Chalice + 10 Conjured Cocoa into a **Sweet Chalice**, and talk to Drip Mama.\n` +
      `  - **Cake Prince:** Defeat 500 enemies on Chocolate Land and talk to Drip Mama WITHOUT a Sweet Chalice.`,
    tags: ['world bosses', 'saber expert', 'darkbeard', 'rip indra', 'dough king', 'cake prince', 'greybeard']
  },
  {
    id: 'secret-rooms-key-unlocks',
    categoryNumber: 33,
    categoryName: 'World Bosses, Raid Spawns, Secret Rooms & Event Timers',
    question: 'How do I unlock Secret Locations: Colosseum Secret Door, Ice Castle Library Key, Temple of Time Door, and Waterfall Room for Yama?',
    aliases: [
      'how to open colosseum prison grid', 'how to get library key ice castle',
      'how to open temple of time door', 'how to open hydra waterfall room yama'
    ],
    shortAnswer: 'Colosseum door requires Bartilo\'s quest table code; Ice Castle Library Key drops from Awakened Ice Admiral; Temple of Time requires the Mirage Blue Gear lever; Hydra Island waterfall wooden door breaks with explosive moves (Soul Cane Z, Dragon Z).',
    fullAnswer: `🗝️ **Secret Rooms, Doors & Key Unlocks:**\n\n` +
      `• **Colosseum Secret Door (Sea 2):** Complete Bartilo\'s quest (50 Swan Pirates → Jeremy) and enter the code pattern found on the Swan Mansion dining table into the Colosseum basement wall.\n` +
      `• **Ice Castle Secret Room (Sea 2):** Defeat the Awakened Ice Admiral for the **Library Key** drop to unlock Death Step / Phoenix awakenings.\n` +
      `• **Temple of Time Door (Sea 3):** Find Mirage Island during a Full Moon, stare at the moon with Race V3, collect the Blue Gear, and pull the lever behind the Temple of Time peak to open the trial chambers.\n` +
      `• **Hydra Island Secret Waterfall Room (Sea 3):** Break the wooden door behind the waterfall using a heavy explosive/area move (e.g. Soul Cane Z, Dragon Z, Superhuman Z) to access the Yama sword chamber!`,
    tags: ['secret rooms', 'colosseum code', 'library key', 'temple of time lever', 'yama waterfall']
  },
  {
    id: 'special-event-timers-triggers',
    categoryNumber: 33,
    categoryName: 'World Bosses, Raid Spawns, Secret Rooms & Event Timers',
    question: 'When do Special Events spawn (Full Moon, Legendary Sword Dealer, Master of Auras, and Physical Fruit Spawns under trees)?',
    aliases: [
      'when does full moon happen', 'how to know full moon cycle', 'legendary sword dealer spawn timer',
      'master of auras spawn timer', 'fruit spawn timer under trees'
    ],
    shortAnswer: 'Full Moon occurs every 3-4 in-game night cycles. Legendary Sword Dealer spawns every 3 hours for 15 min (check Cafe Manager). Master of Auras spawns every 50 min for 15 min. Physical fruits spawn under trees every 1 hour (weekdays) or 45 min (weekends) and despawn in 20 min.',
    fullAnswer: `⏰ **Special Event Timers & Server Triggers:**\n\n` +
      `• **Full Moon Cycle:** Occurs naturally every **3 to 4 in-game night cycles** (approximately every 60-80 real-world minutes). Check the skybox moon phase.\n\n` +
      `• **Legendary Sword Dealer (TTK Swords):**\n` +
      `  - Spawns in Second Sea for **15 minutes** every **3 hours**.\n` +
      `  - Talk to the **Manager NPC** at Café: when he says *"I think he should be arriving soon"*, the dealer has appeared in one of his 7 spawn locations.\n\n` +
      `• **Master of Auras (Haki Colors):**\n` +
      `  - Spawns across random locations in Second and Third Sea every **50 minutes** and stays for **15 minutes**.\n\n` +
      `• **Physical Fruit Spawns Under Trees:**\n` +
      `  - **Weekdays:** Spawns under a random tree every **1 hour (60 minutes)**.\n` +
      `  - **Weekends:** Spawns under a random tree every **45 minutes**.\n` +
      `  - **Despawn Timer:** Fruits despawn after **20 minutes** if not picked up!`,
    tags: ['event timers', 'full moon cycle', 'legendary sword dealer', 'master of auras', 'fruit spawn timer']
  }
];

