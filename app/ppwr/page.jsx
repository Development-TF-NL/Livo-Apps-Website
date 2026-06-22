/**
 * LIVO PPWR — Product overview
 * Drop-in section/page for the LIVO APPS website (Next.js).
 *
 * Voice: Simple. Human. Clear. Direct.
 * Visual identity follows the LIVO APPS Brand Bible:
 *   deep navy carries, lime accents sparingly, white cards on a light canvas,
 *   flat surfaces (no shadows/gradients), line-based icons, Satoshi + Inter.
 *
 * Self-contained: all colour tokens and styles live in this file (scoped under
 * .lp-root), so it works in any Next.js project without a Tailwind config.
 *
 * Where to put it:
 *   - As its own page  -> app/ppwr/page.jsx  (route: livoapps.software/ppwr)
 *   - Or import it      -> import LivoPpwrOverview from "@/components/LivoPpwrOverview"
 *
 * Wire the CTA: set DEMO_URL to your Cal.com link (see the website plan of aanpak).
 * Fonts: to load Satoshi + Inter for real, add the links in app/layout.jsx
 *        (Inter via Google Fonts, Satoshi via Fontshare). Until then it falls
 *        back gracefully to the system font.
 */

import Breadcrumb from "../components/Breadcrumb";

const DEMO_URL = "#"; // TODO: your Cal.com booking link
const CONTACT_EMAIL = "hello@livoapps.software";

/* ---------- Brand tokens (Brand Bible) ---------- */
const css = `
.lp-root {
  --bg: #EEF2F3;          /* light canvas behind cards */
  --surface: #FFFFFF;     /* cards / panels */
  --ink: #081D33;         /* primary text (deep navy) */
  --sub: #5B6B72;         /* secondary, muted text */
  --line: #E4E8EA;        /* soft borders */
  --navy: #081D33;        /* dark surfaces / header */
  --accent: #7AC143;      /* lime — used sparingly */
  --accent-dark: #69AD36; /* lime hover */

  /* functional state colours (muted, functional only) */
  --ok-bg: #EAF6DD;   --ok-tx: #3F6B16;
  --warn-bg: #FEF3C7; --warn-tx: #854F0B;
  --risk-bg: #FEE2E2; --risk-tx: #991B1B;

  --display: "Satoshi", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --body: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }
.lp-root h1, .lp-root h2, .lp-root h3 { font-family: var(--display); font-weight: 700; line-height: 1.15; margin: 0; letter-spacing: -0.01em; }
.lp-root p { margin: 0; }

.lp-wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.lp-eyebrow { font-family: var(--display); font-weight: 700; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }

/* ---------- Hero (navy) ---------- */
.lp-hero { background: var(--navy); color: #fff; padding: 80px 0 96px; }
.lp-hero .lp-eyebrow { color: var(--accent); }
.lp-hero h1 { font-size: clamp(34px, 5.2vw, 56px); color: #fff; margin: 16px 0 18px; }
.lp-hero .lp-lead { font-size: clamp(17px, 2vw, 20px); color: #C2CDD6; max-width: 620px; }
.lp-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: center; }
.lp-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }

.lp-btn { font-family: var(--display); font-weight: 700; font-size: 15px; border-radius: 10px; padding: 13px 22px; border: 1px solid transparent; cursor: pointer; text-decoration: none; display: inline-block; transition: background-color .2s ease-in-out, border-color .2s ease-in-out, color .2s ease-in-out; }
.lp-btn-primary { background: var(--accent); color: var(--navy); }
.lp-btn-primary:hover { background: var(--accent-dark); }
.lp-btn-ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,0.28); }
.lp-btn-ghost:hover { border-color: #fff; }

/* ---------- Signature: obligations card ---------- */
.lp-card { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; }
.lp-obl { padding: 22px; }
.lp-obl-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.lp-obl-title { font-family: var(--display); font-weight: 700; font-size: 16px; color: var(--ink); }
.lp-obl-meta { font-size: 12.5px; color: var(--sub); }
.lp-progress { margin: 16px 0 6px; }
.lp-progress-label { display: flex; justify-content: space-between; font-size: 13px; color: var(--sub); margin-bottom: 8px; }
.lp-progress-track { height: 6px; border-radius: 999px; background: var(--line); overflow: hidden; }
.lp-progress-fill { height: 100%; width: 67%; background: var(--accent); border-radius: 999px; }
.lp-rows { margin-top: 12px; border-top: 1px solid var(--line); }
.lp-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 0; border-bottom: 1px solid var(--line); }
.lp-row:last-child { border-bottom: 0; }
.lp-row-name { font-size: 14.5px; color: var(--ink); font-weight: 500; }
.lp-row-sub { font-size: 12px; color: var(--sub); }
.lp-pill { font-size: 12px; font-weight: 600; padding: 4px 11px; border-radius: 999px; white-space: nowrap; }
.lp-pill-ok { background: var(--ok-bg); color: var(--ok-tx); }
.lp-pill-warn { background: var(--warn-bg); color: var(--warn-tx); }
.lp-pill-risk { background: var(--risk-bg); color: var(--risk-tx); }
.lp-obl-foot { margin-top: 14px; font-size: 12.5px; color: var(--sub); display: flex; align-items: center; gap: 7px; }

/* ---------- Generic sections ---------- */
.lp-section { padding: 80px 0; }
.lp-section-head { max-width: 620px; margin-bottom: 44px; }
.lp-section-head h2 { font-size: clamp(26px, 3.4vw, 36px); margin: 14px 0 14px; }
.lp-section-head p { color: var(--sub); font-size: 17px; }

/* why-now strip */
.lp-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.lp-why-item { padding: 24px; }
.lp-why-item h3 { font-size: 17px; margin-bottom: 8px; }
.lp-why-item p { color: var(--sub); font-size: 14.5px; }
.lp-date { display: inline-flex; align-items: center; gap: 9px; background: var(--navy); color: #fff; border-radius: 999px; padding: 9px 16px; font-size: 14px; font-weight: 500; }
.lp-date b { font-family: var(--display); }

/* feature grid */
.lp-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.lp-feature { padding: 26px; transition: border-color .2s ease-in-out; }
.lp-feature:hover { border-color: #C9D6CC; }
.lp-ico { width: 38px; height: 38px; border-radius: 9px; background: var(--bg); border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; color: var(--navy); margin-bottom: 16px; }
.lp-ico svg { width: 20px; height: 20px; }
.lp-feature h3 { font-size: 17px; margin-bottom: 8px; }
.lp-feature p { color: var(--sub); font-size: 14.5px; }

/* principles (on navy) */
.lp-principles { background: var(--navy); color: #fff; }
.lp-principles .lp-section-head h2 { color: #fff; }
.lp-principles .lp-section-head p { color: #C2CDD6; }
.lp-prin-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }
.lp-prin { background: var(--navy); padding: 26px; }
.lp-prin .lp-num { font-family: var(--display); font-weight: 700; font-size: 13px; color: var(--accent); }
.lp-prin h3 { font-size: 16.5px; color: #fff; margin: 10px 0 8px; }
.lp-prin p { color: #B8C4CE; font-size: 14px; }
.lp-prin code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; color: #fff; }

/* closing cta */
.lp-cta { text-align: center; padding: 84px 0; }
.lp-cta h2 { font-size: clamp(28px, 4vw, 42px); margin-bottom: 16px; }
.lp-cta p { color: var(--sub); font-size: 17px; margin-bottom: 28px; }
.lp-cta a.lp-link { color: var(--accent-dark); text-decoration: none; font-weight: 600; }
.lp-cta a.lp-link:hover { text-decoration: underline; }

/* footer line */
.lp-foot { border-top: 1px solid var(--line); padding: 30px 0 56px; }
.lp-foot p { color: var(--sub); font-size: 13px; }
.lp-foot .lp-brand { font-family: var(--display); font-weight: 700; color: var(--ink); }

/* focus + motion + responsive */
.lp-root a:focus-visible, .lp-root button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 8px; }
@media (max-width: 880px) {
  .lp-hero-grid { grid-template-columns: 1fr; gap: 36px; }
  .lp-why, .lp-features, .lp-prin-grid { grid-template-columns: 1fr; }
  .lp-prin-grid { gap: 1px; }
}
@media (prefers-reduced-motion: reduce) {
  .lp-root * { transition: none !important; }
}
`;

/* ---------- tiny line icons (consistent, stroke-based) ---------- */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const Icon = {
  register: (<svg viewBox="0 0 24 24" {...stroke}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>),
  matrix: (<svg viewBox="0 0 24 24" {...stroke}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /><path d="m13 14 2 2 3-3.5" /></svg>),
  docs: (<svg viewBox="0 0 24 24" {...stroke}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="m9 14 2 2 3-4" /></svg>),
  suppliers: (<svg viewBox="0 0 24 24" {...stroke}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M18.5 20a5 5 0 0 0-3-4.6" /></svg>),
  timeline: (<svg viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  status: (<svg viewBox="0 0 24 24" {...stroke}><path d="M4 18V9M10 18V5M16 18v-6M22 18H2" /></svg>),
};

const features = [
  { icon: Icon.register, title: "Packaging register", body: "Every packaging type you place on the market, in one list — material, weight, format and owner, found in seconds." },
  { icon: Icon.matrix, title: "Obligations matrix", body: "See at a glance which rules apply to each packaging type, and exactly where you still need to act." },
  { icon: Icon.docs, title: "Documents & Declarations of Conformity", body: "Keep every DoC and technical file with its packaging. Upload once, and it's always where you expect it." },
  { icon: Icon.suppliers, title: "Suppliers", body: "Collect the data and proof you need from suppliers, with the right owner set for you automatically." },
  { icon: Icon.timeline, title: "Timeline & deadlines", body: "PPWR phases in through 2030 and beyond. LIVO keeps the dates that matter to your packaging in view." },
  { icon: Icon.status, title: "Compliance status", body: "A calm, honest picture of where you stand today — and a clear next step, never a wall of red." },
];

const principles = [
  { n: "01", title: "Simplicity over features", body: "One primary action per screen. Everything you need to stay compliant, nothing you don't." },
  { n: "02", title: "Errors that help", body: <>No raw system messages. Not <code>ERROR 413</code>, but “That file is a little large — try one under 15 MB.”</> },
  { n: "03", title: "Calm by design", body: "Generous whitespace and progressive disclosure keep dense pages quiet. Detail appears when you ask for it." },
  { n: "04", title: "Smart defaults", body: "A document is named after its file. The supplier owner is set for you. Less typing, fewer mistakes." },
  { n: "05", title: "Validation as you go", body: "Fields are checked while you work, so you never complete a whole form only to hit a wall at the end." },
  { n: "06", title: "Human in the loop", body: "You stay in control. The software suggests and prepares; you decide and confirm." },
];

export default function LivoPpwrOverview() {
  return (
    <section className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Breadcrumb
        items={[
          { label: "Livo Apps", href: "/" },
          { label: "Products", href: "/#product" },
          { label: "LIVO PPWR" },
        ]}
      />

      {/* ---------- Hero ---------- */}
      <header className="lp-hero">
        <div className="lp-wrap lp-hero-grid">
          <div>
            <span className="lp-eyebrow">LIVO PPWR · Packaging compliance</span>
            <h1>Complex rules.<br />Effortless compliance.</h1>
            <p className="lp-lead">
              The EU Packaging and Packaging Waste Regulation applies from 12 August 2026.
              LIVO PPWR keeps every packaging type, obligation and document in one calm
              place — so your team stays compliant without the stress.
            </p>
            <div className="lp-cta-row">
              <a className="lp-btn lp-btn-primary" href={DEMO_URL}>Book a demo</a>
              <a className="lp-btn lp-btn-ghost" href="#how-it-works">See how it works</a>
            </div>
          </div>

          {/* Signature: the calm obligations overview */}
          <div className="lp-card lp-obl" aria-label="Example: packaging obligations overview">
            <div className="lp-obl-head">
              <span className="lp-obl-title">Packaging obligations</span>
              <span className="lp-obl-meta">Updated just now</span>
            </div>
            <div className="lp-progress">
              <div className="lp-progress-label"><span>Compliant packaging</span><span>12 / 18</span></div>
              <div className="lp-progress-track"><div className="lp-progress-fill" /></div>
            </div>
            <div className="lp-rows">
              <div className="lp-row">
                <div><div className="lp-row-name">PET bottle 0.5 L</div><div className="lp-row-sub">DoC complete · 30% recycled</div></div>
                <span className="lp-pill lp-pill-ok">Compliant</span>
              </div>
              <div className="lp-row">
                <div><div className="lp-row-name">Folding carton</div><div className="lp-row-sub">Awaiting supplier data</div></div>
                <span className="lp-pill lp-pill-warn">In review</span>
              </div>
              <div className="lp-row">
                <div><div className="lp-row-name">E-commerce parcel</div><div className="lp-row-sub">Empty space over 40%</div></div>
                <span className="lp-pill lp-pill-risk">Needs attention</span>
              </div>
              <div className="lp-row">
                <div><div className="lp-row-name">Glass jar 250 ml</div><div className="lp-row-sub">DoC complete</div></div>
                <span className="lp-pill lp-pill-ok">Compliant</span>
              </div>
            </div>
            <div className="lp-obl-foot">
              <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Next deadline · 12 Aug 2026
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Why now ---------- */}
      <div className="lp-section">
        <div className="lp-wrap">
          <div className="lp-section-head">
            <span className="lp-eyebrow">Why now</span>
            <h2>One regulation. A lot of new obligations.</h2>
            <p>
              PPWR (Regulation (EU) 2025/40) applies directly across the EU and replaces the
              old Packaging Directive. It reaches every company that places packaging on the
              EU market — whatever its size.
            </p>
          </div>
          <div className="lp-why">
            <div className="lp-card lp-why-item">
              <h3>Prove conformity</h3>
              <p>Each packaging type needs an EU Declaration of Conformity and technical documentation, kept on file for years.</p>
            </div>
            <div className="lp-card lp-why-item">
              <h3>Meet design rules</h3>
              <p>Recyclability, recycled content, packaging minimisation and PFAS limits all carry their own thresholds and dates.</p>
            </div>
            <div className="lp-card lp-why-item">
              <h3>Avoid the fallout</h3>
              <p>Gaps can mean fines, recalls or losing a retail listing. The work is real — the stress doesn't have to be.</p>
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <span className="lp-date">
              <svg viewBox="0 0 24 24" width="16" height="16" {...stroke}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
              Binding from <b>&nbsp;12 August 2026</b>
            </span>
          </div>
        </div>
      </div>

      {/* ---------- What it does ---------- */}
      <div className="lp-section" id="how-it-works" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="lp-wrap">
          <div className="lp-section-head">
            <span className="lp-eyebrow">What LIVO PPWR does</span>
            <h2>Your whole packaging compliance, in one place.</h2>
            <p>Register, obligations, documents, suppliers and deadlines — connected, so nothing falls through the cracks.</p>
          </div>
          <div className="lp-features">
            {features.map((f) => (
              <div className="lp-card lp-feature" key={f.title}>
                <div className="lp-ico">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Principles (apply + explain) ---------- */}
      <div className="lp-section lp-principles">
        <div className="lp-wrap">
          <div className="lp-section-head">
            <span className="lp-eyebrow">Built to lighten the work</span>
            <h2>The software shouldn't add to the complexity.</h2>
            <p>PPWR is demanding enough. Every screen in LIVO PPWR follows the same principles — the ones that make work feel lighter.</p>
          </div>
          <div className="lp-prin-grid">
            {principles.map((p) => (
              <div className="lp-prin" key={p.n}>
                <span className="lp-num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Closing CTA ---------- */}
      <div className="lp-cta">
        <div className="lp-wrap">
          <span className="lp-eyebrow">LIVO PPWR</span>
          <h2>Ready to make compliance effortless?</h2>
          <p>
            See LIVO PPWR with your own packaging in a 20-minute demo —{" "}
            or email <a className="lp-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <a className="lp-btn lp-btn-primary" href={DEMO_URL}>Book a demo</a>
        </div>
      </div>

      {/* ---------- Footer line ---------- */}
      <div className="lp-foot">
        <div className="lp-wrap">
          <p><span className="lp-brand">LIVO PPWR</span> is part of LIVO APPS · Software that lightens the workflow.</p>
          <p style={{ marginTop: 8 }}>This overview is not legal advice; it describes what the product does. Compliance obligations follow from the regulation itself.</p>
        </div>
      </div>
    </section>
  );
}
