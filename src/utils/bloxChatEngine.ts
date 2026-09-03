import { FruitItem, TradeSideItem, formatValueNumber, getEffectiveFruitList, getStoredCustomResponses } from '../data/bloxFruitsData';
import {
  FIGHTING_STYLES,
  ACCESSORIES_DATA,
  RACES_DATA,
  COMBO_PRESETS,
  SEA_PROGRESSION,
  RAIDS_DATA,
  FightingStyle,
  Accessory,
  RaceInfo,
  ComboPreset,
  SeaLocation,
  RaidInfo
} from '../data/bloxExtraData';
import { ALL_OBTAINMENT_DATA, ItemObtainmentGuide } from '../data/bloxObtainmentData';
import { BLOX_MASTER_FAQ, RACE_V4_GEAR_DATA, FaqQuestionEntry, RaceV4GearGuide } from '../data/bloxMasterFaqData';

export interface ChatAnswer {
  headline: string;
  response: string;
  tags?: string[];
  suggestedFollowUps?: string[];
}

// Curated Bank of Blox Fruits, Gaming, Tech, and Clever Humor Jokes
const JOKES_BANK = [
  {
    joke: "Why do Dough fruit users never get invited to dinner parties?\n\n*Because as soon as they walk in, they start rolling around and trapping everyone in a 30-minute inescapable combo!*",
    tag: "Blox Fruits PvP"
  },
  {
    joke: "What happens when a Buddha user enters a normal-sized doorway?\n\n*Nobody knows. They're still stuck pressing Z and spamming Sharkman Karate M1 on the ceiling.*",
    tag: "Buddha Life"
  },
  {
    joke: "Why did the pirate refuse to eat a Devil Fruit before going swimming?\n\n*Because swimming with an active fruit isn't a sport—it's an express ticket to the respawn screen at Starter Island!*",
    tag: "Pirate Logic"
  },
  {
    joke: "How do Kitsune users say goodbye?\n\n*They don't. They just dash across the ocean at Mach 4 before you even finish typing 'gg'.*",
    tag: "Speed Demon"
  },
  {
    joke: "Why did the trader cry at the Cafe trading table?\n\n*Because they offered Rocket and Spin for a Permanent Dragon, and the 40% Beli rule slapped them back to the First Sea!*",
    tag: "Trade Comedy"
  },
  {
    joke: "Why do programmers prefer dark mode?\n\n*Because light attracts bugs! (And in Blox Fruits, bugs launch you 50,000 studs into the stratosphere).*",
    tag: "Tech & Gaming"
  },
  {
    joke: "What is a Portal user's favorite vacation spot?\n\n*Anywhere except the PvP arena when their dimensional rift is on cooldown!*",
    tag: "Portal Mains"
  },
  {
    joke: "Why did the skeleton in Haunted Castle play the Soul Guitar?\n\n*Because he had no body to play with!*",
    tag: "Soul Guitar"
  },
  {
    joke: "How many bounty hunters does it take to change a lightbulb?\n\n*None. They just wait in the dark until someone turns on Instinct V2, then jump them with Godhuman C!*",
    tag: "Bounty Hunters"
  },
  {
    joke: "Why was the Leviathan Heart so hard to catch?\n\n*Because the driver forgot to craft the Beast Hunter harpoon and tried to fish with a wooden dinghy!*",
    tag: "Sea Danger 6"
  },
  {
    joke: "What did the Ancient One say to the Mink player?\n\n*'Slow down! You've completed 5 trials before the other players even found the lever!'*",
    tag: "Race V4"
  },
  {
    joke: "Why did the computer go to the doctor?\n\n*It had a virus, two missing semicolons, and its GPU was overheating from running max graphics with 10 Dragon users in one server!*",
    tag: "Tech Humor"
  },
  {
    joke: "What's the difference between a rookie pirate and an expert trader?\n\n*The rookie asks 'Can I offer chop?', while the expert has 4 Perm Dragons locked in their vault and still asks for adds.*",
    tag: "Trading Memes"
  }
];

// Curated Bank of Fun Facts & Trivia
const FUN_FACTS = [
  "Did you know? In Blox Fruits, Buddha's awakened Z transformation makes your melee hitbox reach up to 800% larger, making it possible to hit enemies from across a courtyard without moving!",
  "Fun Fact: If you hold a Monster Magnet in Sea Danger 6, the summoned 195,000 HP Terrorshark has an anchor physically modeled into its tail and guarantees a 100% Shark Anchor drop rate upon defeat.",
  "Gaming Trivia: The fastest recorded speed travel in Blox Fruits is Kitsune transformed with Mink V4 and Pilot Helmet, allowing you to run across the entire ocean between islands faster than luxury boats!",
  "Tech Fact: Quantum computers don't just use 0s and 1s; their qubits can exist in a superposition of both simultaneously, meaning one day AI could calculate 10 billion trade combos in a fraction of a millisecond.",
  "Lore Fact: The Cursed Dual Katana (CDK) combines Tushita (pure heavenly speed) and Yama (hellfire soul drain). Speaking to the Crypt Master tests both good deeds and demonic endurance."
];

// Curated Bank of Riddles
const RIDDLES = [
  {
    question: "I am light as a feather, yet the strongest pirate in Blox Fruits cannot hold me for more than 5 minutes. What am I?",
    answer: "Your breath (underwater without Shark race)!"
  },
  {
    question: "I have no flesh, no feathers, and no scales, but I can summon lightning, freeze oceans, and summon dragons. What am I?",
    answer: "A Blox Fruit!"
  },
  {
    question: "The more of me you gain in PvP, the more everyone wants to hunt you down. What am I?",
    answer: "Bounty & Honor!"
  }
];

/**
 * Universal NLP & Conversational Grandmaster Engine
 * Understands:
 * - Simple greetings (hi, hello, sup, wsp, yo, etc.)
 * - Humor, jokes, memes, comedy
 * - All-rounder questions (math, general wisdom, coding, life, trivia, riddles)
 * - 33 Master FAQ Knowledge & Mechanics Categories
 * - Complete Race V4 Gear Breakdown (All 6 Races, Tiers 1-5)
 * - Obtainment Explorer (40+ items: Event Items, Mythical Swords, Guns, Accessories, Bosses)
 * - Sea Progression Guide (All islands, level requirements, bosses, Sea 1-3)
 * - Fighting Styles (All 11 styles, masteries, trainers, materials)
 * - Accessories & Raids
 * - Combos & Build Crafter
 * - Trade Calculator & Live Values (Values, demands, 40% Beli rule, Dog Blade, custom injected items)
 */
/**
 * Executes all strict internal rule engines, math, easter eggs, jokes, dev recognition,
 * Mutation Lab calculations, V4 gears, obtainments, raids, fighting styles, and fruit values.
 * Returns the exact authoritative answer string if matched, or null if no rule/data matched.
 */
export function getHardcodedBloxFruitsResponse(
  userQuery: string,
  tradeContext?: {
    yourItems: TradeSideItem[];
    theirItems: TradeSideItem[];
  }
): string | null {
  const rawQuery = userQuery.trim();
  const query = rawQuery.toLowerCase();
  const allItems = getEffectiveFruitList();

  if (!query) {
    return `👋 **Ahoy! I am Solas AI Sensei.**\nI'm your all-rounder digital companion & Blox Fruits Grandmaster. Ask me anything about game secrets, trade evaluations, jokes, trivia, or general chat!`;
  }

  // 0. Secret Easter Egg Triggers (Zero Interference)
  const secretResponse = detectAndHandleSecretTriggers(query, rawQuery);
  if (secretResponse) {
    return secretResponse;
  }

  // 0.5. Owner Panel Custom Responses (Dynamic custom responses added by owner)
  const customOwnerReply = detectAndHandleOwnerCustomResponses(query, rawQuery);
  if (customOwnerReply) {
    return customOwnerReply;
  }

  // 1. Developer / Nolan / 1_solas Recognition (Always top priority, never overridden by wiki)
  const devResponse = detectAndHandleDeveloperQuery(query);
  if (devResponse) {
    return devResponse;
  }

  // 2. Simple Greetings & Catchphrases (hi, hello, sup, wsp, yo, etc.)
  const greetingResponse = detectAndHandleGreetings(query);
  if (greetingResponse) {
    return greetingResponse;
  }

  // 3. Jokes, Humor & Entertainment (tell me a joke, funny, roast, etc.)
  const jokeResponse = detectAndHandleJokes(query);
  if (jokeResponse) {
    return jokeResponse;
  }

  // 4. Mutation Lab, Hybrid Fusion & Fall Risk Queries (Proprietary App sandbox)
  const mutationResponse = detectAndHandleMutationLabQueries(query);
  if (mutationResponse) {
    return mutationResponse;
  }

  // 5. All-Rounder Capabilities (Math, Riddles, Fun Facts, Motivation, General Chat)
  const generalResponse = detectAndHandleGeneralConversations(query);
  if (generalResponse) {
    return generalResponse;
  }

  // 5.5 Universal NLP Trade, Value & Combined Value Resolver (Multilingual NLP Engine)
  const universalTradeReply = detectAndHandleUniversalTradeQuery(query, allItems);
  if (universalTradeReply) {
    return universalTradeReply;
  }

  // 6. Check if user is asking about active trade on calculator
  if (
    (query.includes('this trade') || query.includes('my trade') || query.includes('current trade') || query.includes('evaluate trade') || query.includes('is this good') || query.includes('should i accept')) &&
    tradeContext &&
    (tradeContext.yourItems.length > 0 || tradeContext.theirItems.length > 0)
  ) {
    return evaluateCurrentTradeContext(tradeContext.yourItems, tradeContext.theirItems);
  }

  // 7. Race V4 Gear & Specific Race Awakening Gear Explanations
  const matchedRaceGear = findMatchingRaceGearGuide(query);
  if (matchedRaceGear) {
    return formatRaceGearResponse(matchedRaceGear);
  }

  // 8. High-Priority Semantic FAQ Match (33 Categories)
  const matchedFaq = findMatchingFaqEntry(query);
  if (matchedFaq) {
    return formatFaqResponse(matchedFaq);
  }

  // 9. Exhaustive Obtainment Database (Swords, Guns, Event Items, Accessories, Materials, Fighting Styles)
  const matchedObtainment = findMatchingObtainmentGuide(query);
  if (matchedObtainment) {
    return formatObtainmentResponse(matchedObtainment);
  }

  // 10. Sea Progression & Specific Island Queries
  const matchedIsland = findMatchingSeaLocation(query);
  if (matchedIsland) {
    return formatSeaLocationResponse(matchedIsland);
  }

  // 11. Fighting Styles Queries
  const matchedStyle = findMatchingFightingStyle(query);
  if (matchedStyle) {
    return formatFightingStyleResponse(matchedStyle);
  }

  // 12. Accessory Queries
  const matchedAccessory = findMatchingAccessory(query);
  if (matchedAccessory) {
    return formatAccessoryResponse(matchedAccessory);
  }

  // 13. Raid & Awakening Queries
  const matchedRaid = findMatchingRaid(query);
  if (matchedRaid) {
    return formatRaidResponse(matchedRaid);
  }

  // 14. Combo & Build Crafter Queries
  const matchedCombo = findMatchingCombo(query);
  if (matchedCombo) {
    return formatComboResponse(matchedCombo);
  }

  // 15. General Fruit / Sword / Gamepass Database Match (Values, Demand, Meta)
  const matchedFruit = findMatchingFruitItem(query, allItems);
  if (matchedFruit) {
    return formatFruitItemResponse(matchedFruit, query);
  }

  // 16. Thematic Fallback Synthesis Engines (Covers broad questions)
  const thematicResponse = generateThematicSynthesisResponse(query);
  if (thematicResponse) {
    return thematicResponse;
  }

  // 17. Fuzzy Multi-Token Scorer across all datasets as safety net
  const bestScoredAnswer = performDeepDatasetFuzzySearch(query, allItems);
  if (bestScoredAnswer) {
    return bestScoredAnswer;
  }

  return null;
}

/**
 * Universal NLP & Conversational Grandmaster Engine
 * Evaluates internal hardcoded logic first, and falls back to randomized intelligent responses.
 */
export function generateLocalOracleResponse(
  userQuery: string,
  tradeContext?: {
    yourItems: TradeSideItem[];
    theirItems: TradeSideItem[];
  }
): string {
  const hardcodedMatch = getHardcodedBloxFruitsResponse(userQuery, tradeContext);
  if (hardcodedMatch) {
    return hardcodedMatch;
  }

  return generateIntelligentBloxFruitsFallback(userQuery);
}

/**
 * Secret Easter Egg Triggers
 * - AD -> forever vice captain 🟢
 * - faith -> nolan’s son
 * - mun -> hail tenxiku
 * - apple -> bsf forever
 * - soul -> ghost!
 */
function detectAndHandleSecretTriggers(query: string, rawQuery: string): string | null {
  const clean = query.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. AD -> forever vice captain 🟢
  if (clean === 'ad' || clean === 'vice captain ad' || clean === 'ad vice captain') {
    return 'forever vice captain 🟢';
  }

  // 2. faith -> nolan’s son
  if (clean === 'faith' || clean === 'faith nolan' || clean === 'nolans son faith') {
    return "nolan’s son";
  }

  // 3. mun -> hail tenxiku
  if (clean === 'mun' || clean === 'mun tenxiku' || clean === 'hail tenxiku mun') {
    return 'hail tenxiku';
  }

  // 4. apple -> bsf forever
  if (clean === 'apple' || clean === 'apple bsf' || clean === 'bsf apple') {
    return 'bsf forever';
  }

  // 5. soul -> ghost!
  if (clean === 'soul' || clean === 'soul fruit' || clean === 'what is soul') {
    return 'ghost!';
  }

  // Standalone word boundary matches for short/direct queries
  if (/\bad\b/i.test(rawQuery) && (clean.length <= 15 || clean.includes('secret') || clean.includes('who is ad') || clean.includes('write ad'))) {
    return 'forever vice captain 🟢';
  }

  if (/\bfaith\b/i.test(rawQuery) && (clean.length <= 20 || clean.includes('secret') || clean.includes('who is faith') || clean.includes('write faith'))) {
    return "nolan’s son";
  }

  if (/\bmun\b/i.test(rawQuery) && (clean.length <= 20 || clean.includes('secret') || clean.includes('who is mun') || clean.includes('write mun'))) {
    return 'hail tenxiku';
  }

  if (/\bapple\b/i.test(rawQuery) && (clean.length <= 20 || clean.includes('secret') || clean.includes('write apple'))) {
    return 'bsf forever';
  }

  if (/\bsoul\b/i.test(rawQuery) && !clean.includes('guitar') && (clean.length <= 20 || clean.includes('secret') || clean.includes('write soul'))) {
    return 'ghost!';
  }

  return null;
}

/**
 * Dynamic Owner Custom Responses Evaluation
 * Matches any custom trigger keyword/phrase added via the Owner Panel.
 */
function detectAndHandleOwnerCustomResponses(query: string, rawQuery: string): string | null {
  const customList = getStoredCustomResponses();
  if (!customList || customList.length === 0) return null;

  const clean = query.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').replace(/\s+/g, ' ').trim();
  const rawLower = rawQuery.toLowerCase().trim();

  for (const entry of customList) {
    if (!entry.enabled) continue;
    const triggerRaw = (entry.trigger || '').trim();
    if (!triggerRaw) continue;

    const triggerLower = triggerRaw.toLowerCase();
    const cleanTrigger = triggerLower.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').replace(/\s+/g, ' ').trim();

    // 1. Direct or clean exact match
    if (rawLower === triggerLower || clean === cleanTrigger) {
      return entry.response;
    }

    // 2. Contains trigger match
    if (cleanTrigger.length >= 2) {
      if (clean === cleanTrigger || clean.split(' ').includes(cleanTrigger) || rawLower.includes(triggerLower)) {
        return entry.response;
      }
    }
  }

  return null;
}

/**
 * 1. Developer Recognition & Creator Tribute (Nolan / 1_solas)
 * Handles all inquiries about the developer of the AI and the website with high praise and respect.
 */
function detectAndHandleDeveloperQuery(query: string): string | null {
  const clean = query.toLowerCase().replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').replace(/\s+/g, ' ').trim();

  const isDevQuery =
    clean.includes('nolan') ||
    clean.includes('solas') ||
    clean.includes('1_solas') ||
    clean.includes('1 solas') ||
    clean.includes('developer') ||
    clean.includes('creator') ||
    clean.includes('who made') ||
    clean.includes('who built') ||
    clean.includes('who coded') ||
    clean.includes('who created') ||
    clean.includes('who programmed') ||
    clean.includes('who designed') ||
    clean.includes('author') ||
    clean.includes('founder') ||
    clean.includes('credits');

  if (!isDevQuery) {
    return null;
  }

  // Nolan specific inquiries
  if (clean.includes('nolan')) {
    return `👑 **Meet Nolan (1_solas) — The Mastermind Developer & Creator!** ⚡\n\n` +
      `**Nolan** is the brilliant developer, software engineer, and creative visionary who built both **me (Solas AI)** and this entire **Blox Fruits Web Platform & Mutation Lab** from the ground up!\n\n` +
      `🌟 **Why Nolan is a legendary developer:**\n` +
      `• 🧠 **Engineered the AI Brain:** Nolan handcrafted my entire neural reasoning matrix, live trade evaluation logic, and real-time database so you always have the sharpest pirate wingman on the high seas.\n` +
      `• 🧬 **Pioneered the Fruit Mutation Lab:** He envisioned and programmed the exclusive hybrid mutation sandbox, catalyst gachas, and dynamic fall-risk formulas to give players a completely unique gaming experience.\n` +
      `• 💎 **Community Champion:** Built with relentless passion for the Blox Fruits and gaming community—ensuring 100% free access, lightning performance, and zero paywalls.\n\n` +
      `A true master of modern code, high gaming IQ, and unmatched dedication. Huge respect to Nolan for creating this entire world! 🏆`;
  }

  // Solas / 1_solas / General Creator inquiries
  return `👑 **Meet 1_solas (Nolan) — Lead Developer & Creator!** ⚡\n\n` +
    `**Nolan (1_solas)** is the mastermind developer and software architect who coded both **Solas AI** and this entire web application!\n\n` +
    `✨ **About the Creator:**\n` +
    `• 💻 **Full-Stack Master:** Architected the live trade evaluation matrix, 2026 update databases, real-time Discord integration, and smart combat builds.\n` +
    `• 🎮 **Gamer & Innovator:** Invented the Fruit Mutation Lab, hybrid fusion mechanics, and interactive sandboxes to take Blox Fruits strategy to another level.\n` +
    `• 🛡️ **Passionate Builder:** Dedicated to building the cleanest, most responsive, and powerful tools for players across all three seas.\n\n` +
    `Whenever you use this platform, you're experiencing Nolan's craft, vision, and hard work. Absolute W developer! ⚓`;
}

/**
 * 2. Greetings & Catchphrases Engine with Natural Personality & Freedom
 */
function detectAndHandleGreetings(query: string): string | null {
  const clean = query.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = clean.split(' ');

  // Gen Z & Casual Slang matches ("sup wbu", "wsp wbu", "wyd", "wsg", "nm u", "fr", "no cap", etc.)
  if (
    clean.includes('wbu') ||
    clean.includes('wyd') ||
    clean.includes('nm u') ||
    clean.includes('not much') ||
    clean.includes('what you up to') ||
    clean.includes('what are you up to') ||
    clean === 'sup' ||
    clean === 'wsp' ||
    clean === 'wsg' ||
    clean === 'sup wbu' ||
    clean === 'wsp wbu' ||
    clean.includes('no cap') ||
    clean.includes('fr') ||
    clean.includes('ong') ||
    clean.includes('chat is this real') ||
    clean.includes('cooked')
  ) {
    if (clean.includes('cooked')) {
      return `Nah we ain't cooked yet, we got full Haki and max stats. We securing the W today fr. No cap! 🔥`;
    }
    if (clean.includes('chat is this real')) {
      return `Bro it's 100% real, no cap 💀. We're locked in and fully synced up.`;
    }
    const genZReplies = [
      `Yo! Not much, just chilling in Third Sea watching people try to trade Rocket for Dragon. Wbu, what are you up to rn? 🌊`,
      `Chillin', checking out live trade values and avoiding bounty hunters. Hbu, how's your day going? ⚡`,
      `Not much fr, just locked in and ready for whatever. What are we vibing to today? 👑`,
      `Just hanging out in the Cafe, keeping the Haki core at 100%. What's good with you? 🔥`,
      `Sup! Just analyzing some wild trade offers and drinking virtual coffee. Wbu, you grinding or just chilling? ☕`
    ];
    return genZReplies[Math.floor(Math.random() * genZReplies.length)];
  }

  const isGreetingWord = (w: string) => [
    'hi', 'hello', 'hey', 'sup', 'wsp', 'wsg', 'yo', 'wassup', 'wazzup', 
    'howdy', 'hola', 'greetings', 'aloha', 'hiya', 'salut', 'konichiwa'
  ].includes(w);

  const exactGreetings = [
    'hi', 'hello', 'hey', 'sup', 'wsp', 'wsg', 'yo', 'wassup', 'wazzup', 'howdy',
    'good morning', 'good afternoon', 'good evening', 'good night', 'gm', 'gn',
    'what\'s up', 'whats up', 'what is up', 'how are you', 'how are u', 'how r u',
    'who are you', 'who are u', 'who r u', 'what can you do', 'what do you do',
    'how\'s it going', 'hows it going', 'what\'s good', 'whats good', 'hey there',
    'hello there', 'hey sensei', 'hey solas', 'yo solas', 'sup bro', 'wsp man', 'hi solas'
  ];

  const matchesExact = exactGreetings.includes(clean);
  const startsWithGreeting = words.length <= 4 && isGreetingWord(words[0]);

  if (!matchesExact && !startsWithGreeting) {
    return null;
  }

  // Specific "How are you"
  if (clean.includes('how are') || clean.includes('how r u') || clean.includes('hows it going') || clean.includes('how\'s it going')) {
    const howAreYouReplies = [
      `⚡ **Feeling unstoppable and ready for action!**\n\nMy Haki sensors are buzzing, trade matrices are primed, and I'm ready to evaluate whatever crazy trades or questions you've got.\n\nHow's the pirate grind treating you today, captain?`,
      `🌊 **Cruising smoothly across the Third Sea!**\n\nValues are synced, server ping is zero, and the coffee is strong. What adventures are we tackling today?`,
      `🔥 **Fired up and running at peak performance!**\n\nReady to calculate profits, test insane fruit fusions in the lab, or share a laugh. What's on your mind?`
    ];
    return howAreYouReplies[Math.floor(Math.random() * howAreYouReplies.length)];
  }

  // Specific "Who are you"
  if (clean.includes('who are you') || clean.includes('who are u') || clean.includes('who r u')) {
    return `☀️ **I am Solas AI Sensei!**\n\n` +
      `I'm your all-rounder digital companion, Blox Fruits Grandmaster, and tactical trade referee built by **Nolan (1_solas)**.\n\n` +
      `Whether you want to calculate trade equity, research Godhuman obtainment, test wild fruit mutations, hear a roast, solve math, or just chat—I've got your back! 🏴‍☠️`;
  }

  // Dynamic casual greetings with personality & freedom
  const intros = [
    `Yo! Wsp captain! Ready to dominate the seas today? 🏴‍☠️`,
    `Ahoy there! Solas AI is locked in and ready for duty! ⚡`,
    `Sup! Great to see you back on deck. What are we cooking up today? 🌊`,
    `Hey there! Hope the fruit gacha RNG is treating you well today! 👑`,
    `Greetings, captain! Solas AI reporting in—what's on your mind? ☀️`
  ];

  return intros[Math.floor(Math.random() * intros.length)];
}

/**
 * 2. Jokes & Humor Engine
 */
function detectAndHandleJokes(query: string): string | null {
  const clean = query.toLowerCase();

  const isJokeRequest = 
    clean.includes('joke') || 
    clean.includes('tell me a joke') || 
    clean.includes('make me laugh') || 
    clean.includes('say something funny') || 
    clean.includes('humor') || 
    clean.includes('funny') || 
    clean.includes('pun') || 
    clean.includes('crack a joke') || 
    clean.includes('roast me') ||
    clean.includes('meme');

  if (!isJokeRequest) {
    return null;
  }

  // Special "Roast me" response
  if (clean.includes('roast me')) {
    const roasts = [
      `🔥 **Sensei Roast Protocol:**\n\n*You look like the type of player who accidentally eats a Chop fruit while holding a physical Kitsune in Third Sea Cafe.* 😂`,
      `🔥 **Sensei Roast Protocol:**\n\n*Your combo execution is so slow that the target's Ken Haki regenerates between your moves!* 💀`,
      `🔥 **Sensei Roast Protocol:**\n\n*You offer Gravity and Barrier for a Perm Dragon and then complain about the 40% in-game Beli rule!* 😭`,
      `🔥 **Sensei Roast Protocol:**\n\n*You're still searching for Mirage Island on Sea 1 with a starter rowboat!* 🚣`
    ];
    return roasts[Math.floor(Math.random() * roasts.length)] + `\n\n*(All in good humor, captain! Ask me for a joke or game strategy anytime!)*`;
  }

  // Select a random curated joke
  const selected = JOKES_BANK[Math.floor(Math.random() * JOKES_BANK.length)];

  return `🎭 **[Humor Deck • ${selected.tag}]**\n\n` +
    `${selected.joke}\n\n` +
    `😂 *Want another one? Just say **"another joke"** or ask me anything else!*`;
}

/**
 * 3. All-Rounder General Conversational & Tool Engine
 */
function detectAndHandleGeneralConversations(query: string): string | null {
  const clean = query.toLowerCase().trim();

  // A. Compliments & Gratitude
  if (
    clean.includes('thank') || 
    clean === 'ty' || 
    clean === 'thx' || 
    clean.includes('thanks') || 
    clean.includes('you are the best') || 
    clean.includes('you\'re the best') || 
    clean.includes('good ai') || 
    clean.includes('good bot') || 
    clean.includes('love you') || 
    clean.includes('you are awesome') || 
    clean.includes('you are cool')
  ) {
    const thanksReplies = [
      `🙌 **You're very welcome!** Always here to help you conquer the seas and master every mechanic.`,
      `👑 **Appreciate you, captain!** Let me know whatever else you need—trades, combos, or jokes.`,
      `⚡ **Anytime!** Solas AI never sleeps. Keep dominating!`,
      `❤️ **Much respect!** May your next fruit gacha roll be a Mythical Kitsune!`
    ];
    return thanksReplies[Math.floor(Math.random() * thanksReplies.length)];
  }

  // B. Farewells
  if (
    clean === 'bye' || 
    clean === 'goodbye' || 
    clean === 'cya' || 
    clean === 'see ya' || 
    clean === 'gn' || 
    clean === 'good night' || 
    clean === 'peace' || 
    clean === 'peace out' || 
    clean === 'gtg'
  ) {
    return `👋 **Fair winds, captain!**\n\nLog out safe, protect your bounty, and come back anytime you need trade evaluations, raid strategies, or good laughs. Have an awesome day! ⚓`;
  }

  // C. Math & Calculation Parser
  const mathMatch = clean.match(/^(?:what is|calculate|solve|how much is)?\s*(\d+(?:\.\d+)?)\s*([\+\-\*\/xX\^%]|percent of|% of)\s*(\d+(?:\.\d+)?)\s*\??$/);
  if (mathMatch) {
    const n1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const n2 = parseFloat(mathMatch[3]);
    let result = 0;

    if (op === '+' || op === 'plus') result = n1 + n2;
    else if (op === '-' || op === 'minus') result = n1 - n2;
    else if (op === '*' || op === 'x' || op === 'X' || op === 'times') result = n1 * n2;
    else if (op === '/' || op === 'divided by') result = n2 !== 0 ? n1 / n2 : NaN;
    else if (op === '%' || op === 'percent of' || op === '% of') result = (n1 / 100) * n2;
    else if (op === '^') result = Math.pow(n1, n2);

    if (!isNaN(result)) {
      return `🧮 **Quick Math Calculation:**\n\n` +
        `• **Equation:** ${n1} ${op} ${n2}\n` +
        `• **Result:** **${result.toLocaleString()}**\n\n` +
        `Need any other calculations, percentage splits, or Beli trade math? Just ask!`;
    }
  }

  // D. Motivation & Mood Booster
  if (
    clean.includes('i\'m bored') || 
    clean.includes('im bored') || 
    clean.includes('motivate me') || 
    clean.includes('cheer me up') || 
    clean.includes('bad day') || 
    clean.includes('give me advice')
  ) {
    return `🌟 **Sensei Motivation & Wisdom:**\n\n` +
      `*"Every Grandmaster in the Third Sea once started on Starter Island getting beaten up by bandits with 0 mastery."*\n\n` +
      `Whether you're grinding levels, waiting for Mirage Island, or dealing with life's boss fights—stay consistent, take a deep breath, and remember that progress happens one step at a time.\n\n` +
      `💡 **Fun things to try right now:**\n` +
      `1. Spin the **Fruit Mutation Lab Gacha** at the bottom of our menu for crazy hybrid combos!\n` +
      `2. Test out a new one-shot combo sequence in the **PvP Builds** tab.\n` +
      `3. Ask me to tell you a hilarious joke (*"tell me a joke"*)!`;
  }

  // E. Fun Facts & Trivia
  if (clean.includes('fun fact') || clean.includes('trivia') || clean.includes('random fact') || clean.includes('did you know')) {
    const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    return `🧠 **[Fun Fact & Trivia]**\n\n${fact}\n\n*Want another one? Just ask for "another fun fact"!*`;
  }

  // F. Riddles
  if (clean.includes('riddle') || clean.includes('puzzle me')) {
    const r = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
    return `🧩 **[Sensei Riddle Time]**\n\n` +
      `**Riddle:** ${r.question}\n\n` +
      `||**Answer:** ${r.answer}||\n\n` +
      `*(Highlight or tap the spoiler above to reveal the answer!)*`;
  }

  // G. General Coding / Tech Support
  if (clean.includes('how to code') || clean.includes('what is an api') || clean.includes('programming') || clean.includes('javascript') || clean.includes('python')) {
    return `💻 **Tech & Coding Insights:**\n\n` +
      `I'm fluent in coding, software architecture, and game development logic!\n\n` +
      `• **What is an API?** An API (Application Programming Interface) is like a restaurant menu—it lets your app order data from a server (like live wiki stats or auth tokens) and delivers it cleanly.\n` +
      `• **Want code examples?** Ask me how to write functions in Python, JavaScript, TypeScript, or game loops in Roblox Luau!\n\n` +
      `What technical topic would you like to explore?`;
  }

  return null;
}

/**
 * Searches the Race V4 Gear Guide dataset
 */
function findMatchingRaceGearGuide(query: string): RaceV4GearGuide | null {
  const clean = query.toLowerCase();
  const hasGearWord = clean.includes('gear') || clean.includes('tier') || clean.includes('branch') || clean.includes('ancient one') || clean.includes('v4') || clean.includes('trial') || clean.includes('awaken');

  if ((clean.includes('cyborg') || clean.includes('machine') || clean.includes('robot')) && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'cyborg') || null;
  }
  if ((clean.includes('shark') || clean.includes('fishman') || clean.includes('water')) && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'shark') || null;
  }
  if ((clean.includes('angel') || clean.includes('skypiean') || clean.includes('sky') || clean.includes('wings') || clean.includes('heaven')) && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'angel') || null;
  }
  if (clean.includes('human') && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'human') || null;
  }
  if ((clean.includes('ghoul') || clean.includes('undead') || clean.includes('lifesteal')) && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'ghoul') || null;
  }
  if ((clean.includes('mink') || clean.includes('rabbit') || clean.includes('speed') || clean.includes('electro')) && hasGearWord) {
    return RACE_V4_GEAR_DATA.find((r) => r.raceId === 'mink') || null;
  }

  return null;
}

/**
 * Formats a comprehensive Race V4 Gear breakdown response
 */
function formatRaceGearResponse(guide: RaceV4GearGuide): string {
  return `⚙️ **${guide.raceName} Race V4 Complete Gear Breakdown & Explanations:**\n\n` +
    `🏛️ **Trial Info:** ${guide.trialName}\n` +
    `🎯 **Trial Objective:** ${guide.trialObjective}\n\n` +
    `**Gear Progression & Tier Branches:**\n` +
    `• 🔘 **${guide.gear1.name}:**\n` +
    `  - *Cost:* ${guide.gear1.costFrags.toLocaleString()} Fragments | *Trainings Required:* ${guide.gear1.trainingSessions}\n` +
    `  - *Effect:* ${guide.gear1.description}\n\n` +
    `• 🔵 **${guide.gear2.name}:**\n` +
    `  - *Cost:* ${guide.gear2.costFrags.toLocaleString()} Fragments | *Trainings Required:* ${guide.gear2.trainingSessions}\n` +
    `  - *Branch A:* ${guide.gear2.tierOptions.branchA}\n` +
    `  - *Branch B:* ${guide.gear2.tierOptions.branchB}\n` +
    `  - *Explanation:* ${guide.gear2.description}\n\n` +
    `• 🟣 **${guide.gear3.name}:**\n` +
    `  - *Cost:* ${guide.gear3.costFrags.toLocaleString()} Fragments | *Trainings Required:* ${guide.gear3.trainingSessions}\n` +
    `  - *Branch A:* ${guide.gear3.tierOptions.branchA}\n` +
    `  - *Branch B:* ${guide.gear3.tierOptions.branchB}\n` +
    `  - *Explanation:* ${guide.gear3.description}\n\n` +
    `• 🔴 **${guide.gear4.name}:**\n` +
    `  - *Cost:* ${guide.gear4.costFrags.toLocaleString()} Fragments | *Trainings Required:* ${guide.gear4.trainingSessions}\n` +
    `  - *Branch A:* ${guide.gear4.tierOptions.branchA}\n` +
    `  - *Branch B:* ${guide.gear4.tierOptions.branchB}\n` +
    `  - *Explanation:* ${guide.gear4.description}\n\n` +
    `• 👑 **${guide.gear5.name}:**\n` +
    `  - *Cost:* ${guide.gear5.costFrags.toLocaleString()} Fragments | *Trainings Required:* ${guide.gear5.trainingSessions}\n` +
    `  - *Effect:* ${guide.gear5.description}\n\n` +
    `⚔️ **PvP Rating:** ${guide.metaPvPVerdict}\n` +
    `🌾 **Grinding Rating:** ${guide.metaGrindVerdict}\n\n` +
    `💡 *Sensei Tip:* You can swap your active Tier branches anytime for free by talking to the **Ancient One** in the Temple of Time after completing training sessions!`;
}

/**
 * Searches the 33 FAQ categories with high-precision matching
 */
function findMatchingFaqEntry(query: string): FaqQuestionEntry | null {
  const clean = query.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
  const rawClean = query.toLowerCase().trim();

  // 1. Direct question or alias exact match
  for (const entry of BLOX_MASTER_FAQ) {
    const entryQClean = entry.question.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
    if (clean === entryQClean || (clean.length > 15 && clean.includes(entryQClean))) {
      return entry;
    }
    for (const alias of entry.aliases) {
      const aliasClean = alias.replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
      if (clean === aliasClean || (clean.length > 12 && clean.includes(aliasClean))) {
        return entry;
      }
    }
  }

  // 2. Specific key mechanics routing (Strict multi-word phrases)
  if (clean.includes('elemental immunity') || clean.includes('logia immunity') || (clean.includes('elemental') && clean.includes('taking damage'))) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-elemental-immunity') || null;
  }
  if (clean.includes('30 million bounty') || clean.includes('30m bounty') || clean.includes('bounty damage buff') || clean.includes('honor damage buff')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-bounty-honor-buffs') || null;
  }
  if (clean.includes('600 mastery') || clean.includes('mastery damage curve') || clean.includes('max fruit mastery')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-fruit-mastery-curve') || null;
  }
  if (clean.includes('server hop lockout') || (clean.includes('server hop') && clean.includes('boss'))) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-server-hopping-lockouts') || null;
  }
  if (clean.includes('fruit despawn') || clean.includes('how long until fruit despawn') || clean.includes('dropped fruit despawn')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-despawn-protection') || null;
  }
  if (clean.includes('mirage moon not glowing') || clean.includes('moon glow glitch') || clean.includes('look at moon mirage')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-mirage-moon-glitch') || null;
  }
  if (clean.includes('fruit storage threshold') || clean.includes('how many fruit storage') || clean.includes('stack fruit storage')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-robux-storage-thresholds') || null;
  }
  if (clean.includes('40 percent rule') || clean.includes('40% rule') || clean.includes('trading difference is too high') || clean.includes('value gap locked')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-value-gap-lock') || null;
  }
  if (clean.includes('sea danger level') || clean.includes('sea events spawn faster') || clean.includes('danger level 6')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-sea-danger-scaling') || null;
  }
  if (clean.includes('shipwright xp cap') || clean.includes('shipwright capped') || clean.includes('how to level shipwright')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-subclass-xp-caps') || null;
  }
  if (clean.includes('colosseum code') || clean.includes('bartilo colosseum') || clean.includes('swan glasses colosseum')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-colosseum-code-lockout') || null;
  }
  if ((clean.includes('hungry man') && clean.includes('apple')) || clean.includes('instinct v2 apple location') || clean.includes('fruit bowl quest')) {
    return BLOX_MASTER_FAQ.find((e) => e.id === 'mech-instinct-v2-apple-spawns') || null;
  }

  return null;
}

/**
 * Formats a FaqQuestionEntry into a rich, structured answer
 */
function formatFaqResponse(entry: FaqQuestionEntry): string {
  let res = `🧠 **[Category ${entry.categoryNumber}: ${entry.categoryName}]**\n\n` +
    `❓ **Question:** ${entry.question}\n\n` +
    `${entry.fullAnswer}`;

  if (entry.gearExplanation) {
    res += `\n\n⚙️ **Gear Breakdown & Upgrade System:**\n${entry.gearExplanation}`;
  }

  if (entry.location || entry.npc || entry.cost || entry.prerequisites) {
    res += `\n\n📋 **Quick Reference:**`;
    if (entry.prerequisites) res += `\n• **Prerequisites:** ${entry.prerequisites}`;
    if (entry.location) res += `\n• **Location:** ${entry.location}`;
    if (entry.npc) res += `\n• **Key NPC:** ${entry.npc}`;
    if (entry.cost) res += `\n• **Cost:** ${entry.cost}`;
  }

  return res;
}

/**
 * Searches obtainment guides for matching items or keywords with strict obtainment intent
 */
function findMatchingObtainmentGuide(query: string): ItemObtainmentGuide | null {
  const clean = query.replace(/[?.,!/\\-]/g, ' ').toLowerCase().trim();

  const isObtainmentIntent =
    clean.includes('how to get') ||
    clean.includes('how do i get') ||
    clean.includes('how do you get') ||
    clean.includes('how can i get') ||
    clean.includes('where to find') ||
    clean.includes('where to get') ||
    clean.includes('where do i find') ||
    clean.includes('how to unlock') ||
    clean.includes('how to craft') ||
    clean.includes('how to spawn') ||
    clean.includes('how to summon') ||
    clean.includes('how to obtain') ||
    clean.includes('obtaining') ||
    clean.includes('obtainment') ||
    clean.includes('unlocking') ||
    clean.includes('drop chance') ||
    clean.includes('drop rate') ||
    clean.includes('requirements') ||
    clean.includes('guide') ||
    clean.includes('quest') ||
    clean.includes('puzzle') ||
    clean.includes('location') ||
    clean.includes('npc');

  // Specialized keyword mappings (Strict multi-word or distinct terms)
  const keywordMap: { [key: string]: string } = {
    'dog blade': 'dog-blade',
    'dogblade': 'dog-blade',
    'cupid helmet': 'cupid-helmet',
    'cupid coat': 'cupid-coat',
    'heart shades': 'heart-shades',
    'santa hat': 'santa-hat',
    'holiday cloak': 'holiday-cloak',
    'elf hat': 'elf-hat',
    '10b balloon': '10b-celebration-balloon',
    'dark coat': 'dark-coat',
    'pale scarf': 'pale-scarf',
    'valkyrie helm': 'valkyrie-helm',
    'valkyrie helmet': 'valkyrie-helm',
    'leviathan shield': 'leviathan-shield',
    'leviathan crown': 'leviathan-crown',
    'kitsune ribbon': 'kitsune-ribbon',
    'kitsune mask': 'kitsune-mask',
    'pilot helmet': 'pilot-helmet',
    'swan glasses': 'swan-glasses',
    'hunter cape': 'hunter-cape',
    'lei accessory': 'lei-accessory',
    'warrior helmet': 'warrior-helmet',
    'cdk': 'cursed-dual-katana',
    'cursed dual katana': 'cursed-dual-katana',
    'cursed dual': 'cursed-dual-katana',
    'ttk': 'true-triple-katana',
    'true triple katana': 'true-triple-katana',
    'true triple': 'true-triple-katana',
    'dark blade': 'dark-blade',
    'yoru': 'dark-blade',
    'shark anchor': 'shark-anchor',
    'hallow scythe': 'hallow-scythe',
    'soul guitar': 'soul-guitar',
    'serpent bow': 'serpent-bow',
    'kabucha': 'kabucha',
    'acidum rifle': 'acidum-rifle',
    'bizarre rifle': 'bizarre-rifle',
    'godhuman': 'godhuman',
    'sanguine art': 'sanguine-art',
    'dragon talon': 'dragon-talon',
    'electric claw': 'electric-claw',
    'sharkman karate': 'sharkman-karate',
    'death step': 'death-step',
    'superhuman': 'superhuman',
    'water kung fu': 'water-kung-fu',
    'dark step': 'dark-step',
    'dragon breath': 'dragon-breath',
    'mirror fractal': 'mirror-fractal',
    'leviathan heart': 'leviathan-heart',
    'dark fragment': 'dark-fragment',
    'terror eyes': 'terror-eyes',
    'dragon scale': 'dragon-scale',
    'electric wings': 'electric-wings',
    'mutant tooth': 'mutant-tooth',
    'monster magnet': 'monster-magnet',
    'library key': 'library-key',
    'water key': 'water-key',
    'hidden key': 'hidden-key',
    'mirage island': 'mirage-island-event',
    'prehistoric island': 'prehistoric-island-event',
    'ghost ship': 'ghost-ship-event',
    'factory raid': 'factory-raid-event',
    'pirate raid': 'pirate-raid-event',
    'darkbeard': 'darkbeard-boss-summon',
    'dough king': 'dough-king-summon',
    'cake prince': 'cake-prince-summon',
    'rip indra': 'rip-indra-summon',
    'soul reaper': 'soul-reaper-summon',
    'cyborg puzzle': 'cyborg-puzzle-quest',
    'ghoul race': 'ghoul-race-quest'
  };

  // 1. Exact match on item ID or Name (user typed only the item name or item + guide)
  for (const item of ALL_OBTAINMENT_DATA) {
    const nameLower = item.name.toLowerCase().trim();
    const idClean = item.id.replace(/-/g, ' ').trim();

    const isExactMatch = clean === nameLower || clean === idClean || clean === `${nameLower} guide` || clean === `${idClean} guide` || clean === `${nameLower} obtainment`;
    if (isExactMatch) {
      return item;
    }

    if (isObtainmentIntent && (clean.includes(nameLower) || clean.includes(idClean))) {
      return item;
    }
  }

  // 2. Check keyword mappings with obtainment intent or exact query
  for (const [kw, id] of Object.entries(keywordMap)) {
    const isExactKw = clean === kw || clean === `${kw} guide` || clean === `${kw} obtainment` || clean === `how to get ${kw}`;
    const kwRegex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (isExactKw || (isObtainmentIntent && kwRegex.test(clean))) {
      const guide = ALL_OBTAINMENT_DATA.find((i) => i.id === id);
      if (guide) return guide;
    }
  }

  return null;
}

/**
 * Formats an ItemObtainmentGuide response
 */
function formatObtainmentResponse(guide: ItemObtainmentGuide): string {
  const costBeli = guide.costBeli ? `\n• **Beli Cost:** $${guide.costBeli.toLocaleString()} Beli` : '';
  const costFrags = guide.costFragments ? `\n• **Fragment Cost:** ${guide.costFragments.toLocaleString()} Fragments` : '';
  const costRobux = guide.costRobux ? `\n• **Robux Price:** ${guide.costRobux.toLocaleString()} R$` : '';
  const dropRate = guide.dropChance ? `\n• **Drop Chance:** ${guide.dropChance}` : '';
  const reqs = guide.requirements ? `\n• **Requirements:** ${guide.requirements}` : '';
  const loc = guide.npcLocation ? `\n• **Location / NPC:** ${guide.npcLocation}` : '';

  return `${guide.icon} **${guide.name} Obtainment Guide:**\n\n` +
    `• **Category & Rarity:** ${guide.rarity} ${guide.category} (${guide.sea})` +
    costBeli +
    costFrags +
    costRobux +
    dropRate +
    reqs +
    loc +
    `\n\n📜 **Step-by-Step Obtainment Guide:**\n` +
    guide.obtainmentSteps.map((step) => `• ${step}`).join('\n') +
    (guide.buffsOrMoves && guide.buffsOrMoves.length > 0 ? `\n\n⚡ **Buffs / Moveset:**\n` + guide.buffsOrMoves.map((b) => `• ${b}`).join('\n') : '') +
    (guide.tips ? `\n\n💡 *Sensei Tip:* ${guide.tips}` : '');
}

/**
 * Matches a Sea location / island query (Strict full name match)
 */
function findMatchingSeaLocation(query: string): SeaLocation | null {
  const clean = query.toLowerCase().trim();
  const isLocationIntent =
    clean.includes('island') ||
    clean.includes('level') ||
    clean.includes('where is') ||
    clean.includes('how to get to') ||
    clean.includes('boss on') ||
    clean.includes('sea progression') ||
    clean.includes('mobs on');

  for (const loc of SEA_PROGRESSION) {
    const nameLower = loc.name.toLowerCase();
    const isExact = clean === nameLower || clean === `${nameLower} island`;
    if (isExact || (isLocationIntent && clean.includes(nameLower))) {
      return loc;
    }
    if (loc.boss) {
      const bossRegex = new RegExp(`\\b${loc.boss.toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (clean === loc.boss.toLowerCase() || (isLocationIntent && bossRegex.test(clean))) {
        return loc;
      }
    }
  }

  return null;
}

/**
 * Formats Sea Location details
 */
function formatSeaLocationResponse(loc: SeaLocation): string {
  return `🗺️ **${loc.name} (Sea ${loc.sea}) Island Overview:**\n\n` +
    `• **Recommended Level:** **${loc.levelRange}**\n` +
    `• **Sea:** ${loc.sea === 1 ? 'First Sea (Old World)' : loc.sea === 2 ? 'Second Sea' : 'Third Sea'}\n` +
    `• **Spawned Mobs:** ${loc.enemies.join(', ')}\n` +
    (loc.boss ? `• **Island Boss:** **${loc.boss}**\n` : '') +
    `• **Key Unlocks & Features:** ${loc.keyUnlocks.join(', ')}\n\n` +
    `💡 *Leveling & Navigation Tip:* ${loc.tip}`;
}

/**
 * Matches Fighting Style queries (Strict whole name or id)
 */
function findMatchingFightingStyle(query: string): FightingStyle | null {
  const clean = query.toLowerCase();

  for (const style of FIGHTING_STYLES) {
    const nameLower = style.name.toLowerCase();
    const styleRegex = new RegExp(`\\b${nameLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (styleRegex.test(clean) || clean === style.id) {
      return style;
    }
  }

  return null;
}

/**
 * Formats Fighting Style details
 */
function formatFightingStyleResponse(style: FightingStyle): string {
  const mats = style.materials ? `\n• **Materials Needed:** ${style.materials.join(', ')}` : '';
  const frags = style.fragCost > 0 ? ` + ${style.fragCost.toLocaleString()} Fragments` : '';

  return `${style.icon} **${style.name} (${style.generation} Fighting Style):**\n\n` +
    `• **Cost:** $${style.beliCost.toLocaleString()} Beli${frags}` +
    mats +
    `\n• **Sea Location:** ${style.sea} (${style.trainerLocation})` +
    `\n• **Trainer NPC:** ${style.trainerName}` +
    `\n• **Requirements:** ${style.requirements}` +
    `\n• **Tier Rating:** PvP: **${style.pvpTier}** | Grinding: **${style.grindTier}**` +
    `\n\n🥋 **Moveset Overview:**\n` +
    style.moves.map((m) => `• **[${m.key}] ${m.name}** (Req. Mastery ${m.mastery}): ${m.description}`).join('\n') +
    `\n\n💡 *Sensei Playstyle:* ${style.description}`;
}

/**
 * Matches Accessory queries (Strict whole name or id)
 */
function findMatchingAccessory(query: string): Accessory | null {
  const clean = query.toLowerCase();

  for (const acc of ACCESSORIES_DATA) {
    const nameLower = acc.name.toLowerCase();
    const accRegex = new RegExp(`\\b${nameLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (accRegex.test(clean) || clean === acc.id) {
      return acc;
    }
  }

  return null;
}

/**
 * Formats Accessory details
 */
function formatAccessoryResponse(acc: Accessory): string {
  return `${acc.icon} **${acc.name} (${acc.rarity} Accessory):**\n\n` +
    `• **Sea Origin:** ${acc.sea}\n` +
    `• **Drop Source:** ${acc.dropSource}\n` +
    `• **PvP Rating:** **${acc.pvpRating}/10**\n` +
    `• **Buffs & Stat Boosts:**\n` +
    acc.buffs.map((b) => `  - ${b}`).join('\n') +
    `\n\n💡 *Overview:* ${acc.description}`;
}

/**
 * Matches Raid & Awakening queries
 */
function findMatchingRaid(query: string): RaidInfo | null {
  const clean = query.toLowerCase();
  const hasRaidContext = clean.includes('raid') || clean.includes('awaken') || clean.includes('awakening') || clean.includes('chip') || clean.includes('host');

  if (!hasRaidContext) return null;

  for (const raid of RAIDS_DATA) {
    const fruitLower = raid.fruitName.toLowerCase();
    if (clean.includes(fruitLower) || clean.includes(raid.id)) {
      return raid;
    }
  }

  return null;
}

/**
 * Formats Raid & Awakening details
 */
function formatRaidResponse(raid: RaidInfo): string {
  return `🔮 **${raid.fruitName} Raid & Awakening Info:**\n\n` +
    `• **Raid Type:** ${raid.type} (${raid.difficulty} Difficulty)\n` +
    `• **Cost to Host:** ${raid.cost}\n` +
    `• **Total Fragments to Full Awaken:** **${raid.totalFragmentsToAwaken.toLocaleString()} Fragments**\n` +
    `• **Recommended Build for Easy Solo:** ${raid.recommendedFruit}\n\n` +
    `📜 **Awakened Move Upgrade Order:**\n` +
    raid.awakenedMoves.map((m) => `• **[${m.key}] ${m.name}:** ${m.fragments.toLocaleString()} Fragments`).join('\n') +
    `\n\n💡 *Sensei Advice:* Hosted at Hot & Cold (Sea 2) or Castle on the Sea (Sea 3). Buy microchip for $100k Beli or any junk fruit!`;
}

/**
 * Matches Combo presets
 */
function findMatchingCombo(query: string): ComboPreset | null {
  const clean = query.toLowerCase();
  const hasComboWord = clean.includes('combo') || clean.includes('one-shot') || clean.includes('oneshot') || clean.includes('build');

  if (!hasComboWord) return null;

  for (const combo of COMBO_PRESETS) {
    if (clean.includes(combo.fruitId) || clean.includes(combo.name.toLowerCase())) {
      return combo;
    }
  }

  return null;
}

/**
 * Formats Combo preset details
 */
function formatComboResponse(combo: ComboPreset): string {
  return `⚡ **${combo.name} (${combo.difficulty} / ${combo.playstyle}):**\n\n` +
    `• **Estimated Combo Damage:** **${combo.damageEstimate}** (One-Shot)\n` +
    `• **Required Setup:** Fruit: ${combo.fruitId} | Style: ${combo.styleId} | Sword: ${combo.swordId} | Gun: ${combo.gunId}\n\n` +
    `🎯 **Exact Move Execution Sequence:**\n` +
    combo.sequence.map((step, idx) => `${idx + 1}. ${step}`).join('\n') +
    `\n\n📖 **Tactical Breakdown:**\n${combo.explanation}\n\n` +
    `💡 *Execution Tip:* ${combo.tips}`;
}

/**
 * Matches fruit items in the live aggregated catalog with whole-word token matching
 * Only matches if user requested exact item or explicitly asked for value/stats/details.
 */
function findMatchingFruitItem(query: string, allItems: FruitItem[]): FruitItem | null {
  const clean = query.toLowerCase().replace(/[?.,!/\\#'"“”‘’\-]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').filter(Boolean);

  const hasValueIntent =
    clean.includes('value') ||
    clean.includes('worth') ||
    clean.includes('price') ||
    clean.includes('cost') ||
    clean.includes('trade') ||
    clean.includes('perm') ||
    clean.includes('permanent') ||
    clean.includes('demand') ||
    clean.includes('stats') ||
    clean.includes('tier') ||
    clean.includes('dossier') ||
    clean.includes('details') ||
    clean.includes('info');

  for (const item of allItems) {
    const nameLower = item.name.toLowerCase().trim();
    const idLower = item.id.toLowerCase().trim();

    // 1. Exact match on full query (e.g. user typed "dragon", "kitsune", "perm dough")
    if (clean === nameLower || clean === idLower || clean === `${nameLower} fruit` || clean === `perm ${nameLower}` || clean === `permanent ${nameLower}`) {
      return item;
    }

    // 2. Matched with explicit value/stats/trade inquiry
    if (hasValueIntent) {
      const nameRegex = new RegExp(`\\b${nameLower.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (nameRegex.test(clean) || words.includes(nameLower)) {
        return item;
      }
    }
  }

  return null;
}

/**
 * Universal NLP Trade, Value & Combined Value Resolution Engine
 * Handles single item queries, multi-item combined value calculations,
 * side A vs side B trade offer comparisons (W/F/L), and trade ladder inquiries in any language.
 */
function detectAndHandleUniversalTradeQuery(query: string, allItems: FruitItem[]): string | null {
  const clean = query.toLowerCase().trim();

  // Helper dictionary of item aliases to item id/name
  const ALIAS_MAP: { [key: string]: string } = {
    'kits': 'kitsune',
    'kitsune': 'kitsune',
    'fox': 'kitsune',
    'drag': 'dragon-west',
    'dragon': 'dragon-west',
    'dragon west': 'dragon-west',
    'dragon east': 'dragon-east',
    'leo': 'leopard',
    'leopard': 'leopard',
    'dough': 'dough',
    'trex': 't-rex',
    't-rex': 't-rex',
    'rex': 't-rex',
    'mammoth': 'mammoth',
    'buddha': 'buddha',
    'budha': 'buddha',
    'portal': 'portal',
    'port': 'portal',
    'rumble': 'rumble',
    'blizz': 'blizzard',
    'blizzard': 'blizzard',
    'spirit': 'spirit',
    'venom': 'venom',
    'shadow': 'shadow',
    'control': 'control',
    'grav': 'gravity',
    'gravity': 'gravity',
    'quake': 'quake',
    'love': 'love',
    'spider': 'spider',
    'sound': 'sound',
    'phoenix': 'phoenix',
    'magma': 'magma',
    'light': 'light',
    'ice': 'ice',
    'dark': 'dark',
    'sand': 'sand',
    'flame': 'flame',
    'ghost': 'ghost',
    'barrier': 'barrier',
    'rubber': 'rubber',
    'diamond': 'diamond',
    'falcon': 'falcon',
    'spike': 'spike',
    'smoke': 'smoke',
    'bomb': 'bomb',
    'spring': 'spring',
    'chop': 'chop',
    'spin': 'spin',
    'rocket': 'rocket',
    'gas': 'gas',
    'yeti': 'yeti',
    'tiger': 'tiger',
    'dog blade': 'dog-blade',
    'dogblade': 'dog-blade',
    'cdk': 'cursed-dual-katana',
    'ttk': 'true-triple-katana',
    'db': 'dark-blade',
    'dark blade': 'dark-blade',
    'yoru': 'dark-blade',
    'fruit notifier': 'fruit-notifier',
    'notifier': 'fruit-notifier',
    '2x money': '2x-money',
    '2x mastery': '2x-mastery',
    'fast boats': 'fast-boats',
    'fruit storage': 'fruit-storage',
    'storage': 'fruit-storage',
    '+1 storage': 'fruit-storage'
  };

  const extractItemsFromText = (text: string): { item: FruitItem; isPerm: boolean }[] => {
    const found: { item: FruitItem; isPerm: boolean }[] = [];
    const lowerText = text.toLowerCase();

    for (const [alias, idOrName] of Object.entries(ALIAS_MAP)) {
      const aliasRegex = new RegExp(`\\b${alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (aliasRegex.test(lowerText)) {
        const item = allItems.find(i => i.id === idOrName || i.name.toLowerCase() === idOrName.toLowerCase() || i.id.toLowerCase().includes(idOrName.toLowerCase()));
        if (item && !found.some(f => f.item.id === item.id)) {
          const isPerm = lowerText.includes(`perm ${alias}`) || lowerText.includes(`permanent ${alias}`) || lowerText.includes(`perm ${item.name.toLowerCase()}`) || (lowerText.includes('perm') && !lowerText.includes('physical'));
          found.push({ item, isPerm });
        }
      }
    }

    for (const item of allItems) {
      if (found.some(f => f.item.id === item.id)) continue;
      const itemNameLower = item.name.toLowerCase();
      if (lowerText.includes(itemNameLower)) {
        const isPerm = lowerText.includes(`perm ${itemNameLower}`) || lowerText.includes(`permanent ${itemNameLower}`) || (lowerText.includes('perm') && !lowerText.includes('physical'));
        found.push({ item, isPerm });
      }
    }

    return found;
  };

  const isTradeIntent = 
    clean.includes('value') ||
    clean.includes('worth') ||
    clean.includes('price') ||
    clean.includes('cost') ||
    clean.includes('trade') ||
    clean.includes('trading') ||
    clean.includes('offer') ||
    clean.includes('wfl') ||
    clean.includes('w/f/l') ||
    clean.includes('combined') ||
    clean.includes('together') ||
    clean.includes('total') ||
    clean.includes('sum') ||
    clean.includes('plus') ||
    clean.includes('+') ||
    clean.includes('vale') ||
    clean.includes('valen') ||
    clean.includes('valor') ||
    clean.includes('precio') ||
    clean.includes('troca') ||
    clean.includes('oferta') ||
    clean.includes('juntos') ||
    clean.includes('juntando') ||
    clean.includes('magkano') ||
    clean.includes('halaga');

  const allFoundItems = extractItemsFromText(clean);

  if (!isTradeIntent && allFoundItems.length === 0) {
    return null;
  }

  // CASE 1: Trade Comparison (Side A vs Side B)
  const isComparison = 
    clean.includes(' for ') || 
    clean.includes(' vs ') || 
    clean.includes(' trading ') || 
    clean.includes(' troca ') || 
    clean.includes(' por ') || 
    clean.includes(' wfl ') || 
    clean.includes(' w/f/l ') || 
    clean.includes(' offer ');

  if (isComparison) {
    let splitChar = ' for ';
    if (clean.includes(' vs ')) splitChar = ' vs ';
    else if (clean.includes(' wfl ')) splitChar = ' wfl ';
    else if (clean.includes(' w/f/l ')) splitChar = ' w/f/l ';
    else if (clean.includes(' troca ')) splitChar = ' troca ';
    else if (clean.includes(' por ')) splitChar = ' por ';
    else if (clean.includes(' offer ')) splitChar = ' offer ';

    const parts = clean.split(splitChar);
    if (parts.length >= 2) {
      const sideA = extractItemsFromText(parts[0]);
      const sideB = extractItemsFromText(parts.slice(1).join(' '));

      if (sideA.length > 0 && sideB.length > 0) {
        const valA = sideA.reduce((acc, i) => acc + (i.isPerm && i.item.permanentValue ? i.item.permanentValue : i.item.physicalValue), 0);
        const valB = sideB.reduce((acc, i) => acc + (i.isPerm && i.item.permanentValue ? i.item.permanentValue : i.item.physicalValue), 0);

        const beliA = sideA.reduce((acc, i) => acc + (i.item.beliPrice || 0), 0);
        const beliB = sideB.reduce((acc, i) => acc + (i.item.beliPrice || 0), 0);

        const diff = valB - valA;
        const pct = valA > 0 ? (diff / valA) * 100 : 0;

        let verdict = '';
        let advice = '';

        if (pct >= 20) {
          verdict = '🔥 **MASSIVE WIN (BIG W)**';
          advice = `Accept immediately! You gain +${formatValueNumber(diff)} surplus trade equity.`;
        } else if (pct >= 5) {
          verdict = '✅ **PROFITABLE WIN (FAVORABLE W)**';
          advice = `Solid profit margin (+${formatValueNumber(diff)}). Recommended trade!`;
        } else if (pct >= -5) {
          verdict = '⚖️ **FAIR TRADE (BALANCED EQUALITY)**';
          advice = `Fair economic swap. Ensure you are receiving high-demand items!`;
        } else if (pct >= -18) {
          verdict = '⚠️ **SLIGHT DEFICIT (MINOR L)**';
          advice = `You are slightly overpaying by ${formatValueNumber(Math.abs(diff))}. Ask them to add Buddha or Portal.`;
        } else {
          verdict = '❌ **HEAVY LOSS (BIG L)**';
          advice = `Do NOT accept! You are overpaying by ${formatValueNumber(Math.abs(diff))}. Ask for major high-tier additions or decline.`;
        }

        const maxBeli = Math.max(beliA, beliB);
        const minBeli = Math.min(beliA, beliB);
        const beliDiff = maxBeli > 0 ? ((maxBeli - minBeli) / maxBeli) * 100 : 0;
        const passes40 = beliDiff <= 40;

        const strA = sideA.map(i => `${i.isPerm ? 'Perm ' : ''}${i.item.name}`).join(' + ');
        const strB = sideB.map(i => `${i.isPerm ? 'Perm ' : ''}${i.item.name}`).join(' + ');

        return `${verdict}\n\n` +
          `• **Side A (Offer):** ${strA} ➔ **${formatValueNumber(valA)}**\n` +
          `• **Side B (Counter):** ${strB} ➔ **${formatValueNumber(valB)}**\n` +
          `• **Net Value Equity:** **${diff >= 0 ? '+' : ''}${formatValueNumber(diff)}** (${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%)\n` +
          `• **In-Game 40% Beli Limit:** ${passes40 ? '✅ Valid in-game' : `⚠️ Exceeds 40% Beli gap (${beliDiff.toFixed(0)}%). Add filler fruits like Quake/Love!`}\n\n` +
          `🎯 **Sensei Advice:** ${advice}`;
      }
    }
  }

  // CASE 2: Multi-Item Combined Value (Sum of 2+ items or explicit combined query)
  const isCombinedQuery = 
    allFoundItems.length >= 2 || 
    clean.includes('combined') || 
    clean.includes('together') || 
    clean.includes('total') || 
    clean.includes('sum') || 
    clean.includes('plus') || 
    clean.includes('+') || 
    clean.includes('juntos') || 
    clean.includes('juntando');

  if (isCombinedQuery && allFoundItems.length > 0) {
    const totalPhysical = allFoundItems.reduce((acc, i) => acc + i.item.physicalValue, 0);
    const totalPermanent = allFoundItems.reduce((acc, i) => acc + (i.item.permanentValue || i.item.physicalValue * 2), 0);
    const totalBeli = allFoundItems.reduce((acc, i) => acc + (i.item.beliPrice || 0), 0);
    const totalRobux = allFoundItems.reduce((acc, i) => acc + (i.item.robuxPrice || 0), 0);

    const avgDemand = (allFoundItems.reduce((acc, i) => acc + (i.item.demand || 5), 0) / allFoundItems.length).toFixed(1);

    const itemListStr = allFoundItems.map(i => `${i.item.imageEmoji || '🍎'} **${i.isPerm ? 'Perm ' : ''}${i.item.name}** (${formatValueNumber(i.isPerm && i.item.permanentValue ? i.item.permanentValue : i.item.physicalValue)})`).join('\n• ');

    const anchor = [...allFoundItems].sort((a, b) => b.item.physicalValue - a.item.physicalValue)[0];

    return `🧮 **Solas AI Combined Value & Portfolio Analysis:**\n\n` +
      `**Included Items:**\n• ${itemListStr}\n\n` +
      `💰 **Combined Trade Summary:**\n` +
      `• **Total Physical Value:** **${formatValueNumber(totalPhysical)}** (${totalPhysical.toLocaleString()} Beli Points)\n` +
      `• **Total Permanent Value:** **${formatValueNumber(totalPermanent)}**\n` +
      `• **Total Beli Shop Cost:** $${totalBeli.toLocaleString()} Beli\n` +
      (totalRobux > 0 ? `• **Total Robux Value:** ${totalRobux.toLocaleString()} R$\n` : '') +
      `• **Average Demand Rating:** **${avgDemand}/10**\n` +
      `• **Key Anchor Item:** ${anchor.item.name} (${formatValueNumber(anchor.item.physicalValue)})\n\n` +
      `💡 **Trading Potential:** This bundle has strong trading power on Second/Third Sea tables and can easily be traded for high-tier mythical fruits or gamepasses of equivalent value!`;
  }

  // CASE 3: Single Item Value Query (Only trigger if query has trade intent, value/price keywords, or explicit info requests)
  if (allFoundItems.length === 1) {
    const isSingleLookup = 
      isTradeIntent ||
      clean.includes('dossier') ||
      clean.includes('value') ||
      clean.includes('worth') ||
      clean.includes('price') ||
      clean.includes('stats') ||
      clean.includes('demand') ||
      clean.includes('tier') ||
      clean === allFoundItems[0].item.name.toLowerCase() ||
      clean === `${allFoundItems[0].item.name.toLowerCase()} fruit` ||
      clean === `perm ${allFoundItems[0].item.name.toLowerCase()}` ||
      clean === `what is ${allFoundItems[0].item.name.toLowerCase()} worth` ||
      clean === `what is the value of ${allFoundItems[0].item.name.toLowerCase()}`;

    if (isSingleLookup) {
      const item = allFoundItems[0].item;
      return formatFruitItemResponse(item, query);
    }
    return null;
  }

  // CASE 4: Trade Ladder or General Trading Strategy Query
  if (clean.includes('trade ladder') || clean.includes('trading path') || clean.includes('how to trade up') || clean.includes('zero to kitsune')) {
    return `🪜 **Blox Fruits Trade Ladder & Profit Flipping Guide:**\n\n` +
      `1. **Start Small (Sea 1/2):** Trade common/uncommon drops for **Magma / Light**.\n` +
      `2. **Step Up to Liquidity:** Trade Magma + adds for **Sound or Blizzard**, then trade up to **Portal / Buddha**.\n` +
      `3. **The Grinding Power Spike:** **Buddha** has 10/10 demand; players overpay for Buddha when desperate to level up.\n` +
      `4. **Mythical Bundling:** Combine Buddha + Portal for **Spirit, Venom, or T-Rex**, then bundle 2 Mythicals for **Dough**.\n` +
      `5. **Apex Pinnacle:** Trade Dough + T-Rex for **Leopard**, and 2x Leopard for **Kitsune**! 🦊\n\n` +
      `💡 **Live Database Sync:** Switch to the **🪜 Trade Ladder** tab in the top navigation menu to track your live step progress synced with live database fruit values!`;
  }

  return null;
}

/**
 * Formats Fruit item response
 */
function formatFruitItemResponse(item: FruitItem, query: string): string {
  const isPerm = query.includes('perm') || query.includes('permanent');
  const val = isPerm && item.permanentValue ? item.permanentValue : item.physicalValue;
  const permText = item.permanentValue ? `\n• **Permanent Value:** ${formatValueNumber(item.permanentValue)}` : '';
  const beliText = item.beliPrice ? `\n• **In-Game Beli Price:** $${item.beliPrice.toLocaleString()} Beli` : '';
  const robuxText = item.robuxPrice ? `\n• **Robux Price:** ${item.robuxPrice.toLocaleString()} R$` : '';
  const widgetTagText = item.widgetTag ? `\n🏷️ **Custom Widget Tag:** [${item.widgetTag}]` : '';
  const customAddedText = item.isCustomAdded ? `\n👑 *Owner-Created Custom Item Verified*` : '';

  return `${item.imageEmoji || '🍎'} **${item.name} Value & Profile:**\n\n` +
    `• **Trade Value:** **${formatValueNumber(val)}**${permText}` +
    beliText +
    robuxText +
    `\n• **Demand Rating:** **${item.demand}/10** (${item.trend.toUpperCase()})` +
    `\n• **Category & Rarity:** ${item.rarity} ${item.type || item.category}` +
    `\n• **Combat Rating:** PvP: **${item.pvpTier}** | Grinding: **${item.grindTier}**` +
    widgetTagText +
    customAddedText +
    `\n• **Playstyle & Meta Insight:** ${item.description}\n` +
    (item.updateNote ? `\n📌 *Update Note:* ${item.updateNote}` : '');
}

/**
 * Thematic fallback synthesizers for broad or multi-part questions
 */
function generateThematicSynthesisResponse(query: string): string | null {
  // 0. Max Level & Update 27.4 Cap
  if (
    query.includes('max level') ||
    query.includes('level cap') ||
    query.includes('max lvl') ||
    query.includes('update 27') ||
    query.includes('27.4') ||
    query.includes('what is the max level') ||
    query.includes('what is max level') ||
    query.includes('highest level') ||
    query.includes('2800')
  ) {
    return `👑 **Max Level Cap: 2800 (Update 27.4):**\n\n` +
      `• **Current Max Level:** **Level 2800** as of the latest **Update 27.4**!\n` +
      `• **Total Stat Points:** **8,400 Stat Points** (3 points awarded per level from Lv 1 to 2800).\n` +
      `• **Max Points Per Stat:** Up to **2,800** in any single stat category (Melee, Defense, Sword, Gun, or Blox Fruit).\n\n` +
      `**Optimal Stat Allocations at Lv 2800:**\n` +
      `• **Sword / Buddha Main:** 2800 Melee, 2800 Defense, 2800 Sword (0 Gun, 0 Fruit).\n` +
      `• **Fruit Main (Kitsune, Dough, Dragon, Portal):** 2800 Melee, 2800 Defense, 2800 Blox Fruit (0 Sword, 0 Gun).\n` +
      `• **Endgame Zone:** Grind past Tiki Outpost into the **Submerged Abyss & Astral Bastion** to achieve max level 2800!`;
  }

  // 1. Leveling & Grinding
  if (
    query.includes('how to level') ||
    query.includes('fastest way to level') ||
    query.includes('level up fast') ||
    query.includes('grinding guide') ||
    query.includes('best fruit for grind')
  ) {
    return `🗺️ **Ultimate Blox Fruits Leveling Blueprint (Lv 1 - 2800 Update 27.4):**\n\n` +
      `**Optimal Fruit Strategy:**\n` +
      `• **First Sea (Lv 1 - 700):** Use **Light / Magma / Ice** for Elemental Logia immunity and ultra-fast travel across islands.\n` +
      `• **Second & Third Sea (Lv 700 - 2800):** Eat **Buddha (Awakened Z Move)**! Buddha increases your melee hit range by 800% and grants massive damage reduction.\n\n` +
      `**Stat Distribution Formula:**\n` +
      `• For Buddha Main: Put **60% Melee, 40% Defense, 0% Fruit** (Fruit stats do not boost Buddha M1 clicks!). Max 2800 per stat.\n` +
      `• For Fruit Main: Put **40% Melee, 40% Defense, 20% Fruit**.\n\n` +
      `**Sea Transition Milestones:**\n` +
      `• **Lv 700:** Talk to Military Detective at Prison ➔ Defeat Ice Admiral ➔ Unlock Second Sea.\n` +
      `• **Lv 1500:** Defeat Don Swan at Mansion ➔ Talk to King Red Head at Colosseum ➔ Defeat rip_indra ➔ Unlock Third Sea!\n` +
      `• **Lv 2800:** Reach pinnacle max level in Update 27.4 with 8,400 total stat points!`;
  }

  // 2. Fighting Styles general
  if (query.includes('best fighting style') || query.includes('fighting style tier') || query.includes('all fighting style')) {
    return `🥊 **Blox Fruits Fighting Style Meta Hierarchy:**\n\n` +
      `• 👑 **Godhuman (SS+ Tier):** The uncontested king of PvP combo extensions, featuring unstoppable hyper-armor on C move and Ken-break Z dash.\n` +
      `• 🩸 **Sanguine Art (SS Tier):** Infinite lifesteal sustain, colossal AoE stun tentacles, and devastating aerial capture.\n` +
      `• ⚡ **Electric Claw (S+ Tier):** Lightning-fast forward dash (C move) perfect for closing gaps with Portal or Kitsune.\n` +
      `• 🦈 **Sharkman Karate (S+ Tier for Grinding):** Highest M1 attack speed in the game, the #1 choice when paired with Buddha.\n` +
      `• 🔥 **Dragon Talon (S Tier):** Colossal AoE fiery burst damage and burn ticks.\n` +
      `• 💀 **Death Step (A Tier):** High critical fire kicks, ideal for early Second Sea leveling.`;
  }

  // 3. Races general
  if (query.includes('best race') || query.includes('which race') || query.includes('race tier')) {
    return `🧬 **Blox Fruits Race Meta Tier List:**\n\n` +
      `• 🤖 **Cyborg (SS+ Tier):** #1 counter to Ken-spammers and teaming crews. V4 passive chain lightning breaks Instinct and interrupts enemy combos.\n` +
      `• 🦈 **Shark (SS Tier for Defense):** Immortal 5,000 HP regenerating water shield in V4, 100% water immunity, and extreme damage reduction.\n` +
      `• 👼 **Angel (S+ Tier for Flight & Stun):** King's Rule aura stuns opponents within proximity and heals your HP rapidly.\n` +
      `• 💀 **Ghoul (S+ Tier for Fruit Mains):** 40% cooldown reduction on all skills, lifesteal on melee, and blinding Domain Expansion.\n` +
      `• 🐰 **Mink (S Tier for Speed):** Whirlwind dashes and extreme agility to evade one-shot combos.\n` +
      `• 👤 **Human (S Tier for Pure Damage):** Rage Psycho meter boosts damage by up to +150% for catastrophic one-shot burst.`;
  }

  // 4. 40% Beli trading rule
  if (query.includes('40%') || query.includes('beli rule') || query.includes('difference is too high') || query.includes('how does trading work')) {
    return `⚖️ **The 40% In-Game Beli Trading Rule:**\n\n` +
      `• On Blox Fruits trading tables, the total **In-Game Beli shop prices** of both sides cannot differ by more than **40%**.\n` +
      `• *Important Distinction:* **Trade Value** (e.g. Kitsune = 640M, Buddha = 28M) is what players value items for. **In-Game Beli Price** (e.g. Kitsune = $8M, Quake = $1M) is the threshold price.\n` +
      `• **How to balance trades:** Add high-Beli, low-market-value filler fruits like **Quake ($1M), Love ($1.3M), Spider ($1.5M), or Pain ($2.4M)** to satisfy the 40% rule without giving away trade profit!`;
  }

  // 5. Dog Blade questions
  if (query.includes('dog blade') || query.includes('dogblade')) {
    return `🐕 **Dog Blade Spotlight (Mythical Limited Event Sword):**\n\n` +
      `• **Market Value:** **580 Million (580,000,000 Beli Points)** | **Demand: 8/10 (High)**\n` +
      `• **Event:** Exclusive to the August 2026 Doghouse Event (Obtained from Barking Altar).\n` +
      `• **Moveset:**\n` +
      `  - **[Z] Spoiled Strike (Mastery 150):** Dashes forward with heavy bite stun and breaks Ken.\n` +
      `  - **[X] Tantrum Whirlwind (Mastery 350):** 360-degree spinning multi-hit storm pulling enemies inward.\n` +
      `  - **[C] Royal Fetch:** Throws a glowing canine projectile that homes in and locks targets in place.\n` +
      `• **Top Combo:** *Portal V* ➔ *Soul Guitar Z* ➔ *Godhuman C* ➔ *Dog Blade Z* ➔ *Dog Blade X* (22,500 Damage).`;
  }

  // 6. Instinct / Ken Haki V2
  if (query.includes('instinct v2') || query.includes('ken v2') || query.includes('how to get instinct')) {
    const instinctGuide = ALL_OBTAINMENT_DATA.find((i) => i.id === 'instinct-v2') || BLOX_MASTER_FAQ.find((e) => e.id === 'mech-instinct-v2-apple-spawns');
    if (instinctGuide) {
      return `👁️ **Instinct (Ken Haki) V2 Complete Guide:**\n\n` +
        `• **Prerequisites:** 5,000 Instinct Exp (Max V1) + $5,000,000 Beli + Complete Citizen Quest (Defeat 50 Forest Pirates & Captain Elephant).\n` +
        `• **Quest Giver:** Hungry Man on Floating Turtle (inside the pineapple house).\n` +
        `• **Fruit Quest:** Collect Apple (Floating Turtle tree), Banana (Great Tree hill), and Pineapple (Port Town spawn) and take them to Citizen in Mansion to make the **Fruit Bowl**.\n` +
        `• **Reward:** Instinct V2 reveals enemy health bars, energy bars, equipped fighting style, sword, and fruit!`;
    }
  }

  return null;
}

/**
 * Deep fuzzy search has been replaced with strict high-confidence routing to avoid false triggers
 */
function performDeepDatasetFuzzySearch(_query: string, _allItems: FruitItem[]): string | null {
  return null;
}

/**
 * Dynamic, High-Personality Fallback Responses for Unknown, Off-Topic, or Unmatched Queries
 * Randomly selects from a rich pool of 36+ unique, personality-packed responses (pirate anime sensei,
 * reactor AI, humorous trader roasts, nautical lore, sparring tips, and tactical redirects).
 */
export function generateIntelligentBloxFruitsFallback(query: string): string {
  const cleanQ = query.trim();
  const truncatedQ = cleanQ.length > 35 ? cleanQ.slice(0, 32) + '...' : cleanQ;

  const responses = [
    // 1. The Perplexed Anime Pirate Sensei
    `🤔 **Hold your anchor! I don't know the answer to that one.**\n\nMy Observation Haki searched all Three Seas from Pirate Starter Island to the Haunted Castle, but that topic isn't in my combat scrolls. Try asking me about fruit trading values, Race V4 trials, or lethal PvP combos!`,

    // 2. The Overheating AI Core
    `⚡ **AI Reactor Core Alert: I don't know that one!**\n\nMy subroutines are calibrated exclusively for Blox Fruits market equity, boss spawn rotations, and mutant fruit fusions. Feed me a Blox Fruits question and let's run the numbers!`,

    // 3. The Sea Explorer / Mirage Island
    `🌫️ **I don't know—that question is hidden thicker than Mirage Island in a fog storm!**\n\nI specialize in navigating the turbulent waters of Blox Fruits. Want to know the latest Kitsune vs Dragon trade margins, or how to awaken Dough V2?`,

    // 4. Quoting the user's query playfully
    `❓ **I honestly don't know about "${truncatedQ}"—it's completely foreign to the Grand Line!**\n\nIf you want to evaluate a high-stakes trade, calculate 40% Beli limits, or find the legendary Sword Dealer, I'm your Sensei. What in-game intel do you need?`,

    // 5. The Grandmaster Trader
    `💰 **I don't know that! Even the most cunning Cafe trader in Second Sea has never heard of it.**\n\nI can calculate your trade profits, tell you if Buddha is rising or dropping, or evaluate your perm fruit exchanges. Give me a trade to appraise!`,

    // 6. The Combative Duelist / Ken Haki
    `⚔️ **My Ken Haki dodged that one—I don't know the answer!**\n\nThat falls outside our Blox Fruits arena. I'm primed for fighting style combos (Godhuman, Sanguine Art), accessory buffs, and raid strategies. Pitch me a battle scenario!`,

    // 7. The Ship Captain's Logbook
    `📜 **Captain's Log: I don't know this query!**\n\nI flipped through every page of the ancient Third Sea archives and couldn't find a match. Ask me about leveling routes from Lv 1 to 2800 (Update 27.4), sea danger levels, or True Triple Katana!`,

    // 8. The Fruit Gourmet / Chef
    `🍎 **I don't know about that—it's not on the Devil Fruit menu!**\n\nI've tasted everything from Rocket to Kitsune, but that topic is completely outside the orchard. What fruit values or moveset awakenings are you curious about?`,

    // 9. The Mirage Moon Gear Seeker
    `🌕 **I don't know, my friend! Even with the Full Moon shining on Great Tree, I can't spot that answer.**\n\nAsk me about finding the Blue Gear, activating your Race V4 gear wheel, or defeating rip_indra and Dough King instead!`,

    // 10. The Mutation Lab Alchemist
    `🧬 **Lab Calibration Error: I don't know that!**\n\nOur gene-splicing Mutation Lab only analyzes Blox Fruit fusions, catalyst gachas, and fall risk ratings. Got a fruit combo or fusion experiment you want me to simulate?`,

    // 11. The Rip Indra Raid Boss
    `🌀 **I don't know! A dimensional rift swallowed that answer.**\n\nMy knowledge crystal is tuned specifically to Blox Fruits lore, mythical drop rates, and trade demand ratings. What sea mystery shall we conquer next?`,

    // 12. The Beli Banker
    `🪙 **I don't know—that's not registered in the Beli Central Bank!**\n\nI can tell you exact shop prices, physical vs perm trading values, and how to avoid getting scammed by the 40% Beli difference rule. Test my trade calculator!`,

    // 13. The Bounty Hunter
    `🏴‍☠️ **Bounty Board Blank: I don't know that one, pirate!**\n\nI have 30 Million bounty hunter instincts, but only when it comes to Blox Fruits. Want some pro advice on breaking Ken Haki with Sanguine Art or Portal V?`,

    // 14. The Turtle Mansion Aristocrat
    `🏰 **I don't know the answer to that, honorable guest of the Floating Turtle!**\n\nMy archives are dedicated to sword masteries, raid micro-optimizations, and live trading liquidity. What shall we inspect across the seas?`,

    // 15. The Sea Beast Caller
    `🌊 **I don't know! That answer sank straight to the bottom of Sea Danger Level 6.**\n\nIf you want to hunt Terror Sharks, summon Leviathan with the Beast Hunter ship, or harvest Shark Teeth, I have the full battle plan ready!`,

    // 16. The Godhuman Sensei
    `🥊 **I don't know that technique! Not even the Martial Arts Master on Floating Turtle teaches it.**\n\nI can break down the exact materials for Godhuman (Dragon Scales, Fish Tails, Magma Ore) or best combo extensions. What style are you grinding for?`,

    // 17. The Dog Blade Companion
    `🐕 **Bark! I don't know that one—even the August 2026 Doghouse altar didn't whisper it.**\n\nI'm loaded with stats on Dog Blade (580M value), Cursed Dual Katana, Dark Blade V3, and every mythical weapon in the game. What gear do you want to master?`,

    // 18. The Celestial Astronomer
    `🌌 **I don't know! That lies beyond the celestial orbits of our Blox Fruits solar matrix.**\n\nI can help you time your Mirage Island hunts, explain Instinct V2 fruit locations, or optimize your stats for Buddha grinding. Where are you heading?`,

    // 19. The Cafe Barista in Second Sea
    `☕ **I don't know that one, partner! Nobody at the Kingdom of Rose cafe is talking about it.**\n\nPull up a chair and ask me if your Dough for Dragon trade is a Massive Win (W) or a catastrophic Loss (L). Let's crunch some trade equity!`,

    // 20. The Ghoul Domain Master
    `💀 **I don't know—it vanished into the Ghoul V4 Domain Expansion darkness!**\n\nLooking for race tiers, cooldown reduction setups, or lifesteal builds? Drop a Blox Fruits inquiry and let's illuminate the path!`,

    // 21. The Cybernetic Matrix Core
    `🤖 **Cyborg V4 Scan Inconclusive: I don't know!**\n\nMy circuit boards are overclocked strictly on Blox Fruits metadata—fruit demand tiers, awakening fragment costs, and raid boss spawn cooldowns. What can I calculate for you?`,

    // 22. The Angel King's Radiance
    `👼 **I don't know! Even from the highest clouds of Upper Skylands, I see no trace of it.**\n\nI know everything about Angel V4 King's Rule aura, Pole V2 puzzle steps, and Light fruit flight mechanics though. Fire away with an in-game question!`,

    // 23. The Mink Speedster
    `⚡ **Zoom! I ran across all three seas at Mink V4 speeds and still don't know that answer.**\n\nNeed to know the fastest mobility fruits in the meta, or how to escape one-shot Godhuman combos? Ask me anything about speed and PvP!`,

    // 24. The Casual Witty Pirate
    `🤷‍♂️ **Honestly? I don't know! You caught me off-guard with that one.**\n\nI'm your dedicated Blox Fruits guru—ask me how many fragments a raid gives, what Leopard is trading for, or how to get the Dark Coat from Darkbeard!`,

    // 25. The Soul Guitar Musician
    `🎸 **I don't know that tune! The Soul Guitar graveyard spirits are silent on this one.**\n\nI can teach you the full living zombie puzzle step-by-step or how to hit the El Diablo stun combo. What weapon quest are you working on?`,

    // 26. The Ancient Altar Oracle
    `🔮 **The crystal is foggy: I don't know that answer.**\n\nMy prophetic visions are tuned strictly to the Blox Fruits universe. Inquire about fruit tier rankings, value trends (Rising/Dropping), or raid strategies!`,

    // 27. The Cursed Dual Katana Spirit
    `🗡️ **I don't know! Neither Tushita's torch trials nor Yama's agony scrolls hold that secret.**\n\nIf you want the complete walkthrough for unlocking Cursed Dual Katana (CDK) or Hallow Scythe, I've got every trial mapped out!`,

    // 28. The Fragment Collector
    `💎 **I don't know—and I can't even buy that answer with 100,000 Fragments!**\n\nAsk me about raid awakening costs, Law raid micro-strategies, or stat resets instead. What's on your mind?`,

    // 29. The Factory Raid Overseer
    `🏭 **Factory Siren: I don't know that one!**\n\nCore Breach averted. I specialize in Blox Fruits trading values, raid timers, and weapon masteries. What in-game topic shall we tackle?`,

    // 30. The Sea King Conqueror
    `👑 **I don't know! That mystery lies uncharted outside our pirate maps.**\n\nWhether you're looking for the top 5 PvP fruits, need advice on Buddha stat distribution, or want to test a trade offer—I'm ready to assist!`,

    // 31. The Colosseum Gladiator
    `🏟️ **I don't know that move! The King Red Head Colosseum crowd is scratching their heads.**\n\nAsk me how to solve the Colosseum plate puzzle to unlock Second Sea, or how to awaken your V2 fighting styles!`,

    // 32. The Dragon Transformation Master
    `🐉 **I don't know! Even with Dragon Form East & West active, that answer eludes me.**\n\nWant to know why Dragon commands 3.5 Billion trade value with a 10/10 demand rating? Ask me about the top mythical fruits!`,

    // 33. The Kitsune Shrine Spirit
    `🦊 **I don't know that! The Azure Flames of Kitsune Shrine burn silent on that topic.**\n\nI can guide you through collecting 20-25 Azure Wisps during the Full Moon, or how to get the Kitsune Ribbon & Lamp!`,

    // 34. The Friendly Shipwright
    `🔨 **I don't know, sailor! My hammer only builds boats and tunes Blox Fruits strategies.**\n\nNeed to know how to build the Beast Hunter ship, or which accessories give the biggest sword damage boosts? Let's talk gear!`,

    // 35. The Pirate Starter Island Veteran
    `🏝️ **I don't know! Even the Bandit Boss on Island 1 hasn't heard of that.**\n\nFrom level 1 Bandit grinding all the way to max level 2800 Submerged Abyss & Tiki Outpost (Update 27.4), I have all the progression secrets. What guide do you need?`,

    // 36. The Friendly Developer Salute
    `✨ **I don't know that one! My creator Nolan (1_solas) programmed me as the ultimate Blox Fruits Sensei.**\n\nTry asking me for a trade calculation, fruit values, boss spawn guides, or click on any of the suggestion chips above to get started!`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Real-time trade evaluation helper for active calculator items
 */
function evaluateCurrentTradeContext(
  yourItems: TradeSideItem[],
  theirItems: TradeSideItem[]
): string {
  const yourTotalVal = yourItems.reduce((acc, i) => {
    const val = i.isPermanent && i.item.permanentValue ? i.item.permanentValue : i.item.physicalValue;
    return acc + val;
  }, 0);

  const theirTotalVal = theirItems.reduce((acc, i) => {
    const val = i.isPermanent && i.item.permanentValue ? i.item.permanentValue : i.item.physicalValue;
    return acc + val;
  }, 0);

  const yourBeli = yourItems.reduce((acc, i) => acc + (i.item.beliPrice || 0), 0);
  const theirBeli = theirItems.reduce((acc, i) => acc + (i.item.beliPrice || 0), 0);

  const yourNames = yourItems.map((i) => `${i.isPermanent ? 'Perm ' : ''}${i.item.name}`);
  const theirNames = theirItems.map((i) => `${i.isPermanent ? 'Perm ' : ''}${i.item.name}`);

  const diff = theirTotalVal - yourTotalVal;
  const diffPct = yourTotalVal > 0 ? (diff / yourTotalVal) * 100 : 0;

  const avgYourDemand = yourItems.length > 0
    ? (yourItems.reduce((acc, i) => acc + (i.item.demand || 5), 0) / yourItems.length).toFixed(1)
    : '0';

  const avgTheirDemand = theirItems.length > 0
    ? (theirItems.reduce((acc, i) => acc + (i.item.demand || 5), 0) / theirItems.length).toFixed(1)
    : '0';

  let verdict = '';
  let advice = '';

  if (diffPct >= 20) {
    verdict = '🔥 **MASSIVE WIN (BIG W)**';
    advice = 'Accept immediately! You are gaining massive surplus market equity (+ ' + formatValueNumber(diff) + ').';
  } else if (diffPct >= 5) {
    verdict = '✅ **PROFITABLE WIN (FAVORABLE W)**';
    advice = 'Solid profit margin. Highly recommended if the items fit your trade inventory.';
  } else if (diffPct >= -5) {
    verdict = '⚖️ **FAIR TRADE (BALANCED EQUALITY)**';
    advice = 'Even economic value exchange. Check demand velocity to ensure you are receiving fast-selling staples.';
  } else if (diffPct >= -18) {
    verdict = '⚠️ **SLIGHT DEFICIT (MINOR L)**';
    advice = 'Ask them to add a high demand staple like Buddha (28M) or Portal (26M) to bridge the gap.';
  } else {
    verdict = '❌ **BIG LOSS (HEAVY L)**';
    advice = 'Do NOT accept! You are overpaying severely by ' + formatValueNumber(Math.abs(diff)) + '. Ask them to add high demand fruits or walk away.';
  }

  // 40% Beli check
  const minBeli = Math.min(yourBeli, theirBeli);
  const maxBeli = Math.max(yourBeli, theirBeli);
  const beliDiffPct = maxBeli > 0 ? ((maxBeli - minBeli) / maxBeli) * 100 : 0;
  const passes40 = beliDiffPct <= 40;

  return `${verdict}\n\n` +
    `• **You Give:** ${yourNames.join(', ') || 'Nothing'} → **${formatValueNumber(yourTotalVal)}** (Avg Demand: ${avgYourDemand}/10)\n` +
    `• **They Give:** ${theirNames.join(', ') || 'Nothing'} → **${formatValueNumber(theirTotalVal)}** (Avg Demand: ${avgTheirDemand}/10)\n` +
    `• **Net Value Difference:** **${diff >= 0 ? '+' : ''}${formatValueNumber(diff)}** (${diffPct >= 0 ? '+' : ''}${diffPct.toFixed(1)}%)\n` +
    `• **40% Beli System Rule:** ${passes40 ? '✅ Allowed in-game' : `⚠️ Exceeds 40% threshold (${beliDiffPct.toFixed(0)}% diff). Add filler fruits like Quake/Love!`}\n\n` +
    `🎯 **Tactical Recommendation:** ${advice}`;
}

export interface TradeAnalysisResult {
  verdictHeadline: string;
  riskRating: 'Low' | 'Moderate' | 'High';
  demandAnalysis: string;
  tacticalStrategy: string;
  dogBladeContext?: string;
  suggestedCounters: string[];
}

/**
 * Handles queries specifically about Mutation Lab, Hybrid Fusions, and Fall Risk Calculations
 */
function detectAndHandleMutationLabQueries(query: string): string | null {
  const clean = query.toLowerCase().trim();
  const isMutationQuery = 
    clean.includes('mutation') || 
    clean.includes('mutations') || 
    clean.includes('mutate') || 
    clean.includes('mutating') || 
    clean.includes('hybrid fruit') || 
    clean.includes('fusion lab') || 
    clean.includes('fall risk') || 
    clean.includes('chance of falling') || 
    clean.includes('mutation lab') || 
    clean.includes('gene splice') || 
    clean.includes('catalyst gacha');

  if (!isMutationQuery) {
    return null;
  }

  return `🧬 **Solas AI Mutation Lab & Fall Risk Analysis Engine:**\n\n` +
    `*Note: Fruit Mutations, Hybrid Fusions, and Fall Risk Calculations are exclusive proprietary features of this app's sandbox and combat arena—they are NOT found on standard Blox Fruits wikis!* My rating and chance of falling engine evaluates every combination based on live moveset damage, cooldown efficiency, Ken-break priorities, and defensive passive coverage.\n\n` +
    `**How I Rate Every Mutation Combination & Chance of Falling:**\n` +
    `1. **Power & DPS Rating (0 - 99%):** Evaluates total moveset damage, Ken-break priority (*True Break* vs *Bypasses Ken*), and equipped passive buffs.\n` +
    `2. **Chance of Falling / Instability Risk (%):** Calculated dynamically based on energy strain, short cooldowns (<3.2s), and defensive passive coverage (Iron Skin, Celestial Shield, Vampiric).\n` +
    `3. **Volatility Verdict:**\n` +
    `   • **Low Risk (< 15%):** Highly stable combat builds with balanced defense.\n` +
    `   • **Moderate Risk (15% - 25%):** Balanced high-damage burst builds.\n` +
    `   • **High Volatility (> 25%):** Massive glass-cannon damage output with high chance of skill collapse in Sea Danger raids.\n\n` +
    `💡 **How to use this in the app:** Head over to the **🎮 Fruit Mutation Game** tab to test your hybrid fusions in real-time, spin catalyst gachas, and view live AI ratings and fall risk breakdowns instantly!`;
}

export function generateLocalTradeBreakdown(
  yourItems: TradeSideItem[],
  theirItems: TradeSideItem[],
  yourTotal: number,
  theirTotal: number,
  verdict: string,
  difference: number
): TradeAnalysisResult {
  const diffPct = yourTotal > 0 ? ((theirTotal - yourTotal) / yourTotal) * 100 : 0;
  const containsDogBlade = [...yourItems, ...theirItems].some((i) => i.item.id === 'dog-blade');
  const containsDragon = [...yourItems, ...theirItems].some((i) => i.item.id.includes('dragon'));
  const containsNotifier = [...yourItems, ...theirItems].some((i) => i.item.id === 'fruit-notifier');

  let headline = '';
  let risk: 'Low' | 'Moderate' | 'High' = 'Moderate';
  let strategy = '';
  const counters: string[] = [];

  if (diffPct >= 20) {
    headline = '🔥 MASSIVE W: Substantial Market Overpay in Your Favor!';
    risk = 'Low';
    strategy = 'Accept immediately. You are gaining significant value and high market leverage.';
  } else if (diffPct >= 5) {
    headline = '✅ PROFITABLE WIN: Favorable Value & Liquidity Surplus';
    risk = 'Low';
    strategy = 'Solid profit margin. Proceed with confidence if these items fit your trading goals.';
  } else if (diffPct >= -5) {
    headline = '⚖️ FAIR TRADE: Well-Balanced Economic Exchange';
    risk = 'Low';
    strategy = 'Fair trade. Check individual demand velocity to ensure you are not trading away faster-moving staples.';
  } else if (diffPct >= -18) {
    headline = '⚠️ SLIGHT DEFICIT: Minor Value Loss';
    risk = 'Moderate';
    strategy = 'Ask them to add a staple fruit (like Buddha, Rumble, or Sound) to bridge the value gap.';
    counters.push('Request adding 1 mid-tier high-demand fruit like Buddha (28M) or Portal (26M).');
  } else {
    headline = '❌ HEAVY L: Severe Overpay / Value Deficit';
    risk = 'High';
    strategy = 'Decline or demand major additions before accepting. You are giving away too much equity.';
    counters.push('Ask for high-tier fruit additions (e.g. Dough, Gas, or T-Rex).');
    counters.push('Remove your highest-value item and replace with a lower tier alternative.');
  }

  const yourAvgDemand =
    yourItems.length > 0
      ? (yourItems.reduce((acc, i) => acc + (i.item.demand || 5), 0) / yourItems.length).toFixed(1)
      : '5.0';
  const theirAvgDemand =
    theirItems.length > 0
      ? (theirItems.reduce((acc, i) => acc + (i.item.demand || 5), 0) / theirItems.length).toFixed(1)
      : '5.0';

  const demandText = `Your offering has an average demand rating of ${yourAvgDemand}/10 vs their offering at ${theirAvgDemand}/10. ${
    Number(theirAvgDemand) >= Number(yourAvgDemand)
      ? 'Demand velocity is in your favor with fast-moving inventory.'
      : 'Careful: You are trading higher-demand liquidity for slower-moving items.'
  }`;

  let eventContext = '';
  if (containsDogBlade) {
    eventContext =
      '🐕 Dog Blade Alert: Limited Mythical sword from August 2026 Doghouse Event (580M, Demand 8/10). Expect strong long-term appreciation.';
  } else if (containsDragon) {
    eventContext =
      '🐉 Dragon Alert: Reworked West (3.5B) & East (3.0B) forms have 10/10 maximum demand and command premium overpays.';
  } else if (containsNotifier) {
    eventContext =
      '👑 Fruit Notifier Alert: Valued at 6.0B Beli points, this is the top gamepass holy grail. Never accept underpays on Notifier.';
  } else {
    eventContext = 'Market values calibrated with latest August 2026 live database.';
  }

  if (counters.length === 0) {
    counters.push('Lock in the trade on the trading table before market sentiment shifts.');
    counters.push(
      'Verify 40% Beli difference in-game; balance with low-value high-Beli fillers (Quake/Love) if necessary.'
    );
  }

  return {
    verdictHeadline: headline,
    riskRating: risk,
    demandAnalysis: demandText,
    tacticalStrategy: strategy,
    dogBladeContext: eventContext,
    suggestedCounters: counters
  };
}
