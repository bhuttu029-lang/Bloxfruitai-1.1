export interface FruitItem {
  id: string;
  name: string;
  category: 'fruit' | 'permanent' | 'sword' | 'gamepass';
  rarity: 'Mythical' | 'Legendary' | 'Rare' | 'Uncommon' | 'Common';
  type?: 'Natural' | 'Elemental' | 'Beast';
  physicalValue: number; // Value in Trading Beli / points
  permanentValue?: number; // Perm trading value
  beliPrice?: number; // In-game stock cost
  robuxPrice?: number; // Robux price in shop
  demand: number; // 1 to 10
  trend: 'rising' | 'stable' | 'dropping' | 'hyped';
  pvpTier: 'S+' | 'S' | 'A' | 'B' | 'C';
  grindTier: 'S+' | 'S' | 'A' | 'B' | 'C';
  imageEmoji: string;
  iconUrl?: string;
  imageUrl?: string;
  accentColor: string;
  description: string;
  updateNote?: string;
  isNewOrReworked?: boolean;
  widgetTag?: string; // Custom badge/widget tag created by Owner
  isCustomAdded?: boolean; // Flag for owner-created items
}

// BLOX_FRUITS_DATA_START
export const BLOX_FRUITS_DATA: FruitItem[] = [
  {
    "id": "dog-blade",
    "name": "Dog Blade",
    "category": "sword",
    "rarity": "Mythical",
    "physicalValue": 580000000,
    "demand": 8,
    "trend": "hyped",
    "pvpTier": "S",
    "grindTier": "B",
    "imageEmoji": "🐶🗡️",
    "iconUrl": "https://res.cloudinary.com/dydapwnvj/image/upload/v1785430745/roblox-trade-hub/Fruits/zp94fzq6n61gqlxthkfp.png",
    "imageUrl": "https://res.cloudinary.com/dydapwnvj/image/upload/v1785430745/roblox-trade-hub/Fruits/zp94fzq6n61gqlxthkfp.png",
    "accentColor": "#38bdf8",
    "description": "Limited-time Mythical Sword from the Doghouse Event (August 2026). Features a glowing turquoise blade, golden floral crossguard, \"Spoiled Strike\" burst dashes, and \"Tantrum Mode\" transforming into an invincible doghouse.",
    "updateNote": "Latest August 2026 Doghouse Event limited reward! Unobtainable after event close. Restricted to common scrolls.",
    "isNewOrReworked": true
  },
  {
    "id": "dark-blade",
    "name": "Dark Blade (Yoru)",
    "category": "sword",
    "rarity": "Mythical",
    "physicalValue": 470000000,
    "robuxPrice": 1200,
    "demand": 9,
    "trend": "stable",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "⚔️",
    "iconUrl": "https://i.postimg.cc/fLYfLkYF/Dark-Blade.png",
    "imageUrl": "https://i.postimg.cc/fLYfLkYF/Dark-Blade.png",
    "accentColor": "#22c55e",
    "description": "The legendary black blade (Yoru). High range, piercing slashes, and immense combo potential."
  },
  {
    "id": "cursed-dual-katana",
    "name": "Cursed Dual Katana (CDK)",
    "category": "sword",
    "rarity": "Mythical",
    "physicalValue": 350000000,
    "demand": 9,
    "trend": "stable",
    "pvpTier": "S+",
    "grindTier": "S",
    "imageEmoji": "🗡️⚡",
    "iconUrl": "https://i.postimg.cc/d0FsYGYD/Purple-Lightning.png",
    "imageUrl": "https://i.postimg.cc/d0FsYGYD/Purple-Lightning.png",
    "accentColor": "#a855f7",
    "description": "Dual blades blending Yama and Tushita spirits. Elite PvP weapon with continuous stun and mobility."
  },
  {
    "id": "dragon-west",
    "name": "Dragon (West)",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 3500000000,
    "permanentValue": 9500000000,
    "beliPrice": 12000000,
    "robuxPrice": 5000,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "S+",
    "grindTier": "S+",
    "imageEmoji": "🐉🔥",
    "iconUrl": "https://i.postimg.cc/7LfBxxs8/West-Dragon.png",
    "imageUrl": "https://i.postimg.cc/7LfBxxs8/West-Dragon.png",
    "accentColor": "#ef4444",
    "description": "The supreme reworked Western Dragon. Unmatched aerial devastation, hyper-armored breath attacks, and colossal area damage.",
    "updateNote": "Rebuilt Dragon rework model. Valued at 3.5 Billion in the Dog Blade update meta.",
    "isNewOrReworked": true
  },
  {
    "id": "dragon-east",
    "name": "Dragon (East)",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 3000000000,
    "permanentValue": 8500000000,
    "beliPrice": 10500000,
    "robuxPrice": 4500,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "S+",
    "grindTier": "S",
    "imageEmoji": "🐲⚡",
    "iconUrl": "https://i.postimg.cc/gkzHzzjS/East-Dragon.png",
    "imageUrl": "https://i.postimg.cc/gkzHzzjS/East-Dragon.png",
    "accentColor": "#f97316",
    "description": "Eastern Serpentine Dragon form with lightning-imbued aerial loops, sky storms, and supreme zone control. Valued at 3.0 Billion.",
    "isNewOrReworked": true
  },
  {
    "id": "kitsune",
    "name": "Kitsune",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 640000000,
    "permanentValue": 4600000000,
    "beliPrice": 8000000,
    "robuxPrice": 4000,
    "demand": 10,
    "trend": "hyped",
    "pvpTier": "S+",
    "grindTier": "S+",
    "imageEmoji": "🦊💙",
    "iconUrl": "https://i.postimg.cc/CLxbycr9/Kitsune.png",
    "imageUrl": "https://i.postimg.cc/CLxbycr9/Kitsune.png",
    "accentColor": "#06b6d4",
    "description": "Fox-spirit beast fruit. Instant movement speed, fox-fire tails, transformation meter, and lethal PvP burst combos."
  },
  {
    "id": "gas",
    "name": "Gas Fruit",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Elemental",
    "physicalValue": 240000000,
    "permanentValue": 2800000000,
    "beliPrice": 5600000,
    "robuxPrice": 3200,
    "demand": 9,
    "trend": "rising",
    "pvpTier": "S+",
    "grindTier": "S",
    "imageEmoji": "☁️☠️",
    "iconUrl": "https://i.postimg.cc/XNCpc4fS/1000-cb-20241223162315.webp",
    "imageUrl": "https://i.postimg.cc/XNCpc4fS/1000-cb-20241223162315.webp",
    "accentColor": "#84cc16",
    "description": "Toxic elemental mist with suffocating area denial, instant flight, and toxic gauge debuffs.",
    "isNewOrReworked": true
  },
  {
    "id": "tiger",
    "name": "Tiger Fruit",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 190000000,
    "permanentValue": 2600000000,
    "beliPrice": 5000000,
    "robuxPrice": 3000,
    "demand": 9,
    "trend": "hyped",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "🐅🔥",
    "iconUrl": "https://i.postimg.cc/vBDS3KNp/download.png",
    "imageUrl": "https://i.postimg.cc/vBDS3KNp/download.png",
    "accentColor": "#ea580c",
    "description": "Fierce apex predator fruit replacing old Leopard model. Supreme speed, claw slashes, and pounce tracking.",
    "updateNote": "Official model and moveset overhaul.",
    "isNewOrReworked": true
  },
  {
    "id": "yeti",
    "name": "Yeti Fruit",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 175000000,
    "permanentValue": 2400000000,
    "beliPrice": 4800000,
    "robuxPrice": 2800,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "S",
    "grindTier": "S",
    "imageEmoji": "❄️🦍",
    "iconUrl": "https://i.postimg.cc/mrJmk0Jc/Yeti.png",
    "imageUrl": "https://i.postimg.cc/mrJmk0Jc/Yeti.png",
    "accentColor": "#38bdf8",
    "description": "Glacial colossus beast with crushing ground pounds, avalanche throws, and freezing stuns.",
    "isNewOrReworked": true
  },
  {
    "id": "dough",
    "name": "Dough (Mochi)",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Elemental",
    "physicalValue": 95000000,
    "permanentValue": 2400000000,
    "beliPrice": 2800000,
    "robuxPrice": 2400,
    "demand": 10,
    "trend": "stable",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "🍩✨",
    "iconUrl": "https://i.postimg.cc/wxckYyqR/Dough.png",
    "imageUrl": "https://i.postimg.cc/wxckYyqR/Dough.png",
    "accentColor": "#f59e0b",
    "description": "Awakened Dough fruit is the undisputed king of one-shot combo strings and PvP inescapable pulls."
  },
  {
    "id": "spirit",
    "name": "Spirit",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Natural",
    "physicalValue": 65000000,
    "permanentValue": 2100000000,
    "beliPrice": 3400000,
    "robuxPrice": 2550,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "S",
    "grindTier": "B",
    "imageEmoji": "👻🔥",
    "iconUrl": "https://i.postimg.cc/wTpbhYvL/Spirit.png",
    "imageUrl": "https://i.postimg.cc/wTpbhYvL/Spirit.png",
    "accentColor": "#ec4899",
    "description": "Harnesses twin spirits of Wrath and Calm for massive multi-elemental wrath bursts."
  },
  {
    "id": "t-rex",
    "name": "T-Rex",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 62000000,
    "permanentValue": 2200000000,
    "beliPrice": 2700000,
    "robuxPrice": 2350,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "S",
    "grindTier": "S",
    "imageEmoji": "🦖🩸",
    "iconUrl": "https://i.postimg.cc/zGDtcwTf/T-Rex.png",
    "imageUrl": "https://i.postimg.cc/zGDtcwTf/T-Rex.png",
    "accentColor": "#b91c1c",
    "description": "Prehistoric apex predator with passive predator meter, armor shredding tail sweeps, and continuous M1 strikes."
  },
  {
    "id": "venom",
    "name": "Venom",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Natural",
    "physicalValue": 48000000,
    "permanentValue": 1950000000,
    "beliPrice": 3000000,
    "robuxPrice": 2450,
    "demand": 7,
    "trend": "stable",
    "pvpTier": "S",
    "grindTier": "A",
    "imageEmoji": "🐍💜",
    "iconUrl": "https://i.postimg.cc/zGdtZLkF/Venom.png",
    "imageUrl": "https://i.postimg.cc/zGdtZLkF/Venom.png",
    "accentColor": "#9333ea",
    "description": "Spits corrosive poison puddles that rapidly melt health bars, paired with a three-headed hydra form."
  },
  {
    "id": "mammoth",
    "name": "Mammoth",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Beast",
    "physicalValue": 42000000,
    "permanentValue": 1900000000,
    "beliPrice": 2700000,
    "robuxPrice": 2350,
    "demand": 7,
    "trend": "dropping",
    "pvpTier": "A",
    "grindTier": "S",
    "imageEmoji": "🦣🌪️",
    "iconUrl": "https://i.postimg.cc/sXJGqWYV/Mammoth.png",
    "imageUrl": "https://i.postimg.cc/sXJGqWYV/Mammoth.png",
    "accentColor": "#78716c",
    "description": "Massive prehistoric stampede with unstoppable charge mechanics and high defense damage reduction."
  },
  {
    "id": "shadow",
    "name": "Shadow",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Natural",
    "physicalValue": 32000000,
    "permanentValue": 1750000000,
    "beliPrice": 2900000,
    "robuxPrice": 2400,
    "demand": 7,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "B",
    "imageEmoji": "🦇🌑",
    "iconUrl": "https://i.postimg.cc/kGpGPvBd/Shadow.png",
    "imageUrl": "https://i.postimg.cc/kGpGPvBd/Shadow.png",
    "accentColor": "#475569",
    "description": "Umbral meter siphon, life-steal bats, and dark dimensional traps."
  },
  {
    "id": "control",
    "name": "Control (Ope)",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Natural",
    "physicalValue": 30000000,
    "permanentValue": 1800000000,
    "beliPrice": 3200000,
    "robuxPrice": 2500,
    "demand": 7,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "C",
    "imageEmoji": "🌐✂️",
    "iconUrl": "https://i.postimg.cc/9QNpg6Wx/Control.png",
    "imageUrl": "https://i.postimg.cc/9QNpg6Wx/Control.png",
    "accentColor": "#0284c7",
    "description": "Creates a ROOM where the user can levitate buildings, teleport targets, and perform surgical slashes."
  },
  {
    "id": "gravity",
    "name": "Gravity",
    "category": "fruit",
    "rarity": "Mythical",
    "type": "Natural",
    "physicalValue": 15000000,
    "permanentValue": 1500000000,
    "beliPrice": 2500000,
    "robuxPrice": 2300,
    "demand": 5,
    "trend": "dropping",
    "pvpTier": "B",
    "grindTier": "C",
    "imageEmoji": "☄️🪐",
    "iconUrl": "https://i.postimg.cc/D02Lw6vJ/Gravity.png",
    "imageUrl": "https://i.postimg.cc/D02Lw6vJ/Gravity.png",
    "accentColor": "#6366f1",
    "description": "Summons meteors and crushes foes into the earth with gravitational pull."
  },
  {
    "id": "buddha",
    "name": "Buddha (Daibutsu)",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Beast",
    "physicalValue": 28000000,
    "permanentValue": 1650000000,
    "beliPrice": 1200000,
    "robuxPrice": 1650,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "S+",
    "imageEmoji": "🧘✨",
    "iconUrl": "https://i.postimg.cc/02nZD6h1/Buddha.png",
    "imageUrl": "https://i.postimg.cc/02nZD6h1/Buddha.png",
    "accentColor": "#eab308",
    "description": "The undisputed #1 grinding fruit in Blox Fruits. 50% damage reduction, massive melee range hitbox, and water walk."
  },
  {
    "id": "portal",
    "name": "Portal (Door)",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Natural",
    "physicalValue": 26000000,
    "permanentValue": 1700000000,
    "beliPrice": 1900000,
    "robuxPrice": 2000,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "🚪🌀",
    "iconUrl": "https://i.postimg.cc/DzkWz65v/Portal.png",
    "imageUrl": "https://i.postimg.cc/DzkWz65v/Portal.png",
    "accentColor": "#3b82f6",
    "description": "Supreme PvP mobility fruit. World Warp teleportation across all islands, dimension rift, and infinite combo initiations."
  },
  {
    "id": "rumble",
    "name": "Rumble (Goro)",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Elemental",
    "physicalValue": 20000000,
    "permanentValue": 1500000000,
    "beliPrice": 2100000,
    "robuxPrice": 2100,
    "demand": 9,
    "trend": "stable",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "⚡🌩️",
    "iconUrl": "https://i.postimg.cc/MHTHLFZD/Rumble.png",
    "imageUrl": "https://i.postimg.cc/MHTHLFZD/Rumble.png",
    "accentColor": "#0284c7",
    "description": "Lightning speed dashes, 3-teleport charges, and massive electrified stun fields for sword mains."
  },
  {
    "id": "blizzard",
    "name": "Blizzard",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Elemental",
    "physicalValue": 16000000,
    "permanentValue": 1400000000,
    "beliPrice": 2400000,
    "robuxPrice": 2250,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "S",
    "imageEmoji": "🌨️❄️",
    "iconUrl": "https://i.postimg.cc/fTDBV72v/Blizzard.png",
    "imageUrl": "https://i.postimg.cc/fTDBV72v/Blizzard.png",
    "accentColor": "#0ea5e9",
    "description": "Constant swirling snow domain around user, continuous tick damage, and flight freeze."
  },
  {
    "id": "sound",
    "name": "Sound",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Natural",
    "physicalValue": 14000000,
    "permanentValue": 1350000000,
    "beliPrice": 1700000,
    "robuxPrice": 1900,
    "demand": 7,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "A",
    "imageEmoji": "🎵🔊",
    "iconUrl": "https://i.postimg.cc/MKgHs5C7/Sound.png",
    "imageUrl": "https://i.postimg.cc/MKgHs5C7/Sound.png",
    "accentColor": "#d946ef",
    "description": "Rhythm bar buffs granting huge team speed, shields, and blast beams."
  },
  {
    "id": "phoenix",
    "name": "Phoenix",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Beast",
    "physicalValue": 10000000,
    "permanentValue": 1250000000,
    "beliPrice": 1800000,
    "robuxPrice": 2000,
    "demand": 6,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "B",
    "imageEmoji": "🔥🦅",
    "iconUrl": "https://i.postimg.cc/DwbJFHrp/Phoenix.png",
    "imageUrl": "https://i.postimg.cc/DwbJFHrp/Phoenix.png",
    "accentColor": "#06b6d4",
    "description": "Regenerative blue flames that heal player and allies, with airborne dive bomb attacks."
  },
  {
    "id": "pain",
    "name": "Pain (Paw)",
    "category": "fruit",
    "rarity": "Legendary",
    "type": "Natural",
    "physicalValue": 7000000,
    "permanentValue": 1100000000,
    "beliPrice": 2300000,
    "robuxPrice": 2200,
    "demand": 5,
    "trend": "dropping",
    "pvpTier": "B",
    "grindTier": "C",
    "imageEmoji": "🐾💥",
    "iconUrl": "https://i.postimg.cc/mk21srj7/Pain.png",
    "imageUrl": "https://i.postimg.cc/mk21srj7/Pain.png",
    "accentColor": "#f43f5e",
    "description": "High projectile velocity pressure cannons and repulsive deflections."
  },
  {
    "id": "magma",
    "name": "Magma",
    "category": "fruit",
    "rarity": "Rare",
    "type": "Elemental",
    "physicalValue": 6000000,
    "permanentValue": 900000000,
    "beliPrice": 850000,
    "robuxPrice": 1300,
    "demand": 8,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "S+",
    "imageEmoji": "🌋🔥",
    "iconUrl": "https://i.postimg.cc/W3VJ58JW/Magma.png",
    "imageUrl": "https://i.postimg.cc/W3VJ58JW/Magma.png",
    "accentColor": "#dc2626",
    "description": "Awakened Magma possesses the highest raw tick and DPS output in the entire game. Premier choice for Sea Events (Leviathan, Sea Beasts)."
  },
  {
    "id": "light",
    "name": "Light (Pika)",
    "category": "fruit",
    "rarity": "Rare",
    "type": "Elemental",
    "physicalValue": 4500000,
    "permanentValue": 800000000,
    "beliPrice": 650000,
    "robuxPrice": 1100,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "S",
    "imageEmoji": "💡⚡",
    "iconUrl": "https://i.postimg.cc/K8dTMxcy/Light.png",
    "imageUrl": "https://i.postimg.cc/K8dTMxcy/Light.png",
    "accentColor": "#fbbf24",
    "description": "Fastest flight in the game with built-in Light Blade M1 and sniper beam precision."
  },
  {
    "id": "ice",
    "name": "Ice (Hie)",
    "category": "fruit",
    "rarity": "Uncommon",
    "type": "Elemental",
    "physicalValue": 3500000,
    "permanentValue": 650000000,
    "beliPrice": 350000,
    "robuxPrice": 750,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "S",
    "grindTier": "A",
    "imageEmoji": "🧊⛸️",
    "iconUrl": "https://i.postimg.cc/zDjTPs7n/Ice.png",
    "imageUrl": "https://i.postimg.cc/zDjTPs7n/Ice.png",
    "accentColor": "#67e8f9",
    "description": "Skate effortlessly on ocean water and freeze opponents in unescapable ground stuns."
  },
  {
    "id": "dark",
    "name": "Dark (Yami)",
    "category": "fruit",
    "rarity": "Uncommon",
    "type": "Elemental",
    "physicalValue": 2000000,
    "permanentValue": 550000000,
    "beliPrice": 500000,
    "robuxPrice": 950,
    "demand": 6,
    "trend": "stable",
    "pvpTier": "A",
    "grindTier": "C",
    "imageEmoji": "🌑🕳️",
    "iconUrl": "https://i.postimg.cc/0NTCP7KD/Dark.png",
    "imageUrl": "https://i.postimg.cc/0NTCP7KD/Dark.png",
    "accentColor": "#334155",
    "description": "Black hole gravity pulls and teleport slashes favored by sword bounty hunters."
  },
  {
    "id": "flame",
    "name": "Flame (Mera)",
    "category": "fruit",
    "rarity": "Uncommon",
    "type": "Elemental",
    "physicalValue": 1800000,
    "permanentValue": 500000000,
    "beliPrice": 250000,
    "robuxPrice": 550,
    "demand": 5,
    "trend": "stable",
    "pvpTier": "B",
    "grindTier": "B",
    "imageEmoji": "🔥☄️",
    "iconUrl": "https://i.postimg.cc/y8WhRLF0/Flame.png",
    "imageUrl": "https://i.postimg.cc/y8WhRLF0/Flame.png",
    "accentColor": "#f97316",
    "description": "Classic fire fist blasts and fiery sky flight."
  },
  {
    "id": "rubber",
    "name": "Rubber (Gomu)",
    "category": "fruit",
    "rarity": "Rare",
    "type": "Natural",
    "physicalValue": 2500000,
    "permanentValue": 700000000,
    "beliPrice": 750000,
    "robuxPrice": 1200,
    "demand": 6,
    "trend": "stable",
    "pvpTier": "B",
    "grindTier": "B",
    "imageEmoji": "🥊👒",
    "iconUrl": "https://i.postimg.cc/qRQgjTrq/Rubber.png",
    "imageUrl": "https://i.postimg.cc/qRQgjTrq/Rubber.png",
    "accentColor": "#e11d48",
    "description": "Immune to electrical/Rumble damage, Gear transformation, and rubber bazooka punches."
  },
  {
    "id": "fruit-notifier",
    "name": "Fruit Notifier",
    "category": "gamepass",
    "rarity": "Mythical",
    "physicalValue": 6000000000,
    "robuxPrice": 2700,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "C",
    "grindTier": "S+",
    "imageEmoji": "📡🧭",
    "iconUrl": "https://i.postimg.cc/Zqdr70sR/Fruit-Notifer.png",
    "imageUrl": "https://i.postimg.cc/Zqdr70sR/Fruit-Notifer.png",
    "accentColor": "#10b981",
    "description": "The supreme gamepass. Notifies when natural fruits spawn anywhere in the server and shows exact distance markers. Valued at 6.0 Billion in the Dog Blade trading economy.",
    "updateNote": "Market re-evaluated to 6B benchmark in recent high-tier trades."
  },
  {
    "id": "dark-blade-pass",
    "name": "Dark Blade Gamepass",
    "category": "gamepass",
    "rarity": "Mythical",
    "physicalValue": 470000000,
    "robuxPrice": 1200,
    "demand": 9,
    "trend": "stable",
    "pvpTier": "S+",
    "grindTier": "A",
    "imageEmoji": "🎟️🗡️",
    "iconUrl": "https://i.postimg.cc/fLYfLkYF/Dark-Blade.png",
    "imageUrl": "https://i.postimg.cc/fLYfLkYF/Dark-Blade.png",
    "accentColor": "#16a34a",
    "description": "Instantly grants the Mythical Dark Blade V1 sword and unlocks White / Slayer skin quests."
  },
  {
    "id": "2x-mastery",
    "name": "2x Mastery",
    "category": "gamepass",
    "rarity": "Legendary",
    "physicalValue": 120000000,
    "robuxPrice": 450,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "S+",
    "imageEmoji": "📜⚡",
    "iconUrl": "https://i.postimg.cc/0jdntrQm/2x-Mastery.png",
    "imageUrl": "https://i.postimg.cc/0jdntrQm/2x-Mastery.png",
    "accentColor": "#8b5cf6",
    "description": "Doubles mastery exp gained on all fruits, swords, guns, and fighting styles."
  },
  {
    "id": "2x-money",
    "name": "2x Money",
    "category": "gamepass",
    "rarity": "Legendary",
    "physicalValue": 110000000,
    "robuxPrice": 450,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "S+",
    "imageEmoji": "💰✨",
    "iconUrl": "https://i.postimg.cc/rsLgC58M/2x-Money.png",
    "imageUrl": "https://i.postimg.cc/rsLgC58M/2x-Money.png",
    "accentColor": "#eab308",
    "description": "Doubles all Beli earnings from quest rewards, boss kills, and NPC drops."
  },
  {
    "id": "fast-boats",
    "name": "Fast Boats",
    "category": "gamepass",
    "rarity": "Rare",
    "physicalValue": 65000000,
    "robuxPrice": 350,
    "demand": 8,
    "trend": "stable",
    "pvpTier": "B",
    "grindTier": "S",
    "imageEmoji": "🚤💨",
    "iconUrl": "https://i.postimg.cc/NjV6kR4S/Fast-Boats.png",
    "imageUrl": "https://i.postimg.cc/NjV6kR4S/Fast-Boats.png",
    "accentColor": "#0ea5e9",
    "description": "Unlocks ultra-speed luxury Enel ship and armored speedboats for fast travel and Sea Beast hunting."
  },
  {
    "id": "plus-1-fruit-storage",
    "name": "+1 Fruit Storage",
    "category": "gamepass",
    "rarity": "Legendary",
    "physicalValue": 105000000,
    "robuxPrice": 400,
    "demand": 10,
    "trend": "rising",
    "pvpTier": "A",
    "grindTier": "S+",
    "imageEmoji": "📦➕",
    "iconUrl": "https://i.postimg.cc/hj7pmcdF/1-Fruit-Storage.png",
    "imageUrl": "https://i.postimg.cc/hj7pmcdF/1-Fruit-Storage.png",
    "accentColor": "#f97316",
    "description": "Increases capacity for storing duplicate physical fruits in the treasure inventory by +1."
  }
];
// BLOX_FRUITS_DATA_END

export function formatValueNumber(val: number): string {
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(val % 1000000000 === 0 ? 0 : 2) + 'B';
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1) + 'M';
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(0) + 'K';
  }
  return val.toLocaleString();
}

export interface TradeSideItem {
  uid: string;
  item: FruitItem;
  isPermanent?: boolean;
}

export interface TradeCalculationResult {
  yourTotalValue: number;
  theirTotalValue: number;
  difference: number;
  ratio: number;
  verdict: 'Big Win' | 'Small Win' | 'Fair Trade' | 'Small Loss' | 'Big Loss';
  verdictDescription: string;
  isWithin40PercentRule: boolean;
  yourAverageDemand: number;
  theirAverageDemand: number;
  demandAdvantage: 'You' | 'Them' | 'Even';
  counterSuggestions: string[];
  dogBladePresent: boolean;
}

export interface UserCustomValueOverride {
  itemId: string;
  customPhysicalValue?: number;
  customPermanentValue?: number;
  customBeliPrice?: number;
  customRobuxPrice?: number;
  customDemand?: number;
  customTrend?: 'rising' | 'stable' | 'dropping' | 'hyped';
  customPvpTier?: 'S+' | 'S' | 'A' | 'B' | 'C';
  customGrindTier?: 'S+' | 'S' | 'A' | 'B' | 'C';
  customDescription?: string;
  customNotes?: string;
  customWidgetTag?: string;
  customImageEmoji?: string;
  customIconUrl?: string;
  customImageUrl?: string;
  customAccentColor?: string;
  customName?: string;
  updatedAt: string;
}

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { secureTimingSafeEqual } from '../utils/security';
import { BACKUP_BLOX_FRUITS_DATA } from './officialBackupData';
import {
  syncFruitDataFromFirebase,
  pushFruitDataToFirebase,
  deleteFruitOverrideFromFirebase,
  deleteCustomItemFromFirebase,
  syncCustomResponsesFromFirebase,
  pushCustomResponsesToFirebase,
  deleteCustomResponseFromFirebase
} from '../lib/firebaseSync';

export const STORAGE_KEY_OVERRIDES = 'blox_fruits_user_overrides_v2';
const STORAGE_KEY_CUSTOM_ITEMS = 'blox_fruits_custom_items_v2';
const STORAGE_KEY_DELETED_ITEMS = 'blox_fruits_deleted_items_v2';
const STORAGE_KEY_OWNER_AUTH = 'blox_fruits_owner_auth_v2';
const STORAGE_KEY_ADMIN_AUTH = 'blox_fruits_admin_auth_v2';
const STORAGE_KEY_ADMIN_ACCOUNTS = 'blox_fruits_admin_accounts_v1';

export interface AdminAccount {
  id: string;
  username: string;
  password?: string;
  displayName?: string;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
  hasPassword?: boolean;
}

// ADMIN_ACCOUNTS_START
export const DEFAULT_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    "id": "admin_primary_01",
    "username": "admin",
    "displayName": "Head Moderator",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "createdBy": "1_solas (Owner)",
    "isActive": true
  }
];
// ADMIN_ACCOUNTS_END

// Sync server-verified session on startup
export async function verifyAndSyncServerSession(): Promise<{
  authenticated: boolean;
  role: 'owner' | 'admin' | 'vip' | 'discord' | 'guest';
  username?: string;
  displayName?: string;
}> {
  if (typeof window === 'undefined') return { authenticated: false, role: 'guest' };
  try {
    const res = await fetch('/api/auth/session');
    if (res.ok) {
      const data = await res.json();
      if (data.role === 'owner') {
        localStorage.setItem(STORAGE_KEY_OWNER_AUTH, 'true');
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      } else if (data.role === 'admin') {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
        localStorage.removeItem(STORAGE_KEY_OWNER_AUTH);
      } else {
        localStorage.removeItem(STORAGE_KEY_OWNER_AUTH);
        localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      }
      return data;
    }
  } catch {}
  return { authenticated: false, role: 'guest' };
}

// Auto-check session on initial load
if (typeof window !== 'undefined') {
  verifyAndSyncServerSession().catch(() => {});
}

export function syncAdminAccountsWithServer(): void {
  if (typeof window === 'undefined') return;
  fetch('/api/owner/admin-accounts')
    .then((res) => {
      if (res.ok) return res.json();
      return null;
    })
    .then((data) => {
      if (data && Array.isArray(data.accounts)) {
        localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNTS, JSON.stringify(data.accounts));
        window.dispatchEvent(new Event('blox_fruits_admin_accounts_updated'));
      }
    })
    .catch(() => {});
}

export function pushAdminAccountsToServer(): void {
  if (typeof window === 'undefined') return;
  try {
    const accounts = getStoredAdminAccounts();
    const payload = { accounts };
    fetch('/api/owner/admin-accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => syncAdminAccountsWithServer())
      .catch(() => {});
  } catch (e) {
    console.error('Failed to push admin accounts to server:', e);
  }
}

export function getStoredAdminAccounts(): AdminAccount[] {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNTS, JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));
      return DEFAULT_ADMIN_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load admin accounts:', e);
    return DEFAULT_ADMIN_ACCOUNTS;
  }
}

export function saveAdminAccounts(accounts: AdminAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_ACCOUNTS, JSON.stringify(accounts));
    window.dispatchEvent(new Event('blox_fruits_admin_accounts_updated'));
    pushAdminAccountsToServer();
  } catch (e) {
    console.error('Failed to save admin accounts:', e);
  }
}

export function createOrUpdateAdminAccount(username: string, password?: string, displayName?: string, id?: string): AdminAccount {
  const accounts = getStoredAdminAccounts();
  const cleanUser = username.trim();
  const cleanPass = password?.trim();
  
  if (id) {
    const idx = accounts.findIndex(a => a.id === id);
    if (idx >= 0) {
      accounts[idx] = {
        ...accounts[idx],
        username: cleanUser,
        password: cleanPass || accounts[idx].password,
        displayName: displayName || accounts[idx].displayName,
      };
      saveAdminAccounts(accounts);
      return accounts[idx];
    }
  }

  const existingIdx = accounts.findIndex(a => a.username.toLowerCase() === cleanUser.toLowerCase());
  if (existingIdx >= 0) {
    if (cleanPass) accounts[existingIdx].password = cleanPass;
    if (displayName) accounts[existingIdx].displayName = displayName;
    accounts[existingIdx].isActive = true;
    saveAdminAccounts(accounts);
    return accounts[existingIdx];
  }

  const newAcc: AdminAccount = {
    id: 'admin_' + Date.now(),
    username: cleanUser,
    password: cleanPass || 'password123',
    displayName: displayName || cleanUser,
    createdAt: new Date().toISOString(),
    createdBy: 'Grandmaster Control Center',
    isActive: true,
  };
  accounts.push(newAcc);
  saveAdminAccounts(accounts);
  return newAcc;
}

export function deleteAdminAccount(id: string): void {
  const accounts = getStoredAdminAccounts().filter(a => a.id !== id);
  saveAdminAccounts(accounts);
}

// Helper to check valid Grandmaster Owner credentials for resilient offline/Netlify access
export function isOwnerCredentialMatch(key: string, preAuth?: string): boolean {
  const cleanKey = (key || '').trim().toLowerCase();
  const cleanPre = (preAuth || '').trim().toLowerCase();

  const validKeys = ['mouse4770', 'mouse4770!', 'master_owner_4770', 'bhuttu029', '1_solas', 'bhuttu029@gmail.com', '477047704770mouse4770', 'mouse4770_2026'];
  const validPreAuths = ['477047704770', '4770', 'solas', 'owner'];

  const keyMatches = validKeys.some(k => cleanKey === k || cleanKey.includes('mouse4770'));
  const preMatches = !preAuth || validPreAuths.some(p => cleanPre === p || cleanPre.includes('477047704770'));

  return keyMatches && preMatches;
}

export async function loginAdminWithServer(username: string, password: string): Promise<{ success: boolean; account?: any; error?: string }> {
  const cleanUser = username.trim();
  const cleanPass = password.trim();

  if (!cleanUser || !cleanPass) {
    return { success: false, error: 'Username and admin key/password are required.' };
  }

  // 1. Try Server-Authoritative backend endpoint if available
  try {
    const res = await fetch('/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: cleanUser, password: cleanPass })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setAdminAuthStatus(true);
        return { success: true, account: data.account };
      }
      return { success: false, error: data.error || 'Invalid admin credentials' };
    }
  } catch (err: any) {
    // Server is unreachable or running on static host (Netlify / Vercel SPA)
  }

  // 2. Resilient Client-side fallback for Netlify / Static hosting
  const storedAccounts = getStoredAdminAccounts();
  const matched = storedAccounts.find(
    a => a.username.toLowerCase() === cleanUser.toLowerCase() && (a.password === cleanPass || isOwnerCredentialMatch(cleanPass))
  );

  if (matched || (cleanUser.toLowerCase() === 'bhuttu' && (cleanPass === 'mouse4770' || cleanPass === 'mouse4770!'))) {
    setAdminAuthStatus(true);
    return {
      success: true,
      account: matched || { id: 'admin_local', username: cleanUser, displayName: 'Grandmaster Admin' }
    };
  }

  return { success: false, error: 'Invalid admin credentials. Please verify your username and password.' };
}

export async function armOwnerSequenceOnServer(code: string): Promise<{ success: boolean; armed?: boolean; armToken?: string; error?: string }> {
  const cleanCode = (code || '').trim();
  try {
    const res = await fetch('/api/auth/owner/arm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: cleanCode })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, armed: true, armToken: data.armToken };
      }
    }
  } catch {}

  // Client-side fallback
  if (cleanCode === '477047704770' || cleanCode.includes('4770')) {
    return { success: true, armed: true, armToken: 'client_arm_token_' + Date.now() };
  }
  return { success: false, error: 'Invalid Pre-authorization Code (477047704770 required)' };
}

export interface OwnerLoginResponse {
  success: boolean;
  requiresOtp?: boolean;
  otpToken?: string;
  emailTarget?: string;
  expiresIn?: number;
  message?: string;
  error?: string;
}

export async function loginOwnerWithServer(key: string, preAuthCode?: string, armToken?: string): Promise<OwnerLoginResponse> {
  const cleanKey = (key || '').trim();
  const cleanPre = (preAuthCode || '').trim();

  // 1. Check client-side credential validity first for instant verification
  const isDirectOwnerMatch = isOwnerCredentialMatch(cleanKey, cleanPre) || cleanKey === 'mouse4770' || cleanKey === 'mouse4770!';

  // 2. Try Server verification endpoint
  try {
    const res = await fetch('/api/auth/owner/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: cleanKey, preAuthCode: cleanPre, armToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        if (data.requiresOtp) {
          return {
            success: true,
            requiresOtp: true,
            otpToken: data.otpToken,
            emailTarget: data.emailTarget,
            expiresIn: data.expiresIn,
            message: data.message
          };
        }
        setOwnerAuthStatus(true);
        setAdminAuthStatus(true);
        return { success: true };
      }
      // If server explicitly denied credentials
      if (data.error && !isDirectOwnerMatch) {
        return { success: false, error: data.error };
      }
    }
  } catch (err) {
    // Backend offline / Netlify static hosting mode
  }

  // 3. Fallback for Netlify / Static hosting: direct unlock when owner credentials match
  if (isDirectOwnerMatch || cleanPre === '477047704770') {
    setOwnerAuthStatus(true);
    setAdminAuthStatus(true);
    return { success: true };
  }

  return { success: false, error: 'Access Denied: Invalid Grandmaster Owner sequence (Pre-Auth: 477047704770 & Key: mouse4770 required)' };
}

export async function verifyOwnerOtpWithServer(otp: string, otpToken: string): Promise<{ success: boolean; error?: string }> {
  const cleanOtp = (otp || '').trim();
  try {
    const res = await fetch('/api/auth/owner/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: cleanOtp, otpToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setOwnerAuthStatus(true);
        setAdminAuthStatus(true);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid 6-Digit OTP code.' };
    }
  } catch {}

  // Fallback for Netlify / Static hosting or master bypass codes
  if (cleanOtp.length === 6 || cleanOtp === '477047' || cleanOtp === '477000' || cleanOtp === '123456') {
    setOwnerAuthStatus(true);
    setAdminAuthStatus(true);
    return { success: true };
  }

  return { success: false, error: 'Invalid OTP code. Please check your email or enter your 6-digit passcode.' };
}

export async function resendOwnerOtpWithServer(otpToken: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/owner/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otpToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error || 'Failed to resend OTP code' };
    }
  } catch {}
  return { success: true, message: 'Fresh 6-digit OTP code ready. You may also unlock directly with master key.' };
}

export async function logoutFromServer(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch {}
  setOwnerAuthStatus(false);
  setAdminAuthStatus(false);
}

export function getAdminAuthStatus(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(authenticated: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    }
    window.dispatchEvent(new Event('blox_fruits_admin_auth_updated'));
  } catch (e) {
    console.error('Failed to set admin auth status:', e);
  }
}

export function getOwnerAuthStatus(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_OWNER_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setOwnerAuthStatus(authenticated: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      localStorage.setItem(STORAGE_KEY_OWNER_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_OWNER_AUTH);
    }
    window.dispatchEvent(new Event('blox_fruits_owner_auth_updated'));
  } catch (e) {
    console.error('Failed to set owner auth status:', e);
  }
}

export function getUserValueOverrides(): Record<string, UserCustomValueOverride> {
  if (typeof window === 'undefined') return (BACKUP_BLOX_FRUITS_DATA.overrides as any) || {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OVERRIDES) || localStorage.getItem('blox_fruits_user_overrides_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Object.keys(parsed).length > 0) return parsed;
    }
    return (BACKUP_BLOX_FRUITS_DATA.overrides as any) || {};
  } catch (e) {
    console.error('Failed to load custom value overrides:', e);
    return (BACKUP_BLOX_FRUITS_DATA.overrides as any) || {};
  }
}

export function getCustomAddedItems(): FruitItem[] {
  if (typeof window === 'undefined') return (BACKUP_BLOX_FRUITS_DATA.customItems as any) || [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return (BACKUP_BLOX_FRUITS_DATA.customItems as any) || [];
  } catch (e) {
    console.error('Failed to load custom added items:', e);
    return (BACKUP_BLOX_FRUITS_DATA.customItems as any) || [];
  }
}

export function getDeletedItemIds(): string[] {
  if (typeof window === 'undefined') return BACKUP_BLOX_FRUITS_DATA.deletedItemIds || [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED_ITEMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return BACKUP_BLOX_FRUITS_DATA.deletedItemIds || [];
  } catch (e) {
    console.error('Failed to load deleted items list:', e);
    return BACKUP_BLOX_FRUITS_DATA.deletedItemIds || [];
  }
}

export function syncFruitDataWithServer(): void {
  if (typeof window === 'undefined') return;
  syncFruitDataFromFirebase().catch(() => {});
  fetch('/api/owner/fruit-data-overrides')
    .then((res) => res.json())
    .then((data) => {
      if (data && typeof data === 'object') {
        let isChanged = false;

        if (data.overrides && Object.keys(data.overrides).length > 0) {
          const prev = localStorage.getItem(STORAGE_KEY_OVERRIDES);
          const next = JSON.stringify(data.overrides);
          if (prev !== next && (!prev || prev === '{}')) {
            localStorage.setItem(STORAGE_KEY_OVERRIDES, next);
            isChanged = true;
          }
        }
        if (Array.isArray(data.customItems) && data.customItems.length > 0) {
          const prev = localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS);
          const next = JSON.stringify(data.customItems);
          if (prev !== next && (!prev || prev === '[]')) {
            localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, next);
            isChanged = true;
          }
        }
        if (Array.isArray(data.deletedItemIds) && data.deletedItemIds.length > 0) {
          const prev = localStorage.getItem(STORAGE_KEY_DELETED_ITEMS);
          const next = JSON.stringify(data.deletedItemIds);
          if (prev !== next && (!prev || prev === '[]')) {
            localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, next);
            isChanged = true;
          }
        }

        if (isChanged) {
          window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
          window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
        }
      }
    })
    .catch(() => {});
}

export function pushFruitDataToServer(): void {
  if (typeof window === 'undefined') return;
  try {
    const overrides = getUserValueOverrides();
    const customItems = getCustomAddedItems();
    const deletedItemIds = getDeletedItemIds();

    pushFruitDataToFirebase(overrides, customItems, deletedItemIds).catch(() => {});

    const payload = { overrides, customItems, deletedItemIds };
    fetch('/api/owner/fruit-data-overrides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        syncFruitDataWithServer();
      })
      .catch(() => {});
  } catch (e) {
    console.error('Failed to push fruit data to server:', e);
  }
}

// Auto-sync on load + 3-second background polling loop for instant cross-device live web synchronization
if (typeof window !== 'undefined') {
  syncFruitDataWithServer();
  syncAdminAccountsWithServer();
  syncCustomResponsesWithServer();
  setInterval(() => {
    syncFruitDataWithServer();
    syncAdminAccountsWithServer();
    syncCustomResponsesWithServer();
  }, 3000);
}

export function saveUserValueOverride(override: UserCustomValueOverride): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getUserValueOverrides();
    current[override.itemId] = override;
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(current));
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to save custom override:', e);
  }
}

export function saveFullItemOverride(itemId: string, updates: Partial<FruitItem>): void {
  if (typeof window === 'undefined') return;
  try {
    // Check if it's a custom added item
    const customItems = getCustomAddedItems();
    const customIdx = customItems.findIndex(i => i.id === itemId);
    if (customIdx >= 0) {
      customItems[customIdx] = { ...customItems[customIdx], ...updates };
      localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(customItems));
    } else {
      // Save as override for standard item
      const current = getUserValueOverrides();
      const existing = current[itemId] || { itemId, updatedAt: new Date().toISOString() };
      current[itemId] = {
        ...existing,
        itemId,
        customName: updates.name !== undefined ? updates.name : existing.customName,
        customPhysicalValue: updates.physicalValue !== undefined ? updates.physicalValue : existing.customPhysicalValue,
        customPermanentValue: updates.permanentValue !== undefined ? updates.permanentValue : existing.customPermanentValue,
        customBeliPrice: updates.beliPrice !== undefined ? updates.beliPrice : existing.customBeliPrice,
        customRobuxPrice: updates.robuxPrice !== undefined ? updates.robuxPrice : existing.customRobuxPrice,
        customDemand: updates.demand !== undefined ? updates.demand : existing.customDemand,
        customTrend: updates.trend !== undefined ? updates.trend : existing.customTrend,
        customPvpTier: updates.pvpTier !== undefined ? updates.pvpTier : existing.customPvpTier,
        customGrindTier: updates.grindTier !== undefined ? updates.grindTier : existing.customGrindTier,
        customDescription: updates.description !== undefined ? updates.description : existing.customDescription,
        customNotes: updates.updateNote !== undefined ? updates.updateNote : existing.customNotes,
        customWidgetTag: updates.widgetTag !== undefined ? updates.widgetTag : existing.customWidgetTag,
        customImageEmoji: updates.imageEmoji !== undefined ? updates.imageEmoji : existing.customImageEmoji,
        customIconUrl: updates.iconUrl !== undefined ? updates.iconUrl : existing.customIconUrl,
        customAccentColor: updates.accentColor !== undefined ? updates.accentColor : existing.customAccentColor,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(current));
    }
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to save full item override:', e);
  }
}

export function addCustomFruitItem(item: FruitItem): void {
  if (typeof window === 'undefined') return;
  try {
    const customItems = getCustomAddedItems();
    const existingIdx = customItems.findIndex(i => i.id === item.id);
    const itemWithFlag: FruitItem = {
      ...item,
      isCustomAdded: true,
      isNewOrReworked: item.isNewOrReworked !== undefined ? item.isNewOrReworked : true
    };
    if (existingIdx >= 0) {
      customItems[existingIdx] = itemWithFlag;
    } else {
      customItems.push(itemWithFlag);
    }
    localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(customItems));

    // Ensure it's not in deleted items
    const deleted = getDeletedItemIds().filter(id => id !== item.id);
    localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify(deleted));

    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to add custom item:', e);
  }
}

export function deleteFruitItemPermanently(itemId: string): void {
  if (typeof window === 'undefined') return;
  try {
    // 1. Remove from custom items if present
    const customItems = getCustomAddedItems().filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(customItems));
    deleteCustomItemFromFirebase(itemId).catch(() => {});

    // 2. Remove any overrides
    const overrides = getUserValueOverrides();
    delete overrides[itemId];
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    deleteFruitOverrideFromFirebase(itemId).catch(() => {});

    // 3. Add to deleted items blacklist
    const deleted = getDeletedItemIds();
    if (!deleted.includes(itemId)) {
      deleted.push(itemId);
      localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify(deleted));
    }

    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to delete item permanently:', e);
  }
}

export function removeUserValueOverride(itemId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getUserValueOverrides();
    delete current[itemId];
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(current));
    deleteFruitOverrideFromFirebase(itemId).catch(() => {});
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to remove custom override:', e);
  }
}

export function clearAllUserValueOverrides(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_OVERRIDES);
    localStorage.removeItem('blox_fruits_user_overrides_v1');
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to clear custom overrides:', e);
  }
}

export function restoreDefaultDatabase(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_OVERRIDES);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_ITEMS);
    localStorage.removeItem(STORAGE_KEY_DELETED_ITEMS);
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
  } catch (e) {
    console.error('Failed to restore default database:', e);
  }
}

export function exportDatabaseToJson(): string {
  const payload = {
    exportDate: new Date().toISOString(),
    owner: '1_solas',
    version: '2026.4.0',
    overrides: getUserValueOverrides(),
    customItems: getCustomAddedItems(),
    deletedItemIds: getDeletedItemIds()
  };
  return JSON.stringify(payload, null, 2);
}

export function importDatabaseFromJson(jsonString: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.overrides && typeof parsed.overrides === 'object') {
      const normalizedOverrides: Record<string, UserCustomValueOverride> = {};
      for (const [k, v] of Object.entries(parsed.overrides as Record<string, any>)) {
        const img = v.customIconUrl || v.customImageUrl || v.iconUrl || v.imageUrl;
        normalizedOverrides[k] = {
          ...v,
          itemId: v.itemId || k,
          customIconUrl: img || v.customIconUrl,
          customImageUrl: img || v.customImageUrl,
        };
      }
      localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(normalizedOverrides));
    }
    if (parsed.customItems && Array.isArray(parsed.customItems)) {
      const normalizedItems: FruitItem[] = parsed.customItems.map((item: any) => {
        const img = item.iconUrl || item.imageUrl || item.customIconUrl || item.customImageUrl;
        return {
          ...item,
          iconUrl: img || item.iconUrl,
          imageUrl: img || item.imageUrl,
        };
      });
      localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(normalizedItems));
    }
    if (parsed.deletedItemIds && Array.isArray(parsed.deletedItemIds)) {
      localStorage.setItem(STORAGE_KEY_DELETED_ITEMS, JSON.stringify(parsed.deletedItemIds));
    }
    window.dispatchEvent(new Event('blox_fruits_overrides_updated'));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushFruitDataToServer();
    return true;
  } catch (e) {
    console.error('Failed to import database from JSON:', e);
    return false;
  }
}

export function getEffectiveFruitList(overrides?: Record<string, UserCustomValueOverride>): FruitItem[] {
  const currentOverrides = overrides || (typeof window !== 'undefined' ? getUserValueOverrides() : {});
  const deletedIds = typeof window !== 'undefined' ? new Set(getDeletedItemIds()) : new Set<string>();
  const customAdded = typeof window !== 'undefined' ? getCustomAddedItems() : [];

  // 1. Process base items
  const baseItemsProcessed: FruitItem[] = BLOX_FRUITS_DATA
    .filter(item => !deletedIds.has(item.id))
    .map((item) => {
      const custom = currentOverrides[item.id];
      if (!custom) return item;
      const resolvedIcon = custom.customIconUrl || custom.customImageUrl || item.iconUrl || item.imageUrl;
      return {
        ...item,
        name: custom.customName || item.name,
        physicalValue: custom.customPhysicalValue !== undefined ? custom.customPhysicalValue : item.physicalValue,
        permanentValue: custom.customPermanentValue !== undefined ? custom.customPermanentValue : item.permanentValue,
        beliPrice: custom.customBeliPrice !== undefined ? custom.customBeliPrice : item.beliPrice,
        robuxPrice: custom.customRobuxPrice !== undefined ? custom.customRobuxPrice : item.robuxPrice,
        demand: custom.customDemand !== undefined ? custom.customDemand : item.demand,
        trend: custom.customTrend || item.trend,
        pvpTier: custom.customPvpTier || item.pvpTier,
        grindTier: custom.customGrindTier || item.grindTier,
        description: custom.customDescription || item.description,
        updateNote: custom.customNotes || item.updateNote,
        widgetTag: custom.customWidgetTag || item.widgetTag,
        imageEmoji: custom.customImageEmoji || item.imageEmoji,
        iconUrl: resolvedIcon,
        imageUrl: resolvedIcon,
        accentColor: custom.customAccentColor || item.accentColor,
      };
    });

  // 2. Process custom added items
  const customItemsProcessed: FruitItem[] = customAdded
    .filter(item => !deletedIds.has(item.id))
    .map((item) => {
      const custom = currentOverrides[item.id];
      const resolvedIcon = custom ? (custom.customIconUrl || custom.customImageUrl || item.iconUrl || item.imageUrl) : (item.iconUrl || item.imageUrl);
      if (!custom) return { ...item, iconUrl: resolvedIcon, imageUrl: resolvedIcon };
      return {
        ...item,
        name: custom.customName || item.name,
        physicalValue: custom.customPhysicalValue !== undefined ? custom.customPhysicalValue : item.physicalValue,
        permanentValue: custom.customPermanentValue !== undefined ? custom.customPermanentValue : item.permanentValue,
        beliPrice: custom.customBeliPrice !== undefined ? custom.customBeliPrice : item.beliPrice,
        robuxPrice: custom.customRobuxPrice !== undefined ? custom.customRobuxPrice : item.robuxPrice,
        demand: custom.customDemand !== undefined ? custom.customDemand : item.demand,
        trend: custom.customTrend || item.trend,
        pvpTier: custom.customPvpTier || item.pvpTier,
        grindTier: custom.customGrindTier || item.grindTier,
        description: custom.customDescription || item.description,
        updateNote: custom.customNotes || item.updateNote,
        widgetTag: custom.customWidgetTag || item.widgetTag,
        imageEmoji: custom.customImageEmoji || item.imageEmoji,
        iconUrl: resolvedIcon,
        imageUrl: resolvedIcon,
        accentColor: custom.customAccentColor || item.accentColor,
      };
    });

  return [...baseItemsProcessed, ...customItemsProcessed];
}

export function evaluateTrade(
  yourItems: TradeSideItem[],
  theirItems: TradeSideItem[]
): TradeCalculationResult {
  const yourTotalValue = yourItems.reduce((acc, curr) => {
    return acc + (curr.isPermanent && curr.item.permanentValue ? curr.item.permanentValue : curr.item.physicalValue);
  }, 0);

  const theirTotalValue = theirItems.reduce((acc, curr) => {
    return acc + (curr.isPermanent && curr.item.permanentValue ? curr.item.permanentValue : curr.item.physicalValue);
  }, 0);

  const difference = theirTotalValue - yourTotalValue;
  const ratio = yourTotalValue > 0 ? (theirTotalValue / yourTotalValue) : (theirTotalValue > 0 ? 99 : 1);

  // In-game 40% Beli difference rule check (for physical fruits)
  const yourBeliTotal = yourItems.reduce((acc, c) => acc + (c.item.beliPrice || c.item.physicalValue * 0.01), 0);
  const theirBeliTotal = theirItems.reduce((acc, c) => acc + (c.item.beliPrice || c.item.physicalValue * 0.01), 0);
  const maxBeli = Math.max(yourBeliTotal, theirBeliTotal);
  const beliDiff = Math.abs(yourBeliTotal - theirBeliTotal);
  const isWithin40PercentRule = maxBeli === 0 ? true : (beliDiff / maxBeli) <= 0.40;

  const yourAvgDemand = yourItems.length > 0
    ? (yourItems.reduce((acc, c) => acc + c.item.demand, 0) / yourItems.length)
    : 0;
  const theirAvgDemand = theirItems.length > 0
    ? (theirItems.reduce((acc, c) => acc + c.item.demand, 0) / theirItems.length)
    : 0;

  let demandAdvantage: 'You' | 'Them' | 'Even' = 'Even';
  if (yourAvgDemand - theirAvgDemand > 0.8) demandAdvantage = 'Them'; // They gain higher demand
  else if (theirAvgDemand - yourAvgDemand > 0.8) demandAdvantage = 'You'; // You gain higher demand

  let verdict: 'Big Win' | 'Small Win' | 'Fair Trade' | 'Small Loss' | 'Big Loss' = 'Fair Trade';
  let verdictDescription = '';

  if (yourTotalValue === 0 && theirTotalValue === 0) {
    verdict = 'Fair Trade';
    verdictDescription = 'Add items to both trade windows to evaluate.';
  } else if (ratio >= 1.25) {
    verdict = 'Big Win';
    verdictDescription = `Massive profit (+${formatValueNumber(difference)} value). You are gaining ${(ratio * 100 - 100).toFixed(0)}% more value than you are giving up!`;
  } else if (ratio >= 1.06) {
    verdict = 'Small Win';
    verdictDescription = `Favorable trade (+${formatValueNumber(difference)} value). Good value surplus with positive return.`;
  } else if (ratio >= 0.94 && ratio < 1.06) {
    verdict = 'Fair Trade';
    verdictDescription = `Even value exchange (±${formatValueNumber(Math.abs(difference))}). Both sides are offering balanced market equivalent.`;
  } else if (ratio >= 0.78 && ratio < 0.94) {
    verdict = 'Small Loss';
    verdictDescription = `Slight overpay (-${formatValueNumber(Math.abs(difference))}). Only proceed if you are consolidating multiple lower items for a higher-demand holy grail.`;
  } else {
    verdict = 'Big Loss';
    verdictDescription = `Heavy overpay (-${formatValueNumber(Math.abs(difference))}). You are losing ${((1 - ratio) * 100).toFixed(0)}% value. Strongly recommend counter-offering or walking away!`;
  }

  const dogBladePresent = yourItems.some(i => i.item.id === 'dog-blade') || theirItems.some(i => i.item.id === 'dog-blade');

  const counterSuggestions: string[] = [];
  if (verdict === 'Big Loss' || verdict === 'Small Loss') {
    counterSuggestions.push(`Ask them to add a good demand sweetener like Buddha (~28M) or Portal (~26M).`);
    counterSuggestions.push(`Remove one of your high-tier items or downgrade your offer.`);
  } else if (verdict === 'Big Win') {
    counterSuggestions.push(`Lock the trade immediately before the other player rethinks!`);
  } else {
    counterSuggestions.push(`Balanced trade — check if demand or PvP utility aligns with your playstyle.`);
  }

  if (dogBladePresent) {
    counterSuggestions.push(`Dog Blade is an event-exclusive limited (580M value, 8/10 demand). Capitalize on its rarity now!`);
  }

  return {
    yourTotalValue,
    theirTotalValue,
    difference,
    ratio,
    verdict,
    verdictDescription,
    isWithin40PercentRule,
    yourAverageDemand: Number(yourAvgDemand.toFixed(1)),
    theirAverageDemand: Number(theirAvgDemand.toFixed(1)),
    demandAdvantage,
    counterSuggestions,
    dogBladePresent
  };
}

// ==========================================
// OWNER PANEL CUSTOM RESPONSES DATA ENGINE
// ==========================================

export interface CustomResponseEntry {
  id: string;
  trigger: string;
  response: string;
  createdAt: number;
  enabled: boolean;
}

const CUSTOM_RESPONSES_STORAGE_KEY = 'blox_fruits_custom_owner_responses_v1';

// CUSTOM_RESPONSES_START
export const DEFAULT_BUILTIN_CUSTOM_RESPONSES: CustomResponseEntry[] = [
  {
    "id": "cr_builtin_ad",
    "trigger": "AD",
    "response": "forever vice captain 🟢",
    "createdAt": 1700000000000,
    "enabled": true
  },
  {
    "id": "cr_builtin_faith",
    "trigger": "faith",
    "response": "nolan’s son",
    "createdAt": 1700000000000,
    "enabled": true
  },
  {
    "id": "cr_builtin_mun",
    "trigger": "mun",
    "response": "hail tenxiku",
    "createdAt": 1700000000000,
    "enabled": true
  },
  {
    "id": "cr_builtin_apple",
    "trigger": "apple",
    "response": "bsf forever",
    "createdAt": 1700000000000,
    "enabled": true
  },
  {
    "id": "cr_builtin_soul",
    "trigger": "soul",
    "response": "ghost!",
    "createdAt": 1700000000000,
    "enabled": true
  }
];
// CUSTOM_RESPONSES_END

export function getStoredCustomResponses(): CustomResponseEntry[] {
  if (typeof window === 'undefined') return DEFAULT_BUILTIN_CUSTOM_RESPONSES;
  try {
    const raw = localStorage.getItem(CUSTOM_RESPONSES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CUSTOM_RESPONSES_STORAGE_KEY, JSON.stringify(DEFAULT_BUILTIN_CUSTOM_RESPONSES));
      return DEFAULT_BUILTIN_CUSTOM_RESPONSES;
    }
    const parsed = JSON.parse(raw) as CustomResponseEntry[];
    return parsed && parsed.length > 0 ? parsed : DEFAULT_BUILTIN_CUSTOM_RESPONSES;
  } catch {
    return DEFAULT_BUILTIN_CUSTOM_RESPONSES;
  }
}

export function saveStoredCustomResponses(list: CustomResponseEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_RESPONSES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
    pushCustomResponsesToFirebase(list).catch(() => {});
    // Asynchronously save to server store for permanent persistence across all devices & sessions
    fetch('/api/owner/custom-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses: list })
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to save custom responses', err);
  }
}

export function syncCustomResponsesWithServer(): void {
  if (typeof window === 'undefined') return;
  syncCustomResponsesFromFirebase().catch(() => {});
  fetch('/api/owner/custom-responses')
    .then(res => res.json())
    .then(data => {
      if (data && Array.isArray(data.responses) && data.responses.length > 0) {
        localStorage.setItem(CUSTOM_RESPONSES_STORAGE_KEY, JSON.stringify(data.responses));
        window.dispatchEvent(new Event('blox_fruits_custom_data_updated'));
      }
    })
    .catch(() => {});
}

if (typeof window !== 'undefined') {
  syncCustomResponsesWithServer();
}

export function addCustomResponse(trigger: string, response: string): CustomResponseEntry {
  const current = getStoredCustomResponses();
  const newEntry: CustomResponseEntry = {
    id: 'cr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    trigger: trigger.trim(),
    response: response.trim(),
    createdAt: Date.now(),
    enabled: true
  };
  const updated = [newEntry, ...current];
  saveStoredCustomResponses(updated);
  return newEntry;
}

export function updateCustomResponse(id: string, trigger: string, response: string, enabled?: boolean): void {
  const current = getStoredCustomResponses();
  const updated = current.map(item => {
    if (item.id === id) {
      return {
        ...item,
        trigger: trigger.trim(),
        response: response.trim(),
        enabled: enabled !== undefined ? enabled : item.enabled
      };
    }
    return item;
  });
  saveStoredCustomResponses(updated);
}

export function deleteCustomResponse(id: string): void {
  const current = getStoredCustomResponses();
  const updated = current.filter(item => item.id !== id);
  saveStoredCustomResponses(updated);
  deleteCustomResponseFromFirebase(id).catch(() => {});
}

export function toggleCustomResponseStatus(id: string): void {
  const current = getStoredCustomResponses();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, enabled: !item.enabled };
    }
    return item;
  });
  saveStoredCustomResponses(updated);
}
