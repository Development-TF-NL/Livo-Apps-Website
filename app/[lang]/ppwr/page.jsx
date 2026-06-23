/**
 * LIVO PPWR — Product overview
 * Drop-in page for the LIVO APPS website (Next.js, App Router, /[lang]/ppwr).
 *
 * Voice: Simple. Human. Clear. Direct.
 * Visual identity follows the LIVO APPS Brand Bible: deep navy carries, lime
 * accents sparingly, white cards on a light canvas, flat surfaces, line icons.
 *
 * All visible copy lives in the locale dictionaries (app/dictionaries/{en,nl}.json);
 * this file only holds layout, scoped styles and icons.
 */

import Breadcrumb from "../../components/Breadcrumb";
import { getDictionary } from "../../get-dictionary";

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

// Icons stay in code, zipped with the dictionary's feature copy by index.
const whatIcons = [Icon.register, Icon.matrix, Icon.docs, Icon.suppliers, Icon.timeline, Icon.status];

// Pill tone (from the dictionary) → existing CSS class.
const pillClass = { ok: "lp-pill-ok", warn: "lp-pill-warn", risk: "lp-pill-risk" };

// Splice principle 02's "{code}" placeholder back into a monospace <code>.
function renderPrincipleBody(item) {
  if (!item.code) return item.body;
  const [before, after] = item.body.split("{code}");
  return (<>{before}<code>{item.code}</code>{after}</>);
}

export default async function LivoPpwrOverview({ params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const t = dict.ppwr;

  const breadcrumbItems = [
    { label: t.breadcrumb[0], href: `/${lang}` },
    { label: t.breadcrumb[1], href: `/${lang}#product` },
    { label: t.breadcrumb[2] }, // current page — no link
  ];

  return (
    <section className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Breadcrumb items={breadcrumbItems} />

      {/* ---------- Hero ---------- */}
      <header className="lp-hero">
        <div className="lp-wrap lp-hero-grid">
          <div>
            <span className="lp-eyebrow">{t.hero.eyebrow}</span>
            <h1>{t.hero.titleLine1}<br />{t.hero.titleLine2}</h1>
            <p className="lp-lead">{t.hero.lead}</p>
            <div className="lp-cta-row">
              <a className="lp-btn lp-btn-primary" href={DEMO_URL}>{t.hero.ctaPrimary}</a>
              <a className="lp-btn lp-btn-ghost" href="#how-it-works">{t.hero.ctaSecondary}</a>
            </div>
          </div>

          {/* Signature: the calm obligations overview */}
          <div className="lp-card lp-obl" aria-label={t.card.title}>
            <div className="lp-obl-head">
              <span className="lp-obl-title">{t.card.title}</span>
              <span className="lp-obl-meta">{t.card.updated}</span>
            </div>
            <div className="lp-progress">
              <div className="lp-progress-label"><span>{t.card.progressLabel}</span><span>{t.card.progressValue}</span></div>
              <div className="lp-progress-track"><div className="lp-progress-fill" /></div>
            </div>
            <div className="lp-rows">
              {t.card.rows.map((row) => (
                <div className="lp-row" key={row.name}>
                  <div><div className="lp-row-name">{row.name}</div><div className="lp-row-sub">{row.sub}</div></div>
                  <span className={`lp-pill ${pillClass[row.tone]}`}>{row.status}</span>
                </div>
              ))}
            </div>
            <div className="lp-obl-foot">
              <svg viewBox="0 0 24 24" width="14" height="14" {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {t.card.footer}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Why now ---------- */}
      <div className="lp-section">
        <div className="lp-wrap">
          <div className="lp-section-head">
            <span className="lp-eyebrow">{t.whyNow.eyebrow}</span>
            <h2>{t.whyNow.title}</h2>
            <p>{t.whyNow.body}</p>
          </div>
          <div className="lp-why">
            {t.whyNow.cards.map((card) => (
              <div className="lp-card lp-why-item" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <span className="lp-date">
              <svg viewBox="0 0 24 24" width="16" height="16" {...stroke}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
              {t.whyNow.datePrefix} <b>&nbsp;{t.whyNow.date}</b>
            </span>
          </div>
        </div>
      </div>

      {/* ---------- What it does ---------- */}
      <div className="lp-section" id="how-it-works" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="lp-wrap">
          <div className="lp-section-head">
            <span className="lp-eyebrow">{t.what.eyebrow}</span>
            <h2>{t.what.title}</h2>
            <p>{t.what.body}</p>
          </div>
          <div className="lp-features">
            {t.what.features.map((f, i) => (
              <div className="lp-card lp-feature" key={f.title}>
                <div className="lp-ico">{whatIcons[i]}</div>
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
            <span className="lp-eyebrow">{t.principles.eyebrow}</span>
            <h2>{t.principles.title}</h2>
            <p>{t.principles.body}</p>
          </div>
          <div className="lp-prin-grid">
            {t.principles.items.map((p) => (
              <div className="lp-prin" key={p.n}>
                <span className="lp-num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{renderPrincipleBody(p)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Closing CTA ---------- */}
      <div className="lp-cta">
        <div className="lp-wrap">
          <span className="lp-eyebrow">{t.closing.eyebrow}</span>
          <h2>{t.closing.title}</h2>
          <p>
            {t.closing.leadBefore}
            <a className="lp-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            {t.closing.leadAfter}
          </p>
          <a className="lp-btn lp-btn-primary" href={DEMO_URL}>{t.closing.cta}</a>
        </div>
      </div>

      {/* ---------- Footer line ---------- */}
      <div className="lp-foot">
        <div className="lp-wrap">
          <p><span className="lp-brand">{t.footer.brand}</span>{t.footer.line1After}</p>
          <p style={{ marginTop: 8 }}>{t.footer.line2}</p>
        </div>
      </div>
    </section>
  );
}
