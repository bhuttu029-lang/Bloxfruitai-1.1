import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  HISTORICAL_TRENDS_DATA,
  TRACKED_SERIES,
  DOG_BLADE_UPDATE_EVENTS,
  filterHistoricalData,
  HistoricalDataPoint,
} from '../data/historicalTrends';
import { formatValueNumber } from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';
import {
  TrendingUp,
  Calendar,
  Flame,
  Sparkles,
  Info,
  CheckSquare,
  Square,
  RotateCcw,
  Zap,
  ArrowUpRight,
  Shield,
  Layers
} from 'lucide-react';

export const FruitTrendsChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '14d' | '30d' | '90d' | 'all' | 'custom'>('30d');
  const [customStart, setCustomStart] = useState<string>('2026-07-20');
  const [customEnd, setCustomEnd] = useState<string>('2026-08-15');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const [isLogScale, setIsLogScale] = useState<boolean>(false);

  // Selected series to display (defaults to top tier and Dog Blade update fruits)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'fruit-notifier',
    'dragon-west',
    'dragon-east',
    'dog-blade',
    'kitsune',
  ]);

  // Primary inspected item for the deep-dive stat banner
  const [inspectedId, setInspectedId] = useState<string>('dragon-west');

  const filteredData = useMemo(() => {
    return filterHistoricalData(dateRange, customStart, customEnd);
  }, [dateRange, customStart, customEnd]);

  // Toggle series on/off
  const toggleSeries = (id: string) => {
    soundFX.playPop();
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Quick Preset Handlers
  const applyPreset = (preset: 'holy-grails' | 'dogblade-ecosystem' | 'mythicals' | 'gamepass-swords') => {
    soundFX.playPop();
    if (preset === 'holy-grails') {
      setSelectedIds(['fruit-notifier', 'dragon-west', 'dragon-east', 'dog-blade']);
      setInspectedId('fruit-notifier');
    } else if (preset === 'dogblade-ecosystem') {
      setSelectedIds(['dog-blade', 'dark-blade', 'kitsune', 'dragon-west']);
      setInspectedId('dog-blade');
    } else if (preset === 'mythicals') {
      setSelectedIds(['dragon-west', 'dragon-east', 'kitsune', 'gas', 'tiger', 'dough']);
      setInspectedId('dragon-west');
    } else if (preset === 'gamepass-swords') {
      setSelectedIds(['fruit-notifier', 'dark-blade', 'dog-blade', 'buddha', 'portal']);
      setInspectedId('fruit-notifier');
    }
  };

  // Compute summary stats for the inspected fruit
  const inspectedStats = useMemo(() => {
    const seriesMeta = TRACKED_SERIES.find((s) => s.id === inspectedId) || TRACKED_SERIES[0];
    if (filteredData.length === 0) return null;

    const values = filteredData.map((d) => (d as any)[inspectedId] as number).filter((v) => v > 0);
    if (values.length === 0) return null;

    const currentVal = values[values.length - 1];
    const initialVal = values[0];
    const highVal = Math.max(...values);
    const lowVal = Math.min(...values);

    const changeDiff = currentVal - initialVal;
    const changePct = initialVal > 0 ? (changeDiff / initialVal) * 100 : 0;

    // Price change specifically since Dog Blade Release (Aug 1, 2026)
    const aug1Point = HISTORICAL_TRENDS_DATA.find((p) => p.date === '2026-08-01');
    const aug1Val = aug1Point ? (aug1Point as any)[inspectedId] as number : initialVal;
    const dogBladeImpactPct = aug1Val > 0 ? ((currentVal - aug1Val) / aug1Val) * 100 : 0;

    return {
      meta: seriesMeta,
      currentVal,
      highVal,
      lowVal,
      changeDiff,
      changePct,
      dogBladeImpactPct,
    };
  }, [inspectedId, filteredData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0]?.payload as HistoricalDataPoint;
      return (
        <div className="rounded-2xl bg-slate-950/95 border border-slate-700 p-4 shadow-2xl backdrop-blur-xl text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-extrabold text-white">{dataPoint.displayDate} ({dataPoint.date})</span>
            {dataPoint.eventNote && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {dataPoint.eventNote}
              </span>
            )}
          </div>
          <div className="space-y-1 pt-1">
            {payload.map((entry: any) => {
              const series = TRACKED_SERIES.find((s) => s.id === entry.dataKey);
              return (
                <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="font-medium text-slate-200">
                      {series?.emoji} {series?.name || entry.dataKey}:
                    </span>
                  </div>
                  <span className="font-mono font-bold text-white">
                    {formatValueNumber(entry.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="historical-trends-container" className="space-y-6">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Dog Blade Market Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                August 2026 Index
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
              Historical Fruit & Item Value Trends
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Track value trajectories before and after the <strong className="text-cyan-300">Dog Blade & Doghouse Event</strong> update. Analyze market shifts including <strong className="text-emerald-400">Fruit Notifier (6B)</strong>, <strong className="text-red-400">Dragon West (3.5B)</strong>, and <strong className="text-orange-400">Dragon East (3B)</strong>.
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            {(['7d', '14d', '30d', '90d', 'all', 'custom'] as const).map((range) => (
              <button
                key={range}
                id={`date-range-btn-${range}`}
                onClick={() => {
                  soundFX.playPop();
                  setDateRange(range);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all ${
                  dateRange === range
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === '7d'
                  ? '7 Days'
                  : range === '14d'
                  ? '14 Days'
                  : range === '30d'
                  ? '30 Days'
                  : range === '90d'
                  ? '3 Months'
                  : range === 'all'
                  ? 'All Time'
                  : 'Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Pickers (if custom selected) */}
        {dateRange === 'custom' && (
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 animate-fade-in text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" /> Date Range:
            </span>
            <div className="flex items-center gap-2">
              <label className="text-slate-400">From:</label>
              <input
                id="custom-date-start"
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-slate-400">To:</label>
              <input
                id="custom-date-end"
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Quick Presets & Chart Style Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Quick Presets:</span>
            <button
              id="preset-grails-btn"
              onClick={() => applyPreset('holy-grails')}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              👑 Top Holy Grails (6B Notifier / 3.5B Dragon / Dog Blade)
            </button>
            <button
              id="preset-dogblade-btn"
              onClick={() => applyPreset('dogblade-ecosystem')}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors flex items-center gap-1"
            >
              🐶 Dog Blade & Swords Meta
            </button>
            <button
              id="preset-mythicals-btn"
              onClick={() => applyPreset('mythicals')}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 transition-colors"
            >
              🔥 Mythical Fruits
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="toggle-chart-type"
              onClick={() => {
                soundFX.playPop();
                setChartType((prev) => (prev === 'area' ? 'line' : 'area'));
              }}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{chartType === 'area' ? 'Area Fill' : 'Clean Line'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Deep-Dive Highlight Banner for Inspected Item */}
      {inspectedStats && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <span>{inspectedStats.meta.emoji} Current Index ({inspectedStats.meta.name})</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">
              {formatValueNumber(inspectedStats.currentVal)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Verified Trading Floor</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Range Performance</div>
            <div
              className={`text-base sm:text-lg font-black flex items-center gap-1 mt-0.5 ${
                inspectedStats.changeDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <ArrowUpRight className={`w-4 h-4 ${inspectedStats.changeDiff < 0 ? 'rotate-90' : ''}`} />
              <span>{inspectedStats.changeDiff >= 0 ? '+' : ''}{inspectedStats.changePct.toFixed(1)}%</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {inspectedStats.changeDiff >= 0 ? '+' : ''}{formatValueNumber(inspectedStats.changeDiff)} over period
            </div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Dog Blade Update Impact</span>
            </div>
            <div className="text-base sm:text-lg font-black text-amber-300 mt-0.5">
              +{inspectedStats.dogBladeImpactPct.toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Post Aug 1 Doghouse launch</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-semibold">Period Range Bounds</div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
              Low: <span className="text-slate-400">{formatValueNumber(inspectedStats.lowVal)}</span> • High: <span className="text-cyan-300">{formatValueNumber(inspectedStats.highVal)}</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Demand Rating: 10/10 Peak</div>
          </div>
        </div>
      )}

      {/* Main Interactive Chart Canvas */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-white">Value Trajectory Graph</h3>
            <span className="text-xs text-slate-400">({filteredData.length} timeline sample points)</span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Real-time values calibrated for August 2026 meta</span>
          </div>
        </div>

        {/* The Recharts Graph */}
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {TRACKED_SERIES.map((s) => (
                    <linearGradient key={s.id} id={`gradient-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => formatValueNumber(v)}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  x="Aug 1"
                  stroke="#38bdf8"
                  strokeDasharray="4 4"
                  label={{
                    value: '🐶 Dog Blade Launch',
                    position: 'top',
                    fill: '#38bdf8',
                    fontSize: 10,
                    fontWeight: 700
                  }}
                />
                {selectedIds.map((id, idx) => {
                  const series = TRACKED_SERIES.find((s) => s.id === id);
                  if (!series) return null;
                  return (
                    <Area
                      key={`${id}-${idx}`}
                      type="monotone"
                      dataKey={id}
                      stroke={series.color}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill={`url(#gradient-${id})`}
                      name={series.name}
                    />
                  );
                })}
              </AreaChart>
            ) : (
              <LineChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="displayDate"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => formatValueNumber(v)}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  x="Aug 1"
                  stroke="#38bdf8"
                  strokeDasharray="4 4"
                  label={{
                    value: '🐶 Dog Blade Launch',
                    position: 'top',
                    fill: '#38bdf8',
                    fontSize: 10,
                    fontWeight: 700
                  }}
                />
                {selectedIds.map((id, idx) => {
                  const series = TRACKED_SERIES.find((s) => s.id === id);
                  if (!series) return null;
                  return (
                    <Line
                      key={`${id}-${idx}`}
                      type="monotone"
                      dataKey={id}
                      stroke={series.color}
                      strokeWidth={3}
                      dot={{ r: 3, fill: series.color }}
                      activeDot={{ r: 6 }}
                      name={series.name}
                    />
                  );
                })}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Multi-Item Toggle Selector Chips */}
        <div className="pt-4 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>Toggle Fruits & Items on Chart ({selectedIds.length} active):</span>
            <span className="text-[11px] text-slate-500">Click name to inspect stats</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRACKED_SERIES.map((series) => {
              const isSelected = selectedIds.includes(series.id);
              const isInspected = inspectedId === series.id;

              return (
                <div
                  key={series.id}
                  id={`series-chip-${series.id}`}
                  className={`flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-950 border-slate-700 text-white shadow'
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
                  } ${isInspected ? 'ring-2 ring-cyan-400/80' : ''}`}
                  onClick={() => {
                    setInspectedId(series.id);
                    if (!isSelected) toggleSeries(series.id);
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSeries(series.id);
                    }}
                    className="p-0.5 hover:opacity-80"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5" style={{ color: series.color }} />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: series.color }}
                  />
                  <span>{series.emoji} {series.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Milestones & Dog Blade Update Timeline Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <span>🐕 Dog Blade Update Timeline & Market Milestones</span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
            Key Economic Shifts
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {DOG_BLADE_UPDATE_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold">{event.date}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                    event.impact === 'game-changer'
                      ? 'bg-red-500 text-white'
                      : event.impact === 'bullish'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {event.impact}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">{event.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
