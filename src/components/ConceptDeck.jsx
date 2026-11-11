import React, { useState } from "react";
import { Play, Image as ImageIcon } from "lucide-react";
import { CONCEPTS } from "../data/briefData";

export default function ConceptDeck() {
  const [selectedId, setSelectedId] = useState("c1");
  const [actFilter, setActFilter] = useState("all");
  const [showMotionVideo, setShowMotionVideo] = useState(false);
  const [activePlateIdx, setActivePlateIdx] = useState(0);

  const activeConcept = CONCEPTS.find((c) => c.id === selectedId) || CONCEPTS[0];
  const filteredBeats =
    actFilter === "all"
      ? activeConcept.beats
      : activeConcept.beats.filter((b) => b.act === actFilter);

  const handleSelectConcept = (id) => {
    setSelectedId(id);
    setActFilter("all");
    setShowMotionVideo(false);
    setActivePlateIdx(0);
  };

  const currentHeroSrc =
    activeConcept.gallery[activePlateIdx]?.src || activeConcept.heroImg;

  return (
    <div>
      {/* 3 Visual Concept Selector Cards */}
      <div className="concept-card-grid">
        {CONCEPTS.map((c) => {
          const isActive = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              className={`concept-visual-card ${isActive ? "active" : ""}`}
              onClick={() => handleSelectConcept(c.id)}
            >
              <div className="cvc-thumb">
                <img src={c.heroImg} alt={c.name} />
                <div className="cvc-scrim" />
                <span className={`badge badge-${c.badgeTone} cvc-badge`}>
                  {c.badge}
                </span>
              </div>
              <div className="cvc-body">
                <div className="cvc-code">{c.code}</div>
                <div className="cvc-name">{c.name}</div>
                <div className="cvc-desc">{c.shortSummary}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Concept Full Workspace */}
      <div className="concept-workspace">
        {/* Top Visual + Story Split */}
        <div className="cw-hero-split">
          <div className="cw-media-col">
            <div className="cw-main-stage">
              {showMotionVideo ? (
                <video
                  key={activeConcept.videoPreview}
                  src={activeConcept.videoPreview}
                  poster={currentHeroSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="cw-stage-media"
                />
              ) : (
                <img
                  src={currentHeroSrc}
                  alt={activeConcept.name}
                  className="cw-stage-media"
                />
              )}
              <div className="cw-stage-bar">
                <span className="cw-plate-caption">
                  {showMotionVideo
                    ? "MotionX Reference Reel (100% AI Pipeline Tone)"
                    : activeConcept.gallery[activePlateIdx]?.caption}
                </span>
                <button
                  type="button"
                  className="stage-toggle-btn"
                  onClick={() => setShowMotionVideo((v) => !v)}
                >
                  {showMotionVideo ? (
                    <>
                      <ImageIcon size={13} /> Still Plates
                    </>
                  ) : (
                    <>
                      <Play size={13} /> Motion Tone
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="cw-plate-strip">
              {activeConcept.gallery.map((g, idx) => (
                <button
                  key={g.caption}
                  type="button"
                  className={`plate-thumb ${!showMotionVideo && activePlateIdx === idx ? "active" : ""}`}
                  onClick={() => {
                    setShowMotionVideo(false);
                    setActivePlateIdx(idx);
                  }}
                >
                  <img src={g.src} alt={g.caption} />
                  <span>{g.caption}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="cw-copy-col">
            <div className="cw-eyebrow-row">
              <span className="mono-accent">{activeConcept.code}</span>
              <span className={`badge badge-${activeConcept.badgeTone}`}>
                {activeConcept.badge}
              </span>
            </div>

            <h3 className="cw-main-title">{activeConcept.name}</h3>

            <div className="cw-lang-chips">
              <span className="lang-chip">
                Hindi: <strong>{activeConcept.hiTitle}</strong>
              </span>
              <span className="lang-chip">
                Telugu: <strong>{activeConcept.teTitle}</strong>
              </span>
              <span className="lang-chip">
                Runtime: <strong>30m (15 x 2m)</strong>
              </span>
            </div>

            <p className="cw-logline">{activeConcept.logline}</p>
            <p className="cw-synopsis">{activeConcept.synopsis}</p>

            <div className="cw-specs-box">
              <div>
                <div className="spec-kicker">Why 100% AI Excels Visually</div>
                <div className="spec-body">{activeConcept.aiAdvantage}</div>
              </div>
              <div>
                <div className="spec-kicker">Locked Character LoRA Cast</div>
                <div className="spec-body">{activeConcept.cast}</div>
              </div>
              <div>
                <div className="spec-kicker">Dual Hindi + Telugu Cultural Fit</div>
                <div className="spec-body">{activeConcept.bilingualFit}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Conversion Cliffhanger Cards */}
        <div className="moments-grid">
          <div className="moment-cell">
            <div className="moment-tag">
              <span>01 · 3-Second Thumb-Stopper</span>
              <span>00:00 - 00:04</span>
            </div>
            <div className="moment-title">Opening Reel Frame</div>
            <p className="moment-copy">{activeConcept.thumbStopper}</p>
          </div>

          <div className="moment-cell">
            <div className="moment-tag">
              <span>02 · Episode 1 Ad Cliffhanger</span>
              <span>01:58 Cut</span>
            </div>
            <div className="moment-title">Drives Click Into mWeb Player</div>
            <p className="moment-copy">{activeConcept.ep1Hook}</p>
          </div>

          <div className="moment-cell paywall-moment">
            <div className="moment-tag">
              <span>03 · ₹29 UPI Paywall Gate</span>
              <span>Ep 04 -&gt; Ep 05</span>
            </div>
            <div className="moment-title">Triggers Impulse 1-Tap Unlock</div>
            <p className="moment-copy">{activeConcept.paywallHook}</p>
          </div>
        </div>

        {/* 15-Episode Beat Table */}
        <div className="beats-section">
          <div className="beats-header">
            <div>
              <h4 className="beats-title">
                Complete 15-Episode Scene &amp; Cliffhanger Architecture (30 Mins)
              </h4>
              <p className="beats-sub">
                Every 2-minute episode ends on an active threat, secret reveal, or power flip.
              </p>
            </div>

            <div className="act-pills">
              {[
                { id: "all", label: "All 15 Eps" },
                { id: "free", label: "Free Hook (1-4)" },
                { id: "paid1", label: "Paywall & Escalation (5-10)" },
                { id: "paid2", label: "Climax & Finale Poll (11-15)" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`act-pill ${actFilter === f.id ? "active" : ""}`}
                  onClick={() => setActFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="table-scroll">
            <table className="beats-table">
              <thead>
                <tr>
                  <th style={{ width: "78px" }}>Ep</th>
                  <th style={{ width: "136px" }}>Funnel Stage</th>
                  <th style={{ width: "220px" }}>Episode Title</th>
                  <th>2-Minute Dramatic Action &amp; Cliffhanger Ending</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeats.map((b) => {
                  const isGate = b.ep === "EP 05";
                  const cls =
                    b.act === "free"
                      ? "tag-free"
                      : isGate
                      ? "tag-gate"
                      : "tag-paid";
                  return (
                    <tr key={b.ep} className={isGate ? "gate-highlight" : ""}>
                      <td className="mono ep-col">{b.ep}</td>
                      <td>
                        <span className={`stage-tag ${cls}`}>{b.access}</span>
                      </td>
                      <td className="ep-title-col">{b.title}</td>
                      <td className="ep-beat-col">{b.beat}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
