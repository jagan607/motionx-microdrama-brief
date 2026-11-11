import React, { useState } from "react";

const CLEAN_9X16_VIDEOS = [
  "https://firebasestorage.googleapis.com/v0/b/motionx-studio.firebasestorage.app/o/web-portfolio%2Fanna.mp4?alt=media&token=bc20e7e4-f7f4-47be-8d61-cf8414993743",
  "https://firebasestorage.googleapis.com/v0/b/motionx-studio.firebasestorage.app/o/web-portfolio%2Fepisode-09.mp4?alt=media&token=383523a7-e17c-492e-afa2-2cfdba223018",
  "https://firebasestorage.googleapis.com/v0/b/motionx-studio.firebasestorage.app/o/web-portfolio%2Fepisode-11.mp4?alt=media&token=2a228f1f-722d-4822-93b1-979e81842bd9",
  "https://firebasestorage.googleapis.com/v0/b/motionx-studio.firebasestorage.app/o/web-portfolio%2Fanna.mp4?alt=media&token=bc20e7e4-f7f4-47be-8d61-cf8414993743",
];

const FUNNEL_STEPS = [
  {
    code: "Stage 01 · Meta Reels Ad",
    badge: "Target CPC < ₹8",
    badgeTone: "neutral",
    title: "Episode 1 IS the Ad (Full 1:45 - 2:00 Cut)",
    desc: "Never run a generic teaser. Run the full opening episode natively in 9:16 (separate Hindi & Telugu ad sets) cutting to black mid-cliffhanger with one CTA: Watch Episode 2 Free.",
  },
  {
    code: "Stage 02 · Instant WebView Entry",
    badge: "Zero Login Gate",
    badgeTone: "neutral",
    title: "Auto-Routed Language (?lang=te / ?lang=hi) + HLS Swipe",
    desc: "Clicking the Telugu Reel opens Episode 2 immediately in Telugu inside Instagram's in-app browser with an anonymous device token. No OTP or Google OAuth popups (which break inside WebViews).",
  },
  {
    code: "Stage 03 · Episode 5 Paywall",
    badge: "₹29 UPI Intent",
    badgeTone: "red",
    title: "1-Tap NPCI UPI Intent (PhonePe / GPay / Paytm)",
    desc: "NPCI deprecated manual Android UPI ID typing in Feb 2026. Tapping Pay launches PhonePe or GPay directly (92%-95% success rate), fires Meta CAPI Purchase, and unlocks Episodes 5-15.",
  },
  {
    code: "Stage 04 · Episode 15 Finale",
    badge: "Zero-CAC Retention",
    badgeTone: "green",
    title: "Fake-Door Trailer Poll + WhatsApp VIP Opt-In",
    desc: "At the end of Episode 15, auto-play two 45-second AI trailers for the other two concepts. Viewers tap their favorite via WhatsApp link, building a free broadcast channel for Show #2.",
  },
];

export default function PhoneSimulator({ selectedPrice }) {
  const [step, setStep] = useState(2);
  const [lang, setLang] = useState("te");
  const isTe = lang === "te";

  return (
    <div className="ux-grid">
      <div className="step-cards">
        {FUNNEL_STEPS.map((s, idx) => (
          <button
            key={s.code}
            type="button"
            className={`step-card ${step === idx ? "active" : ""}`}
            onClick={() => setStep(idx)}
          >
            <div className="sc-head">
              <span className="mono-accent">{s.code}</span>
              <span className={`badge badge-${s.badgeTone}`}>{s.badge}</span>
            </div>
            <div className="sc-title">{s.title}</div>
            <div className="sc-desc">{s.desc}</div>
          </button>
        ))}
      </div>

      <div className="phone-stage">
        <div className="phone-bezel">
          <video
            key={CLEAN_9X16_VIDEOS[step]}
            src={CLEAN_9X16_VIDEOS[step]}
            poster="./stills/anna-noir.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="phone-video-bg"
          />
          <div className="phone-gradient" />

          {/* Top Bar */}
          <div className="phone-topbar">
            <span className="phone-pill">
              {step === 0 && "IG Reel Ad · 01:58"}
              {step === 1 && "EP 02 / 15 · Free"}
              {step === 2 && "EP 05 / 15 · Locked"}
              {step === 3 && "EP 15 / 15 · Finale"}
            </span>

            <div className="phone-lang">
              <button
                type="button"
                className={isTe ? "active" : ""}
                onClick={() => setLang("te")}
              >
                తెలుగు
              </button>
              <button
                type="button"
                className={!isTe ? "active" : ""}
                onClick={() => setLang("hi")}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Mid Scene Overlay */}
          <div className="phone-mid">
            <div className="phone-kicker">
              {step === 0 && "Sponsored · @motionxstudio_"}
              {step === 1 && "MotionX mWeb · Instant HLS"}
              {step === 2 && "62% Free-Hook Viewers Reach Here"}
              {step === 3 && "Next Show Audience Poll"}
            </div>
            <div className="phone-headline">
              {step === 0 &&
                (isTe ? "Garbhagudi: Aedo Thalupu (Ep 1)" : "Garbhagriha: Saatva Darwaza (Ep 1)")}
              {step === 1 &&
                (isTe ? "Rendo Niyamam (Rule #2)" : "Doosra Niyam (Rule #2)")}
              {step === 2 && "Who Betrayed Raghav Inside the Vault?"}
              {step === 3 && "Vote MotionX's Next Friday Drop"}
            </div>
            <div className="phone-caption-box">
              {step === 0 &&
                (isTe
                  ? '"Ee moodu niyamaalu thappithe... okkaru kuda bayatiki raaru!"'
                  : '"In teen niyamon ko toda... toh ek bhi zinda bahar nahi aayega!"')}
              {step === 1 &&
                (isTe
                  ? "Playing unmuted inside Instagram WebView in 0.8s (Telugu HLS track). Swipe up for Ep 3 & 4 free."
                  : "Playing unmuted inside Instagram WebView in 0.8s (Hindi HLS track). Swipe up for Ep 3 & 4 free.")}
              {step === 2 &&
                "Vikram cocks the revolver behind Raghav's head as the ancient stone door seals shut..."}
              {step === 3 &&
                "Tap your favorite 45s trailer below to unlock Episode 1 free on WhatsApp when it drops."}
            </div>
          </div>

          {/* Bottom Interactive Drawer */}
          <div className="phone-drawer">
            {step === 0 && (
              <>
                <div className="drawer-row">
                  <span className="drawer-label">Deep-Link Destination</span>
                  <span className="mono-sm">?lang={lang}&amp;ep=2</span>
                </div>
                <button
                  type="button"
                  className="phone-cta-btn"
                  onClick={() => setStep(1)}
                >
                  Watch Episode 2 Free -&gt;
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <div className="drawer-row">
                  <span className="drawer-label">Guest Session Token Active</span>
                  <span className="mono-sm">Eps 2-4 Free</span>
                </div>
                <button
                  type="button"
                  className="phone-cta-btn"
                  onClick={() => setStep(2)}
                >
                  Swipe to Ep 5 UPI Paywall -&gt;
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="drawer-row">
                  <span className="drawer-strong">Full Story Pass (Eps 5-15)</span>
                  <span className="drawer-price">₹{selectedPrice}</span>
                </div>
                <div className="upi-apps">
                  <span>PhonePe</span>
                  <span>GPay</span>
                  <span>Paytm</span>
                </div>
                <button
                  type="button"
                  className="phone-cta-btn"
                  onClick={() => setStep(3)}
                >
                  Pay ₹{selectedPrice} via 1-Tap UPI Intent
                </button>
                <div className="drawer-note">
                  One-time payment · No subscription · No auto-pay
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="upi-apps two-col">
                  <span>1. Rudra-Vratam</span>
                  <span>2. NH-44 Bus</span>
                </div>
                <button
                  type="button"
                  className="phone-cta-btn green"
                  onClick={() => setStep(0)}
                >
                  Notify Me on WhatsApp (Zero CAC)
                </button>
                <div className="drawer-note">
                  Captures warm buyers for Show #2 at ₹0 Meta ad spend
                </div>
              </>
            )}
          </div>
        </div>
        <div className="phone-caption-foot">
          Live 9:16 MotionX AI footage playing inside interactive mWeb simulator
        </div>
      </div>
    </div>
  );
}
