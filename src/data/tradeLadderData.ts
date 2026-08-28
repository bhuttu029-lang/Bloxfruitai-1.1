import { FruitItem } from './bloxFruitsData';

export interface LadderStep {
  stepNumber: number;
  title: string;
  giveItems: string[]; // Fruit IDs or names
  givePerm?: boolean;
  receiveItems: string[];
  receivePerm?: boolean;
  profitEstimate: string; // e.g. "+$15M Value"
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  strategyTip: string;
  recommendedLocation: 'Second Sea Café' | 'Third Sea Turtle Mansion' | 'Discord Trading / Reddit' | 'Public Server Hopping';
  timeEstimate: string;
  whyItWorks: string;
}

export interface PresetLadderJourney {
  id: string;
  title: string;
  subtitle: string;
  startingBudget: string;
  targetFruit: string;
  targetFruitId: string;
  targetEmoji: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert' | 'High Roller';
  estimatedHours: string;
  badge: string;
  accentColor: string;
  description: string;
  steps: LadderStep[];
}

export const PRESET_LADDERS: PresetLadderJourney[] = [
  {
    id: 'zero-to-kitsune',
    title: 'Zero to Kitsune (The Classic 7-Step Climb)',
    subtitle: 'From a humble beginner drop to the pinnacle of Blox Fruits trading hierarchy.',
    startingBudget: '1x Rocket / Spin + Common Drops',
    targetFruit: 'Kitsune',
    targetFruitId: 'kitsune',
    targetEmoji: '🦊',
    difficulty: 'Intermediate',
    estimatedHours: '4 - 8 Days',
    badge: 'MOST POPULAR',
    accentColor: 'from-amber-400 via-rose-500 to-indigo-600',
    description: 'The proven trade-flipping roadmap used by veteran traders to climb the value ladder without spending a single Robux.',
    steps: [
      {
        stepNumber: 1,
        title: 'The Starter Grind ➔ Magma / Light',
        giveItems: ['rocket', 'spin', 'blade'],
        receiveItems: ['magma'],
        profitEstimate: '+$1.2M Value',
        difficulty: 'Easy',
        strategyTip: 'Roll Zioles dealer cousin or roll common gacha. Trade several random commons/uncommons to a Sea 1 player who needs raid fodder for Magma/Light.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '30 - 60 mins',
        whyItWorks: 'Magma and Light have steady demand among Sea 1 and early Sea 2 players starting their grind journey.'
      },
      {
        stepNumber: 2,
        title: 'Magma / Light + Add ➔ Sound or Blizzard',
        giveItems: ['magma', 'ghost'],
        receiveItems: ['sound'],
        profitEstimate: '+$3.5M Value',
        difficulty: 'Easy',
        strategyTip: 'Look for players who urgently need Magma to awaken it for Sea Beast hunting. Offer Magma + a tiny add for Sound or Spider/Love.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '1 - 2 hours',
        whyItWorks: 'Magma V2 is the highest Sea Beast DPS in the game, giving it immediate situational overpay power.'
      },
      {
        stepNumber: 3,
        title: 'Sound + Add ➔ Portal or Rumble',
        giveItems: ['sound', 'quake'],
        receiveItems: ['portal'],
        profitEstimate: '+$7M Value',
        difficulty: 'Medium',
        strategyTip: 'Portal has massive PvP utility. Find someone looking for Sound for its fun musical combo moves or as raid bait.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '2 - 3 hours',
        whyItWorks: 'Portal is the universal currency of mid-tier trading; once you have Portal, your liquidity doubles.'
      },
      {
        stepNumber: 4,
        title: 'Portal + Small Add ➔ Buddha',
        giveItems: ['portal'],
        receiveItems: ['buddha'],
        profitEstimate: '+$3M Value',
        difficulty: 'Medium',
        strategyTip: 'In raw trade points, Portal and Buddha are close, but Buddha is the most wanted grinding fruit in the entire game. Post in Discord: "[H] Portal [W] Buddha".',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '1 hour',
        whyItWorks: 'Buddha has 10/10 demand. Every single player reaching Sea 2 needs Buddha to level up to 2550.'
      },
      {
        stepNumber: 5,
        title: 'Buddha + Portal / Add ➔ Spirit or Venom',
        giveItems: ['buddha', 'spider'],
        receiveItems: ['spirit'],
        profitEstimate: '+$8M Value',
        difficulty: 'Medium',
        strategyTip: 'Sea 2 players with duplicate Spirits will happily trade down for Buddha + add so they can grind mastery and raids.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '2 - 4 hours',
        whyItWorks: 'Players frequently overpay Spirit/Venom for Buddha when they are desperate to speedrun their levels.'
      },
      {
        stepNumber: 6,
        title: 'Spirit + Venom / Adds ➔ Dough (The Awakening King)',
        giveItems: ['spirit', 'venom'],
        receiveItems: ['dough'],
        profitEstimate: '+$15M Value',
        difficulty: 'Hard',
        strategyTip: 'Dough owners look for bundles. Offering 2 solid Mythicals (Spirit + Venom or Mammoth) is the standard currency for 1x Dough.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '3 - 6 hours',
        whyItWorks: 'Dough V2 is the staple meta combo fruit; players hoarding Dough often want multiple mythicals to diversify.'
      },
      {
        stepNumber: 7,
        title: 'Dough + T-Rex / Adds ➔ Leopard',
        giveItems: ['dough', 't-rex'],
        receiveItems: ['leopard'],
        profitEstimate: '+$18M Value',
        difficulty: 'Hard',
        strategyTip: 'Combine Dough with a high-demand add like T-Rex or Mammoth. Server hop Mansion tables looking for Leopard holders.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '1 - 2 days',
        whyItWorks: 'Leopard is the gateway to Kitsune. Two Leopards or Leopard + Dough + adds is the official threshold for Kitsune.'
      },
      {
        stepNumber: 8,
        title: '2x Leopard (or Leopard + Dough + T-Rex) ➔ KITSUNE! 🦊',
        giveItems: ['leopard', 'dough', 't-rex', 'spirit'],
        receiveItems: ['kitsune'],
        profitEstimate: '+$40M Value',
        difficulty: 'Extreme',
        strategyTip: 'Advertise your bundle on official Blox Fruits Discord trading hubs. Be patient and do not fall for fake Discord links or scripts.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '1 - 3 days',
        whyItWorks: 'Kitsune is worth ~130M-150M. Bundling 4 top-tier items meets the 40% in-game value limit and satisfies Kitsune sellers.'
      }
    ]
  },
  {
    id: 'budget-to-buddha',
    title: 'Budget Grind to Buddha (The 3-Step PvE Essential)',
    subtitle: 'The fastest path to obtain the best grinding fruit in the game without overpaying.',
    startingBudget: 'Ghost / Barrier / Rubber / Love',
    targetFruit: 'Buddha',
    targetFruitId: 'buddha',
    targetEmoji: '🧘‍♂️',
    difficulty: 'Beginner',
    estimatedHours: '1 - 2 Days',
    badge: 'ESSENTIAL FOR SEA 2',
    accentColor: 'from-yellow-400 to-amber-600',
    description: 'Every player entering Sea 2 needs Buddha to survive the 1500-level grind. Here is the guaranteed trade method.',
    steps: [
      {
        stepNumber: 1,
        title: 'Combine Common/Uncommon Drops ➔ Love or Spider',
        giveItems: ['ghost', 'rubber', 'light'],
        receiveItems: ['love'],
        profitEstimate: '+$1.5M Value',
        difficulty: 'Easy',
        strategyTip: 'Light is loved by Sea 1 speedrunners. Trade Light + Ghost to get a solid Legendary trade base like Love or Spider.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '45 mins',
        whyItWorks: 'Love and Spider satisfy the in-game 40% Beli difference requirement for bigger trades.'
      },
      {
        stepNumber: 2,
        title: 'Love + Spider + Add ➔ Sound or Blizzard',
        giveItems: ['love', 'spider'],
        receiveItems: ['blizzard'],
        profitEstimate: '+$3M Value',
        difficulty: 'Medium',
        strategyTip: 'Bundle two mid Legendaries for 1 high-demand Legendary. Blizzard has decent PvP interest.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '1.5 hours',
        whyItWorks: 'Traders with excess Blizzards use them to accumulate add-fodder for larger Mythical deals.'
      },
      {
        stepNumber: 3,
        title: 'Blizzard / Sound + Small Add ➔ BUDDHA 🧘‍♂️',
        giveItems: ['blizzard', 'magma'],
        receiveItems: ['buddha'],
        profitEstimate: '+$4M Value',
        difficulty: 'Medium',
        strategyTip: 'Find players who already have Buddha awakened and are bored of spamming M1s; they often switch to Blizzard for PvP.',
        recommendedLocation: 'Second Sea Café',
        timeEstimate: '2 - 3 hours',
        whyItWorks: 'Buddha has massive utility, but players at max level 2550 often want to trade it away for PvP fruits.'
      }
    ]
  },
  {
    id: 'dragon-rework-speculator',
    title: 'Dragon Rework Speculator Ladder (4 Steps)',
    subtitle: 'Acquire the coveted Dragon Fruit ahead of the monumental Dragon Rework update.',
    startingBudget: '1x Dough or 2x Mid-Mythicals (Spirit + Venom)',
    targetFruit: 'Dragon (East)',
    targetFruitId: 'dragon',
    targetEmoji: '🐉',
    difficulty: 'Expert',
    estimatedHours: '3 - 5 Days',
    badge: 'SPECULATION META',
    accentColor: 'from-red-500 via-orange-500 to-amber-400',
    description: 'Dragon is currently one of the most guarded physical fruits in the game. Here is how to construct an offer they cannot decline.',
    steps: [
      {
        stepNumber: 1,
        title: 'Spirit + Venom ➔ Dough + Add',
        giveItems: ['spirit', 'venom'],
        receiveItems: ['dough'],
        profitEstimate: '+$10M Value',
        difficulty: 'Medium',
        strategyTip: 'Dough is the standard baseline currency. Having physical Dough in your inventory is mandatory for any Dragon deal.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '3 hours',
        whyItWorks: 'Dough has steady liquidity and never loses value.'
      },
      {
        stepNumber: 2,
        title: 'Flip Adds for T-Rex or Mammoth',
        giveItems: ['shadow', 'blizzard', 'buddha'],
        receiveItems: ['t-rex'],
        profitEstimate: '+$8M Value',
        difficulty: 'Hard',
        strategyTip: 'T-Rex has high demand due to its passive dinosaur roar and M1 abilities.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '4 - 6 hours',
        whyItWorks: 'T-Rex + Dough gives you the exact value pairing demanded by high-tier traders.'
      },
      {
        stepNumber: 3,
        title: 'Dough + T-Rex ➔ Leopard + Adds',
        giveItems: ['dough', 't-rex'],
        receiveItems: ['leopard'],
        profitEstimate: '+$15M Value',
        difficulty: 'Hard',
        strategyTip: 'Leopard is required as the core anchor item when negotiating for Dragon.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '1 day',
        whyItWorks: 'Dragon traders will almost never accept an offer without at least 1 Leopard or Kitsune included.'
      },
      {
        stepNumber: 4,
        title: 'Leopard + Dough + T-Rex + Buddha ➔ DRAGON! 🐉',
        giveItems: ['leopard', 'dough', 't-rex', 'buddha'],
        receiveItems: ['dragon'],
        profitEstimate: '+$35M Value',
        difficulty: 'Extreme',
        strategyTip: 'Dragon owners demand overpay due to rework hype. This 4-fruit bundle hits the maximum value ceiling and passes the 40% Beli check.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '2 - 4 days',
        whyItWorks: 'A complete 4-slot high demand bundle gives the Dragon seller instant diverse trading wealth.'
      }
    ]
  },
  {
    id: 'perm-portal-fasttrack',
    title: 'High-Roller: Physicals to Permanent Portal (6 Steps)',
    subtitle: 'How to convert physical fruit drops into permanent fruit gamepasses without Robux.',
    startingBudget: 'Dough + Leopard + Spirit Base',
    targetFruit: 'Permanent Portal',
    targetFruitId: 'perm-portal',
    targetEmoji: '🌌',
    difficulty: 'High Roller',
    estimatedHours: '1 - 2 Weeks',
    badge: 'GAMEPASS GOAL',
    accentColor: 'from-cyan-400 via-indigo-500 to-purple-600',
    description: 'Permanent Portal is universally considered the #1 quality-of-life perm fruit in Blox Fruits for teleporting between islands and sea danger zones.',
    steps: [
      {
        stepNumber: 1,
        title: 'Consolidate Mid-Mythicals into Dough & T-Rex',
        giveItems: ['venom', 'spirit', 'control', 'shadow'],
        receiveItems: ['dough', 't-rex'],
        profitEstimate: '+$20M Value',
        difficulty: 'Hard',
        strategyTip: 'Perm fruit sellers do not want 10 random mid-tier fruits. Clean up your inventory into high-liquidity staples.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '1 - 2 days',
        whyItWorks: 'High density inventory gives you the trade power needed for multi-box negotiations.'
      },
      {
        stepNumber: 2,
        title: 'Trade for First Physical Leopard',
        giveItems: ['dough', 't-rex'],
        receiveItems: ['leopard'],
        profitEstimate: '+$15M Value',
        difficulty: 'Hard',
        strategyTip: 'Keep your Leopard safe in storage and do not consume it.',
        recommendedLocation: 'Third Sea Turtle Mansion',
        timeEstimate: '1 day',
        whyItWorks: 'Leopard is the fundamental currency unit for perm trades.'
      },
      {
        stepNumber: 3,
        title: 'Acquire Second Physical Leopard',
        giveItems: ['dough', 'spirit', 'mammoth', 'buddha'],
        receiveItems: ['leopard'],
        profitEstimate: '+$18M Value',
        difficulty: 'Hard',
        strategyTip: 'You will need Fruit Storage gamepasses or an alternate account to hold multiple Leopards.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '2 - 3 days',
        whyItWorks: 'Holding 2x Leopard allows you to aim directly at Kitsune or Dragon.'
      },
      {
        stepNumber: 4,
        title: '2x Leopard + Adds ➔ Physical Kitsune',
        giveItems: ['leopard', 'leopard', 'dough'],
        receiveItems: ['kitsune'],
        profitEstimate: '+$30M Value',
        difficulty: 'Extreme',
        strategyTip: 'Physical Kitsune is the #1 highest-value single physical item in the game.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '2 - 4 days',
        whyItWorks: 'Kitsune is accepted by every Permanent Fruit seller.'
      },
      {
        stepNumber: 5,
        title: 'Re-acquire a second High-Tier Anchor (Dragon or Leopard)',
        giveItems: ['dough', 'dough', 't-rex', 'spirit'],
        receiveItems: ['dragon'],
        profitEstimate: '+$40M Value',
        difficulty: 'Extreme',
        strategyTip: 'Build your final 4-fruit holy grail bundle: Kitsune + Dragon + Leopard + Dough.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '3 - 5 days',
        whyItWorks: 'Perm Portal (2000 Robux) requires approximately 300M+ trading value.'
      },
      {
        stepNumber: 6,
        title: 'Kitsune + Dragon + Leopard + Dough ➔ PERM PORTAL! 🌌',
        giveItems: ['kitsune', 'dragon', 'leopard', 'dough'],
        receiveItems: ['perm-portal'],
        receivePerm: true,
        profitEstimate: '+$80M Value',
        difficulty: 'Extreme',
        strategyTip: 'Only trade through the in-game trade window with a verified player holding the stored gamepass. Never do trust trades.',
        recommendedLocation: 'Discord Trading / Reddit',
        timeEstimate: '3 - 7 days',
        whyItWorks: 'This 4-fruit package represents the absolute pinnacle of physical wealth, making it irresistible to Robux spenders.'
      }
    ]
  }
];

export const TRADING_HOTSPOTS_TIPS = [
  {
    location: 'Second Sea Café (Kingdom of Rose)',
    tag: 'Best for Beginners & PvE Flips',
    icon: '☕',
    description: 'The most active trading area for players level 700–1500. Ideal for trading Magma, Light, Buddha, Sound, and Portal.',
    hagglingTip: 'Look for players who just arrived from Sea 1 and rolled a mythical they cannot awaken yet.'
  },
  {
    location: 'Third Sea Turtle Mansion',
    tag: 'Best for High-Tier Mythicals',
    icon: '🐢',
    description: 'The luxury trade hub for max-level players. Best place to find physical Dough, Leopard, Kitsune, and Dark Blade offers.',
    hagglingTip: 'Server hop between servers with 10+ players near the Mansion tables during peak evening hours.'
  },
  {
    location: 'Official Blox Fruits Discord & Subreddit',
    tag: 'Best for Speed & Fair Values',
    icon: '💬',
    description: 'Post your trade in format: [H] <Your Fruits> [W] <Target Fruit>. Avoid in-game waiting by arranging deals in advance.',
    hagglingTip: 'Never click external verification links or join suspicious private servers. Real trades happen in standard public servers.'
  },
  {
    location: 'The 40% Beli Balance Rule',
    tag: 'Game Mechanic Knowledge',
    icon: '⚖️',
    description: 'In-game trading requires both sides to have in-game Beli prices within 40% of each other. Keep "Trash Adds" like Spider, Love, or Quake ready to balance the price difference.',
    hagglingTip: 'Always carry 2-3 mid-tier Legendaries specifically to fill trade boxes and meet the 40% requirement.'
  }
];
