export interface ItemObtainmentGuide {
  id: string;
  name: string;
  category: 'Sword' | 'Gun' | 'Accessory' | 'Fighting Style' | 'Race V4' | 'Gamepass' | 'Fruit' | 'Event Item' | 'Material / Key' | 'Race V1-V3';
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common' | 'Limited Event';
  sea: 'First Sea' | 'Second Sea' | 'Third Sea' | 'All Seas' | 'Event Exclusive';
  isLimitedEvent?: boolean;
  eventName?: string;
  dropChance?: string;
  costBeli?: number;
  costFragments?: number;
  costRobux?: number;
  npcLocation?: string;
  requirements?: string;
  obtainmentSteps: string[];
  buffsOrMoves?: string[];
  tips?: string;
  icon: string;
}

export const ALL_OBTAINMENT_DATA: ItemObtainmentGuide[] = [
  // ==========================================
  // 1. LIMITED TIME EVENT ITEMS (FULL DOSSIER)
  // ==========================================
  {
    id: 'cupid-helmet',
    name: 'Cupid Helmet',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: "Valentine's Event (Limited Time)",
    npcLocation: 'Valentine Event NPC (Café in Second Sea & Middle Town in First Sea)',
    requirements: 'Collect 1,000 Hearts currency by defeating enemies close to your level during Valentine’s Event.',
    obtainmentSteps: [
      'Step 1: Wait for or participate in the Valentine’s Update event.',
      'Step 2: Defeat NPCs within 100 levels of your character to drop Valentine Hearts currency.',
      'Step 3: Talk to the Valentine NPC and purchase the Cupid Helmet for 1,000 Hearts.'
    ],
    buffsOrMoves: ['+12.5% Blox Fruit Damage', '+12.5% Gun Damage', '+10% Health & Energy Regen', '+400 Energy'],
    tips: 'Cupid Helmet is one of the best hybrid fruit/gun accessories in the game. It is currently unobtainable outside of the Valentine event window.',
    icon: '🏹💘'
  },
  {
    id: 'cupid-coat',
    name: 'Cupid Coat',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: "Valentine's Event (Limited Time)",
    npcLocation: 'Valentine Event Shop NPC',
    requirements: '750 Valentine Hearts during Valentine event.',
    obtainmentSteps: [
      'Step 1: Farm Valentine Hearts by defeating active level-appropriate NPCs.',
      'Step 2: Open the Valentine NPC event shop.',
      'Step 3: Exchange 750 Hearts for the exclusive pink winged Cupid Coat.'
    ],
    buffsOrMoves: ['+12.5% Blox Fruit Damage', '+10% Melee Damage', '+600 Health', '+400 Energy'],
    tips: 'A premier collector item with great health and fruit damage buffs.',
    icon: '🧥💕'
  },
  {
    id: 'heart-shades',
    name: 'Heart Shades',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: "Valentine's Event (Limited Time)",
    npcLocation: 'Valentine Event Shop NPC',
    requirements: '500 Valentine Hearts during Valentine event.',
    obtainmentSteps: [
      'Step 1: Farm 500 Hearts during the Valentine’s Event.',
      'Step 2: Purchase from the Valentine Event vendor.'
    ],
    buffsOrMoves: ['+12.5% Gun & Sword Damage', '+5% Movement Speed', '+400 Health & Energy'],
    tips: 'Super stylish heart-shaped sunglasses, prized by collectors.',
    icon: '🕶️💖'
  },
  {
    id: 'santa-hat',
    name: 'Santa Hat',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: 'Christmas / Holiday Event (Limited Time)',
    npcLocation: 'Santa Claus NPC (North Pole / Christmas Event Island)',
    requirements: '500 Candy Canes currency + $750,000 Beli during the Christmas Event.',
    obtainmentSteps: [
      'Step 1: Join Blox Fruits during the Winter Holiday Event.',
      'Step 2: Defeat mobs around the world to farm Candy Canes (drops from mobs close to your level).',
      'Step 3: Sail to the festive Christmas Island and purchase from Santa Claus for 500 Candies.'
    ],
    buffsOrMoves: ['+12.5% Blox Fruit Damage', '+12.5% Sword Damage', '+30% Faster Sprint Speed', '+400 Health', '+400 Energy'],
    tips: 'Offers the highest sprint speed buff in early/mid game alongside strong dual damage buffs.',
    icon: '🎅❄️'
  },
  {
    id: 'holiday-cloak',
    name: 'Holiday Cloak',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: 'Christmas / Holiday Event (Limited Time)',
    npcLocation: 'Santa Claus NPC on Christmas Island',
    requirements: '250 Candy Canes during the Christmas Event.',
    obtainmentSteps: [
      'Step 1: Farm Candy Canes by killing level-appropriate NPCs in any sea.',
      'Step 2: Visit Santa Claus on the festive island and exchange 250 Candies for the cloak.'
    ],
    buffsOrMoves: ['+10% Blox Fruit Damage', '+10% Melee Damage', '+500 Health', '+250 Energy'],
    tips: 'Festive red holiday cloak with white fur trim.',
    icon: '🧣🎄'
  },
  {
    id: 'elf-hat',
    name: 'Elf Hat',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: 'Christmas / Holiday Event (Limited Time)',
    npcLocation: 'Santa Claus NPC on Christmas Island',
    requirements: '250 Candy Canes during Christmas Event.',
    obtainmentSteps: [
      'Step 1: Farm 250 Candy Canes from mob drops.',
      'Step 2: Buy from Santa Claus NPC during holiday season.'
    ],
    buffsOrMoves: ['+20% Run Speed', '+10% Melee & Sword Damage', '+5% Cooldown Reduction'],
    tips: 'Green pointed elf hat with great cooldown reduction and mobility.',
    icon: '🧝🎁'
  },
  {
    id: 'party-hat',
    name: 'Party Hat',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: 'Blox Fruits Anniversary / Milestone Celebration',
    npcLocation: 'Party NPC (Floating Islands / Café)',
    requirements: 'Log in and interact with the Party NPC during celebration events.',
    obtainmentSteps: [
      'Step 1: Participate in official Blox Fruits game anniversary events.',
      'Step 2: Collect festive Confetti currency from chests and mobs.',
      'Step 3: Exchange Confetti with the Party NPC for the exclusive hat.'
    ],
    buffsOrMoves: ['+10% XP Boost', '+10% Extra Beli from quests', '+400 Health & Energy'],
    tips: 'A rare celebration party cone hat.',
    icon: '🥳🎉'
  },
  {
    id: '10b-celebration-balloon',
    name: '10B Celebration Balloon',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: '10 Billion Visits Celebration Event',
    npcLocation: 'Party Shop NPC (Café / Middle Town)',
    requirements: 'Collected 750 Confetti during the 10 Billion Visits Event.',
    obtainmentSteps: [
      'Step 1: Farmed Confetti dropped by enemies and celebration cakes.',
      'Step 2: Bought from the event shop before the event ended.'
    ],
    buffsOrMoves: ['+15% Movement Speed', '+10% All Damage', '+300 Health & Energy'],
    tips: 'Limited commemorative balloon accessory floating over player shoulder.',
    icon: '🎈✨'
  },
  {
    id: 'bunny-ears',
    name: 'Bunny Ears',
    category: 'Event Item',
    rarity: 'Limited Event',
    sea: 'Event Exclusive',
    isLimitedEvent: true,
    eventName: 'Easter Spring Event',
    npcLocation: 'Easter Bunny NPC in Starter Island',
    requirements: 'Collect 100 Easter Eggs during the Easter event.',
    obtainmentSteps: [
      'Step 1: Search islands for Easter Eggs spawning around bushes and trees during the Spring event.',
      'Step 2: Exchange 100 Easter Eggs with the Easter Bunny NPC.'
    ],
    buffsOrMoves: ['+25% Movement Speed', '+10% Jump Height', '+200 Health'],
    tips: 'High agility vanity item.',
    icon: '🐰🥚'
  },
  {
    id: 'dog-blade',
    name: 'Dog Blade',
    category: 'Sword',
    rarity: 'Mythical',
    sea: 'Third Sea',
    isLimitedEvent: true,
    eventName: 'Doghouse Arena Special Event (August 2026)',
    dropChance: '~2.5% Drop Rate from Giant Guard Dog Boss',
    npcLocation: 'Doghouse Arena Coliseum in Third Sea (or Trading)',
    requirements: 'Defeat Giant Guard Dog Boss in Third Sea or trade on trading tables.',
    obtainmentSteps: [
      'Step 1: Travel to Third Sea and enter the Doghouse Arena portal.',
      'Step 2: Summon and defeat the Giant Guard Dog Boss (requires Dog Collar summon item).',
      'Step 3: Sword drops as a rare 2.5% Mythical reward, or trade for it (580M Trade Value).'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Spoiled Strike - Double dash bite slashing through Ken/Instinct.',
      'X Move (Mastery 300): Tantrum Mode - Impenetrable doghouse barrier + spinning puppy cyclone.'
    ],
    tips: 'Top-tier PvP sword that pairs insanely well with Godhuman and Portal.',
    icon: '🐕⚔️'
  },

  // ==========================================
  // 2. RARE & BOSS ACCESSORIES (DARK COAT, ETC)
  // ==========================================
  {
    id: 'dark-coat',
    name: 'Dark Coat',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Second Sea',
    dropChance: '2% Drop Rate from Darkbeard',
    npcLocation: 'Dark Arena in Second Sea (Summoned via Fist of Darkness)',
    requirements: 'Defeat the Darkbeard raid boss using a Fist of Darkness at the Dark Arena altar.',
    obtainmentSteps: [
      'Step 1: Obtain a Fist of Darkness in Second Sea by opening random chests (1 in 4 hours server life spawn) or defeating a Sea Beast (2.5% drop rate).',
      'Step 2: Sail to Dark Arena island in Second Sea and place the Fist of Darkness on the center pedestal to summon Darkbeard.',
      'Step 3: Defeat Darkbeard (deal at least 10% damage). Dark Coat has a 2% drop rate upon his defeat.'
    ],
    buffsOrMoves: ['+15% Blox Fruit Damage', '+600 Health', '+600 Energy'],
    tips: 'One of the rarest accessories in the entire game due to the low 2% drop rate and difficulty of obtaining Fist of Darkness.',
    icon: '🧥🌑'
  },
  {
    id: 'pale-scarf',
    name: 'Pale Scarf',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropChance: '100% Guaranteed Drop from Dough King / Cake Prince',
    npcLocation: 'Sea of Treats (Cake Island) in Third Sea',
    requirements: 'Defeat Dough King or Cake Prince after defeating 500 enemies on Cake Island.',
    obtainmentSteps: [
      'Step 1: Go to Sea of Treats in Third Sea and talk to Drip Mama.',
      'Step 2: Defeat 500 enemies on the island with a team or solo.',
      'Step 3: If you have a Cake Chalice (God’s Chalice + 10 Conjured Cocoa), summon Dough King; otherwise summon Cake Prince.',
      'Step 4: Deal at least 10% damage to the boss. Pale Scarf is a guaranteed drop.'
    ],
    buffsOrMoves: ['+15% Blox Fruit & Sword Damage', '+2 Extra Instinct Dodges', '+10x Instinct Vision Range (shows player health and cooldowns)'],
    tips: 'The most essential competitive PvP accessory in the game. Stacks with all fruits and swords.',
    icon: '🧣✨'
  },
  {
    id: 'valkyrie-helm',
    name: 'Valkyrie Helm',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropChance: '100% Guaranteed Drop from rip_indra Raid Boss',
    npcLocation: 'Castle on the Sea (Castle Altar) in Third Sea',
    requirements: 'Defeat the raid boss rip_indra using God’s Chalice + 3 Aura / Haki Colors (Pure Red, Winter Sky, Snow White).',
    obtainmentSteps: [
      'Step 1: Obtain God’s Chalice in Third Sea from Elite Hunter or chests.',
      'Step 2: Activate all 3 legendary Aura Haki color buttons around Castle on the Sea.',
      'Step 3: Place God’s Chalice on the pedestal in Castle on the Sea to spawn raid boss rip_indra.',
      'Step 4: Deal at least 10% damage. Valkyrie Helm drops 100% guaranteed!'
    ],
    buffsOrMoves: ['+15% Sword, Melee, and Gun Damage', '+600 Health', '+600 Energy'],
    tips: 'Crucial for unlocking the Temple of Time door for Race V4 awakening!',
    icon: '🪖⚡'
  },
  {
    id: 'leviathan-shield',
    name: 'Leviathan Shield',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Beast Hunter NPC at Tiki Outpost',
    requirements: 'Crafted with Leviathan materials harvested from Danger Zone 6.',
    obtainmentSteps: [
      'Step 1: Craft Beast Hunter boat with 20 Leviathan Scales, 6 Electric Wings, 2 Mutant Teeth.',
      'Step 2: Sail to Danger Level 6 (??? Sea) and summon Leviathan via Frozen Dimension.',
      'Step 3: Slay Leviathan and harvest 30 Leviathan Scales, 10 Electric Wings, 1 Mirror Fractal, and 2 Dark Fragments.',
      'Step 4: Craft Leviathan Shield at the Beast Hunter crafting table.'
    ],
    buffsOrMoves: ['+1200 Max Health', '+15% Defense against PvP & Sea Events', '+90% Water Damage Resistance', '+30% Armor against Swords'],
    tips: 'The highest pure defense item in Blox Fruits. Makes you nearly unkillable in ocean events.',
    icon: '🛡️🐉'
  },
  {
    id: 'leviathan-crown',
    name: 'Leviathan Crown',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Beast Hunter NPC at Tiki Outpost',
    requirements: 'Crafted with 1 Leviathan Scale, 10 Electric Wings, 2500 Fragments.',
    obtainmentSteps: [
      'Step 1: Defeat Leviathan in Danger Zone 6 to obtain scales.',
      'Step 2: Defeat Piranhas and Terror Sharks for Electric Wings.',
      'Step 3: Craft at Beast Hunter NPC in Tiki Outpost.'
    ],
    buffsOrMoves: ['+12% All Damage', '+40% Health Regen', '+100% Sea Event Damage', '+500 Health & Energy'],
    tips: 'Doubles all damage against Sea Beasts, Terror Sharks, and Leviathan.',
    icon: '👑🌊'
  },
  {
    id: 'kitsune-ribbon',
    name: 'Kitsune Ribbon',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Kitsune Shrine in Danger Zone 6 during Full Moon',
    requirements: 'Collect and offer Azure Embers to the Kitsune Shrine altar.',
    obtainmentSteps: [
      'Step 1: Sail to Danger Zone 6 during a Full Moon until the Kitsune Island Shrine spawns.',
      'Step 2: Collect 20 to 25 glowing Azure Embers around the island before the timer expires.',
      'Step 3: Offer the embers to the shrine for a chance to receive Kitsune Ribbon.'
    ],
    buffsOrMoves: ['+10% Movement Speed', '+2500 Max Energy', '+7% Health Regen', '+15% Flash Step Cooldown Reduction'],
    tips: 'Grants the largest single energy boost (2,500 energy) in Blox Fruits history.',
    icon: '🎀🦊'
  },
  {
    id: 'kitsune-mask',
    name: 'Kitsune Mask',
    category: 'Accessory',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Kitsune Shrine in Danger Zone 6 during Full Moon',
    requirements: 'Offer 20+ Azure Embers at the Kitsune Shrine.',
    obtainmentSteps: [
      'Step 1: Spawn Kitsune Shrine in Danger Zone 6 during Full Moon.',
      'Step 2: Collect 20-25 Azure Embers.',
      'Step 3: Offer to the Kitsune Shrine for a chance to roll the Mythical Kitsune Mask.'
    ],
    buffsOrMoves: ['+10% Blox Fruit Damage', '+2 Extra Instinct Dodges', '+50% Passive Energy Regen', '+15% Movement Speed'],
    tips: 'A top-tier fruit main accessory combining high speed and extra dodges.',
    icon: '🎭🦊'
  },
  {
    id: 'swan-glasses',
    name: 'Swan Glasses',
    category: 'Accessory',
    rarity: 'Legendary',
    sea: 'Second Sea',
    dropChance: '2.5% Drop Rate from Don Swan Boss',
    npcLocation: 'Swan’s Mansion in Second Sea',
    requirements: 'Level 1000+, give a $1,000,000+ Beli fruit to Trevor to unlock Don Swan’s boss room.',
    obtainmentSteps: [
      'Step 1: Reach Level 1000 and enter the Mansion in Kingdom of Rose (Second Sea).',
      'Step 2: Talk to Trevor and hand over any physical fruit worth $1M+ (e.g. Quake, Love, Spider).',
      'Step 3: Enter the trapdoor and defeat Don Swan (Lv 1000). Repeat until Swan Glasses drop (2.5% drop rate).'
    ],
    buffsOrMoves: ['+8% All Damage', '+8% Defense', '+8% Cooldown Reduction', '+25% Movement Speed', '+250 Health & Energy'],
    tips: 'One of the most versatile all-around accessories in Blox Fruits, boosting every single stat.',
    icon: '🕶️🦩'
  },
  {
    id: 'ghoul-mask',
    name: 'Ghoul Mask',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'Second Sea',
    npcLocation: 'El Perro in Cursed Ship (Second Sea)',
    costFragments: 0,
    costBeli: 0,
    requirements: '50 Ectoplasm from Cursed Ship mobs.',
    obtainmentSteps: [
      'Step 1: Board the Cursed Ship in Second Sea (Level 1000+).',
      'Step 2: Defeat Ship Deckhands and Ship Officers to farm 50 Ectoplasm.',
      'Step 3: Go to the secret kitchen and talk to El Perro to purchase the Ghoul Mask.'
    ],
    buffsOrMoves: ['+35% Faster Run Speed', '+2.5% Life Steal on Melee attacks', '+500 Energy'],
    tips: 'Enables melee life-steal, making Buddha grinding and solo raids infinitely easier.',
    icon: '🎭🦇'
  },
  {
    id: 'zebra-cap',
    name: 'Zebra Cap',
    category: 'Accessory',
    rarity: 'Legendary',
    sea: 'Second Sea',
    dropChance: '10% Drop Rate from Order Raid Boss (Law)',
    npcLocation: 'Raid Lab in Hot and Cold (Second Sea)',
    requirements: 'Defeat the Order (Law) raid boss.',
    obtainmentSteps: [
      'Step 1: Buy a Microchip from ARB for 1,000 Fragments or trade fruit in Hot and Cold.',
      'Step 2: Start the Order raid in the secret room and defeat Law (Lv 1250).',
      'Step 3: Zebra Cap has a 10% drop chance.'
    ],
    buffsOrMoves: ['+10% Sword Damage', '+100% Health Regen', '+500 Energy', '-80% Cooldown on Flash Step'],
    tips: 'Great for sword users who rely heavily on Flash Step teleportation.',
    icon: '🧢🦓'
  },
  {
    id: 'pilot-helmet',
    name: 'Pilot Helmet',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'Third Sea',
    dropChance: '5% Drop Rate from Stone Boss',
    npcLocation: 'Port Town in Third Sea',
    requirements: 'Defeat Stone boss (Lv 1550) at Port Town.',
    obtainmentSteps: [
      'Step 1: Go to Port Town in Third Sea.',
      'Step 2: Defeat Stone (boss Lv 1550).',
      'Step 3: Drops Pilot Helmet at 5% chance.'
    ],
    buffsOrMoves: ['+130% Faster Movement Speed', '+10% Health & Energy Regen', '+250 Health & Energy'],
    tips: 'Gives the fastest sprint speed of any accessory in the entire game (130% speed boost).',
    icon: '🪖✈️'
  },
  {
    id: 'hunter-cloak',
    name: 'Hunter Cloak (Black / Red / Green)',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'Third Sea',
    dropChance: '50% Drop Rate from Elite Pirates',
    npcLocation: 'Elite Hunter at Castle on the Sea',
    requirements: 'Defeat Elite Pirates (Urban, Fajita, Diablo) in Third Sea.',
    obtainmentSteps: [
      'Step 1: Take Elite Hunter quest at Castle on the Sea.',
      'Step 2: Slay the spawned Elite Boss.',
      'Step 3: Hunter Cloak drops at high chance in one of 3 colors.'
    ],
    buffsOrMoves: ['+15% Melee, Gun, and Sword Damage', '+80% Faster Sprint Speed', '+750 Health'],
    tips: 'Exceptional all-purpose cloak for leveling and PvP.',
    icon: '🧥🗡️'
  },
  {
    id: 'terror-jaw',
    name: 'Terror Jaw',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'Third Sea',
    npcLocation: 'Shark Hunter NPC at Tiki Outpost',
    requirements: 'Crafted with 1 Terror Eye, 2 Mutant Teeth, 10 Shark Teeth.',
    obtainmentSteps: [
      'Step 1: Farm Terror Sharks and Sharks in ocean danger zones.',
      'Step 2: Craft Terror Jaw at Shark Hunter NPC in Tiki Outpost.'
    ],
    buffsOrMoves: ['+10% Sword Damage', '+10% Defense against Sea Events', '+200 Health & Energy'],
    tips: 'Required craft item on the path to making the Monster Magnet for Shark Anchor.',
    icon: '🦈🦷'
  },
  {
    id: 'black-cape',
    name: 'Black Cape',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'First Sea',
    costBeli: 50000,
    npcLocation: 'Parlus in secret basement tower at Marine Fortress (First Sea)',
    requirements: 'Level 50+ and $50,000 Beli.',
    obtainmentSteps: [
      'Step 1: Go to Marine Fortress in First Sea.',
      'Step 2: Walk inside the secret opening in the fortress tower wall.',
      'Step 3: Pay Parlus $50,000 Beli to buy the Black Cape.'
    ],
    buffsOrMoves: ['+5% All Damage', '+100 Health & Energy'],
    tips: 'The best starter cape in First Sea for beginners.',
    icon: '🧥⬛'
  },
  {
    id: 'swordsman-hat',
    name: 'Swordsman Hat',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'First Sea',
    costBeli: 150000,
    npcLocation: 'Hasan in Desert hidden basement (First Sea)',
    requirements: '$150,000 Beli.',
    obtainmentSteps: [
      'Step 1: Go to Desert in First Sea and find the secret trapdoor house.',
      'Step 2: Talk to Hasan and buy for $150,000 Beli.'
    ],
    buffsOrMoves: ['+10% Sword Damage', '+100 Health & Energy'],
    tips: 'Essential accessory for early game sword grinding.',
    icon: '👒⚔️'
  },
  {
    id: 'pink-coat',
    name: 'Pink Coat',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'First Sea',
    dropChance: '5% Drop Rate from Swan Boss in Prison',
    npcLocation: 'Prison in First Sea',
    requirements: 'Defeat Swan boss (Lv 225) in Prison.',
    obtainmentSteps: [
      'Step 1: Go to Prison in First Sea.',
      'Step 2: Defeat Swan boss in the center yard until Pink Coat drops.'
    ],
    buffsOrMoves: ['+10% Gun Damage', '+200 Health'],
    tips: 'Great early defense boost in First Sea.',
    icon: '🧥🌸'
  },
  {
    id: 'cool-shades',
    name: 'Cool Shades',
    category: 'Accessory',
    rarity: 'Rare',
    sea: 'First Sea',
    dropChance: '2.5% Drop Rate from Cyborg Boss',
    npcLocation: 'Fountain City in First Sea',
    requirements: 'Defeat Cyborg boss (Lv 675) at Fountain City.',
    obtainmentSteps: [
      'Step 1: Travel to Fountain City in First Sea.',
      'Step 2: Slay the Cyborg boss behind the city walls.',
      'Step 3: Cool Shades drop at a 2.5% chance.'
    ],
    buffsOrMoves: ['+7.5% All Damage', '+17.5% Movement Speed', '+100 Health & Energy'],
    tips: 'Best all-around accessory available before entering Second Sea.',
    icon: '🕶️😎'
  },

  // ==========================================
  // 3. ALL SWORDS (FULL OBTAINMENT ENCYCLOPEDIA)
  // ==========================================
  {
    id: 'cursed-dual-katana',
    name: 'Cursed Dual Katana (CDK)',
    category: 'Sword',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Cryptmaster behind Mansion Waterfall at Floating Turtle',
    requirements: 'Level 2200+, 350+ Mastery on both Yama and Tushita swords.',
    obtainmentSteps: [
      'Step 1: Reach Level 2200 and get 350 Mastery on both Yama and Tushita.',
      'Step 2: Go behind the Waterfall near Mansion on Floating Turtle and open the crypt.',
      'Step 3: Speak to the Cryptmaster to receive the Yama Scroll (Pain & Haze, Fog Spirits, and die to Soul Reaper holding Yama) and complete all 3 trials.',
      'Step 4: Speak to receive the Tushita Scroll (Pay 3 Boat Dealers, defeat Pirate Raid in 2 min, defeat Cake Queen in 2 min) and complete all 3 trials.',
      'Step 5: Light the center torch, defeat the Cursed Skeleton Boss in the arena, and forge CDK!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 175): Revolving Ravager - Dual tornado vacuum stun.',
      'X Move (Mastery 375): Slayer of Goliaths - Blazing crimson dash slash.'
    ],
    tips: 'Ranked S+ in competitive Blox Fruits PvP. The gold standard sword for Godhuman one-shot combos.',
    icon: '⚔️🔥'
  },
  {
    id: 'true-triple-katana',
    name: 'True Triple Katana (TTK)',
    category: 'Sword',
    rarity: 'Mythical',
    sea: 'Second Sea',
    costBeli: 8000000,
    npcLocation: 'Mysterious Man on highest stem at Green Zone (Second Sea)',
    requirements: 'Own Shisui ($2M), Wando ($2M), and Saddi ($2M) with 300+ Mastery on each.',
    obtainmentSteps: [
      'Step 1: Check with the Manager NPC in Second Sea Café every 3 hours for Legendary Sword Dealer spawn.',
      'Step 2: Purchase Shisui ($2M), Wando ($2M), and Saddi ($2M) from the Legendary Sword Dealer ($6,000,000 Beli total).',
      'Step 3: Level all 3 swords to 300+ Mastery.',
      'Step 4: Climb to the highest plant stem in Green Zone, speak to the Mysterious Man, and pay $2,000,000 Beli to forge TTK!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Wind Slash - Heavy triple air blade barrage.',
      'X Move (Mastery 300): Dragon Hurricane - Massive swirling dragon cyclone.'
    ],
    tips: 'Total cost is $8,000,000 Beli across the 3 swords and forging fee. Huge AoE damage.',
    icon: '⚔️🌪️'
  },
  {
    id: 'dark-blade',
    name: 'Dark Blade (Yoru)',
    category: 'Sword',
    rarity: 'Mythical',
    sea: 'All Seas',
    costRobux: 1200,
    npcLocation: 'In-Game Shop / Gamepass (or gift from trading)',
    requirements: '1,200 Robux gamepass or trade for Dark Blade item in trading tables.',
    obtainmentSteps: [
      'Step 1: Purchase the Dark Blade Gamepass from the in-game Shop for 1,200 Robux, OR trade for it on the Trade Matrix.',
      'Step 2 (V2 Upgrade): Complete the Son Quest in Middle Town (First Sea) by finding 3 letters in Frozen Village, Marine Fortress, and Skylands.',
      'Step 3 (V3 Slayer Upgrade): Collect 2 Fists of Darkness in Second Sea, have Dark Blade equipped, and activate the secret button in Graveyard.'
    ],
    buffsOrMoves: [
      'Z Move: One Thousand Slashes - Rapid green slash projectiles.',
      'X Move: Dark Air Slash - Massive energy wave piercing enemies.'
    ],
    tips: 'Permanent sword with instant M1 clicks and huge projectile reach.',
    icon: '🗡️🟢'
  },
  {
    id: 'shark-anchor',
    name: 'Shark Anchor',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    npcLocation: 'Shark Hunter NPC at Tiki Outpost',
    requirements: 'Craft Monster Magnet, defeat Terror Shark with Anchor (195k HP) in Danger Level 5–6.',
    obtainmentSteps: [
      'Step 1: Craft Tooth Necklace & Terror Jaw at Shark Hunter NPC in Tiki Outpost.',
      'Step 2: Craft Monster Magnet using 2 Terror Eyes, 8 Electric Wings, 20 Mutant Teeth, 20 Shark Teeth.',
      'Step 3: Sail to Danger Level 5–6 in Third Sea. The Monster Magnet will summon a special Terror Shark with an anchor stuck in its back (195,000 HP).',
      'Step 4: Slay the special Terror Shark to receive the Shark Anchor (100% drop rate).'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 175): Typhoon Toss - Pulls enemies from far away directly into your hitbox.',
      'X Move (Mastery 350): Armor Breaker - Massive ground slam breaking Ken.'
    ],
    tips: 'Best pulling sword in the game. Combines easily with Sanguine Art and Kitsune.',
    icon: '⚓🦈'
  },
  {
    id: 'saber',
    name: 'Saber (V1 & V2)',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'First Sea',
    npcLocation: 'Saber Expert in secret Jungle crypt (First Sea)',
    requirements: 'Level 200+, complete the 5-button Jungle puzzle, Desert cup, and Frozen Village rich son quest.',
    obtainmentSteps: [
      'Step 1: Press 5 hidden buttons in Jungle (First Sea) to reveal the basement hole.',
      'Step 2: Pick up Torch, burn the Desert house curtain, fill the Cup with dripping water at Frozen Village cave, and give water to Sick Man.',
      'Step 3: Talk to Rich Son in Pirate Village, defeat Mob Leader on secret island, and receive the Ancient Relic.',
      'Step 4: Insert Ancient Relic into the stone door at Jungle stairs and defeat the Saber Expert (Lv 200) for Saber V1.',
      'Step 5 (V2 Upgrade): Earn 1,000,000+ Bounty/Honor and defeat another player close to your level.'
    ],
    buffsOrMoves: [
      'Z Move: Deadly Rush - Multi-slash lunge.',
      'X Move (V2): Triple Slash - 3 massive flying red blade arcs.'
    ],
    tips: 'The highest pure M1 base damage sword in First and Second Sea.',
    icon: '🗡️🔴'
  },
  {
    id: 'tushita',
    name: 'Tushita',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    npcLocation: 'Longma Boss inside Floating Turtle door',
    requirements: 'Level 2000+, spawn rip_indra raid boss with God’s Chalice, light 5 secret torches on Floating Turtle within 5 minutes.',
    obtainmentSteps: [
      'Step 1: Summon rip_indra at Castle on Sea using God’s Chalice and 3 Aura colors.',
      'Step 2: While the world is covered in white fog, enter the waterfall cave on Hydra Island and step through the glowing white portal.',
      'Step 3: You are given a Holy Torch. Light all 5 secret torches hidden around Floating Turtle in under 5 minutes.',
      'Step 4: Open the stone room and defeat Longma (boss Lv 2000) for a 100% guaranteed Tushita sword drop!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Heavenly Lunges - Rapid piercing thrusts.',
      'X Move (Mastery 300): Celestial Slash - High-speed teleport slash.'
    ],
    tips: 'Half of the requirement to craft Cursed Dual Katana (CDK).',
    icon: '🗡️✨'
  },
  {
    id: 'yama',
    name: 'Yama',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    npcLocation: 'Secret Waterfall Crypt on Hydra Island (Third Sea)',
    requirements: 'Complete 30 Elite Hunter quests or Player Hunter quests in Third Sea.',
    obtainmentSteps: [
      'Step 1: Check Elite Hunter or Player Hunter in Castle on Sea and complete at least 30 quests combined.',
      'Step 2: Go to the waterfall on Hydra Island, break the hidden rock door with a powerful explosive move (like Buddha Z or Bomb).',
      'Step 3: Defeat the 5 Ghost Guardians, then click the sword embedded in the pedestal 4 times to pull out Yama without dying.'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Hellscissor - Dark slashing lunge.',
      'X Move (Mastery 300): Infernal Hurricane - Crimson demon tornado.'
    ],
    tips: 'The other mandatory sword needed for CDK.',
    icon: '🗡️😈'
  },
  {
    id: 'fox-lamp',
    name: 'Fox Lamp',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    npcLocation: 'Kitsune Shrine in Danger Zone 6',
    requirements: 'Offer 20+ Azure Embers at the Kitsune Shrine during Full Moon.',
    obtainmentSteps: [
      'Step 1: Spawn Kitsune Shrine in Danger 6 during Full Moon.',
      'Step 2: Collect 25 Azure Embers and offer to the shrine altar.',
      'Step 3: Fox Lamp drops as a rare reward from the shrine.'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Scorching Fox Fire - Fires 3 homing blue flames.',
      'X Move (Mastery 300): Infernal Firestorm - Spawns a raging blue fire tornado.'
    ],
    tips: 'Inflicts heavy burning ticks and auto-tracks enemies.',
    icon: '🏮🦊'
  },
  {
    id: 'hallow-scythe',
    name: 'Hallow Scythe',
    category: 'Sword',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropChance: '5% Drop Rate from Soul Reaper Boss',
    npcLocation: 'Haunted Castle (Third Sea)',
    requirements: 'Summon Soul Reaper using Hallow Essence at Haunted Castle altar.',
    obtainmentSteps: [
      'Step 1: Roll Random Surprise at Death King for 50 Bones until you receive Hallow Essence (2-3% chance).',
      'Step 2: Place Hallow Essence on the altar inside Haunted Castle to summon Soul Reaper (Lv 2100).',
      'Step 3: Defeat Soul Reaper (5% drop rate for Hallow Scythe).'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Death Cyclone - Spinning scythe vacuum vortex.',
      'X Move (Mastery 350): Soul Execution - Massive dash slash burst.'
    ],
    tips: 'Massive hitboxes and pulls make it phenomenal for combos.',
    icon: '⚔️💀'
  },
  {
    id: 'spikey-trident',
    name: 'Spikey Trident',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    dropChance: '5% Drop Rate from Cake Prince / Dough King',
    npcLocation: 'Sea of Treats (Cake Island) in Third Sea',
    requirements: 'Defeat Cake Prince or Dough King after killing 500 mobs at Sea of Treats.',
    obtainmentSteps: [
      'Step 1: Slay 500 mobs on Cake Island.',
      'Step 2: Defeat Cake Prince or Dough King.',
      'Step 3: 5% drop rate for Spikey Trident.'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Trident Toss - Fires a chain trident that hooks and drags enemies right in front of you.',
      'X Move (Mastery 300): Dough Flare - Flying mochi burst.'
    ],
    tips: 'The ultimate combo starter. Pulls enemies from across the map directly into Godhuman.',
    icon: '🔱🍩'
  },
  {
    id: 'rengoku',
    name: 'Rengoku',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Second Sea',
    dropChance: '1% Drop Rate (Hidden Key) from Awakened Ice Admiral / Snow Mobs',
    npcLocation: 'Hidden chest behind secret wall in Ice Castle (Second Sea)',
    requirements: 'Obtain Hidden Key in Ice Castle.',
    obtainmentSteps: [
      'Step 1: Farm Snow Lurkers, Arctic Warriors, or Awakened Ice Admiral in Ice Castle until Hidden Key drops (0.5% - 1% chance).',
      'Step 2: Walk through the fake wall to the right of the throne room.',
      'Step 3: Touch the brown chest holding the Hidden Key to unlock Rengoku!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 150): Demon Slayer - High-speed flame slash.',
      'X Move (Mastery 300): Burning Slash - Fiery air cone.'
    ],
    tips: 'High burn damage and super stylish flaming animations.',
    icon: '🗡️🔥'
  },
  {
    id: 'canvander',
    name: 'Canvander',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Third Sea',
    dropChance: '5% Drop Rate from Beautiful Pirate Boss',
    npcLocation: 'Beautiful Pirate Domain inside Floating Turtle mountain',
    requirements: 'Level 1950+, enter the domain portal and defeat Beautiful Pirate (Lv 1950).',
    obtainmentSteps: [
      'Step 1: Go through the teleport portal on Floating Turtle to enter Beautiful Pirate Domain.',
      'Step 2: Defeat Beautiful Pirate (5% drop rate).'
    ],
    buffsOrMoves: [
      'Z Move: Blooming Slash - Rose petal dash stun.',
      'X Move: Piercing Dazzle - Multi-thrust rapier barrage.'
    ],
    tips: 'Fastest attack speed rapier sword for agile combatants.',
    icon: '🤺🌹'
  },
  {
    id: 'midnight-blade',
    name: 'Midnight Blade',
    category: 'Sword',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costBeli: 0,
    npcLocation: 'El Admin in Cursed Ship (Second Sea)',
    requirements: '100 Ectoplasm from Cursed Ship mobs.',
    obtainmentSteps: [
      'Step 1: Enter Cursed Ship in Second Sea.',
      'Step 2: Defeat Ship Deckhands and Ship Stewards to collect 100 Ectoplasm.',
      'Step 3: Speak to El Admin in the bedroom and purchase Midnight Blade.'
    ],
    buffsOrMoves: [
      'Z Move: Portal Opening - Violet portal slash.',
      'X Move: Sword Waves - Wide dark slash wave.'
    ],
    tips: 'Great for dark-themed builds with instant Ken Breaks.',
    icon: '🗡️🌌'
  },

  // ==========================================
  // 4. ALL GUNS OBTAINMENT
  // ==========================================
  {
    id: 'soul-guitar',
    name: 'Soul Guitar',
    category: 'Gun',
    rarity: 'Mythical',
    sea: 'Third Sea',
    costFragments: 500,
    costBeli: 0,
    npcLocation: 'Weird Machine in Haunted Castle basement (Third Sea)',
    requirements: 'Level 2300+, Full Moon, 500 Bones, 250 Ectoplasm, 1 Dark Fragment.',
    obtainmentSteps: [
      'Step 1: Wait for a Full Moon in Third Sea (Level 2300+).',
      'Step 2: Pray at the Haunted Castle Gravestone at night until it asks if you want to play a game.',
      'Step 3: Kill all 6 Living Zombies at once on the red grass, align the grave signs, talk to the Ghost in Haunted Castle, align trophy directions, and solve the color wire floor puzzle.',
      'Step 4: Craft Soul Guitar at the Weird Machine in the basement for 500 Bones, 250 Ectoplasm, 1 Dark Fragment, and 5,000 Fragments.'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 125): El Diablo - Fires explosive musical skull with instant Ken Break and pull.',
      'X Move (Mastery 250): Soul Beam - Massive ticking laser beam that restores health.'
    ],
    tips: 'The #1 PvP gun in Blox Fruits history. Indispensable for breaking Ken dodges.',
    icon: '🎸💀'
  },
  {
    id: 'serpent-bow',
    name: 'Serpent Bow',
    category: 'Gun',
    rarity: 'Legendary',
    sea: 'Third Sea',
    dropChance: '5% Drop Rate from Island Empress Boss',
    npcLocation: 'Hydra Island Palace in Third Sea',
    requirements: 'Defeat Island Empress (Lv 1675) in Hydra Island Palace.',
    obtainmentSteps: [
      'Step 1: Travel to Hydra Island in Third Sea.',
      'Step 2: Enter the palace and defeat the boss Island Empress (Lv 1675).',
      'Step 3: Repeat until Serpent Bow drops (5% drop rate).'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 125): Poisonous Volley - Rapid poison arrow barrage with heavy damage over time.',
      'X Move (Mastery 250): Snake Bite - Explosive venom blast.'
    ],
    tips: 'Inflicts high ticking poison damage, preventing enemies from healing.',
    icon: '🏹🐍'
  },
  {
    id: 'kabucha',
    name: 'Kabucha',
    category: 'Gun',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costFragments: 1500,
    npcLocation: 'Usoap NPC on secret island behind Kingdom of Rose (Second Sea)',
    requirements: '1,500 Fragments.',
    obtainmentSteps: [
      'Step 1: Travel to the small isolated island located behind Kingdom of Rose in Second Sea.',
      'Step 2: Speak with the Usoap NPC.',
      'Step 3: Pay 1,500 Fragments to instantly unlock the Kabucha slingshot.'
    ],
    buffsOrMoves: [
      'Z Move: Flying Fire Bird - Launches flaming phoenix projectile with huge knockback.',
      'X Move: Intense Wind - Wide wind cone that breaks Instinct/Ken.'
    ],
    tips: 'Extremely fast projectile speed, ideal for Dough and Dark fruit combos.',
    icon: '🎯🔥'
  },
  {
    id: 'acidum-rifle',
    name: 'Acidum Rifle',
    category: 'Gun',
    rarity: 'Rare',
    sea: 'Second Sea',
    dropChance: 'Defeat Factory Core in Second Sea (Top Damage Dealer)',
    npcLocation: 'Factory in Kingdom of Rose (Second Sea)',
    requirements: 'Deal the highest damage to the Factory Core during Factory Raid event.',
    obtainmentSteps: [
      'Step 1: Wait for the Factory Raid event every 1.5 hours in Second Sea.',
      'Step 2: Enter the Factory and deal maximum damage to the glowing core.',
      'Step 3: Acidum Rifle drops if you are top contributor or high tier damage.'
    ],
    buffsOrMoves: [
      'Z Move: Acidic Smoke - Spreads ticking acid mist that breaks Ken.',
      'X Move: Poisonous Bullets - Rapid high-stun shot.'
    ],
    tips: 'High stun lock potential for sword mains.',
    icon: '🔫🧪'
  },
  {
    id: 'bizarre-rifle',
    name: 'Bizarre Rifle',
    category: 'Gun',
    rarity: 'Rare',
    sea: 'Second Sea',
    npcLocation: 'El Rodolfo in Cursed Ship (Second Sea)',
    requirements: '25 Ectoplasm from Cursed Ship mobs.',
    obtainmentSteps: [
      'Step 1: Farm 25 Ectoplasm in Cursed Ship.',
      'Step 2: Talk to El Rodolfo to purchase the Bizarre Rifle.'
    ],
    buffsOrMoves: ['Z Move: Molten Fire - Flaming shot.', 'X Move: Toxic Cloud - Area poison.'],
    tips: 'Good intermediate gun in Second Sea.',
    icon: '🔫☣️'
  },

  // ==========================================
  // 5. ALL FIGHTING STYLES (V1 & V2 & V3)
  // ==========================================
  {
    id: 'godhuman',
    name: 'Godhuman',
    category: 'Fighting Style',
    rarity: 'Mythical',
    sea: 'Third Sea',
    costBeli: 5000000,
    costFragments: 5000,
    npcLocation: 'Ancient Monk inside Great Tree root cave (Third Sea)',
    requirements: '400+ Mastery on Superhuman, Death Step, Sharkman Karate, Electric Claw, and Dragon Talon + 20 Fish Tails, 20 Magma Ore, 10 Dragon Scales, 10 Mystic Droplets.',
    obtainmentSteps: [
      'Step 1: Train Superhuman, Death Step, Sharkman Karate, Electric Claw, and Dragon Talon all to 400+ Mastery.',
      'Step 2: Farm materials: 20 Fish Tails (Underwater City/First Sea), 20 Magma Ore (Magma Village/Hot Cold), 10 Dragon Scales (Hydra Island), 10 Mystic Droplets (Forgotten Island).',
      'Step 3: Go to Floating Turtle root cave near Great Tree, talk to Ancient Monk, pay $5,000,000 Beli + 5,000 Frags to unlock Godhuman!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 125): Soaring Beast - Piercing wind burst with instant Ken Break.',
      'X Move (Mastery 250): Heaven and Earth - Ground shockwave AoE pull.',
      'C Move (Mastery 350): Sixth Realm Gun - Blazing dash punch finisher.'
    ],
    tips: 'The undisputed king of PvP martial arts. Maximum burst damage in the game.',
    icon: '👊✨'
  },
  {
    id: 'sanguine-art',
    name: 'Sanguine Art',
    category: 'Fighting Style',
    rarity: 'Mythical',
    sea: 'Third Sea',
    costBeli: 5000000,
    costFragments: 5000,
    npcLocation: 'Shafi in Tiki Outpost basement crypt (Third Sea)',
    requirements: 'Leviathan Heart + 20 Demonic Wisps, 20 Vampire Fangs, 2 Dark Fragments, $5,000,000 Beli, 5,000 Fragments.',
    obtainmentSteps: [
      'Step 1: Craft Beast Hunter boat and sail to Danger Level 6 in Third Sea.',
      'Step 2: Defeat Leviathan, use Beast Hunter harpoon to hook Leviathan Heart, and drive it safely back to Tiki Outpost.',
      'Step 3: Farm 20 Demonic Wisps (Demonic Souls at Haunted Castle), 20 Vampire Fangs (Graveyard Zombies), and 2 Dark Fragments (Darkbeard raid).',
      'Step 4: Speak to Shafi in Tiki Outpost basement and pay $5M Beli + 5k Frags to learn Sanguine Art!'
    ],
    buffsOrMoves: [
      'Z Move (Mastery 125): Bloodthirsty Ruin - Blood beam that steals HP and pulls enemy.',
      'X Move (Mastery 250): Scarlet Tear - Aerial claw plunge.',
      'C Move (Mastery 350): Devourer of Worlds - Massive blood vortex.'
    ],
    tips: 'Grants innate lifesteal on hits and incredible combo synergy with swords.',
    icon: '🩸🦇'
  },
  {
    id: 'electric-claw',
    name: 'Electric Claw',
    category: 'Fighting Style',
    rarity: 'Legendary',
    sea: 'Third Sea',
    costBeli: 3000000,
    costFragments: 5000,
    npcLocation: 'Previous Hero at Floating Turtle mansion arch (Third Sea)',
    requirements: '400+ Mastery on Electro + complete 30-second dash quest from Previous Hero.',
    obtainmentSteps: [
      'Step 1: Level Electro fighting style to 400+ Mastery.',
      'Step 2: Speak with Previous Hero under the arch near Floating Turtle Mansion.',
      'Step 3: Accept his challenge and dash to the Mansion in under 30 seconds (use Mink or Portal/Light).',
      'Step 4: Pay $3,000,000 Beli + 5,000 Fragments to unlock Electric Claw.'
    ],
    buffsOrMoves: [
      'Z Move: Rampage Dash - Fast lightning claw strike.',
      'X Move: Lightning Thrust - Instant beam stun pull.',
      'C Move: Thunderclap Flash - Teleporting omni-directional burst.'
    ],
    tips: 'Ultra-fast gap-closer that initiates combos effortlessly.',
    icon: '⚡🐾'
  },
  {
    id: 'dragon-talon',
    name: 'Dragon Talon',
    category: 'Fighting Style',
    rarity: 'Legendary',
    sea: 'Third Sea',
    costBeli: 3000000,
    costFragments: 5000,
    npcLocation: 'Uzoth in Haunted Castle gear tower (Third Sea)',
    requirements: '400+ Mastery on Dragon Breath + Fire Essence item from Death King.',
    obtainmentSteps: [
      'Step 1: Level Dragon Breath to 400+ Mastery.',
      'Step 2: Collect 50 Bones from Haunted Castle mobs and roll Random Surprise at Death King until you get Fire Essence.',
      'Step 3: Give Fire Essence to Uzoth in the gear tower.',
      'Step 4: Pay $3,000,000 Beli + 5,000 Fragments to acquire Dragon Talon.'
    ],
    buffsOrMoves: [
      'Z Move: Talon Lighter - Flame projectile with instant Ken Break.',
      'X Move: Biting Fire - Raging dragon vortex.',
      'C Move: Infernal Whirlwind - Ground slam fiery blast.'
    ],
    tips: 'Massive AoE damage and fiery burn ticks.',
    icon: '🔥🦅'
  },
  {
    id: 'sharkman-karate',
    name: 'Sharkman Karate',
    category: 'Fighting Style',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costBeli: 2500000,
    costFragments: 5000,
    npcLocation: 'Daigrock at Forgotten Island (Second Sea)',
    requirements: '400+ Mastery on Water Kung Fu + Water Key from Tide Keeper Boss.',
    obtainmentSteps: [
      'Step 1: Level Water Kung Fu to 400+ Mastery.',
      'Step 2: Defeat the Tide Keeper boss on Forgotten Island (Second Sea) until he drops the Water Key (10-15% drop chance).',
      'Step 3: Hand the Water Key to Daigrock the Sharkman NPC.',
      'Step 4: Pay $2,500,000 Beli + 5,000 Fragments to learn Sharkman Karate.'
    ],
    buffsOrMoves: [
      'Z Move: Twelve Water Palms - Rapid barrage with zero delay.',
      'X Move: Pressure Whirlpool - Big aquatic vortex knockup.',
      'C Move: Great Sea Spear - Long-distance water trident launch.'
    ],
    tips: 'Fastest M1 attack speed in the entire game. The undisputed #1 choice for Buddha raid grinding.',
    icon: '🌊🦈'
  },
  {
    id: 'death-step',
    name: 'Death Step',
    category: 'Fighting Style',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costBeli: 2500000,
    costFragments: 5000,
    npcLocation: 'Phoey in Ice Castle secret library (Second Sea)',
    requirements: '400+ Mastery on Dark Step + Library Key from Awakened Ice Admiral.',
    obtainmentSteps: [
      'Step 1: Level Dark Step to 400+ Mastery.',
      'Step 2: Defeat Awakened Ice Admiral at Ice Castle until he drops the Library Key.',
      'Step 3: Unlock the secret library door behind the throne room.',
      'Step 4: Speak to Phoey and pay $2,500,000 Beli + 5,000 Fragments to learn Death Step.'
    ],
    buffsOrMoves: [
      'Z Move: Rocket Kick - Flying flame thrust.',
      'X Move: Wind Bullet - Burning air slices.',
      'C Move: Maximum Overheat - White flames ignite legs (+15% damage).'
    ],
    tips: 'High burst kick damage with lingering fire damage.',
    icon: '🦵🔥'
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    category: 'Fighting Style',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costBeli: 3000000,
    npcLocation: 'Martial Arts Master in Snow Mountain secret cave (Second Sea)',
    requirements: '300+ Mastery on Dark Step, Water Kung Fu, Electro, and Dragon Breath + $3,000,000 Beli.',
    obtainmentSteps: [
      'Step 1: Level Dark Step, Water Kung Fu, Electro, and Dragon Breath all to 300+ Mastery.',
      'Step 2: Go to Snow Mountain in Second Sea and jump into the secret cave behind the mountain.',
      'Step 3: Pay Martial Arts Master $3,000,000 Beli to learn Superhuman.'
    ],
    buffsOrMoves: ['Z Move: Beast Owl Slash', 'X Move: Thunder Clap', 'C Move: Conqueror Gun'],
    tips: 'Prerequisite for unlocking Godhuman.',
    icon: '🥋⚡'
  },

  // ==========================================
  // 6. ALL RACE PROGRESSION (V1 -> V2 -> V3 -> V4)
  // ==========================================
  {
    id: 'race-v2-alchemist',
    name: 'Race V2 (The Alchemist Quest)',
    category: 'Race V1-V3',
    rarity: 'Rare',
    sea: 'Second Sea',
    costBeli: 500000,
    npcLocation: 'Alchemist at Green Zone (Second Sea)',
    requirements: 'Level 850+, Colosseum Quest completed.',
    obtainmentSteps: [
      'Step 1: Complete Bartilo’s Colosseum Quest in Kingdom of Rose.',
      'Step 2: Speak with the Alchemist hidden in Green Zone forest.',
      'Step 3: Collect 3 Flowers:',
      '  - 🔴 Red Flower: Spawns in daylight around Green Zone, Mansion, or Factory.',
      '  - 🔵 Blue Flower: Spawns at night in Graveyard, Cave Island, or Remote Island.',
      '  - 🟡 Yellow Flower: Drops randomly from defeating any enemy mob in Second Sea.',
      'Step 4: Return all 3 flowers to Alchemist and pay $500,000 Beli to evolve to Race V2!'
    ],
    buffsOrMoves: ['Enhances base race traits (e.g. Mink = faster, Shark = zero water damage with fruit).'],
    tips: 'Do not log out while holding flowers, as they reset if you leave the server.',
    icon: '🌸🌿'
  },
  {
    id: 'race-v3-arowe',
    name: 'Race V3 (Arowe Quest)',
    category: 'Race V1-V3',
    rarity: 'Legendary',
    sea: 'Second Sea',
    costBeli: 2000000,
    npcLocation: 'Arowe in hidden cave beneath Diamond’s mountain in Kingdom of Rose',
    requirements: 'Level 1000+, Defeat Don Swan boss (requires handing $1M fruit to Trevor), Race V2 unlocked.',
    obtainmentSteps: [
      'Step 1: Defeat Don Swan inside Swan Mansion.',
      'Step 2: Enter secret opening under Diamond’s mountain and speak with Arowe.',
      'Step 3: Complete your specific Race Task:',
      '  - 👤 Human: Defeat Diamond, Jeremy, and Fajita bosses.',
      '  - 🦈 Shark: Slay 1 Sea Beast.',
      '  - 🪽 Angel: Defeat 1 other player who has the Angel race.',
      '  - 🐰 Mink: Collect 30 chests around the world.',
      '  - 🤖 Cyborg: Give any physical fruit to Arowe.',
      '  - 🦇 Ghoul: Defeat 5 players.',
      'Step 4: Pay Arowe $2,000,000 Beli to unlock Race V3 skill (press T on PC)!'
    ],
    buffsOrMoves: ['Unlocks active T-ability (e.g. Shark V3 = 85% damage reduction shield).'],
    tips: 'Mandatory prerequisite before you can start Race V4!',
    icon: '⚡👑'
  },
  {
    id: 'race-v4-general-guide',
    name: 'Race V4 Awakening (All Steps)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Ancient Clock)',
    requirements: 'Defeat rip_indra and Dough King, own Mirror Fractal and Valkyrie Helm, find Blue Gear on Mirage Island during Full Moon.',
    obtainmentSteps: [
      'Step 1: Defeat raid boss rip_indra (awards Valkyrie Helm & King’s seal unlock).',
      'Step 2: Defeat Dough King at Sea of Treats to acquire the Mirror Fractal.',
      'Step 3: Talk to the Ancient One at the peak of the Great Tree to open the Temple of Time door.',
      'Step 4: Sail into Danger Level 3–6 during a Full Moon to find Mirage Island.',
      'Step 5: Climb highest cliff on Mirage, activate Race V3, and stare at the moon with Ken/Instinct for 15s until it glows pink.',
      'Step 6: Search Mirage Island and collect the glowing Blue Gear.',
      'Step 7: Enter Temple of Time, pull the secret wall lever, gather 3 players of different races during a Full Moon, and activate V3 simultaneously at the trial doors to start trials!'
    ],
    buffsOrMoves: ['Awakens race transformation aura, gear sockets, and god-tier passive abilities.'],
    tips: 'Full moon spawns every 3-4 in-game days (~60-80 minutes).',
    icon: '🌕✨'
  },
  {
    id: 'cyborg-v4',
    name: 'Cyborg V4 (Energy Overload)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Cyborg Door)',
    requirements: 'Pass the Trial of Machines (Dodge explosive missiles without dying).',
    obtainmentSteps: [
      'Step 1: Stand before the Cyborg trial door in Temple of Time during Full Moon with 2 other different race players.',
      'Step 2: Activate Cyborg V3 on countdown to enter the Trial of Machines chamber.',
      'Step 3: Dodge falling artillery missiles and laser beams for 60 seconds without dying.',
      'Step 4: Defeat the other 2 players in the PvP arena after completing the trial.',
      'Step 5: Interact with the Ancient Clock to socket the Cyborg V4 Gear!'
    ],
    buffsOrMoves: [
      'Electric Chain Reaction: Emits constant electric shocks to all nearby players, permanently disabling their Ken/Instinct dodges.',
      'Supercharged Hover: Grants high jump hover thrusters and infinite sprint.'
    ],
    tips: 'Cyborg V4 is the ultimate Ken-breaker in PvP. Makes opponent instinct completely useless.',
    icon: '🤖⚡'
  },
  {
    id: 'shark-v4',
    name: 'Shark V4 (Leviathan Armor)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Shark Door)',
    requirements: 'Pass the Trial of Water (Defeat the colossal Sea Beast before timer expires).',
    obtainmentSteps: [
      'Step 1: Gather at Shark trial door during Full Moon.',
      'Step 2: Activate Shark V3 to enter the underwater trial room.',
      'Step 3: Slay the Trial Sea Beast before the 60-second timer runs out.',
      'Step 4: Win the 3-player PvP arena.',
      'Step 5: Socket gear at the Ancient Clock for Shark V4 Leviathan Armor!'
    ],
    buffsOrMoves: [
      'Leviathan Armor: Generates a giant glowing water shield that absorbs tens of thousands of incoming damage.',
      'Whirlpool Aura: Spawns whirlpools around running enemies that slows their movement to a crawl and drains stamina.'
    ],
    tips: 'The tankiest race in Blox Fruits history. Almost impossible to one-shot.',
    icon: '🦈🌊'
  },
  {
    id: 'angel-v4',
    name: 'Angel V4 (Prince of the Skies)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Angel Door)',
    requirements: 'Pass the Trial of Skies (Cloud pillar parkour in under 60 seconds).',
    obtainmentSteps: [
      'Step 1: Stand at Angel trial door during Full Moon.',
      'Step 2: Activate Angel V3 to enter the sky parkour room.',
      'Step 3: Jump across floating clouds to the top portal in under 60 seconds.',
      'Step 4: Defeat other players and touch the Ancient Clock to unlock Angel V4.'
    ],
    buffsOrMoves: [
      'Aura of Stun: Blinding golden aura that constantly freezes and drains energy from opponents standing near you.',
      'Heavenly Flight: True free-flight mode in the sky with instant glide.'
    ],
    tips: 'The divine aura automatically stuns anyone attempting to combo you in close combat.',
    icon: '🪽✨'
  },
  {
    id: 'human-v4',
    name: 'Human V4 (Limit Break)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Human Door)',
    requirements: 'Pass the Trial of Strength (Defeat your own shadow clone).',
    obtainmentSteps: [
      'Step 1: Stand at Human trial door during Full Moon.',
      'Step 2: Activate Human V3 to enter the shadow arena.',
      'Step 3: Defeat the aggressive shadow clone with identical equipment.',
      'Step 4: Win the PvP duel and socket the Human V4 Gear.'
    ],
    buffsOrMoves: [
      'Rage Meter: Charges an explosive rage bar that amplifies your damage output by up to +150%.',
      'Psycho Flash Step: Infinite teleport dashes with zero stamina drain.'
    ],
    tips: 'The most lethal offensive race. Allows basic M1s and skills to one-shot any build.',
    icon: '🥋🔥'
  },
  {
    id: 'ghoul-v4',
    name: 'Ghoul V4 (Domain of Darkness)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Ghoul Door)',
    requirements: 'Pass the Trial of Carnage (Defeat hordes of zombies in time limit).',
    obtainmentSteps: [
      'Step 1: Stand at Ghoul door during Full Moon.',
      'Step 2: Activate Ghoul V3 to enter the crypt.',
      'Step 3: Slay the zombie wave within 60 seconds.',
      'Step 4: Win the battle and socket the Ghoul V4 Gear at the clock.'
    ],
    buffsOrMoves: [
      'Blindness Domain: Spawns a massive sphere of absolute darkness that completely blinds enemies.',
      'Blood Crow Swarm: Endless crows swarm opponents, lifestealing health and reducing their cooldowns.'
    ],
    tips: 'Completely disorients opponents and makes it impossible for them to aim combos.',
    icon: '🦇🩸'
  },
  {
    id: 'mink-v4',
    name: 'Mink V4 (Lightning Cloak)',
    category: 'Race V4',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Temple of Time (Mink Door)',
    requirements: 'Pass the Trial of Speed (Navigate complex maze before timer expires).',
    obtainmentSteps: [
      'Step 1: Stand at Mink door during Full Moon.',
      'Step 2: Activate Mink V3 to enter the maze.',
      'Step 3: Sprint through the maze path to the exit portal in under 60 seconds.',
      'Step 4: Win the duel and socket the Mink V4 Gear.'
    ],
    buffsOrMoves: [
      'Lightning Tornadoes: Leaves behind electric cyclones that trap anyone chasing you.',
      'Hyper Sonic Speed: Moves faster than enemy camera rendering.'
    ],
    tips: 'Unrivaled mobility and hit-and-run harassment.',
    icon: '🐰⚡'
  },

  // ==========================================
  // 7. ALL GAMEPASSES
  // ==========================================
  {
    id: 'fruit-notifier',
    name: 'Fruit Notifier',
    category: 'Gamepass',
    rarity: 'Mythical',
    sea: 'All Seas',
    costRobux: 2700,
    npcLocation: 'In-Game Shop / Robux or Trading',
    requirements: '2,700 Robux or trade on trading tables (Valued at 6.0 Billion Beli Points).',
    obtainmentSteps: [
      'Step 1: Purchase for 2,700 Robux in the game store, OR',
      'Step 2: Trade on trading tables for ~6.0 Billion Value (e.g. Dragon West + Kitsune + adds).'
    ],
    buffsOrMoves: ['Shows exact distance in meters on your screen whenever a physical Blox Fruit spawns anywhere in your server.'],
    tips: 'The highest valued tradeable gamepass in Blox Fruits. Never accept underpays for Notifier!',
    icon: '👑📍'
  },
  {
    id: 'dark-blade-gamepass',
    name: 'Dark Blade Gamepass',
    category: 'Gamepass',
    rarity: 'Mythical',
    sea: 'All Seas',
    costRobux: 1200,
    npcLocation: 'In-Game Shop or Trade Table',
    requirements: '1,200 Robux or trade for 420M Value.',
    obtainmentSteps: [
      'Step 1: Purchase in the Robux game store for 1,200 Robux, OR trade for it.'
    ],
    buffsOrMoves: ['Instantly equips the Mythical Dark Blade sword (Yoru) across all servers and saves.'],
    tips: 'Can be upgraded to V2 and V3 Slayer in-game.',
    icon: '🗡️🟢'
  },
  {
    id: '2x-mastery',
    name: '2x Mastery Gamepass',
    category: 'Gamepass',
    rarity: 'Legendary',
    sea: 'All Seas',
    costRobux: 450,
    npcLocation: 'In-Game Shop or Trade Table',
    requirements: '450 Robux or trade on trade matrix (~450M Value).',
    obtainmentSteps: ['Step 1: Purchase for 450 Robux or trade for it.'],
    buffsOrMoves: ['Permanently doubles all Mastery points earned on Fruits, Swords, Guns, and Fighting Styles.'],
    tips: 'The most useful gamepass for leveling up weapons and unlocking moves quickly.',
    icon: '⚡📈'
  },
  {
    id: '2x-money',
    name: '2x Money Gamepass',
    category: 'Gamepass',
    rarity: 'Legendary',
    sea: 'All Seas',
    costRobux: 450,
    npcLocation: 'In-Game Shop or Trade Table',
    requirements: '450 Robux or trade (~450M Value).',
    obtainmentSteps: ['Step 1: Purchase for 450 Robux or trade for it.'],
    buffsOrMoves: ['Permanently doubles all Beli rewards from quests, bosses, and chests.'],
    tips: 'Great for financing expensive styles like Godhuman ($5M) and True Triple Katana ($8M).',
    icon: '💰✨'
  },
  {
    id: 'fast-boats',
    name: 'Fast Boats (Miracle Boat)',
    category: 'Gamepass',
    rarity: 'Rare',
    sea: 'All Seas',
    costRobux: 350,
    npcLocation: 'In-Game Shop or Luxury Boat Dealer',
    requirements: '350 Robux or trade (~80M Value).',
    obtainmentSteps: ['Step 1: Buy from shop for 350 Robux or trade.'],
    buffsOrMoves: ['Unlocks the Enma, Beast, and Santa miracle boats from Luxury Boat Dealers for 0 Beli.'],
    tips: 'Essential for Sea Beast hunting and Mirage Island searching.',
    icon: '🚤💨'
  },
  {
    id: 'fruit-storage',
    name: '+1 Fruit Storage',
    category: 'Gamepass',
    rarity: 'Legendary',
    sea: 'All Seas',
    costRobux: 400,
    npcLocation: 'In-Game Shop or Trade Table',
    requirements: '400 Robux or trade (~400M Value).',
    obtainmentSteps: ['Step 1: Buy from shop for 400 Robux or trade.'],
    buffsOrMoves: ['Increases your max physical fruit inventory capacity by +1 per fruit.'],
    tips: 'Can be bought multiple times to store duplicate high-tier fruits like Kitsune and Dragon.',
    icon: '📦🍎'
  },

  // ==========================================
  // 8. HOW TO GET ANY FRUIT (METHODS)
  // ==========================================
  {
    id: 'how-to-get-any-fruit',
    name: 'How to Obtain Blox Fruits (All Methods)',
    category: 'Fruit',
    rarity: 'Mythical',
    sea: 'All Seas',
    npcLocation: 'Blox Fruit Dealer & Blox Fruit Gacha / Cousin',
    requirements: 'Beli, Robux, or active participation in world events.',
    obtainmentSteps: [
      'Method 1: Blox Fruit Dealer (Café, Middle Town, Port Town) - Stocks random fruits every 4 hours for Beli or buy permanent versions anytime with Robux.',
      'Method 2: Blox Fruit Gacha / Cousin (Jungle, Café, Mansion) - Spin random physical fruit every 2 hours (cost scales with your player level).',
      'Method 3: Natural World Spawns - Fruits spawn under trees every 60 minutes on weekdays and 45 minutes on weekends (despawns in 20 min). Use Fruit Notifier gamepass to find them.',
      'Method 4: Castle on the Sea Pirate Raids - Defeat the pirate raid every 1h15m in Third Sea for a guaranteed physical fruit drop.',
      'Method 5: Factory Raid - Highest damager in Factory in Second Sea receives a guaranteed physical fruit.',
      'Method 6: Ship Raids - Defeating pirate ships in ocean danger zones has a chance to award a physical fruit.'
    ],
    buffsOrMoves: ['Grants unique combat powers across Natural, Elemental/Logia, and Beast/Zoan classes.'],
    tips: 'Best grinding fruit in game is Buddha; best PvP fruits are Kitsune, Dragon, Portal, and Dough.',
    icon: '🍎🔮'
  },

  // ==========================================
  // 9. SPECIAL MATERIALS & KEYS
  // ==========================================
  {
    id: 'fist-of-darkness',
    name: 'Fist of Darkness',
    category: 'Material / Key',
    rarity: 'Legendary',
    sea: 'Second Sea',
    npcLocation: 'Random Chests or Sea Beast drops in Second Sea',
    requirements: 'Spawned randomly every 4 hours in server chests or 2.5% drop from Sea Beast.',
    obtainmentSteps: [
      'Step 1: Open random chests in Second Sea after a server has been alive for at least 4 hours, OR defeat Sea Beasts in Second Sea.',
      'Step 2: Used to summon Darkbeard at Dark Arena (for Dark Coat) or inserted into the Raid Lab machine for Cyborg Race unlock.'
    ],
    tips: 'Do NOT die or log out while holding it, or the item will be lost permanently!',
    icon: '✊🌑'
  },
  {
    id: 'gods-chalice',
    name: 'God’s Chalice',
    category: 'Material / Key',
    rarity: 'Legendary',
    sea: 'Third Sea',
    npcLocation: 'Chests or Elite Hunter Pirates in Third Sea',
    requirements: 'Found in chests every 4 hours or dropped from Urban, Fajita, Diablo Elite Pirates (2% drop rate).',
    obtainmentSteps: [
      'Step 1: Defeat Elite Pirates in Third Sea or search chests.',
      'Step 2: Used to summon raid boss rip_indra at Castle on the Sea, or combine with 10 Conjured Cocoa at Sweet Crafter for Cake Chalice (Dough King).'
    ],
    tips: 'Never reset or switch servers while holding God’s Chalice.',
    icon: '🏆✨'
  },
  {
    id: 'mirror-fractal',
    name: 'Mirror Fractal',
    category: 'Material / Key',
    rarity: 'Mythical',
    sea: 'Third Sea',
    dropChance: '100% Guaranteed from Dough King Boss',
    npcLocation: 'Dough King at Cake Island / Sea of Treats',
    requirements: 'Defeat Dough King (requires Cake Chalice: God’s Chalice + 10 Conjured Cocoa + 500 enemy kills).',
    obtainmentSteps: [
      'Step 1: Craft Cake Chalice and kill 500 mobs at Sea of Treats.',
      'Step 2: Defeat Dough King.',
      'Step 3: Mirror Fractal drops 100% guaranteed to all participants dealing at least 10% damage.'
    ],
    tips: 'Mandatory key item for staring at the Full Moon on Mirage Island to unlock Race V4!',
    icon: '🪞💎'
  },
  {
    id: 'blue-gear',
    name: 'Blue Gear',
    category: 'Material / Key',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Mirage Island during Full Moon',
    requirements: 'Own Mirror Fractal, activate Race V3, and stare at the Full Moon with Ken/Instinct for 15s until moon glows pink.',
    obtainmentSteps: [
      'Step 1: Sail in Danger Zones 3–6 until Mirage Island spawns during Full Moon.',
      'Step 2: Climb to the highest mountain peak on Mirage.',
      'Step 3: Stare at the moon with Ken/Instinct active and Race V3 triggered until you see the message "Your Mirror Fractal has resonated with the moon!".',
      'Step 4: Search Mirage Island ground for the glowing Blue Gear and interact to pick it up.'
    ],
    tips: 'Unlocks the secret lever in Temple of Time for Race V4 trials!',
    icon: '⚙️💙'
  },
  {
    id: 'leviathan-heart',
    name: 'Leviathan Heart',
    category: 'Material / Key',
    rarity: 'Mythical',
    sea: 'Third Sea',
    npcLocation: 'Frozen Dimension in Danger Zone 6',
    requirements: 'Beast Hunter Harpoon + 5-player crew.',
    obtainmentSteps: [
      'Step 1: Sail to Danger 6 on Beast Hunter boat and defeat Leviathan.',
      'Step 2: Fire the boat harpoon into the floating Leviathan Heart and sail back to Tiki Outpost.'
    ],
    tips: 'Required to unlock the Sanguine Art fighting style.',
    icon: '🫀🐉'
  }
];
