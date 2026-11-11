import React, { useState } from "react";
import {
  MARKET_GROWTH_DATA,
  YOUTUBE_WEEKLY_SHORTS,
  SUBSCRIPTION_CHURN_CURVE,
  BUDGET_ITEMS,
} from "../data/briefData";

/* 1. Redseer India Market J-Curve (Monthly Revenue Cr + Daily Episodes Watched Mn) */
export function MarketJCurveChart() {
  const [hoverIdx, setHoverIdx] = useState(5);
  const width = 540;
  const height = 220;
  const padL = 50;
  const padR = 56;
  const padT = 24;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const maxRev = 420;
  const maxEps = 900;

  const points = MARKET_GROWTH_DATA.map((d, i) => {
    const x = padL + (i / (MARKET_GROWTH_DATA.length - 1)) * innerW;
    const yRev = padT + innerH - (d.revCr / maxRev) * innerH;
    const barH = (d.dailyEpsMn / maxEps) * innerH;
    const yEps = padT + innerH - barH;
    return { ...d, x, yRev, yEps, barH };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.yRev.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${padT + innerH} L${points[0].x.toFixed(1)},${padT + innerH} Z`;

  const active = points[hoverIdx] || points[points.length - 1];

  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <div>
          <div className="chart-kicker">Redseer India Tracker (2025 - 2026)</div>
          <h4 className="chart-title">India Micro-Drama Revenue &amp; Daily Views J-Curve</h4>
        </div>
        <div className="chart-readout">
          <span className="pill-red">{active.period}: ₹{active.revCr} Cr/mo</span>
          <span className="pill-muted">{active.dailyEpsMn}M eps/day</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart" role="img" aria-label="India microdrama market growth chart">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E50914" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#E50914" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((t, idx) => {
          const y = padT + innerH - t * innerH;
          return (
            <g key={idx}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
              <text x={padL - 16} y={y + 4} textAnchor="end" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono">
                ₹{Math.round(t * maxRev)}Cr
              </text>
              <text x={width - padR + 18} y={y + 4} textAnchor="start" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono">
                {Math.round(t * maxEps)}M
              </text>
            </g>
          );
        })}

        {/* Bars: Daily Episodes Watched */}
        {points.map((p, i) => (
          <rect
            key={p.period}
            x={p.x - 14}
            y={p.yEps}
            width={28}
            height={p.barH}
            rx={4}
            fill={hoverIdx === i ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)"}
            onMouseEnter={() => setHoverIdx(i)}
            style={{ cursor: "pointer" }}
          />
        ))}

        {/* Area & Line: Monthly Revenue */}
        <path d={areaPath} fill="url(#revGrad)" pointerEvents="none" />
        <path d={linePath} fill="none" stroke="#E50914" strokeWidth="2.5" pointerEvents="none" />

        {points.map((p, i) => (
          <g key={p.period} onMouseEnter={() => setHoverIdx(i)} style={{ cursor: "pointer" }}>
            <circle
              cx={p.x}
              cy={p.yRev}
              r={hoverIdx === i ? 5.5 : 3.5}
              fill={hoverIdx === i ? "#fff" : "#E50914"}
              stroke="#E50914"
              strokeWidth="2"
            />
            <text x={p.x} y={height - 10} textAnchor="middle" fill={hoverIdx === i ? "#f5f5f7" : "#8e8e98"} fontSize="10.5" fontFamily="JetBrains Mono">
              {p.period}
            </text>
          </g>
        ))}
      </svg>

      <div className="chart-legend">
        <span><i className="dot dot-red" /> Monthly Industry Revenue (₹ Cr, Left Axis)</span>
        <span><i className="dot dot-gray" /> Daily Episodes Watched (Millions, Right Axis)</span>
      </div>
    </div>
  );
}

/* 2. @motion-x-2025 Weekly YouTube Signal Chart */
export function YoutubeSignalChart() {
  const maxViews = 1490;
  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <div>
          <div className="chart-kicker">Own Channel Telemetry · Oct 29 - Nov 11, 2026</div>
          <h4 className="chart-title">@motion-x-2025 Shorts: Indian Mythic vs Western Sci-Fi</h4>
        </div>
        <span className="pill-red">38.2x Outperformance</span>
      </div>

      <div className="hbar-list">
        {YOUTUBE_WEEKLY_SHORTS.map((item) => {
          const pct = Math.max(2.5, (item.views / maxViews) * 100);
          return (
            <div className="hbar-row" key={item.title}>
              <div className="hbar-meta">
                <div className="hbar-title">{item.title}</div>
                <div className="hbar-sub">{item.meta}</div>
              </div>
              <div className="hbar-track">
                <div
                  className={`hbar-fill tier-${item.tier}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="hbar-val">
                {item.views.toLocaleString("en-IN")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 3. Redseer Subscription Churn Decay vs 1-Tap UPI Preference */
export function ChurnVsUpiChart() {
  const width = 500;
  const height = 190;
  const padL = 46;
  const padR = 22;
  const padT = 24;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const pts = SUBSCRIPTION_CHURN_CURVE.map((d, i) => ({
    ...d,
    x: padL + (i / (SUBSCRIPTION_CHURN_CURVE.length - 1)) * innerW,
    y: padT + innerH - (d.retained / 100) * innerH,
  }));

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <div>
          <div className="chart-kicker">Redseer Churn Study (Oct 2026)</div>
          <h4 className="chart-title">Why Monthly Subscriptions Bleed (75% Churn by M6)</h4>
        </div>
        <span className="pill-green">65%+ Prefer Free + 1-Time Pass</span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart" role="img" aria-label="Subscription retention decay curve">
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padT + innerH - (v / 100) * innerH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={padL - 6} y={y + 3.5} textAnchor="end" fill="#71717a" fontSize="9.5" fontFamily="JetBrains Mono">
                {v}%
              </text>
            </g>
          );
        })}

        <path d={path} fill="none" stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="5 3" />

        {pts.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r="4" fill="#0c0c10" stroke="#f59e0b" strokeWidth="2" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fill="#f5f5f7" fontSize="9.5" fontFamily="JetBrains Mono">
              {p.retained}%
            </text>
            <text x={p.x} y={height - 8} textAnchor="middle" fill="#8e8e98" fontSize="10" fontFamily="JetBrains Mono">
              {p.month}
            </text>
          </g>
        ))}
      </svg>

      <div className="split-callouts">
        <div className="mini-callout">
          <span className="mc-val">40M vs 16M</span>
          <span className="mc-lbl">Paid once vs active monthly payers in India</span>
        </div>
        <div className="mini-callout">
          <span className="mc-val">92% - 95%</span>
          <span className="mc-lbl">Payment success on NPCI Mobile UPI Intent</span>
        </div>
      </div>
    </div>
  );
}

/* 4. Live Dynamic Funnel + 3-Show Catalog Compounding Chart */
export function LiveFunnelAndCatalogChart({ starters, paywallHitters, buyers, whatsappVips, netRev, spend, selectedPrice, licensingDeal }) {
  const stages = [
    { label: "Ep 2 mWeb Starters", count: starters, pct: 100, color: "rgba(255,255,255,0.32)" },
    { label: "Hit Ep 5 Paywall", count: paywallHitters, pct: Math.round((paywallHitters / Math.max(1, starters)) * 100), color: "#f59e0b" },
    { label: `Paid ₹${selectedPrice} UPI Buyers`, count: buyers, pct: Math.max(2, Math.round((buyers / Math.max(1, starters)) * 100)), color: "#E50914" },
    { label: "Show #2 WhatsApp VIPs", count: whatsappVips, pct: Math.max(2, Math.round((whatsappVips / Math.max(1, starters)) * 100)), color: "#10b981" },
  ];

  // 3-Show Portfolio projection:
  // Show 1: Prod ~1.4L + Spend
  // Show 2: Re-activates 45% of WhatsApp VIPs at ₹0 CAC + half Meta spend + optional B2B licensing
  // Show 3: Re-activates 45% of cumulative WhatsApp VIPs at ₹0 CAC + B2B licensing
  const prodCostPerShow = 140000;
  const s1Cost = prodCostPerShow + spend;
  const s1Rev = netRev + licensingDeal;

  const s2OrganicBuyers = Math.round(whatsappVips * 0.55);
  const s2PaidBuyers = Math.round(buyers * 0.85);
  const s2Rev = Math.round((s2OrganicBuyers + s2PaidBuyers) * selectedPrice * 0.98) + licensingDeal;
  const s2Cost = prodCostPerShow + Math.round(spend * 0.65);

  const s3OrganicBuyers = Math.round((whatsappVips * 1.9) * 0.55);
  const s3PaidBuyers = Math.round(buyers * 0.85);
  const s3Rev = Math.round((s3OrganicBuyers + s3PaidBuyers) * selectedPrice * 0.98) + licensingDeal;
  const s3Cost = prodCostPerShow + Math.round(spend * 0.5);

  const shows = [
    { name: "Show #1 (Validation)", cost: s1Cost, rev: s1Rev },
    { name: "Show #2 (+WhatsApp Base)", cost: s2Cost, rev: s2Rev },
    { name: "Show #3 (Compounded + OTT)", cost: s3Cost, rev: s3Rev },
  ];

  const maxBar = Math.max(...shows.flatMap((s) => [s.cost, s.rev]), 250000);

  return (
    <div className="dual-charts-row">
      {/* Left: Conversion Waterfall */}
      <div className="chart-card">
        <div className="chart-card-head">
          <div>
            <div className="chart-kicker">Live Conversion Waterfall</div>
            <h4 className="chart-title">Episode 1 Click to Owned VIP Cohort</h4>
          </div>
        </div>
        <div className="funnel-bars">
          {stages.map((s) => (
            <div className="f-row" key={s.label}>
              <div className="f-top">
                <span>{s.label}</span>
                <span className="mono">{s.count.toLocaleString("en-IN")} ({s.pct}%)</span>
              </div>
              <div className="f-track">
                <div
                  className="f-fill"
                  style={{ width: `${Math.max(4, s.pct)}%`, background: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: 3-Show Portfolio Economics */}
      <div className="chart-card">
        <div className="chart-card-head">
          <div>
            <div className="chart-kicker">Compounding Slate Projection</div>
            <h4 className="chart-title">Show #1 - #3 Cost vs Revenue (mWeb + OTT Licensing)</h4>
          </div>
        </div>

        <div className="grouped-bars">
          {shows.map((s) => {
            const cPct = Math.max(6, (s.cost / maxBar) * 100);
            const rPct = Math.max(6, (s.rev / maxBar) * 100);
            return (
              <div className="gb-group" key={s.name}>
                <div className="gb-label">{s.name}</div>
                <div className="gb-pair">
                  <div className="gb-line">
                    <span className="gb-tag">Cost</span>
                    <div className="gb-track">
                      <div className="gb-fill cost" style={{ width: `${cPct}%` }} />
                    </div>
                    <span className="gb-num">₹{(s.cost / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="gb-line">
                    <span className="gb-tag">Rev</span>
                    <div className="gb-track">
                      <div className="gb-fill rev" style={{ width: `${rPct}%` }} />
                    </div>
                    <span className="gb-num">₹{(s.rev / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 5. Stacked Capital Bar & Cost Per Minute Benchmark */
export function BudgetAllocationChart() {
  const costComparison = [
    { label: "Indian Live-Action Microdrama (THR Benchmark)", perMin: 25000, total30m: "₹7.50L", color: "rgba(255,255,255,0.22)" },
    { label: "Deloitte / FICCI Low-End Live Shoot", perMin: 9000, total30m: "₹2.70L", color: "rgba(255,255,255,0.38)" },
    { label: "MotionX 100% AI + Dual-Lang Booth VO", perMin: 4000, total30m: "₹1.20L", color: "#E50914" },
  ];

  return (
    <div className="dual-charts-row" style={{ marginTop: "20px" }}>
      <div className="chart-card">
        <div className="chart-card-head">
          <div>
            <div className="chart-kicker">Capital Allocation (₹2.25L Midpoint)</div>
            <h4 className="chart-title">Where Every Rupee Goes in Phase 1</h4>
          </div>
        </div>

        <div className="stacked-bar">
          {BUDGET_ITEMS.map((b) => (
            <div
              key={b.name}
              className="stacked-seg"
              style={{ width: `${b.share}%`, background: b.color }}
              title={`${b.name}: ${b.share}%`}
            />
          ))}
        </div>

        <div className="stacked-legend">
          {BUDGET_ITEMS.map((b) => (
            <div className="sl-item" key={b.name}>
              <span className="sl-dot" style={{ background: b.color }} />
              <span className="sl-name">{b.name}</span>
              <span className="sl-pct mono">{b.share}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-card-head">
          <div>
            <div className="chart-kicker">Production Cost Arbitrage</div>
            <h4 className="chart-title">Finished Cost Per Minute (30-Min Master)</h4>
          </div>
          <span className="pill-green">84% Production Savings</span>
        </div>

        <div className="funnel-bars">
          {costComparison.map((c) => (
            <div className="f-row" key={c.label}>
              <div className="f-top">
                <span>{c.label}</span>
                <span className="mono">₹{c.perMin.toLocaleString("en-IN")}/min ({c.total30m})</span>
              </div>
              <div className="f-track">
                <div
                  className="f-fill"
                  style={{ width: `${(c.perMin / 25000) * 100}%`, background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
