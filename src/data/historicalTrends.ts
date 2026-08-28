export interface TrendEvent {
  date: string;
  title: string;
  description: string;
  impact: 'bullish' | 'bearish' | 'neutral' | 'game-changer';
}

export interface HistoricalDataPoint {
  date: string;
  displayDate: string;
  timestamp: number;
  eventNote?: string;
  // Key items tracked
  'fruit-notifier': number;
  'dragon-west': number;
  'dragon-east': number;
  'dog-blade': number;
  'kitsune': number;
  'gas': number;
  'tiger': number;
  'yeti': number;
  'dough': number;
  'buddha': number;
  'portal': number;
  'dark-blade': number;
}

export const DOG_BLADE_UPDATE_EVENTS: TrendEvent[] = [
  {
    date: '2026-07-25',
    title: 'Doghouse Event Teased',
    description: 'Dev sneak peeks reveal the limited-time Doghouse Boss Raid and exclusive Mythical Dog Blade.',
    impact: 'neutral'
  },
  {
    date: '2026-08-01',
    title: 'Dog Blade & Doghouse Event Launch',
    description: 'Official update drops. Dog Blade opens trading at 450M. Mass trade volume floods Sea 3 servers.',
    impact: 'game-changer'
  },
  {
    date: '2026-08-05',
    title: 'Dog Blade PvP Meta Established',
    description: 'Tantrum Mode invincibility combos discovered. Dog Blade surges to 540M as competitive crew wars adopt it.',
    impact: 'bullish'
  },
  {
    date: '2026-08-08',
    title: 'High-Tier Market Reshuffle',
    description: 'Dragon West skyrockets to 3.5B and East to 3.0B. Fruit Notifier consolidates as holy grail at 6.0B.',
    impact: 'bullish'
  },
  {
    date: '2026-08-12',
    title: 'Event End Countdown Notice',
    description: 'Notice that Dog Blade will become unobtainable after August creates heavy collector accumulation at 580M.',
    impact: 'bullish'
  },
  {
    date: '2026-08-15',
    title: 'Current Live Dog Blade Index',
    description: 'Dog Blade solidifies at 580M (8/10 Demand), Fruit Notifier at 6B, and Dragon West at 3.5B.',
    impact: 'game-changer'
  }
];

export const HISTORICAL_TRENDS_DATA: HistoricalDataPoint[] = [
  {
    date: '2026-05-15',
    displayDate: 'May 15',
    timestamp: new Date('2026-05-15').getTime(),
    'fruit-notifier': 3800000000,
    'dragon-west': 1200000000,
    'dragon-east': 1000000000,
    'dog-blade': 0,
    'kitsune': 550000000,
    'gas': 180000000,
    'tiger': 150000000,
    'yeti': 140000000,
    'dough': 85000000,
    'buddha': 24000000,
    'portal': 22000000,
    'dark-blade': 420000000
  },
  {
    date: '2026-06-01',
    displayDate: 'Jun 1',
    timestamp: new Date('2026-06-01').getTime(),
    'fruit-notifier': 4100000000,
    'dragon-west': 1350000000,
    'dragon-east': 1100000000,
    'dog-blade': 0,
    'kitsune': 580000000,
    'gas': 190000000,
    'tiger': 160000000,
    'yeti': 150000000,
    'dough': 88000000,
    'buddha': 25000000,
    'portal': 23000000,
    'dark-blade': 430000000
  },
  {
    date: '2026-06-15',
    displayDate: 'Jun 15',
    timestamp: new Date('2026-06-15').getTime(),
    'fruit-notifier': 4400000000,
    'dragon-west': 1600000000,
    'dragon-east': 1300000000,
    'dog-blade': 0,
    'kitsune': 600000000,
    'gas': 200000000,
    'tiger': 170000000,
    'yeti': 155000000,
    'dough': 90000000,
    'buddha': 25000000,
    'portal': 24000000,
    'dark-blade': 440000000
  },
  {
    date: '2026-07-01',
    displayDate: 'Jul 1',
    timestamp: new Date('2026-07-01').getTime(),
    'fruit-notifier': 4800000000,
    'dragon-west': 1900000000,
    'dragon-east': 1600000000,
    'dog-blade': 0,
    'kitsune': 610000000,
    'gas': 210000000,
    'tiger': 175000000,
    'yeti': 160000000,
    'dough': 92000000,
    'buddha': 26000000,
    'portal': 24500000,
    'dark-blade': 450000000
  },
  {
    date: '2026-07-15',
    displayDate: 'Jul 15',
    timestamp: new Date('2026-07-15').getTime(),
    'fruit-notifier': 5100000000,
    'dragon-west': 2200000000,
    'dragon-east': 1900000000,
    'dog-blade': 0,
    'kitsune': 620000000,
    'gas': 220000000,
    'tiger': 180000000,
    'yeti': 165000000,
    'dough': 93000000,
    'buddha': 26500000,
    'portal': 25000000,
    'dark-blade': 455000000
  },
  {
    date: '2026-07-25',
    displayDate: 'Jul 25',
    timestamp: new Date('2026-07-25').getTime(),
    eventNote: 'Doghouse Event Teased',
    'fruit-notifier': 5300000000,
    'dragon-west': 2500000000,
    'dragon-east': 2100000000,
    'dog-blade': 0,
    'kitsune': 625000000,
    'gas': 225000000,
    'tiger': 182000000,
    'yeti': 168000000,
    'dough': 94000000,
    'buddha': 27000000,
    'portal': 25000000,
    'dark-blade': 460000000
  },
  {
    date: '2026-08-01',
    displayDate: 'Aug 1',
    timestamp: new Date('2026-08-01').getTime(),
    eventNote: '🐶 Dog Blade Release',
    'fruit-notifier': 5500000000,
    'dragon-west': 2800000000,
    'dragon-east': 2400000000,
    'dog-blade': 450000000,
    'kitsune': 630000000,
    'gas': 230000000,
    'tiger': 185000000,
    'yeti': 170000000,
    'dough': 95000000,
    'buddha': 27500000,
    'portal': 25500000,
    'dark-blade': 465000000
  },
  {
    date: '2026-08-03',
    displayDate: 'Aug 3',
    timestamp: new Date('2026-08-03').getTime(),
    'fruit-notifier': 5650000000,
    'dragon-west': 3000000000,
    'dragon-east': 2600000000,
    'dog-blade': 490000000,
    'kitsune': 635000000,
    'gas': 235000000,
    'tiger': 186000000,
    'yeti': 171000000,
    'dough': 95000000,
    'buddha': 27800000,
    'portal': 25800000,
    'dark-blade': 468000000
  },
  {
    date: '2026-08-05',
    displayDate: 'Aug 5',
    timestamp: new Date('2026-08-05').getTime(),
    eventNote: 'Tantrum Mode Meta',
    'fruit-notifier': 5800000000,
    'dragon-west': 3200000000,
    'dragon-east': 2750000000,
    'dog-blade': 540000000,
    'kitsune': 638000000,
    'gas': 238000000,
    'tiger': 188000000,
    'yeti': 172000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  },
  {
    date: '2026-08-08',
    displayDate: 'Aug 8',
    timestamp: new Date('2026-08-08').getTime(),
    eventNote: '⚡ Dragon & Notifier Surge',
    'fruit-notifier': 6000000000,
    'dragon-west': 3500000000,
    'dragon-east': 3000000000,
    'dog-blade': 560000000,
    'kitsune': 640000000,
    'gas': 240000000,
    'tiger': 190000000,
    'yeti': 174000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  },
  {
    date: '2026-08-10',
    displayDate: 'Aug 10',
    timestamp: new Date('2026-08-10').getTime(),
    'fruit-notifier': 6000000000,
    'dragon-west': 3500000000,
    'dragon-east': 3000000000,
    'dog-blade': 570000000,
    'kitsune': 640000000,
    'gas': 240000000,
    'tiger': 190000000,
    'yeti': 175000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  },
  {
    date: '2026-08-12',
    displayDate: 'Aug 12',
    timestamp: new Date('2026-08-12').getTime(),
    eventNote: 'Limited Timer Countdown',
    'fruit-notifier': 6000000000,
    'dragon-west': 3500000000,
    'dragon-east': 3000000000,
    'dog-blade': 578000000,
    'kitsune': 640000000,
    'gas': 240000000,
    'tiger': 190000000,
    'yeti': 175000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  },
  {
    date: '2026-08-14',
    displayDate: 'Aug 14',
    timestamp: new Date('2026-08-14').getTime(),
    'fruit-notifier': 6000000000,
    'dragon-west': 3500000000,
    'dragon-east': 3000000000,
    'dog-blade': 580000000,
    'kitsune': 640000000,
    'gas': 240000000,
    'tiger': 190000000,
    'yeti': 175000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  },
  {
    date: '2026-08-15',
    displayDate: 'Today (Live)',
    timestamp: new Date('2026-08-15').getTime(),
    eventNote: '🔥 Active Dog Blade Benchmark',
    'fruit-notifier': 6000000000,
    'dragon-west': 3500000000,
    'dragon-east': 3000000000,
    'dog-blade': 580000000,
    'kitsune': 640000000,
    'gas': 240000000,
    'tiger': 190000000,
    'yeti': 175000000,
    'dough': 95000000,
    'buddha': 28000000,
    'portal': 26000000,
    'dark-blade': 470000000
  }
];

export const TRACKED_SERIES = [
  { id: 'fruit-notifier', name: 'Fruit Notifier', color: '#10b981', emoji: '📡' },
  { id: 'dragon-west', name: 'Dragon (West)', color: '#ef4444', emoji: '🐉' },
  { id: 'dragon-east', name: 'Dragon (East)', color: '#f97316', emoji: '🐲' },
  { id: 'dog-blade', name: 'Dog Blade', color: '#38bdf8', emoji: '🐶' },
  { id: 'kitsune', name: 'Kitsune', color: '#06b6d4', emoji: '🦊' },
  { id: 'dark-blade', name: 'Dark Blade (Yoru)', color: '#22c55e', emoji: '⚔️' },
  { id: 'gas', name: 'Gas Fruit', color: '#84cc16', emoji: '☁️' },
  { id: 'tiger', name: 'Tiger Fruit', color: '#e11d48', emoji: '🐅' },
  { id: 'dough', name: 'Dough', color: '#f59e0b', emoji: '🍩' },
  { id: 'buddha', name: 'Buddha', color: '#eab308', emoji: '🧘' },
  { id: 'portal', name: 'Portal', color: '#3b82f6', emoji: '🚪' }
];

export function filterHistoricalData(
  range: '7d' | '14d' | '30d' | '90d' | 'all' | 'custom',
  customStartDate?: string,
  customEndDate?: string
): HistoricalDataPoint[] {
  const now = new Date('2026-08-15').getTime();
  
  if (range === 'custom' && customStartDate && customEndDate) {
    const start = new Date(customStartDate).getTime();
    const end = new Date(customEndDate).getTime() + 86400000;
    return HISTORICAL_TRENDS_DATA.filter((p) => p.timestamp >= start && p.timestamp <= end);
  }

  let daysBack = 90;
  if (range === '7d') daysBack = 7;
  else if (range === '14d') daysBack = 14;
  else if (range === '30d') daysBack = 30;
  else if (range === '90d') daysBack = 90;
  else if (range === 'all') return HISTORICAL_TRENDS_DATA;

  const cutoff = now - daysBack * 24 * 60 * 60 * 1000;
  return HISTORICAL_TRENDS_DATA.filter((p) => p.timestamp >= cutoff);
}
