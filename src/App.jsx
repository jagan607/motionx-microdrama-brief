import React, { useState, useEffect } from "react";
import { Copy, Printer, RotateCcw } from "lucide-react";
import {
  CHANNEL_OUTLIERS,
  PSYCHOLOGY_LAWS,
  BUDGET_ITEMS,
  SPRINT_WEEKS,
  COMPETITORS,
  SOURCES,
} from "./data/briefData";
import {
  MarketJCurveChart,
  YoutubeSignalChart,
  ChurnVsUpiChart,
  LiveFunnelAndCatalogChart,
  BudgetAllocationChart,
} from "./components/Charts";
import ConceptDeck from "./components/ConceptDeck";
import PhoneSimulator from "./components/PhoneSimulator";

const TASK_STORAGE_KEY = "mx_react_microdrama_tasks_v1";

export default function App() {
  const [spend, setSpend] = useState(80000);
  const [cpc, setCpc] = useState(7);
  const [compPct, setCompPct] = useState(55);
  const [convPct, setConvPct] = useState(12);
  const [selectedPrice, setSelectedPrice] = useState(29);
  const [licensingDeal, setLicensingDeal] = useState(150000);
  const [checkedTasks, setCheckedTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TASK_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(checkedTasks));
    } catch {
      // ignore storage quota errors
    }
  }, [checkedTasks]);

  const starters = Math.round(spend / cpc);
  const paywallHitters = Math.round(starters * (compPct / 100));
  const buyers = Math.max(1, Math.round(paywallHitters * (convPct / 100)));
  const grossRev = buyers * selectedPrice;
  const netRev = Math.round(grossRev * 0.98);
  const buyerCac = Math.round(spend / buyers);
  const day1Roas = (netRev / spend).toFixed(2);
  const whatsappVips = Math.round(buyers * 0.3 + paywallHitters * 0.08);

  const toggleTask = (id) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyBrief = () => {
    const text = [
      "MOTIONX STUDIOS · INDIA MICRO-DRAMA PHASE-1 BRIEF",
      "Format: 1 Show · 30 Minutes (15 x 2m eps) · 100% AI Zero-Shoot + Human Booth VO (Hindi + Telugu)",
      "Distribution: Mobile Webapp (HLS Dual-Audio, Zero Login on Eps 1-4, ₹29 1-Tap UPI Intent at Ep 5, No Auto-Pay)",
      "Slate: 1) Garbhagriha (Mythic Temple Vault Horror), 2) Rudra-Vratam (Mass Action Revenge), 3) NH-44: Sleeper Coach (Grounded Crime Whodunit)",
      "Budget: ₹1.90L - ₹2.60L All-In (includes ₹80k Hindi vs Telugu Meta Reels split-test)",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg("Copied executive summary to clipboard");
      setTimeout(() => setToastMsg(""), 2400);
    });
  };

  const fmtINR = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div>
      {/* Sticky Top Studio Header */}
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">MX</span>
            <span className="brand-name">MotionX</span>
            <span className="brand-sep" />
            <span className="brand-tag">Micro-Drama Brief</span>
          </a>

          <nav className="nav-links" aria-label="Sections">
            <a href="#thesis" className="nav-link">01 Data &amp; Thesis</a>
            <a href="#slate" className="nav-link">02 Visual Slate &amp; Beats</a>
            <a href="#webapp" className="nav-link">03 Live mWeb UX</a>
            <a href="#economics" className="nav-link">04 CAC &amp; Graphs</a>
            <a href="#execution" className="nav-link">05 4-Week Plan</a>
            <a href="#market" className="nav-link">06 Competitors</a>
          </nav>

          <div className="nav-actions">
            <button type="button" className="btn" onClick={handleCopyBrief}>
              <Copy size={13} /> Copy Summary
            </button>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              <Printer size={13} /> Export PDF
            </button>
          </div>
        </div>
      </header>

      <main className="shell" id="top">
        {/* Cinematic Visual Masthead */}
        <section className="hero-banner">
          <div className="hero-bg-mosaic">
            <img src="./stills/garbhagriha-hero.jpg" alt="" />
            <img src="./stills/rudra-furnace.jpg" alt="" />
            <img src="./stills/nh44-hero.jpg" alt="" />
          </div>
          <div className="hero-scrim" />

          <div className="hero-content">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> MotionX Studios Internal Greenlight · India Phase 1
              </div>
              <h1>100% AI Vertical Micro-Drama Validation Blueprint</h1>
              <p className="hero-sub">
                Direct-to-viewer execution portal for our first 30-minute bilingual (Hindi + Telugu) 9:16 original: zero physical shoot, studio-recorded regional voice actors, instant mobile-web HLS playback, and 1-tap ₹29 UPI unlocks.
              </p>
            </div>

            <div className="spec-strip">
              <div className="spec-cell">
                <div className="spec-label">Format &amp; Runtime</div>
                <div className="spec-val">30 Mins (15 x 2m)</div>
                <div className="spec-note">Optional 20 x 90s cut for +5 hooks</div>
              </div>
              <div className="spec-cell">
                <div className="spec-label">Production Stack</div>
                <div className="spec-val">100% AI + Booth VO</div>
                <div className="spec-note">Zero physical shoot · Hindi + Telugu</div>
              </div>
              <div className="spec-cell">
                <div className="spec-label">mWeb Monetization</div>
                <div className="spec-val">₹29 1-Tap UPI Pass</div>
                <div className="spec-note">Eps 1-4 Free · No Autopay Trap</div>
              </div>
              <div className="spec-cell">
                <div className="spec-label">All-In Cash Budget</div>
                <div className="spec-val">₹1.90L - ₹2.60L</div>
                <div className="spec-note">Includes ₹80k Meta Reels split-test</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: MARKET GRAPHS, YOUTUBE TELEMETRY & PSYCHOLOGY */}
        <section className="section" id="thesis">
          <div className="section-head">
            <div>
              <div className="section-num">Section 01 · Market Telemetry &amp; Own-Channel Proof</div>
              <h2 className="section-title">Why India Now, What Worked on Our YouTube, and Why Viewers Pay</h2>
              <p className="section-desc">
                Pairing Redseer's 2026 India market graphs with live @motion-x-2025 channel data (Oct 29 - Nov 11, 2026) and the Meta x Ormax 14-state study.
              </p>
            </div>
          </div>

          {/* Row 1: Market J-Curve + MotionX YouTube Bar Chart */}
          <div className="dual-charts-row">
            <MarketJCurveChart />
            <YoutubeSignalChart />
          </div>

          {/* Row 2: 4 Visual Channel Outlier Cards */}
          <div className="outlier-strip">
            {CHANNEL_OUTLIERS.map((o) => (
              <div className="outlier-card" key={o.title}>
                <div className="outlier-img-wrap">
                  <img src={o.img} alt={o.title} />
                  <span className="outlier-views">{o.views} Views</span>
                </div>
                <div className="outlier-info">
                  <div className="outlier-title">{o.title}</div>
                  <div className="outlier-lane">{o.lane}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Churn Curve Graph + 4 Psychological Laws */}
          <div className="dual-charts-row" style={{ marginTop: "20px" }}>
            <ChurnVsUpiChart />

            <div className="laws-panel">
              <div className="chart-card-head" style={{ marginBottom: "8px" }}>
                <div>
                  <div className="chart-kicker">Meta x Ormax 2,000-Viewer Survey</div>
                  <h4 className="chart-title">The 4 Psychological Rules of Indian Microdramas</h4>
                </div>
              </div>
              {PSYCHOLOGY_LAWS.map((l) => (
                <div className="law-item" key={l.idx}>
                  <div className="law-idx">{l.idx}</div>
                  <div>
                    <div className="law-head">{l.title}</div>
                    <div className="law-body">{l.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 02: VISUAL CONCEPT SLATE, HOOKS & 15-EPISODE GRIDS */}
        <section className="section" id="slate">
          <div className="section-head">
            <div>
              <div className="section-num">Section 02 · Story Slate, Key Art, Hooks &amp; Cliffhangers</div>
              <h2 className="section-title">3-Concept Slate (Click Any Card for Visual Plates, Motion Tone &amp; 15-Episode Grid)</h2>
              <p className="section-desc">
                Greenlight 1 show (30 minutes) for full production now, and cut 45-second AI concept trailers for the other 2 at Episode 15 to let paying viewers vote on Show #2.
              </p>
            </div>
          </div>

          <ConceptDeck />
        </section>

        {/* SECTION 03: LIVE 9:16 WEBAPP & UPI SIMULATOR */}
        <section className="section" id="webapp">
          <div className="section-head">
            <div>
              <div className="section-num">Section 03 · Mobile Webapp &amp; UPI Intent Flow</div>
              <h2 className="section-title">Instagram In-App Browser Funnel Simulator</h2>
              <p className="section-desc">
                89% of discovery happens on Reels/Shorts. Preview how viewers move from a mid-cliffhanger Reel ad into instant bilingual HLS playback and 1-tap PhonePe/GPay unlock with zero login walls.
              </p>
            </div>
          </div>

          <PhoneSimulator selectedPrice={selectedPrice} />
        </section>

        {/* SECTION 04: INTERACTIVE CAC LAB, WATERFALL GRAPHS & BUDGET */}
        <section className="section" id="economics">
          <div className="section-head">
            <div>
              <div className="section-num">Section 04 · Interactive Unit Economics, CAC &amp; Budget Graphs</div>
              <h2 className="section-title">Live Funnel Simulator, 3-Show Compounding P&amp;L &amp; Cash Budget</h2>
              <p className="section-desc">
                Drag sliders to stress-test Meta Reels CPC, free-episode completion, UPI conversion, and non-exclusive OTT B2B licensing upside.
              </p>
            </div>
          </div>

          <div className="econ-top-grid">
            {/* Controls */}
            <div className="chart-card">
              <div className="chart-card-head">
                <div>
                  <div className="chart-kicker">Interactive Assumptions</div>
                  <h4 className="chart-title">Paid Traffic &amp; Monetization Levers</h4>
                </div>
                <span className="pill-muted">Live Recalculation</span>
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>Meta Reels Ad Spend (₹35k TE + ₹45k HI Base)</span>
                  <span className="slider-val">{fmtINR(spend)}</span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={300000}
                  step={5000}
                  value={spend}
                  onChange={(e) => setSpend(Number(e.target.value))}
                />
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>Link CPC into Episode 2 (India Reels: ₹5 - ₹12)</span>
                  <span className="slider-val">₹{cpc.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={18}
                  step={0.5}
                  value={cpc}
                  onChange={(e) => setCpc(Number(e.target.value))}
                />
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>Free-Block Completion (Ep 2 -&gt; Ep 5 Paywall)</span>
                  <span className="slider-val">{compPct}%</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={85}
                  step={5}
                  value={compPct}
                  onChange={(e) => setCompPct(Number(e.target.value))}
                />
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>Paywall-to-UPI Conversion (Holywater AI: 23.6%)</span>
                  <span className="slider-val">{convPct}%</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={28}
                  step={1}
                  value={convPct}
                  onChange={(e) => setConvPct(Number(e.target.value))}
                />
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>One-Time Full Story Pass Price</span>
                  <span className="slider-val">₹{selectedPrice}</span>
                </div>
                <div className="pill-row">
                  {[19, 29, 39, 49].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`select-pill ${selectedPrice === p ? "active" : ""}`}
                      onClick={() => setSelectedPrice(p)}
                    >
                      ₹{p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="slider-group">
                <div className="slider-head">
                  <span>Optional Non-Exclusive B2B OTT Licensing / Show</span>
                  <span className="slider-val">{fmtINR(licensingDeal)}</span>
                </div>
                <div className="pill-row three">
                  {[
                    { val: 0, lbl: "₹0 (Pure B2C)" },
                    { val: 150000, lbl: "₹1.5L Deal" },
                    { val: 350000, lbl: "₹3.5L Deal" },
                  ].map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      className={`select-pill ${licensingDeal === d.val ? "active" : ""}`}
                      onClick={() => setLicensingDeal(d.val)}
                    >
                      {d.lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Readout Matrix */}
            <div className="chart-card">
              <div className="chart-card-head">
                <div>
                  <div className="chart-kicker">Show #1 Direct Cohort Readout</div>
                  <h4 className="chart-title">Validation Scorecard &amp; CAC Output</h4>
                </div>
                <span className="pill-red">Day-1 mWeb ROAS: {day1Roas}x</span>
              </div>

              <div className="kpi-matrix">
                <div className="kpi-box">
                  <div className="kpi-lbl">Ep 2 mWeb Starters</div>
                  <div className="kpi-num">{starters.toLocaleString("en-IN")}</div>
                  <div className="kpi-sub">Zero-login instant video starts</div>
                </div>
                <div className="kpi-box">
                  <div className="kpi-lbl">Reach Ep 5 Paywall</div>
                  <div className="kpi-num">{paywallHitters.toLocaleString("en-IN")}</div>
                  <div className="kpi-sub">Finished 8-min free hook block</div>
                </div>
                <div className="kpi-box hi">
                  <div className="kpi-lbl">Paid UPI Unlocks</div>
                  <div className="kpi-num">{buyers.toLocaleString("en-IN")}</div>
                  <div className="kpi-sub">Effective Buyer CAC: {fmtINR(buyerCac)}</div>
                </div>
                <div className="kpi-box hi">
                  <div className="kpi-lbl">Direct Net UPI Cash</div>
                  <div className="kpi-num">{fmtINR(netRev)}</div>
                  <div className="kpi-sub">After 2% Razorpay · 0% App Store tax</div>
                </div>
              </div>

              <div className="kpi-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <div>
                  <div className="kpi-lbl">Owned WhatsApp VIP List Built for Show #2</div>
                  <div className="kpi-sub">Warm audience notified free when Show #2 drops + B2B OTT proof</div>
                </div>
                <div className="kpi-num" style={{ marginTop: 0, color: "#34d399" }}>
                  +{whatsappVips.toLocaleString("en-IN")} VIPs
                </div>
              </div>
            </div>
          </div>

          {/* Live Waterfall + 3-Show Compounding Graph */}
          <LiveFunnelAndCatalogChart
            starters={starters}
            paywallHitters={paywallHitters}
            buyers={buyers}
            whatsappVips={whatsappVips}
            netRev={netRev}
            spend={spend}
            selectedPrice={selectedPrice}
            licensingDeal={licensingDeal}
          />

          {/* Capital Allocation + Cost-Per-Minute Graphs */}
          <BudgetAllocationChart />

          {/* Detailed Budget Ledger */}
          <div className="chart-card" style={{ marginTop: "20px", padding: 0, overflow: "hidden" }}>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Phase-1 Line Item (30 Mins · Hindi + Telugu · Zero Shoot)</th>
                    <th>Low Est.</th>
                    <th>High Est.</th>
                    <th>Execution Guardrail</th>
                  </tr>
                </thead>
                <tbody>
                  {BUDGET_ITEMS.map((b, idx) => (
                    <tr key={b.name}>
                      <td>
                        <strong>0{idx + 1}. {b.name}</strong>
                      </td>
                      <td className="mono">{fmtINR(b.low)}</td>
                      <td className="mono">{fmtINR(b.high)}</td>
                      <td style={{ color: "var(--ink-sec)" }}>{b.rule}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td>Total Phase-1 Validation Outlay</td>
                    <td className="mono">₹1,90,000</td>
                    <td className="mono">₹2,60,000</td>
                    <td>Delivers 1 bilingual 30-min IP master + live Hindi/Telugu CAC data + OTT pitch asset.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 05: 4-WEEK EXECUTION SPRINT */}
        <section className="section" id="execution">
          <div className="section-head">
            <div>
              <div className="section-num">Section 05 · Sprint Schedule &amp; Role Ownership</div>
              <h2 className="section-title">4-Week Concept-to-Cash Execution Roadmap</h2>
              <p className="section-desc">
                Interactive team checklist (saved in browser localStorage). Enforce Week 1's static storyboard gate before spending AI video credits.
              </p>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => setCheckedTasks({})}
            >
              <RotateCcw size={13} /> Reset Checklist
            </button>
          </div>

          <div className="sprint-grid">
            {SPRINT_WEEKS.map((col) => (
              <div className="sprint-col" key={col.wk}>
                <div>
                  <div className="sprint-wk">{col.wk}</div>
                  <div className="sprint-title">{col.title}</div>
                </div>
                <ul className="task-list">
                  {col.tasks.map((t) => {
                    const isDone = !!checkedTasks[t.id];
                    return (
                      <li
                        key={t.id}
                        className={`task-item ${isDone ? "done" : ""}`}
                        onClick={() => toggleTask(t.id)}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => {}}
                        />
                        <span>{t.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="sprint-owner">Owners: {col.owner}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: COMPETITOR MATRIX & VERIFIED SOURCES */}
        <section className="section" id="market" style={{ borderBottom: "none", paddingBottom: "20px" }}>
          <div className="section-head">
            <div>
              <div className="section-num">Section 06 · Competitive Landscape &amp; Citations</div>
              <h2 className="section-title">Indian &amp; Global Microdrama Operator Benchmarks (2026)</h2>
              <p className="section-desc">
                How MotionX positions around funded local incumbents using 100% AI genre spectacle, impulse UPI unlocks, and multi-exit licensing.
              </p>
            </div>
          </div>

          <div className="chart-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Operator</th>
                    <th>Scale &amp; Content Focus</th>
                    <th>Pricing Model</th>
                    <th>Strategic Lesson for MotionX</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <strong>{c.name}</strong>
                        <div style={{ fontSize: "11px", color: "var(--ink-muted)" }}>{c.sub}</div>
                      </td>
                      <td>{c.scale}</td>
                      <td className="mono">{c.pricing}</td>
                      <td style={{ color: "var(--ink-sec)" }}>{c.lesson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: "28px", paddingTop: "18px", borderTop: "1px solid var(--border)" }}>
            <div className="spec-label">Verified Market Sources (2026)</div>
            <ul className="sources-grid">
              {SOURCES.map((s) => (
                <li key={s.id}>
                  [{s.id}]{" "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
