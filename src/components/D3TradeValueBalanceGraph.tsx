import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TradeSideItem, formatValueNumber } from '../data/bloxFruitsData';
import { soundFX } from '../utils/audio';
import { BarChart3, TrendingUp, TrendingDown, Equal, ShieldCheck, Sparkles, Zap, Info } from 'lucide-react';

interface D3TradeValueBalanceGraphProps {
  yourItems: TradeSideItem[];
  theirItems: TradeSideItem[];
  yourTotalValue: number;
  theirTotalValue: number;
  difference: number;
  verdict: string;
  isWithin40PercentRule: boolean;
  yourTotalBeli: number;
  theirTotalBeli: number;
}

export const D3TradeValueBalanceGraph: React.FC<D3TradeValueBalanceGraphProps> = ({
  yourItems,
  theirItems,
  yourTotalValue,
  theirTotalValue,
  difference,
  verdict,
  isWithin40PercentRule,
  yourTotalBeli,
  theirTotalBeli,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'market-value' | 'beli-price' | 'demand-weight'>('market-value');

  const isWin = verdict.includes('Win');
  const isLoss = verdict.includes('Loss');
  const isFair = verdict === 'Fair';

  // D3 Rendering & Transition effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 600;
    const width = Math.max(320, containerWidth);
    const height = 280;
    const margin = { top: 30, right: 35, bottom: 45, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Setup or retrieve main group
    let g = svg.select<SVGGElement>('g.main-group');
    if (g.empty()) {
      svg.selectAll('*').remove();

      // Definitions: Gradients & Glow Filters
      const defs = svg.append('defs');

      // Cyan Gradient (You Give)
      const gradYou = defs.append('linearGradient')
        .attr('id', 'grad-you-bar')
        .attr('x1', '0%').attr('y1', '100%')
        .attr('x2', '0%').attr('y2', '0%');
      gradYou.append('stop').attr('offset', '0%').attr('stop-color', '#0891b2').attr('stop-opacity', 0.85);
      gradYou.append('stop').attr('offset', '100%').attr('stop-color', '#38bdf8').attr('stop-opacity', 1);

      // Purple Gradient (Them Give)
      const gradThem = defs.append('linearGradient')
        .attr('id', 'grad-them-bar')
        .attr('x1', '0%').attr('y1', '100%')
        .attr('x2', '0%').attr('y2', '0%');
      gradThem.append('stop').attr('offset', '0%').attr('stop-color', '#7e22ce').attr('stop-opacity', 0.85);
      gradThem.append('stop').attr('offset', '100%').attr('stop-color', '#c084fc').attr('stop-opacity', 1);

      // Win Gap Area Gradient (Green)
      const gradWin = defs.append('linearGradient')
        .attr('id', 'grad-win-gap')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      gradWin.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8').attr('stop-opacity', 0.2);
      gradWin.append('stop').attr('offset', '100%').attr('stop-color', '#10b981').attr('stop-opacity', 0.35);

      // Loss Gap Area Gradient (Rose)
      const gradLoss = defs.append('linearGradient')
        .attr('id', 'grad-loss-gap')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      gradLoss.append('stop').attr('offset', '0%').attr('stop-color', '#f43f5e').attr('stop-opacity', 0.35);
      gradLoss.append('stop').attr('offset', '100%').attr('stop-color', '#c084fc').attr('stop-opacity', 0.2);

      // Fair Gap Area Gradient (Amber)
      const gradFair = defs.append('linearGradient')
        .attr('id', 'grad-fair-gap')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '0%');
      gradFair.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8').attr('stop-opacity', 0.15);
      gradFair.append('stop').attr('offset', '100%').attr('stop-color', '#c084fc').attr('stop-opacity', 0.15);

      // Glow Filter
      const filter = defs.append('filter')
        .attr('id', 'd3-glow')
        .attr('x', '-30%').attr('y', '-30%')
        .attr('width', '160%').attr('height', '160%');
      filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
      filter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

      // Grid background group
      svg.append('g').attr('class', 'grid-group').attr('transform', `translate(${margin.left}, ${margin.top})`);
      // Main chart group
      g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${margin.left}, ${margin.top})`);
      // Axes group
      svg.append('g').attr('class', 'x-axis-group').attr('transform', `translate(${margin.left}, ${margin.top + innerHeight})`);
      svg.append('g').attr('class', 'y-axis-group').attr('transform', `translate(${margin.left}, ${margin.top})`);
      // Gap bridge group
      g.append('g').attr('class', 'gap-bridge-group');
      // Balance marker group
      g.append('g').attr('class', 'balance-marker-group');
    }

    // Determine current values based on activeViewMode
    let youVal = yourTotalValue;
    let themVal = theirTotalValue;
    let valFormatter = (v: number) => formatValueNumber(v);

    if (activeViewMode === 'beli-price') {
      youVal = yourTotalBeli;
      themVal = theirTotalBeli;
      valFormatter = (v: number) => `$${(v || 0).toLocaleString()}`;
    } else if (activeViewMode === 'demand-weight') {
      const youDemandTotal = yourItems.reduce((acc, i) => acc + (i.item.demand || 5), 0);
      const themDemandTotal = theirItems.reduce((acc, i) => acc + (i.item.demand || 5), 0);
      youVal = youDemandTotal;
      themVal = themDemandTotal;
      valFormatter = (v: number) => `${v.toFixed(1)} Pts`;
    }

    // Y Scale
    const maxVal = Math.max(1000000, youVal, themVal) * 1.25;
    const yScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([innerHeight, 0])
      .nice();

    // X Scale for the 2 columns
    const xScale = d3.scaleBand()
      .domain(['you', 'them'])
      .range([0, innerWidth])
      .padding(0.48);

    const barWidth = Math.min(80, xScale.bandwidth());
    const xYou = (xScale('you') || 0) + (xScale.bandwidth() - barWidth) / 2;
    const xThem = (xScale('them') || 0) + (xScale.bandwidth() - barWidth) / 2;

    const duration = 650;
    const ease = d3.easeCubicOut;

    // --- 1. RENDER GRID LINES ---
    const gridGroup = svg.select<SVGGElement>('g.grid-group');
    const yTicks = yScale.ticks(5);
    
    const gridLines = gridGroup.selectAll<SVGLineElement, number>('line.grid-line')
      .data(yTicks, (d) => d);

    gridLines.enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', '#334155')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '3 3')
      .attr('opacity', 0)
      .transition().duration(duration).ease(ease)
      .attr('opacity', 0.45);

    gridLines.transition().duration(duration).ease(ease)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('x2', innerWidth)
      .attr('opacity', 0.45);

    gridLines.exit()
      .transition().duration(duration)
      .attr('opacity', 0)
      .remove();

    // --- 2. RENDER Y AXIS ---
    const yAxisGroup = svg.select<SVGGElement>('g.y-axis-group');
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => {
        const num = d as number;
        if (activeViewMode === 'demand-weight') return `${num}`;
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
        return `${num}`;
      });

    yAxisGroup.transition().duration(duration).ease(ease)
      .call(yAxis)
      .call((g) => g.select('.domain').attr('stroke', '#475569'))
      .call((g) => g.selectAll('.tick line').attr('stroke', '#475569'))
      .call((g) => g.selectAll('.tick text').attr('fill', '#94a3b8').attr('font-size', '10px').attr('font-family', 'monospace'));

    // --- 3. RENDER GAP DIVERGENCE BRIDGE AREA ---
    const gapBridgeGroup = g.select<SVGGElement>('g.gap-bridge-group');
    
    // Create trapezoid bridge connecting top of You bar to top of Them bar
    const yYouTop = yScale(youVal);
    const yThemTop = yScale(themVal);

    const bridgePathData = `
      M ${xYou + barWidth} ${innerHeight}
      L ${xYou + barWidth} ${yYouTop}
      C ${xYou + barWidth + (xThem - (xYou + barWidth)) * 0.4} ${yYouTop},
        ${xThem - (xThem - (xYou + barWidth)) * 0.4} ${yThemTop},
        ${xThem} ${yThemTop}
      L ${xThem} ${innerHeight}
      Z
    `;

    const gapFillId = isWin ? 'url(#grad-win-gap)' : isLoss ? 'url(#grad-loss-gap)' : 'url(#grad-fair-gap)';

    let bridgePath = gapBridgeGroup.select<SVGPathElement>('path.gap-bridge');
    if (bridgePath.empty()) {
      bridgePath = gapBridgeGroup.append('path')
        .attr('class', 'gap-bridge')
        .attr('fill', gapFillId)
        .attr('opacity', 0.85);
    }

    bridgePath.transition().duration(duration).ease(ease)
      .attr('d', bridgePathData)
      .attr('fill', gapFillId);

    // Delta curve line at top of bridge
    const curveLineData = `
      M ${xYou + barWidth} ${yYouTop}
      C ${xYou + barWidth + (xThem - (xYou + barWidth)) * 0.4} ${yYouTop},
        ${xThem - (xThem - (xYou + barWidth)) * 0.4} ${yThemTop},
        ${xThem} ${yThemTop}
    `;

    let curveLine = gapBridgeGroup.select<SVGPathElement>('path.gap-curve-line');
    if (curveLine.empty()) {
      curveLine = gapBridgeGroup.append('path')
        .attr('class', 'gap-curve-line')
        .attr('fill', 'none')
        .attr('stroke-width', 2.5)
        .attr('stroke-dasharray', '4 3');
    }

    const curveStroke = isWin ? '#10b981' : isLoss ? '#f43f5e' : '#f59e0b';
    curveLine.transition().duration(duration).ease(ease)
      .attr('d', curveLineData)
      .attr('stroke', curveStroke)
      .attr('filter', 'url(#d3-glow)');

    // --- 4. RENDER BARS (YOU vs THEM) ---
    const barData = [
      { id: 'you', label: 'You Give', val: youVal, x: xYou, fill: 'url(#grad-you-bar)', stroke: '#38bdf8', items: yourItems },
      { id: 'them', label: 'They Give', val: themVal, x: xThem, fill: 'url(#grad-them-bar)', stroke: '#c084fc', items: theirItems },
    ];

    const bars = g.selectAll<SVGRectElement, typeof barData[0]>('rect.side-bar')
      .data(barData, (d) => d.id);

    bars.enter()
      .append('rect')
      .attr('class', 'side-bar cursor-pointer')
      .attr('x', (d) => d.x)
      .attr('y', innerHeight)
      .attr('width', barWidth)
      .attr('height', 0)
      .attr('rx', 8)
      .attr('fill', (d) => d.fill)
      .attr('stroke', (d) => d.stroke)
      .attr('stroke-width', 1.5)
      .on('mouseenter', (event, d) => {
        soundFX.playPop();
        if (!tooltipRef.current) return;
        const tt = tooltipRef.current;
        tt.style.opacity = '1';
        tt.innerHTML = `
          <div class="font-bold text-xs ${d.id === 'you' ? 'text-cyan-400' : 'text-purple-400'}">${d.label}</div>
          <div class="text-sm font-extrabold text-white my-0.5">${valFormatter(d.val)}</div>
          <div class="text-[10px] text-slate-400">${d.items.length} item${d.items.length === 1 ? '' : 's'} included</div>
        `;
      })
      .on('mousemove', (event) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top - 45;
        tooltipRef.current.style.left = `${x}px`;
        tooltipRef.current.style.top = `${y}px`;
      })
      .on('mouseleave', () => {
        if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
      })
      .transition().duration(duration).ease(ease)
      .attr('y', (d) => yScale(d.val))
      .attr('height', (d) => Math.max(0, innerHeight - yScale(d.val)));

    bars.transition().duration(duration).ease(ease)
      .attr('x', (d) => d.x)
      .attr('y', (d) => yScale(d.val))
      .attr('width', barWidth)
      .attr('height', (d) => Math.max(0, innerHeight - yScale(d.val)))
      .attr('fill', (d) => d.fill)
      .attr('stroke', (d) => d.stroke);

    // Bar Value Header Labels
    const valLabels = g.selectAll<SVGTextElement, typeof barData[0]>('text.bar-val-label')
      .data(barData, (d) => d.id);

    valLabels.enter()
      .append('text')
      .attr('class', 'bar-val-label font-mono font-bold text-xs')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => d.x + barWidth / 2)
      .attr('y', innerHeight)
      .attr('fill', (d) => (d.id === 'you' ? '#38bdf8' : '#c084fc'))
      .text((d) => valFormatter(d.val))
      .transition().duration(duration).ease(ease)
      .attr('y', (d) => yScale(d.val) - 8);

    valLabels.transition().duration(duration).ease(ease)
      .attr('x', (d) => d.x + barWidth / 2)
      .attr('y', (d) => yScale(d.val) - 8)
      .attr('fill', (d) => (d.id === 'you' ? '#38bdf8' : '#c084fc'))
      .text((d) => valFormatter(d.val));

    // --- 5. RENDER GAP DIFFERENCE BADGE AT CENTER ---
    const balanceMarkerGroup = g.select<SVGGElement>('g.balance-marker-group');
    const centerX = (xYou + barWidth + xThem) / 2;
    const centerY = (yYouTop + yThemTop) / 2;

    const diffVal = themVal - youVal;
    const diffFormatted = diffVal >= 0 ? `+${valFormatter(diffVal)}` : `-${valFormatter(Math.abs(diffVal))}`;

    let centerBadge = balanceMarkerGroup.select<SVGGElement>('g.center-badge');
    if (centerBadge.empty()) {
      centerBadge = balanceMarkerGroup.append('g').attr('class', 'center-badge');
      centerBadge.append('rect')
        .attr('class', 'badge-bg')
        .attr('rx', 12)
        .attr('stroke-width', 1.2)
        .attr('height', 24);
      centerBadge.append('text')
        .attr('class', 'badge-text font-mono font-black text-[11px]')
        .attr('text-anchor', 'middle')
        .attr('dy', 16);
    }

    const badgeWidth = Math.max(70, diffFormatted.length * 8 + 20);
    const badgeStroke = isWin ? '#10b981' : isLoss ? '#f43f5e' : '#f59e0b';
    const badgeFill = isWin ? '#064e3b' : isLoss ? '#4c0519' : '#451a03';

    centerBadge.transition().duration(duration).ease(ease)
      .attr('transform', `translate(${centerX - badgeWidth / 2}, ${Math.max(10, Math.min(innerHeight - 30, centerY - 12))})`);

    centerBadge.select('rect.badge-bg')
      .transition().duration(duration).ease(ease)
      .attr('width', badgeWidth)
      .attr('fill', badgeFill)
      .attr('stroke', badgeStroke)
      .attr('filter', 'url(#d3-glow)');

    centerBadge.select('text.badge-text')
      .transition().duration(duration).ease(ease)
      .attr('dx', badgeWidth / 2)
      .attr('fill', '#ffffff')
      .text(diffFormatted);

    // --- 6. RENDER X-AXIS LABELS ---
    const xAxisGroup = svg.select<SVGGElement>('g.x-axis-group');
    const xLabels = xAxisGroup.selectAll<SVGTextElement, typeof barData[0]>('text.x-axis-col-label')
      .data(barData, (d) => d.id);

    xLabels.enter()
      .append('text')
      .attr('class', 'x-axis-col-label font-bold text-xs')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => d.x + barWidth / 2)
      .attr('y', 24)
      .attr('fill', (d) => (d.id === 'you' ? '#38bdf8' : '#c084fc'))
      .text((d) => (d.id === 'you' ? '👤 You Offer' : '👥 Their Offer'));

    xLabels.transition().duration(duration).ease(ease)
      .attr('x', (d) => d.x + barWidth / 2)
      .attr('fill', (d) => (d.id === 'you' ? '#38bdf8' : '#c084fc'));

  }, [yourItems, theirItems, yourTotalValue, theirTotalValue, difference, verdict, activeViewMode, yourTotalBeli, theirTotalBeli]);

  return (
    <div
      id="d3-trade-value-balance-graph"
      ref={containerRef}
      className="relative rounded-3xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.2),transparent_70%)]" />

      {/* Header bar with controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white tracking-wider uppercase">
                D3 Trade Value Balance Graph
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Live D3 Vector
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Visualizing the market value gap & divergence curve with reactive transition physics
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            id="d3-view-market-value"
            onClick={() => {
              soundFX.playPop();
              setActiveViewMode('market-value');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeViewMode === 'market-value'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Value
          </button>
          <button
            id="d3-view-beli-price"
            onClick={() => {
              soundFX.playPop();
              setActiveViewMode('beli-price');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeViewMode === 'beli-price'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Beli Price
          </button>
          <button
            id="d3-view-demand-weight"
            onClick={() => {
              soundFX.playPop();
              setActiveViewMode('demand-weight');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeViewMode === 'demand-weight'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Demand Score
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[280px] my-2 select-none">
        <svg
          ref={svgRef}
          className="w-full h-full overflow-visible"
        />

        {/* Dynamic HTML Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none -translate-x-1/2 p-2.5 rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-md transition-opacity duration-150 z-30 opacity-0 text-left min-w-[120px]"
        />
      </div>

      {/* Footer Metrics & Gap Analysis Bar */}
      <div className="relative z-10 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black border uppercase flex items-center gap-1.5 ${
              isWin
                ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
                : isLoss
                ? 'text-rose-400 border-rose-500/40 bg-rose-950/40'
                : 'text-amber-400 border-amber-500/40 bg-amber-950/40'
            }`}
          >
            {isWin ? <TrendingUp className="w-3.5 h-3.5" /> : isLoss ? <TrendingDown className="w-3.5 h-3.5" /> : <Equal className="w-3.5 h-3.5" />}
            {verdict}
          </span>
          <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">
            {difference > 0
              ? `You gain +${formatValueNumber(difference)} in market equity`
              : difference < 0
              ? `You concede ${formatValueNumber(Math.abs(difference))} in value gap`
              : 'Equal market trade equilibrium'}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>In-Game 40% Rule:</span>
            <span className={isWithin40PercentRule ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {isWithin40PercentRule ? 'PASSED' : 'BLOCKED'}
            </span>
          </div>
          <div className="text-slate-500">|</div>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Gap Ratio:</span>
            <span className="text-cyan-400 font-black">
              {Math.round((theirTotalValue / Math.max(1, yourTotalValue)) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
